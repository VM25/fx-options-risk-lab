import { MetricRibbon, type Metric } from "@/components/layout/MetricRibbon";
import { bookSummary } from "@/lib/data/book";
import {
  formatUSDCompact,
  formatMXNCompact,
  formatSignedMXNCompact,
  formatNumber,
} from "@/lib/formatters";

export function BookSummaryCards() {
  const metrics: Metric[] = [
    { label: "Instruments", value: formatNumber(bookSummary.instrumentCount), sub: "calls + puts, long/short" },
    { label: "Gross notional", value: formatUSDCompact(bookSummary.grossNotionalUSD), sub: "gross USD notional" },
    { label: "Net mkt value", value: formatMXNCompact(bookSummary.netMarketValueMXN), sub: "net mark-to-market" },
    { label: "Net delta", value: formatSignedMXNCompact(bookSummary.netDelta), tone: bookSummary.netDelta >= 0 ? "pos" : "neg", sub: "MXN / 1.00 spot" },
    { label: "Net vega", value: formatSignedMXNCompact(bookSummary.netVegaPerVolPoint), tone: bookSummary.netVegaPerVolPoint >= 0 ? "pos" : "neg", sub: "MXN / vol pt" },
    { label: "Net theta", value: formatSignedMXNCompact(bookSummary.netThetaPerDay), tone: bookSummary.netThetaPerDay >= 0 ? "pos" : "neg", sub: "MXN / day" },
  ];
  return <MetricRibbon metrics={metrics} cols="grid-cols-2 sm:grid-cols-3 lg:grid-cols-6" />;
}
