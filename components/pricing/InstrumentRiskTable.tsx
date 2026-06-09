import { DataTable, type Column } from "@/components/layout/DataTable";
import { SignedValue } from "@/components/layout/SignedValue";
import { pricingResults, greeksResults } from "@/lib/data/book";
import { formatFXRaw, formatNumber } from "@/lib/formatters";

type Row = {
  id: string;
  optionType: "call" | "put";
  position: "long" | "short";
  pricePerUsd: number;
  marketValueMXN: number;
  signedMarketValueMXN: number;
  signedDelta: number;
  signedGamma: number;
  signedVegaPerVolPoint: number;
  signedThetaPerDay: number;
};

const greekById = new Map(greeksResults.map((g) => [g.id, g]));

const rows: Row[] = pricingResults.map((p) => {
  const g = greekById.get(p.id)!;
  return {
    id: p.id,
    optionType: p.optionType,
    position: p.position,
    pricePerUsd: p.pricePerUsd,
    marketValueMXN: p.marketValueMXN,
    signedMarketValueMXN: p.signedMarketValueMXN,
    signedDelta: g.signedDelta,
    signedGamma: g.signedGamma,
    signedVegaPerVolPoint: g.signedVegaPerVolPoint,
    signedThetaPerDay: g.signedThetaPerDay,
  };
});

const signed = (v: number) => `${v > 0 ? "+" : v < 0 ? "-" : ""}${formatNumber(Math.abs(v))}`;

const columns: Column<Row>[] = [
  { key: "id", header: "ID", render: (r) => <span className="font-mono text-text-primary">{r.id}</span> },
  { key: "type", header: "Type", render: (r) => <span className="capitalize text-text-secondary">{r.optionType}</span> },
  {
    key: "pos",
    header: "Pos",
    render: (r) =>
      r.position === "long" ? (
        <span className="font-mono text-[11px] text-accent-green">LONG</span>
      ) : (
        <span className="font-mono text-[11px] text-text-muted">SHORT</span>
      ),
  },
  { key: "px", header: "Px / USD", align: "right", render: (r) => formatFXRaw(r.pricePerUsd) },
  { key: "mv", header: "Mkt Val", align: "right", render: (r) => formatNumber(r.marketValueMXN) },
  {
    key: "smv",
    header: "Signed MV",
    align: "right",
    render: (r) => <SignedValue value={r.signedMarketValueMXN} format={signed} />,
  },
  { key: "delta", header: "Δ signed", align: "right", render: (r) => <SignedValue value={r.signedDelta} format={signed} /> },
  { key: "gamma", header: "Γ signed", align: "right", render: (r) => <SignedValue value={r.signedGamma} format={signed} /> },
  { key: "vega", header: "Vega/pt", align: "right", render: (r) => <SignedValue value={r.signedVegaPerVolPoint} format={signed} /> },
  { key: "theta", header: "Θ/day", align: "right", render: (r) => <SignedValue value={r.signedThetaPerDay} format={signed} /> },
];

export function InstrumentRiskTable() {
  return <DataTable columns={columns} rows={rows} rowKey={(r) => r.id} minWidth="min-w-[720px]" />;
}
