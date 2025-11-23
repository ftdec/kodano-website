/**
 * Features Section v2.0
 * Stripe-level feature showcase with micro-interactions
 */

"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { FeatureCard } from "@/components/ui/card-v2";
import { cn } from "@/lib/utils";
import {
  Zap,
  Shield,
  BarChart3,
  Globe,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { easings, durations } from "@/lib/design-system/motion";

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.slow,
      ease: easings.emphasized,
    },
  },
};

// ============================================================================
// FEATURE DATA
// ============================================================================

const defaultFeatures = [
  {
    icon: <Zap className="h-6 w-6 text-yellow-500" />,
    title: "Processamento Ultrarrápido",
    description: "Transações processadas rapidamente com nossa infraestrutura otimizada.",
    badge: "Novo",
    highlight: false,
  },
  {
    icon: <Shield className="h-6 w-6 text-green-500" />,
    title: "Segurança Avançada",
    description: "Proteção em múltiplas camadas com criptografia de ponta e certificação PCI DSS.",
    highlight: true,
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-blue-500" />,
    title: "Analytics em Tempo Real",
    description: "Dashboard completo com métricas e insights para otimizar suas conversões.",
    badge: "Popular",
    highlight: false,
  },
  {
    icon: <Globe className="h-6 w-6 text-purple-500" />,
    title: "Cobertura Global",
    description: "Aceite pagamentos de qualquer lugar com suporte a múltiplas moedas.",
    highlight: false,
  },
];

// ============================================================================
// ANIMATED FEATURE CARD
// ============================================================================

interface AnimatedFeatureCardProps {
  feature: {
    icon: React.ReactNode;
    title: string;
    description: string;
    badge?: string;
    highlight?: boolean;
  };
}

function AnimatedFeatureCard({ feature }: AnimatedFeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useMotionValue(0), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;

    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      variants={itemVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="h-full"
    >
      <motion.div
        className="relative h-full"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0"
          style={{
            background: `radial-gradient(circle at ${mouseX.get()}px ${mouseY.get()}px, rgba(65, 90, 119, 0.2) 0%, transparent 50%)`,
          }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.3 }}
        />

        <FeatureCard
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          badge={feature.badge}
          highlight={feature.highlight}
          className="h-full"
        />
      </motion.div>
    </motion.div>
  );
}

// ============================================================================
// FEATURE COMPARISON
// ============================================================================

interface FeatureComparisonProps {
  title: string;
  items: {
    label: string;
    kodano: boolean | string;
    others: boolean | string;
  }[];
}

function FeatureComparison({ title, items }: FeatureComparisonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: durations.slow, ease: easings.emphasized }}
      className="mt-16"
    >
      <h3 className="mb-8 text-center text-2xl font-bold">{title}</h3>
      <div className="overflow-hidden rounded-xl border bg-card">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-6 py-4 text-left text-sm font-semibold">Recurso</th>
              <th className="px-6 py-4 text-center text-sm font-semibold">
                <span className="text-accent">Kodano</span>
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold">
                <span className="text-muted-foreground">Outros</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <motion.tr
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  delay: index * 0.05,
                  duration: durations.normal,
                }}
                className="border-b last:border-0"
              >
                <td className="px-6 py-4 text-sm">{item.label}</td>
                <td className="px-6 py-4 text-center">
                  {typeof item.kodano === "boolean" ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{
                        delay: 0.3 + index * 0.05,
                        type: "spring",
                        stiffness: 400,
                      }}
                      className="flex justify-center"
                    >
                      {item.kodano ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </motion.div>
                  ) : (
                    <span className="text-sm font-medium text-accent">{item.kodano}</span>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  {typeof item.others === "boolean" ? (
                    <div className="flex justify-center">
                      {item.others ? (
                        <CheckCircle className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">{item.others}</span>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

// ============================================================================
// ANIMATED METRIC
// ============================================================================

interface AnimatedMetricProps {
  value: number;
  suffix?: string;
  label: string;
}

function AnimatedMetric({ value, suffix = "", label }: AnimatedMetricProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        duration: durations.normal,
        ease: easings.spring,
      }}
      className="text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2 }}
        className="text-4xl font-bold text-accent"
      >
        {displayValue}
        {suffix}
      </motion.div>
      <div className="mt-2 text-sm text-muted-foreground">{label}</div>
    </motion.div>
  );
}

// ============================================================================
// MAIN FEATURES SECTION
// ============================================================================

interface FeaturesSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: typeof defaultFeatures;
  showComparison?: boolean;
  showMetrics?: boolean;
  className?: string;
}

export function FeaturesSection({
  title = "Recursos Poderosos",
  subtitle = "Tudo que você precisa",
  description = "Plataforma completa de pagamentos com todas as ferramentas para escalar seu negócio.",
  features = defaultFeatures,
  showComparison = false,
  showMetrics = false,
  className,
}: FeaturesSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-200px" });

  const comparisonItems = [
    { label: "Funcionalidades avançadas", kodano: true, others: false },
    { label: "Antifraude com ML", kodano: true, others: false },
    { label: "Dashboard unificado", kodano: true, others: false },
    { label: "API REST completa", kodano: true, others: true },
    { label: "Webhooks em tempo real", kodano: true, others: false },
    { label: "Suporte 24/7", kodano: true, others: false },
  ];

  return (
    <section ref={sectionRef} className={cn("py-24", className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: durations.slow, ease: easings.emphasized }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-block rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent"
          >
            {subtitle}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl"
          >
            {title}
          </motion.h2>

          {description && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="mt-4 text-lg text-muted-foreground"
            >
              {description}
            </motion.p>
          )}
        </motion.div>

        {/* Feature cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, index) => (
            <AnimatedFeatureCard key={index} feature={feature} />
          ))}
        </motion.div>

        {/* Metrics */}
        {showMetrics && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: durations.slow }}
            className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-1"
          >
            <AnimatedMetric value={24} suffix="/7" label="Suporte Disponível" />
          </motion.div>
        )}

        {/* Feature comparison table */}
        {showComparison && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: durations.slow }}
            className="mt-16 text-center"
          >
            <Link href="/fale-conosco">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-2 text-accent hover:text-accent/80"
              >
                <span className="font-medium">Fale conosco</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default FeaturesSection;