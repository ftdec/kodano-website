/**
 * InfrastructureSection Component
 * "Infraestrutura que escala" - Premium liquidity layer positioning
 * Enterprise-grade design with sophisticated animations
 */

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Layers, Shield, FileCheck, GitBranch, ArrowRight, Sparkles, Building2 } from "lucide-react";
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
    gradient: "from-emerald-500/20 to-emerald-600/10",
  },
  {
    icon: FileCheck,
    title: "Trilha auditável",
    description: "Evidências e registros vinculados ao ledger de pagamentos.",
    gradient: "from-teal-500/20 to-teal-600/10",
  },
  {
    icon: GitBranch,
    title: "Ativação sob demanda",
    description: "Camadas adicionais disponíveis mediante avaliação de elegibilidade.",
    gradient: "from-cyan-500/20 to-cyan-600/10",
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const floatingVariants = {
  initial: { y: 0 },
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

interface InfrastructureSectionProps {
  className?: string;
  onContactClick?: () => void;
}

export function InfrastructureSection({ className, onContactClick }: InfrastructureSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleContactClick = () => {
    trackEvent('liquidez_interest_click', { source: 'infrastructure_section' });
    onContactClick?.();
  };

  return (
    <section
      ref={sectionRef}
      id="infrastructure"
      className={cn("relative py-24 sm:py-32 md:py-40 px-4 sm:px-6 overflow-hidden", className)}
    >
      {/* Premium Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-emerald-50/30 to-background" />
        
        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-gradient-radial from-emerald-500/8 via-emerald-400/4 to-transparent rounded-full blur-3xl" />
        
        {/* Decorative elements */}
        <motion.div
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          className="absolute top-20 right-[15%] w-32 h-32 bg-gradient-to-br from-emerald-400/10 to-teal-400/5 rounded-full blur-2xl"
        />
        <motion.div
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          style={{ animationDelay: "2s" }}
          className="absolute bottom-32 left-[10%] w-40 h-40 bg-gradient-to-br from-teal-400/10 to-cyan-400/5 rounded-full blur-2xl"
        />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(16,185,129,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container max-w-7xl mx-auto relative z-10"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16 sm:mb-20">
          <motion.div 
            className="inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-6 py-2.5 rounded-full bg-white/90 backdrop-blur-sm border border-emerald-200/60 shadow-lg shadow-emerald-500/5 mb-6 sm:mb-8"
            whileHover={{ scale: 1.02, boxShadow: "0 20px 40px -10px rgba(16, 185, 129, 0.15)" }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
            </motion.div>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-emerald-700">
              Infraestrutura Expandida
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-6 sm:mb-8 max-w-4xl mx-auto">
            Infraestrutura que{" "}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500">
                evolui
              </span>
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                initial={{ scaleX: 0, originX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </span>{" "}
            com sua operação
          </h2>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Para operações de alto valor, a Kodano pode ativar camadas adicionais de 
            <span className="font-medium text-foreground"> governança e liquidez</span>, 
            integradas à infraestrutura de pagamentos e evidências já existente.
          </p>
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left - How it works card (5 columns) */}
          <motion.div
            variants={cardVariants}
            className="lg:col-span-5"
          >
            <motion.div 
              className="relative p-8 sm:p-10 rounded-3xl bg-white/80 backdrop-blur-sm border border-border/50 shadow-xl shadow-emerald-500/5 overflow-hidden group"
              whileHover={{ 
                boxShadow: "0 30px 60px -15px rgba(16, 185, 129, 0.12)",
                borderColor: "rgba(16, 185, 129, 0.3)",
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Card background decoration */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 group-hover:from-emerald-500/10 transition-all duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div 
                    className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                  >
                    <Building2 className="w-6 h-6 text-white" />
                  </motion.div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                    Como funciona
                  </h3>
                </div>
                
                <div className="space-y-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Estruturas de liquidez baseadas em recebíveis podem ser conectadas 
                    ao <span className="font-medium text-foreground">ledger</span> e à 
                    <span className="font-medium text-foreground"> trilha de evidência</span> da operação.
                  </p>
                  <p>
                    Cada estrutura é desenhada <span className="font-medium text-foreground">caso a caso</span>, 
                    respeitando critérios de elegibilidade, controles internos e requisitos de compliance.
                  </p>
                </div>
                
                {/* Divider with icon */}
                <div className="flex items-center gap-4 my-8">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                  <Sparkles className="w-4 h-4 text-emerald-500/50" />
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                </div>

                <p className="text-sm text-muted-foreground/70 italic mb-8">
                  Disponível mediante avaliação.
                </p>

                {/* CTA */}
                <motion.a
                  href="#contact"
                  onClick={handleContactClick}
                  className="group/btn flex items-center justify-between p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-xl shadow-emerald-500/25 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div>
                    <p className="font-semibold text-lg">Falar com especialista</p>
                    <p className="text-sm text-white/80">Avaliação sem compromisso</p>
                  </div>
                  <motion.div 
                    className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm"
                    whileHover={{ x: 4 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Capabilities (7 columns) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;

              return (
                <motion.div
                  key={capability.title}
                  variants={cardVariants}
                  custom={index}
                  className="group"
                >
                  <motion.div
                    className="relative p-6 sm:p-8 rounded-2xl bg-white/90 backdrop-blur-sm border border-border/40 shadow-lg overflow-hidden"
                    whileHover={{ 
                      y: -4,
                      boxShadow: "0 25px 50px -12px rgba(16, 185, 129, 0.1)",
                      borderColor: "rgba(16, 185, 129, 0.25)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Background gradient on hover */}
                    <motion.div 
                      className={cn(
                        "absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                        capability.gradient
                      )}
                    />
                    
                    <div className="relative z-10 flex items-start gap-5 sm:gap-6">
                      <motion.div 
                        className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-400/5 border border-emerald-500/10 flex items-center justify-center group-hover:from-emerald-500/20 group-hover:to-emerald-400/10 group-hover:border-emerald-500/20 transition-all duration-300"
                        whileHover={{ scale: 1.05, rotate: 3 }}
                      >
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600" />
                      </motion.div>

                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 group-hover:text-emerald-700 transition-colors">
                          {capability.title}
                        </h3>
                        
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                          {capability.description}
                        </p>
                      </div>

                      {/* Arrow indicator */}
                      <motion.div
                        className="shrink-0 w-10 h-10 rounded-full bg-emerald-500/0 group-hover:bg-emerald-500/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                        initial={{ x: -10 }}
                        whileHover={{ x: 0 }}
                      >
                        <ArrowRight className="w-4 h-4 text-emerald-600" />
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom disclaimer */}
        <motion.div
          variants={itemVariants}
          className="mt-16 sm:mt-20"
        >
          <motion.div 
            className="max-w-3xl mx-auto p-6 sm:p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-border/30 text-center"
            whileHover={{ borderColor: "rgba(16, 185, 129, 0.2)" }}
          >
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Estruturas de liquidez são avaliadas <span className="font-medium text-foreground">individualmente</span> e 
              seguem critérios de <span className="font-medium text-foreground">elegibilidade</span>, 
              <span className="font-medium text-foreground"> governança</span> e 
              <span className="font-medium text-foreground"> conformidade regulatória</span>.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
