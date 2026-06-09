# 01_QUANT_SPEC.md

# FX Options Risk Lab

## Quantitative Specification

---

## 1. Purpose of This Document

This document defines the quantitative logic behind **FX Options Risk Lab**.

It specifies the pricing model, Greeks, synthetic options book structure, stress testing framework, hedging logic, VaR/Expected Shortfall methodology, P&L attribution framework, assumptions, limitations, and validation requirements.

This document should be treated as the mathematical and modeling source of truth for the project.

The frontend must not invent financial logic independently. The frontend should consume outputs generated or validated from the quantitative layer.

---

## 2. Quantitative Objective

The project models a synthetic **USD/MXN FX options book** and analyzes how its value and risk profile change under:

* Spot FX movement
* Implied volatility shocks
* Time decay
* Delta hedging
* Vega hedging, if implemented
* Monte Carlo or historical-style risk scenarios
* Stress scenarios
* Risk limit constraints

The central quantitative question is:

> How does a USD/MXN FX options book behave under spot moves, volatility shocks, time decay, and hedging decisions?

The system should help answer:

* What is the mark-to-market value of the options book?
* What are the book-level Greeks?
* Where is the book most exposed?
* How does the book respond to spot and volatility shocks?
* How much risk remains after hedging?
* What is the estimated downside risk under VaR/ES?
* What explains the P&L movement?

---

## 3. FX Quote Convention

The project uses the following quote convention:

```txt
USD/MXN = MXN per 1 USD
```

Example:

```txt
USD/MXN = 17.00
```

This means:

```txt
1 USD = 17.00 MXN
```

For the pricing model:

* `S` = spot USD/MXN exchange rate
* `K` = strike in MXN per USD
* `r_d` = domestic risk-free rate
* `r_f` = foreign risk-free rate
* `T` = time to maturity in years
* `sigma` = implied volatility
* `N` = option notional in USD

Given the quote convention:

```txt
Domestic currency = MXN
Foreign currency = USD
```

Therefore:

```txt
r_d = MXN interest rate
r_f = USD interest rate
```

The project prices FX options in MXN terms.

---

## 4. Instrument Definition

Each option instrument should use the following schema:

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

### Interpretation

A USD/MXN call gives exposure to USD appreciation against MXN.

A USD/MXN put gives exposure to USD depreciation against MXN.

For each instrument:

* Long position has positive exposure to the option value.
* Short position has negative exposure to the option value.
* Notional is expressed in USD.
* Price output is expressed in MXN.
* Greeks are scaled by USD notional and position sign.

---

## 5. Position Sign Convention

Use the following sign convention:

```txt
long  = +1
short = -1
```

For every option:

```txt
signed_value = position_sign * option_value
signed_greek = position_sign * option_greek
```

Book-level values are calculated by summing signed values across all instruments.

This is critical. Do not report absolute option values as portfolio exposure.

---

## 6. Base Pricing Model

The project uses the **Garman-Kohlhagen model** for European FX options.

This is the FX adaptation of Black-Scholes where the foreign interest rate acts like a continuous dividend yield.

---

## 7. Garman-Kohlhagen Inputs

The model requires:

| Symbol   | Meaning                   |
| -------- | ------------------------- |
| `S`      | Spot FX rate              |
| `K`      | Strike FX rate            |
| `T`      | Time to maturity in years |
| `r_d`    | Domestic risk-free rate   |
| `r_f`    | Foreign risk-free rate    |
| `sigma`  | Implied volatility        |
| `N(x)`   | Standard normal CDF       |
| `phi(x)` | Standard normal PDF       |

For USD/MXN:

```txt
S = MXN per USD
K = MXN per USD
r_d = MXN risk-free rate
r_f = USD risk-free rate
```

---

## 8. d1 and d2

The model defines:

```txt
d1 = [ln(S / K) + (r_d - r_f + 0.5 * sigma^2) * T] / [sigma * sqrt(T)]
```

```txt
d2 = d1 - sigma * sqrt(T)
```

Edge cases must be handled carefully:

* `T <= 0` should use intrinsic value.
* `sigma <= 0` should not be passed into the standard model.
* Invalid inputs should be rejected or safely handled before calculation.

---

## 9. Call Option Price

The value of one USD notional of a USD/MXN call is:

```txt
Call = S * exp(-r_f * T) * N(d1) - K * exp(-r_d * T) * N(d2)
```

For USD notional:

```txt
Call_MXN = notionalUSD * Call
```

For signed position value:

```txt
Signed_Call_MXN = position_sign * Call_MXN
```

---

## 10. Put Option Price

The value of one USD notional of a USD/MXN put is:

```txt
Put = K * exp(-r_d * T) * N(-d2) - S * exp(-r_f * T) * N(-d1)
```

For USD notional:

```txt
Put_MXN = notionalUSD * Put
```

For signed position value:

```txt
Signed_Put_MXN = position_sign * Put_MXN
```

---

## 11. Put-Call Parity

The implementation should satisfy FX put-call parity:

```txt
Call - Put = S * exp(-r_f * T) - K * exp(-r_d * T)
```

For notional-scaled values:

```txt
Call_MXN - Put_MXN = notionalUSD * [S * exp(-r_f * T) - K * exp(-r_d * T)]
```

Validation should test this relationship for sample inputs.

---

## 12. Intrinsic Value at Expiry

At maturity:

```txt
Call = max(S - K, 0)
```

```txt
Put = max(K - S, 0)
```

For notional-scaled values:

```txt
Call_MXN = notionalUSD * max(S - K, 0)
```

```txt
Put_MXN = notionalUSD * max(K - S, 0)
```

At expiry, time value is zero.

---

## 13. Greeks Overview

The project should compute the following required Greeks:

* Delta
* Gamma
* Vega
* Theta

Optional Greeks:

* Domestic rho
* Foreign rho

All Greeks must be computed per instrument and aggregated at book level.

Greeks should be reported with clear scaling rules.

---

## 14. Delta

Delta measures sensitivity of option value to a change in spot FX.

For a call:

```txt
Delta_call = exp(-r_f * T) * N(d1)
```

For a put:

```txt
Delta_put = exp(-r_f * T) * [N(d1) - 1]
```

Notional-scaled delta:

```txt
Delta_MXN_per_1_Spot = notionalUSD * Delta
```

Signed delta:

```txt
Signed_Delta = position_sign * Delta_MXN_per_1_Spot
```

Interpretation:

If the book has positive delta, it generally gains value when USD/MXN rises.

If the book has negative delta, it generally loses value when USD/MXN rises.

---

## 15. Gamma

Gamma measures sensitivity of delta to a change in spot FX.

For calls and puts:

```txt
Gamma = [exp(-r_f * T) * phi(d1)] / [S * sigma * sqrt(T)]
```

Notional-scaled gamma:

```txt
Gamma_scaled = notionalUSD * Gamma
```

Signed gamma:

```txt
Signed_Gamma = position_sign * Gamma_scaled
```

Interpretation:

Positive gamma means delta becomes more favorable as spot moves.

Negative gamma means the book is exposed to nonlinear losses under large spot moves.

---

## 16. Vega

Vega measures sensitivity of option value to implied volatility.

For calls and puts:

```txt
Vega = S * exp(-r_f * T) * phi(d1) * sqrt(T)
```

Notional-scaled vega:

```txt
Vega_scaled = notionalUSD * Vega
```

Signed vega:

```txt
Signed_Vega = position_sign * Vega_scaled
```

Important reporting rule:

Base vega is sensitivity to a 1.00 change in volatility.

For sensitivity to a 1 volatility point move:

```txt
Vega_per_1_vol_point = Vega_scaled * 0.01
```

The UI must clearly label whether vega is shown per 1.00 volatility move or per 1 vol point.

Recommended UI convention:

```txt
Report vega per 1 volatility point.
```

---

## 17. Theta

Theta measures sensitivity of option value to the passage of time.

For a call:

```txt
Theta_call =
-[S * exp(-r_f * T) * phi(d1) * sigma] / [2 * sqrt(T)]
+ r_f * S * exp(-r_f * T) * N(d1)
- r_d * K * exp(-r_d * T) * N(d2)
```

For a put:

```txt
Theta_put =
-[S * exp(-r_f * T) * phi(d1) * sigma] / [2 * sqrt(T)]
- r_f * S * exp(-r_f * T) * N(-d1)
+ r_d * K * exp(-r_d * T) * N(-d2)
```

Notional-scaled theta:

```txt
Theta_scaled = notionalUSD * Theta
```

Signed theta:

```txt
Signed_Theta = position_sign * Theta_scaled
```

Recommended UI convention:

```txt
Report theta per day.
```

Convert annual theta to daily theta:

```txt
Theta_daily = Theta_annual / 365
```

---

## 18. Optional Domestic Rho

Domestic rho measures sensitivity to the domestic interest rate.

For a call:

```txt
Rho_d_call = K * T * exp(-r_d * T) * N(d2)
```

For a put:

```txt
Rho_d_put = -K * T * exp(-r_d * T) * N(-d2)
```

Notional-scaled domestic rho:

```txt
Rho_d_scaled = notionalUSD * Rho_d
```

---

## 19. Optional Foreign Rho

Foreign rho measures sensitivity to the foreign interest rate.

For a call:

```txt
Rho_f_call = -S * T * exp(-r_f * T) * N(d1)
```

For a put:

```txt
Rho_f_put = S * T * exp(-r_f * T) * N(-d1)
```

Notional-scaled foreign rho:

```txt
Rho_f_scaled = notionalUSD * Rho_f
```

---

## 20. Synthetic Market Setup

The first version should use a controlled synthetic market environment.

Recommended base assumptions:

```txt
Spot USD/MXN: 17.00
USD rate: 4.50%
MXN rate: 9.50%
ATM implied volatility: 12.00%
```

These assumptions are illustrative and may be adjusted.

The goal is not live market accuracy.

The goal is to create a realistic enough environment for pricing, stress testing, and risk explanation.

---

## 21. Synthetic Options Book

The project should model a small synthetic USD/MXN options book.

The book should contain approximately 5 to 8 instruments.

Recommended structure:

```txt
1. Long ATM call
2. Short OTM call
3. Long OTM put
4. Short ATM put
5. Long longer-dated call
6. Short shorter-dated put
```

The book should include:

* Calls and puts
* Long and short positions
* Multiple strikes
* Multiple maturities
* Different notionals
* Different implied vol levels

The book should be complex enough to create meaningful portfolio-level Greeks but simple enough to explain clearly.

---

## 22. Example Synthetic Book

Example structure:

| ID      | Type | Position | Notional USD | Strike | Maturity | Implied Vol |
| ------- | ---: | -------: | -----------: | -----: | -------: | ----------: |
| OPT-001 | Call |     Long |    1,000,000 |  17.00 |     0.25 |       12.0% |
| OPT-002 | Call |    Short |      750,000 |  17.50 |     0.25 |       12.5% |
| OPT-003 |  Put |     Long |    1,000,000 |  16.50 |     0.50 |       13.0% |
| OPT-004 |  Put |    Short |      500,000 |  17.00 |     0.10 |       11.5% |
| OPT-005 | Call |     Long |      600,000 |  18.00 |     1.00 |       14.0% |
| OPT-006 |  Put |    Short |      800,000 |  16.00 |     0.75 |       13.5% |

This example may be modified later to improve the book’s risk profile and visual behavior.

---

## 23. Book-Level Aggregation

For each instrument, compute:

* Price
* Signed market value
* Delta
* Gamma
* Vega
* Theta
* Optional rhos

Book-level values:

```txt
Book_Market_Value = sum(Signed_Option_Value)
```

```txt
Book_Delta = sum(Signed_Delta)
```

```txt
Book_Gamma = sum(Signed_Gamma)
```

```txt
Book_Vega = sum(Signed_Vega)
```

```txt
Book_Theta = sum(Signed_Theta)
```

The frontend should show both instrument-level and book-level results.

---

## 24. Mark-to-Market Framework

The mark-to-market value of the book is calculated by repricing every option under current market assumptions.

For a scenario:

```txt
Scenario_Book_Value = sum(position_sign * repriced_option_value_under_scenario)
```

Scenario P&L:

```txt
Scenario_PnL = Scenario_Book_Value - Base_Book_Value
```

This repricing method should be used for stress testing and simulation outputs.

Do not estimate stress P&L only from Greeks unless specifically showing approximation error.

---

## 25. Spot Shock Framework

Spot shocks should be applied as percentage changes to the base spot.

Example shock grid:

```txt
-10%, -8%, -6%, -4%, -2%, 0%, +2%, +4%, +6%, +8%, +10%
```

Scenario spot:

```txt
S_scenario = S_base * (1 + spot_shock)
```

For each scenario:

1. Reprice each option.
2. Aggregate signed value.
3. Compute scenario P&L.
4. Compare against base book value.

Required output:

```ts
type SpotShockResult = {
  spotShock: number;
  scenarioSpot: number;
  bookValue: number;
  pnl: number;
};
```

---

## 26. Volatility Shock Framework

Volatility shocks should be applied as absolute volatility point changes.

Example volatility shock grid:

```txt
-5 vol points, -3 vol points, -1 vol point, 0, +1 vol point, +3 vol points, +5 vol points
```

Scenario volatility:

```txt
sigma_scenario = max(sigma_base + vol_shock, volatility_floor)
```

Recommended volatility floor:

```txt
volatility_floor = 1.00%
```

For each scenario:

1. Adjust implied volatility.
2. Reprice each option.
3. Aggregate signed value.
4. Compute scenario P&L.

Required output:

```ts
type VolShockResult = {
  volShock: number;
  bookValue: number;
  pnl: number;
};
```

---

## 27. Combined Spot-Volatility Stress Grid

The stress grid should combine spot shocks and volatility shocks.

Example spot shock axis:

```txt
-10% to +10%
```

Example volatility shock axis:

```txt
-5 vol points to +5 vol points
```

For each combination:

```txt
S_scenario = S_base * (1 + spot_shock)
sigma_scenario = max(sigma_base + vol_shock, volatility_floor)
```

Then:

```txt
Stress_PnL = Repriced_Book_Value - Base_Book_Value
```

Required output:

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

The frontend should render this as a heatmap.

---

## 28. Worst-Case Scenario

From the stress grid:

```txt
Worst_Case = min(Stress_PnL)
```

Also calculate:

```txt
Best_Case = max(Stress_PnL)
```

Required output:

```ts
type StressSummary = {
  worstCasePnl: number;
  worstCaseSpotShock: number;
  worstCaseVolShock: number;
  bestCasePnl: number;
  bestCaseSpotShock: number;
  bestCaseVolShock: number;
};
```

---

## 29. Delta Hedging

The project should include a simple delta hedge using spot FX.

If book delta is:

```txt
Book_Delta
```

Then the hedge notional should offset delta:

```txt
Hedge_Notional_USD = -Book_Delta
```

Because delta is expressed as MXN value sensitivity per 1 unit move in USD/MXN, this simplified hedge should be carefully interpreted.

For practical display, report:

```txt
Delta hedge direction:
- Sell USD/MXN spot if book delta is positive
- Buy USD/MXN spot if book delta is negative
```

The hedged book P&L under spot movement is:

```txt
Hedged_PnL = Option_Book_PnL + Spot_Hedge_PnL
```

Spot hedge P&L:

```txt
Spot_Hedge_PnL = Hedge_Notional_USD * (S_scenario - S_base)
```

The hedge sign must be validated carefully.

If:

```txt
Book_Delta > 0
```

Then the book gains when spot rises, so the hedge should lose when spot rises.

Therefore:

```txt
Hedge_Notional_USD = -Book_Delta
```

---

## 30. Hedge Effectiveness

Hedge effectiveness should compare unhedged and hedged downside risk.

Possible metrics:

```txt
P&L volatility reduction
Worst-case loss reduction
VaR reduction
Absolute delta reduction
```

Recommended metric:

```txt
Hedge_Effectiveness = 1 - abs(Hedged_Worst_Loss / Unhedged_Worst_Loss)
```

Use this carefully only when both values are losses.

Alternative:

```txt
Delta_Reduction = 1 - abs(Hedged_Delta / Unhedged_Delta)
```

The UI should present hedge effectiveness in plain language.

Example:

```txt
Delta hedge reduced first-order spot exposure by 96.4%, but residual gamma and vega exposure remain.
```

---

## 31. Optional Vega Hedging

Vega hedging may be included only if it improves the project.

A vega hedge can use another liquid option as the hedging instrument.

If:

```txt
Book_Vega = current book vega
Hedge_Option_Vega = vega of hedge option
```

Then:

```txt
Hedge_Units = -Book_Vega / Hedge_Option_Vega
```

The hedge option should be clearly defined.

The project must explain that vega hedging introduces other exposures, including delta, gamma, and theta.

Do not include vega hedging if it creates confusion or weakens the first version.

---

## 32. Monte Carlo Simulation Framework

Monte Carlo simulation may be used to estimate the book’s P&L distribution.

The base model for spot simulation:

```txt
S_T = S_0 * exp((mu - 0.5 * sigma_realized^2) * horizon + sigma_realized * sqrt(horizon) * Z)
```

Where:

```txt
Z ~ N(0, 1)
```

Recommended risk horizon:

```txt
1 day or 10 days
```

Recommended number of simulations:

```txt
10,000 or more
```

For risk-neutral pricing, drift may use:

```txt
r_d - r_f
```

For risk measurement, drift may be set to:

```txt
0
```

The project should be explicit about this choice.

Recommended first version:

```txt
Use zero drift for short-horizon risk simulation.
```

Reason:

Short-horizon VaR is usually dominated by volatility assumptions rather than drift.

---

## 33. Simulated P&L

For each Monte Carlo scenario:

1. Simulate terminal spot over the selected horizon.
2. Apply optional volatility shock or keep volatility constant.
3. Reduce maturity by the horizon.
4. Reprice the options book.
5. Compute P&L.

```txt
PnL_i = Book_Value_i - Base_Book_Value
```

Required output:

```ts
type SimulationResult = {
  scenarioId: number;
  simulatedSpot: number;
  simulatedVol?: number;
  bookValue: number;
  pnl: number;
};
```

---

## 34. VaR Calculation

VaR measures the loss threshold at a confidence level.

Given simulated P&L values sorted from worst to best:

```txt
PnL_sorted = sort(PnL)
```

At confidence level `c`:

```txt
alpha = 1 - c
```

The VaR loss is:

```txt
VaR_c = -quantile(PnL, alpha)
```

Example:

```txt
95% VaR = -5th percentile of P&L
99% VaR = -1st percentile of P&L
```

VaR should be reported as a positive loss number.

Example:

```txt
95% VaR = MXN 250,000
```

This means losses are expected to exceed MXN 250,000 in approximately 5% of modeled scenarios.

---

## 35. Expected Shortfall Calculation

Expected Shortfall measures the average loss conditional on losses exceeding VaR.

At confidence level `c`:

```txt
ES_c = -mean(PnL_i where PnL_i <= quantile(PnL, 1 - c))
```

Expected Shortfall should be reported as a positive loss number.

Example:

```txt
95% ES = MXN 380,000
```

This means that in the worst 5% of modeled scenarios, the average loss is MXN 380,000.

Expected Shortfall should be emphasized as more tail-sensitive than VaR.

---

## 36. Risk Limits

The project should define simple synthetic risk limits.

Example limits:

```txt
Max 95% VaR: MXN 300,000
Max stress loss: MXN 750,000
Max absolute delta: MXN 150,000 per 1.00 spot move
Max vega: MXN 40,000 per 1 vol point
```

Risk status:

```txt
Green = within limit
Amber = near limit
Red = breach
```

Limit status should be calculated, not manually written.

Required output:

```ts
type RiskLimitStatus = {
  metric: string;
  value: number;
  limit: number;
  utilization: number;
  status: "green" | "amber" | "red";
};
```

Suggested utilization rules:

```txt
green: utilization < 80%
amber: 80% <= utilization < 100%
red: utilization >= 100%
```

---

## 37. P&L Attribution Framework

The project should decompose P&L into approximate explanatory components.

For a small market move:

```txt
dS = S_new - S_base
dSigma = sigma_new - sigma_base
dt = time_passed_in_years
```

Approximate P&L:

```txt
PnL ≈ Delta * dS
    + 0.5 * Gamma * dS^2
    + Vega * dSigma
    + Theta * dt
    + Residual
```

Where:

```txt
Residual = Full_Repricing_PnL - Approximate_Greek_PnL
```

Required attribution categories:

* Delta contribution
* Gamma contribution
* Vega contribution
* Theta contribution
* Residual

---

## 38. Attribution Scaling Rules

Use consistent units.

If vega is reported per 1 volatility point:

```txt
Vega_Contribution = Vega_per_1_vol_point * vol_change_in_points
```

Example:

```txt
Base vol = 12%
Scenario vol = 15%
Vol change = +3 vol points
```

Then:

```txt
Vega_Contribution = Vega_per_1_vol_point * 3
```

Theta contribution:

```txt
Theta_Contribution = Theta_daily * number_of_days
```

Delta and gamma contribution:

```txt
Delta_Contribution = Delta * dS
Gamma_Contribution = 0.5 * Gamma * dS^2
```

The project must clearly distinguish:

* Full repricing P&L
* Greek approximation P&L
* Residual approximation error

---

## 39. Attribution Output

Required output:

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

The frontend should visualize this as:

* Waterfall chart, or
* Bar chart with positive/negative contribution bars

The key explanatory sentence:

```txt
The attribution explains why the book gained or lost value, rather than only reporting the final P&L.
```

---

## 40. Model Validation Requirements

The Python layer should validate core calculations before exporting data.

Required validation checks:

1. **Put-call parity**

   * Call and put values should satisfy FX put-call parity.

2. **Intrinsic value floor**

   * Option value should not fall below discounted arbitrage bounds.

3. **Finite Greeks**

   * Greeks should not return NaN or infinity for valid inputs.

4. **Numerical Greek comparison**

   * Analytical delta, gamma, and vega should be compared against finite-difference approximations.

5. **Book aggregation**

   * Book-level values should equal the sum of signed instrument-level values.

6. **Scenario repricing**

   * Scenario P&L should equal scenario book value minus base book value.

7. **VaR/ES sign convention**

   * VaR and ES should be reported as positive loss numbers.

8. **Hedge sign**

   * Delta hedge should reduce first-order spot sensitivity.

---

## 41. Numerical Greeks for Validation

Use finite difference approximations.

Delta:

```txt
Delta_numerical = [V(S + h) - V(S - h)] / [2h]
```

Gamma:

```txt
Gamma_numerical = [V(S + h) - 2V(S) + V(S - h)] / [h^2]
```

Vega:

```txt
Vega_numerical = [V(sigma + h) - V(sigma - h)] / [2h]
```

Recommended bumps:

```txt
Spot bump h_S = 0.01
Vol bump h_sigma = 0.0001
```

Analytical and numerical Greeks should be close within reasonable tolerance.

---

## 42. Python Quant Layer Responsibilities

The Python layer should be responsible for:

* Defining pricing functions
* Defining Greeks functions
* Creating synthetic options book
* Validating pricing and Greeks
* Generating spot shock results
* Generating volatility shock results
* Generating combined stress grid
* Generating Monte Carlo P&L simulations
* Calculating VaR and Expected Shortfall
* Generating P&L attribution data
* Exporting JSON/CSV files for the frontend

Recommended Python files:

```txt
research/
  pricing.py
  greeks.py
  book.py
  scenarios.py
  risk.py
  attribution.py
  validate.py
  generate_outputs.py
```

---

## 43. Frontend Quant Responsibilities

The frontend should not be the primary validation layer.

The frontend may:

* Format values
* Filter displayed scenarios
* Toggle between hedged and unhedged views
* Recalculate simple UI-level summaries
* Render charts
* Render tables
* Explain outputs

The frontend should avoid:

* Reimplementing full pricing logic inconsistently
* Using hardcoded fake numbers
* Showing chart values that do not match exported data
* Manually typing risk outputs into components

---

## 44. Exported Data Files

The Python layer should export clean frontend-ready data files.

Recommended files:

```txt
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
```

Each file should be deterministic and reproducible.

If random simulations are used, set a seed.

Recommended seed:

```txt
seed = 635
```

---

## 45. Units and Formatting Standards

All monetary values should be shown in MXN unless explicitly stated otherwise.

Recommended formatting:

```txt
MXN 1,250,000
USD 1,000,000
17.2500 USD/MXN
12.50% implied volatility
95% VaR
99% Expected Shortfall
```

Rates and volatility should be stored as decimals in code:

```txt
12% = 0.12
9.5% = 0.095
```

But displayed as percentages in the UI.

---

## 46. Required User-Facing Explanations

The project should explain the following clearly:

1. Why Garman-Kohlhagen is used for FX options
2. What the synthetic options book represents
3. What Greeks measure
4. Why spot and volatility shocks matter
5. Why hedging reduces some risks but not all risks
6. What VaR and Expected Shortfall measure
7. How P&L attribution explains the source of gains/losses
8. What the model does not capture

Each explanation should be concise and attached to the relevant chart or section.

Do not create long textbook paragraphs.

---

## 47. Out-of-Scope Quant Features for Version 1

The first version should not include:

* Full volatility smile modeling
* Stochastic volatility
* Local volatility
* Jump diffusion
* Full historical market data ingestion
* Live pricing API
* Real-time trading
* Credit valuation adjustment
* Funding valuation adjustment
* Regulatory capital engine
* Counterparty exposure simulation
* Full curve construction
* Collateral modeling
* Transaction cost modeling
* Liquidity risk modeling

These topics may be mentioned as limitations or future extensions.

---

## 48. Future Extensions

Potential future extensions:

1. Volatility smile and skew
2. Term structure of implied volatility
3. Historical USD/MXN data calibration
4. GARCH-based volatility forecasting
5. Discrete delta hedging simulation over multiple days
6. Transaction costs and hedge slippage
7. CVA/FVA extension
8. Counterparty exposure profile
9. Regulatory capital approximation
10. Real market data integration
11. Multi-currency options book
12. PCA-based yield curve risk module

These should not distract from Version 1.

---

## 49. Quantitative Success Criteria

The quant layer is successful if:

* Garman-Kohlhagen pricing is implemented correctly.
* Greeks are analytically computed and numerically validated.
* The synthetic options book produces meaningful net exposures.
* Stress testing clearly shows nonlinear book behavior.
* Hedging visibly reduces first-order spot exposure.
* VaR and ES are calculated with correct sign conventions.
* P&L attribution explains most of the repriced P&L.
* All outputs are reproducible.
* The builder can defend the model assumptions in an interview.

---

## 50. Final Quant Scope Lock

Version 1 is quantitatively locked as:

> A Python-validated USD/MXN FX options analytics engine using Garman-Kohlhagen pricing, Greeks, synthetic book aggregation, stress testing, delta hedging, VaR/ES simulation, risk limits, and P&L attribution, exported into a deployed Next.js/TypeScript portfolio interface.

The project should prioritize correctness, clarity, and interview defensibility over unnecessary model complexity.
