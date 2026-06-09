# 00_PROJECT_SCOPE.md

# FX Options Risk Lab

## Project Scope, Vision, and Direction

---

## 1. Project Name

**FX Options Risk Lab**

### Working Subtitle

**An institutional-style USD/MXN options risk engine for pricing, Greeks, hedging, stress testing, VaR/ES, and P&L attribution.**

---

## 2. Project Purpose

The purpose of this project is to build a polished, interview-defensible, resume-ready quantitative finance project that demonstrates practical understanding of FX derivatives risk.

This project should show that the builder can take academic financial engineering concepts and apply them to a structured, working analytics system.

The project is designed to support:

* Resume positioning
* Portfolio presentation
* GitHub review
* LinkedIn project storytelling
* Interview preparation
* Self-review of FX options, Greeks, hedging, and risk concepts

This project is not being built merely as a website. The website is only the delivery layer. The core project is a quantitative risk analytics system.

---

## 3. Core Project Thesis

This project answers the central question:

> How does a USD/MXN FX options book behave under spot moves, volatility shocks, time decay, and hedging decisions?

The project should demonstrate that an FX options book is not just a collection of option prices. It is a dynamic risk object whose value changes because of spot movement, volatility repricing, time decay, nonlinear gamma exposure, and hedge decisions.

The system should help users understand:

* How FX options are priced
* How Greeks explain risk exposure
* How market shocks affect mark-to-market value
* How hedging changes the risk profile
* How VaR and Expected Shortfall summarize downside risk
* How P&L attribution explains why the book gained or lost value

---

## 4. Target Audience

The project is intended for:

1. **Quantitative finance recruiters**
   Recruiters should immediately understand that this is a serious financial engineering project, not a generic student website.

2. **Risk, derivatives, and trading interviewers**
   The project should provide enough technical depth to support interview discussion around FX options, Greeks, hedging, VaR, ES, and stress testing.

3. **Portfolio visitors**
   Visitors should be able to understand the project narrative even if they do not know every technical detail.

4. **LinkedIn audience**
   The project should be explainable as a self-directed research and analytics build, not a class assignment recap.

5. **The builder**
   The project should be useful as a personal reference for reviewing FX derivatives concepts before interviews.

---

## 5. Career Positioning

This project should position the builder toward roles in:

* Quantitative risk
* Derivatives analytics
* Trading systems
* Market risk
* FX options analytics
* Structuring support
* Portfolio/risk analytics

The project should not be positioned as:

* A web development project
* A UI/UX project
* A trading game
* A generic dashboard project
* A class assignment
* A recreated Excel model

The strongest positioning is:

> A self-directed FX derivatives risk analytics system modeling a synthetic USD/MXN options book under spot, volatility, and hedging scenarios.

---

## 6. Project Background

The project is inspired by concepts studied in **Financial Enterprise Risk Engineering**, especially FX derivatives, Black-Scholes-style pricing, Greeks, hedging, P&L behavior, stress testing, and trading simulation.

However, the project itself must be built from scratch.

The project must not directly rely on, recreate, or visually resemble any course workbook, assignment spreadsheet, Excel macro system, contest file, or homework structure.

Course work may inform the builder's understanding, but the final system should stand independently as a professional portfolio project.

---

## 7. Important Naming Rule

The public-facing project should not use any of the following names or references in the main website experience:

* FE635
* Hornet Contest
* MiniSystem
* Homework
* Assignment
* Class project
* Professor workbook
* Excel macro project

These references may appear only in a small acknowledgment section in the README or footer.

Recommended acknowledgment language:

> This independent project was inspired by concepts studied in FE635: Financial Enterprise Risk Engineering at Stevens Institute of Technology under Prof. Juan Eroles. The implementation, data design, analytics structure, and presentation were developed independently for portfolio and research demonstration purposes.

---

## 8. Final Product Definition

The final product is a single-page, narrative-driven, interactive case study and dashboard.

It should combine:

* Quant research explanation
* Institutional-style risk dashboard
* FX options analytics
* Interactive or semi-interactive scenario exploration
* Clean visual storytelling
* Technical credibility

The project should feel like an institutional risk analytics prototype, not a classroom website.

---

## 9. Core System Components

The project should include the following core modules.

---

### 9.1 Market Setup Module

Defines the synthetic USD/MXN market environment.

Inputs and assumptions may include:

* Spot USD/MXN rate
* Domestic interest rate
* Foreign interest rate
* Implied volatility
* Time to maturity
* Strike levels
* Option type
* Notional size
* Position direction

Purpose:

> Establish the market state before pricing, hedging, or stress testing the options book.

---

### 9.2 FX Options Pricing Module

Prices FX options using the Garman-Kohlhagen model.

The module should support:

* Calls
* Puts
* Domestic and foreign rates
* Spot FX input
* Strike input
* Volatility input
* Time to maturity input
* Notional scaling

Purpose:

> Show that the project is grounded in an actual FX options pricing framework.

---

### 9.3 Greeks Module

Computes first-order and second-order risk sensitivities.

Required Greeks:

* Delta
* Gamma
* Vega
* Theta

Optional Greeks:

* Domestic rho
* Foreign rho

Purpose:

> Explain how the option book responds to changes in market variables.

---

### 9.4 Synthetic Options Book Module

Creates a synthetic USD/MXN options book with multiple instruments.

The book should include:

* Multiple strikes
* Multiple maturities
* Calls and puts
* Long and short positions
* Different notionals
* Net market value
* Net Greeks

Purpose:

> Move beyond single-option analysis and show portfolio-level risk aggregation.

---

### 9.5 Scenario Analysis Module

Analyzes the options book under spot and volatility shocks.

Scenario types should include:

* Spot up/down shocks
* Volatility up/down shocks
* Combined spot-volatility shock grid
* Worst-case scenario identification

Required outputs:

* Scenario P&L
* Stress P&L
* Heatmap of combined shocks
* Worst-case loss
* Best-case gain

Purpose:

> Show how the book behaves under market stress.

---

### 9.6 Hedging Module

Demonstrates how hedging changes the risk profile of the options book.

Required analysis:

* Unhedged book exposure
* Delta-hedged book exposure
* Optional vega hedge using another option
* Before/after Greeks
* Before/after scenario P&L
* Hedge effectiveness

Purpose:

> Show that hedging reduces selected risks but does not eliminate all risk, especially nonlinear gamma and volatility exposure.

---

### 9.7 VaR and Expected Shortfall Module

Estimates downside risk using simulated or historical-style scenarios.

Required outputs:

* P&L distribution
* 95% VaR
* 99% VaR
* 95% Expected Shortfall
* 99% Expected Shortfall
* Risk limit breach indicator

Purpose:

> Summarize downside risk in a way that connects to institutional risk management.

---

### 9.8 P&L Attribution Module

Breaks option book P&L into explanatory components.

Required attribution categories:

* Delta contribution
* Gamma contribution
* Vega contribution
* Theta contribution
* Residual/model error

Purpose:

> Explain not only whether the book gained or lost money, but why.

---

## 10. Main Website Structure

The deployed project should be structured as a single-page case study with embedded dashboard sections.

Recommended section order:

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

The page should have a strong narrative flow. Each section should answer a specific question and lead naturally into the next section.

---

## 11. Hero Section Requirements

The hero section should immediately communicate what the project is.

Recommended title:

> FX Options Risk Lab

Recommended subtitle:

> An institutional-style USD/MXN options risk engine for pricing, Greeks, hedging, stress testing, VaR/ES, and P&L attribution.

The hero should include compact summary cards such as:

* **Pricing**
  Garman-Kohlhagen FX options

* **Risk**
  VaR, ES, and stress scenarios

* **Hedging**
  Delta and vega exposure control

* **Attribution**
  Explains where P&L comes from

The hero must not include a long personal introduction.

---

## 12. Visual and Design Direction

The visual direction should combine:

* Institutional risk dashboard
* Dark quant lab
* Clean academic case study
* Trading desk interface
* Minimal professional portfolio page

The design should feel serious, technical, and finance-native.

It should avoid:

* Generic SaaS gradients
* Bright childish colors
* Gamified trading visuals
* Fake terminal aesthetics
* Overly large paragraph blocks
* Blog-post structure
* Decorative finance buzzwords
* Random glowing cards without information value
* UI that looks like a course-selling landing page

The design should prioritize:

* Dense but readable information
* Real tables
* Real charts
* Compact explanation
* Strong visual hierarchy
* Clear section transitions
* Professional chart formatting
* Minimal animation
* Dashboard-style credibility

---

## 13. Required Chart and Visual Types

The project should include charts only when they explain risk behavior.

Potential required visuals:

1. **Options book table**
   Shows instruments, strikes, maturities, positions, notionals, and vols.

2. **Greeks exposure table**
   Shows individual and net Greeks.

3. **Spot shock P&L chart**
   Shows book value under spot movement.

4. **Volatility shock P&L chart**
   Shows book value under implied volatility changes.

5. **Spot-volatility stress heatmap**
   Shows combined shock behavior.

6. **Unhedged vs hedged P&L chart**
   Shows hedge impact.

7. **P&L distribution histogram**
   Shows simulated loss distribution.

8. **VaR / ES markers**
   Shows downside thresholds.

9. **P&L attribution waterfall or bar chart**
   Shows delta, gamma, vega, theta, and residual effects.

10. **Risk limit indicator**
    Shows whether stress loss or VaR breaches a defined threshold.

---

## 14. Interaction Requirements

The project may include user interaction, but only if the interaction improves understanding.

Useful interactions may include:

* Changing spot shock range
* Changing volatility shock range
* Selecting confidence level for VaR/ES
* Toggling hedged vs unhedged book
* Selecting individual option vs full book
* Adjusting notional scale
* Viewing different stress scenarios

Avoid interaction that exists only to make the site feel more “app-like.”

Every input should answer a real financial question.

---

## 15. Technical Architecture

The project should use:

* **Python** for validation, data generation, and research outputs
* **Next.js / TypeScript** for the deployed app
* **Static JSON or CSV data** exported from Python into the frontend
* **Client-side TypeScript utilities** where useful for lightweight recalculation

Recommended architecture:

```txt
fx-options-risk-lab/
  app/
  components/
  lib/
    pricing/
    risk/
    scenarios/
  data/
    book.json
    scenario-grid.json
    var-results.json
    attribution-results.json
  research/
    pricing_validation.ipynb
    generate_scenarios.py
    validate_greeks.py
  public/
  README.md
```

The Python layer should be used to:

* Validate formulas
* Generate synthetic market data
* Generate scenario grids
* Generate VaR/ES simulation outputs
* Export clean frontend-ready datasets

The Next.js layer should be used to:

* Present the case study
* Render charts and tables
* Provide interactive controls
* Explain the model and outputs
* Deliver a polished portfolio experience

---

## 16. Data Policy

The project may use synthetic data.

Synthetic data is acceptable because the goal is not to forecast USD/MXN. The goal is to demonstrate derivatives pricing, risk measurement, hedging behavior, and scenario analysis.

Synthetic data should be realistic enough to resemble an institutional risk setting.

The project should clearly state:

* The options book is synthetic.
* Market parameters are illustrative.
* The goal is controlled scenario analysis.
* The outputs are educational and demonstrative, not trading recommendations.

Optional real-world references may be added later, but they are not required for the first build.

---

## 17. Model Scope

The first version should include:

* Garman-Kohlhagen FX option pricing
* Greeks calculation
* Synthetic options book aggregation
* Spot and volatility stress testing
* Delta hedging
* Optional vega hedging
* Monte Carlo or historical-style VaR/ES
* P&L attribution

The first version should not attempt to fully model:

* Volatility smile
* Local volatility
* Stochastic volatility
* Transaction costs
* Liquidity costs
* Funding valuation adjustment
* Credit valuation adjustment
* Regulatory capital
* Full counterparty risk
* Live market data ingestion
* Real trade booking workflow

These may be mentioned as limitations or possible future extensions.

---

## 18. Model Assumptions and Limitations

The project should openly state its assumptions.

Required assumptions:

* FX spot follows a lognormal process under the model framework.
* Volatility is treated as an input and is not dynamically modeled in the base version.
* The options book is synthetic.
* Hedging is discrete, not continuous.
* Transaction costs are excluded or simplified.
* VaR/ES results depend on scenario assumptions.
* Stress testing is illustrative, not predictive.
* P&L attribution is approximate and model-based.

The limitations section should make the project look more rigorous, not weaker.

---

## 19. Tone and Writing Style

The project writing should be:

* Clear
* Technical
* Concise
* Professional
* Interview-defensible
* Finance-native

It should avoid:

* Overclaiming
* Buzzword stuffing
* Generic LinkedIn-style writing
* Overexplaining obvious concepts
* Long blog-style paragraphs
* Personal academic backstory
* “I built this because...” narrative in the main page

The writing should sound like:

> This system models a synthetic USD/MXN FX options book and analyzes how its value and risk profile change under spot, volatility, and hedging scenarios.

It should not sound like:

> As a passionate financial engineering student, I wanted to explore the exciting world of derivatives.

---

## 20. Success Criteria

The project is successful if it can satisfy the following standards.

### Recruiter Standard

A recruiter should be able to understand within 20 seconds that this project is about FX options risk analytics and is relevant to quant/risk/derivatives roles.

### Interview Standard

The builder should be able to discuss:

* Why Garman-Kohlhagen is used for FX options
* What each Greek means
* How an options book responds to spot and volatility shocks
* Why delta hedging does not eliminate all risk
* What VaR and ES measure
* How P&L attribution explains risk behavior
* What assumptions and limitations the model has

### Portfolio Standard

The deployed site should look like a serious institutional analytics project, not a student assignment.

### GitHub Standard

The repository should include:

* Clean project structure
* Clear README
* Python validation/data generation scripts
* Frontend code
* Data files
* Model assumptions
* Instructions to run locally

### Resume Standard

The final project should support strong resume bullets related to:

* FX options
* Greeks
* VaR/ES
* Stress testing
* Hedging
* P&L attribution
* Monte Carlo
* Risk limits
* Derivatives analytics

---

## 21. Public Positioning Statement

Use this as the project’s core public description:

> FX Options Risk Lab is a self-directed derivatives analytics project that models a synthetic USD/MXN options book and analyzes its pricing, Greeks, hedging behavior, stress P&L, VaR/ES, and P&L attribution under market scenarios.

Shorter version:

> A USD/MXN FX options risk engine for pricing, hedging, stress testing, and P&L attribution.

Resume-style version:

> Built an FX options risk analytics system for a synthetic USD/MXN book, integrating Garman-Kohlhagen pricing, Greeks, stress testing, VaR/ES, hedging, and P&L attribution.

---

## 22. Public-Facing Disclaimer

Use a concise disclaimer in the README or footer:

> This project uses synthetic data for educational and portfolio demonstration purposes. It is not intended for trading, investment advice, or production risk management.

---

## 23. Academic Acknowledgment

Use this only in the README or footer:

> This independent project was inspired by concepts studied in FE635: Financial Enterprise Risk Engineering at Stevens Institute of Technology under Prof. Juan Eroles. The implementation, data design, analytics structure, and presentation were developed independently for portfolio and research demonstration purposes.

Do not place this in the hero section or main project narrative.

---

## 24. Build Philosophy

The project should be built from scratch.

Do not port the old Excel system.

Do not recreate the course workflow.

Do not build around homework outputs.

Do not make the project depend on messy class artifacts.

The project should use the intellectual foundation from the course but should stand as an independent, clean, professional FX derivatives risk analytics system.

---

## 25. Final Scope Lock

The first version of the project is locked as:

> A single-page, deployed Next.js/TypeScript case study and dashboard powered by Python-generated validation data, modeling a synthetic USD/MXN FX options book through pricing, Greeks, stress testing, hedging, VaR/ES, and P&L attribution.

Anything outside this scope should be considered a future extension unless it directly improves the first version’s clarity, credibility, or interview value.

The priority is not feature count.

The priority is:

1. Correct financial logic
2. Clean analytics structure
3. Strong visual communication
4. Recruiter-ready presentation
5. Interview-defensible implementation
