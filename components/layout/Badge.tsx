import { cn } from "@/lib/utils";

type Variant = "neutral" | "info" | "positive" | "warning" | "danger" | "muted";

const variants: Record<Variant, string> = {
  neutral: "border-border bg-panel-elevated text-text-secondary",
  info: "border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan",
  positive: "border-accent-green/30 bg-accent-green/10 text-accent-green",
  warning: "border-accent-amber/30 bg-accent-amber/10 text-accent-amber",
  danger: "border-accent-red/30 bg-accent-red/10 text-accent-red",
  muted: "border-border-soft bg-transparent text-text-muted",
};

export function Badge({
  children,
  variant = "neutral",
  className,
  mono = true,
}: {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  mono?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 text-[10.5px] font-medium tracking-wide",
        mono && "font-mono uppercase tracking-wider",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
