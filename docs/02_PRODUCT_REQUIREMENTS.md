# 02_PRODUCT_REQUIREMENTS.md

# FX Options Risk Lab

## Product Requirements

---

## 1. Purpose of This Document

This document defines the product requirements for **FX Options Risk Lab**.

It translates the project scope and quantitative specification into a concrete deployed product: a single-page, narrative-driven, institutional-style FX options risk analytics case study.

This document specifies:

* Website structure
* User experience
* Required sections
* Required components
* Required charts
* Required tables
* Required interactions
* Data dependencies
* Content requirements
* Acceptance criteria
* Product anti-patterns to avoid

The goal is to prevent the project from becoming a generic dashboard, blog post, trading game, or half-decorated finance-themed web page. Humanity has produced enough of those already.

---

## 2. Product Definition

**FX Options Risk Lab** is a deployed web application and portfolio case study that models a synthetic USD/MXN FX options book and analyzes its pricing, Greeks, stress behavior, hedging impact, VaR/ES, and P&L attribution.

The product should feel like:

* A serious quantitative finance project
* A professional risk analytics prototype
* A clean institutional dashboard
* A technical case study for recruiters and interviewers

The product should not feel like:

* A class assignment
* A homework recap
* A generic blog post
* A stock market game
* A fake Bloomberg terminal
* A React UI demo with finance words pasted on top

---

## 3. Primary User Goals

The product should support three main user goals.

---

### 3.1 Recruiter Goal

A recruiter should understand within 20 seconds:

* The project is about FX options risk analytics.
* The project is relevant to quant risk, derivatives analytics, and trading systems.
* The builder applied financial engineering concepts to a working system.
* The project has real models, real calculations, and structured outputs.

The recruiter should not need to read long paragraphs to understand the project.

---

### 3.2 Interviewer Goal

An interviewer should be able to inspect the project and ask technical questions about:

* Garman-Kohlhagen pricing
* FX quote conventions
* Greeks
* Spot and volatility shocks
* Delta hedging
* Vega exposure
* VaR and Expected Shortfall
* P&L attribution
* Model assumptions and limitations

The project should provide enough technical depth to support a serious conversation.

---

### 3.3 Builder Goal

The builder should be able to use the project as an interview preparation reference.

The project should help the builder quickly review:

* What the model does
* Why each chart exists
* What each risk metric means
* How hedging changes the book
* Why the book gains or loses value
* What limitations the model has

---

## 4. Product Format

The product should be built as a **single-page application** with a strong narrative flow.

Recommended format:

```txt
One-page case study + embedded analytics dashboard sections
```

Do not create many separate pages unless absolutely necessary.

A single-page flow is preferred because:

* Recruiters can scan it quickly.
* The project story stays controlled.
* The sections build on each other.
* The analytics feel connected.
* The page avoids navigation clutter.

---

## 5. Required Technology Stack

The deployed app should use:

```txt
Next.js
TypeScript
Tailwind CSS
Recharts or Plotly.js
Python-generated JSON/CSV data
```

Recommended supporting libraries:

```txt
Framer Motion, used lightly
Lucide React, for minimal icons
```

Avoid unnecessary backend complexity in Version 1.

The app should use Python-generated static data files from the quantitative layer. The frontend should load and visualize these outputs.

---

## 6. Product Architecture

Recommended project structure:

```txt
fx-options-risk-lab/
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
      GreeksTable.tsx
      InstrumentBreakdown.tsx

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
      HedgeExplanation.tsx

    risk/
      VarEsSection.tsx
      PnlDistributionChart.tsx
      RiskLimitPanel.tsx
      VarEsCards.tsx

    attribution/
      PnlAttributionSection.tsx
      AttributionWaterfall.tsx
      AttributionTable.tsx

    assumptions/
      ModelAssumptionsSection.tsx
      LimitationsList.tsx

    footer/
      ProjectFooter.tsx

  lib/
    formatters.ts
    data-loaders.ts
    chart-utils.ts
    constants.ts

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

  research/
    pricing.py
    greeks.py
    book.py
    scenarios.py
    risk.py
    attribution.py
    validate.py
    generate_outputs.py

  README.md
```

The frontend should remain clean and presentation-focused. The Python layer should handle validation and data generation.

---

## 7. Information Architecture

The page should follow this exact section order:

```txt
1. Hero / Project Thesis
2. Market Setup
3. Synthetic USD/MXN Options Book
4. Pricing and Greeks
5. Stress Testing
6. Hedging Lab
7. VaR and Expected Shortfall
8. P&L Attribution
9. Model Assumptions and Limitations
10. Footer / Acknowledgment
```

Each section should answer a clear question.

---

## 8. Section-Level Requirements

---

# 8.1 Hero / Project Thesis

## Purpose

The hero section should immediately explain the project.

The user should understand:

* What the project is
* What market it studies
* What analytics it includes
* Why it matters

## Required Content

Title:

```txt
FX Options Risk Lab
```

Subtitle:

```txt
An institutional-style USD/MXN options risk engine for pricing, Greeks, hedging, stress testing, VaR/ES, and P&L attribution.
```

Short thesis:

```txt
This project models a synthetic USD/MXN FX options book and analyzes how its value and risk profile change under spot moves, volatility shocks, time decay, and hedging decisions.
```

## Required Summary Cards

The hero must include four compact summary cards:

```txt
Pricing
Garman-Kohlhagen FX options

Risk
VaR, ES, and stress scenarios

Hedging
Delta and vega exposure control

Attribution
Explains where P&L comes from
```

## Required Visual Style

The hero should feel serious and technical.

Avoid:

* Long personal intro
* Student biography
* Generic motivational language
* Huge decorative gradients
* Fake trading screenshots

## Acceptance Criteria

The hero passes if a recruiter can understand the project in under 20 seconds.

---

# 8.2 Market Setup

## Purpose

Define the base USD/MXN market environment used for pricing and risk analysis.

## Required Content

The section should answer:

```txt
What market assumptions define the base case?
```

## Required Data

Load from:

```txt
data/market.json
```

Required fields:

```ts
type MarketData = {
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
```

## Required Components

```txt
MarketSetupSection
MarketAssumptionsTable
MetricCard
NarrativeBlock
```

## Required Metrics

Display:

* Spot USD/MXN
* Domestic currency
* Foreign currency
* MXN rate
* USD rate
* ATM implied volatility
* Data mode: synthetic

## Required Explanation

The section must explain:

```txt
USD/MXN is quoted as MXN per 1 USD. In this setup, MXN is the domestic currency and USD is the foreign currency for Garman-Kohlhagen pricing.
```

## Acceptance Criteria

The market setup passes if users clearly understand the quote convention and base assumptions before seeing option prices.

---

# 8.3 Synthetic USD/MXN Options Book

## Purpose

Introduce the synthetic options portfolio being analyzed.

## Required Content

The section should answer:

```txt
What instruments are inside the options book?
```

## Required Data

Load from:

```txt
data/options-book.json
```

Required schema:

```ts
type FXOption = {
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
```

## Required Components

```txt
OptionsBookSection
OptionsBookTable
BookSummaryCards
```

## Required Table Columns

The options book table should include:

```txt
ID
Type
Position
Notional USD
Strike
Maturity
Implied Volatility
```

## Required Summary Cards

Show book-level:

```txt
Number of instruments
Gross notional
Net market value
Net delta
Net vega
Net theta
```

## Required Explanation

The section must explain:

```txt
The book is synthetic and intentionally constructed to create offsetting long/short exposures across strikes and maturities. The purpose is controlled risk analysis, not market forecasting.
```

## Acceptance Criteria

This section passes if the user can identify what is being priced and why the book has portfolio-level risk.

---

# 8.4 Pricing and Greeks

## Purpose

Show how the system prices the options and measures risk sensitivities.

## Required Content

The section should answer:

```txt
What is each option worth, and what are its main risk sensitivities?
```

## Required Data

Load from:

```txt
data/pricing-results.json
data/greeks-results.json
```

Required pricing schema:

```ts
type PricingResult = {
  id: string;
  optionType: "call" | "put";
  position: "long" | "short";
  pricePerUsd: number;
  marketValueMXN: number;
  signedMarketValueMXN: number;
};
```

Required Greeks schema:

```ts
type GreeksResult = {
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
```

## Required Components

```txt
PricingGreeksSection
GreeksTable
InstrumentBreakdown
MetricCard
NarrativeBlock
```

## Required Tables

### Instrument Pricing Table

Columns:

```txt
ID
Type
Position
Price per USD
Market Value MXN
Signed Market Value MXN
```

### Greeks Table

Columns:

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

## Required Book-Level Metrics

Show:

```txt
Net market value
Net delta
Net gamma
Net vega per 1 vol point
Net theta per day
```

## Required Explanation

The section must explain:

```txt
Garman-Kohlhagen extends Black-Scholes to FX by treating the foreign interest rate like a continuous yield. Greeks measure how the option book responds to spot, volatility, and time.
```

## Acceptance Criteria

This section passes if users can see both instrument-level and book-level valuation/risk.

---

# 8.5 Stress Testing

## Purpose

Show how the options book responds under market shocks.

This should be one of the strongest visual sections of the product.

## Required Content

The section should answer:

```txt
How does the book behave when spot and volatility move?
```

## Required Data

Load from:

```txt
data/spot-shocks.json
data/vol-shocks.json
data/stress-grid.json
```

Spot shock schema:

```ts
type SpotShockResult = {
  spotShock: number;
  scenarioSpot: number;
  bookValue: number;
  pnl: number;
};
```

Vol shock schema:

```ts
type VolShockResult = {
  volShock: number;
  scenarioVol: number;
  bookValue: number;
  pnl: number;
};
```

Stress grid schema:

```ts
type StressGridPoint = {
  spotShock: number;
  volShock: number;
  scenarioSpot: number;
  scenarioVol: number;
  bookValue: number;
  pnl: number;
};
```

## Required Components

```txt
StressTestingSection
SpotShockChart
VolShockChart
StressHeatmap
StressSummaryCards
NarrativeBlock
```

## Required Visuals

### Spot Shock Chart

Line chart showing:

```txt
X-axis: Spot shock %
Y-axis: Book P&L MXN
```

### Volatility Shock Chart

Line chart showing:

```txt
X-axis: Volatility shock in vol points
Y-axis: Book P&L MXN
```

### Spot-Vol Stress Heatmap

Heatmap showing:

```txt
X-axis: Spot shock %
Y-axis: Volatility shock
Cell value: P&L MXN
```

## Required Summary Cards

Display:

```txt
Worst-case P&L
Worst-case spot shock
Worst-case vol shock
Best-case P&L
Stress loss limit
Stress status
```

## Required Explanation

The section must explain:

```txt
Stress testing reprices the full book under market scenarios. It does not rely only on linear Greek approximations, which can miss nonlinear option behavior.
```

## Acceptance Criteria

This section passes if users can visually identify where the book is most vulnerable.

---

# 8.6 Hedging Lab

## Purpose

Show how hedging changes the risk profile of the options book.

## Required Content

The section should answer:

```txt
What risk remains after delta hedging?
```

## Required Data

Load from:

```txt
data/hedge-results.json
```

Required schema:

```ts
type HedgeResult = {
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
```

## Required Components

```txt
HedgingLabSection
HedgeComparisonChart
HedgeSummaryCards
HedgeExplanation
NarrativeBlock
```

## Required Visuals

### Unhedged vs Hedged P&L Chart

Line chart showing:

```txt
X-axis: Spot shock %
Y-axis: P&L MXN
Lines:
- Unhedged book P&L
- Hedged book P&L
```

## Required Summary Cards

Display:

```txt
Original delta
Hedge notional
Hedged delta
Delta reduction %
Unhedged worst loss
Hedged worst loss
Worst loss reduction %
```

## Required Explanation

The section must explain:

```txt
Delta hedging reduces first-order spot exposure, but it does not eliminate gamma, vega, theta, or residual nonlinear risk.
```

## Optional Feature

Add a toggle:

```txt
Show unhedged only
Show hedged only
Show both
```

## Acceptance Criteria

This section passes if users can clearly see that hedging helps but does not eliminate all risk.

---

# 8.7 VaR and Expected Shortfall

## Purpose

Summarize downside risk using simulated P&L scenarios.

## Required Content

The section should answer:

```txt
How large could downside losses become under modeled scenarios?
```

## Required Data

Load from:

```txt
data/simulation-results.json
data/var-es-results.json
data/risk-limits.json
```

Simulation result schema:

```ts
type SimulationResult = {
  scenarioId: number;
  simulatedSpot: number;
  simulatedVol?: number;
  bookValue: number;
  pnl: number;
};
```

VaR/ES schema:

```ts
type VarEsResults = {
  confidenceLevel: 0.95 | 0.99;
  var: number;
  expectedShortfall: number;
}[];
```

Risk limit schema:

```ts
type RiskLimitStatus = {
  metric: string;
  value: number;
  limit: number;
  utilization: number;
  status: "green" | "amber" | "red";
};
```

## Required Components

```txt
VarEsSection
PnlDistributionChart
VarEsCards
RiskLimitPanel
NarrativeBlock
```

## Required Visuals

### P&L Distribution Chart

Histogram showing:

```txt
X-axis: Simulated P&L MXN
Y-axis: Scenario count
Markers:
- 95% VaR
- 99% VaR
- 95% ES
- 99% ES, optional
```

## Required Summary Cards

Display:

```txt
95% VaR
99% VaR
95% Expected Shortfall
99% Expected Shortfall
Number of simulations
Risk horizon
```

## Required Risk Limit Panel

Show status for:

```txt
95% VaR
99% VaR
Worst stress loss
Absolute delta
Vega per vol point
```

Status rules:

```txt
Green: utilization < 80%
Amber: 80% <= utilization < 100%
Red: utilization >= 100%
```

## Required Explanation

The section must explain:

```txt
VaR estimates a loss threshold at a confidence level. Expected Shortfall estimates the average loss beyond that threshold, making it more sensitive to tail risk.
```

## Acceptance Criteria

This section passes if users understand both the downside risk estimate and whether it breaches defined risk limits.

---

# 8.8 P&L Attribution

## Purpose

Explain why the book gained or lost value under a selected scenario.

## Required Content

The section should answer:

```txt
What explains the book's P&L?
```

## Required Data

Load from:

```txt
data/attribution-results.json
```

Required schema:

```ts
type PnLAttribution = {
  scenarioName: string;
  fullRepricingPnl: number;
  deltaContribution: number;
  gammaContribution: number;
  vegaContribution: number;
  thetaContribution: number;
  residual: number;
};
```

## Required Components

```txt
PnlAttributionSection
AttributionWaterfall
AttributionTable
NarrativeBlock
```

## Required Visuals

Preferred:

```txt
Waterfall chart
```

Acceptable alternative:

```txt
Positive/negative bar chart
```

The chart should show:

```txt
Delta contribution
Gamma contribution
Vega contribution
Theta contribution
Residual
Full repricing P&L
```

## Required Table

Columns:

```txt
Component
Contribution MXN
Interpretation
```

## Required Explanation

The section must explain:

```txt
P&L attribution compares full repricing P&L against a Greek-based approximation. The residual captures model approximation error and nonlinear effects not fully explained by the selected terms.
```

## Acceptance Criteria

This section passes if users can understand why a scenario produced gains or losses.

---

# 8.9 Model Assumptions and Limitations

## Purpose

Make the project more credible by explicitly stating what the model does and does not capture.

## Required Content

The section should answer:

```txt
What assumptions does the model rely on?
```

## Required Components

```txt
ModelAssumptionsSection
LimitationsList
NarrativeBlock
```

## Required Assumptions

Include:

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

## Required Future Extensions

Include compact future extension items:

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

## Acceptance Criteria

This section passes if it makes the project look rigorous rather than incomplete.

---

# 8.10 Footer / Acknowledgment

## Purpose

Provide GitHub, portfolio, disclaimer, and academic acknowledgment information without making the project sound like homework.

## Required Content

Footer should include:

```txt
GitHub link
Portfolio link, if applicable
Synthetic data disclaimer
Academic acknowledgment
```

## Required Disclaimer

```txt
This project uses synthetic data for educational and portfolio demonstration purposes. It is not intended for trading, investment advice, or production risk management.
```

## Required Academic Acknowledgment

```txt
This independent project was inspired by concepts studied in FE635: Financial Enterprise Risk Engineering at Stevens Institute of Technology under Prof. Juan Eroles. The implementation, data design, analytics structure, and presentation were developed independently for portfolio and research demonstration purposes.
```

## Acceptance Criteria

The footer passes if it gives proper credit without framing the product as a class assignment.

---

## 9. Required Global Components

---

# 9.1 PageShell

## Purpose

Provides the main layout wrapper.

## Requirements

The page shell should include:

```txt
Dark background
Maximum content width
Consistent horizontal padding
Section spacing
Optional sticky section navigation
Footer
```

---

# 9.2 Section

## Purpose

Reusable wrapper for each page section.

## Requirements

Each section should include:

```txt
Section ID
Consistent vertical spacing
Optional divider
Content grid
Responsive behavior
```

---

# 9.3 SectionHeader

## Purpose

Creates consistent section introductions.

## Requirements

Each section header should include:

```txt
Eyebrow label
Section title
One-sentence section thesis
Optional technical note
```

Example:

```txt
Stress Testing
How the book behaves under spot and volatility shocks.
```

---

# 9.4 MetricCard

## Purpose

Displays one key metric.

## Requirements

Each metric card should include:

```txt
Label
Value
Unit
Optional status
Optional delta/change
Small interpretation line
```

Example:

```txt
95% VaR
MXN 284,000
Within limit
```

---

# 9.5 NarrativeBlock

## Purpose

Provides concise explanation beside or above charts.

## Requirements

Narrative blocks should be short.

Recommended length:

```txt
1 to 3 sentences
```

Avoid long essay blocks.

Each narrative block should explain:

```txt
What the user is looking at
Why it matters
What conclusion to draw
```

---

# 9.6 DataTable

## Purpose

Displays options, Greeks, risk limits, or attribution components.

## Requirements

Tables should be:

```txt
Readable
Compact
Sortable only if useful
Responsive
Formatted consistently
```

Avoid massive tables that dominate the page.

---

# 9.7 ChartContainer

## Purpose

Provides consistent chart styling.

## Requirements

Each chart should include:

```txt
Title
Short description
Chart area
Legend, if needed
Tooltip
Axis labels
Source note, if useful
```

Charts must not appear without explanation.

---

## 10. Required Interactions

Interactions should be useful, not decorative.

Version 1 should include only high-value interactions.

---

# 10.1 Required Interaction: Hedged vs Unhedged Toggle

## Location

Hedging Lab section.

## Behavior

Allow user to view:

```txt
Unhedged book P&L
Hedged book P&L
Both
```

## Purpose

Helps user compare the impact of hedging.

---

# 10.2 Required Interaction: Scenario Selector for P&L Attribution

## Location

P&L Attribution section.

## Behavior

Allow user to select from predefined scenarios:

```txt
Base scenario
USD/MXN up +5%, vol up +3 points
USD/MXN down -5%, vol up +3 points
Worst stress scenario
Volatility crush scenario
```

## Purpose

Shows how attribution changes across market environments.

---

# 10.3 Optional Interaction: Confidence Level Toggle

## Location

VaR/ES section.

## Behavior

Allow user to toggle:

```txt
95%
99%
```

## Purpose

Shows how risk estimates change with confidence level.

---

# 10.4 Optional Interaction: Stress Heatmap Hover

## Location

Stress Testing section.

## Behavior

On hover, show:

```txt
Spot shock
Vol shock
Scenario spot
Scenario volatility
Book value
P&L
```

## Purpose

Makes the heatmap more interpretable.

---

# 10.5 Avoided Interactions

Do not add:

```txt
Fake trade execution buttons
Buy/sell game controls
Random sliders that do not update real data
Animated counters without meaning
Confetti
Gamified scores
Leaderboard
```

This is a risk analytics project, not a carnival booth with Greeks.

---

## 11. Data Loading Requirements

The frontend should load static JSON data from the `data/` directory.

Required files:

```txt
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
```

The data should be generated by Python scripts.

No chart should use manually typed fake values inside React components.

---

## 12. Data Formatting Requirements

All values should be formatted consistently.

---

# 12.1 Currency

Use:

```txt
MXN 1,250,000
USD 1,000,000
```

Large values may use compact formatting in cards:

```txt
MXN 1.25M
USD 1.00M
```

Tables may use full formatting.

---

# 12.2 FX Rates

Use four decimal places:

```txt
17.2500 USD/MXN
```

---

# 12.3 Percentages

Use:

```txt
12.50%
```

Store internally as:

```txt
0.125
```

---

# 12.4 Volatility Points

Display volatility shocks as:

```txt
+3.0 vol pts
-2.0 vol pts
```

---

# 12.5 Greeks

Use labels that clearly show units:

```txt
Delta: MXN per 1.00 spot move
Gamma: MXN per 1.00 spot move squared
Vega: MXN per 1 vol point
Theta: MXN per day
```

Do not display Greeks without units. That is how ambiguity breeds, and apparently we needed another species of pest.

---

## 13. Content Requirements

Each section should have concise copy.

The writing should be:

```txt
Technical
Plain
Direct
Professional
Finance-native
```

The writing should avoid:

```txt
Student journey storytelling
Personal struggle narrative
Buzzwords
Long textbook explanations
Overclaiming
Fake institutional language
Generic LinkedIn phrasing
```

---

## 14. Required Copy Blocks

Use or adapt the following copy.

---

# 14.1 Hero Copy

```txt
FX Options Risk Lab models a synthetic USD/MXN options book and analyzes how its value and risk profile change under spot moves, volatility shocks, time decay, and hedging decisions.
```

---

# 14.2 Market Setup Copy

```txt
The base market defines USD/MXN as MXN per 1 USD. Under the Garman-Kohlhagen framework, MXN is treated as the domestic currency and USD as the foreign currency.
```

---

# 14.3 Options Book Copy

```txt
The synthetic book combines long and short calls and puts across strikes and maturities. The structure is designed to create realistic offsetting exposures for controlled risk analysis.
```

---

# 14.4 Pricing and Greeks Copy

```txt
Each instrument is priced using the Garman-Kohlhagen model. Greeks measure how the book responds to spot, volatility, and time.
```

---

# 14.5 Stress Testing Copy

```txt
Stress testing reprices the full book under spot and volatility shocks. This captures nonlinear option behavior that simple linear approximations can miss.
```

---

# 14.6 Hedging Copy

```txt
Delta hedging reduces first-order spot exposure, but residual gamma, vega, theta, and nonlinear repricing risk remain.
```

---

# 14.7 VaR/ES Copy

```txt
VaR estimates a modeled loss threshold at a selected confidence level. Expected Shortfall estimates the average loss beyond that threshold.
```

---

# 14.8 Attribution Copy

```txt
P&L attribution decomposes scenario P&L into delta, gamma, vega, theta, and residual effects, explaining why the book gained or lost value.
```

---

# 14.9 Limitations Copy

```txt
The system uses synthetic data and simplified modeling assumptions. It is designed for educational and portfolio demonstration purposes, not trading or production risk management.
```

---

## 15. Chart Requirements

---

# 15.1 General Chart Rules

Every chart must have:

```txt
Title
Axis labels
Tooltip
Legend when multiple series exist
Short interpretation text
Consistent number formatting
```

Charts must not use random decorative colors.

Charts should show meaningful risk behavior.

---

# 15.2 Spot Shock Chart

## Chart Type

```txt
Line chart
```

## Data

```txt
spot-shocks.json
```

## X-Axis

```txt
Spot shock %
```

## Y-Axis

```txt
Book P&L MXN
```

## Required Tooltip

```txt
Spot shock
Scenario USD/MXN
Book value
P&L
```

---

# 15.3 Vol Shock Chart

## Chart Type

```txt
Line chart
```

## Data

```txt
vol-shocks.json
```

## X-Axis

```txt
Volatility shock in vol points
```

## Y-Axis

```txt
Book P&L MXN
```

## Required Tooltip

```txt
Vol shock
Scenario volatility
Book value
P&L
```

---

# 15.4 Stress Heatmap

## Chart Type

```txt
Heatmap
```

## Data

```txt
stress-grid.json
```

## X-Axis

```txt
Spot shock %
```

## Y-Axis

```txt
Volatility shock
```

## Cell Value

```txt
P&L MXN
```

## Required Tooltip

```txt
Spot shock
Vol shock
Scenario spot
Scenario vol
P&L
```

The heatmap should make losses and gains visually distinguishable.

---

# 15.5 Hedge Comparison Chart

## Chart Type

```txt
Two-line chart
```

## Data

```txt
hedge-results.json
```

## X-Axis

```txt
Spot shock %
```

## Y-Axis

```txt
P&L MXN
```

## Series

```txt
Unhedged P&L
Hedged P&L
```

---

# 15.6 P&L Distribution Chart

## Chart Type

```txt
Histogram
```

## Data

```txt
simulation-results.json
```

## X-Axis

```txt
Simulated P&L MXN
```

## Y-Axis

```txt
Scenario count
```

## Required Markers

```txt
95% VaR
99% VaR
```

Optional markers:

```txt
95% ES
99% ES
```

---

# 15.7 Attribution Chart

## Preferred Chart Type

```txt
Waterfall chart
```

## Acceptable Alternative

```txt
Bar chart
```

## Data

```txt
attribution-results.json
```

## Components

```txt
Delta
Gamma
Vega
Theta
Residual
Full repricing P&L
```

---

## 16. Responsive Design Requirements

The product must work on:

```txt
Desktop
Tablet
Mobile
```

However, the primary design target is desktop because risk dashboards and detailed analytics are best viewed on larger screens.

Mobile should remain readable, but the mobile layout does not need to preserve all dashboard density.

---

# 16.1 Desktop

Desktop layout should use:

```txt
Two-column sections where useful
Wide charts
Compact metric grids
Tables with full columns
Sticky or visible section navigation, optional
```

---

# 16.2 Tablet

Tablet layout should use:

```txt
Single or two-column mixed layout
Scrollable tables if needed
Charts resized with readable labels
```

---

# 16.3 Mobile

Mobile layout should use:

```txt
Single-column layout
Horizontally scrollable tables
Reduced chart label density
Stacked metric cards
No broken heatmaps
```

If a chart is too dense for mobile, provide a simplified view or allow horizontal scrolling.

---

## 17. Performance Requirements

The deployed site should be fast and lightweight.

Requirements:

```txt
No unnecessary backend calls
No huge client-side computation loops
No oversized animation libraries
No uncompressed large datasets
No blocking chart rendering
```

Target:

```txt
Initial page should feel responsive on first load.
Charts should render without noticeable lag.
```

Since the data is synthetic and generated ahead of time, there is no excuse for a slow app. The machine is doing addition, not discovering fire.

---

## 18. Accessibility Requirements

The app should include:

```txt
Readable contrast
Semantic section structure
Descriptive chart titles
Keyboard-accessible controls
Visible focus states
Alt text for non-chart images, if any
No information conveyed only through color
```

Risk status should use labels as well as colors:

```txt
Within limit
Near limit
Breach
```

Do not rely only on green/amber/red color.

---

## 19. SEO and Metadata Requirements

The app should include metadata suitable for portfolio sharing.

Recommended metadata:

```txt
Title: FX Options Risk Lab | USD/MXN Derivatives Risk Analytics
Description: A self-directed FX options risk analytics project modeling a synthetic USD/MXN options book through pricing, Greeks, hedging, stress testing, VaR/ES, and P&L attribution.
```

Open Graph preview should include:

```txt
Project title
Short description
Clean preview image or screenshot
```

---

## 20. GitHub README Product Requirements

The repository README should include:

```txt
Project title
Short description
Live demo link
Screenshots
Core features
Quant methods
Tech stack
How to run locally
How data is generated
Model assumptions
Disclaimer
Academic acknowledgment
```

The README should not be a dump of equations only.

It should communicate both technical substance and product clarity.

---

## 21. Required Final Deliverables

The final product should include:

```txt
Deployed Next.js site
GitHub repository
Python research/data generation scripts
Static JSON/CSV output data
README.md
Model assumptions section
Synthetic data disclaimer
Academic acknowledgment
```

Optional but valuable:

```txt
Portfolio case study summary
Resume bullets
LinkedIn post
Interview explanation sheet
```

These optional items should be created only after the project exists.

No resume bullet should be finalized before the build is real. Revolutionary idea: describe the thing after making the thing.

---

## 22. Version 1 Scope

Version 1 must include:

```txt
Hero section
Market setup section
Options book table
Pricing and Greeks section
Stress testing section
Hedging lab section
VaR/ES section
P&L attribution section
Model assumptions section
Footer acknowledgment
```

Version 1 must include these charts:

```txt
Spot shock P&L chart
Vol shock P&L chart
Spot-vol stress heatmap
Unhedged vs hedged P&L chart
P&L distribution histogram
P&L attribution chart
```

Version 1 must include these interactions:

```txt
Hedged vs unhedged toggle
P&L attribution scenario selector
Stress heatmap hover tooltip
```

Optional for Version 1:

```txt
VaR confidence level toggle
Individual option selector
Notional scale toggle
```

---

## 23. Out-of-Scope Product Features for Version 1

Do not include:

```txt
User login
Trade booking
Live market data
Real-time pricing API
Database
Backend server
Authentication
Saved portfolios
Order execution
Leaderboard
Game mechanics
Chatbot
News feed
Animated trading tape
Fake terminal command line
AI-generated market commentary
```

These features distract from the project’s purpose.

---

## 24. Product Acceptance Criteria

The product is acceptable only if all the following are true.

---

### 24.1 Clarity

A first-time visitor can answer:

```txt
What is this project?
What market does it analyze?
What instruments does it model?
What risks does it measure?
What makes it technically credible?
```

---

### 24.2 Technical Credibility

The product clearly shows:

```txt
Garman-Kohlhagen pricing
Greeks
Book-level aggregation
Scenario repricing
Hedging impact
VaR/ES
P&L attribution
Model assumptions
```

---

### 24.3 Visual Quality

The product looks like:

```txt
A serious institutional analytics project
A polished portfolio case study
A professional quant risk dashboard
```

It must not look like:

```txt
A blog post
A college UI project
A trading game
A SaaS landing page
A generic finance template
```

---

### 24.4 Data Integrity

Every chart and metric must come from:

```txt
Python-generated data
Validated calculation logic
Clean static JSON/CSV files
```

No fake manually typed chart values inside React components.

---

### 24.5 Interview Defensibility

The builder should be able to explain:

```txt
Why USD/MXN was selected
How FX options are priced
How Greeks are calculated
Why book-level aggregation matters
How stress testing works
What hedging changes
What VaR and ES measure
How P&L attribution works
What the model leaves out
```

---

## 25. Product Success Criteria

The product succeeds if it can credibly support this positioning:

```txt
FX Options Risk Lab is a self-directed derivatives analytics project that models a synthetic USD/MXN options book and analyzes its pricing, Greeks, hedging behavior, stress P&L, VaR/ES, and P&L attribution under market scenarios.
```

The product should make the builder look like someone who can apply financial engineering concepts to a working risk analytics system.

The final test:

```txt
Would this project help in a quant risk, derivatives analytics, market risk, or trading systems interview?
```

If the answer is not clearly yes, the product is not finished.

---

## 26. Final Product Scope Lock

Version 1 is locked as:

```txt
A deployed single-page Next.js/TypeScript case study and analytics dashboard, powered by Python-generated validation data, modeling a synthetic USD/MXN FX options book through pricing, Greeks, stress testing, hedging, VaR/ES, risk limits, and P&L attribution.
```

The product should prioritize:

```txt
Correct financial logic
Clear narrative flow
Professional visual design
Recruiter readability
Interview defensibility
```

Feature count is not the goal.

Credibility is the goal.
