import { COPY, GITHUB_URL, DEMO_URL } from "@/lib/constants";

export function ProjectFooter() {
  return (
    <footer className="border-t-2 border-border pb-10 pt-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">
        <span className="text-text-secondary">FX Options Risk Lab</span>
        <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="transition-colors hover:text-text-primary">
            GitHub ↗
          </a>
          {DEMO_URL ? (
            <a href={DEMO_URL} target="_blank" rel="noreferrer" className="transition-colors hover:text-text-primary">
              Live demo ↗
            </a>
          ) : null}
        </span>
      </div>

      <div className="mt-5 grid gap-x-8 gap-y-3 lg:grid-cols-[1fr_1fr]">
        <p className="max-w-[68ch] text-[11px] leading-relaxed text-text-muted">{COPY.disclaimer}</p>
        <p className="max-w-[72ch] text-[11px] leading-relaxed text-text-faint">{COPY.acknowledgment}</p>
      </div>

      <p className="mt-5 font-mono text-[10px] tracking-[0.04em] text-text-faint">
        Built with Next.js, TypeScript, Tailwind, Recharts, Python, NumPy, SciPy, and QuantLib.
      </p>
    </footer>
  );
}
