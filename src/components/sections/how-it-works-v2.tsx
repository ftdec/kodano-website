/**
 * How It Works Section v2.0
 * Stripe-level step-by-step process showcase with advanced animations
 */

"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Code2,
  CreditCard,
  Settings,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Play,
  Zap,
  Shield,
  Globe,
  Terminal,
  Smartphone,
  Monitor,
  Copy,
  Check,
} from "lucide-react";
import { easings, durations } from "@/lib/design-system/motion";
import { SectionContainer, SectionHeader } from "./section-wrapper";

// ============================================================================
// STEP CARD COMPONENT
// ============================================================================

interface StepCardProps {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  code?: {
    language: string;
    snippet: string;
  };
  demo?: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  index: number;
}

function StepCard({
  number,
  title,
  description,
  icon,
  code,
  demo,
  isActive,
  onClick,
  index,
}: StepCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (code) {
      await navigator.clipboard.writeText(code.snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.15,
        duration: durations.slow,
        ease: easings.emphasized,
      },
    },
  };

  const iconVariants = {
    inactive: { scale: 1, rotate: 0 },
    active: {
      scale: 1.1,
      rotate: 5,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const contentVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: durations.normal, ease: easings.emphasized },
        opacity: { duration: durations.fast, delay: 0.1 },
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="relative"
    >
      {/* Connecting line (except for last item) */}
      {index < 3 && (
        <motion.div
          className="absolute left-8 top-16 h-full w-0.5 bg-gradient-to-b from-accent/50 to-transparent lg:hidden"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ delay: index * 0.15 + 0.3, duration: durations.slow }}
          style={{ transformOrigin: "top" }}
        />
      )}

      <motion.div
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "relative cursor-pointer rounded-xl border bg-card p-6 transition-all",
          isActive && "border-accent shadow-lg"
        )}
      >
        {/* Step number and icon */}
        <div className="flex items-start gap-4">
          {/* Step number circle */}
          <motion.div
            animate={isActive ? "active" : "inactive"}
            className={cn(
              "flex h-16 w-16 items-center justify-center rounded-full font-bold text-2xl transition-colors",
              isActive
                ? "bg-gradient-to-br from-accent to-primary text-white"
                : "bg-accent/10 text-accent"
            )}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: index * 0.15 + 0.2,
                type: "spring",
                stiffness: 400,
              }}
            >
              {number}
            </motion.div>
          </motion.div>

          {/* Title and description */}
          <div className="flex-1">
            <motion.h3
              className="text-xl font-semibold text-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.15 + 0.3 }}
            >
              {title}
            </motion.h3>
            <motion.p
              className="mt-2 text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.15 + 0.4 }}
            >
              {description}
            </motion.p>
          </div>

          {/* Icon */}
          <motion.div
            variants={iconVariants}
            animate={isActive ? "active" : "inactive"}
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-lg",
              isActive ? "bg-accent/20" : "bg-accent/10"
            )}
          >
            {icon}
          </motion.div>
        </div>

        {/* Expandable content */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              variants={contentVariants}
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              className="mt-6 overflow-hidden"
            >
              {/* Code snippet */}
              {code && (
                <div className="relative rounded-lg bg-[#0D1B2A] p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-400">
                      {code.language}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy();
                      }}
                      className="flex items-center gap-1 rounded px-2 py-1 text-xs text-gray-400 hover:bg-white/10"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3 w-3" />
                          Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          Copiar
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="overflow-x-auto">
                    <code className="text-sm text-gray-300">{code.snippet}</code>
                  </pre>
                </div>
              )}

              {/* Demo content */}
              {demo && (
                <div className="mt-4 rounded-lg border bg-background/50 p-6">
                  {demo}
                </div>
              )}

              {/* Action button */}
              <motion.button
                whileHover={{ x: 5 }}
                className="mt-4 flex items-center gap-2 text-sm font-medium text-accent"
              >
                Saiba mais sobre esta etapa
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// ============================================================================
// TIMELINE COMPONENT (Desktop)
// ============================================================================

interface TimelineProps {
  steps: typeof defaultSteps;
  activeStep: number;
}

function Timeline({ steps, activeStep }: TimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="relative hidden lg:block">
      {/* Main timeline line */}
      <motion.div
        className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 bg-accent/10"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: durations.slow, ease: easings.emphasized }}
      />

      {/* Progress line */}
      <motion.div
        className="absolute left-0 top-1/2 h-1 -translate-y-1/2 bg-gradient-to-r from-accent to-primary"
        initial={{ width: 0 }}
        animate={{
          width: `${(activeStep / (steps.length - 1)) * 100}%`,
        }}
        transition={{ duration: durations.normal, ease: easings.spring }}
      />

      {/* Step indicators */}
      <div className="relative flex justify-between">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              delay: index * 0.1,
              type: "spring",
              stiffness: 300,
            }}
            className="flex flex-col items-center"
          >
            {/* Circle indicator */}
            <motion.div
              animate={{
                scale: activeStep >= index ? 1.2 : 1,
                backgroundColor: activeStep >= index ? "#415A77" : "#E0E1DD",
              }}
              transition={{ duration: durations.fast }}
              className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 border-background"
            >
              {activeStep > index ? (
                <CheckCircle className="h-6 w-6 text-white" />
              ) : (
                <span className={cn(
                  "text-lg font-bold",
                  activeStep >= index ? "text-white" : "text-foreground"
                )}>
                  {step.number}
                </span>
              )}
            </motion.div>

            {/* Step label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="mt-4 text-center"
            >
              <div className="text-sm font-semibold text-foreground">
                {step.title}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// DEMO COMPONENTS
// ============================================================================

function PaymentDemo() {
  const [processing, setProcessing] = useState(false);

  const handleProcess = () => {
    setProcessing(true);
    setTimeout(() => setProcessing(false), 2000);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex gap-2">
        <div className="h-12 w-20 rounded-md bg-gradient-to-r from-blue-500 to-blue-600" />
        <div className="h-12 w-20 rounded-md bg-gradient-to-r from-green-500 to-green-600" />
        <div className="h-12 w-20 rounded-md bg-gradient-to-r from-purple-500 to-purple-600" />
      </div>
      <motion.button
        onClick={handleProcess}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="rounded-lg bg-accent px-6 py-2 text-sm font-medium text-white"
      >
        {processing ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Zap className="h-4 w-4" />
          </motion.div>
        ) : (
          "Processar Pagamento"
        )}
      </motion.button>
    </div>
  );
}

function DashboardDemo() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="rounded-lg bg-accent/10 p-3">
        <div className="text-2xl font-bold text-accent">R$ 45.2k</div>
        <div className="text-xs text-muted-foreground">Volume hoje</div>
      </div>
      <div className="rounded-lg bg-purple-500/10 p-3">
        <div className="text-2xl font-bold text-purple-500">1,234</div>
        <div className="text-xs text-muted-foreground">Transações</div>
      </div>
    </div>
  );
}

// ============================================================================
// STEPS DATA
// ============================================================================

const defaultSteps = [
  {
    number: "1",
    title: "Integração Rápida",
    description: "Configure sua conta e integre nossa API em minutos com nossa documentação completa.",
    icon: <Settings className="h-6 w-6 text-accent" />,
    code: {
      language: "javascript",
      snippet: `// Instale o SDK Kodano
npm install @kodano/sdk

// Configure sua chave API
import { Kodano } from '@kodano/sdk';

const kodano = new Kodano({
  apiKey: 'sua_chave_api',
  environment: 'production'
});`,
    },
  },
  {
    number: "2",
    title: "Configure Pagamentos",
    description: "Escolha seus meios de pagamento, configure antifraude e personalize a experiência.",
    icon: <CreditCard className="h-6 w-6 text-accent" />,
    demo: <PaymentDemo />,
  },
  {
    number: "3",
    title: "Processe Transações",
    description: "Comece a processar pagamentos com nossa infraestrutura de alta performance.",
    icon: <Zap className="h-6 w-6 text-accent" />,
    code: {
      language: "javascript",
      snippet: `// Processe um pagamento
const payment = await kodano.payments.create({
  amount: 10000, // R$ 100,00
  currency: 'BRL',
  method: 'credit_card',
  customer: { id: 'customer_123' },
  metadata: { order_id: '12345' }
});

console.log(payment.status); // 'approved'`,
    },
  },
  {
    number: "4",
    title: "Monitore e Otimize",
    description: "Acompanhe métricas em tempo real e otimize suas conversões com insights.",
    icon: <TrendingUp className="h-6 w-6 text-accent" />,
    demo: <DashboardDemo />,
  },
];

// ============================================================================
// MAIN SECTION COMPONENT
// ============================================================================

interface HowItWorksSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  steps?: typeof defaultSteps;
  layout?: "timeline" | "cards" | "split";
  showDemo?: boolean;
  className?: string;
}

export function HowItWorksSection({
  title = "Como Funciona",
  subtitle = "Simples e poderoso",
  description = "Integre e comece a processar pagamentos em 4 passos simples.",
  steps = defaultSteps,
  layout = "cards",
  showDemo = true,
  className,
}: HowItWorksSectionProps) {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <div ref={sectionRef}>
      <SectionContainer
        spacing="xl"
        className={cn("relative overflow-hidden", className)}
      >
      {/* Animated background */}
      <motion.div
        style={{ y: backgroundY }}
        className="pointer-events-none absolute inset-0 opacity-30"
      >
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-accent/20 to-transparent blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl" />
      </motion.div>

      {/* Header */}
      <SectionHeader
        badge={subtitle}
        title={title}
        description={description}
        centered
      />

      {/* Timeline (Desktop only) */}
      {layout === "timeline" && (
        <div className="mt-20">
          <Timeline steps={steps} activeStep={activeStep} />
        </div>
      )}

      {/* Cards layout */}
      {layout === "cards" && (
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              {...step}
              index={index}
              isActive={activeStep === index}
              onClick={() => setActiveStep(index)}
            />
          ))}
        </div>
      )}

      {/* Split layout */}
      {layout === "split" && (
        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Step navigation */}
          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  duration: durations.normal,
                }}
                onClick={() => setActiveStep(index)}
                className={cn(
                  "cursor-pointer rounded-lg border p-4 transition-all",
                  activeStep === index
                    ? "border-accent bg-accent/5 shadow-md"
                    : "border-border hover:border-accent/50"
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full font-bold",
                      activeStep === index
                        ? "bg-accent text-white"
                        : "bg-accent/10 text-accent"
                    )}
                  >
                    {step.number}
                  </div>
                  <div>
                    <h4 className="font-semibold">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Active step content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: durations.normal }}
              className="relative"
            >
              <div className="rounded-xl border bg-card p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-accent/10">
                    {steps[activeStep].icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">
                      {steps[activeStep].title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Passo {activeStep + 1} de {steps.length}
                    </p>
                  </div>
                </div>

                {steps[activeStep].code && (
                  <div className="rounded-lg bg-[#0D1B2A] p-4">
                    <pre className="overflow-x-auto">
                      <code className="text-sm text-gray-300">
                        {steps[activeStep].code.snippet}
                      </code>
                    </pre>
                  </div>
                )}

                {steps[activeStep].demo && (
                  <div className="rounded-lg border bg-background/50 p-6">
                    {steps[activeStep].demo}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Interactive demo button */}
      {showDemo && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: durations.slow }}
          className="mt-16 text-center"
        >
          <Link href="/fale-conosco">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-medium text-white"
            >
              Fale Conosco
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </Link>
        </motion.div>
      )}
      </SectionContainer>
    </div>
  );
}

export default HowItWorksSection;