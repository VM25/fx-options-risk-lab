// Consistent value formatting for the UI. Raw decimals never reach the screen.

function nf(value: number, min = 0, max = 0): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: min,
    maximumFractionDigits: max,
  });
}

export function formatMXN(value: number): string {
  return `MXN ${nf(value, 0, 0)}`;
}

function compact(value: number): string {
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";
  if (abs >= 1_000_000) return `${sign}${(abs / 1_000_000).toFixed(2)}M`;
  if (abs >= 1_000) return `${sign}${(abs / 1_000).toFixed(1)}K`;
  return `${sign}${abs.toFixed(0)}`;
}

export function formatMXNCompact(value: number): string {
  return `MXN ${compact(value)}`;
}

export function formatUSD(value: number): string {
  return `USD ${nf(value, 0, 0)}`;
}

export function formatUSDCompact(value: number): string {
  return `USD ${compact(value)}`;
}

export function formatPercent(value: number, decimals = 2): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

export function formatSignedPercent(value: number, decimals = 1): string {
  const pct = value * 100;
  const sign = pct > 0 ? "+" : "";
  return `${sign}${pct.toFixed(decimals)}%`;
}

export function formatVolPoints(value: number): string {
  // value is an absolute volatility change in decimal (e.g. 0.03 => +3.0 vol pts)
  const points = value * 100;
  const sign = points > 0 ? "+" : "";
  return `${sign}${points.toFixed(1)} vol pts`;
}

export function formatFX(value: number): string {
  return `${value.toFixed(4)} USD/MXN`;
}

export function formatFXRaw(value: number): string {
  return value.toFixed(4);
}

export function formatNumber(value: number, decimals = 0): string {
  return nf(value, decimals, decimals);
}

export function formatSignedMXN(value: number): string {
  const sign = value > 0 ? "+" : value < 0 ? "-" : "";
  return `${sign}MXN ${nf(Math.abs(value), 0, 0)}`;
}

export function formatSignedMXNCompact(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}MXN ${compact(value)}`;
}

// Greeks tend to be large MXN sensitivities; show as compact signed MXN.
export function formatGreek(value: number): string {
  return nf(value, 0, 0);
}

export function statusLabel(status: "green" | "amber" | "red"): string {
  if (status === "green") return "Within limit";
  if (status === "amber") return "Near limit";
  return "Breach";
}
