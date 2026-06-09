export function SectionHeader({
  title,
  thesis,
  note,
}: {
  eyebrow?: string;
  title: string;
  thesis: string;
  note?: string;
}) {
  return (
    <div className="mb-5 border-t border-border pt-3">
      <h2 className="text-[18px] font-semibold leading-tight tracking-[-0.01em] text-text-primary sm:text-[21px]">
        {title}
      </h2>
      <p className="mt-2 max-w-[74ch] text-[12.5px] leading-relaxed text-text-secondary">
        {thesis}
      </p>
      {note ? (
        <p className="mt-1 max-w-[82ch] font-mono text-[10.5px] leading-relaxed text-text-muted">
          {note}
        </p>
      ) : null}
    </div>
  );
}
