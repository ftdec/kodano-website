/**
 * Homepage - Kodano Website
 * Stripe-level design with all premium components
 */

"use client";

import React from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { HeroSection } from "@/components/sections/hero-v2";
import { BenefitsSection } from "@/components/sections/benefits-v2";
import { HowItWorksSection } from "@/components/sections/how-it-works-v2";
import { ProductsSection } from "@/components/sections/products-section";
import { CTASection } from "@/components/sections/cta-v2";

// ============================================================================
// HOMEPAGE COMPONENT
// ============================================================================

export default function Home() {

  return (
    <MainLayout>
      {/* Hero Section */}
      <HeroSection
        title="Pagamentos inteligentes para empresas modernas"
        subtitle="Subadquirente Digital com Tecnologia Avançada"
        description="Maximize aprovação, reduza custos e tenha controle total com APIs modernas e orquestração inteligente de funcionalidades."
        primaryCta={{ label: "Começar Agora", href: "/fale-conosco" }}
        secondaryCta={{ label: "Ver Demonstração", href: "/como-funciona" }}
        showVisual={true}
        showMetrics={true}
      />

      {/* Benefits Section - 4 cards as per PRD */}
      <BenefitsSection
        title="Benefícios Kodano"
        subtitle="Por que escolher nossa plataforma"
        description="Vantagens exclusivas que transformam a gestão de pagamentos da sua empresa."
        layout="grid"
        showStats={false}
      />

      {/* How It Works Section - 4 steps as per PRD */}
      <HowItWorksSection
        title="Como Funciona"
        subtitle="Simples e eficiente"
        description="Integração rápida e processamento inteligente em 4 passos."
        layout="timeline"
        showDemo={false}
      />

      {/* Products Section - 4 items as per PRD */}
      <ProductsSection
        title="Nossos Produtos"
        subtitle="Plataforma completa"
        description="Ferramentas poderosas para processar pagamentos com máxima eficiência."
      />

      {/* Final CTA Section */}
      <CTASection
        variant="simple"
        title="Pronto para revolucionar seus pagamentos?"
        subtitle="Comece hoje mesmo"
        description="Entre em contato e descubra como podemos transformar sua operação de pagamentos."
        primaryCTA={{ label: "Fale Conosco", href: "/fale-conosco" }}
        secondaryCTA={{ label: "Conhecer Produtos", href: "/produtos" }}
        background={true}
      />
    </MainLayout>
  );
}