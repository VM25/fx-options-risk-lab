import { COLORS } from "./constants";

// Diverging color scale for the stress heatmap: red (loss) -> dark neutral ->
// teal/green (gain). `t` is the P&L normalised to [-1, 1] around zero.
export function pnlColor(pnl: number, maxAbs: number): string {
  if (maxAbs <= 0) return "#101218";
  const t = Math.max(-1, Math.min(1, pnl / maxAbs));
  const intensity = Math.pow(Math.abs(t), 0.74);

  // Graphite base (16, 18, 24) -> semantic endpoints.
  if (t < 0) {
    // loss red (#D2574F == 210,87,79)
    const r = lerp(16, 186, intensity);
    const g = lerp(18, 64, intensity);
    const b = lerp(24, 60, intensity);
    return `rgb(${r}, ${g}, ${b})`;
  }
  // gain green (#4CAF6E == 76,175,110)
  const r = lerp(16, 50, intensity);
  const g = lerp(18, 150, intensity);
  const b = lerp(24, 92, intensity);
  return `rgb(${r}, ${g}, ${b})`;
}

function lerp(a: number, b: number, t: number): number {
  return Math.round(a + (b - a) * t);
}

// Recharts tooltip wrapper styling shared across charts.
export const tooltipStyle = {
  backgroundColor: COLORS.panelElevated,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 10,
  fontSize: 12,
  color: COLORS.textPrimary,
  boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
  padding: "10px 12px",
};

export const axisStyle = {
  fontSize: 11,
  fill: COLORS.axis,
};

export const gridStyle = {
  stroke: COLORS.grid,
  strokeDasharray: "3 3",
};
