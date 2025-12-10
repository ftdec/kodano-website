/**
 * BenefitsSection Component
 * Grid showcasing Kodano's core benefits/features
 * With 3D card effects and staggered animations
 */

"use client";

import { motion } from "framer-motion";
import { Zap, Shield, BarChart3, Layers } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Card3D } from "@/components/animations/card-3d";
import {
  fadeInUp,
  staggerContainer,
  cardHover,
  defaultViewport,
  mobileViewport,
} from "@/lib/animations/motion-variants";
import { useIsMobile, useReducedMotion } from "@/lib/animations/hooks";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Processamento Inteligente",
    description:
      "Tecnologia avançada que otimiza cada transação para maximizar taxas de aprovação e reduzir custos.",
    icon: Layers,
    accent: {
      border: "from-[#4FACFE] via-[#00DBDE] to-[#43E97B]",
      icon: "from-[#E0F2FE] via-white to-[#F4ECFF]",
      glow: "from-[#4FACFE]/40 via-[#43E97B]/10 to-transparent",
    },
  },
  {
    title: "Retentativas Automáticas",
    description:
      "Recuperação de vendas perdidas com retentativas inteligentes e transparentes.",
    icon: Zap,
    accent: {
      border: "from-[#FAD961] via-[#F76B1C] to-[#FAD961]",
      icon: "from-[#FFF7E5] via-white to-[#FFE5D0]",
      glow: "from-[#FAD961]/40 via-[#F76B1C]/15 to-transparent",
    },
  },
  {
    title: "Conciliação Integrada",
    description:
      "Dashboard unificado para controle total de todas as suas transações e recebíveis.",
    icon: BarChart3,
    accent: {
      border: "from-[#A8FF78] via-[#78FFD6] to-[#A8FF78]",
      icon: "from-[#ECFDF5] via-white to-[#DCFCE7]",
      glow: "from-[#A8FF78]/40 via-[#78FFD6]/15 to-transparent",
    },
  },
  {
    title: "Segurança Bancária",
    description:
      "Certificação PCI-DSS e conformidade total com as normas do Banco Central.",
    icon: Shield,
    accent: {
      border: "from-[#B8C6FF] via-[#6D83F2] to-[#B8C6FF]",
      icon: "from-[#EEF2FF] via-white to-[#E0E7FF]",
      glow: "from-[#B8C6FF]/40 via-[#6D83F2]/15 to-transparent",
    },
  },
];

export function BenefitsSection() {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="concept" className="relative py-28 px-6 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/60 via-background to-background" />
      <div
        className={cn(
          "absolute -top-32 right-0 w-[420px] h-[420px] bg-[radial-gradient(circle_at_center,_rgba(65,90,119,0.25),_transparent_65%)]",
          isMobile ? "blur-[60px]" : "blur-[120px]"
        )}
      />
      <div
        className={cn(
          "absolute bottom-[-20%] left-[-5%] w-[520px] h-[520px] bg-[radial-gradient(circle_at_center,_rgba(13,27,42,0.15),_transparent_65%)]",
          isMobile ? "blur-[70px]" : "blur-[140px]"
        )}
      />
      <div className="absolute inset-x-0 top-16 hidden md:block">
        <div className="mx-auto w-[70%] rounded-[48px] border border-border/40 border-dashed h-[70vh] max-h-[520px] opacity-40" />
      </div>

      <div className="container relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={isMobile ? mobileViewport : defaultViewport}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="space-y-6">
            <div
              className={cn(
                "inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/70 dark:bg-white/5 border border-border/60",
                isMobile ? "backdrop-blur-sm" : "backdrop-blur-xl"
              )}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-sky-400 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                Tecnologia proprietária
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-heading font-semibold leading-[1.2] text-balance">
              Orquestração feita com precisão cirúrgica
            </h2>

            <p className="text-lg text-muted-foreground/80 leading-relaxed text-balance">
              Processamento feito com precisão. Automatizamos regras complexas
              de aprovação, retentativas e conciliação em uma camada inteligente
              que otimiza cada transação para máxima eficiência.
            </p>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <div className="relative max-w-5xl mx-auto">
          {/* Decorative Lines */}
          <div className="pointer-events-none absolute inset-6 hidden md:block">
            <div className="absolute left-1/2 top-0 bottom-0 border-l border-border/50 border-dashed" />
            <div className="absolute top-1/2 left-0 right-0 border-t border-border/50 border-dashed" />
          </div>

          {/* Grid */}
          <motion.div
            className="grid md:grid-cols-2 gap-6 relative"
            initial="hidden"
            whileInView="visible"
            viewport={isMobile ? mobileViewport : defaultViewport}
            variants={staggerContainer}
          >
            {features.map((feature, i) => {
              const Icon = feature.icon;

              return (
                <motion.div key={feature.title} variants={fadeInUp}>
                  <Card3D
                    maxRotation={8}
                    glare={!isMobile && !prefersReducedMotion}
                    shadow={!isMobile}
                  >
                    <Card
                      className={cn(
                        "group relative h-full overflow-hidden border border-border/40 bg-white/80 dark:bg-background/40 shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition-all",
                        isMobile
                          ? "backdrop-blur-sm duration-200"
                          : "backdrop-blur-2xl duration-500"
                      )}
                    >
                      {/* Top Border Gradient */}
                      <div
                        className={cn(
                          "absolute inset-x-0 top-0 h-1 bg-gradient-to-r",
                          feature.accent.border
                        )}
                      />

                      {/* Glow Effect on Hover */}
                      {!isMobile && (
                        <div className="absolute inset-0 pointer-events-none">
                          <div
                            className={cn(
                              "absolute inset-x-6 -top-10 h-24 bg-gradient-to-r blur-3xl opacity-0 group-hover:opacity-70 transition-all duration-700",
                              feature.accent.glow
                            )}
                          />
                        </div>
                      )}

                      <CardHeader className="relative z-10 space-y-4 p-8">
                        {/* Icon */}
                        <div className="flex items-start justify-between gap-4">
                          <div
                            className={cn(
                              "w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center text-primary shadow-inner shadow-white/60",
                              feature.accent.icon
                            )}
                          >
                            <Icon className="w-6 h-6" />
                          </div>
                        </div>

                        {/* Title */}
                        <CardTitle className="text-2xl leading-tight pt-2">
                          {feature.title}
                        </CardTitle>

                        {/* Description */}
                        <p className="text-muted-foreground/90 leading-relaxed text-base">
                          {feature.description}
                        </p>
                      </CardHeader>
                    </Card>
                  </Card3D>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
