# Quant engine — `research/`

Python layer that prices the synthetic USD/MXN options book, runs scenario / risk
analytics, validates the calculations, and exports deterministic JSON into `../data`.

## Setup

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Generate all data

```bash
python generate_outputs.py
```

Outputs (written to `../data`): `market.json`, `options-book.json`,
`pricing-results.json`, `greeks-results.json`, `spot-shocks.json`,
`vol-shocks.json`, `stress-grid.json`, `hedge-results.json`,
`simulation-results.json`, `var-es-results.json`, `attribution-results.json`,
`risk-limits.json`, `validation-summary.json`.

## Modules

| File | Responsibility |
| --- | --- |
| `pricing.py` | Garman-Kohlhagen price, intrinsic value, normal CDF/PDF, `d1`/`d2` |
| `greeks.py` | Analytical delta, gamma, vega, theta, rho; per-vol-point / per-day scaling |
| `book.py` | Market assumptions, synthetic book, per-option and book-level valuation |
| `scenarios.py` | Spot shocks, vol shocks, combined stress grid, stress summary |
| `hedging.py` | Static delta hedge sizing and unhedged-vs-hedged scenario P&L |
| `risk.py` | Monte Carlo simulation, VaR/ES, histogram, risk limits |
| `attribution.py` | Greek-based P&L decomposition with repricing residual |
| `validate.py` | Validation checks (multi-vol parity, signed FD Greeks, aggregation, independent scenario reprice, hedge effectiveness, VaR/ES monotonicity, attribution identity, completeness) |
| `quantlib_validation.py` | Independent QuantLib benchmark of custom prices/Greeks (graceful skip if QuantLib absent) |
| `generate_outputs.py` | Orchestrates the pipeline and writes JSON + validation summary |

## Conventions

- Quote convention `USD/MXN = MXN per 1 USD`; MXN domestic (`rd`), USD foreign (`rf`).
- Prices in MXN, scaled by USD notional and position sign (`long +1`, `short -1`).
- Vega exported per 1 vol point; theta exported per day.
- VaR/ES reported as positive loss numbers.
- Monte Carlo seed is `635` for full reproducibility.
