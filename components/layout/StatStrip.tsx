import { cn } from "@/lib/utils";

export type StatTone = "default" | "pos" | "neg" | "warn" | "accent";
export type StatStatus = "green" | "amber" | "red";

export type Stat = {
  label: string;
  value: string;
  sub?: string;
  tone?: StatTone;
  status?: StatStatus;
  statusText?: string;
};

const toneClass: Record<StatTone, string> = {
  default: "text-text-primary",
  pos: "text-accent-green",
  neg: "text-accent-red",
  warn: "text-accent-amber",
  accent: "text-accent-cyan",
};

const dotClass: Record<StatStatus, string> = {
  green: "bg-accent-green",
  amber: "bg-accent-amber",
  red: "bg-accent-red",
};

/**
 * Terminal-style readout: hairline-ruled cells on a single bordered surface.
 * `cols` is a responsive grid-cols class string.
 */
export function StatStrip({
  stats,
  cols = "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
  className,
  size = "md",
}: {
  stats: Stat[];
  cols?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const valueSize =
    size === "lg" ? "text-[19px]" : size === "sm" ? "text-[13px]" : "text-[15px]";
  return (
    <div
      className={cn(
        "grid gap-px overflow-hidden rounded-md border border-border bg-border",
        cols,
        className,
      )}
    >
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col bg-panel px-3.5 py-3">
          <div className="flex items-start justify-between gap-2">
            <span className="label">{s.label}</span>
            {s.status ? (
              <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-text-muted">
                <span className={cn("h-1.5 w-1.5 rounded-full", dotClass[s.status])} />
                {s.statusText}
              </span>
            ) : null}
          </div>
          <span
            className={cn(
              "tabular mt-2 font-mono font-semibold leading-none",
              valueSize,
              toneClass[s.tone ?? "default"],
            )}
          >
            {s.value}
          </span>
          {s.sub ? (
            <span className="mt-1.5 text-[10.5px] leading-snug text-text-faint">{s.sub}</span>
          ) : null}
        </div>
      ))}
    </div>
  );
}
