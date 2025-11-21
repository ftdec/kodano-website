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
  Check,
  X,
  Sparkles,
  Calculator,
  Building2,
  Info,
} from "lucide-react";
import { durations } from "@/lib/design-system/motion";
import { Button } from "@/components/ui/button-v2";

// ============================================================================
// FEATURE COMPARISON TABLE
// ============================================================================

function FeatureComparisonTable() {
  const features = [
    {
      category: "Básico",
      items: [
        { name: "Processamento de pagamentos", payAsYouGo: true, fixed: true },
        { name: "Dashboard em tempo real", payAsYouGo: true, fixed: true },
        { name: "API RESTful", payAsYouGo: true, fixed: true },
        { name: "Webhooks", payAsYouGo: true, fixed: true },
        { name: "Suporte por email", payAsYouGo: true, fixed: true },
      ],
    },
    {
      category: "Avançado",
      items: [
        { name: "Processamento ilimitado", payAsYouGo: false, fixed: true },
        { name: "Otimização inteligente", payAsYouGo: false, fixed: true },
        { name: "Antifraude com ML", payAsYouGo: false, fixed: true },
        { name: "Recuperação de vendas", payAsYouGo: false, fixed: true },
        { name: "Suporte prioritário 24/7", payAsYouGo: false, fixed: true },
      ],
    },
    {
      category: "Premium",
      items: [
        { name: "Taxa reduzida (1,9%)", payAsYouGo: false, fixed: true },
        { name: "Gerente de sucesso dedicado", payAsYouGo: false, fixed: true },
        { name: "Relatórios customizados", payAsYouGo: false, fixed: true },
        { name: "API privada", payAsYouGo: false, fixed: true },
        { name: "Treinamento personalizado", payAsYouGo: false, fixed: true },
      ],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: durations.slow }}
      className="mt-20 overflow-hidden rounded-xl border bg-card"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-6 py-4 text-left text-sm font-semibold">Recursos</th>
              <th className="px-6 py-4 text-center text-sm font-semibold">
                <span className="text-muted-foreground">Pay as You Go</span>
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold">
                <span className="text-accent">Plano Fixo</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {features.map((category, categoryIndex) => (
              <React.Fragment key={categoryIndex}>
                <tr className="border-b bg-accent/5">
                  <td colSpan={4} className="px-6 py-3 text-sm font-medium">
                    {category.category}
                  </td>
                </tr>
                {category.items.map((item, itemIndex) => (
                  <motion.tr
                    key={itemIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: itemIndex * 0.05 }}
                    className="border-b last:border-0"
                  >
                    <td className="px-6 py-4 text-sm">{item.name}</td>
                    <td className="px-6 py-4 text-center">
                      {item.payAsYouGo ? (
                        <Check className="mx-auto h-5 w-5 text-green-500" />
                      ) : (
                        <X className="mx-auto h-5 w-5 text-gray-300" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {item.fixed ? (
                        <Check className="mx-auto h-5 w-5 text-green-500" />
                      ) : (
                        <X className="mx-auto h-5 w-5 text-gray-300" />
                      )}
                    </td>
                  </motion.tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

// ============================================================================
// VOLUME CALCULATOR
// ============================================================================

function VolumeCalculator() {
  const [volume, setVolume] = React.useState(50000);
  const [plan, setPlan] = React.useState<"payAsYouGo" | "fixed">("payAsYouGo");

  const calculateFees = () => {
    if (plan === "payAsYouGo") {
      return {
        monthly: 0,
        perTransaction: volume * 0.029,
        total: volume * 0.029,
      };
    } else {
      return {
        monthly: 1990,
        perTransaction: volume * 0.019,
        total: 1990 + volume * 0.019,
      };
    }
  };

  const fees = calculateFees();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: durations.slow }}
      className="mx-auto max-w-2xl rounded-xl border bg-card p-8"
    >
      <div className="mb-6 flex items-center gap-3">
        <Calculator className="h-6 w-6 text-accent" />
        <h3 className="text-xl font-bold">Calcule suas taxas</h3>
      </div>

      <div className="space-y-6">
        {/* Volume slider */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Volume mensal: R$ {volume.toLocaleString("pt-BR")}
          </label>
          <input
            type="range"
            min="10000"
            max="1000000"
            step="10000"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full"
          />
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>R$ 10k</span>
            <span>R$ 1M</span>
          </div>
        </div>

        {/* Plan selector */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setPlan("payAsYouGo")}
            className={`rounded-lg border p-4 transition-all ${
              plan === "payAsYouGo"
                ? "border-accent bg-accent/10"
                : "border-border hover:border-accent/50"
            }`}
          >
            <div className="text-sm font-medium">Pay as You Go</div>
            <div className="text-xs text-muted-foreground">Sem mensalidade</div>
          </button>
          <button
            onClick={() => setPlan("fixed")}
            className={`rounded-lg border p-4 transition-all ${
              plan === "fixed"
                ? "border-accent bg-accent/10"
                : "border-border hover:border-accent/50"
            }`}
          >
            <div className="text-sm font-medium">Plano Fixo</div>
            <div className="text-xs text-muted-foreground">Taxa menor</div>
          </button>
        </div>

        {/* Results */}
        <div className="rounded-lg bg-accent/5 p-6">
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Mensalidade</div>
              <div className="text-xl font-bold">
                R$ {fees.monthly.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Taxa por transação</div>
              <div className="text-xl font-bold">
                R$ {fees.perTransaction.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>
          <div className="border-t pt-4">
            <div className="text-sm text-muted-foreground">Total estimado/mês</div>
            <div className="text-2xl font-bold text-accent">
              R$ {fees.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function PrecosPage() {
  const plans = [
    {
      title: "Pay as You Go",
      description: "Pague apenas pelo que usar, sem mensalidades",
      price: {
        amount: "2,9%",
        period: "por transação",
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
        amount: "R$ 1.990",
        period: "mês + 1,9% por transação",
      },
      features: [
        "Taxa reduzida por transação (1,9%)",
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
      popular: true,
    },
  ];

  const faqs = [
    {
      question: "Posso mudar de plano a qualquer momento?",
      answer: "Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As mudanças entram em vigor no próximo ciclo de cobrança.",
    },
    {
      question: "Existe período mínimo de contrato?",
      answer: "Não. Todos os nossos planos são mensais e podem ser cancelados a qualquer momento, sem multas.",
    },
    {
      question: "Como funciona o teste grátis?",
      answer: "Você tem 30 dias para testar o plano Growth com todas as funcionalidades. Não cobramos nada durante o período de teste.",
    },
    {
      question: "Vocês cobram por transação além da mensalidade?",
      answer: "Depende do plano. No Pay as You Go cobramos apenas por transação. No plano fixo, há uma mensalidade + taxa reduzida por transação.",
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
        <div className="grid gap-8 max-w-5xl mx-auto lg:grid-cols-2">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
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

        {/* Feature Comparison */}
        <FeatureComparisonTable />
      </SectionContainer>

      {/* Volume Calculator */}
      <SectionContainer spacing="lg" background="muted">
        <SectionHeader
          title="Simule suas economias"
          description="Veja quanto você pode economizar com nossos planos"
          centered
        />
        <VolumeCalculator />
      </SectionContainer>

      {/* FAQs */}
      <SectionContainer spacing="lg">
        <SectionHeader
          title="Perguntas frequentes"
          description="Tudo que você precisa saber sobre nossos planos"
          centered
        />

        <div className="mx-auto max-w-3xl space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-lg border bg-card p-6"
            >
              <h3 className="mb-2 flex items-start gap-2 font-semibold">
                <Info className="h-5 w-5 text-accent" />
                {faq.question}
              </h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </SectionContainer>

      {/* CTA Section */}
      <CTASection
        variant="simple"
        title="Pronto para começar?"
        description="Junte-se a milhares de empresas que já transformaram seus pagamentos"
        primaryCTA={{ label: "Começar Teste Grátis", href: "/cadastro" }}
        secondaryCTA={{ label: "Ver Demonstração", href: "/demo" }}
        background={true}
      />
    </MainLayout>
  );
}