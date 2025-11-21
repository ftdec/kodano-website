/**
 * Benefits Section v2.0
 * Stripe-level benefits showcase with advanced animations
 */

"use client";

import React, { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  TrendingUp,
  Shield,
  Zap,
  Globe,
  Users,
  BarChart3,
  Lock,
  Cpu,
  Check,
  ArrowUpRight,
} from "lucide-react";
import { easings, durations } from "@/lib/design-system/motion";
import { SectionContainer, SectionHeader, StaggerContainer } from "./section-wrapper";

// ============================================================================
// BENEFIT CARD COMPONENT
// ============================================================================

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  metrics?: {
    value: string;
    label: string;
  };
  features?: string[];
  index: number;
  variant?: "default" | "large" | "compact";
}

function BenefitCard({
  icon,
  title,
  description,
  metrics,
  features,
  index,
  variant = "default",
}: BenefitCardProps) {
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: index * 0.1,
        duration: durations.slow,
        ease: easings.emphasized,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        delay: index * 0.1 + 0.2,
        type: "spring" as const,
        stiffness: 200,
        damping: 20,
      },
    },
  };

  const glowVariants = {
    rest: { opacity: 0 },
    hover: {
      opacity: 1,
      transition: { duration: durations.normal },
    },
  };

  if (variant === "compact") {
    return (
      <motion.div
        ref={cardRef}
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        whileHover="hover"
        className="group relative flex items-start gap-4 rounded-lg p-4 transition-colors hover:bg-accent/5"
      >
        <motion.div
          variants={iconVariants}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent"
        >
          {icon}
        </motion.div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:opacity-100" />
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover="hover"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: variant === "large" ? rotateX : 0,
        rotateY: variant === "large" ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-card p-6 transition-all hover:shadow-lg",
        variant === "large" && "lg:col-span-2 lg:row-span-2 p-8"
      )}
    >
      {/* Glow effect */}
      <motion.div
        variants={glowVariants}
        initial="rest"
        animate="rest"
        whileHover="hover"
        className="pointer-events-none absolute inset-0 opacity-0"
        style={{
          background: `radial-gradient(circle at ${mouseX.get()}px ${mouseY.get()}px, rgba(65, 90, 119, 0.15) 0%, transparent 50%)`,
        }}
      />

      {/* Icon */}
      <motion.div
        variants={iconVariants}
        className={cn(
          "flex items-center justify-center rounded-lg bg-gradient-to-br from-accent/20 to-primary/10",
          variant === "large" ? "h-14 w-14" : "h-12 w-12"
        )}
      >
        {React.isValidElement(icon)
          ? React.cloneElement(icon, {
              className: cn(
                "text-accent",
                variant === "large" ? "h-7 w-7" : "h-6 w-6"
              ),
            } as any)
          : icon}
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.1 + 0.3 }}
        className="mt-4"
      >
        <h3 className={cn(
          "font-semibold text-foreground",
          variant === "large" ? "text-xl" : "text-lg"
        )}>
          {title}
        </h3>
        <p className={cn(
          "mt-2 text-muted-foreground",
          variant === "large" ? "text-base" : "text-sm"
        )}>
          {description}
        </p>
      </motion.div>

      {/* Metrics */}
      {metrics && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{
            delay: index * 0.1 + 0.4,
            type: "spring",
            stiffness: 200,
          }}
          className="mt-4 flex items-end gap-2"
        >
          <span className="text-3xl font-bold text-accent">{metrics.value}</span>
          <span className="mb-1 text-sm text-muted-foreground">{metrics.label}</span>
        </motion.div>
      )}

      {/* Features list */}
      {features && features.length > 0 && (
        <motion.ul className="mt-4 space-y-2">
          {features.map((feature, featureIndex) => (
            <motion.li
              key={featureIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                delay: index * 0.1 + 0.5 + featureIndex * 0.05,
                duration: durations.normal,
              }}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Check className="h-4 w-4 text-green-500" />
              {feature}
            </motion.li>
          ))}
        </motion.ul>
      )}

      {/* Hover indicator */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-accent to-primary"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: durations.normal, ease: easings.emphasized }}
        style={{ originX: 0 }}
      />
    </motion.div>
  );
}

// ============================================================================
// ANIMATED COUNTER
// ============================================================================

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2000,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = React.useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  React.useEffect(() => {
    if (!isInView) return;

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
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

// ============================================================================
// BENEFITS DATA
// ============================================================================

const defaultBenefits = [
  {
    icon: <TrendingUp />,
    title: "Roteamento Inteligente",
    description: "Maximize suas conversões com nossa tecnologia de roteamento inteligente que escolhe o melhor adquirente.",
    features: ["Roteamento automático", "Retry inteligente", "Fallback configurável"],
  },
  {
    icon: <Zap />,
    title: "Performance Ultrarrápida",
    description: "Processe milhares de transações por segundo com latência mínima.",
  },
  {
    icon: <Shield />,
    title: "Segurança Máxima",
    description: "Proteção em camadas com criptografia end-to-end e certificação PCI DSS Level 1.",
    features: ["Tokenização", "3DS 2.0", "Antifraude ML"],
  },
  {
    icon: <Globe />,
    title: "Cobertura Global",
    description: "Aceite pagamentos de qualquer lugar do mundo com suporte multi-moeda.",
  },
  {
    icon: <Users />,
    title: "Suporte Dedicado",
    description: "Time de especialistas disponível 24/7 para garantir seu sucesso.",
  },
  {
    icon: <BarChart3 />,
    title: "Analytics Avançado",
    description: "Dashboards em tempo real com insights acionáveis para otimizar suas métricas.",
  },
];

// ============================================================================
// MAIN BENEFITS SECTION
// ============================================================================

interface BenefitsSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  benefits?: typeof defaultBenefits;
  layout?: "grid" | "bento" | "list";
  showStats?: boolean;
  className?: string;
}

export function BenefitsSection({
  title = "Por que escolher Kodano?",
  subtitle = "Benefícios exclusivos",
  description = "Nossa plataforma oferece vantagens únicas que transformam a forma como você processa pagamentos.",
  benefits = defaultBenefits,
  layout = "bento",
  showStats = true,
  className,
}: BenefitsSectionProps) {
  const stats = [
    { value: 200, suffix: "ms", label: "Tempo de Resposta" },
    { value: 24, suffix: "/7", label: "Suporte Disponível" },
  ];

  const renderGrid = () => {
    if (layout === "list") {
      return (
        <div className="mx-auto max-w-3xl space-y-4">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              {...benefit}
              index={index}
              variant="compact"
            />
          ))}
        </div>
      );
    }

    if (layout === "bento") {
      return (
        <div className="grid gap-6 lg:grid-cols-3 lg:grid-rows-3">
          {/* Large featured card */}
          <BenefitCard
            {...benefits[0]}
            index={0}
            variant="large"
          />

          {/* Regular cards */}
          {benefits.slice(1).map((benefit, index) => (
            <BenefitCard
              key={index + 1}
              {...benefit}
              index={index + 1}
              variant="default"
            />
          ))}
        </div>
      );
    }

    // Default grid layout
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit, index) => (
          <BenefitCard
            key={index}
            {...benefit}
            index={index}
            variant="default"
          />
        ))}
      </div>
    );
  };

  return (
    <SectionContainer spacing="xl" className={className}>
      {/* Header */}
      <SectionHeader
        badge={subtitle}
        title={title}
        description={description}
        centered
      />

      {/* Stats bar */}
      {showStats && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: durations.slow, ease: easings.emphasized }}
          className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-8 rounded-xl border bg-card/50 p-8 backdrop-blur-sm sm:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 200,
              }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-foreground">
                <AnimatedCounter
                  value={typeof stat.value === "number" ? stat.value : 5}
                  suffix={stat.suffix}
                />
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Benefits grid */}
      <div className="mt-16">
        {renderGrid()}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: durations.slow }}
        className="mt-16 text-center"
      >
        <p className="text-muted-foreground">
          Pronto para transformar seus pagamentos?
        </p>
        <motion.a
          href="/fale-conosco"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 inline-flex items-center gap-2 text-accent hover:text-accent/80"
        >
          <span className="font-medium">Comece agora</span>
          <ArrowUpRight className="h-4 w-4" />
        </motion.a>
      </motion.div>
    </SectionContainer>
  );
}

export default BenefitsSection;