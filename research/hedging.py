"""
Delta hedge analysis.

The book is delta-hedged with a spot USD/MXN position whose notional offsets
net book delta. Because book delta is expressed as MXN value change per 1.00
move in USD/MXN, the spot-hedge P&L for a given spot move is:

    spot_hedge_pnl = hedge_notional_USD * (S_scenario - S_base)
    hedge_notional_USD = -book_delta

If book delta > 0 the book gains when spot rises, so the hedge (negative
notional) loses when spot rises, offsetting first-order exposure.
"""

from __future__ import annotations

from typing import Dict, List

from book import OPTIONS_BOOK, MARKET, price_book, aggregate_greeks, book_value
from scenarios import SPOT_SHOCKS


def calculate_delta_hedge(book: List[Dict] = None, market: Dict = None) -> Dict:
    book = book or OPTIONS_BOOK
    market = market or MARKET
    base = market["spot"]
    results = price_book(book, base)
    agg = aggregate_greeks(results)
    book_delta = agg["netDelta"]
    hedge_notional = -book_delta
    # Residual book delta after a static spot hedge of equal/opposite notional
    # is zero at the base point by construction.
    hedged_delta = book_delta + hedge_notional
    return {
        "baseBookDelta": book_delta,
        "hedgeNotionalUSD": hedge_notional,
        "hedgedBookDelta": hedged_delta,
    }


def generate_hedge_results(book: List[Dict] = None, market: Dict = None) -> Dict:
    book = book or OPTIONS_BOOK
    market = market or MARKET
    base = market["spot"]
    base_value = book_value(book, base)

    hedge = calculate_delta_hedge(book, market)
    hedge_notional = hedge["hedgeNotionalUSD"]

    scenarios: List[Dict] = []
    for shock in SPOT_SHOCKS:
        s = base * (1.0 + shock)
        unhedged_pnl = book_value(book, s) - base_value
        hedge_pnl = hedge_notional * (s - base)
        hedged_pnl = unhedged_pnl + hedge_pnl
        scenarios.append({
            "spotShock": shock,
            "scenarioSpot": s,
            "unhedgedPnl": unhedged_pnl,
            "hedgePnl": hedge_pnl,
            "hedgedPnl": hedged_pnl,
        })

    unhedged_worst = min(s["unhedgedPnl"] for s in scenarios)
    hedged_worst = min(s["hedgedPnl"] for s in scenarios)

    delta_reduction = 1.0 - abs(hedge["hedgedBookDelta"] / hedge["baseBookDelta"]) \
        if hedge["baseBookDelta"] != 0 else 0.0
    worst_loss_reduction = 1.0 - abs(hedged_worst / unhedged_worst) \
        if unhedged_worst != 0 else 0.0

    return {
        "baseBookDelta": hedge["baseBookDelta"],
        "hedgeNotionalUSD": hedge_notional,
        "hedgedBookDelta": hedge["hedgedBookDelta"],
        "unhedgedWorstLoss": unhedged_worst,
        "hedgedWorstLoss": hedged_worst,
        "deltaReductionPct": delta_reduction,
        "worstLossReductionPct": worst_loss_reduction,
        "scenarios": scenarios,
    }
