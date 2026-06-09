import { cn } from "@/lib/utils";

export function NarrativeBlock({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("max-w-[70ch] text-[12.5px] leading-relaxed text-text-secondary", className)}>
      {children}
    </p>
  );
}
