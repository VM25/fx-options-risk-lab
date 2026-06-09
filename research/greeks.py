"""
Analytical Greeks for Garman-Kohlhagen European FX options.

Unit conventions (per the quant spec):
    delta   MXN value change per 1.00 move in USD/MXN spot
    gamma   MXN value change per 1.00 spot move, squared
    vega    (internal) MXN value change per 1.00 (100 vol point) change in sigma
    theta   (internal) MXN value change per 1.00 year

Exported/display conventions:
    vega_per_vol_point = vega * 0.01    (per 1 vol point)
    theta_per_day      = theta / 365    (per calendar day)

All Greeks are scaled by USD notional. Signed Greeks apply the position sign
(+1 long, -1 short).
"""

from __future__ import annotations

import math

from pricing import d1, normal_cdf, normal_pdf

EPS_T = 1e-9


def _safe_T(T: float) -> float:
    return max(T, EPS_T)


def delta(option_type, S, K, T, rd, rf, sigma, notional=1.0) -> float:
    """Spot delta: MXN per 1.00 USD/MXN move, scaled by notional."""
    T = _safe_T(T)
    _d1 = d1(S, K, T, rd, rf, sigma)
    if option_type == "call":
        raw = math.exp(-rf * T) * normal_cdf(_d1)
    else:
        raw = math.exp(-rf * T) * (normal_cdf(_d1) - 1.0)
    return notional * raw


def gamma(S, K, T, rd, rf, sigma, notional=1.0) -> float:
    """Gamma: identical for calls and puts."""
    T = _safe_T(T)
    _d1 = d1(S, K, T, rd, rf, sigma)
    raw = (math.exp(-rf * T) * normal_pdf(_d1)) / (S * sigma * math.sqrt(T))
    return notional * raw


def vega(S, K, T, rd, rf, sigma, notional=1.0) -> float:
    """Vega per 1.00 change in sigma (i.e. per 100 vol points), scaled by notional."""
    T = _safe_T(T)
    _d1 = d1(S, K, T, rd, rf, sigma)
    raw = S * math.exp(-rf * T) * normal_pdf(_d1) * math.sqrt(T)
    return notional * raw


def theta(option_type, S, K, T, rd, rf, sigma, notional=1.0) -> float:
    """Theta per 1.00 year (annualized), scaled by notional."""
    T = _safe_T(T)
    _d1 = d1(S, K, T, rd, rf, sigma)
    _d2 = _d1 - sigma * math.sqrt(T)
    term1 = -(S * math.exp(-rf * T) * normal_pdf(_d1) * sigma) / (2.0 * math.sqrt(T))
    if option_type == "call":
        raw = (
            term1
            + rf * S * math.exp(-rf * T) * normal_cdf(_d1)
            - rd * K * math.exp(-rd * T) * normal_cdf(_d2)
        )
    else:
        raw = (
            term1
            - rf * S * math.exp(-rf * T) * normal_cdf(-_d1)
            + rd * K * math.exp(-rd * T) * normal_cdf(-_d2)
        )
    return notional * raw


def rho_domestic(option_type, S, K, T, rd, rf, sigma, notional=1.0) -> float:
    """Sensitivity to the domestic (MXN) rate, scaled by notional."""
    T = _safe_T(T)
    _d2 = d1(S, K, T, rd, rf, sigma) - sigma * math.sqrt(T)
    if option_type == "call":
        raw = K * T * math.exp(-rd * T) * normal_cdf(_d2)
    else:
        raw = -K * T * math.exp(-rd * T) * normal_cdf(-_d2)
    return notional * raw


def rho_foreign(option_type, S, K, T, rd, rf, sigma, notional=1.0) -> float:
    """Sensitivity to the foreign (USD) rate, scaled by notional."""
    T = _safe_T(T)
    _d1 = d1(S, K, T, rd, rf, sigma)
    if option_type == "call":
        raw = -S * T * math.exp(-rf * T) * normal_cdf(_d1)
    else:
        raw = S * T * math.exp(-rf * T) * normal_cdf(-_d1)
    return notional * raw


def vega_per_vol_point(S, K, T, rd, rf, sigma, notional=1.0) -> float:
    return vega(S, K, T, rd, rf, sigma, notional) * 0.01


def theta_per_day(option_type, S, K, T, rd, rf, sigma, notional=1.0) -> float:
    return theta(option_type, S, K, T, rd, rf, sigma, notional) / 365.0
