/**
 * BenefitsSection Component
 * Grid showcasing Kodano's core benefits/features
 * With 3D card effects and staggered animations
 */

"use client";

import { motion } from "framer-motion";
import { AlertTriangle, ShieldX, Target } from "lucide-react";
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
    title: "Fraude",
    description:
      "Um único pagamento fraudulento pode gerar prejuízo significativo.",
    icon: AlertTriangle,
    accent: {
      border: "from-[#FF6B6B] via-[#FF8E53] to-[#FF6B6B]",
      icon: "from-[#FEE2E2] via-white to-[#FFE4E6]",
      glow: "from-[#FF6B6B]/40 via-[#FF8E53]/15 to-transparent",
    },
  },
  {
    title: "Contestação",
    description:
      "Sem segurança adicional, disputas podem resultar na perda do valor recebido.",
    icon: ShieldX,
    accent: {
      border: "from-[#FAD961] via-[#F76B1C] to-[#FAD961]",
      icon: "from-[#FFF7E5] via-white to-[#FFE5D0]",
      glow: "from-[#FAD961]/40 via-[#F76B1C]/15 to-transparent",
    },
  },
  {
    title: "Risco concentrado",
    description:
      "Em valores altos, cada transação importa e o erro custa caro.",
    icon: Target,
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
              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-red-400 to-orange-400 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                O Problema
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-heading font-semibold leading-[1.2] text-balance">
              Pagamentos de alto valor exigem outro nível de cuidado
            </h2>

            <p className="text-lg text-muted-foreground/80 leading-relaxed text-balance">
              Quando o valor de uma transação é relevante, fraudes, contestações e incertezas sobre quem paga se tornam riscos reais para o negócio.
            </p>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <div className="relative max-w-5xl mx-auto">
          {/* Grid */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 relative"
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
