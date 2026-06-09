import type { PnLAttribution } from "@/lib/types";
import { SignedValue } from "@/components/layout/SignedValue";
import { formatSignedMXN } from "@/lib/formatters";

const INTERPRETATION: Record<string, string> = {
  Delta: "First-order spot exposure",
  Gamma: "Nonlinear spot curvature",
  Vega: "Implied vol repricing",
  Theta: "Time decay over horizon",
  Residual: "Full reprice minus Greek terms",
};

export function AttributionTable({ attribution }: { attribution: PnLAttribution }) {
  const rows = [
    { component: "Delta", value: attribution.deltaContribution },
    { component: "Gamma", value: attribution.gammaContribution },
    { component: "Vega", value: attribution.vegaContribution },
    { component: "Theta", value: attribution.thetaContribution },
    { component: "Residual", value: attribution.residual },
  ];

  return (
    <table className="w-full text-[12px]">
      <tbody>
        {rows.map((r) => (
          <tr key={r.component} className="border-b border-border-soft">
            <td className="py-[7px] pr-3 font-medium text-text-primary">{r.component}</td>
            <td className="py-[7px] pr-3 text-right">
              <SignedValue value={r.value} format={formatSignedMXN} />
            </td>
            <td className="hidden py-[7px] text-[11px] text-text-muted sm:table-cell">{INTERPRETATION[r.component]}</td>
          </tr>
        ))}
        <tr className="border-t border-border">
          <td className="py-2.5 pr-3 font-semibold text-text-primary">Full reprice</td>
          <td className="py-2.5 pr-3 text-right">
            <SignedValue value={attribution.fullRepricingPnl} format={formatSignedMXN} className="font-semibold" />
          </td>
          <td className="hidden py-2.5 text-[11px] text-text-muted sm:table-cell">Exact revaluation</td>
        </tr>
      </tbody>
    </table>
  );
}
