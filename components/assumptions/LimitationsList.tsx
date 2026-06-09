const ASSUMPTIONS = [
  "USD/MXN is quoted as MXN per 1 USD.",
  "Market parameters are illustrative, not a forecast.",
  "Garman-Kohlhagen assumes lognormal FX dynamics and constant input volatility.",
  "Volatility smile and skew are outside the current model scope.",
  "Hedging is static and simplified.",
  "Transaction and liquidity costs are excluded.",
  "Spot diffusion uses a 252-trading-day year.",
  "Time decay uses ACT/365 calendar time.",
  "VaR/ES depends on scenario and distribution assumptions.",
  "Limits are illustrative thresholds.",
  "Not intended for trading or production risk management.",
];

export function LimitationsList() {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-2">
      {ASSUMPTIONS.map((a, i) => (
        <div key={a} className="flex items-baseline gap-2.5 border-b border-border-soft py-1.5">
          <span className="tabular font-mono text-[10px] text-text-faint">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="text-[12px] leading-snug text-text-secondary">{a}</span>
        </div>
      ))}
    </div>
  );
}
