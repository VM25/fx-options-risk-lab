import { cn } from "@/lib/utils";

export function AnalyticsPanel({
  title,
  subtitle,
  children,
  footer,
  actions,
  tag,
  className,
  bodyClassName,
}: {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: string;
  actions?: React.ReactNode;
  tag?: string;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div className={cn("flex flex-col rounded-md border border-border bg-panel", className)}>
      {(title || actions) && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-panel-header px-3.5 py-2">
          <div className="flex min-w-0 items-baseline gap-2.5">
            {title ? (
              <h3 className="truncate text-[12.5px] font-semibold tracking-tight text-text-primary">
                {title}
              </h3>
            ) : null}
            {subtitle ? (
              <p className="hidden truncate text-[11px] text-text-muted md:block">{subtitle}</p>
            ) : null}
          </div>
          <div className="flex shrink-0 items-center gap-2.5">
            {actions}
            {tag ? <span className="label hidden sm:block">{tag}</span> : null}
          </div>
        </div>
      )}
      <div className={cn("p-3.5", bodyClassName)}>{children}</div>
      {footer ? (
        <div className="mt-auto border-t border-border-soft px-3.5 py-2 text-[11px] leading-snug text-text-muted">
          {footer}
        </div>
      ) : null}
    </div>
  );
}
