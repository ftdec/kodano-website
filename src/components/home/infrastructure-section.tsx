/**
 * InfrastructureSection Component
 * "Infraestrutura que escala" - Liquidity layer positioning
 * Institutional, subtle, infrastructure-focused
 */

"use client";

import { motion } from "framer-motion";
import { Layers, Shield, FileCheck, GitBranch, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Analytics helper
function trackEvent(eventName: string, data?: Record<string, string>) {
  if (typeof window !== 'undefined' && (window as typeof window & { gtag?: (command: string, eventName: string, data?: Record<string, string>) => void }).gtag) {
    (window as typeof window & { gtag: (command: string, eventName: string, data?: Record<string, string>) => void }).gtag('event', eventName, data);
  }
}

const capabilities = [
  {
    icon: Shield,
    title: "Governança integrada",
    description: "Estruturas conectadas às políticas de compliance já existentes na operação.",
  },
  {
    icon: FileCheck,
    title: "Trilha auditável",
    description: "Evidências e registros vinculados ao ledger de pagamentos.",
  },
  {
    icon: GitBranch,
    title: "Ativação sob demanda",
    description: "Camadas adicionais disponíveis mediante avaliação de elegibilidade.",
  },
];

interface InfrastructureSectionProps {
  className?: string;
  onContactClick?: () => void;
}

export function InfrastructureSection({ className, onContactClick }: InfrastructureSectionProps) {
  const handleContactClick = () => {
    trackEvent('liquidez_interest_click', { source: 'infrastructure_section' });
    onContactClick?.();
  };

  return (
    <section
      id="infrastructure"
      className={cn("relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden", className)}
    >
      {/* Background - subtle differentiation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-neutral-100/30 to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-500/3 rounded-full blur-[120px]" />
      </div>

      <div className="container max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 rounded-full bg-white/80 border border-border/60 mb-4 sm:mb-6">
            <Layers className="w-4 h-4 text-primary" />
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.35em] text-muted-foreground">
              Infraestrutura Expandida
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4 sm:mb-6 max-w-3xl mx-auto">
            Infraestrutura que{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">
              evolui
            </span>{" "}
            com sua operação
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Para operações de alto valor, a Kodano pode ativar camadas adicionais de governança 
            e liquidez, integradas à infraestrutura de pagamentos e evidências já existente.
          </p>
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          
          {/* Left - Explanation (2 columns) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="p-6 sm:p-8 rounded-2xl bg-white/60 border border-border/40">
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-4">
                Como funciona
              </h3>
              <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                <p>
                  Estruturas de liquidez baseadas em recebíveis podem ser conectadas 
                  ao ledger e à trilha de evidência da operação.
                </p>
                <p>
                  Cada estrutura é desenhada caso a caso, respeitando critérios de 
                  elegibilidade, controles internos e requisitos de compliance.
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground/70 pt-2 border-t border-border/30">
                  Disponível mediante avaliação.
                </p>
              </div>
            </div>

            {/* CTA */}
            <a
              href="#contact"
              onClick={handleContactClick}
              className="group flex items-center justify-between p-4 sm:p-5 rounded-xl bg-gradient-to-r from-emerald-50 to-white border border-emerald-200/50 hover:border-emerald-300 transition-all duration-300"
            >
              <div>
                <p className="font-medium text-foreground text-sm sm:text-base">Falar com especialista</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Avaliação sem compromisso</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>
          </motion.div>

          {/* Right - Capabilities (3 columns) */}
          <div className="lg:col-span-3 grid sm:grid-cols-3 gap-4 sm:gap-6">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;

              return (
                <motion.div
                  key={capability.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-white/80 border border-border/40 hover:border-primary/20 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-400/5 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>

                  <h3 className="text-sm sm:text-base font-semibold text-foreground mb-2">
                    {capability.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {capability.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom note - very subtle */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <p className="text-xs sm:text-sm text-muted-foreground/60 max-w-xl mx-auto">
            Estruturas de liquidez são avaliadas individualmente e seguem critérios 
            de elegibilidade, governança e conformidade regulatória.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

