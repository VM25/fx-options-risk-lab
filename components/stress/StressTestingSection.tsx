import { Section } from "@/components/layout/Section";
import { SectionLead } from "@/components/layout/SectionLead";
import { ChartWell } from "@/components/layout/ChartWell";
import { StressSummaryCards } from "./StressSummaryCards";
import { StressHeatmap } from "./StressHeatmap";
import { SpotShockChart } from "./SpotShockChart";
import { VolShockChart } from "./VolShockChart";
import { COPY } from "@/lib/constants";

export function StressTestingSection() {
  return (
    <Section id="stress">
      <SectionLead
        index="04"
        kicker="Stress Testing"
        title="Spot and Volatility Stress Repricing"
        lead={COPY.stress}
        note="Immediate revaluation; no time decay."
      />
      <div className="mt-5">
        <StressSummaryCards />
      </div>
      <div className="mt-6 grid gap-x-8 gap-y-6 lg:grid-cols-[1.3fr_1fr]">
        <ChartWell
          title="Spot-volatility stress P&L"
          subtitle="MXN"
          footer="Each cell is the full repriced book P&L minus the base book value."
          className="min-w-0"
        >
          <StressHeatmap />
        </ChartWell>
        <div className="flex min-w-0 flex-col gap-6">
          <ChartWell title="Spot shock P&L" subtitle="vol held at base">
            <SpotShockChart />
          </ChartWell>
          <ChartWell title="Volatility shock P&L" subtitle="spot held at base">
            <VolShockChart />
          </ChartWell>
        </div>
      </div>
    </Section>
  );
}
