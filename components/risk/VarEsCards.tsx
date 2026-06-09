import { MetricRibbon, type Metric } from "@/components/layout/MetricRibbon";
import { varEsResults, riskMeta } from "@/lib/data/risk";
import { formatMXNCompact, formatNumber } from "@/lib/formatters";

export function VarEsCards({ confidence }: { confidence: 0.95 | 0.99 }) {
  const v95 = varEsResults.find((v) => v.confidenceLevel === 0.95)!;
  const v99 = varEsResults.find((v) => v.confidenceLevel === 0.99)!;
  const sel95 = confidence === 0.95;

  const metrics: Metric[] = [
    { label: "95% VaR", value: formatMXNCompact(v95.var), tone: sel95 ? "accent" : "default", sub: "1-day threshold" },
    { label: "99% VaR", value: formatMXNCompact(v99.var), tone: !sel95 ? "accent" : "default", sub: "1-day threshold" },
    { label: "95% ES", value: formatMXNCompact(v95.expectedShortfall), tone: sel95 ? "accent" : "default", sub: "mean tail loss" },
    { label: "99% ES", value: formatMXNCompact(v99.expectedShortfall), tone: !sel95 ? "accent" : "default", sub: "mean tail loss" },
    { label: "Simulations", value: formatNumber(riskMeta.nSims), sub: "Monte Carlo paths" },
    { label: "Horizon", value: `${riskMeta.horizonDays}d`, sub: "spot and vol shocks" },
  ];
  return <MetricRibbon metrics={metrics} cols="grid-cols-2 sm:grid-cols-3 lg:grid-cols-6" />;
}
