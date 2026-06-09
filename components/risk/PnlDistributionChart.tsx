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
import { histogram, varEsResults } from "@/lib/data/risk";
import { COLORS } from "@/lib/constants";
import { tooltipStyle } from "@/lib/chart-utils";
import { formatSignedMXN, formatMXNCompact, formatNumber } from "@/lib/formatters";

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={tooltipStyle}>
      <p className="font-mono text-text-primary">
        {formatSignedMXN(d.x0)} … {formatSignedMXN(d.x1)}
      </p>
      <p className="mt-1 text-text-secondary">{formatNumber(d.count)} scenarios</p>
    </div>
  );
}

export function PnlDistributionChart({
  confidence,
  height = 300,
}: {
  confidence: 0.95 | 0.99;
  height?: number;
}) {
  const bins = histogram.bins;
  const selected = varEsResults.find((v) => v.confidenceLevel === confidence)!;
  const tailThreshold = -selected.var;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={bins} margin={{ top: 22, right: 16, bottom: 20, left: 6 }} barCategoryGap={1}>
        <CartesianGrid stroke={COLORS.grid} strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="mid"
          type="number"
          domain={[histogram.min, histogram.max]}
          tickFormatter={(v) => formatMXNCompact(v).replace("MXN ", "")}
          tick={{ fontSize: 11, fill: COLORS.axis }}
          tickLine={false}
          axisLine={{ stroke: COLORS.border }}
          label={{ value: "Simulated P&L MXN (1-day)", position: "insideBottom", offset: -8, fontSize: 11, fill: COLORS.textMuted }}
        />
        <YAxis
          tick={{ fontSize: 11, fill: COLORS.axis }}
          tickLine={false}
          axisLine={false}
          width={42}
          label={{ value: "Scenarios", angle: -90, position: "insideLeft", fontSize: 11, fill: COLORS.textMuted }}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(148,163,184,0.06)" }} />

        <ReferenceLine
          x={-varEsResults.find((v) => v.confidenceLevel === 0.95)!.var}
          stroke={COLORS.amber}
          strokeDasharray="4 3"
          label={{ value: "95% VaR", position: "top", fontSize: 10, fill: COLORS.amber }}
        />
        <ReferenceLine
          x={-varEsResults.find((v) => v.confidenceLevel === 0.99)!.var}
          stroke={COLORS.red}
          strokeDasharray="4 3"
          label={{ value: "99% VaR", position: "top", fontSize: 10, fill: COLORS.red }}
        />
        <ReferenceLine
          x={-selected.expectedShortfall}
          stroke={COLORS.purple}
          strokeDasharray="2 2"
          label={{ value: `${confidence * 100}% ES`, position: "insideTopLeft", fontSize: 10, fill: COLORS.purple }}
        />

        <Bar dataKey="count" radius={[2, 2, 0, 0]} isAnimationActive={false}>
          {bins.map((b, i) => (
            <Cell key={i} fill={b.mid <= tailThreshold ? COLORS.red : "#3A3F48"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
