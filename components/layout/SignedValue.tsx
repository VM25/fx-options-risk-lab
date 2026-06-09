import { cn } from "@/lib/utils";

export function SignedValue({
  value,
  format,
  className,
  neutralThreshold = 0,
}: {
  value: number;
  format: (v: number) => string;
  className?: string;
  neutralThreshold?: number;
}) {
  const tone =
    value > neutralThreshold
      ? "text-accent-green"
      : value < -neutralThreshold
        ? "text-accent-red"
        : "text-text-secondary";
  return <span className={cn("tabular", tone, className)}>{format(value)}</span>;
}
