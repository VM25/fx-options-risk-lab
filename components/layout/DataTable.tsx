import { cn } from "@/lib/utils";

export type Column<T> = {
  key: string;
  header: string;
  align?: "left" | "right" | "center";
  render: (row: T) => React.ReactNode;
  headerClassName?: string;
  cellClassName?: string;
};

/** Borderless institutional ledger. Hairline header rule, faint row rules. */
export function DataTable<T>({
  columns,
  rows,
  rowKey,
  className,
  minWidth = "min-w-[560px]",
}: {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T, index: number) => string;
  className?: string;
  minWidth?: string;
}) {
  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <table className={cn("w-full border-collapse text-[12px]", minWidth)}>
        <thead>
          <tr className="border-b border-border">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "label whitespace-nowrap py-1.5 pr-4 font-normal",
                  alignClass(col.align),
                  col.headerClassName,
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={rowKey(row, i)}
              className="group border-b border-border-soft transition-colors duration-100 last:border-0 hover:bg-panel-elevated/50"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={cn(
                    "whitespace-nowrap py-[7px] pr-4 text-text-secondary",
                    alignClass(col.align),
                    (col.align === "right" || col.align === "center") && "tabular font-mono",
                    col.cellClassName,
                  )}
                >
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function alignClass(align?: "left" | "right" | "center"): string {
  if (align === "right") return "text-right";
  if (align === "center") return "text-center";
  return "text-left";
}
