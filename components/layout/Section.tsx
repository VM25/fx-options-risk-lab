import { cn } from "@/lib/utils";

export function Section({
  id,
  children,
  className,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
  divider?: boolean;
}) {
  return (
    <section id={id} className={cn("scroll-mt-14 py-9 lg:py-12", className)}>
      {children}
    </section>
  );
}
