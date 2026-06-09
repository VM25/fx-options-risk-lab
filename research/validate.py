"""
Validation suite. Confirms the quant layer is internally consistent and that the
exported artefacts match an independent recomputation before the frontend
consumes any data. Produces a list of check dicts.

The scenario-repricing check is deliberately NON-tautological: it reprices a
sample of exported scenarios from the pricing primitives directly (a separate
code path from scenarios.py) and compares against the exported JSON.
"""

from __future__ import annotations

import json
import math
import os
from typing import Dict, List

import greeks as gk
from pricing import garman_kohlhagen_price, intrinsic_value
from book import OPTIONS_BOOK, MARKET, price_book, aggregate_greeks, book_value

H_S = 0.01
H_SIGMA = 0.0001
SIGN = {"long": 1, "short": -1}
VOL_FLOOR = 0.01


def _check(name: str, passed: bool, max_error: float = 0.0, detail: str = "") -> Dict:
    return {
        "name": name,
        "status": "pass" if passed else "fail",
        "maxError": round(float(max_error), 10),
        "detail": detail,
    }


# --- Independent book valuation (separate code path from book.py) -----------

def _indep_book_value(spot: float, vol_shift: float = 0.0, time_decay: float = 0.0) -> float:
    total = 0.0
    for o in OPTIONS_BOOK:
        sign = SIGN[o["position"]]
        sigma = max(o["impliedVol"] + vol_shift, VOL_FLOOR)
        T = max(o["maturityYears"] - time_decay, 0.0)
        px = garman_kohlhagen_price(
            o["optionType"], spot, o["strike"], T, o["domesticRate"], o["foreignRate"], sigma, o["notionalUSD"]
        )
        total += sign * px
    return total


# --- 4.1 Put-call parity across strikes, maturities, AND vols ---------------

def check_put_call_parity() -> Dict:
    max_err = 0.0
    for S in (15.5, 17.0, 18.5):
        for K in (16.0, 17.0, 18.0):
            for T in (0.1, 0.5, 1.0):
                for sigma in (0.08, 0.12, 0.18):
                    c = garman_kohlhagen_price("call", S, K, T, 0.095, 0.045, sigma)
                    p = garman_kohlhagen_price("put", S, K, T, 0.095, 0.045, sigma)
                    rhs = S * math.exp(-0.045 * T) - K * math.exp(-0.095 * T)
                    max_err = max(max_err, abs((c - p) - rhs))
    return _check("put_call_parity", max_err < 1e-8, max_err, "27 strike/maturity/vol combinations")


# --- 4.2 Intrinsic value at expiry, calls and puts --------------------------

def check_intrinsic_at_expiry() -> Dict:
    max_err = 0.0
    for ot in ("call", "put"):
        for K in (16.0, 17.0, 18.0):
            for S in (15.0, 17.0, 19.0):
                price = garman_kohlhagen_price(ot, S, K, 0.0, 0.095, 0.045, 0.12)
                max_err = max(max_err, abs(price - intrinsic_value(ot, S, K)))
    return _check("intrinsic_value_at_expiry", max_err < 1e-9, max_err)


# --- 4.3 Analytical vs numerical Greeks, all book options, signed -----------

def check_numerical_greeks() -> Dict:
    max_rel = 0.0
    s = MARKET["spot"]
    for o in OPTIONS_BOOK:
        sign = SIGN[o["position"]]
        N = o["notionalUSD"]
        ot, K = o["optionType"], o["strike"]
        T, rd, rf, sigma = o["maturityYears"], o["domesticRate"], o["foreignRate"], o["impliedVol"]

        def px(spot=s, sig=sigma):
            return garman_kohlhagen_price(ot, spot, K, T, rd, rf, sig, 1.0)

        delta_num = sign * N * (px(spot=s + H_S) - px(spot=s - H_S)) / (2 * H_S)
        gamma_num = sign * N * (px(spot=s + H_S) - 2 * px() + px(spot=s - H_S)) / (H_S ** 2)
        vega_num = sign * N * (px(sig=sigma + H_SIGMA) - px(sig=sigma - H_SIGMA)) / (2 * H_SIGMA)

        delta_ana = sign * gk.delta(ot, s, K, T, rd, rf, sigma, N)
        gamma_ana = sign * gk.gamma(s, K, T, rd, rf, sigma, N)
        vega_ana = sign * gk.vega(s, K, T, rd, rf, sigma, N)  # per 1.00 vol

        for ana, num in ((delta_ana, delta_num), (gamma_ana, gamma_num), (vega_ana, vega_num)):
            rel = abs(ana - num) / max(1.0, abs(ana))
            max_rel = max(max_rel, rel)
    return _check("numerical_greeks_signed", max_rel < 1e-3, max_rel, "delta/gamma/vega, all 6 instruments, signed")


# --- 4.4 Book aggregation for every Greek -----------------------------------

def check_book_aggregation() -> Dict:
    results = price_book(OPTIONS_BOOK, MARKET["spot"])
    agg = aggregate_greeks(results)
    sums = {
        "netMarketValueMXN": sum(r["signedMarketValueMXN"] for r in results),
        "netDelta": sum(r["signedDelta"] for r in results),
        "netGamma": sum(r["signedGamma"] for r in results),
        "netVegaPerVolPoint": sum(r["signedVegaPerVolPoint"] for r in results),
        "netThetaPerDay": sum(r["signedThetaPerDay"] for r in results),
    }
    max_err = max(abs(agg[k] - v) for k, v in sums.items())
    mv_err = abs(agg["netMarketValueMXN"] - book_value(OPTIONS_BOOK, MARKET["spot"]))
    return _check("book_aggregation", max(max_err, mv_err) < 1e-6, max(max_err, mv_err),
                  "MV, delta, gamma, vega, theta")


# --- 4.5 Scenario repricing vs exported JSON (non-tautological) --------------

def check_scenario_repricing(data_dir: str) -> Dict:
    base = _indep_book_value(MARKET["spot"])
    base_spot = MARKET["spot"]
    base_vol = MARKET["atmVolatility"]
    max_err = 0.0

    spot = json.load(open(os.path.join(data_dir, "spot-shocks.json")))
    for row in spot:
        s = base_spot * (1.0 + row["spotShock"])
        max_err = max(max_err, abs(s - row["scenarioSpot"]))
        recomputed = _indep_book_value(s)
        max_err = max(max_err, abs(recomputed - row["bookValue"]))
        max_err = max(max_err, abs((recomputed - base) - row["pnl"]))

    vol = json.load(open(os.path.join(data_dir, "vol-shocks.json")))
    for row in vol:
        recomputed = _indep_book_value(base_spot, vol_shift=row["volShock"])
        max_err = max(max_err, abs(recomputed - row["bookValue"]))
        max_err = max(max_err, abs((recomputed - base) - row["pnl"]))

    grid_doc = json.load(open(os.path.join(data_dir, "stress-grid.json")))
    grid = grid_doc["grid"]
    pnls = []
    for row in grid:
        recomputed = _indep_book_value(row["scenarioSpot"], vol_shift=row["volShock"])
        pnl = recomputed - base
        pnls.append(pnl)
        max_err = max(max_err, abs(recomputed - row["bookValue"]))
        max_err = max(max_err, abs(pnl - row["pnl"]))

    # Worst / best case consistency.
    summary = grid_doc["summary"]
    max_err = max(max_err, abs(min(pnls) - summary["worstCasePnl"]))
    max_err = max(max_err, abs(max(pnls) - summary["bestCasePnl"]))

    return _check("scenario_repricing_vs_export", max_err < 0.05, max_err,
                  "independent reprice of all spot/vol/stress scenarios + worst/best")


# --- 4.6 Hedge sign and effectiveness ---------------------------------------

def check_hedge(hedge: Dict) -> Dict:
    bd = hedge["baseBookDelta"]
    hn = hedge["hedgeNotionalUSD"]
    sign_ok = (bd > 0 and hn < 0) or (bd < 0 and hn > 0) or (bd == 0)
    closer = abs(hedge["hedgedBookDelta"]) < abs(bd) + 1e-6
    not_worse = hedge["hedgedWorstLoss"] >= hedge["unhedgedWorstLoss"] - 1e-6
    # Hedge P&L opposes first-order spot exposure: with positive book delta,
    # an up-spot scenario must give negative hedge P&L.
    up = max(hedge["scenarios"], key=lambda x: x["spotShock"])
    opp = (bd > 0 and up["hedgePnl"] <= 1e-6) or (bd < 0 and up["hedgePnl"] >= -1e-6) or bd == 0
    return _check("hedge_sign_effectiveness", sign_ok and closer and not_worse and opp,
                  detail="sign, delta reduction, downside, hedge-pnl direction")


# --- 4.7 VaR/ES sign and monotonicity ---------------------------------------

def check_var_es(var_es: List[Dict]) -> Dict:
    v95 = next(v for v in var_es if v["confidenceLevel"] == 0.95)
    v99 = next(v for v in var_es if v["confidenceLevel"] == 0.99)
    ok = (
        all(v["var"] > 0 and v["expectedShortfall"] > 0 for v in var_es)
        and all(v["expectedShortfall"] >= v["var"] for v in var_es)
        and v99["var"] >= v95["var"]
        and v99["expectedShortfall"] >= v95["expectedShortfall"]
    )
    return _check("var_es_sign_convention", ok, detail="positive, ES>=VaR, 99>=95")


# --- 4.8 Attribution identity -----------------------------------------------

def check_attribution_identity(attribution: List[Dict]) -> Dict:
    max_err = 0.0
    for a in attribution:
        explained = (
            a["deltaContribution"] + a["gammaContribution"]
            + a["vegaContribution"] + a["thetaContribution"]
        )
        implied_residual = a["fullRepricingPnl"] - explained
        max_err = max(max_err, abs(implied_residual - a["residual"]))
    return _check("attribution_identity", max_err < 0.05, max_err,
                  "residual == full reprice - sum(greek contributions)")


# --- 4.9 Export completeness -------------------------------------------------

REQUIRED_FILES = [
    "market.json", "options-book.json", "pricing-results.json", "greeks-results.json",
    "spot-shocks.json", "vol-shocks.json", "stress-grid.json", "hedge-results.json",
    "simulation-results.json", "var-es-results.json", "attribution-results.json",
    "risk-limits.json", "quantlib-validation.json",
]


def _finite(obj) -> bool:
    if isinstance(obj, float):
        return math.isfinite(obj)
    if isinstance(obj, dict):
        return all(_finite(v) for v in obj.values())
    if isinstance(obj, list):
        return all(_finite(v) for v in obj)
    return True


def check_export_completeness(data_dir: str) -> Dict:
    ok = True
    detail = "all required files present and finite"
    for f in REQUIRED_FILES:
        path = os.path.join(data_dir, f)
        if not os.path.exists(path):
            ok = False
            detail = f"missing {f}"
            break
        if not _finite(json.load(open(path))):
            ok = False
            detail = f"non-finite value in {f}"
            break
    return _check("export_completeness", ok, detail=detail)


# --- Core (no exported artefacts needed) ------------------------------------

def run_core_validations() -> List[Dict]:
    return [
        check_put_call_parity(),
        check_intrinsic_at_expiry(),
        check_numerical_greeks(),
        check_book_aggregation(),
    ]
