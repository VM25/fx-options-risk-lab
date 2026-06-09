import { riskLimits } from "@/lib/data/risk";
import { formatNumber, formatPercent, statusLabel } from "@/lib/formatters";
import { cn } from "@/lib/utils";

const barColor: Record<string, string> = {
  green: "bg-accent-green",
  amber: "bg-accent-amber",
  red: "bg-accent-red",
};
const textColor: Record<string, string> = {
  green: "text-accent-green",
  amber: "text-accent-amber",
  red: "text-accent-red",
};

export function RiskLimitPanel() {
  return (
    <div className="border-t border-border">
      {riskLimits.map((r) => (
        <div
          key={r.metric}
          className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1.5 border-b border-border-soft py-2.5 sm:grid-cols-[1fr_64px_auto]"
        >
          <div className="min-w-0">
            <p className="truncate text-[12px] text-text-primary">{r.metric}</p>
            <p className="tabular font-mono text-[10px] text-text-faint">
              {formatNumber(r.value)} / {formatNumber(r.limit)}
            </p>
          </div>
          <div className="hidden h-[3px] overflow-hidden bg-border-soft sm:block">
            <div className={cn("h-full", barColor[r.status])} style={{ width: `${Math.min(r.utilization * 100, 100)}%` }} />
          </div>
          <div className="text-right">
            <p className={cn("font-mono text-[10px] uppercase tracking-[0.1em]", textColor[r.status])}>
              {statusLabel(r.status)}
            </p>
            <p className="tabular font-mono text-[10px] text-text-faint">{formatPercent(r.utilization, 0)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
