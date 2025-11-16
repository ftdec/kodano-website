/**
 * Products Section
 * Stripe-level product showcase with animations
 */

"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Layers,
  CreditCard,
  Shield,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Zap,
  Globe,
} from "lucide-react";
import { easings, durations } from "@/lib/design-system/motion";
import { FeatureCard } from "@/components/ui/card-v2";
import { SectionContainer, SectionHeader } from "./section-wrapper";

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
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: durations.slow,
      ease: easings.emphasized,
    },
  },
};

// ============================================================================
// PRODUCT DATA
// ============================================================================

const products = [
  {
    icon: <Layers className="h-6 w-6 text-blue-500" />,
    title: "Orquestração Inteligente",
    description: "Roteamento automático para múltiplos adquirentes com fallback e retry inteligente.",
    features: [
      "Multi-adquirência",
      "Roteamento por regras",
      "Retry automático",
    ],
    href: "/produtos#orquestracao",
  },
  {
    icon: <CreditCard className="h-6 w-6 text-green-500" />,
    title: "Checkout Transparente",
    description: "Experiência de pagamento otimizada com tokenização e armazenamento seguro.",
    features: [
      "Tokenização PCI",
      "One-click payment",
      "Multi-idiomas",
    ],
    href: "/produtos#checkout",
  },
  {
    icon: <Shield className="h-6 w-6 text-red-500" />,
    title: "Antifraude Avançado",
    description: "Machine learning em tempo real para detectar e prevenir fraudes antes que aconteçam.",
    features: [
      "ML em tempo real",
      "Score personalizado",
      "Regras customizáveis",
    ],
    href: "/produtos#antifraude",
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-purple-500" />,
    title: "Dashboard Unificado",
    description: "Visão completa de todas as transações com analytics e insights em tempo real.",
    features: [
      "Real-time analytics",
      "Relatórios customizados",
      "API de dados",
    ],
    href: "/produtos#dashboard",
  },
];

// ============================================================================
// PRODUCT CARD COMPONENT
// ============================================================================

interface ProductCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  href: string;
  index: number;
}

function ProductCard({ icon, title, description, features, href, index }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      variants={itemVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={index}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-accent/50">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Icon */}
        <motion.div
          className="relative z-10 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-background shadow-sm"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {icon}
        </motion.div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className="mb-2 text-lg font-semibold text-foreground">
            {title}
          </h3>
          <p className="mb-4 text-sm text-muted-foreground">
            {description}
          </p>

          {/* Features list */}
          <ul className="mb-4 space-y-1">
            {features.map((feature, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 + i * 0.05 }}
                className="flex items-center gap-2 text-xs text-muted-foreground"
              >
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>

          {/* Link */}
          <motion.a
            href={href}
            className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            Saiba mais
            <ArrowRight className="h-4 w-4" />
          </motion.a>
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-accent/10 to-transparent"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 10,
            ease: "linear",
            repeat: Infinity,
          }}
        />
      </div>
    </motion.div>
  );
}

// ============================================================================
// MAIN PRODUCTS SECTION COMPONENT
// ============================================================================

interface ProductsSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  className?: string;
}

export function ProductsSection({
  title = "Produtos",
  subtitle = "Plataforma completa",
  description = "Tudo que você precisa para processar pagamentos com eficiência e segurança.",
  className,
}: ProductsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <SectionContainer className={cn("py-24", className)}>
      <div ref={sectionRef}>
        <SectionHeader
          title={title}
          subtitle={subtitle}
          description={description}
          centered
          animated
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {products.map((product, index) => (
            <ProductCard
              key={product.title}
              {...product}
              index={index}
            />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: durations.slow }}
          className="mt-12 text-center"
        >
          <a
            href="/produtos"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
          >
            Ver todos os produtos
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </SectionContainer>
  );
}

export default ProductsSection;