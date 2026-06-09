"""
Monte Carlo simulation of book P&L, VaR / Expected Shortfall, and risk limits.

Risk model: joint 1-day spot + implied-volatility Monte Carlo.
    - USD/MXN spot follows a 1-day lognormal diffusion (zero drift).
    - Implied volatility is shocked as a parallel level shift across the book,
      drawn from a normal distribution in vol points.
    - Each path reprices the full options book and computes P&L.

Time conventions (made explicit, and kept consistent with the Greeks layer):
    - Spot diffusion variance uses a 252-trading-day year:  h_vol = days / 252.
    - Option time decay (maturity reduction) uses ACT/365:  dt   = days / 365.

VaR and ES are reported as positive loss numbers.
"""

from __future__ import annotations

from typing import Dict, List, Tuple

import numpy as np

from book import OPTIONS_BOOK, MARKET, price_book, aggregate_greeks, book_value

SEED = 635
N_SIMS = 10_000
HORIZON_DAYS = 1
TRADING_DAYS = 252          # spot-vol annualisation
CALENDAR_DAYS = 365         # ACT/365 time decay
DRIFT = 0.0
CONFIDENCE_LEVELS = [0.95, 0.99]
RISK_MODEL = "joint_spot_vol_1d"

# Daily implied-volatility shock: standard deviation of the 1-day change in the
# ATM implied-vol level, expressed in decimal vol (0.0075 == 0.75 vol points).
VOL_SHOCK_DAILY = 0.0075
# Correlation between the spot return and the implied-vol shock. Kept at 0 for
# transparency; correlated shocks (leverage effect) are a documented extension.
CORR_SPOT_VOL = 0.0
VOL_FLOOR = 0.01

# Synthetic risk limits (MXN unless noted).
RISK_LIMITS = {
    "var95": 300_000.0,
    "var99": 420_000.0,
    "stressLoss": 750_000.0,
    "absDelta": 150_000.0,        # MXN per 1.00 spot move
    "vegaPerVolPoint": 40_000.0,  # MXN per 1 vol point
}


def simulate_shocks(market: Dict, n_sims: int, horizon_days: int, seed: int) -> Tuple[np.ndarray, np.ndarray]:
    """
    Draw correlated 1-day shocks.

    Returns (terminal_spot, vol_shock_decimal) where vol_shock is the additive
    shift applied to every instrument's implied volatility.
    """
    rng = np.random.default_rng(seed)
    s0 = market["spot"]
    sigma = market["atmVolatility"]
    h_vol = horizon_days / TRADING_DAYS

    z = rng.standard_normal((n_sims, 2))
    if CORR_SPOT_VOL != 0.0:
        # Cholesky for the 2x2 correlation matrix.
        l21 = CORR_SPOT_VOL
        l22 = np.sqrt(max(1.0 - CORR_SPOT_VOL ** 2, 0.0))
        z_spot = z[:, 0]
        z_vol = l21 * z[:, 0] + l22 * z[:, 1]
    else:
        z_spot = z[:, 0]
        z_vol = z[:, 1]

    spot_t = s0 * np.exp((DRIFT - 0.5 * sigma ** 2) * h_vol + sigma * np.sqrt(h_vol) * z_spot)
    vol_shock = VOL_SHOCK_DAILY * z_vol
    return spot_t, vol_shock


def generate_simulation_pnl(book: List[Dict] = None, market: Dict = None) -> List[Dict]:
    book = book or OPTIONS_BOOK
    market = market or MARKET
    base_value = book_value(book, market["spot"])
    decay_years = HORIZON_DAYS / CALENDAR_DAYS  # ACT/365 time decay
    base_vol = market["atmVolatility"]

    spots, vol_shocks = simulate_shocks(market, N_SIMS, HORIZON_DAYS, SEED)
    results: List[Dict] = []
    for i in range(N_SIMS):
        s = float(spots[i])
        dv = float(vol_shocks[i])
        value = book_value(book, s, vol_shift=dv, time_decay=decay_years)
        results.append({
            "scenarioId": i,
            "simulatedSpot": round(s, 6),
            "volShock": round(dv, 6),
            "simulatedVol": round(max(base_vol + dv, VOL_FLOOR), 6),
            "bookValue": round(value, 2),
            "pnl": round(value - base_value, 2),
        })
    return results


def calculate_var_es(pnl_values: List[float], confidence_levels: List[float]) -> List[Dict]:
    arr = np.asarray(pnl_values, dtype=float)
    out = []
    for c in confidence_levels:
        alpha = 1.0 - c
        q = np.quantile(arr, alpha)  # loss-side quantile of the P&L distribution
        var = -q
        tail = arr[arr <= q]
        es = -tail.mean() if tail.size > 0 else var
        out.append({
            "confidenceLevel": c,
            "var": round(float(var), 2),
            "expectedShortfall": round(float(es), 2),
        })
    return out


def compute_histogram(pnl_values: List[float], n_bins: int = 41) -> Dict:
    """Pre-bin the simulated P&L for a compact, fast frontend histogram."""
    arr = np.asarray(pnl_values, dtype=float)
    counts, edges = np.histogram(arr, bins=n_bins)
    bins = []
    for i in range(len(counts)):
        bins.append({
            "x0": round(float(edges[i]), 2),
            "x1": round(float(edges[i + 1]), 2),
            "mid": round(float((edges[i] + edges[i + 1]) / 2.0), 2),
            "count": int(counts[i]),
        })
    return {
        "bins": bins,
        "min": round(float(arr.min()), 2),
        "max": round(float(arr.max()), 2),
        "mean": round(float(arr.mean()), 2),
        "std": round(float(arr.std()), 2),
    }


def _status(utilization: float) -> str:
    if utilization >= 1.0:
        return "red"
    if utilization >= 0.8:
        return "amber"
    return "green"


def generate_risk_limits(book: List[Dict], market: Dict, var_es: List[Dict], stress_summary: Dict) -> List[Dict]:
    results = price_book(book, market["spot"])
    agg = aggregate_greeks(results)

    var95 = next(v["var"] for v in var_es if v["confidenceLevel"] == 0.95)
    var99 = next(v["var"] for v in var_es if v["confidenceLevel"] == 0.99)
    worst_stress_loss = abs(min(stress_summary["worstCasePnl"], 0.0))
    abs_delta = abs(agg["netDelta"])
    abs_vega = abs(agg["netVegaPerVolPoint"])

    rows = [
        ("95% VaR", var95, RISK_LIMITS["var95"]),
        ("99% VaR", var99, RISK_LIMITS["var99"]),
        ("Worst stress loss", worst_stress_loss, RISK_LIMITS["stressLoss"]),
        ("Absolute net delta", abs_delta, RISK_LIMITS["absDelta"]),
        ("Net vega / vol point", abs_vega, RISK_LIMITS["vegaPerVolPoint"]),
    ]

    out = []
    for metric, value, limit in rows:
        utilization = value / limit if limit else 0.0
        out.append({
            "metric": metric,
            "value": round(value, 2),
            "limit": round(limit, 2),
            "utilization": round(utilization, 4),
            "status": _status(utilization),
        })
    return out


def risk_meta() -> Dict:
    """Static description of the risk model for export and labelling."""
    return {
        "riskModel": RISK_MODEL,
        "nSims": N_SIMS,
        "horizonDays": HORIZON_DAYS,
        "seed": SEED,
        "drift": DRIFT,
        "tradingDays": TRADING_DAYS,
        "calendarDays": CALENDAR_DAYS,
        "volShockDailyPoints": round(VOL_SHOCK_DAILY * 100, 3),
        "spotVolCorrelation": CORR_SPOT_VOL,
    }
