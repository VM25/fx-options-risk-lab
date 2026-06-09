"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { hedgeResult } from "@/lib/data/hedge";
import { COLORS } from "@/lib/constants";
import { tooltipStyle } from "@/lib/chart-utils";
import { formatSignedMXN, formatSignedPercent, formatMXNCompact, formatFX } from "@/lib/formatters";

export type HedgeView = "unhedged" | "hedged" | "both";

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={tooltipStyle}>
      <p className="font-mono text-text-primary">Spot shock {formatSignedPercent(d.spotShock)}</p>
      <p className="mt-1 text-text-muted">Scenario spot: {formatFX(d.scenarioSpot)}</p>
      <p className="mt-1 text-accent-cyan">Unhedged: {formatSignedMXN(d.unhedgedPnl)}</p>
      <p className="text-accent-teal">Hedged: {formatSignedMXN(d.hedgedPnl)}</p>
    </div>
  );
}

export function HedgeComparisonChart({ view, height = 300 }: { view: HedgeView; height?: number }) {
  const data = hedgeResult.scenarios.map((s) => ({ ...s, shockPct: s.spotShock * 100 }));
  const showUnhedged = view === "unhedged" || view === "both";
  const showHedged = view === "hedged" || view === "both";

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 10, right: 20, bottom: 20, left: 6 }}>
        <CartesianGrid stroke={COLORS.grid} strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="shockPct"
          tickFormatter={(v) => `${v > 0 ? "+" : ""}${v}%`}
          tick={{ fontSize: 11, fill: COLORS.axis }}
          tickLine={false}
          axisLine={{ stroke: COLORS.border }}
          label={{ value: "Spot shock %", position: "insideBottom", offset: -8, fontSize: 11, fill: COLORS.textMuted }}
        />
        <YAxis
          tickFormatter={(v) => formatMXNCompact(v).replace("MXN ", "")}
          tick={{ fontSize: 11, fill: COLORS.axis }}
          tickLine={false}
          axisLine={false}
          width={56}
          label={{ value: "P&L MXN", angle: -90, position: "insideLeft", fontSize: 11, fill: COLORS.textMuted }}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: COLORS.border }} />
        <ReferenceLine y={0} stroke={COLORS.textFaint} strokeWidth={1} />
        <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
        {showUnhedged && (
          <Line
            name="Unhedged P&L"
            type="monotone"
            dataKey="unhedgedPnl"
            stroke={COLORS.cyan}
            strokeWidth={2}
            dot={{ r: 2.5, fill: COLORS.cyan, strokeWidth: 0 }}
            activeDot={{ r: 4 }}
          />
        )}
        {showHedged && (
          <Line
            name="Hedged P&L"
            type="monotone"
            dataKey="hedgedPnl"
            stroke={COLORS.teal}
            strokeWidth={2}
            dot={{ r: 2.5, fill: COLORS.teal, strokeWidth: 0 }}
            activeDot={{ r: 4 }}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}
