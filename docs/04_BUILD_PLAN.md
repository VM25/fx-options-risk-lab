# 04_BUILD_PLAN.md

# FX Options Risk Lab

## Build Plan

---

## 1. Purpose of This Document

This document defines the implementation plan for **FX Options Risk Lab**.

It converts the project scope, quantitative specification, product requirements, and design system into a concrete build sequence.

The goal is to produce:

* A Python-validated quantitative analytics layer
* Static frontend-ready JSON data
* A deployed Next.js / TypeScript single-page project
* A polished institutional-style case study and dashboard
* A GitHub-ready repository
* A project that is recruiter-readable and interview-defensible

This build plan should be followed strictly.

Do not improvise the project into a trading game, generic dashboard, fake Bloomberg terminal, or blog post with charts. Civilization has suffered enough.

---

## 2. Final Build Target

The final Version 1 product is:

> A deployed single-page Next.js/TypeScript case study and analytics dashboard, powered by Python-generated validation data, modeling a synthetic USD/MXN FX options book through pricing, Greeks, stress testing, hedging, VaR/ES, risk limits, and P&L attribution.

The project uses:

```txt
Python for validation and data generation
Next.js / TypeScript for the deployed app
Static JSON data for frontend visualizations
Tailwind CSS for styling
Recharts or Plotly.js for charts
```

---

## 3. Required Input Documents

Before building, the project must be guided by these planning files:

```txt
00_PROJECT_SCOPE.md
01_QUANT_SPEC.md
02_PRODUCT_REQUIREMENTS.md
03_DESIGN_SYSTEM.md
04_BUILD_PLAN.md
```

Each file has a specific role:

```txt
00_PROJECT_SCOPE.md       Defines the project vision and boundaries.
01_QUANT_SPEC.md          Defines the models, formulas, and validation logic.
02_PRODUCT_REQUIREMENTS.md Defines the product structure and required components.
03_DESIGN_SYSTEM.md       Defines the visual system and UI rules.
04_BUILD_PLAN.md          Defines the execution sequence.
```

Do not ignore earlier files when building later pieces.

---

## 4. Build Philosophy

The project must be built from scratch.

Do not:

```txt
Reuse the old Excel workbook
Recreate class assignments
Mention Hornet Contest in the main UI
Build a trading game
Add fake live market data
Use hardcoded fake chart values inside React components
Create a backend unless absolutely necessary
Overcomplicate Version 1
```

Do:

```txt
Use Python to generate and validate quantitative outputs
Export deterministic JSON files
Use Next.js to present the analytics cleanly
Make every chart and metric traceable to generated data
Keep the design institutional and serious
Write concise technical copy
Make the project easy to defend in interviews
```

---

## 5. Recommended Timeline

The project should be built in **1 to 2 weeks**.

Recommended schedule:

```txt
Day 1-2:   Project setup and Python quant engine
Day 3-4:   Scenario generation, VaR/ES, attribution, validation
Day 5-6:   Next.js scaffold and data loading
Day 7-9:   Core sections and charts
Day 10-11: Design polish and responsive cleanup
Day 12-13: README, QA, deployment prep
Day 14:    Final audit and deploy
```

If time is tight, prioritize:

```txt
Correct quant logic
Stress testing
Hedging
VaR/ES
P&L attribution
Clean presentation
```

Do not waste time on decorative animation.

---

## 6. Repository Structure

Create the repository as:

```txt
fx-options-risk-lab/
  docs/
    00_PROJECT_SCOPE.md
    01_QUANT_SPEC.md
    02_PRODUCT_REQUIREMENTS.md
    03_DESIGN_SYSTEM.md
    04_BUILD_PLAN.md

  app/
    page.tsx
    layout.tsx
    globals.css

  components/
    layout/
      PageShell.tsx
      Section.tsx
      SectionHeader.tsx
      MetricCard.tsx
      NarrativeBlock.tsx
      AnalyticsPanel.tsx
      DataTable.tsx
      Badge.tsx

    hero/
      HeroSection.tsx
      ThesisCards.tsx

    market/
      MarketSetupSection.tsx
      MarketAssumptionsTable.tsx

    book/
      OptionsBookSection.tsx
      OptionsBookTable.tsx
      BookSummaryCards.tsx

    pricing/
      PricingGreeksSection.tsx
      PricingTable.tsx
      GreeksTable.tsx

    stress/
      StressTestingSection.tsx
      SpotShockChart.tsx
      VolShockChart.tsx
      StressHeatmap.tsx
      StressSummaryCards.tsx

    hedging/
      HedgingLabSection.tsx
      HedgeComparisonChart.tsx
      HedgeSummaryCards.tsx
      HedgeToggle.tsx

    risk/
      VarEsSection.tsx
      PnlDistributionChart.tsx
      VarEsCards.tsx
      RiskLimitPanel.tsx

    attribution/
      PnlAttributionSection.tsx
      AttributionChart.tsx
      AttributionTable.tsx
      ScenarioSelector.tsx

    assumptions/
      ModelAssumptionsSection.tsx
      LimitationsList.tsx

    footer/
      ProjectFooter.tsx

  lib/
    data/
      market.ts
      book.ts
      pricing.ts
      greeks.ts
      stress.ts
      hedge.ts
      risk.ts
      attribution.ts

    formatters.ts
    chart-utils.ts
    constants.ts
    types.ts

  data/
    market.json
    options-book.json
    pricing-results.json
    greeks-results.json
    spot-shocks.json
    vol-shocks.json
    stress-grid.json
    hedge-results.json
    simulation-results.json
    var-es-results.json
    attribution-results.json
    risk-limits.json
    validation-summary.json

  research/
    pricing.py
    greeks.py
    book.py
    scenarios.py
    hedging.py
    risk.py
    attribution.py
    validate.py
    generate_outputs.py
    requirements.txt
    README.md

  public/
    og-image.png

  README.md
  package.json
  tsconfig.json
  tailwind.config.ts
  next.config.ts
```

The `docs/` folder should contain the five planning markdown files.

The `research/` folder should contain Python quant logic.

The `data/` folder should contain generated frontend data.

The `components/` folder should contain presentation components.

The `lib/` folder should contain frontend data loading, type definitions, and formatting utilities.

---

## 7. Phase 0: Project Initialization

---

### 7.1 Create Next.js App

Use:

```bash
npx create-next-app@latest fx-options-risk-lab
```

Recommended selections:

```txt
TypeScript: Yes
ESLint: Yes
Tailwind CSS: Yes
App Router: Yes
src directory: No, unless preferred
Import alias: Yes
```

Recommended alias:

```txt
@/*
```

---

### 7.2 Install Frontend Dependencies

Install:

```bash
npm install recharts lucide-react clsx tailwind-merge
```

Optional:

```bash
npm install framer-motion
```

Use Framer Motion lightly only if it improves polish.

Do not create heavy animation effects.

---

### 7.3 Create Python Research Environment

Inside `research/`:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install numpy pandas scipy
pip freeze > requirements.txt
```

Optional for local validation notebooks:

```bash
pip install matplotlib jupyter
```

Do not require Jupyter for the core data-generation pipeline.

---

### 7.4 Copy Planning Docs

Create:

```txt
docs/
```

Add:

```txt
00_PROJECT_SCOPE.md
01_QUANT_SPEC.md
02_PRODUCT_REQUIREMENTS.md
03_DESIGN_SYSTEM.md
04_BUILD_PLAN.md
```

These documents should remain in the repo.

They show that the project was planned seriously, not summoned from a pile of half-working dashboard components like some fintech swamp creature.

---

## 8. Phase 1: Python Quant Engine

The Python quant engine must be built before the frontend.

This is non-negotiable.

The frontend should not invent finance numbers.

---

## 8.1 `research/pricing.py`

Implement Garman-Kohlhagen pricing.

Required functions:

```python
normal_cdf(x)
normal_pdf(x)
d1(S, K, T, rd, rf, sigma)
d2(S, K, T, rd, rf, sigma)
garman_kohlhagen_price(option_type, S, K, T, rd, rf, sigma, notional)
intrinsic_value(option_type, S, K, notional)
```

Requirements:

```txt
Handle calls and puts.
Handle expiry with intrinsic value.
Reject invalid sigma and maturity inputs where appropriate.
Return price in MXN.
Use USD/MXN quote convention.
```

Acceptance checks:

```txt
Call price is non-negative.
Put price is non-negative.
At expiry, price equals intrinsic value.
Put-call parity approximately holds.
```

---

## 8.2 `research/greeks.py`

Implement analytical Greeks.

Required functions:

```python
delta(option_type, S, K, T, rd, rf, sigma, notional)
gamma(S, K, T, rd, rf, sigma, notional)
vega(S, K, T, rd, rf, sigma, notional)
theta(option_type, S, K, T, rd, rf, sigma, notional)
```

Required output conventions:

```txt
Delta: MXN per 1.00 spot move
Gamma: MXN per 1.00 spot move squared
Vega: MXN per 1.00 volatility move internally
Vega displayed/exported per 1 vol point
Theta internally annualized
Theta displayed/exported per day
```

Export:

```txt
vegaPerVolPoint = vega * 0.01
thetaPerDay = theta / 365
```

Acceptance checks:

```txt
Greeks are finite.
Analytical Greeks approximately match finite-difference Greeks.
Signed Greeks correctly reflect long/short position.
```

---

## 8.3 `research/book.py`

Define synthetic market assumptions and synthetic options book.

Required market assumptions:

```python
market = {
    "pair": "USD/MXN",
    "spot": 17.00,
    "domesticCurrency": "MXN",
    "foreignCurrency": "USD",
    "domesticRate": 0.095,
    "foreignRate": 0.045,
    "atmVolatility": 0.12,
    "dataMode": "synthetic"
}
```

Define 5 to 8 synthetic options.

Recommended starting book:

```python
options_book = [
    {
        "id": "OPT-001",
        "pair": "USD/MXN",
        "optionType": "call",
        "position": "long",
        "notionalUSD": 1000000,
        "strike": 17.00,
        "maturityYears": 0.25,
        "impliedVol": 0.120,
        "domesticRate": 0.095,
        "foreignRate": 0.045
    },
    {
        "id": "OPT-002",
        "pair": "USD/MXN",
        "optionType": "call",
        "position": "short",
        "notionalUSD": 750000,
        "strike": 17.50,
        "maturityYears": 0.25,
        "impliedVol": 0.125,
        "domesticRate": 0.095,
        "foreignRate": 0.045
    },
    {
        "id": "OPT-003",
        "pair": "USD/MXN",
        "optionType": "put",
        "position": "long",
        "notionalUSD": 1000000,
        "strike": 16.50,
        "maturityYears": 0.50,
        "impliedVol": 0.130,
        "domesticRate": 0.095,
        "foreignRate": 0.045
    },
    {
        "id": "OPT-004",
        "pair": "USD/MXN",
        "optionType": "put",
        "position": "short",
        "notionalUSD": 500000,
        "strike": 17.00,
        "maturityYears": 0.10,
        "impliedVol": 0.115,
        "domesticRate": 0.095,
        "foreignRate": 0.045
    },
    {
        "id": "OPT-005",
        "pair": "USD/MXN",
        "optionType": "call",
        "position": "long",
        "notionalUSD": 600000,
        "strike": 18.00,
        "maturityYears": 1.00,
        "impliedVol": 0.140,
        "domesticRate": 0.095,
        "foreignRate": 0.045
    },
    {
        "id": "OPT-006",
        "pair": "USD/MXN",
        "optionType": "put",
        "position": "short",
        "notionalUSD": 800000,
        "strike": 16.00,
        "maturityYears": 0.75,
        "impliedVol": 0.135,
        "domesticRate": 0.095,
        "foreignRate": 0.045
    }
]
```

Acceptance checks:

```txt
Book has calls and puts.
Book has long and short positions.
Book has multiple strikes.
Book has multiple maturities.
Book produces non-trivial net Greeks.
Book creates meaningful stress behavior.
```

If the first synthetic book produces boring charts, adjust the book.

The point is not to preserve the first numbers like sacred tablets.

The point is to create a realistic and explainable risk profile.

---

## 8.4 `research/scenarios.py`

Generate stress scenario outputs.

Required functions:

```python
generate_spot_shocks(book, market)
generate_vol_shocks(book, market)
generate_stress_grid(book, market)
```

Required spot shock grid:

```python
spot_shocks = [-0.10, -0.08, -0.06, -0.04, -0.02, 0.00, 0.02, 0.04, 0.06, 0.08, 0.10]
```

Required volatility shock grid:

```python
vol_shocks = [-0.05, -0.03, -0.01, 0.00, 0.01, 0.03, 0.05]
```

Volatility floor:

```python
volatility_floor = 0.01
```

Required outputs:

```txt
spot-shocks.json
vol-shocks.json
stress-grid.json
```

Acceptance checks:

```txt
Scenario P&L = scenario book value - base book value.
Worst-case and best-case scenarios are identifiable.
Stress grid has all spot-vol combinations.
No scenario has negative volatility.
```

---

## 8.5 `research/hedging.py`

Implement delta hedge analysis.

Required functions:

```python
calculate_delta_hedge(book_results)
generate_hedge_results(book, market)
```

Required logic:

```txt
Hedge notional should offset book delta.
If book delta is positive, hedge should lose when spot rises.
If book delta is negative, hedge should gain when spot rises.
```

Required output:

```txt
hedge-results.json
```

Required schema:

```json
{
  "baseBookDelta": 0,
  "hedgeNotionalUSD": 0,
  "hedgedBookDelta": 0,
  "unhedgedWorstLoss": 0,
  "hedgedWorstLoss": 0,
  "deltaReductionPct": 0,
  "worstLossReductionPct": 0,
  "scenarios": []
}
```

Acceptance checks:

```txt
Hedge reduces first-order spot exposure.
Hedged P&L differs from unhedged P&L.
Residual nonlinear risk remains.
The hedge sign is correct.
```

---

## 8.6 `research/risk.py`

Implement Monte Carlo simulation and VaR/ES.

Required functions:

```python
simulate_spot_paths(market, n_sims, horizon_days, seed)
generate_simulation_pnl(book, market)
calculate_var_es(pnl_values, confidence_levels)
generate_risk_limits(book_metrics, var_es, stress_summary)
```

Recommended settings:

```python
seed = 635
n_sims = 10000
horizon_days = 1
drift = 0.0
```

Required outputs:

```txt
simulation-results.json
var-es-results.json
risk-limits.json
```

Required VaR/ES levels:

```txt
95%
99%
```

Acceptance checks:

```txt
VaR is reported as positive loss.
ES is reported as positive loss.
ES should usually be greater than VaR at the same confidence level.
Simulation results are deterministic given seed.
Risk limit statuses are calculated, not manually assigned.
```

---

## 8.7 `research/attribution.py`

Implement P&L attribution.

Required functions:

```python
generate_attribution_scenarios(book, market)
calculate_pnl_attribution(book, market, scenario)
```

Required scenarios:

```txt
USD/MXN +5%, volatility +3 vol points
USD/MXN -5%, volatility +3 vol points
Worst stress scenario
Volatility crush scenario
```

Required attribution components:

```txt
Delta contribution
Gamma contribution
Vega contribution
Theta contribution
Residual
Full repricing P&L
```

Required output:

```txt
attribution-results.json
```

Acceptance checks:

```txt
Residual = full repricing P&L - sum(delta, gamma, vega, theta contributions).
Attribution values use consistent units.
Vega contribution uses vol points correctly.
Theta contribution uses days correctly.
```

---

## 8.8 `research/validate.py`

Create validation tests.

Required checks:

```txt
Put-call parity
Intrinsic value at expiry
Finite Greeks
Numerical delta comparison
Numerical gamma comparison
Numerical vega comparison
Book aggregation
Scenario repricing
VaR/ES sign convention
Delta hedge sign
JSON export completeness
```

Validation output:

```txt
validation-summary.json
```

Required schema:

```json
{
  "status": "pass",
  "checks": [
    {
      "name": "put_call_parity",
      "status": "pass",
      "maxError": 0.0001
    }
  ]
}
```

Acceptance rule:

```txt
Do not build frontend charts until the validation summary passes.
```

Yes, this is annoying. So is debugging fake finance numbers later.

---

## 8.9 `research/generate_outputs.py`

Create one master script that generates all frontend data.

Required behavior:

```bash
python generate_outputs.py
```

This script should:

```txt
Create or overwrite data/*.json
Run core calculations
Run scenario generation
Run hedging analysis
Run VaR/ES simulation
Run P&L attribution
Run validation
Print summary to terminal
```

Acceptance output example:

```txt
Generated market.json
Generated options-book.json
Generated pricing-results.json
Generated greeks-results.json
Generated spot-shocks.json
Generated vol-shocks.json
Generated stress-grid.json
Generated hedge-results.json
Generated simulation-results.json
Generated var-es-results.json
Generated attribution-results.json
Generated risk-limits.json
Generated validation-summary.json
Validation status: PASS
```

---

## 9. Phase 2: Frontend Foundation

---

## 9.1 Define TypeScript Types

Create:

```txt
lib/types.ts
```

Include types for:

```ts
export type MarketData = {
  pair: "USD/MXN";
  spot: number;
  domesticCurrency: "MXN";
  foreignCurrency: "USD";
  domesticRate: number;
  foreignRate: number;
  atmVolatility: number;
  valuationDate?: string;
  dataMode: "synthetic";
};

export type FXOption = {
  id: string;
  pair: "USD/MXN";
  optionType: "call" | "put";
  position: "long" | "short";
  notionalUSD: number;
  strike: number;
  maturityYears: number;
  impliedVol: number;
  domesticRate: number;
  foreignRate: number;
};

export type PricingResult = {
  id: string;
  optionType: "call" | "put";
  position: "long" | "short";
  pricePerUsd: number;
  marketValueMXN: number;
  signedMarketValueMXN: number;
};

export type GreeksResult = {
  id: string;
  delta: number;
  gamma: number;
  vegaPerVolPoint: number;
  thetaPerDay: number;
  signedDelta: number;
  signedGamma: number;
  signedVegaPerVolPoint: number;
  signedThetaPerDay: number;
};

export type SpotShockResult = {
  spotShock: number;
  scenarioSpot: number;
  bookValue: number;
  pnl: number;
};

export type VolShockResult = {
  volShock: number;
  scenarioVol: number;
  bookValue: number;
  pnl: number;
};

export type StressGridPoint = {
  spotShock: number;
  volShock: number;
  scenarioSpot: number;
  scenarioVol: number;
  bookValue: number;
  pnl: number;
};

export type HedgeResult = {
  baseBookDelta: number;
  hedgeNotionalUSD: number;
  hedgedBookDelta: number;
  unhedgedWorstLoss: number;
  hedgedWorstLoss: number;
  deltaReductionPct: number;
  worstLossReductionPct: number;
  scenarios: {
    spotShock: number;
    scenarioSpot: number;
    unhedgedPnl: number;
    hedgePnl: number;
    hedgedPnl: number;
  }[];
};

export type SimulationResult = {
  scenarioId: number;
  simulatedSpot: number;
  simulatedVol?: number;
  bookValue: number;
  pnl: number;
};

export type VarEsResult = {
  confidenceLevel: 0.95 | 0.99;
  var: number;
  expectedShortfall: number;
};

export type RiskLimitStatus = {
  metric: string;
  value: number;
  limit: number;
  utilization: number;
  status: "green" | "amber" | "red";
};

export type PnLAttribution = {
  scenarioName: string;
  fullRepricingPnl: number;
  deltaContribution: number;
  gammaContribution: number;
  vegaContribution: number;
  thetaContribution: number;
  residual: number;
};
```

---

## 9.2 Create Formatters

Create:

```txt
lib/formatters.ts
```

Required functions:

```ts
formatMXN(value: number): string
formatMXNCompact(value: number): string
formatUSD(value: number): string
formatUSDCompact(value: number): string
formatPercent(value: number): string
formatVolPoints(value: number): string
formatFX(value: number): string
formatNumber(value: number): string
formatSignedMXN(value: number): string
formatSignedPercent(value: number): string
```

Rules:

```txt
MXN values must be labeled as MXN.
USD values must be labeled as USD.
FX rates should use four decimals.
Percentages should show two decimals where useful.
Positive values should include + when used for P&L or shocks.
```

Do not leave raw decimals in the UI.

Nobody wants to see `0.030000000000000002` unless they are trying to diagnose JavaScript’s emotional instability.

---

## 9.3 Create Data Loaders

Create:

```txt
lib/data/
```

Recommended files:

```txt
market.ts
book.ts
pricing.ts
greeks.ts
stress.ts
hedge.ts
risk.ts
attribution.ts
```

Each file should import JSON from `data/`.

Example:

```ts
import market from "@/data/market.json";
import type { MarketData } from "@/lib/types";

export const marketData = market as MarketData;
```

Avoid fetching static data through API routes.

This is a static project. Do not build infrastructure theater.

---

## 9.4 Configure Global Styles

In:

```txt
app/globals.css
```

Define:

```txt
Base background
Text rendering
Selection color
Scrollbar style, optional
Tabular number utility
Chart tooltip base styles, if needed
```

Set body background:

```css
body {
  background: #05070A;
  color: #E6EDF3;
}
```

---

## 9.5 Configure Tailwind Theme

In:

```txt
tailwind.config.ts
```

Add colors from `03_DESIGN_SYSTEM.md`.

Required token groups:

```txt
background
panel
border
text
accent
```

Add font families:

```txt
sans
mono
```

Use:

```txt
Inter, Geist, or system sans
```

Do not waste build time hunting fonts like the project is applying to art school.

---

## 10. Phase 3: Global Layout Components

Build reusable components before section components.

---

## 10.1 `PageShell.tsx`

Responsibilities:

```txt
Wrap entire page
Apply background
Apply max width
Apply horizontal padding
Render children
```

Required style:

```txt
Dark background
Subtle radial gradient near top
Centered content
No excessive decoration
```

---

## 10.2 `Section.tsx`

Responsibilities:

```txt
Reusable section wrapper
Accept id
Accept children
Apply vertical spacing
```

Props:

```ts
type SectionProps = {
  id: string;
  children: React.ReactNode;
  className?: string;
};
```

---

## 10.3 `SectionHeader.tsx`

Responsibilities:

```txt
Render eyebrow
Render title
Render thesis
Render optional technical note
```

Props:

```ts
type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  thesis: string;
  note?: string;
};
```

---

## 10.4 `MetricCard.tsx`

Responsibilities:

```txt
Display label, value, unit/status, and interpretation
Use tabular numbers
Support positive/negative/status styling
```

Props:

```ts
type MetricCardProps = {
  label: string;
  value: string;
  status?: "green" | "amber" | "red" | "neutral";
  helper?: string;
};
```

---

## 10.5 `AnalyticsPanel.tsx`

Responsibilities:

```txt
Wrap charts and large tables
Show title and subtitle
Provide consistent border/background
```

Props:

```ts
type AnalyticsPanelProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: string;
};
```

---

## 10.6 `NarrativeBlock.tsx`

Responsibilities:

```txt
Render concise explanatory copy
Never become long essay block
```

Props:

```ts
type NarrativeBlockProps = {
  children: React.ReactNode;
};
```

---

## 10.7 `Badge.tsx`

Responsibilities:

```txt
Render compact labels
Support neutral, positive, warning, danger, info
```

Use for:

```txt
Synthetic data
USD/MXN
Garman-Kohlhagen
Within limit
Near limit
Breach
```

---

## 11. Phase 4: Page Sections

Build sections in exact page order.

---

## 11.1 Hero Section

Files:

```txt
components/hero/HeroSection.tsx
components/hero/ThesisCards.tsx
```

Required content:

```txt
Title: FX Options Risk Lab
Subtitle: An institutional-style USD/MXN options risk engine for pricing, Greeks, hedging, stress testing, VaR/ES, and P&L attribution.
Thesis: This project models a synthetic USD/MXN FX options book and analyzes how its value and risk profile change under spot moves, volatility shocks, time decay, and hedging decisions.
```

Required capability cards:

```txt
Pricing: Garman-Kohlhagen FX options
Risk: VaR, ES, and stress scenarios
Hedging: Delta and vega exposure control
Attribution: Explains where P&L comes from
```

Optional preview:

```txt
Mini risk snapshot using actual generated data
```

Do not use fake preview numbers.

Acceptance criteria:

```txt
User understands the project in under 20 seconds.
No student biography.
No class reference.
No generic motivational copy.
```

---

## 11.2 Market Setup Section

Files:

```txt
components/market/MarketSetupSection.tsx
components/market/MarketAssumptionsTable.tsx
```

Data:

```txt
market.json
```

Display:

```txt
Spot USD/MXN
Domestic currency: MXN
Foreign currency: USD
MXN rate
USD rate
ATM implied volatility
Synthetic data badge
```

Required explanation:

```txt
USD/MXN is quoted as MXN per 1 USD. Under the Garman-Kohlhagen framework, MXN is treated as the domestic currency and USD as the foreign currency.
```

Acceptance criteria:

```txt
Quote convention is clear.
Market assumptions are visible.
Synthetic data status is clear.
```

---

## 11.3 Options Book Section

Files:

```txt
components/book/OptionsBookSection.tsx
components/book/OptionsBookTable.tsx
components/book/BookSummaryCards.tsx
```

Data:

```txt
options-book.json
pricing-results.json
greeks-results.json
```

Display summary cards:

```txt
Number of instruments
Gross notional
Net market value
Net delta
Net vega
Net theta
```

Display table columns:

```txt
ID
Type
Position
Notional USD
Strike
Maturity
Implied Volatility
```

Required explanation:

```txt
The synthetic book combines long and short calls and puts across strikes and maturities. The structure is designed to create realistic offsetting exposures for controlled risk analysis.
```

Acceptance criteria:

```txt
Book looks like a real portfolio object.
Long and short positions are clear.
Book-level risk is summarized.
```

---

## 11.4 Pricing and Greeks Section

Files:

```txt
components/pricing/PricingGreeksSection.tsx
components/pricing/PricingTable.tsx
components/pricing/GreeksTable.tsx
```

Data:

```txt
pricing-results.json
greeks-results.json
```

Display pricing table:

```txt
ID
Type
Position
Price per USD
Market Value MXN
Signed Market Value MXN
```

Display Greeks table:

```txt
ID
Delta
Gamma
Vega / 1 vol point
Theta / day
Signed Delta
Signed Vega
Signed Theta
```

Display book-level metrics:

```txt
Net market value
Net delta
Net gamma
Net vega per 1 vol point
Net theta per day
```

Required explanation:

```txt
Garman-Kohlhagen extends Black-Scholes to FX by treating the foreign interest rate like a continuous yield. Greeks measure how the option book responds to spot, volatility, and time.
```

Acceptance criteria:

```txt
Instrument-level values are visible.
Book-level aggregation is visible.
Greeks have units.
Signed exposures are not ambiguous.
```

---

## 11.5 Stress Testing Section

Files:

```txt
components/stress/StressTestingSection.tsx
components/stress/SpotShockChart.tsx
components/stress/VolShockChart.tsx
components/stress/StressHeatmap.tsx
components/stress/StressSummaryCards.tsx
```

Data:

```txt
spot-shocks.json
vol-shocks.json
stress-grid.json
risk-limits.json
```

Required visuals:

```txt
Spot shock P&L line chart
Volatility shock P&L line chart
Spot-volatility stress heatmap
Worst/best case summary cards
```

Required summary cards:

```txt
Worst-case P&L
Worst-case spot shock
Worst-case vol shock
Best-case P&L
Stress loss limit
Stress status
```

Required explanation:

```txt
Stress testing reprices the full book under market scenarios. It does not rely only on linear Greek approximations, which can miss nonlinear option behavior.
```

Acceptance criteria:

```txt
Heatmap is readable.
Worst-case scenario is obvious.
Spot and vol shock charts show book behavior.
No chart uses fake hardcoded values.
```

---

## 11.6 Hedging Lab Section

Files:

```txt
components/hedging/HedgingLabSection.tsx
components/hedging/HedgeComparisonChart.tsx
components/hedging/HedgeSummaryCards.tsx
components/hedging/HedgeToggle.tsx
```

Data:

```txt
hedge-results.json
```

Required interaction:

```txt
Toggle:
- Unhedged
- Hedged
- Both
```

Default:

```txt
Both
```

Required summary cards:

```txt
Original delta
Hedge notional
Hedged delta
Delta reduction %
Unhedged worst loss
Hedged worst loss
Worst loss reduction %
```

Required chart:

```txt
Unhedged vs hedged P&L under spot shocks
```

Required explanation:

```txt
Delta hedging reduces first-order spot exposure, but it does not eliminate gamma, vega, theta, or residual nonlinear risk.
```

Acceptance criteria:

```txt
User can visually compare hedged and unhedged P&L.
Hedge impact is clear.
Residual risk is explained.
```

---

## 11.7 VaR and Expected Shortfall Section

Files:

```txt
components/risk/VarEsSection.tsx
components/risk/PnlDistributionChart.tsx
components/risk/VarEsCards.tsx
components/risk/RiskLimitPanel.tsx
```

Data:

```txt
simulation-results.json
var-es-results.json
risk-limits.json
```

Required visuals:

```txt
P&L distribution histogram
95% VaR marker
99% VaR marker
Risk limit panel
```

Required summary cards:

```txt
95% VaR
99% VaR
95% Expected Shortfall
99% Expected Shortfall
Number of simulations
Risk horizon
```

Required explanation:

```txt
VaR estimates a loss threshold at a confidence level. Expected Shortfall estimates the average loss beyond that threshold, making it more sensitive to tail risk.
```

Acceptance criteria:

```txt
VaR and ES are positive loss values.
Risk limit statuses are labeled.
Histogram is readable.
Tail risk is visually clear.
```

---

## 11.8 P&L Attribution Section

Files:

```txt
components/attribution/PnlAttributionSection.tsx
components/attribution/AttributionChart.tsx
components/attribution/AttributionTable.tsx
components/attribution/ScenarioSelector.tsx
```

Data:

```txt
attribution-results.json
```

Required interaction:

```txt
Scenario selector
```

Required scenarios:

```txt
USD/MXN +5%, volatility +3 vol points
USD/MXN -5%, volatility +3 vol points
Worst stress scenario
Volatility crush scenario
```

Required chart:

```txt
Waterfall chart, preferred
Bar chart, acceptable
```

Required components:

```txt
Delta contribution
Gamma contribution
Vega contribution
Theta contribution
Residual
Full repricing P&L
```

Required explanation:

```txt
P&L attribution compares full repricing P&L against a Greek-based approximation. The residual captures model approximation error and nonlinear effects not fully explained by the selected terms.
```

Acceptance criteria:

```txt
User can see what drove P&L.
Residual is explained.
Scenario selector works.
Values match generated attribution data.
```

---

## 11.9 Model Assumptions and Limitations Section

Files:

```txt
components/assumptions/ModelAssumptionsSection.tsx
components/assumptions/LimitationsList.tsx
```

Required assumptions:

```txt
The options book is synthetic.
Market assumptions are illustrative.
FX spot follows a lognormal framework in the base pricing model.
Volatility is treated as an input.
The base version does not model full volatility smile/skew.
Hedging is simplified and discrete.
Transaction costs are excluded or simplified.
VaR/ES depends on scenario assumptions.
Stress testing is illustrative, not predictive.
The system is not intended for trading or production risk management.
```

Required future extensions:

```txt
Volatility smile and skew
Term structure of implied volatility
Historical USD/MXN calibration
GARCH volatility forecasting
Discrete multi-day hedge simulation
Transaction costs and hedge slippage
CVA/FVA extension
Counterparty exposure profile
Real market data integration
```

Acceptance criteria:

```txt
Section sounds rigorous, not apologetic.
Limitations are clear.
Future extensions are compact.
```

---

## 11.10 Footer

Files:

```txt
components/footer/ProjectFooter.tsx
```

Required footer content:

```txt
GitHub link
Live demo link, if available
Synthetic data disclaimer
Academic acknowledgment
```

Required disclaimer:

```txt
This project uses synthetic data for educational and portfolio demonstration purposes. It is not intended for trading, investment advice, or production risk management.
```

Required acknowledgment:

```txt
This independent project was inspired by concepts studied in FE635: Financial Enterprise Risk Engineering at Stevens Institute of Technology under Prof. Juan Eroles. The implementation, data design, analytics structure, and presentation were developed independently for portfolio and research demonstration purposes.
```

Acceptance criteria:

```txt
Credit is provided without making the whole project sound like homework.
No class reference appears in the hero.
```

---

## 12. Phase 5: Chart Implementation Details

Use Recharts unless Plotly is specifically needed.

Recommended:

```txt
Recharts for line charts, histograms, and bar charts
Custom CSS grid or SVG for heatmap if Recharts heatmap is awkward
```

---

## 12.1 Spot Shock Chart

Requirements:

```txt
Line chart
X-axis: Spot shock %
Y-axis: Book P&L MXN
Zero P&L reference line
Tooltip with scenario spot and P&L
```

Data:

```txt
spot-shocks.json
```

Acceptance:

```txt
P&L curve is visible.
Zero line is visible.
Positive/negative regions are understandable.
```

---

## 12.2 Vol Shock Chart

Requirements:

```txt
Line chart
X-axis: Volatility shock in vol points
Y-axis: Book P&L MXN
Zero P&L reference line
Tooltip with scenario volatility and P&L
```

Data:

```txt
vol-shocks.json
```

Acceptance:

```txt
Vol exposure is clear.
Tooltip uses vol points, not raw decimals.
```

---

## 12.3 Stress Heatmap

Requirements:

```txt
Grid heatmap
X-axis: Spot shock %
Y-axis: Volatility shock
Cell value: P&L MXN
Tooltip with spot shock, vol shock, scenario spot, scenario vol, and P&L
```

Color behavior:

```txt
Losses: red scale
Near zero: dark neutral
Gains: green/teal scale
```

Required special treatment:

```txt
Worst-case cell should be visually identifiable.
Best-case cell may be identified if not visually noisy.
```

Acceptance:

```txt
Heatmap is readable on desktop.
Mobile version does not break.
Hover tooltip works.
```

---

## 12.4 Hedge Comparison Chart

Requirements:

```txt
Two-line chart
Unhedged P&L
Hedged P&L
Zero P&L reference line
Toggle controls visibility
```

Acceptance:

```txt
Default view shows both lines.
User can switch views.
Hedging benefit is visually obvious.
```

---

## 12.5 P&L Distribution Chart

Requirements:

```txt
Histogram of simulated P&L
95% VaR marker
99% VaR marker
Optional ES markers
Tail region visually indicated if feasible
```

Acceptance:

```txt
VaR marker positions correspond to generated values.
Histogram is not overcrowded.
Tooltip shows bin range and count.
```

---

## 12.6 Attribution Chart

Preferred:

```txt
Waterfall chart
```

If waterfall is too slow to implement cleanly, use:

```txt
Positive/negative bar chart
```

Required bars:

```txt
Delta
Gamma
Vega
Theta
Residual
Full repricing P&L
```

Acceptance:

```txt
P&L drivers are obvious.
Positive/negative signs are clear.
Scenario selector updates chart and table.
```

---

## 13. Phase 6: Styling and Visual Polish

Use `03_DESIGN_SYSTEM.md` as the visual authority.

---

## 13.1 Global Visual Rules

Apply:

```txt
Dark institutional background
Panel borders
Muted grid lines
Compact cards
Professional tables
Consistent chart styling
Tabular numbers
Limited animation
```

Avoid:

```txt
Bright gradients everywhere
Giant icons
Rounded cartoon cards
Fake terminal styling
Marketing landing page layout
Huge paragraph blocks
```

---

## 13.2 Typography

Use:

```txt
Strong hero title
Clear section titles
Compact explanatory copy
Small uppercase labels
Tabular metric values
```

Text rules:

```txt
No student journey storytelling
No "passionate about finance and technology"
No vague claims
No generic LinkedIn phrasing
```

The copy should sound like a technical case study, not a motivational caption under a chart.

---

## 13.3 Responsive Polish

Check:

```txt
Desktop
Tablet
Mobile
```

Required behavior:

```txt
Tables scroll horizontally on mobile.
Charts remain readable.
Metric cards stack cleanly.
Heatmap does not break.
Section spacing reduces on mobile.
No clipped text.
No overflowing chart labels.
```

---

## 13.4 Accessibility Polish

Check:

```txt
Keyboard focus visible
Buttons and toggles accessible
Text contrast readable
Status labels include text
Charts have titles and explanations
No information conveyed only through color
```

---

## 14. Phase 7: README

Create a strong root `README.md`.

Required sections:

```txt
Project title
Short description
Live demo link
Screenshots
Core features
Quant methods
Tech stack
Repository structure
How to run locally
How to regenerate data
Model assumptions
Limitations
Disclaimer
Academic acknowledgment
```

---

## 14.1 README Short Description

Use:

```txt
FX Options Risk Lab is a self-directed derivatives analytics project that models a synthetic USD/MXN options book and analyzes its pricing, Greeks, hedging behavior, stress P&L, VaR/ES, and P&L attribution under market scenarios.
```

---

## 14.2 README Core Features

Include:

```txt
Garman-Kohlhagen FX option pricing
Instrument-level and book-level Greeks
Synthetic USD/MXN options book
Spot and volatility stress testing
Delta hedging analysis
Monte Carlo VaR and Expected Shortfall
Risk limit monitoring
P&L attribution across delta, gamma, vega, theta, and residual effects
```

---

## 14.3 README Tech Stack

Include:

```txt
Next.js
TypeScript
Tailwind CSS
Recharts or Plotly.js
Python
NumPy
Pandas
SciPy
Static JSON data
```

---

## 14.4 README Run Instructions

Frontend:

```bash
npm install
npm run dev
```

Python data generation:

```bash
cd research
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python generate_outputs.py
```

Build:

```bash
npm run build
```

---

## 14.5 README Disclaimer

Use:

```txt
This project uses synthetic data for educational and portfolio demonstration purposes. It is not intended for trading, investment advice, or production risk management.
```

---

## 14.6 README Academic Acknowledgment

Use:

```txt
This independent project was inspired by concepts studied in FE635: Financial Enterprise Risk Engineering at Stevens Institute of Technology under Prof. Juan Eroles. The implementation, data design, analytics structure, and presentation were developed independently for portfolio and research demonstration purposes.
```

---

## 15. Phase 8: QA Checklist

Before deployment, complete this checklist.

---

## 15.1 Quant QA

Required:

```txt
Put-call parity validation passes.
Numerical Greeks match analytical Greeks within tolerance.
Book aggregation is correct.
Scenario P&L equals scenario value minus base value.
VaR and ES sign conventions are correct.
Delta hedge sign is correct.
Validation summary says PASS.
```

---

## 15.2 Data QA

Required:

```txt
All expected JSON files exist.
No JSON file contains NaN or Infinity.
All values are in expected units.
Random simulation uses fixed seed.
Frontend values match generated data.
No fake chart values are manually hardcoded.
```

---

## 15.3 Frontend QA

Required:

```txt
Page loads without console errors.
No hydration errors.
Charts render correctly.
Toggles work.
Scenario selector works.
Tooltips show formatted values.
Tables are readable.
Metric cards use correct formatting.
```

---

## 15.4 Design QA

Required:

```txt
Design looks institutional and serious.
No generic SaaS template feel.
No blog-post layout.
No trading-game styling.
No fake terminal clutter.
Charts are visually useful.
Section hierarchy is clear.
```

---

## 15.5 Content QA

Required:

```txt
No class references in hero.
No Hornet Contest references in main UI.
No MiniSystem references in main UI.
No homework/assignment framing.
Disclaimer appears.
Academic acknowledgment appears only in footer/README.
Copy is concise and technical.
```

---

## 15.6 Responsive QA

Required:

```txt
Desktop layout looks polished.
Tablet layout is readable.
Mobile layout does not break.
Tables scroll horizontally if needed.
Charts remain usable.
Heatmap does not overflow badly.
```

---

## 16. Phase 9: Deployment Prep

Deployment is required but should happen only after local QA passes.

Recommended deployment platform:

```txt
Netlify or Vercel
```

Before deploy:

```bash
npm run build
```

Fix all build errors.

Do not deploy a broken build and call it “iteration.” That is just public evidence.

---

## 16.1 Metadata

Set metadata in:

```txt
app/layout.tsx
```

Required metadata:

```txt
Title: FX Options Risk Lab | USD/MXN Derivatives Risk Analytics
Description: A self-directed FX options risk analytics project modeling a synthetic USD/MXN options book through pricing, Greeks, hedging, stress testing, VaR/ES, and P&L attribution.
```

Add Open Graph metadata if possible.

---

## 16.2 Preview Image

Create:

```txt
public/og-image.png
```

Preview image should show:

```txt
Project title
Short subtitle
A clean dashboard screenshot or abstract risk heatmap visual
```

Do not use random finance stock imagery.

---

## 17. Version 1 Feature Lock

Version 1 must include:

```txt
Hero section
Market setup
Options book
Pricing and Greeks
Stress testing
Hedging lab
VaR / Expected Shortfall
P&L attribution
Model assumptions and limitations
Footer acknowledgment
README
Python data generation
Validation summary
```

Version 1 must include charts:

```txt
Spot shock P&L chart
Volatility shock P&L chart
Spot-vol stress heatmap
Unhedged vs hedged P&L chart
P&L distribution histogram
P&L attribution chart
```

Version 1 must include interactions:

```txt
Hedged vs unhedged toggle
P&L attribution scenario selector
Stress heatmap tooltip
```

Optional:

```txt
VaR confidence toggle
Individual option selector
Notional scale toggle
```

Do not add optional features until required features are complete.

---

## 18. Out-of-Scope for Version 1

Do not build:

```txt
Live market data
Backend database
User accounts
Trade booking workflow
Order execution
Leaderboard
Game mechanics
Fake news feed
AI market commentary
Full volatility smile
Stochastic volatility
CVA/FVA engine
Full regulatory capital engine
Counterparty exposure simulation
Multi-currency portfolio
Authentication
Admin dashboard
```

These can be future extensions only.

Version 1 should be narrow, clean, and defensible.

---

## 19. Common Failure Modes

Avoid these failure modes.

---

### 19.1 Failure Mode: Looks Like a Blog Post

Symptoms:

```txt
Long paragraphs
Charts buried between essays
No dashboard structure
Weak visual hierarchy
```

Fix:

```txt
Use compact narrative blocks, metric cards, tables, and charts.
```

---

### 19.2 Failure Mode: Looks Like a CS Project

Symptoms:

```txt
Emphasis on React components over financial logic
No visible quant model
No validation
No model assumptions
Generic UI
```

Fix:

```txt
Lead with pricing, Greeks, stress testing, hedging, VaR/ES, and attribution.
```

---

### 19.3 Failure Mode: Looks Like a Trading Game

Symptoms:

```txt
Buy/sell buttons
Fake trade execution
Leaderboard
Gamified P&L
Bright colors
```

Fix:

```txt
Frame everything as risk analytics and scenario analysis.
```

---

### 19.4 Failure Mode: Looks Fake

Symptoms:

```txt
Hardcoded values
Charts with no data source
No validation
No formulas
Vague explanations
```

Fix:

```txt
Generate data in Python, validate calculations, and explain assumptions.
```

---

### 19.5 Failure Mode: Too Complicated

Symptoms:

```txt
Too many models
Too many pages
Too many controls
Backend complexity
Unfinished features
```

Fix:

```txt
Keep Version 1 focused on USD/MXN options book risk analytics.
```

---

## 20. Final Acceptance Test

Before calling the project complete, answer these questions.

```txt
Can a recruiter understand the project in under 20 seconds?
Can an interviewer ask serious questions from the project?
Can the builder explain every model and chart?
Are the numbers generated from Python, not manually invented?
Does the design look institutional and professional?
Does the project avoid class/homework framing?
Does the README explain how the system works?
Does the validation summary pass?
Would this strengthen a resume for quant risk, derivatives analytics, market risk, or trading systems roles?
```

If the answer to any of these is no, the project is not done.

---

## 21. Final Build Scope Lock

The build is locked as:

> A Python-validated, Next.js-deployed FX options risk analytics case study modeling a synthetic USD/MXN options book through Garman-Kohlhagen pricing, Greeks, stress testing, delta hedging, VaR/ES, risk limits, and P&L attribution.

The final project should demonstrate:

```txt
Financial engineering knowledge
Practical implementation ability
Quant risk intuition
Derivatives analytics understanding
Clean technical communication
Professional portfolio presentation
```

The goal is not to build the largest possible app.

The goal is to build the most credible Version 1.
