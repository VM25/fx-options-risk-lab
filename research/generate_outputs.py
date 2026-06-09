"""
Master data-generation script.

Runs the full quant pipeline, validates it (including an independent QuantLib
benchmark when available and a non-tautological scenario re-pricing check), and
writes deterministic JSON artefacts into ../data for the Next.js frontend.

Usage:
    python generate_outputs.py
"""

from __future__ import annotations

import json
import os
from typing import Dict, List

import book as bk
import scenarios as sc
import hedging as hg
import risk as rk
import attribution as at
import validate as vd
import quantlib_validation as qlv

HERE = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.normpath(os.path.join(HERE, "..", "data"))


def _round_results(results: List[Dict]) -> List[Dict]:
    out = []
    for r in results:
        out.append({
            "id": r["id"], "optionType": r["optionType"], "position": r["position"],
            "pricePerUsd": round(r["pricePerUsd"], 6),
            "marketValueMXN": round(r["marketValueMXN"], 2),
            "signedMarketValueMXN": round(r["signedMarketValueMXN"], 2),
            "delta": round(r["delta"], 4), "gamma": round(r["gamma"], 6),
            "vegaPerVolPoint": round(r["vegaPerVolPoint"], 2),
            "thetaPerDay": round(r["thetaPerDay"], 2),
            "signedDelta": round(r["signedDelta"], 4),
            "signedGamma": round(r["signedGamma"], 6),
            "signedVegaPerVolPoint": round(r["signedVegaPerVolPoint"], 2),
            "signedThetaPerDay": round(r["signedThetaPerDay"], 2),
        })
    return out


def _write(name: str, payload) -> None:
    with open(os.path.join(DATA_DIR, name), "w") as f:
        json.dump(payload, f, indent=2)
    print(f"Generated {name}")


def _round_grid(grid: List[Dict]) -> List[Dict]:
    return [{k: (round(v, 6) if isinstance(v, float) else v) for k, v in g.items()} for g in grid]


def _deep_round(obj, ndigits: int = 4):
    if isinstance(obj, float):
        return round(obj, ndigits)
    if isinstance(obj, dict):
        return {k: _deep_round(v, ndigits) for k, v in obj.items()}
    if isinstance(obj, list):
        return [_deep_round(v, ndigits) for v in obj]
    return obj


def main() -> None:
    os.makedirs(DATA_DIR, exist_ok=True)

    market = bk.MARKET
    options = bk.OPTIONS_BOOK

    # --- Core pricing / Greeks --------------------------------------------
    base_results = bk.price_book(options, market["spot"])
    agg = bk.aggregate_greeks(base_results)
    rounded = _round_results(base_results)

    pricing_results = [
        {k: r[k] for k in ("id", "optionType", "position", "pricePerUsd", "marketValueMXN", "signedMarketValueMXN")}
        for r in rounded
    ]
    greeks_results = [
        {k: r[k] for k in (
            "id", "delta", "gamma", "vegaPerVolPoint", "thetaPerDay",
            "signedDelta", "signedGamma", "signedVegaPerVolPoint", "signedThetaPerDay",
        )}
        for r in rounded
    ]
    book_summary = {
        "instrumentCount": len(options),
        "grossNotionalUSD": sum(o["notionalUSD"] for o in options),
        "netMarketValueMXN": round(agg["netMarketValueMXN"], 2),
        "netDelta": round(agg["netDelta"], 4),
        "netGamma": round(agg["netGamma"], 6),
        "netVegaPerVolPoint": round(agg["netVegaPerVolPoint"], 2),
        "netThetaPerDay": round(agg["netThetaPerDay"], 2),
    }

    # --- Scenarios --------------------------------------------------------
    spot_shocks = _round_grid(sc.generate_spot_shocks())
    vol_shocks = _round_grid(sc.generate_vol_shocks())
    stress_grid_full = sc.generate_stress_grid()
    stress_grid = _round_grid(stress_grid_full)
    stress_sum = sc.stress_summary(stress_grid_full)
    stress_sum = {k: (round(v, 2) if isinstance(v, float) and abs(v) > 1 else v) for k, v in stress_sum.items()}

    # --- Hedging ----------------------------------------------------------
    hedge = _deep_round(json.loads(json.dumps(hg.generate_hedge_results())))

    # --- Risk: simulation, VaR/ES, limits ---------------------------------
    simulation = rk.generate_simulation_pnl()
    pnl_values = [s["pnl"] for s in simulation]
    var_es = rk.calculate_var_es(pnl_values, rk.CONFIDENCE_LEVELS)
    risk_limits = rk.generate_risk_limits(options, market, var_es, stress_sum)
    risk_meta = {**rk.risk_meta(), "varEs": var_es, "histogram": rk.compute_histogram(pnl_values)}

    # --- Attribution ------------------------------------------------------
    attribution = at.generate_attribution_scenarios()

    # --- QuantLib benchmark (independent) ---------------------------------
    quantlib = qlv.run()

    # --- Write artefacts --------------------------------------------------
    _write("market.json", market)
    _write("options-book.json", options)
    _write("pricing-results.json", {"instruments": pricing_results, "summary": book_summary})
    _write("greeks-results.json", {"instruments": greeks_results, "summary": book_summary})
    _write("spot-shocks.json", spot_shocks)
    _write("vol-shocks.json", vol_shocks)
    _write("stress-grid.json", {"grid": stress_grid, "summary": stress_sum})
    _write("hedge-results.json", hedge)
    _write("simulation-results.json", simulation)
    _write("var-es-results.json", risk_meta)
    _write("attribution-results.json", attribution)
    _write("risk-limits.json", risk_limits)
    _write("quantlib-validation.json", quantlib)

    # --- Validation (core + post-export) ----------------------------------
    checks: List[Dict] = vd.run_core_validations()
    checks.append(vd.check_scenario_repricing(DATA_DIR))
    checks.append(vd.check_hedge(hedge))
    checks.append(vd.check_var_es(var_es))
    checks.append(vd.check_attribution_identity(attribution))
    checks.append(vd.check_export_completeness(DATA_DIR))

    # QuantLib benchmark recorded as a check (skipped is not a failure).
    ql_status = "pass" if quantlib["status"] == "pass" else ("skipped" if quantlib["status"] == "skipped" else "fail")
    checks.append({
        "name": "quantlib_benchmark",
        "status": ql_status,
        "maxError": quantlib.get("maxAbsPriceError", 0.0),
        "detail": (
            f"benchmarked against QuantLib {quantlib.get('benchmarkVersion', '')}"
            if ql_status == "pass" else quantlib.get("reason", "")
        ),
    })

    core_pass = all(c["status"] in ("pass", "skipped") for c in checks)
    status = "pass" if core_pass else "fail"
    summary = {
        "status": status,
        "seed": rk.SEED,
        "quantlib": {
            "status": quantlib["status"],
            "benchmark": quantlib.get("benchmark", "QuantLib"),
            "version": quantlib.get("benchmarkVersion"),
        },
        "checks": checks,
    }
    _write("validation-summary.json", summary)

    print("-" * 56)
    for c in checks:
        flag = {"pass": "OK  ", "skipped": "SKIP", "fail": "XX  "}[c["status"]]
        print(f"  [{flag}] {c['name']:<30} maxError={c['maxError']:.2e}")
    print("-" * 56)
    print(f"QuantLib benchmark: {quantlib['status'].upper()}"
          + (f" (v{quantlib.get('benchmarkVersion')})" if quantlib['status'] == 'pass' else ""))
    print(f"Validation status: {status.upper()}")


if __name__ == "__main__":
    main()
