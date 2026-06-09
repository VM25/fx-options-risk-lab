"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { spotShocks } from "@/lib/data/stress";
import { COLORS } from "@/lib/constants";
import { tooltipStyle } from "@/lib/chart-utils";
import {
  formatSignedMXN,
  formatSignedPercent,
  formatMXNCompact,
  formatFX,
} from "@/lib/formatters";

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={tooltipStyle}>
      <p className="font-mono text-text-primary">Spot shock {formatSignedPercent(d.spotShock)}</p>
      <p className="mt-1 text-text-muted">Scenario spot: {formatFX(d.scenarioSpot)}</p>
      <p className="text-text-muted">Book value: {formatMXNCompact(d.bookValue)}</p>
      <p className="mt-1 text-text-secondary">P&L: {formatSignedMXN(d.pnl)}</p>
    </div>
  );
}

export function SpotShockChart({ height = 196 }: { height?: number }) {
  const data = spotShocks.map((s) => ({ ...s, shockPct: s.spotShock * 100 }));
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 10, right: 16, bottom: 18, left: 6 }}>
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
        />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: COLORS.border }} />
        <ReferenceLine y={0} stroke={COLORS.textFaint} strokeWidth={1} />
        <Line
          type="monotone"
          dataKey="pnl"
          stroke={COLORS.cyan}
          strokeWidth={2}
          dot={{ r: 2.5, fill: COLORS.cyan, strokeWidth: 0 }}
          activeDot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
