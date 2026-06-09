import { cn } from "@/lib/utils";

export type MetricTone = "default" | "pos" | "neg" | "warn" | "accent";

export type Metric = {
  label: string;
  value: string;
  sub?: string;
  tone?: MetricTone;
  flag?: string; // tiny right-aligned status text
};

const toneClass: Record<MetricTone, string> = {
  default: "text-text-primary",
  pos: "text-accent-green",
  neg: "text-accent-red",
  warn: "text-accent-amber",
  accent: "text-accent-cyan",
};

/**
 * Flat metric ribbon: values sit directly on the page, divided by hairlines.
 * Cells use the page background so there is no card/panel treatment.
 */
export function MetricRibbon({
  metrics,
  cols = "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
  size = "md",
  className,
}: {
  metrics: Metric[];
  cols?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const valueSize =
    size === "lg" ? "text-[20px]" : size === "sm" ? "text-[13px]" : "text-[15px]";
  return (
    <div className={cn("grid divide-x divide-border-soft border-y border-border-soft", cols, className)}>
      {metrics.map((m) => (
        <div key={m.label} className="flex flex-col px-4 py-3 first:pl-0">
          <div className="flex items-baseline justify-between gap-2">
            <span className="label">{m.label}</span>
            {m.flag ? (
              <span className="font-mono text-[9px] uppercase tracking-wider text-text-muted">{m.flag}</span>
            ) : null}
          </div>
          <span className={cn("tabular mt-2 font-mono font-semibold leading-none", valueSize, toneClass[m.tone ?? "default"])}>
            {m.value}
          </span>
          {m.sub ? <span className="mt-1.5 text-[10.5px] leading-snug text-text-faint">{m.sub}</span> : null}
        </div>
      ))}
    </div>
  );
}
