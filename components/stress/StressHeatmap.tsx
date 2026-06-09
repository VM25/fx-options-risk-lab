"use client";

import { useMemo, useState } from "react";
import { stressGrid } from "@/lib/data/stress";
import type { StressGridPoint } from "@/lib/types";
import { pnlColor } from "@/lib/chart-utils";
import {
  formatSignedMXN,
  formatSignedPercent,
  formatFX,
  formatPercent,
  formatMXNCompact,
} from "@/lib/formatters";
import { cn } from "@/lib/utils";

type Hover = { point: StressGridPoint; x: number; y: number; w: number; h: number } | null;

const TIP_W = 210;
const TIP_H = 104;

export function StressHeatmap() {
  const [hover, setHover] = useState<Hover>(null);

  const { spotAxis, volAxis, lookup, maxAbs, worstKey, bestKey } = useMemo(() => {
    const spots = Array.from(new Set(stressGrid.map((g) => g.spotShock))).sort((a, b) => a - b);
    const vols = Array.from(new Set(stressGrid.map((g) => g.volShock))).sort((a, b) => b - a);
    const map = new Map<string, StressGridPoint>();
    let max = 0;
    for (const g of stressGrid) {
      map.set(`${g.spotShock}|${g.volShock}`, g);
      max = Math.max(max, Math.abs(g.pnl));
    }
    const worst = stressGrid.reduce((a, b) => (b.pnl < a.pnl ? b : a));
    const best = stressGrid.reduce((a, b) => (b.pnl > a.pnl ? b : a));
    return {
      spotAxis: spots,
      volAxis: vols,
      lookup: map,
      maxAbs: max,
      worstKey: `${worst.spotShock}|${worst.volShock}`,
      bestKey: `${best.spotShock}|${best.volShock}`,
    };
  }, []);

  const template = `30px repeat(${spotAxis.length}, minmax(0, 1fr))`;

  // Tooltip position is clamped inside the host so hover never causes overflow.
  const tipLeft = hover ? Math.max(2, Math.min(hover.x + 12, hover.w - TIP_W - 2)) : 0;
  const tipTop = hover ? Math.max(2, Math.min(hover.y + 12, hover.h - TIP_H - 2)) : 0;

  return (
    <div className="relative overflow-hidden">
      <div className="overflow-x-auto">
        <div className="min-w-[520px]">
          <div className="grid gap-[3px]" style={{ gridTemplateColumns: template }}>
            <div className="flex items-end justify-center pb-1 font-mono text-[8px] uppercase text-text-faint">σ↓</div>
            {spotAxis.map((s) => (
              <div key={`h${s}`} className="pb-1 text-center font-mono text-[9px] text-text-faint">
                {s === 0 ? "0" : `${s > 0 ? "+" : ""}${(s * 100).toFixed(0)}`}
              </div>
            ))}

            {volAxis.map((vol) => (
              <Row
                key={vol}
                vol={vol}
                spotAxis={spotAxis}
                lookup={lookup}
                maxAbs={maxAbs}
                worstKey={worstKey}
                bestKey={bestKey}
                onHover={setHover}
              />
            ))}
          </div>

          <p className="mt-1.5 font-mono text-[9px] uppercase tracking-wider text-text-faint">
            columns: USD/MXN spot shock &nbsp;·&nbsp; rows: implied-volatility shock
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2.5 font-mono text-[10px] tabular text-text-muted">
        <span className="text-accent-red">{formatMXNCompact(-maxAbs)}</span>
        <div
          className="h-1.5 flex-1 rounded-[1px]"
          style={{ background: "linear-gradient(90deg, rgb(186,64,60), #101218 48%, #101218 52%, rgb(50,150,92))" }}
        />
        <span className="text-accent-green">+{formatMXNCompact(maxAbs).replace("MXN ", "MXN ")}</span>
      </div>
      <div className="mt-2 flex items-center gap-4 font-mono text-[9px] uppercase tracking-wider text-text-muted">
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-[1px] shadow-[inset_0_0_0_1.5px_#D2574F]" /> worst case</span>
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-[1px] shadow-[inset_0_0_0_1.5px_#4CAF6E]" /> best case</span>
      </div>

      {hover ? (
        <div
          className="pointer-events-none absolute z-20 rounded-md border border-border bg-panel-elevated p-2.5 font-mono text-[11px] tabular shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
          style={{ left: tipLeft, top: tipTop, width: TIP_W }}
        >
          <p className="text-text-primary">
            {formatSignedPercent(hover.point.spotShock)} spot, {hover.point.volShock * 100 > 0 ? "+" : ""}
            {(hover.point.volShock * 100).toFixed(0)} vol pts
          </p>
          <p className="mt-1 text-text-muted">spot {formatFX(hover.point.scenarioSpot)}</p>
          <p className="text-text-muted">vol {formatPercent(hover.point.scenarioVol, 1)}</p>
          <p className={cn("mt-1", hover.point.pnl >= 0 ? "text-accent-green" : "text-accent-red")}>
            P&L {formatSignedMXN(hover.point.pnl)}
          </p>
        </div>
      ) : null}
    </div>
  );
}

function Row({
  vol,
  spotAxis,
  lookup,
  maxAbs,
  worstKey,
  bestKey,
  onHover,
}: {
  vol: number;
  spotAxis: number[];
  lookup: Map<string, StressGridPoint>;
  maxAbs: number;
  worstKey: string;
  bestKey: string;
  onHover: (h: Hover) => void;
}) {
  return (
    <>
      <div className="flex items-center justify-end pr-1.5 font-mono text-[9px] tabular text-text-faint">
        {vol * 100 > 0 ? "+" : ""}
        {(vol * 100).toFixed(0)}
      </div>
      {spotAxis.map((s) => {
        const key = `${s}|${vol}`;
        const point = lookup.get(key)!;
        const isWorst = key === worstKey;
        const isBest = key === bestKey;
        return (
          <button
            key={key}
            type="button"
            aria-label={`Spot ${(s * 100).toFixed(0)}%, vol ${(vol * 100).toFixed(0)} points, P&L ${point.pnl}`}
            onMouseMove={(e) => {
              const host = e.currentTarget.closest(".relative") as HTMLElement | null;
              const rect = host?.getBoundingClientRect();
              onHover({
                point,
                x: rect ? e.clientX - rect.left : e.clientX,
                y: rect ? e.clientY - rect.top : e.clientY,
                w: rect ? rect.width : 0,
                h: rect ? rect.height : 0,
              });
            }}
            onMouseLeave={() => onHover(null)}
            className={cn(
              // No transform/scale: hover emphasis is box-shadow + brightness only,
              // so hovering can never change layout or create overflow.
              "h-[22px] w-full rounded-[2px] transition-[filter] duration-100 hover:z-10 hover:brightness-[1.35] hover:shadow-[inset_0_0_0_1.5px_rgba(234,234,230,0.85)] sm:h-[24px]",
              isWorst && "shadow-[inset_0_0_0_2px_#D2574F]",
              isBest && "shadow-[inset_0_0_0_2px_#4CAF6E]",
            )}
            style={{ backgroundColor: pnlColor(point.pnl, maxAbs) }}
          />
        );
      })}
    </>
  );
}
