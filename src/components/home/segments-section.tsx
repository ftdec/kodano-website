/**
 * SegmentsSection Component
 * "Para quem é" - Cards de segmentos com animações premium
 * Stripe/CloudWalk inspired design
 */

"use client";

import { motion } from "framer-motion";
import { Building2, Plane, Stethoscope, Briefcase, Home, Car } from "lucide-react";
import {
  fadeInUp,
  staggerContainer,
} from "@/lib/animations/motion-variants";
import { useReducedMotion, useIsMobile } from "@/lib/animations/hooks";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const segments = [
  {
    title: "Turismo Premium",
    description: "Agências de viagem de luxo, resorts e experiências exclusivas que precisam de parcelamento flexível.",
    icon: <Plane className="w-6 h-6" />,
    gradient: "from-blue-500/10 to-cyan-500/10",
    borderGradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Clínicas Médicas",
    description: "Tratamentos estéticos e cirurgias de alto valor que exigem soluções de pagamento especializadas.",
    icon: <Stethoscope className="w-6 h-6" />,
    gradient: "from-purple-500/10 to-pink-500/10",
    borderGradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Consultorias B2B",
    description: "Serviços profissionais premium que operam com tickets elevados e precisam de flexibilidade.",
    icon: <Briefcase className="w-6 h-6" />,
    gradient: "from-emerald-500/10 to-teal-500/10",
    borderGradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "Arquitetura & Design",
    description: "Projetos residenciais e comerciais de luxo que requerem parcelamento customizado.",
    icon: <Home className="w-6 h-6" />,
    gradient: "from-orange-500/10 to-amber-500/10",
    borderGradient: "from-orange-500 to-amber-500",
  },
  {
    title: "Eventos Premium",
    description: "Casamentos de luxo e eventos corporativos com necessidade de pré-autorização e parcelamento.",
    icon: <Building2 className="w-6 h-6" />,
    gradient: "from-indigo-500/10 to-violet-500/10",
    borderGradient: "from-indigo-500 to-violet-500",
  },
  {
    title: "Automotivo Premium",
    description: "Concessionárias e customizações de alto valor que precisam de soluções especializadas.",
    icon: <Car className="w-6 h-6" />,
    gradient: "from-red-500/10 to-rose-500/10",
    borderGradient: "from-red-500 to-rose-500",
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
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-secondary/40 via-background to-background" />
        <div
          className={cn(
            "absolute -top-32 right-0 w-[420px] h-[420px] bg-[radial-gradient(circle_at_center,_rgba(79,172,254,0.15),_transparent_65%)]",
            isMobile ? "blur-[60px]" : "blur-[120px]"
          )}
        />
        <div
          className={cn(
            "absolute bottom-[-20%] left-[-5%] w-[520px] h-[520px] bg-[radial-gradient(circle_at_center,_rgba(0,219,222,0.12),_transparent_65%)]",
            isMobile ? "blur-[70px]" : "blur-[140px]"
          )}
        />
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
            className={cn(
              "inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/70 dark:bg-white/5 border border-border/60 mb-6",
              isMobile ? "backdrop-blur-sm" : "backdrop-blur-xl"
            )}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
              Para quem é
            </span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-heading font-semibold leading-[1.2] text-balance mb-4"
          >
            Soluções especializadas para seu segmento
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted-foreground/80 leading-relaxed text-balance"
          >
            Atendemos empresas de alto ticket médio que buscam soluções de pagamento
            especializadas para seu perfil específico.
          </motion.p>
        </motion.div>

        {/* Segments Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
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
                className={cn(
                  "group relative h-full overflow-hidden border border-border/40 bg-white/80 dark:bg-background/40 shadow-lg transition-all duration-500 cursor-pointer",
                  isMobile ? "backdrop-blur-sm" : "backdrop-blur-xl"
                )}
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
      </div>
    </section>
  );
}

