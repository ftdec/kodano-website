/**
 * Homepage - Kodano Website
 * Stripe-level design with all premium components
 */

"use client";

import React from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { HeroSection } from "@/components/sections/hero-v2";
import { FeaturesSection } from "@/components/sections/features-v2";
import { BenefitsSection } from "@/components/sections/benefits-v2";
import { HowItWorksSection } from "@/components/sections/how-it-works-v2";
import { TestimonialsSection } from "@/components/sections/testimonials-v2";
import { CTASection } from "@/components/sections/cta-v2";
import { motion } from "framer-motion";

// ============================================================================
// HOMEPAGE COMPONENT
// ============================================================================

export default function Home() {
  // Custom testimonials for homepage
  const testimonials = [
    {
      quote: "A Kodano transformou completamente nossa operação de pagamentos. A taxa de aprovação aumentou 23% e o tempo de processamento caiu drasticamente.",
      author: {
        name: "Carlos Silva",
        role: "CEO",
        company: "TechStore Brasil",
      },
      rating: 5,
      highlight: "Taxa +23%",
      metrics: [
        { label: "Taxa Aprovação", value: "+23%" },
        { label: "Tempo Resposta", value: "-65%" },
      ],
    },
    {
      quote: "O suporte técnico é excepcional. Conseguimos integrar em apenas 2 dias e o dashboard é extremamente intuitivo.",
      author: {
        name: "Ana Costa",
        role: "CTO",
        company: "FinanceApp",
      },
      rating: 5,
      highlight: "Setup 2 dias",
    },
    {
      quote: "A melhor solução de pagamentos que já utilizamos. A API é moderna, bem documentada e extremamente confiável.",
      author: {
        name: "Pedro Oliveira",
        role: "Lead Developer",
        company: "E-commerce Plus",
      },
      rating: 5,
      highlight: "API Moderna",
    },
    {
      quote: "Reduzimos fraudes em 87% com o sistema antifraude da Kodano. ROI positivo desde o primeiro mês.",
      author: {
        name: "Maria Santos",
        role: "CFO",
        company: "MarketPlace XYZ",
      },
      rating: 5,
      highlight: "Fraude -87%",
      metrics: [
        { label: "Redução Fraude", value: "-87%" },
        { label: "ROI", value: "245%" },
      ],
    },
    {
      quote: "Dashboard em tempo real mudou o jogo para nós. Conseguimos tomar decisões baseadas em dados precisos.",
      author: {
        name: "João Mendes",
        role: "Product Manager",
        company: "SaaS Solutions",
      },
      rating: 5,
      highlight: "Real-time",
    },
    {
      quote: "Processamos mais de 100k transações por mês sem problemas. Uptime impecável e performance consistente.",
      author: {
        name: "Lucia Ferreira",
        role: "Operations Director",
        company: "Global Retail",
      },
      rating: 5,
      highlight: "100k/mês",
    },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <HeroSection
        title="Pagamentos inteligentes para empresas que exigem eficiência"
        subtitle="Plataforma de Orquestração de Pagamentos"
        description="Orquestração que aumenta aprovação, reduz custos e traz clareza operacional. Processe pagamentos com a infraestrutura mais avançada do mercado."
        primaryCta={{ label: "Começar Agora", href: "/cadastro" }}
        secondaryCta={{ label: "Ver Demonstração", href: "/demo" }}
        showDashboard={true}
        showMetrics={true}
      />

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <FeaturesSection
          title="Recursos Poderosos"
          subtitle="Tudo que você precisa"
          description="Plataforma completa de pagamentos com todas as ferramentas para escalar seu negócio."
          showComparison={false}
          showMetrics={true}
        />
      </motion.div>

      {/* Benefits Section */}
      <BenefitsSection
        title="Por que escolher Kodano?"
        subtitle="Benefícios exclusivos"
        description="Nossa plataforma oferece vantagens únicas que transformam a forma como você processa pagamentos."
        layout="bento"
        showStats={true}
      />

      {/* How It Works Section */}
      <HowItWorksSection
        title="Como Funciona"
        subtitle="Simples e poderoso"
        description="Integre e comece a processar pagamentos em 4 passos simples."
        layout="split"
        showDemo={true}
      />

      {/* Testimonials Section */}
      <TestimonialsSection
        title="O que nossos clientes dizem"
        subtitle="Depoimentos reais"
        description="Veja como empresas de todos os tamanhos estão transformando seus pagamentos com Kodano."
        testimonials={testimonials}
        layout="carousel"
        showStats={true}
      />

      {/* Final CTA Section */}
      <CTASection
        variant="split"
        title="Pronto para revolucionar seus pagamentos?"
        subtitle="Comece hoje mesmo"
        description="Junte-se a milhares de empresas que já transformaram suas operações de pagamento com Kodano."
        primaryCTA={{ label: "Começar Agora", href: "/cadastro" }}
        secondaryCTA={{ label: "Falar com Vendas", href: "/contato" }}
        background={true}
      />
    </MainLayout>
  );
}