// Shared TypeScript types mirroring the Python-generated JSON artefacts.

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

export type BookSummary = {
  instrumentCount: number;
  grossNotionalUSD: number;
  netMarketValueMXN: number;
  netDelta: number;
  netGamma: number;
  netVegaPerVolPoint: number;
  netThetaPerDay: number;
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

export type StressSummary = {
  worstCasePnl: number;
  worstCaseSpotShock: number;
  worstCaseVolShock: number;
  bestCasePnl: number;
  bestCaseSpotShock: number;
  bestCaseVolShock: number;
};

export type HedgeScenario = {
  spotShock: number;
  scenarioSpot: number;
  unhedgedPnl: number;
  hedgePnl: number;
  hedgedPnl: number;
};

export type HedgeResult = {
  baseBookDelta: number;
  hedgeNotionalUSD: number;
  hedgedBookDelta: number;
  unhedgedWorstLoss: number;
  hedgedWorstLoss: number;
  deltaReductionPct: number;
  worstLossReductionPct: number;
  scenarios: HedgeScenario[];
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

export type HistogramBin = {
  x0: number;
  x1: number;
  mid: number;
  count: number;
};

export type RiskMeta = {
  riskModel: string;
  nSims: number;
  horizonDays: number;
  seed: number;
  drift: number;
  tradingDays: number;
  calendarDays: number;
  volShockDailyPoints: number;
  spotVolCorrelation: number;
  varEs: VarEsResult[];
  histogram: {
    bins: HistogramBin[];
    min: number;
    max: number;
    mean: number;
    std: number;
  };
};

export type QuantLibValidation = {
  status: "pass" | "fail" | "skipped";
  benchmark: string;
  benchmarkVersion?: string;
  customModel: string;
  reason?: string;
  checkedInstruments?: number;
  maxAbsPriceError?: number;
  maxAbsDeltaError?: number;
  maxAbsGammaError?: number;
  maxAbsVegaError?: number;
  maxAbsThetaError?: number;
  thetaComparison?: string;
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

export type ValidationCheck = {
  name: string;
  status: "pass" | "fail" | "skipped";
  maxError: number;
  detail?: string;
};

export type ValidationSummary = {
  status: "pass" | "fail";
  seed: number;
  quantlib?: {
    status: "pass" | "fail" | "skipped";
    benchmark: string;
    version?: string;
  };
  checks: ValidationCheck[];
};
