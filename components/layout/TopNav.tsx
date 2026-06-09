"use client";

import { useEffect, useState } from "react";
import { NAV_SECTIONS, GITHUB_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function TopNav() {
  const [active, setActive] = useState<string>("market");

  useEffect(() => {
    const ids = NAV_SECTIONS.map((s) => s.id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-44% 0px -52% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 -mx-5 mb-0 border-b border-border bg-background-primary/92 px-5 backdrop-blur-md sm:-mx-7 sm:px-7 lg:-mx-9 lg:px-9">
      <div className="flex h-11 items-center justify-between gap-6">
        <a href="#top" className="shrink-0 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-text-primary">
          FX<span className="text-accent-cyan">/</span>RISK LAB
        </a>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {NAV_SECTIONS.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={cn(
                "group inline-flex items-baseline gap-1.5 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] transition-colors duration-150",
                active === s.id ? "text-text-primary" : "text-text-muted hover:text-text-secondary",
              )}
            >
              <span className={cn("tabular text-[8px]", active === s.id ? "text-accent-cyan" : "text-text-faint")}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {s.label}
            </a>
          ))}
        </nav>

        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-text-secondary transition-colors duration-150 hover:text-text-primary"
        >
          GitHub ↗
        </a>
      </div>
    </header>
  );
}
