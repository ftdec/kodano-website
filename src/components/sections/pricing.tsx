"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Info, Zap, Shield, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import * as Tooltip from "@radix-ui/react-tooltip";

// Plan types
type PlanType = "startup" | "business" | "enterprise";
type BillingPeriod = "monthly" | "annual";

// Pricing data
const plans = {
  startup: {
    name: "Startup",
    description: "Para empresas em crescimento",
    icon: Zap,
    gradient: "from-blue-500 to-cyan-500",
    monthlyPrice: 299,
    annualPrice: 2990,
    features: [
      { text: "Até 10.000 transações/mês", included: true, tooltip: "Transações incluídas no plano" },
      { text: "Taxa de 2.9% + R$ 0.39", included: true, tooltip: "Por transação aprovada" },
      { text: "APIs RESTful", included: true },
      { text: "Suporte via email", included: true },
      { text: "Dashboard básico", included: true },
      { text: "Webhooks em tempo real", included: true },
      { text: "Tokenização PCI", included: true },
      { text: "Split de pagamento", included: false, tooltip: "Disponível no plano Business" },
      { text: "API GraphQL", included: false },
      { text: "SLA 99.99%", included: false },
    ],
  },
  business: {
    name: "Business",
    description: "Para operações em escala",
    icon: TrendingUp,
    gradient: "from-purple-500 to-pink-500",
    monthlyPrice: 799,
    annualPrice: 7990,
    popular: true,
    features: [
      { text: "Até 100.000 transações/mês", included: true, tooltip: "Transações incluídas no plano" },
      { text: "Taxa de 2.5% + R$ 0.29", included: true, tooltip: "Taxa reduzida" },
      { text: "APIs RESTful + GraphQL", included: true },
      { text: "Suporte prioritário 24/7", included: true },
      { text: "Dashboard avançado", included: true },
      { text: "Webhooks + WebSocket", included: true },
      { text: "Tokenização + 3D Secure", included: true },
      { text: "Split de pagamento", included: true, tooltip: "Divida pagamentos entre múltiplos recebedores" },
      { text: "Antifraude ML", included: true },
      { text: "SLA 99.99%", included: true },
    ],
  },
  enterprise: {
    name: "Enterprise",
    description: "Soluções customizadas",
    icon: Shield,
    gradient: "from-emerald-500 to-teal-500",
    customPrice: true,
    features: [
      { text: "Transações ilimitadas", included: true },
      { text: "Taxa negociável", included: true, tooltip: "Taxas personalizadas baseadas em volume" },
      { text: "APIs dedicadas", included: true },
      { text: "Account Manager dedicado", included: true },
      { text: "Dashboard white-label", included: true },
      { text: "Integração customizada", included: true },
      { text: "Compliance dedicado", included: true },
      { text: "Multi-região", included: true, tooltip: "Deploy em múltiplas regiões" },
      { text: "Disaster recovery", included: true },
      { text: "SLA customizado", included: true },
    ],
  },
};

// Tooltip component
function FeatureTooltip({ children, content }: { children: React.ReactNode; content?: string }) {
  if (!content) return <>{children}</>;

  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <span className="inline-flex items-center gap-1 cursor-help">
            {children}
            <Info className="w-3 h-3 text-muted-foreground" />
          </span>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="z-50 overflow-hidden rounded-lg bg-background/95 backdrop-blur-sm px-3 py-2 text-xs shadow-lg border border-border animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
            sideOffset={5}
          >
            {content}
            <Tooltip.Arrow className="fill-background" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

// Individual pricing card
function PricingCard({
  plan,
  billingPeriod,
  isActive,
  onHover,
}: {
  plan: typeof plans.startup | typeof plans.business | typeof plans.enterprise;
  billingPeriod: BillingPeriod;
  isActive: boolean;
  onHover: (active: boolean) => void;
}) {
  const Icon = plan.icon;
  const isPopular = "popular" in plan && plan.popular;

  const monthlyPrice = "monthlyPrice" in plan ? plan.monthlyPrice : 0;
  const annualPrice = "annualPrice" in plan ? plan.annualPrice : 0;
  const displayPrice = billingPeriod === "monthly" ? monthlyPrice : annualPrice / 12;

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.02, y: -5 }}
      onHoverStart={() => onHover(true)}
      onHoverEnd={() => onHover(false)}
      className={cn(
        "relative rounded-2xl border transition-all duration-300",
        isActive
          ? "border-kodano-cyan shadow-2xl shadow-kodano-cyan/20"
          : "border-border hover:border-kodano-cyan/50",
        isPopular && "ring-2 ring-kodano-cyan ring-offset-2 ring-offset-background"
      )}
    >
      {/* Popular badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <span className="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-kodano-cyan to-kodano-teal text-white">
            MAIS POPULAR
          </span>
        </div>
      )}

      {/* Gradient background */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl bg-gradient-to-br opacity-5",
          plan.gradient,
          isActive && "opacity-10"
        )}
      />

      <div className="relative p-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className={cn(
              "w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center",
              plan.gradient
            )}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
          </div>
          <p className="text-sm text-muted-foreground">{plan.description}</p>
        </div>

        {/* Pricing */}
        <div className="mb-6">
          {"customPrice" in plan ? (
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-foreground">Customizado</span>
            </div>
          ) : (
            <>
              <div className="flex items-baseline gap-1">
                <span className="text-sm text-muted-foreground">R$</span>
                <span className="text-4xl font-bold text-foreground">
                  {Math.floor(displayPrice).toLocaleString("pt-BR")}
                </span>
                <span className="text-sm text-muted-foreground">/mês</span>
              </div>
              {billingPeriod === "annual" && (
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                  Economia de R$ {((monthlyPrice * 12) - annualPrice).toLocaleString("pt-BR")}/ano
                </p>
              )}
            </>
          )}
        </div>

        {/* Features */}
        <div className="space-y-3 mb-8">
          {plan.features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.02 }}
              className="flex items-start gap-3"
            >
              {feature.included ? (
                <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              ) : (
                <X className="w-4 h-4 text-muted-foreground/50 mt-0.5 flex-shrink-0" />
              )}
              <span className={cn(
                "text-sm",
                feature.included ? "text-foreground" : "text-muted-foreground/50 line-through"
              )}>
                <FeatureTooltip content={feature.tooltip}>
                  {feature.text}
                </FeatureTooltip>
              </span>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <button
          className={cn(
            "w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300",
            isPopular
              ? "bg-gradient-to-r from-kodano-cyan to-kodano-teal text-white hover:shadow-lg"
              : "border border-kodano-cyan/30 text-foreground hover:bg-kodano-cyan/10"
          )}
        >
          {"customPrice" in plan ? "Falar com vendas" : "Começar agora"}
        </button>
      </div>
    </motion.div>
  );
}

// Main pricing section
export function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("annual");
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-kodano-cyan/10 text-kodano-cyan">
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Preços transparentes,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-kodano-cyan to-kodano-teal">
              sem surpresas
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Escolha o plano ideal para seu negócio. Sem setup fee, sem lock-in.
          </p>
        </motion.div>

        {/* Billing toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <span className={cn(
            "text-sm font-medium transition-colors",
            billingPeriod === "monthly" ? "text-foreground" : "text-muted-foreground"
          )}>
            Mensal
          </span>
          <button
            onClick={() => setBillingPeriod(prev => prev === "monthly" ? "annual" : "monthly")}
            className="relative w-14 h-7 rounded-full bg-surface-2 transition-colors hover:bg-surface-3"
          >
            <motion.div
              className="absolute top-1 w-5 h-5 rounded-full bg-gradient-to-r from-kodano-cyan to-kodano-teal"
              animate={{ left: billingPeriod === "monthly" ? 4 : 28 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </button>
          <span className={cn(
            "text-sm font-medium transition-colors",
            billingPeriod === "annual" ? "text-foreground" : "text-muted-foreground"
          )}>
            Anual
            <span className="ml-2 text-xs text-green-600 dark:text-green-400">-20%</span>
          </span>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(plans).map(([key, plan], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <PricingCard
                plan={plan}
                billingPeriod={billingPeriod}
                isActive={hoveredPlan === key}
                onHover={(active) => setHoveredPlan(active ? key : null)}
              />
            </motion.div>
          ))}
        </div>

        {/* FAQ link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">
            Dúvidas sobre os planos?
          </p>
          <a
            href="#faq"
            className="text-kodano-cyan hover:text-kodano-teal font-medium transition-colors"
          >
            Ver perguntas frequentes →
          </a>
        </motion.div>
      </div>
    </section>
  );
}