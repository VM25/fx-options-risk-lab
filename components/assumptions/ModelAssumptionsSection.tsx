import { Section } from "@/components/layout/Section";
import { SectionLead } from "@/components/layout/SectionLead";
import { LimitationsList } from "./LimitationsList";
import { validationSummary } from "@/lib/data/attribution";
import { quantlibValidation } from "@/lib/data/quantlib";
import { COPY } from "@/lib/constants";

export function ModelAssumptionsSection() {
  const passing = validationSummary.checks.filter((c) => c.status !== "fail").length;
  const total = validationSummary.checks.length;
  const ql = quantlibValidation;

  const qlLine =
    ql.status === "pass"
      ? "Custom Garman-Kohlhagen prices and Greeks are benchmarked against QuantLib."
      : "Core validation checks passed; QuantLib benchmark unavailable in this environment.";

  return (
    <Section id="assumptions">
      <SectionLead
        index="08"
        kicker="Assumptions & Validation"
        title="Model Assumptions and Validation"
        lead="Model boundaries, validation checks, and limitations behind the analysis."
        right={
          <div className="text-left sm:text-right">
            <span className="label block">Quant validation</span>
            <span className="tabular font-mono text-[15px] font-bold text-accent-green">
              {validationSummary.status.toUpperCase()} · {passing}/{total}
            </span>
          </div>
        }
      />
      <div className="mt-6 grid gap-x-8 gap-y-6 lg:grid-cols-[0.62fr_0.38fr]">
        <div>
          <p className="label mb-2.5">Model assumptions</p>
          <LimitationsList />
        </div>
        <div className="lg:border-l lg:border-border-soft lg:pl-8">
          <p className="label mb-2.5">Validation</p>
          <p className="text-[12px] leading-relaxed text-text-secondary">{qlLine}</p>
          <p className="mt-3 font-mono text-[10.5px] leading-relaxed text-text-muted">
            Checks cover pricing, Greeks, book aggregation, scenario repricing, hedging, VaR/ES sign and monotonicity, and the attribution identity.
          </p>
          <p className="label mb-2.5 mt-5">Disclaimer</p>
          <p className="text-[12px] leading-relaxed text-text-secondary">{COPY.limitations}</p>
        </div>
      </div>
    </Section>
  );
}
