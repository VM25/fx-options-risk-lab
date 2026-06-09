"use client";

import { useState } from "react";
import { Section } from "@/components/layout/Section";
import { SectionLead } from "@/components/layout/SectionLead";
import { ChartWell } from "@/components/layout/ChartWell";
import { SegmentedControl } from "@/components/layout/SegmentedControl";
import { HedgeSummaryCards } from "./HedgeSummaryCards";
import { HedgeComparisonChart, type HedgeView } from "./HedgeComparisonChart";
import { COPY } from "@/lib/constants";

const OPTIONS = [
  { value: "both" as const, label: "Both" },
  { value: "unhedged" as const, label: "Unhedged" },
  { value: "hedged" as const, label: "Hedged" },
];

export function HedgingLabSection() {
  const [view, setView] = useState<HedgeView>("both");

  return (
    <Section id="hedging">
      <SectionLead
        index="05"
        kicker="Hedging"
        title="Delta Hedge Impact"
        lead="A static spot hedge offsets first-order exposure while leaving residual gamma, vega, theta, and nonlinear repricing risk."
      />
      <div className="mt-5">
        <HedgeSummaryCards />
      </div>
      <div className="mt-6">
        <ChartWell
          title="Unhedged vs hedged P&L"
          subtitle="spot shocks, hedge sized to offset net delta"
          actions={<SegmentedControl ariaLabel="Hedge view" options={OPTIONS} value={view} onChange={setView} />}
          footer={COPY.hedging}
        >
          <HedgeComparisonChart view={view} height={320} />
        </ChartWell>
      </div>
    </Section>
  );
}
