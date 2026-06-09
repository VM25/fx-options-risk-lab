import { Section } from "@/components/layout/Section";
import { SectionLead } from "@/components/layout/SectionLead";
import { MetricRibbon, type Metric } from "@/components/layout/MetricRibbon";
import { InstrumentRiskTable } from "./InstrumentRiskTable";
import { bookSummary } from "@/lib/data/book";
import { COPY } from "@/lib/constants";
import {
  formatMXNCompact,
  formatSignedMXNCompact,
  formatNumber,
} from "@/lib/formatters";

export function PricingGreeksSection() {
  const metrics: Metric[] = [
    { label: "Net mkt value", value: formatMXNCompact(bookSummary.netMarketValueMXN), sub: "net mark-to-market" },
    { label: "Net delta", value: formatSignedMXNCompact(bookSummary.netDelta), tone: bookSummary.netDelta >= 0 ? "pos" : "neg", sub: "MXN / 1.00 spot" },
    { label: "Net gamma", value: formatNumber(bookSummary.netGamma, 0), tone: bookSummary.netGamma >= 0 ? "pos" : "neg", sub: "MXN / spot²" },
    { label: "Net vega", value: formatSignedMXNCompact(bookSummary.netVegaPerVolPoint), tone: bookSummary.netVegaPerVolPoint >= 0 ? "pos" : "neg", sub: "MXN / vol pt" },
    { label: "Net theta", value: formatSignedMXNCompact(bookSummary.netThetaPerDay), tone: bookSummary.netThetaPerDay >= 0 ? "pos" : "neg", sub: "MXN / day" },
  ];

  return (
    <Section id="pricing">
      <SectionLead
        index="03"
        kicker="Pricing & Greeks"
        title="Instrument Valuation and Risk Sensitivities"
        lead={COPY.pricing}
        note="Vega per 1 vol point; theta per calendar day. Greeks are position-signed."
      />
      <div className="mt-5">
        <MetricRibbon metrics={metrics} cols="grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" />
      </div>
      <div className="mt-6">
        <div className="flex items-baseline justify-between border-b border-border pb-2">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-text-primary">
            Instrument risk report
          </span>
          <span className="label">Garman-Kohlhagen, position-signed</span>
        </div>
        <div className="mt-2.5">
          <InstrumentRiskTable />
        </div>
        <p className="mt-2.5 text-[11px] text-text-muted">
          Signed columns sum to the book-level net exposures above.
        </p>
      </div>
    </Section>
  );
}
