import { cn } from "@/lib/utils";

export type MetricStatus = "green" | "amber" | "red" | "neutral";

export type MetricCardData = {
  label: string;
  value: string;
  status?: MetricStatus;
  statusLabel?: string;
  helper?: string;
};

const statusDot: Record<MetricStatus, string> = {
  green: "bg-accent-green",
  amber: "bg-accent-amber",
  red: "bg-accent-red",
  neutral: "bg-text-faint",
};

export function MetricCard({
  label,
  value,
  status = "neutral",
  statusLabel,
  helper,
  className,
}: MetricCardData & { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-md border border-border bg-panel px-3.5 py-3",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="label">{label}</span>
        {statusLabel ? (
          <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-text-muted">
            <span className={cn("h-1.5 w-1.5 rounded-full", statusDot[status])} />
            {statusLabel}
          </span>
        ) : null}
      </div>
      <p className="tabular mt-2 font-mono text-[17px] font-semibold leading-none text-text-primary">
        {value}
      </p>
      {helper ? (
        <p className="mt-1.5 text-[10.5px] leading-snug text-text-faint">{helper}</p>
      ) : null}
    </div>
  );
}
