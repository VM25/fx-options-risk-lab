"""
Scenario P&L attribution.

Full-repricing scenario P&L is decomposed into a Greek-based approximation:

    PnL ~= delta * dS
         + 0.5 * gamma * dS^2
         + vega_per_vol_point * vol_change_points
         + theta_per_day * days
         + residual

The residual captures higher-order and cross terms not explained by the
selected first/second-order sensitivities.

Consistency rule: the market-shock scenarios use days = 0 (immediate
repricing), so their full-repricing P&L matches the stress grid exactly. Time
decay is isolated in a separate "1-day carry" scenario where theta is the only
intended driver.
"""

from __future__ import annotations

from typing import Dict, List

from book import OPTIONS_BOOK, MARKET, price_book, aggregate_greeks, book_value
from scenarios import generate_stress_grid, stress_summary

CALENDAR_DAYS = 365.0


def _scenario_defs(market: Dict) -> List[Dict]:
    summary = stress_summary(generate_stress_grid())
    return [
        # Immediate market shocks (days = 0): full reprice matches stress grid.
        {"scenarioName": "+5% spot / +3 vol pts", "spotShock": 0.05, "volShock": 0.03, "days": 0},
        {"scenarioName": "-5% spot / +3 vol pts", "spotShock": -0.05, "volShock": 0.03, "days": 0},
        {
            "scenarioName": "Worst stress",
            "spotShock": summary["worstCaseSpotShock"],
            "volShock": summary["worstCaseVolShock"],
            "days": 0,
        },
        # Pure time decay over one calendar day (isolates theta).
        {"scenarioName": "1-day carry", "spotShock": 0.00, "volShock": 0.00, "days": 1},
    ]


def calculate_pnl_attribution(book: List[Dict], market: Dict, scenario: Dict) -> Dict:
    base_spot = market["spot"]
    base_value = book_value(book, base_spot)
    agg = aggregate_greeks(price_book(book, base_spot))

    spot_shock = scenario["spotShock"]
    vol_shock = scenario["volShock"]          # decimal (0.03 == +3 vol pts)
    days = scenario["days"]

    dS = base_spot * spot_shock
    vol_points = vol_shock / 0.01
    time_decay = days / CALENDAR_DAYS

    delta_c = agg["netDelta"] * dS
    gamma_c = 0.5 * agg["netGamma"] * dS * dS
    vega_c = agg["netVegaPerVolPoint"] * vol_points
    theta_c = agg["netThetaPerDay"] * days

    scenario_spot = base_spot * (1.0 + spot_shock)
    full_pnl = book_value(book, scenario_spot, vol_shift=vol_shock, time_decay=time_decay) - base_value
    residual = full_pnl - (delta_c + gamma_c + vega_c + theta_c)

    return {
        "scenarioName": scenario["scenarioName"],
        "spotShock": spot_shock,
        "volShock": vol_shock,
        "days": days,
        "fullRepricingPnl": round(full_pnl, 2),
        "deltaContribution": round(delta_c, 2),
        "gammaContribution": round(gamma_c, 2),
        "vegaContribution": round(vega_c, 2),
        "thetaContribution": round(theta_c, 2),
        "residual": round(residual, 2),
    }


def generate_attribution_scenarios(book: List[Dict] = None, market: Dict = None) -> List[Dict]:
    book = book or OPTIONS_BOOK
    market = market or MARKET
    return [calculate_pnl_attribution(book, market, sc) for sc in _scenario_defs(market)]
