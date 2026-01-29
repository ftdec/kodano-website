/**
 * SegmentsSection Component
 * "Para quem é" - Cards de segmentos com animações premium
 * Kodano Bank - Emerald Premium
 */

"use client";

import { motion } from "framer-motion";
import { Plane, Building2, Car } from "lucide-react";
import {
  fadeInUp,
  staggerContainer,
} from "@/lib/animations/motion-variants";
import { useReducedMotion, useIsMobile } from "@/lib/animations/hooks";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const segments = [
  {
    title: "Automotivo",
    description: "Concessionárias e oficinas que recebem valores elevados em serviços, peças, revisões ou entrada de veículos.",
    icon: <Car className="w-6 h-6" />,
    gradient: "from-emerald-600/10 to-emerald-500/10",
    borderGradient: "from-emerald-600 to-emerald-500",
  },
  {
    title: "Turismo",
    description: "Agências e operadoras de viagens sob medida, com vendas consultivas e valores elevados.",
    icon: <Plane className="w-6 h-6" />,
    gradient: "from-emerald-500/10 to-emerald-400/10",
    borderGradient: "from-emerald-500 to-emerald-400",
  },
  {
    title: "Imobiliário",
    description: "Locações e transações de alto padrão, onde é essencial saber exatamente quem está pagando.",
    icon: <Building2 className="w-6 h-6" />,
    gradient: "from-emerald-400/10 to-emerald-300/10",
    borderGradient: "from-emerald-400 to-emerald-300",
  },
];

interface SegmentsSectionProps {
  className?: string;
}

export function SegmentsSection({ className }: SegmentsSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  return (
    <section
      id="segments"
      className={cn(
        "relative py-28 px-6 overflow-hidden",
        className
      )}
    >
      {/* Background - transitions with emerald tones */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background via-emerald-50/30 to-background" />
      </div>

      <div className="container relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white border border-border/60 mb-6"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
              Para quem é
            </span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-heading font-semibold leading-[1.2] text-balance mb-4"
          >
            Indicada para empresas que operam com valores elevados
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted-foreground/80 leading-relaxed text-balance"
          >
            Funciona melhor quando cada transação é relevante e o risco precisa ser controlado.
          </motion.p>
        </motion.div>

        {/* Segments Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
        >
          {segments.map((segment, index) => (
            <motion.div
              key={segment.title}
              variants={fadeInUp}
              custom={index}
              whileHover={
                !prefersReducedMotion
                  ? {
                      scale: 1.02,
                      y: -4,
                      transition: { duration: 0.3, ease: "easeOut" },
                    }
                  : {}
              }
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className="group relative h-full overflow-hidden border border-border/40 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                {/* Animated Border Gradient */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg",
                    segment.borderGradient
                  )}
                  style={{
                    padding: "2px",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />

                {/* Background Gradient */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                    segment.gradient
                  )}
                />

                <CardHeader className="relative z-10 space-y-4 p-6">
                  {/* Icon */}
                  <motion.div
                    className={cn(
                      "w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center text-primary shadow-inner shadow-white/60 mb-2",
                      segment.gradient
                    )}
                    whileHover={
                      !prefersReducedMotion
                        ? {
                            rotate: [0, -5, 5, -5, 0],
                            scale: 1.1,
                          }
                        : {}
                    }
                    transition={{ duration: 0.5 }}
                  >
                    {segment.icon}
                  </motion.div>

                  <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors">
                    {segment.title}
                  </CardTitle>

                  <CardDescription className="text-muted-foreground/90 leading-relaxed">
                    {segment.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Closing Statement */}
        <motion.div
          className="mt-12 text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
        >
          <p className="text-xl md:text-2xl font-medium text-foreground/90 italic">
            "Quando o valor é alto, a segurança precisa estar no mesmo nível."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
