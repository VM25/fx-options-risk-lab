// Design tokens and reusable copy. Kept in one place so the UI stays consistent
// and the narrative copy matches the product spec.

export const COLORS = {
  bgPrimary: "#0B0C0F",
  panel: "#0E0F13",
  panelHeader: "#111217",
  panelElevated: "#15171C",
  border: "#2C2F35",
  borderSoft: "#1B1D22",
  textPrimary: "#EAEAE6",
  textSecondary: "#9A9CA1",
  textMuted: "#64676D",
  textFaint: "#44464B",
  cyan: "#8AA0C8", // restrained slate accent
  blue: "#7488B8",
  teal: "#5AA8A0", // secondary series (hedged line)
  amber: "#C39A3C", // warning
  red: "#D2574F", // loss
  green: "#4CAF6E", // gain
  purple: "#9487C0", // ES marker
  grid: "#1B1D22",
  axis: "#64676D",
  ink: "#C9CBD0", // neutral bright data-ink for primary series
} as const;

export const COPY = {
  heroSubtitle:
    "A pre-hedge USD/MXN options exposure analyzed through pricing, Greeks, stress repricing, hedging, VaR/ES, and P&L attribution.",
  heroThesis:
    "The book is measured before hedging, then revalued under spot moves, volatility shocks, and one-day risk scenarios. The analysis shows how mark-to-market value can appear controlled while delta, vega, and stress-loss limits remain exposed.",
  heroInsight:
    "Net delta and vega are large and directional before hedging, and negative gamma drives nonlinear stress losses.",
  market:
    "USD/MXN is quoted as MXN per 1 USD. Under Garman-Kohlhagen, MXN is the domestic currency and USD is the foreign currency.",
  book:
    "A pre-hedge exposure across strikes, maturities, calls, and puts. The book is intentionally directional before the hedge is applied.",
  pricing:
    "Garman-Kohlhagen valuation with position-signed Greeks at instrument and book level. The model extends Black-Scholes to FX by treating the foreign rate as a continuous yield.",
  stress:
    "Full-book repricing across USD/MXN spot and implied-volatility shocks. The grid captures nonlinear option behavior that linear Greeks can miss.",
  hedging:
    "A static spot hedge offsets first-order exposure while leaving residual gamma, vega, theta, and nonlinear repricing risk.",
  varEs:
    "Monte Carlo shocks USD/MXN spot and implied volatility, then reprices the full book over a one-day horizon. VaR is a loss threshold at a confidence level; Expected Shortfall is the average loss beyond it.",
  attribution:
    "Greek-based contributions are compared with exact full repricing. The residual captures the difference between the approximation and the full revaluation.",
  limitations:
    "This work uses illustrative data and simplified modeling assumptions. It is not intended for trading or production risk management.",
  disclaimer:
    "This work uses illustrative data for educational and research purposes. It is not intended for trading, investment advice, or production risk management.",
  acknowledgment:
    "This independent project was inspired by concepts studied in FE635: Financial Enterprise Risk Engineering at Stevens Institute of Technology under Prof. Juan Eroles. The implementation, data design, analytics structure, and presentation were developed independently for portfolio and research demonstration purposes.",
} as const;

export const NAV_SECTIONS = [
  { id: "market", label: "Market" },
  { id: "book", label: "Book" },
  { id: "pricing", label: "Pricing & Greeks" },
  { id: "stress", label: "Stress" },
  { id: "hedging", label: "Hedging" },
  { id: "risk", label: "VaR / ES" },
  { id: "attribution", label: "Attribution" },
  { id: "assumptions", label: "Assumptions" },
] as const;

export const GITHUB_URL = "https://github.com/VM25/fx-options-risk-lab";
export const DEMO_URL = "";
