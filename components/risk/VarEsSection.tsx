"use client";

import { useState } from "react";
import { Section } from "@/components/layout/Section";
import { SectionLead } from "@/components/layout/SectionLead";
import { ChartWell } from "@/components/layout/ChartWell";
import { SegmentedControl } from "@/components/layout/SegmentedControl";
import { PnlDistributionChart } from "./PnlDistributionChart";
import { VarEsCards } from "./VarEsCards";
import { RiskLimitPanel } from "./RiskLimitPanel";
import { riskMeta } from "@/lib/data/risk";
import { COPY } from "@/lib/constants";

const OPTIONS = [
  { value: "0.95" as const, label: "95%" },
  { value: "0.99" as const, label: "99%" },
];

export function VarEsSection() {
  const [conf, setConf] = useState<"0.95" | "0.99">("0.95");
  const confidence = (conf === "0.95" ? 0.95 : 0.99) as 0.95 | 0.99;

  return (
    <Section id="risk">
      <SectionLead
        index="06"
        kicker="Value at Risk"
        title="Simulated 1-Day VaR and Expected Shortfall"
        lead={COPY.varEs}
        note={`Spot diffusion uses a ${riskMeta.tradingDays}-trading-day year. Time decay uses ACT/${riskMeta.calendarDays}.`}
      />
      <div className="mt-5">
        <VarEsCards confidence={confidence} />
      </div>
      <div className="mt-6 grid gap-x-8 gap-y-6 lg:grid-cols-[1.5fr_1fr]">
        <ChartWell
          title="Simulated 1-day P&L distribution"
          subtitle="spot and vol shocks"
          actions={<SegmentedControl ariaLabel="Confidence level" options={OPTIONS} value={conf} onChange={setConf} />}
          footer="VaR and ES are positive loss numbers; ES exceeds VaR at the same confidence. Tail beyond the selected VaR is highlighted."
          className="min-w-0"
        >
          <PnlDistributionChart confidence={confidence} height={300} />
        </ChartWell>
        <div className="min-w-0">
          <div className="flex items-baseline justify-between border-b border-border pb-2">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-text-primary">
              Risk Limits
            </span>
            <span className="label">utilization</span>
          </div>
          <div className="mt-2.5">
            <RiskLimitPanel />
          </div>
          <p className="mt-3 text-[11px] leading-snug text-text-muted">
            Illustrative thresholds used to show utilization and breach behavior. Not calibrated to a real institution&apos;s framework.
          </p>
        </div>
      </div>
    </Section>
  );
}
