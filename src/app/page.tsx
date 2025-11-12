import { MainLayout } from "@/components/layout/main-layout";
import { HeroSection } from "@/components/sections/hero";
import { FeaturesSection } from "@/components/sections/features";
import { IntegrationsSection } from "@/components/sections/integrations";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { CTASection } from "@/components/sections/cta";

/**
 * PRD v2.0 - Kodano Home Page
 * "Infraestrutura invisível que move o comércio moderno"
 */
export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <FeaturesSection />
      <IntegrationsSection />
      <TestimonialsSection />
      <HowItWorksSection />
      <CTASection />
    </MainLayout>
  );
}
