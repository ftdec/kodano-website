/**
 * Clientes Page - Kodano Website
 * Client success stories with Stripe-level animations
 */

"use client";

import React from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { TestimonialsSection } from "@/components/sections/testimonials-v2";
import { CTASection } from "@/components/sections/cta-v2";
import { AnimatedSection, SectionContainer, SectionHeader } from "@/components/sections/section-wrapper";
import { motion } from "framer-motion";
import {
  Quote,
  TrendingUp,
  Users,
  DollarSign,
  ArrowRight,
  CheckCircle,
  BarChart3,
  Shield,
  Zap,
  Star,
  Award,
  Target,
} from "lucide-react";
import { easings, durations } from "@/lib/design-system/motion";
import { Button } from "@/components/ui/button-v2";
import { Badge } from "@/components/ui/badge";

// ============================================================================
// CASE STUDY CARD COMPONENT
// ============================================================================

interface CaseStudyCardProps {
  company: string;
  industry: string;
  logo?: string;
  challenge: string;
  solution: string;
  results: string[];
  metrics: {
    icon: React.ReactNode;
    value: string;
    label: string;
  };
  index: number;
}

function CaseStudyCard({
  company,
  industry,
  logo,
  challenge,
  solution,
  results,
  metrics,
  index,
}: CaseStudyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.15,
        duration: durations.slow,
        ease: easings.emphasized,
      }}
      className="group"
    >
      <motion.div
        whileHover={{ scale: 1.01, y: -5 }}
        transition={{ duration: durations.normal }}
        className="h-full overflow-hidden rounded-xl border bg-card transition-all hover:shadow-xl"
      >
        {/* Header */}
        <div className="relative border-b bg-gradient-to-br from-accent/5 to-primary/5 p-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <h3 className="text-2xl font-bold">{company}</h3>
                <Badge variant="secondary">{industry}</Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Award className="h-4 w-4" />
                Case de Sucesso
              </div>
            </div>
            <motion.div
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="flex h-16 w-16 items-center justify-center rounded-lg bg-card shadow-md"
            >
              <div className="text-3xl">{logo || "🚀"}</div>
            </motion.div>
          </div>

          {/* Metric highlight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.2 }}
            className="mt-6 flex items-center gap-3 rounded-lg bg-card p-4"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
              {metrics.icon}
            </div>
            <div>
              <div className="text-2xl font-bold">{metrics.value}</div>
              <div className="text-sm text-muted-foreground">{metrics.label}</div>
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Challenge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 + 0.3 }}
            >
              <div className="mb-3 flex items-center gap-2">
                <Target className="h-4 w-4 text-orange-500" />
                <h4 className="text-sm font-semibold uppercase tracking-wide">Desafio</h4>
              </div>
              <p className="text-sm text-muted-foreground">{challenge}</p>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 + 0.4 }}
            >
              <div className="mb-3 flex items-center gap-2">
                <Zap className="h-4 w-4 text-blue-500" />
                <h4 className="text-sm font-semibold uppercase tracking-wide">Solução</h4>
              </div>
              <p className="text-sm text-muted-foreground">{solution}</p>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 + 0.5 }}
            >
              <div className="mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <h4 className="text-sm font-semibold uppercase tracking-wide">Resultados</h4>
              </div>
              <ul className="space-y-2">
                {results.map((result, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.6 + idx * 0.05 }}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle className="mt-0.5 h-3 w-3 text-green-500" />
                    {result}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.7 }}
            className="mt-6 flex items-center justify-between border-t pt-6"
          >
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="h-4 w-4 fill-yellow-400 text-yellow-400"
                />
              ))}
              <span className="ml-2 text-sm text-muted-foreground">5.0</span>
            </div>
            <Button variant="ghost" size="sm">
              Ver história completa
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============================================================================
// TRUST BADGES COMPONENT
// ============================================================================

function TrustBadges() {
  const badges = [
    { icon: <Shield className="h-6 w-6" />, label: "PCI DSS Level 1", value: "Certificado" },
    { icon: <Users className="h-6 w-6" />, label: "Clientes Ativos", value: "5,000+" },
    { icon: <TrendingUp className="h-6 w-6" />, label: "Crescimento Anual", value: "300%" },
    { icon: <DollarSign className="h-6 w-6" />, label: "Volume Processado", value: "Alto volume" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {badges.map((badge, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="rounded-lg border bg-card p-6 text-center"
        >
          <motion.div
            whileHover={{ rotate: 5 }}
            className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent"
          >
            {badge.icon}
          </motion.div>
          <div className="text-2xl font-bold">{badge.value}</div>
          <div className="text-xs text-muted-foreground">{badge.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function ClientesPage() {
  const testimonials = [
    {
      quote: "A Kodano revolucionou nossa operação de pagamentos. Reduzimos em 60% o tempo de implementação e os custos caíram 40%.",
      author: {
        name: "Maria Silva",
        role: "CTO",
        company: "TechFlow SaaS",
      },
      rating: 5,
      highlight: "Redução 60%",
      metrics: [
        { label: "Tempo Implementação", value: "-60%" },
        { label: "Redução Custos", value: "-40%" },
      ],
    },
    {
      quote: "Suporte excepcional e documentação impecável. Nossa equipe integrou tudo em menos de uma semana.",
      author: {
        name: "João Santos",
        role: "Head of Engineering",
        company: "MarketHub",
      },
      rating: 5,
      highlight: "Setup 1 semana",
    },
    {
      quote: "A proteção contra fraudes do Kodano nos economizou milhares de reais. O ROI foi imediato.",
      author: {
        name: "Ana Costa",
        role: "CEO",
        company: "HealthPlus",
      },
      rating: 5,
      highlight: "ROI Imediato",
      metrics: [
        { label: "Economia", value: "Significativa" },
        { label: "ROI", value: "Alto" },
      ],
    },
    {
      quote: "Finalmente um gateway que pensa como desenvolvedor. A API é perfeita e os SDKs funcionam perfeitamente.",
      author: {
        name: "Pedro Oliveira",
        role: "Tech Lead",
        company: "EduTech Brasil",
      },
      rating: 5,
      highlight: "Dev-friendly",
    },
    {
      quote: "O split de pagamentos do Kodano transformou nosso marketplace. Gerenciar sellers nunca foi tão fácil.",
      author: {
        name: "Carla Mendes",
        role: "Product Manager",
        company: "ShopConnect",
      },
      rating: 5,
      highlight: "Split perfeito",
    },
    {
      quote: "Alta disponibilidade não é marketing, é realidade. Em 2 anos, nunca tivemos problemas de indisponibilidade.",
      author: {
        name: "Roberto Lima",
        role: "CFO",
        company: "PayFlow B2B",
      },
      rating: 5,
      highlight: "Alta disponibilidade",
    },
  ];

  const caseStudies = [
    {
      company: "TechFlow SaaS",
      industry: "SaaS",
      logo: "💻",
      challenge: "Gerenciar 10.000+ assinaturas recorrentes com múltiplos planos",
      solution: "Implementação do Kodano Billing com automação completa",
      results: [
        "+35% na taxa de conversão",
        "-60% de chargebacks",
        "50h/mês economizadas",
      ],
      metrics: {
        icon: <TrendingUp className="h-6 w-6" />,
        value: "Alto volume",
        label: "MRR processado",
      },
    },
    {
      company: "MarketHub",
      industry: "Marketplace",
      logo: "🛍️",
      challenge: "Split complexo entre múltiplos sellers com diferentes comissões",
      solution: "Kodano Connect com regras customizadas de split",
      results: [
        "Onboarding em 2 horas",
        "100% automação",
        "Compliance garantido",
      ],
      metrics: {
        icon: <Users className="h-6 w-6" />,
        value: "5000+",
        label: "Sellers ativos",
      },
    },
    {
      company: "HealthPlus",
      industry: "HealthTech",
      logo: "🏥",
      challenge: "Reduzir fraudes sem afetar pacientes legítimos",
      solution: "Implementação do Kodano Shield com ML adaptativo",
      results: [
        "-85% fraudes",
        "0% falsos positivos",
        "Economia significativa",
      ],
      metrics: {
        icon: <Shield className="h-6 w-6" />,
        value: "Significativa",
        label: "Economia",
      },
    },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <AnimatedSection animation="fadeInUp" className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: durations.normal }}
              className="inline-block rounded-full bg-accent/10 px-4 py-1 text-sm font-medium text-accent"
            >
              Casos de Sucesso
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: durations.slow }}
              className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              Empresas que{" "}
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                confiam
              </span>{" "}
              na Kodano
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: durations.normal }}
              className="mt-6 text-lg text-muted-foreground"
            >
              Milhares de empresas processam bilhões em transações todos os dias
              com nossa plataforma. Veja como elas transformaram seus pagamentos.
            </motion.p>
          </div>
        </div>
      </AnimatedSection>

      {/* Trust Badges */}
      <SectionContainer spacing="md">
        <TrustBadges />
      </SectionContainer>

      {/* Case Studies */}
      <SectionContainer spacing="xl">
        <SectionHeader
          badge="Histórias de Sucesso"
          title="Cases que inspiram"
          description="Veja como empresas reais resolveram desafios complexos com Kodano"
          centered
        />

        <div className="mt-16 space-y-12">
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={index} {...study} index={index} />
          ))}
        </div>
      </SectionContainer>

      {/* Testimonials */}
      <TestimonialsSection
        title="Depoimentos reais"
        subtitle="O que dizem sobre nós"
        description="Feedback genuíno de empresas que transformaram seus pagamentos"
        testimonials={testimonials}
        layout="grid"
        showStats={false}
      />

      {/* CTA Section */}
      <CTASection
        variant="split"
        title="Seja o próximo case de sucesso"
        subtitle="Transforme seus pagamentos"
        description="Junte-se a milhares de empresas que já revolucionaram suas operações de pagamento"
        primaryCTA={{ label: "Falar com Vendas", href: "/contato" }}
        background={true}
      />
    </MainLayout>
  );
}