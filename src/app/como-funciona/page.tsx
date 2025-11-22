/**
 * Como Funciona Page - Kodano Website
 * Detailed how-it-works page with Stripe-level animations
 */

"use client";

import React from "react";
import Link from "next/link";
import { MainLayout } from "@/components/layout/main-layout";
import { HowItWorksSection } from "@/components/sections/how-it-works-v2";
import { BenefitsSection } from "@/components/sections/benefits-v2";
import { CTASection } from "@/components/sections/cta-v2";
import { AnimatedSection, SectionContainer, SectionHeader } from "@/components/sections/section-wrapper";
import { motion } from "framer-motion";
import {
  Zap,
  Shield,
  TrendingUp,
  Globe,
  Settings,
  CreditCard,
  BarChart3,
  RefreshCw,
  CheckCircle,
  ArrowRight,
  Layers,
  Activity,
  Code2,
  Cpu,
  Network,
} from "lucide-react";
import { easings, durations } from "@/lib/design-system/motion";
import { Button } from "@/components/ui/button-v2";

// ============================================================================
// ARCHITECTURE DIAGRAM COMPONENT
// ============================================================================

function ArchitectureDiagram() {
  const components = [
    { id: 1, label: "Sua Aplicação", icon: <Code2 />, x: 10, y: 50 },
    { id: 2, label: "API Kodano", icon: <Cpu />, x: 40, y: 50 },
    { id: 3, label: "Orquestrador", icon: <Network />, x: 70, y: 50 },
    { id: 4, label: "Antifraude", icon: <Shield />, x: 90, y: 20 },
    { id: 5, label: "Processamento", icon: <CreditCard />, x: 90, y: 50 },
    { id: 6, label: "Dashboard", icon: <BarChart3 />, x: 90, y: 80 },
  ];

  return (
    <div className="relative h-96 rounded-xl border bg-card/50 p-8">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
        {/* Connection lines */}
        <motion.path
          d="M 15 50 L 35 50"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-accent"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
        <motion.path
          d="M 45 50 L 65 50"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-accent"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
        />
        <motion.path
          d="M 75 50 Q 85 35 85 20"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-muted-foreground"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
        />
        <motion.path
          d="M 75 50 L 85 50"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-muted-foreground"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.7, ease: "easeInOut" }}
        />
        <motion.path
          d="M 75 50 Q 85 65 85 80"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-muted-foreground"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeInOut" }}
        />
      </svg>

      {/* Components */}
      {components.map((component, index) => (
        <motion.div
          key={component.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: index * 0.15,
            type: "spring",
            stiffness: 200,
          }}
          style={{
            position: "absolute",
            left: `${component.x}%`,
            top: `${component.y}%`,
            transform: "translate(-50%, -50%)",
          }}
          className="flex flex-col items-center"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent"
          >
            {component.icon}
          </motion.div>
          <span className="text-xs font-medium">{component.label}</span>
        </motion.div>
      ))}

      {/* Data flow animation */}
      <motion.div
        className="absolute h-3 w-3 rounded-full bg-green-500"
        animate={{
          left: ["10%", "40%", "70%", "90%"],
          top: ["50%", "50%", "50%", "20%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

// ============================================================================
// PROCESS TIMELINE
// ============================================================================

function ProcessTimeline() {
  const steps = [
    {
      time: "0ms",
      title: "Requisição recebida",
      description: "Sua aplicação envia a transação para nossa API",
      icon: <Zap className="h-5 w-5" />,
    },
    {
      time: "10ms",
      title: "Validação e análise",
      description: "Verificamos dados e aplicamos regras de negócio",
      icon: <Shield className="h-5 w-5" />,
    },
    {
      time: "50ms",
      title: "Processamento inteligente",
      description: "Otimizamos a transação em tempo real",
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      time: "150ms",
      title: "Processamento",
      description: "Transação processada e confirmada",
      icon: <CheckCircle className="h-5 w-5" />,
    },
    {
      time: "200ms",
      title: "Resposta enviada",
      description: "Retorno completo com todos os dados",
      icon: <Activity className="h-5 w-5" />,
    },
  ];

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b from-accent via-accent/50 to-transparent" />

      {/* Steps */}
      <div className="space-y-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative flex gap-6"
          >
            {/* Icon */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border bg-card"
            >
              <div className="text-accent">{step.icon}</div>
              <div className="absolute -top-2 -right-2 rounded-full bg-accent px-2 py-0.5 text-xs font-bold text-white">
                {step.time}
              </div>
            </motion.div>

            {/* Content */}
            <div className="flex-1 pt-2">
              <h3 className="mb-1 text-lg font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function ComoFuncionaPage() {
  const benefits = [
    {
      icon: <Layers />,
      title: "Orquestração Inteligente",
      description: "Nossa IA escolhe automaticamente o melhor caminho para cada transação, considerando taxa de aprovação, custo e velocidade.",
    },
    {
      icon: <RefreshCw />,
      title: "Retry Automático",
      description: "Se uma transação falha, tentamos automaticamente com configurações otimizadas, aumentando suas aprovações em até 23%.",
    },
    {
      icon: <Shield />,
      title: "Antifraude Integrado",
      description: "Análise em tempo real com machine learning para bloquear fraudes sem impactar transações legítimas.",
    },
    {
      icon: <Globe />,
      title: "Processamento Global",
      description: "Processe pagamentos em diferentes países e moedas, tudo através de uma única integração moderna.",
    },
    {
      icon: <Activity />,
      title: "Monitoramento 24/7",
      description: "Acompanhe todas as transações em tempo real com nosso dashboard completo e receba alertas instantâneos.",
    },
    {
      icon: <BarChart3 />,
      title: "Otimização Contínua",
      description: "Nossos algoritmos aprendem com cada transação, melhorando continuamente suas taxas de aprovação.",
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
              Como Funciona
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: durations.slow }}
              className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              Orquestração feita com{" "}
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                precisão cirúrgica
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: durations.normal }}
              className="mt-6 text-lg text-muted-foreground"
            >
              A rota certa, no momento certo. Nossa tecnologia simplifica o processamento
              de pagamentos e maximiza suas aprovações automaticamente.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center"
            >
              <Link href="/fale-conosco">
                <Button size="lg" variant="kodano">
                  Fale Conosco
                  <Zap className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Interactive How It Works Section */}
      <HowItWorksSection
        title="Processo em 4 passos simples"
        subtitle="Integração rápida"
        description="Do setup à primeira transação em menos de 30 minutos"
        layout="timeline"
        showDemo={true}
      />

      {/* Architecture Diagram */}
      <SectionContainer spacing="xl" background="muted">
        <SectionHeader
          badge="Arquitetura"
          title="Como tudo se conecta"
          description="Visão técnica de como nossa plataforma orquestra seus pagamentos"
          centered
        />
        <div className="mx-auto max-w-5xl">
          <ArchitectureDiagram />
        </div>
      </SectionContainer>

      {/* Process Timeline */}
      <SectionContainer spacing="xl">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader
              badge="Performance"
              title="Cada milissegundo importa"
              description="Veja como processamos transações em tempo recorde sem comprometer a segurança"
              centered={false}
            />
            {/* Métricas removidas - não podemos exibir informações falsas */}
          </div>

          <div>
            <ProcessTimeline />
          </div>
        </div>
      </SectionContainer>

      {/* Benefits Grid */}
      <BenefitsSection
        title="Por que nossa orquestração é diferente?"
        subtitle="Tecnologia de ponta"
        description="Recursos exclusivos que fazem toda a diferença na sua operação"
        benefits={benefits}
        layout="grid"
        showStats={false}
      />

      {/* CTA Section */}
      <CTASection
        variant="split"
        title="Veja a mágica acontecendo"
        subtitle="Entre em contato"
        description="Entre em contato conosco e veja como é simples transformar seus pagamentos"
        primaryCTA={{ label: "Fale Conosco", href: "/fale-conosco" }}
        background={true}
      />
    </MainLayout>
  );
}