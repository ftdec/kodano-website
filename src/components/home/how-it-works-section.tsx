/**
 * HowItWorksSection Component
 * Timeline showing Kodano's process flow
 * With sequential step animations
 */

"use client";

import { motion } from "framer-motion";
import { Layers, Zap, BarChart3, Shield } from "lucide-react";
import {
  fadeInUp,
  staggerContainer,
  slideInLeft,
  slideInRight,
  defaultViewport,
  mobileViewport,
} from "@/lib/animations/motion-variants";
import { useIsMobile } from "@/lib/animations/hooks";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Integração Rápida",
    description:
      "Conecte-se à nossa API RESTful moderna em minutos, com documentação clara e SDKs prontos.",
    icon: Layers,
    gradient: "from-[#4FACFE] to-[#00DBDE]",
  },
  {
    title: "Configure Pagamentos",
    description:
      "Defina suas regras de negócio, métodos de pagamento aceitos e fluxo de checkout.",
    icon: Zap,
    gradient: "from-[#FAD961] to-[#F76B1C]",
  },
  {
    title: "Processe Transações",
    description:
      "Nossa tecnologia processa cada transação com otimização inteligente para maximizar aprovações.",
    icon: BarChart3,
    gradient: "from-[#A8FF78] to-[#78FFD6]",
  },
  {
    title: "Monitore e Otimize",
    description:
      "Acompanhe tudo em tempo real pelo dashboard e deixe nossa IA otimizar as conversões.",
    icon: Shield,
    gradient: "from-[#B8C6FF] to-[#6D83F2]",
  },
];

export function HowItWorksSection() {
  const isMobile = useIsMobile();

  return (
    <section id="process" className="scroll-mt-28 py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-secondary/20 to-background" />
        <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-[#4FACFE]/5 rounded-full blur-[100px]" />
      </div>

      <div className="container max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 md:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={isMobile ? mobileViewport : defaultViewport}
          variants={staggerContainer}
        >
          <motion.div
            variants={fadeInUp}
            className={cn(
              "inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 rounded-full bg-white/70 dark:bg-white/5 border border-border/60 mb-4 sm:mb-6",
              isMobile ? "backdrop-blur-sm" : "backdrop-blur-xl"
            )}
          >
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.35em] text-muted-foreground">
              Processo Simplificado
            </span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4"
          >
            Como Funciona
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2"
          >
            Do setup à primeira transação em poucos passos.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting Line - Desktop */}
          <div className="absolute left-6 sm:left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent md:-translate-x-1/2 hidden md:block" />

          <div className="space-y-10 sm:space-y-12 md:space-y-16">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={isMobile ? mobileViewport : defaultViewport}
                  variants={
                    isMobile
                      ? fadeInUp
                      : isEven
                      ? slideInLeft
                      : slideInRight
                  }
                  className={cn(
                    "relative flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8",
                    isEven
                      ? "md:text-right"
                      : "md:flex-row-reverse md:text-left"
                  )}
                >
                  {/* Content */}
                  <div
                    className={cn(
                      "flex-1 pl-12 sm:pl-14",
                      isEven
                        ? "md:pl-0 md:pr-12"
                        : "md:pl-12 md:pr-0"
                    )}
                  >
                    {/* Card */}
                    <motion.div
                      className={cn(
                        "p-6 sm:p-8 rounded-2xl bg-card/50 border border-border/50 shadow-lg",
                        isMobile ? "backdrop-blur-sm" : "backdrop-blur-xl"
                      )}
                      whileHover={
                        !isMobile
                          ? {
                              scale: 1.02,
                              boxShadow:
                                "0 20px 40px -10px rgba(0, 0, 0, 0.15)",
                              transition: {
                                duration: 0.3,
                                ease: [0.25, 0.1, 0.25, 1],
                              },
                            }
                          : {}
                      }
                    >
                      {/* Icon Badge */}
                      <div
                        className={cn(
                          "inline-flex w-12 h-12 sm:w-14 sm:h-14 rounded-xl items-center justify-center mb-4 bg-gradient-to-br",
                          step.gradient
                        )}
                      >
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold mb-1.5 sm:mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Circle Indicator */}
                  <div className="absolute left-0 md:left-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10 md:-translate-x-1/2 shrink-0">
                    <motion.div
                      className={cn(
                        "w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-br",
                        step.gradient
                      )}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={isMobile ? mobileViewport : defaultViewport}
                      transition={{
                        delay: 0.2,
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                    />
                  </div>

                  {/* Spacer for desktop alternating layout */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
