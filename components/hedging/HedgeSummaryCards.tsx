import { MetricRibbon, type Metric } from "@/components/layout/MetricRibbon";
import { hedgeResult } from "@/lib/data/hedge";
import {
  formatSignedMXNCompact,
  formatUSDCompact,
  formatPercent,
} from "@/lib/formatters";

export function HedgeSummaryCards() {
  const h = hedgeResult;
  const metrics: Metric[] = [
    { label: "Original delta", value: formatSignedMXNCompact(h.baseBookDelta), tone: "neg", sub: "MXN / 1.00 spot" },
    { label: "Hedge notional", value: formatUSDCompact(h.hedgeNotionalUSD), sub: h.hedgeNotionalUSD < 0 ? "sell USD/MXN" : "buy USD/MXN" },
    { label: "Hedged delta", value: formatSignedMXNCompact(h.hedgedBookDelta), tone: "pos", sub: "residual first-order" },
    { label: "Delta cut", value: formatPercent(h.deltaReductionPct, 1), tone: "pos", sub: "first-order risk" },
    { label: "Unhedged worst", value: formatSignedMXNCompact(h.unhedgedWorstLoss), tone: "neg", sub: "±10% spot grid" },
    { label: "Hedged worst", value: formatSignedMXNCompact(h.hedgedWorstLoss), tone: "neg", sub: "residual gamma" },
    { label: "Worst-loss cut", value: formatPercent(h.worstLossReductionPct, 1), tone: "pos", sub: "downside removed" },
  ];
  return <MetricRibbon metrics={metrics} cols="grid-cols-2 sm:grid-cols-4 lg:grid-cols-7" />;
}
