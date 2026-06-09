import { Section } from "@/components/layout/Section";
import { SectionLead } from "@/components/layout/SectionLead";
import { BookSummaryCards } from "./BookSummaryCards";
import { OptionsBookTable } from "./OptionsBookTable";
import { optionsBook } from "@/lib/data/book";
import { COPY } from "@/lib/constants";

function composition() {
  const longs = optionsBook.filter((o) => o.position === "long").length;
  const calls = optionsBook.filter((o) => o.optionType === "call").length;
  const mats = optionsBook.map((o) => o.maturityYears);
  const strikes = optionsBook.map((o) => o.strike);
  return [
    { l: "Legs", v: String(optionsBook.length) },
    { l: "Long / short", v: `${longs} / ${optionsBook.length - longs}` },
    { l: "Calls / puts", v: `${calls} / ${optionsBook.length - calls}` },
    { l: "Maturities", v: `${Math.min(...mats).toFixed(2)} to ${Math.max(...mats).toFixed(2)}y` },
    { l: "Strikes", v: `${Math.min(...strikes).toFixed(2)} to ${Math.max(...strikes).toFixed(2)}` },
  ];
}

export function OptionsBookSection() {
  const rows = composition();
  return (
    <Section id="book">
      <SectionLead
        index="02"
        kicker="Options Book"
        title="USD/MXN Options Book"
        lead={COPY.book}
      />
      <div className="mt-5">
        <BookSummaryCards />
      </div>
      <div className="mt-6 grid gap-x-8 gap-y-6 lg:grid-cols-[0.3fr_0.7fr]">
        <div className="min-w-0 lg:border-r lg:border-border-soft lg:pr-8">
          <p className="label mb-2.5">Composition</p>
          <dl className="divide-y divide-border-soft border-y border-border-soft">
            {rows.map((r) => (
              <div key={r.l} className="flex items-baseline justify-between gap-3 py-[7px]">
                <dt className="text-[11px] text-text-muted">{r.l}</dt>
                <dd className="tabular font-mono text-[12px] text-text-primary">{r.v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="min-w-0">
          <p className="label mb-2.5">Instruments</p>
          <OptionsBookTable />
        </div>
      </div>
    </Section>
  );
}
