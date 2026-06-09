"use client";

import { useState } from "react";
import { Section } from "@/components/layout/Section";
import { SectionLead } from "@/components/layout/SectionLead";
import { ChartWell } from "@/components/layout/ChartWell";
import { AttributionChart } from "./AttributionChart";
import { AttributionTable } from "./AttributionTable";
import { attributionResults } from "@/lib/data/attribution";
import { COPY } from "@/lib/constants";
import { formatSignedMXNCompact } from "@/lib/formatters";
import { cn } from "@/lib/utils";

const SHORT_LABELS = ["+5% spot / +3 vol pts", "-5% spot / +3 vol pts", "Worst stress", "1-day carry"];

export function PnlAttributionSection() {
  const [index, setIndex] = useState(0);
  const active = attributionResults[index];

  return (
    <Section id="attribution">
      <SectionLead
        index="07"
        kicker="P&L Attribution"
        title="Scenario P&L Attribution"
        lead={COPY.attribution}
        right={
          <div className="text-left sm:text-right">
            <span className="label block">Full repricing P&L</span>
            <span
              className={cn(
                "tabular font-mono text-[19px] font-bold",
                active.fullRepricingPnl >= 0 ? "text-accent-green" : "text-accent-red",
              )}
            >
              {formatSignedMXNCompact(active.fullRepricingPnl)}
            </span>
          </div>
        }
      />

      {/* Scenario chips */}
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-border-soft pb-2.5">
        <span className="label">Scenario</span>
        {attributionResults.map((a, i) => (
          <button
            key={a.scenarioName}
            type="button"
            onClick={() => setIndex(i)}
            aria-pressed={i === index}
            className={cn(
              "cursor-pointer border-b pb-0.5 font-mono text-[10.5px] uppercase tracking-[0.08em] transition-colors duration-150 active:scale-[0.97]",
              i === index ? "border-accent-cyan text-text-primary" : "border-transparent text-text-muted hover:text-text-secondary",
            )}
          >
            {SHORT_LABELS[i] ?? a.scenarioName}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-x-8 gap-y-6 lg:grid-cols-[1.3fr_1fr]">
        <ChartWell
          title="Scenario P&L Decomposition"
          subtitle={active.scenarioName}
          footer="Market-shock scenarios use immediate revaluation. The carry scenario isolates one day of time decay."
          className="min-w-0"
        >
          <AttributionChart attribution={active} height={300} />
        </ChartWell>
        <div className="min-w-0">
          <div className="flex items-baseline justify-between border-b border-border pb-2">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-text-primary">
              Component breakdown
            </span>
            <span className="label">MXN</span>
          </div>
          <div className="mt-1">
            <AttributionTable attribution={active} />
          </div>
        </div>
      </div>
    </Section>
  );
}
