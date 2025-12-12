/**
 * HowItWorksSection Component
 * Timeline showing Kodano's process flow
 * With sequential step animations
 */

"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { Layers, Zap, BarChart3, Shield } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { AdvancedButton } from "@/components/animations/advanced-button";
import {
  fadeInUp,
  staggerContainer,
  slideInLeft,
  slideInRight,
  defaultViewport,
  mobileViewport,
} from "@/lib/animations/motion-variants";
import { useIsMobile, useReducedMotion } from "@/lib/animations/hooks";
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
    gradient: "from-[#00DBDE] to-[#43E97B]",
  },
  {
    title: "Processe Transações",
    description:
      "Nossa tecnologia processa cada transação com otimização inteligente para maximizar aprovações.",
    icon: BarChart3,
    gradient: "from-[#4FACFE] to-[#43E97B]",
  },
  {
    title: "Monitore e Otimize",
    description:
      "Acompanhe tudo em tempo real pelo dashboard e deixe nossa IA otimizar as conversões.",
    icon: Shield,
    gradient: "from-[#415A77] to-[#4FACFE]",
  },
];

export function HowItWorksSection() {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const storyRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: storyRef,
    // map whole section scroll to 0..1
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const lineScale = useTransform(smoothProgress, [0, 1], [0, 1]);

  const [activeIndex, setActiveIndex] = useState(0);
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const n = steps.length;
    const idx = Math.max(0, Math.min(n - 1, Math.floor(latest * n)));
    setActiveIndex(idx);
  });

  const activeStep = useMemo(() => steps[activeIndex] ?? steps[0], [activeIndex]);
  const isLastStep = activeIndex === steps.length - 1;

  return (
    <section
      id="process"
      ref={storyRef}
      className={cn(
        "scroll-mt-28 py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden",
        !isMobile && !prefersReducedMotion && "min-h-[240vh]"
      )}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-secondary/20 to-background" />
        <div className="absolute top-20 right-0 w-[420px] h-[420px] bg-[#4FACFE]/6 rounded-full blur-[110px]" />
        <div className="absolute bottom-10 left-[-120px] w-[520px] h-[520px] bg-[#43E97B]/5 rounded-full blur-[130px]" />
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

        {/* Desktop scroll storytelling */}
        {!isMobile && !prefersReducedMotion ? (
          <div className="relative">
            <div className="sticky top-24">
              <div className="grid grid-cols-12 gap-8 items-start">
                {/* Left: Stepper */}
                <div className="col-span-5">
                  <div className="rounded-3xl border border-border/50 bg-card/40 backdrop-blur-xl shadow-[0_30px_80px_rgba(15,23,42,0.10)] p-8">
                    <div className="mb-6">
                      <div className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                        Fluxo de ponta a ponta
                      </div>
                      <div className="mt-3 text-2xl font-semibold tracking-tight">
                        Da integração ao controle total
                      </div>
                    </div>

                    <div className="relative pl-6">
                      {/* Track */}
                      <div className="absolute left-2 top-1 bottom-1 w-px bg-border/70" />
                      {/* Progress */}
                      <motion.div
                        className="absolute left-2 top-1 bottom-1 w-px origin-top bg-gradient-to-b from-[#4FACFE] via-[#00DBDE] to-[#43E97B]"
                        style={{ scaleY: lineScale }}
                      />

                      <div className="space-y-4">
                        {steps.map((step, idx) => {
                          const isActive = idx === activeIndex;
                          const isPassed = idx < activeIndex;
                          return (
                            <motion.div
                              key={step.title}
                              className={cn(
                                "relative flex items-start gap-4 rounded-2xl p-4 transition-colors",
                                isActive ? "bg-white/60" : "hover:bg-white/40"
                              )}
                              animate={{
                                opacity: isPassed || isActive ? 1 : 0.65,
                              }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                            >
                              <div className="relative mt-1">
                                <div
                                  className={cn(
                                    "w-3 h-3 rounded-full border-2",
                                    isActive || isPassed ? "border-primary" : "border-border"
                                  )}
                                />
                                <motion.div
                                  className={cn(
                                    "absolute inset-0 rounded-full",
                                    isActive || isPassed ? "bg-primary" : "bg-transparent"
                                  )}
                                  animate={{ scale: isActive ? 1 : isPassed ? 0.9 : 0 }}
                                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                                />
                              </div>

                              <div className="min-w-0">
                                <div className="font-semibold leading-tight">{step.title}</div>
                                <div className="mt-1 text-sm text-muted-foreground leading-relaxed">
                                  {step.description}
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Active card */}
                <div className="col-span-7">
                  <div className="relative rounded-3xl border border-border/50 bg-card/40 backdrop-blur-xl shadow-[0_30px_80px_rgba(15,23,42,0.10)] overflow-hidden">
                    {/* Background wash */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/10 to-transparent" />
                      <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-[#4FACFE]/10 blur-[90px]" />
                      <div className="absolute -bottom-28 -left-28 w-[480px] h-[480px] rounded-full bg-[#43E97B]/10 blur-[100px]" />
                    </div>

                    <div className="relative p-10 min-h-[340px]">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          key={activeStep.title}
                          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <div className="flex items-start gap-4">
                            <div
                              className={cn(
                                "shrink-0 inline-flex w-14 h-14 rounded-2xl items-center justify-center bg-gradient-to-br",
                                activeStep.gradient
                              )}
                            >
                              <activeStep.icon className="w-7 h-7 text-white" />
                            </div>

                            <div className="min-w-0">
                              <div className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                                Etapa {activeIndex + 1} de {steps.length}
                              </div>
                              <h3 className="mt-3 text-3xl font-semibold tracking-tight leading-tight">
                                {activeStep.title}
                              </h3>
                              <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-xl">
                                {activeStep.description}
                              </p>
                            </div>
                          </div>

                          {/* Visual detail */}
                          <div className="mt-10 grid grid-cols-3 gap-4">
                            {[
                              { label: "Tempo de integração", value: "Minutos" },
                              { label: "Controle", value: "Total" },
                              { label: "Escala", value: "Alta" },
                            ].map((item) => (
                              <div
                                key={item.label}
                                className="rounded-2xl border border-border/50 bg-white/50 backdrop-blur-xl p-5"
                              >
                                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                                  {item.label}
                                </div>
                                <div className="mt-2 text-xl font-semibold">{item.value}</div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Pinned CTA (only when reaching the last step) */}
                  <AnimatePresence>
                    {isLastStep && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: 12, filter: "blur(10px)" }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-6 sticky bottom-8 z-20"
                        style={{ willChange: "transform, opacity" }}
                      >
                        <div className="rounded-3xl border border-border/50 bg-background/70 backdrop-blur-xl shadow-[0_24px_70px_rgba(15,23,42,0.14)] p-6 flex items-center justify-between gap-6">
                          <div className="min-w-0">
                            <div className="text-sm font-semibold tracking-tight">
                              Pronto para colocar isso em produção?
                            </div>
                            <div className="mt-1 text-sm text-muted-foreground">
                              Fale com a Kodano e desenhe a arquitetura ideal para o seu fluxo.
                            </div>
                          </div>

                          <div className="shrink-0 flex items-center gap-3">
                            <AdvancedButton
                              href="#contact"
                              variant="primary"
                              size="md"
                              className="rounded-full"
                              ripple
                              shimmer
                            >
                              Fale com o Kodano
                            </AdvancedButton>
                            <AdvancedButton
                              href="#concept"
                              variant="outline"
                              size="md"
                              className="rounded-full bg-white/50"
                              ripple
                              shimmer={false}
                            >
                              Rever benefícios
                            </AdvancedButton>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Mobile / Reduced Motion: keep timeline */
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
                    variants={isMobile ? fadeInUp : isEven ? slideInLeft : slideInRight}
                    className={cn(
                      "relative flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8",
                      isEven ? "md:text-right" : "md:flex-row-reverse md:text-left"
                    )}
                  >
                    {/* Content */}
                    <div
                      className={cn(
                        "flex-1 pl-12 sm:pl-14",
                        isEven ? "md:pl-0 md:pr-12" : "md:pl-12 md:pr-0"
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
                                boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.15)",
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
        )}

        {/* Mobile/Reduced motion CTA (simple) */}
        {(isMobile || prefersReducedMotion) && (
          <div className="mt-12 flex justify-center">
            <AdvancedButton
              href="#contact"
              variant="primary"
              size="lg"
              className="rounded-full"
              ripple={!prefersReducedMotion}
              shimmer={!prefersReducedMotion}
            >
              Fale com o Kodano
            </AdvancedButton>
          </div>
        )}
      </div>
    </section>
  );
}
