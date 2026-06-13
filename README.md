# FX Options Risk Lab

**A self-directed derivatives analytics project that models a pre-hedge USD/MXN options exposure and analyzes valuation, Greeks, stress repricing, delta hedging, VaR/ES, illustrative risk-limit utilization, and scenario P&L attribution.**

A Python research layer prices the book directly with a custom Garman-Kohlhagen engine, validates itself (including an independent QuantLib benchmark), and exports deterministic JSON. A single-page Next.js / TypeScript front end renders it as an editorial risk note. Every chart and metric is traceable to the generated data — nothing is hardcoded in the UI. This is a portfolio demonstration, not production risk management.

---

## What it covers

The single page is organized as a numbered research note:

1. **Market** — base case and quote convention
2. **Options Book** — the pre-hedge instrument blotter and net exposures
3. **Pricing & Greeks** — instrument valuation and position-signed sensitivities
4. **Stress** — full-book repricing across a spot-volatility shock grid
5. **Hedging** — delta hedge impact, before vs. after
6. **VaR / ES** — simulated 1-day Value at Risk and Expected Shortfall
7. **Attribution** — scenario P&L decomposed into Greek contributions vs. exact repricing
8. **Assumptions & Validation** — model boundaries and the validation suite

---

## Headline figures (current book)

**Market base case** — USD/MXN spot 17.00, MXN rate (domestic) 9.5%, USD rate (foreign) 4.5%, ATM volatility 12%, valuation 2026-06-07.

| Metric | Value |
| --- | --- |
| Instruments | 6 (calls and puts, long and short) |
| Gross notional | USD 4.65M |
| Net mark-to-market | MXN 787,126 |
| Net delta (pre-hedge) | MXN 682,529 per 1.00 spot |
| Net vega | MXN 44,242 per vol point |
| Net theta | MXN −1,545 per day |
| 95% / 99% VaR (1-day) | MXN 159,067 / 225,066 |
| 95% / 99% Expected Shortfall | MXN 199,314 / 259,775 |
| Worst stress P&L | MXN −1,078,362 |
| Delta hedge | net delta reduced to ~0; worst-case loss reduced ~99% |

The point of the project: on mark-to-market value the book looks controlled, yet **before hedging it breaches the illustrative delta, vega, and stress-loss limits** — which is exactly what the hedging module addresses.

---

## Quant methodology

| Topic | Approach |
| --- | --- |
| Pricing | Custom **Garman-Kohlhagen** (Black-Scholes for FX; the foreign rate acts as a continuous dividend yield). `d1`/`d2`, call/put, and intrinsic value all implemented directly. |
| Quote convention | `USD/MXN = MXN per 1 USD`. MXN is domestic (`rd`), USD is foreign (`rf`). Prices are in MXN. |
| Greeks | Closed-form delta, gamma, vega, theta (plus rho), scaled by USD notional and position sign. Vega exported per 1 vol point; theta per calendar day (annual / 365). |
| Book aggregation | Net signed market value and net signed Greeks across the 6 instruments. |
| Stress | Full-book repricing across an 11×7 spot-volatility shock grid (immediate revaluation, no time decay). |
| Hedging | Static spot hedge sized to offset net book delta (`hedge notional = −net delta`). |
| VaR / ES | **Joint 1-day Monte Carlo on spot and implied volatility**, full-book repricing, zero drift, 10,000 paths, deterministic seed. VaR/ES are reported as positive loss numbers. |
| Attribution | Greek-based contributions (delta, gamma, vega, theta) plus a repricing residual, compared against exact full repricing. |

**Time conventions (explicit and consistent):** spot diffusion uses a 252-trading-day year (`h = days/252` for the variance term); option time decay uses ACT/365 calendar time (`dt = days/365` for maturity reduction). The same conventions are used across the risk and attribution layers.

**Stress / attribution consistency:** the attribution market-shock scenarios use `days = 0`, so the "Worst stress" full-repricing P&L equals the stress grid worst case exactly (MXN −1,078,362). A separate "1-day carry" scenario isolates one day of theta.

---

## Model validation

`research/validate.py` runs on every regeneration and gates the data — the pipeline only writes JSON when all checks pass. The 10 checks:

1. Put-call parity across multiple strikes, maturities, and volatilities.
2. Intrinsic value at expiry, calls and puts.
3. Analytical vs. central finite-difference Greeks (delta, gamma, vega) for every instrument, signed by position.
4. Book aggregation for market value and every Greek.
5. **Independent scenario repricing** — a separate code path reprices every exported spot, vol, and stress scenario from the pricing primitives and compares against the exported JSON, including worst/best case. This is not a tautological self-check.
6. Hedge sign and effectiveness (hedge notional opposes book delta; hedged delta is closer to zero; hedge P&L opposes first-order spot exposure).
7. VaR/ES sign and monotonicity (positive; ES ≥ VaR; 99% ≥ 95%).
8. Attribution identity: `residual = full repricing P&L − (delta + gamma + vega + theta)` for every scenario.
9. Export completeness: all required files present and free of NaN/Infinity.
10. QuantLib benchmark status.

## QuantLib benchmark

The custom Garman-Kohlhagen engine is **independently benchmarked against QuantLib** (`research/quantlib_validation.py`). Day-counts are aligned to ACT/365 before comparison so the check isolates the pricing/Greeks math. With QuantLib installed (v1.42.1), price, delta, gamma, vega, and theta agree to machine precision (max absolute error 0.0 across all 6 instruments). If QuantLib is not installed, the benchmark is cleanly skipped and the rest of the pipeline still runs — the front end only claims a QuantLib benchmark when it was actually performed.

---

## Risk methodology

VaR and Expected Shortfall come from a joint 1-day Monte Carlo: USD/MXN spot follows a lognormal diffusion (volatility annualized over 252 days, zero drift) and implied volatility is shocked as a parallel level shift (normal, ~0.75 vol-point daily standard deviation, independent of spot in the base model). Each path reprices the full book and reduces maturity by one ACT/365 day. Risk limits are **illustrative thresholds** used to demonstrate utilization, breach monitoring, and hedge impact; they are not calibrated to a real institution's limit framework.

---

## Tech stack

- **Front end:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Recharts
- **Research layer:** Python 3 with NumPy, SciPy, pandas, and QuantLib (optional independent benchmark)
- **Data flow:** Python exports deterministic static JSON into `data/`, consumed directly by the front end

---

## Repository layout

```
research/     Python pricing, Greeks, scenarios, hedging, risk, attribution, validation, QuantLib benchmark
data/         Generated JSON artifacts (the single source of truth for the UI)
app/          Next.js App Router entry
components/   Section components and layout primitives
lib/          Typed data loaders, formatters, constants
docs/         Original project specifications
```

---

## How to run

```bash
# 1) Research layer: pricing + validation + QuantLib benchmark + JSON export
cd research
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt          # includes QuantLib (optional)
python generate_outputs.py               # must print "Validation status: PASS"

# 2) Front end
cd ..
npm install
npm run dev                              # http://localhost:3000
npm run build                            # production build
```

From the repo root, `npm run data` regenerates all JSON. Output is deterministic (fixed Monte Carlo seed), so a clean checkout reproduces the same figures.

---

## Limitations

Illustrative data and market parameters; constant input volatility with no smile/skew; static, simplified hedging; no transaction or liquidity costs; VaR/ES dependent on distributional assumptions; illustrative (not calibrated) risk limits. Not intended for trading or production risk management.

## Disclaimer

This work uses illustrative data for educational and research presentation purposes. It is not intended for trading, investment advice, or production risk management.

## Academic acknowledgment

This independent project was inspired by concepts studied in FE635: Financial Enterprise Risk Engineering at Stevens Institute of Technology under Prof. Juan Eroles. The implementation, data design, analytics structure, and presentation were developed independently for portfolio and research purposes.
