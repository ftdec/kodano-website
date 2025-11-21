/**
 * Produtos Page - Kodano Website
 * Stripe-level product showcase
 */

"use client";

import React from "react";
import Link from "next/link";
import { MainLayout } from "@/components/layout/main-layout";
import { FeaturesSection } from "@/components/sections/features-v2";
import { BenefitsSection } from "@/components/sections/benefits-v2";
import { CTASection } from "@/components/sections/cta-v2";
import { AnimatedSection, SectionContainer, SectionHeader } from "@/components/sections/section-wrapper";
import { motion, useInView } from "framer-motion";
import {
  Zap,
  Shield,
  BarChart3,
  Globe,
  CreditCard,
  Lock,
  CheckCircle,
  ArrowRight,
  Layers,
  RefreshCw,
  Activity
} from "lucide-react";
import { easings, durations } from "@/lib/design-system/motion";
import { Button } from "@/components/ui/button-v2";
import { useRef } from "react";

// ============================================================================
// PRODUCT DETAIL CARD
// ============================================================================

interface ProductDetailCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  metrics?: { label: string; value: string }[];
  index: number;
}

function ProductDetailCard({
  icon,
  title,
  description,
  features,
  metrics,
  index,
}: ProductDetailCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.15,
        duration: durations.slow,
        ease: easings.emphasized,
      }}
      className="relative"
    >
      <motion.div
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ duration: durations.normal }}
        className="group h-full overflow-hidden rounded-xl border bg-card p-8 transition-all hover:shadow-xl"
      >
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <motion.div
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-accent/20 to-primary/10"
          >
            {icon}
          </motion.div>
          {index === 0 && (
            <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600">
              Mais Popular
            </span>
          )}
        </div>

        {/* Content */}
        <h3 className="mb-3 text-2xl font-bold">{title}</h3>
        <p className="mb-6 text-muted-foreground">{description}</p>

        {/* Features */}
        <div className="mb-6 space-y-3">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.15 + 0.1 + i * 0.05 }}
              className="flex items-center gap-3"
            >
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm">{feature}</span>
            </motion.div>
          ))}
        </div>

        {/* Metrics */}
        {metrics && (
          <div className="grid grid-cols-2 gap-4 rounded-lg bg-accent/5 p-4">
            {metrics.map((metric, i) => (
              <div key={i}>
                <div className="text-2xl font-bold text-accent">{metric.value}</div>
                <div className="text-xs text-muted-foreground">{metric.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          className="mt-6 flex items-center gap-2 text-accent"
          whileHover={{ x: 5 }}
        >
          <span className="font-medium">Saiba mais</span>
          <ArrowRight className="h-4 w-4" />
        </motion.div>

        {/* Hover gradient */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-accent to-primary"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: durations.normal }}
          style={{ originX: 0 }}
        />
      </motion.div>
    </motion.div>
  );
}

// ============================================================================
// INTEGRATION SHOWCASE
// ============================================================================

function IntegrationShowcase() {
  const integrations = [
    { name: "Stripe", logo: "💳" },
    { name: "PayPal", logo: "💰" },
    { name: "PagSeguro", logo: "🏦" },
    { name: "Mercado Pago", logo: "🛒" },
    { name: "Stone", logo: "💎" },
    { name: "Cielo", logo: "☁️" },
    { name: "Rede", logo: "🌐" },
    { name: "GetNet", logo: "🔄" },
  ];

  return (
    <div className="relative rounded-2xl bg-gradient-to-br from-accent/5 to-primary/5 p-12">
      <div className="mb-8 text-center">
        <h3 className="mb-2 text-2xl font-bold">Integração com os Principais Players</h3>
        <p className="text-muted-foreground">
          Conecte-se aos principais processadores e maximize suas aprovações
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4 sm:grid-cols-8">
        {integrations.map((integration, index) => (
          <motion.div
            key={integration.name}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.05,
              type: "spring",
              stiffness: 300,
            }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="flex aspect-square items-center justify-center rounded-lg border bg-card/50 p-4 backdrop-blur-sm"
          >
            <div className="text-center">
              <div className="mb-1 text-2xl">{integration.logo}</div>
              <div className="text-xs text-muted-foreground">{integration.name}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <Button variant="outline" size="sm">
          Ver todas as integrações
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function ProdutosPage() {
  const products = [
    {
      icon: <Layers className="h-7 w-7 text-accent" />,
      title: "Orquestração Inteligente",
      description: "Roteamento automático que escolhe o melhor caminho para cada transação, maximizando aprovações e reduzindo custos.",
      features: [
        "Otimização por performance em tempo real",
        "Retry automático inteligente",
        "Machine Learning para otimização",
        "Split de pagamentos nativo",
      ],
      metrics: [
        { label: "Aumento aprovação", value: "+23%" },
        { label: "Redução custos", value: "-15%" },
      ],
    },
    {
      icon: <CreditCard className="h-7 w-7 text-accent" />,
      title: "Checkout Otimizado",
      description: "Experiência de pagamento fluida e conversora, com recuperação automática de vendas.",
      features: [
        "One-click checkout",
        "Tokenização segura",
        "Recuperação de carrinho",
        "Multi-idioma e multi-moeda",
      ],
      metrics: [
        { label: "Conversão", value: "+18%" },
        { label: "Tempo checkout", value: "-40%" },
      ],
    },
    {
      icon: <Shield className="h-7 w-7 text-accent" />,
      title: "Antifraude Avançado",
      description: "Proteção em tempo real com inteligência artificial, reduzindo fraudes sem impactar conversões legítimas.",
      features: [
        "Análise comportamental em tempo real",
        "Score de risco customizável",
        "Regras personalizadas",
        "Whitelist/Blacklist automático",
      ],
      metrics: [
        { label: "Redução fraude", value: "-87%" },
        { label: "Falsos positivos", value: "-65%" },
      ],
    },
    {
      icon: <BarChart3 className="h-7 w-7 text-accent" />,
      title: "Dashboard Unificado",
      description: "Visão completa de todas as operações em tempo real, com insights acionáveis para otimização.",
      features: [
        "Métricas em tempo real",
        "Relatórios customizáveis",
        "Alertas inteligentes",
        "API de dados completa",
      ],
      metrics: [
        { label: "Dados em", value: "<100ms" },
        { label: "Uptime", value: "99.99%" },
      ],
    },
  ];

  const additionalFeatures = [
    {
      icon: <RefreshCw className="h-6 w-6 text-accent" />,
      title: "Recorrência Inteligente",
      description: "Gestão completa de assinaturas e cobranças recorrentes com retry automático.",
      badge: "Novo",
      highlight: false,
    },
    {
      icon: <Activity className="h-6 w-6 text-accent" />,
      title: "Webhooks em Tempo Real",
      description: "Notificações instantâneas de todos os eventos importantes da sua operação.",
      highlight: false,
    },
    {
      icon: <Lock className="h-6 w-6 text-accent" />,
      title: "Tokenização PCI DSS",
      description: "Armazene dados de cartão com segurança máxima e conformidade total.",
      highlight: false,
    },
    {
      icon: <Globe className="h-6 w-6 text-accent" />,
      title: "Processamento Global",
      description: "Processe pagamentos em diferentes países e moedas com suporte completo.",
      badge: "Premium",
      highlight: true,
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
              Produtos & Soluções
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: durations.slow }}
              className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              Soluções pensadas para operações que{" "}
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                exigem desempenho
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: durations.normal }}
              className="mt-6 text-lg text-muted-foreground"
            >
              Tecnologia de ponta para simplificar e potencializar seus pagamentos.
              Tudo que você precisa em uma única plataforma.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center"
            >
              <Link href="/demo">
                <Button size="lg" variant="kodano">
                  Ver Demonstração
                  <Zap className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/documentacao">
                <Button size="lg" variant="outline">
                  Documentação Técnica
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Main Products Grid */}
      <SectionContainer spacing="xl">
        <SectionHeader
          badge="Principais Produtos"
          title="Tudo que você precisa para processar pagamentos"
          description="Soluções completas e integradas para maximizar suas conversões"
          centered
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {products.map((product, index) => (
            <ProductDetailCard key={index} {...product} index={index} />
          ))}
        </div>
      </SectionContainer>

      {/* Integration Showcase */}
      <SectionContainer spacing="lg" background="muted">
        <IntegrationShowcase />
      </SectionContainer>

      {/* Additional Features */}
      <FeaturesSection
        title="Recursos Adicionais"
        subtitle="Mais poder para sua operação"
        description="Funcionalidades avançadas que fazem a diferença no dia a dia"
        features={additionalFeatures}
        showComparison={true}
        showMetrics={false}
      />

      {/* Benefits */}
      <BenefitsSection
        title="Por que nossos produtos são diferentes?"
        subtitle="Vantagens exclusivas"
        description="Tecnologia e expertise combinadas para entregar resultados excepcionais"
        layout="grid"
        showStats={false}
      />

      {/* CTA Section */}
      <CTASection
        variant="form"
        title="Quer conhecer nossos produtos em detalhes?"
        description="Cadastre-se para receber uma demonstração personalizada"
        background={true}
      />
    </MainLayout>
  );
}