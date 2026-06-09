"use client";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import type { PnLAttribution } from "@/lib/types";
import { COLORS } from "@/lib/constants";
import { tooltipStyle } from "@/lib/chart-utils";
import { formatSignedMXN, formatMXNCompact } from "@/lib/formatters";

type Step = {
  name: string;
  value: number;
  spacer: number;
  magnitude: number;
  color: string;
};

function buildContributionSteps(a: PnLAttribution): Step[] {
  const parts: { name: string; value: number; color: string }[] = [
    { name: "Delta", value: a.deltaContribution, color: a.deltaContribution >= 0 ? COLORS.green : COLORS.red },
    { name: "Gamma", value: a.gammaContribution, color: a.gammaContribution >= 0 ? COLORS.green : COLORS.red },
    { name: "Vega", value: a.vegaContribution, color: a.vegaContribution >= 0 ? COLORS.green : COLORS.red },
    { name: "Theta", value: a.thetaContribution, color: a.thetaContribution >= 0 ? COLORS.green : COLORS.red },
    { name: "Residual", value: a.residual, color: COLORS.amber },
  ];

  const steps: Step[] = [];
  let cum = 0;
  for (const p of parts) {
    const start = cum;
    const end = cum + p.value;
    steps.push({
      name: p.name,
      value: p.value,
      spacer: Math.min(start, end),
      magnitude: Math.abs(p.value),
      color: p.color,
    });
    cum = end;
  }
  // Final total bar from zero baseline.
  steps.push({
    name: "Full reprice",
    value: a.fullRepricingPnl,
    spacer: Math.min(0, a.fullRepricingPnl),
    magnitude: Math.abs(a.fullRepricingPnl),
    color: COLORS.cyan,
  });
  return steps;
}

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload as Step;
  return (
    <div style={tooltipStyle}>
      <p className="text-text-primary">{d.name}</p>
      <p className="mt-1 text-text-secondary">{formatSignedMXN(d.value)}</p>
    </div>
  );
}

export function AttributionChart({
  attribution,
  height = 300,
}: {
  attribution: PnLAttribution;
  height?: number;
}) {
  const data = buildContributionSteps(attribution);
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 10, right: 16, bottom: 10, left: 6 }}>
        <CartesianGrid stroke={COLORS.grid} strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 11, fill: COLORS.axis }}
          tickLine={false}
          axisLine={{ stroke: COLORS.border }}
        />
        <YAxis
          tickFormatter={(v) => formatMXNCompact(v).replace("MXN ", "")}
          tick={{ fontSize: 11, fill: COLORS.axis }}
          tickLine={false}
          axisLine={false}
          width={56}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(148,163,184,0.06)" }} />
        <ReferenceLine y={0} stroke={COLORS.textFaint} strokeWidth={1} />
        {/* transparent spacer to float the visible bar */}
        <Bar dataKey="spacer" stackId="w" fill="transparent" isAnimationActive={false} />
        <Bar dataKey="magnitude" stackId="w" radius={[2, 2, 0, 0]} isAnimationActive={false}>
          {data.map((d, i) => (
            <Cell key={i} fill={d.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
