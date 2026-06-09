import { DataTable, type Column } from "@/components/layout/DataTable";
import { optionsBook } from "@/lib/data/book";
import type { FXOption } from "@/lib/types";
import { formatUSD, formatFXRaw, formatPercent } from "@/lib/formatters";

function maturityLabel(years: number): string {
  return `${years.toFixed(2)}y`;
}

const columns: Column<FXOption>[] = [
  { key: "id", header: "ID", render: (o) => <span className="font-mono text-text-primary">{o.id}</span> },
  { key: "type", header: "Type", render: (o) => <span className="capitalize text-text-secondary">{o.optionType}</span> },
  {
    key: "position",
    header: "Pos",
    render: (o) =>
      o.position === "long" ? (
        <span className="font-mono text-[11px] text-accent-green">LONG</span>
      ) : (
        <span className="font-mono text-[11px] text-text-muted">SHORT</span>
      ),
  },
  { key: "notional", header: "Notional USD", align: "right", render: (o) => formatUSD(o.notionalUSD) },
  { key: "strike", header: "Strike", align: "right", render: (o) => formatFXRaw(o.strike) },
  { key: "maturity", header: "Maturity", align: "right", render: (o) => maturityLabel(o.maturityYears) },
  { key: "vol", header: "Implied vol", align: "right", render: (o) => formatPercent(o.impliedVol, 1) },
];

export function OptionsBookTable() {
  return <DataTable columns={columns} rows={optionsBook} rowKey={(o) => o.id} minWidth="min-w-[520px]" />;
}
