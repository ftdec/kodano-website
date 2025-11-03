import { MainLayout } from "@/components/layout/main-layout";
import { HeroSection } from "@/components/sections/hero";
import { LogoWall } from "@/components/sections/logo-wall";
import { ThreePillarsSection } from "@/components/sections/three-pillars";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { ProductsModalSection } from "@/components/sections/products-modal";
import { ComparisonSection } from "@/components/sections/comparison";
import { FeaturesSection } from "@/components/sections/features";
import { StatsSection } from "@/components/sections/stats";
import { CTASection } from "@/components/sections/cta";

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <LogoWall />
      <ThreePillarsSection />
      <HowItWorksSection />
      <ProductsModalSection />
      <ComparisonSection />
      <FeaturesSection />
      <StatsSection />
      <CTASection />
    </MainLayout>
  );
}
