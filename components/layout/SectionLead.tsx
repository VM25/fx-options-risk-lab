export function SectionLead({
  index,
  kicker,
  title,
  lead,
  note,
  right,
}: {
  index: string;
  kicker: string;
  title: string;
  lead?: string;
  note?: string;
  right?: React.ReactNode;
}) {
  return (
    <header className="border-t-2 border-border pt-3">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <div className="flex items-baseline gap-3">
          <span className="tabular font-mono text-[11px] font-medium text-accent-cyan">{index}</span>
          <span className="label">{kicker}</span>
        </div>
        {right ? <div className="shrink-0">{right}</div> : null}
      </div>
      <h2 className="mt-2.5 text-[22px] font-bold leading-[1.04] tracking-[-0.02em] text-text-primary sm:text-[27px]">
        {title}
      </h2>
      {lead ? (
        <p className="mt-2 max-w-[70ch] text-[12.5px] leading-relaxed text-text-secondary">{lead}</p>
      ) : null}
      {note ? (
        <p className="mt-1 max-w-[82ch] font-mono text-[10.5px] leading-relaxed text-text-muted">{note}</p>
      ) : null}
    </header>
  );
}
