/**
 * Preços Page - Kodano Website
 * Stripe-level pricing page with advanced animations
 */

"use client";

import React from "react";
import Link from "next/link";
import { MainLayout } from "@/components/layout/main-layout";
import { PricingCard } from "@/components/ui/card-v2";
import { CTASection } from "@/components/sections/cta-v2";
import { AnimatedSection, SectionContainer, SectionHeader } from "@/components/sections/section-wrapper";
import { motion } from "framer-motion";
import {
  Sparkles,
  TrendingUp,
  Zap,
  Building2,
  Users,
  CreditCard,
  ArrowRight,
} from "lucide-react";
import { easings, durations } from "@/lib/design-system/motion";
import { Button } from "@/components/ui/button-v2";

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function PrecosPage() {
  const plans = [
    {
      title: "Pay as You Go",
      description: "Pague apenas pelo que usar, sem mensalidades",
      price: {
        amount: "Sob consulta",
        period: "",
      },
      features: [
        "Sem mensalidade fixa",
        "Pague apenas pelo que usar",
        "Dashboard completo em tempo real",
        "API RESTful completa",
        "Suporte técnico por email",
        "Webhooks em tempo real",
        "Relatórios básicos",
      ],
      cta: {
        label: "Fale Conosco",
        href: "/fale-conosco",
      },
      popular: false,
    },
    {
      title: "Plano Fixo Mensal",
      description: "Mensalidade fixa com taxas reduzidas para alto volume",
      price: {
        amount: "Sob consulta",
        period: "",
      },
      features: [
        "Taxa reduzida por transação",
        "Processamento ilimitado",
        "Otimização inteligente com IA",
        "Antifraude avançado com ML",
        "Suporte prioritário 24/7",
        "Gerente de sucesso dedicado",
        "Relatórios customizados",
        "API privada e webhooks premium",
      ],
      cta: {
        label: "Fale Conosco",
        href: "/fale-conosco",
      },
      popular: false,
    },
  ];


  return (
    <MainLayout>
      {/* Hero Section */}
      <AnimatedSection animation="fadeInUp" className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: durations.normal }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1 text-sm font-medium text-accent"
            >
              <Sparkles className="h-4 w-4" />
              Preços transparentes e justos
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: durations.slow }}
              className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              Flexibilidade para acompanhar o{" "}
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                ritmo da sua empresa
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: durations.normal }}
              className="mt-6 text-lg text-muted-foreground"
            >
              Escolha o plano ideal para o seu momento.
              Sem surpresas, sem letras miúdas.
            </motion.p>
          </div>
        </div>
      </AnimatedSection>

      {/* Pricing Cards */}
      <SectionContainer spacing="xl">
        <div className="grid gap-8 max-w-5xl mx-auto lg:grid-cols-2 items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <PricingCard {...plan} />
            </motion.div>
          ))}
        </div>

        {/* Custom pricing note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 rounded-lg border bg-accent/5 p-6 text-center"
        >
          <div className="mb-2 flex items-center justify-center gap-2">
            <Building2 className="h-5 w-5 text-accent" />
            <span className="font-semibold">Precisa de algo especial?</span>
          </div>
          <p className="text-muted-foreground">
            Criamos planos personalizados para grandes volumes e necessidades específicas.
          </p>
          <Link href="/contato">
            <Button variant="outline" size="sm" className="mt-4">
              Falar com especialista
            </Button>
          </Link>
        </motion.div>

      </SectionContainer>

      {/* CTA Section */}
      <CTASection
        variant="simple"
        title="Pronto para começar?"
        description="Junte-se a milhares de empresas que já transformaram seus pagamentos"
        primaryCTA={{ label: "Fale Conosco", href: "/fale-conosco" }}
        background={true}
      />
    </MainLayout>
  );
}