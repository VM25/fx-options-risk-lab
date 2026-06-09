# FX Options Risk Lab

**FX Options Risk Lab is a self-directed derivatives analytics project that models a synthetic pre-hedge USD/MXN options exposure and analyzes valuation, Greeks, stress repricing, hedging impact, VaR/ES, synthetic desk-limit utilization, and scenario P&L attribution.**

A Python quant layer prices the book directly with a custom Garman-Kohlhagen engine, validates itself (including an independent QuantLib benchmark), and exports deterministic JSON. A single-page Next.js / TypeScript front end renders it as an editorial risk note. Every chart and metric is traceable to the generated data; nothing is hardcoded in the UI. This is a portfolio demonstration, not production risk management.

---

## Core thesis

The synthetic book is an intentionally unbalanced, **pre-hedge** client-facing USD/MXN options exposure. The analytics first measure raw book exposure, then show how delta hedging changes the profile. The book can look manageable on mark-to-market value while still breaching delta, vega, and stress-loss limits before hedging, which is precisely what the hedging module addresses.

---

## Quant methodology

| Topic | Approach |
| --- | --- |
| Pricing | Custom **Garman-Kohlhagen** (Black-Scholes for FX; the foreign rate acts as a continuous dividend yield). `d1`/`d2`, call/put, intrinsic, all implemented directly. |
| Quote convention | `USD/MXN = MXN per 1 USD`. MXN is domestic (`rd`), USD is foreign (`rf`). Prices are in MXN. |
| Greeks | Closed-form delta, gamma, vega, theta (plus optional rho), scaled by USD notional and position sign. Vega exported per 1 vol point; theta per day (annual / 365). |
| Book aggregation | Net signed market value and net signed Greeks across the 6 instruments. |
| Stress | Full-book repricing across an 11x7 spot-volatility shock grid (immediate revaluation, no time decay). |
| Hedging | Static spot hedge sized to offset net book delta (`hedge notional = -net delta`). |
| VaR / ES | **Joint 1-day Monte Carlo on spot and implied volatility**, full-book repricing, zero drift, 10,000 paths, deterministic seed 635. VaR/ES are positive loss numbers. |
| Attribution | Greek-based contribution breakdown (delta, gamma, vega, theta) plus a repricing residual, versus exact full repricing. |

**Time conventions (explicit):** spot diffusion uses a 252-trading-day year (`h = days/252` for the variance term); option time decay uses ACT/365 calendar time (`dt = days/365` for maturity reduction). These are kept consistent across the risk and attribution layers.

**Stress / attribution consistency:** the attribution market-shock scenarios use `days = 0`, so the "Worst stress scenario" full-repricing P&L equals the stress grid worst case exactly. A separate "1-day carry" scenario isolates one day of theta.

---

## Data generation flow

`research/generate_outputs.py` is the single entry point. It prices the book, generates spot/vol/stress scenarios, runs the delta hedge, runs the joint spot-vol Monte Carlo (VaR/ES, risk limits, histogram), computes attribution, runs the QuantLib benchmark, runs the validation suite, and writes every `data/*.json`. Random draws use a fixed seed (635), so output is fully reproducible.

---

## Model validation

The validation suite (`research/validate.py`) is run on every regeneration and gates the data. Checks:

1. Put-call parity across multiple strikes, maturities, and volatilities.
2. Intrinsic value at expiry, calls and puts.
3. Analytical vs central finite-difference Greeks (delta, gamma, vega) for every instrument, signed by position.
4. Book aggregation for market value and every Greek.
5. **Independent scenario repricing**: a separate code path reprices every exported spot, vol, and stress scenario from the pricing primitives and compares to the exported JSON (including worst/best case). This is not a tautological self-check.
6. Hedge sign and effectiveness (hedge notional opposes book delta; hedged delta is closer to zero; hedge P&L opposes first-order spot exposure).
7. VaR/ES sign and monotonicity (positive; ES >= VaR; 99% >= 95%).
8. Attribution identity: `residual = full repricing P&L - (delta + gamma + vega + theta)` for every scenario.
9. Export completeness: all required files present and free of NaN/Infinity.

## QuantLib benchmark status

The custom Garman-Kohlhagen engine is **independently benchmarked against QuantLib** (`research/quantlib_validation.py`). Day-counts are aligned to ACT/365 before comparison so the check isolates the pricing/Greeks math. With QuantLib installed, price, delta, gamma, vega, and theta agree to machine precision. If QuantLib is not installed, the benchmark is cleanly skipped and the rest of the pipeline still runs; the front end only claims a QuantLib benchmark when it was actually performed.

---

## Risk methodology

VaR and Expected Shortfall come from a joint 1-day Monte Carlo: USD/MXN spot follows a lognormal diffusion (vol annualized over 252 days, zero drift) and implied volatility is shocked as a parallel level shift (normal, ~0.75 vol-point daily sigma, independent of spot in the base model). Each path reprices the full book and reduces maturity by one ACT/365 day. Risk limits are **synthetic desk thresholds** used to demonstrate utilization, breach monitoring, and hedge impact; they are not calibrated to a real institution's limit framework.

---

## Limitations

Synthetic data; illustrative market parameters; constant input volatility with no smile/skew; static, simplified hedging; no transaction or liquidity costs; VaR/ES dependent on distributional assumptions; synthetic risk limits. Not intended for trading or production risk management.

---

## Tech stack

Next.js 14 (App Router), TypeScript, Tailwind CSS, Recharts; Python 3 with NumPy, SciPy, pandas, and QuantLib (optional benchmark). Static JSON exported from Python.

---

## How to regenerate outputs

```bash
# Quant layer + validation + benchmark + JSON export
cd research
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt          # includes QuantLib (optional)
python generate_outputs.py               # must print "Validation status: PASS"

# Front end
cd ..
npm install
npm run dev                              # http://localhost:3000
npm run build                            # production build
```

`npm run data` regenerates all JSON from the repo root.

---

## Disclaimer

This project uses synthetic data for educational and portfolio demonstration purposes. It is not intended for trading, investment advice, or production risk management.

## Academic acknowledgment

This independent project was inspired by concepts studied in FE635: Financial Enterprise Risk Engineering at Stevens Institute of Technology under Prof. Juan Eroles. The implementation, data design, analytics structure, and presentation were developed independently for portfolio and research demonstration purposes.
