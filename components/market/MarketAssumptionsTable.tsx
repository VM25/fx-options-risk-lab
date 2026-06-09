import { marketData } from "@/lib/data/market";
import { formatFXRaw, formatPercent } from "@/lib/formatters";

const rows: { label: string; value: string }[] = [
  { label: "Spot USD/MXN", value: formatFXRaw(marketData.spot) },
  { label: "MXN rate (rd)", value: formatPercent(marketData.domesticRate) },
  { label: "USD rate (rf)", value: formatPercent(marketData.foreignRate) },
  { label: "ATM volatility", value: formatPercent(marketData.atmVolatility) },
  { label: "Domestic / foreign", value: `${marketData.domesticCurrency} / ${marketData.foreignCurrency}` },
  { label: "Valuation date", value: marketData.valuationDate ?? "n/a" },
];

/** Flat market-state ledger: key/value rows on faint rules, no panel. */
export function MarketAssumptionsTable() {
  return (
    <dl className="divide-y divide-border-soft border-y border-border-soft">
      {rows.map((r) => (
        <div key={r.label} className="flex items-baseline justify-between gap-4 py-[7px]">
          <dt className="text-[11px] text-text-muted">{r.label}</dt>
          <dd className="tabular font-mono text-[12px] font-medium text-text-primary">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}
