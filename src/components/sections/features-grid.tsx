"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Zap,
  Code,
  TrendingUp,
  Lock,
  Globe,
  CreditCard,
  Layers,
  BarChart3,
  Users,
  Cpu,
  Cloud
} from "lucide-react";
import { cn } from "@/lib/utils";

// Feature card data structure
interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  stats?: {
    value: string;
    label: string;
  };
  capabilities: string[];
}

const features: Feature[] = [
  {
    id: "security",
    title: "Segurança Bancária",
    description: "Certificação PCI DSS Level 1 com criptografia end-to-end e tokenização avançada.",
    icon: Shield,
    gradient: "from-blue-500/20 to-cyan-500/20",
    stats: { value: "99.99%", label: "Uptime SLA" },
    capabilities: ["PCI DSS Level 1", "Tokenização", "3D Secure 2.0", "Antifraude ML"]
  },
  {
    id: "performance",
    title: "Performance Ultra",
    description: "Latência de 150ms com auto-scaling que suporta picos de 10x no tráfego.",
    icon: Zap,
    gradient: "from-yellow-500/20 to-orange-500/20",
    stats: { value: "150ms", label: "Latência P95" },
    capabilities: ["Auto-scaling", "CDN Global", "Rate Limiting", "Circuit Breaker"]
  },
  {
    id: "developer",
    title: "Developer First",
    description: "SDKs em 8 linguagens, webhooks em tempo real e sandbox completo.",
    icon: Code,
    gradient: "from-purple-500/20 to-pink-500/20",
    stats: { value: "8+", label: "SDKs" },
    capabilities: ["RESTful APIs", "GraphQL", "Webhooks", "Sandbox"]
  },
  {
    id: "payments",
    title: "Multi-Pagamento",
    description: "Cartões, Pix, boleto e wallets digitais com split automático.",
    icon: CreditCard,
    gradient: "from-green-500/20 to-emerald-500/20",
    stats: { value: "15+", label: "Métodos" },
    capabilities: ["Cartões", "Pix", "Boleto", "Split Payment"]
  },
  {
    id: "analytics",
    title: "Analytics Realtime",
    description: "Dashboard intuitivo com insights de conversão e comportamento.",
    icon: BarChart3,
    gradient: "from-indigo-500/20 to-blue-500/20",
    stats: { value: "Real-time", label: "Insights" },
    capabilities: ["Dashboards", "Reports", "Alertas", "APIs de dados"]
  },
  {
    id: "infrastructure",
    title: "Infraestrutura Global",
    description: "Multi-cloud com redundância em 3 regiões e disaster recovery.",
    icon: Cloud,
    gradient: "from-teal-500/20 to-cyan-500/20",
    stats: { value: "3", label: "Regiões" },
    capabilities: ["Multi-cloud", "Redundância", "DR", "Edge Computing"]
  }
];

// Individual feature card component
function FeatureCard({ feature, isActive, onHover }: {
  feature: Feature;
  isActive: boolean;
  onHover: (id: string | null) => void;
}) {
  const Icon = feature.icon;

  return (
    <motion.div
      layout
      onHoverStart={() => onHover(feature.id)}
      onHoverEnd={() => onHover(null)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative group cursor-pointer",
        "rounded-2xl border transition-all duration-300",
        isActive
          ? "border-kodano-cyan/50 bg-gradient-to-br from-white to-kodano-cyan/5 dark:from-surface-1 dark:to-kodano-cyan/10 shadow-xl"
          : "border-border bg-card hover:border-kodano-cyan/30 hover:shadow-lg"
      )}
    >
      {/* Gradient background on hover */}
      <div className={cn(
        "absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-500",
        feature.gradient,
        isActive && "opacity-100"
      )} />

      <div className="relative p-6 space-y-4">
        {/* Icon with animated background */}
        <div className="relative">
          <motion.div
            animate={{
              rotate: isActive ? 360 : 0,
              scale: isActive ? 1.1 : 1
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className={cn(
              "inline-flex items-center justify-center w-14 h-14 rounded-xl",
              "bg-gradient-to-br transition-all duration-300",
              isActive
                ? "from-kodano-cyan to-kodano-teal shadow-lg shadow-kodano-cyan/25"
                : "from-surface-2 to-surface-1"
            )}
          >
            <Icon className={cn(
              "w-7 h-7 transition-colors duration-300",
              isActive ? "text-white" : "text-kodano-cyan"
            )} />
          </motion.div>

          {/* Pulse effect when active */}
          {isActive && (
            <motion.div
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute inset-0 bg-kodano-cyan rounded-xl"
            />
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-foreground">
          {feature.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {feature.description}
        </p>

        {/* Stats */}
        {feature.stats && (
          <div className="flex items-baseline gap-2 pt-2">
            <span className="text-2xl font-bold text-kodano-cyan">
              {feature.stats.value}
            </span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              {feature.stats.label}
            </span>
          </div>
        )}

        {/* Capabilities (show on hover) */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-2 pt-2 border-t border-border/50"
            >
              {feature.capabilities.map((capability, index) => (
                <motion.div
                  key={capability}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-kodano-cyan" />
                  <span className="text-xs text-muted-foreground">
                    {capability}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hover glow effect */}
      <div className={cn(
        "absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none",
        "bg-gradient-to-r from-kodano-cyan/20 via-transparent to-kodano-teal/20",
        isActive ? "opacity-100" : "opacity-0"
      )} />
    </motion.div>
  );
}

// Main Features Grid component
export function FeaturesGrid() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-kodano-cyan/5 to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-7xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-kodano-cyan/10 text-kodano-cyan">
            Features
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Tudo que você precisa para{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-kodano-cyan to-kodano-teal">
              escalar pagamentos
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Infraestrutura completa com ferramentas enterprise-grade para processar,
            analisar e otimizar pagamentos em escala.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <FeatureCard
                feature={feature}
                isActive={activeFeature === feature.id}
                onHover={setActiveFeature}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">
            Pronto para transformar seus pagamentos?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 rounded-full bg-gradient-to-r from-kodano-cyan to-kodano-teal text-white font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105">
              Começar agora
            </button>
            <button className="px-8 py-3 rounded-full border border-kodano-cyan/30 text-foreground font-semibold hover:bg-kodano-cyan/5 transition-all duration-300">
              Ver documentação
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}