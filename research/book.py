"""
Synthetic market environment, synthetic USD/MXN options book, and
book-level pricing / Greeks aggregation.
"""

from __future__ import annotations

from typing import Dict, List

import greeks as gk
from pricing import garman_kohlhagen_price

POSITION_SIGN = {"long": 1, "short": -1}

# --- Base synthetic market environment -------------------------------------

MARKET: Dict = {
    "pair": "USD/MXN",
    "spot": 17.00,
    "domesticCurrency": "MXN",
    "foreignCurrency": "USD",
    "domesticRate": 0.095,   # MXN rate
    "foreignRate": 0.045,    # USD rate
    "atmVolatility": 0.12,
    "valuationDate": "2026-06-07",
    "dataMode": "synthetic",
}

# --- Synthetic options book ------------------------------------------------
# Constructed to create offsetting long/short exposure across strikes and
# maturities, producing a non-trivial net Greek profile and nonlinear stress
# behaviour. Numbers are illustrative, not a market forecast.

OPTIONS_BOOK: List[Dict] = [
    {
        "id": "OPT-001", "pair": "USD/MXN", "optionType": "call", "position": "long",
        "notionalUSD": 1_000_000, "strike": 17.00, "maturityYears": 0.25,
        "impliedVol": 0.120, "domesticRate": 0.095, "foreignRate": 0.045,
    },
    {
        "id": "OPT-002", "pair": "USD/MXN", "optionType": "call", "position": "short",
        "notionalUSD": 750_000, "strike": 17.50, "maturityYears": 0.25,
        "impliedVol": 0.125, "domesticRate": 0.095, "foreignRate": 0.045,
    },
    {
        "id": "OPT-003", "pair": "USD/MXN", "optionType": "put", "position": "long",
        "notionalUSD": 1_000_000, "strike": 16.50, "maturityYears": 0.50,
        "impliedVol": 0.130, "domesticRate": 0.095, "foreignRate": 0.045,
    },
    {
        "id": "OPT-004", "pair": "USD/MXN", "optionType": "put", "position": "short",
        "notionalUSD": 500_000, "strike": 17.00, "maturityYears": 0.10,
        "impliedVol": 0.115, "domesticRate": 0.095, "foreignRate": 0.045,
    },
    {
        "id": "OPT-005", "pair": "USD/MXN", "optionType": "call", "position": "long",
        "notionalUSD": 600_000, "strike": 18.00, "maturityYears": 1.00,
        "impliedVol": 0.140, "domesticRate": 0.095, "foreignRate": 0.045,
    },
    {
        "id": "OPT-006", "pair": "USD/MXN", "optionType": "put", "position": "short",
        "notionalUSD": 800_000, "strike": 16.00, "maturityYears": 0.75,
        "impliedVol": 0.135, "domesticRate": 0.095, "foreignRate": 0.045,
    },
]


# --- Single-instrument valuation -------------------------------------------

def price_option(opt: Dict, spot: float, vol_shift: float = 0.0, time_decay: float = 0.0) -> Dict:
    """
    Price one option and compute its Greeks under an (optionally) shocked
    market state.

    spot        scenario spot (MXN per USD)
    vol_shift   absolute change applied to the instrument's implied vol
    time_decay  years to subtract from maturity (for theta / horizon scenarios)
    """
    sign = POSITION_SIGN[opt["position"]]
    ot = opt["optionType"]
    K = opt["strike"]
    T = max(opt["maturityYears"] - time_decay, 0.0)
    rd = opt["domesticRate"]
    rf = opt["foreignRate"]
    sigma = max(opt["impliedVol"] + vol_shift, 0.01)  # volatility floor 1%
    notional = opt["notionalUSD"]

    price_per_usd = garman_kohlhagen_price(ot, spot, K, T, rd, rf, sigma, 1.0)
    market_value = price_per_usd * notional
    signed_value = sign * market_value

    _delta = gk.delta(ot, spot, K, T, rd, rf, sigma, notional)
    _gamma = gk.gamma(spot, K, T, rd, rf, sigma, notional)
    _vega_vp = gk.vega_per_vol_point(spot, K, T, rd, rf, sigma, notional)
    _theta_day = gk.theta_per_day(ot, spot, K, T, rd, rf, sigma, notional)

    return {
        "id": opt["id"],
        "optionType": ot,
        "position": opt["position"],
        "pricePerUsd": price_per_usd,
        "marketValueMXN": market_value,
        "signedMarketValueMXN": signed_value,
        "delta": _delta,
        "gamma": _gamma,
        "vegaPerVolPoint": _vega_vp,
        "thetaPerDay": _theta_day,
        "signedDelta": sign * _delta,
        "signedGamma": sign * _gamma,
        "signedVegaPerVolPoint": sign * _vega_vp,
        "signedThetaPerDay": sign * _theta_day,
    }


# --- Book-level valuation --------------------------------------------------

def price_book(book: List[Dict], spot: float, vol_shift: float = 0.0, time_decay: float = 0.0) -> List[Dict]:
    return [price_option(opt, spot, vol_shift, time_decay) for opt in book]


def book_value(book: List[Dict], spot: float, vol_shift: float = 0.0, time_decay: float = 0.0) -> float:
    """Net signed mark-to-market of the whole book in MXN."""
    return sum(r["signedMarketValueMXN"] for r in price_book(book, spot, vol_shift, time_decay))


def aggregate_greeks(results: List[Dict]) -> Dict:
    """Sum signed Greeks and market value across instruments."""
    return {
        "netMarketValueMXN": sum(r["signedMarketValueMXN"] for r in results),
        "netDelta": sum(r["signedDelta"] for r in results),
        "netGamma": sum(r["signedGamma"] for r in results),
        "netVegaPerVolPoint": sum(r["signedVegaPerVolPoint"] for r in results),
        "netThetaPerDay": sum(r["signedThetaPerDay"] for r in results),
    }


def base_results(book: List[Dict] = None, market: Dict = None) -> List[Dict]:
    book = book if book is not None else OPTIONS_BOOK
    market = market if market is not None else MARKET
    return price_book(book, market["spot"])
