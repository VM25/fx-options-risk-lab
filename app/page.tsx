import { PageShell } from "@/components/layout/PageShell";
import { TopNav } from "@/components/layout/TopNav";
import { HeroSection } from "@/components/hero/HeroSection";
import { OptionsBookSection } from "@/components/book/OptionsBookSection";
import { PricingGreeksSection } from "@/components/pricing/PricingGreeksSection";
import { StressTestingSection } from "@/components/stress/StressTestingSection";
import { HedgingLabSection } from "@/components/hedging/HedgingLabSection";
import { VarEsSection } from "@/components/risk/VarEsSection";
import { PnlAttributionSection } from "@/components/attribution/PnlAttributionSection";
import { ModelAssumptionsSection } from "@/components/assumptions/ModelAssumptionsSection";
import { ProjectFooter } from "@/components/footer/ProjectFooter";

export default function Home() {
  return (
    <PageShell>
      <TopNav />
      <main>
        <HeroSection />
        <OptionsBookSection />
        <PricingGreeksSection />
        <StressTestingSection />
        <HedgingLabSection />
        <VarEsSection />
        <PnlAttributionSection />
        <ModelAssumptionsSection />
      </main>
      <ProjectFooter />
    </PageShell>
  );
}
