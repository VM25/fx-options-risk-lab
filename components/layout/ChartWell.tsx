import { cn } from "@/lib/utils";

/**
 * A labeled, recessed analytical area. The chart/table sits in a "well" (inset
 * screen), introduced by a label rule. No bordered-card treatment.
 */
export function ChartWell({
  title,
  subtitle,
  actions,
  footer,
  children,
  className,
  bodyClassName,
  inset = true,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  footer?: string;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  inset?: boolean;
}) {
  return (
    <figure className={cn("flex flex-col", className)}>
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1.5 border-b border-border pb-2">
        <div className="flex items-baseline gap-2.5">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-text-primary">
            {title}
          </span>
          {subtitle ? <span className="text-[11px] text-text-muted">{subtitle}</span> : null}
        </div>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </figcaption>
      <div className={cn("mt-3 rounded-md p-3", inset && "well", bodyClassName)}>{children}</div>
      {footer ? <p className="mt-2 text-[11px] leading-snug text-text-muted">{footer}</p> : null}
    </figure>
  );
}
