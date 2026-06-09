import { MetricRibbon, type Metric } from "@/components/layout/MetricRibbon";
import { MarketAssumptionsTable } from "@/components/market/MarketAssumptionsTable";
import { COPY, GITHUB_URL } from "@/lib/constants";
import { bookSummary } from "@/lib/data/book";
import { stressSummary } from "@/lib/data/stress";
import { varEsResults } from "@/lib/data/risk";
import { marketData } from "@/lib/data/market";
import {
  formatSignedMXNCompact,
  formatMXNCompact,
  formatNumber,
} from "@/lib/formatters";

const CAPABILITIES = [
  { k: "Pricing", v: "Garman-Kohlhagen FX options" },
  { k: "Risk", v: "VaR, ES, stress scenarios" },
  { k: "Hedging", v: "Delta and vega exposure" },
  { k: "Attribution", v: "Where P&L comes from" },
];

export function HeroSection() {
  const var95 = varEsResults.find((v) => v.confidenceLevel === 0.95);

  const snapshot: Metric[] = [
    { label: "Net delta", value: formatSignedMXNCompact(bookSummary.netDelta), tone: bookSummary.netDelta >= 0 ? "pos" : "neg", sub: "MXN / 1.00 spot" },
    { label: "Net gamma", value: formatNumber(bookSummary.netGamma, 0), tone: bookSummary.netGamma >= 0 ? "pos" : "neg", sub: "MXN / spot²" },
    { label: "Net vega", value: formatSignedMXNCompact(bookSummary.netVegaPerVolPoint), tone: bookSummary.netVegaPerVolPoint >= 0 ? "pos" : "neg", sub: "MXN / vol pt" },
    { label: "Net theta", value: formatSignedMXNCompact(bookSummary.netThetaPerDay), tone: bookSummary.netThetaPerDay >= 0 ? "pos" : "neg", sub: "MXN / day" },
    { label: "95% VaR 1d", value: var95 ? formatMXNCompact(var95.var) : "n/a", sub: "10,000 Monte Carlo" },
    { label: "Worst stress", value: formatSignedMXNCompact(stressSummary.worstCasePnl), tone: "neg", sub: "full reprice" },
  ];

  return (
    <section id="market" className="scroll-mt-14 pb-10 pt-5">
      {/* Document metadata strip */}
      <div
        id="top"
        className="flex flex-wrap items-center justify-between gap-x-5 gap-y-1 border-b border-border-soft pb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted"
      >
        <span>USD/MXN Options Risk</span>
        <span className="flex items-center gap-3">
          <span>Garman-Kohlhagen</span>
          <span className="h-2.5 w-px bg-border" />
          <span className="text-text-secondary">Valuation {marketData.valuationDate}</span>
        </span>
      </div>

      {/* Title + market base case (asymmetric split) */}
      <div className="mt-6 grid gap-x-10 gap-y-7 lg:grid-cols-[1.4fr_0.6fr]">
        <div>
          <h1 className="text-[34px] font-extrabold leading-[0.98] tracking-[-0.03em] text-text-primary sm:text-[46px]">
            FX Options Risk Lab
          </h1>
          <p className="mt-3.5 max-w-[54ch] text-[14px] leading-relaxed text-text-secondary">
            {COPY.heroSubtitle}
          </p>
          <p className="mt-3 max-w-[60ch] text-[12.5px] leading-relaxed text-text-muted">{COPY.heroThesis}</p>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block font-mono text-[10.5px] uppercase tracking-[0.12em] text-accent-cyan transition-opacity hover:opacity-80"
          >
            GitHub ↗
          </a>
        </div>

        <div className="lg:border-l lg:border-border-soft lg:pl-8">
          <p className="label mb-2.5">Market base case</p>
          <MarketAssumptionsTable />
          <p className="mt-3 text-[11px] leading-relaxed text-text-muted">{COPY.market}</p>
        </div>
      </div>

      {/* Key-risk ribbon */}
      <div className="mt-8 border-t-2 border-border pt-3">
        <p className="label mb-3">Book risk snapshot (pre-hedge, net exposures)</p>
        <MetricRibbon metrics={snapshot} cols="grid-cols-2 sm:grid-cols-3 lg:grid-cols-6" size="lg" />
        <p className="mt-2.5 text-[12px] leading-snug text-text-secondary">{COPY.heroInsight}</p>
      </div>

      {/* Capability strip */}
      <div className="mt-7 grid grid-cols-2 divide-x divide-border-soft border-y border-border-soft sm:grid-cols-4">
        {CAPABILITIES.map((c) => (
          <div key={c.k} className="px-4 py-2.5 first:pl-0">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-text-primary">{c.k}</p>
            <p className="mt-0.5 text-[11px] leading-snug text-text-muted">{c.v}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
