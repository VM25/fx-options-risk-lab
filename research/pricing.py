"""
Garman-Kohlhagen pricing for European USD/MXN FX options.

Quote convention: USD/MXN = MXN per 1 USD.
    S      spot FX (MXN per USD)
    K      strike (MXN per USD)
    T      time to maturity, years
    rd     domestic (MXN) risk-free rate
    rf     foreign  (USD) risk-free rate
    sigma  implied volatility (decimal)
    notional   option notional in USD

Prices are returned in MXN (domestic currency).
"""

from __future__ import annotations

import math


def normal_cdf(x: float) -> float:
    """Standard normal CDF via the error function."""
    return 0.5 * (1.0 + math.erf(x / math.sqrt(2.0)))


def normal_pdf(x: float) -> float:
    """Standard normal PDF."""
    return math.exp(-0.5 * x * x) / math.sqrt(2.0 * math.pi)


def d1(S: float, K: float, T: float, rd: float, rf: float, sigma: float) -> float:
    return (math.log(S / K) + (rd - rf + 0.5 * sigma * sigma) * T) / (sigma * math.sqrt(T))


def d2(S: float, K: float, T: float, rd: float, rf: float, sigma: float) -> float:
    return d1(S, K, T, rd, rf, sigma) - sigma * math.sqrt(T)


def intrinsic_value(option_type: str, S: float, K: float, notional: float = 1.0) -> float:
    """Undiscounted intrinsic value in MXN, scaled by USD notional."""
    if option_type == "call":
        return notional * max(S - K, 0.0)
    if option_type == "put":
        return notional * max(K - S, 0.0)
    raise ValueError(f"Unknown option type: {option_type}")


def garman_kohlhagen_price(
    option_type: str,
    S: float,
    K: float,
    T: float,
    rd: float,
    rf: float,
    sigma: float,
    notional: float = 1.0,
) -> float:
    """
    Garman-Kohlhagen European FX option price in MXN, scaled by USD notional.

    Edge cases:
        T <= 0      -> intrinsic value (no time value).
        sigma <= 0  -> discounted intrinsic-style forward payoff.
    """
    if option_type not in ("call", "put"):
        raise ValueError(f"Unknown option type: {option_type}")
    if S <= 0 or K <= 0:
        raise ValueError("Spot and strike must be positive.")

    if T <= 0:
        return intrinsic_value(option_type, S, K, notional)

    if sigma <= 0:
        # Degenerate: value collapses to the discounted forward intrinsic value.
        fwd = S * math.exp(-rf * T) - K * math.exp(-rd * T)
        if option_type == "call":
            return notional * max(fwd, 0.0)
        return notional * max(-fwd, 0.0)

    _d1 = d1(S, K, T, rd, rf, sigma)
    _d2 = _d1 - sigma * math.sqrt(T)

    if option_type == "call":
        price = S * math.exp(-rf * T) * normal_cdf(_d1) - K * math.exp(-rd * T) * normal_cdf(_d2)
    else:
        price = K * math.exp(-rd * T) * normal_cdf(-_d2) - S * math.exp(-rf * T) * normal_cdf(-_d1)

    return notional * price


def forward_price(S: float, T: float, rd: float, rf: float) -> float:
    """FX forward = S * exp((rd - rf) * T)."""
    return S * math.exp((rd - rf) * T)


if __name__ == "__main__":
    # Quick smoke test against put-call parity.
    S, K, T, rd, rf, sigma = 17.0, 17.0, 0.25, 0.095, 0.045, 0.12
    c = garman_kohlhagen_price("call", S, K, T, rd, rf, sigma)
    p = garman_kohlhagen_price("put", S, K, T, rd, rf, sigma)
    parity_lhs = c - p
    parity_rhs = S * math.exp(-rf * T) - K * math.exp(-rd * T)
    print(f"Call={c:.6f}  Put={p:.6f}")
    print(f"Parity: {parity_lhs:.6f} vs {parity_rhs:.6f}  diff={abs(parity_lhs - parity_rhs):.2e}")
