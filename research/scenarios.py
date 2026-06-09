"""
Stress scenario generation: spot shocks, volatility shocks, and the combined
spot-volatility stress grid. All P&L is computed by full repricing of the book.
"""

from __future__ import annotations

from typing import Dict, List

from book import OPTIONS_BOOK, MARKET, book_value

SPOT_SHOCKS = [-0.10, -0.08, -0.06, -0.04, -0.02, 0.00, 0.02, 0.04, 0.06, 0.08, 0.10]
VOL_SHOCKS = [-0.05, -0.03, -0.01, 0.00, 0.01, 0.03, 0.05]
VOLATILITY_FLOOR = 0.01


def generate_spot_shocks(book: List[Dict] = None, market: Dict = None) -> List[Dict]:
    book = book or OPTIONS_BOOK
    market = market or MARKET
    base = market["spot"]
    base_value = book_value(book, base)
    out = []
    for shock in SPOT_SHOCKS:
        s = base * (1.0 + shock)
        value = book_value(book, s)
        out.append({
            "spotShock": shock,
            "scenarioSpot": s,
            "bookValue": value,
            "pnl": value - base_value,
        })
    return out


def generate_vol_shocks(book: List[Dict] = None, market: Dict = None) -> List[Dict]:
    book = book or OPTIONS_BOOK
    market = market or MARKET
    base = market["spot"]
    base_value = book_value(book, base)
    base_vol = market["atmVolatility"]
    out = []
    for shock in VOL_SHOCKS:
        value = book_value(book, base, vol_shift=shock)
        scenario_vol = max(base_vol + shock, VOLATILITY_FLOOR)
        out.append({
            "volShock": shock,
            "scenarioVol": scenario_vol,
            "bookValue": value,
            "pnl": value - base_value,
        })
    return out


def generate_stress_grid(book: List[Dict] = None, market: Dict = None) -> List[Dict]:
    book = book or OPTIONS_BOOK
    market = market or MARKET
    base = market["spot"]
    base_vol = market["atmVolatility"]
    base_value = book_value(book, base)
    out = []
    for vol_shock in VOL_SHOCKS:
        for spot_shock in SPOT_SHOCKS:
            s = base * (1.0 + spot_shock)
            value = book_value(book, s, vol_shift=vol_shock)
            out.append({
                "spotShock": spot_shock,
                "volShock": vol_shock,
                "scenarioSpot": s,
                "scenarioVol": max(base_vol + vol_shock, VOLATILITY_FLOOR),
                "bookValue": value,
                "pnl": value - base_value,
            })
    return out


def stress_summary(grid: List[Dict]) -> Dict:
    worst = min(grid, key=lambda g: g["pnl"])
    best = max(grid, key=lambda g: g["pnl"])
    return {
        "worstCasePnl": worst["pnl"],
        "worstCaseSpotShock": worst["spotShock"],
        "worstCaseVolShock": worst["volShock"],
        "bestCasePnl": best["pnl"],
        "bestCaseSpotShock": best["spotShock"],
        "bestCaseVolShock": best["volShock"],
    }
