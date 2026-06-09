import { MetricRibbon, type Metric } from "@/components/layout/MetricRibbon";
import { stressSummary } from "@/lib/data/stress";
import { riskLimits } from "@/lib/data/risk";
import {
  formatSignedMXNCompact,
  formatSignedPercent,
  formatMXNCompact,
  formatVolPoints,
  statusLabel,
} from "@/lib/formatters";

export function StressSummaryCards() {
  const stressLimit = riskLimits.find((r) => r.metric === "Worst stress loss");

  const metrics: Metric[] = [
    { label: "Worst-case P&L", value: formatSignedMXNCompact(stressSummary.worstCasePnl), tone: "neg", sub: "largest full-reprice loss" },
    { label: "Worst scenario", value: `${formatSignedPercent(stressSummary.worstCaseSpotShock, 0)}, ${formatVolPoints(stressSummary.worstCaseVolShock)}`, sub: "spot, vol shock" },
    { label: "Best-case P&L", value: formatSignedMXNCompact(stressSummary.bestCasePnl), tone: "pos", sub: `${formatSignedPercent(stressSummary.bestCaseSpotShock, 0)}, ${formatVolPoints(stressSummary.bestCaseVolShock)}` },
    { label: "Stress limit", value: stressLimit ? formatMXNCompact(stressLimit.limit) : "n/a", sub: "illustrative threshold" },
    {
      label: "Status",
      value: stressLimit ? statusLabel(stressLimit.status) : "n/a",
      tone: stressLimit?.status === "red" ? "neg" : stressLimit?.status === "amber" ? "warn" : "pos",
      flag: stressLimit ? `${(stressLimit.utilization * 100).toFixed(0)}%` : undefined,
      sub: "worst loss vs limit",
    },
  ];
  return <MetricRibbon metrics={metrics} cols="grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" />;
}
