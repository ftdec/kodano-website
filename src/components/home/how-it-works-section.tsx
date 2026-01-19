/**
 * HowItWorksSection Component
 * Sophisticated scroll-driven timeline
 * Each step appears progressively as user scrolls
 */

"use client";

import { motion, useInView } from "framer-motion";
import { CreditCard, UserCheck, CheckCircle, Banknote, ArrowRight, Check } from "lucide-react";
import { useRef } from "react";
import { useIsMobile, useReducedMotion } from "@/lib/animations/hooks";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "O cliente inicia o pagamento",
    description:
      "O cliente realiza o pagamento normalmente, seja presencial ou online.",
    icon: CreditCard,
    gradient: "from-[#4FACFE] to-[#00DBDE]",
    color: "#4FACFE",
    details: ["Presencial ou online", "Todos os cartões", "Experiência fluida"],
  },
  {
    title: "A Kodano realiza a verificação de identidade",
    description:
      "Confirmamos a identidade de quem está pagando antes de aprovar a transação.",
    icon: UserCheck,
    gradient: "from-[#00DBDE] to-[#43E97B]",
    color: "#00DBDE",
    details: ["Verificação segura", "Processo rápido", "Sem fricção"],
  },
  {
    title: "Com tudo validado, o pagamento é aprovado",
    description:
      "Após a verificação, o pagamento segue para aprovação com mais segurança.",
    icon: CheckCircle,
    gradient: "from-[#415A77] to-[#4FACFE]",
    color: "#415A77",
    details: ["Aprovação segura", "Menos contestações", "Menos fraudes"],
  },
  {
    title: "A empresa recebe com mais segurança",
    description:
      "Você recebe o pagamento com a tranquilidade de saber quem pagou.",
    icon: Banknote,
    gradient: "from-[#43E97B] to-[#4FACFE]",
    color: "#43E97B",
    details: ["Recebimento tranquilo", "Menos disputas", "Mais previsibilidade"],
  },
];

// Individual step component with scroll-triggered animation
function StepCard({ step, index, totalSteps }: { step: typeof steps[0]; index: number; totalSteps: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });
  const prefersReducedMotion = useReducedMotion();
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Connection line to next step */}
      {index < totalSteps - 1 && (
        <div className="absolute left-6 md:left-8 top-16 bottom-0 w-px">
          <motion.div
            className="h-full w-full bg-gradient-to-b"
            style={{
              backgroundImage: `linear-gradient(to bottom, ${step.color}, ${steps[index + 1].color})`,
            }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.8, delay: prefersReducedMotion ? 0 : 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </div>
      )}

      <div className="flex gap-4 md:gap-6">
        {/* Step indicator */}
        <motion.div
          className="relative z-10 shrink-0"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: prefersReducedMotion ? 0 : 0.1,
          }}
        >
          <div
            className={cn(
              "w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br shadow-lg",
              step.gradient
            )}
          >
            <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
          </div>
        </motion.div>

        {/* Content card */}
        <motion.div
          className="flex-1 pb-12 md:pb-16"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{
            duration: 0.5,
            delay: prefersReducedMotion ? 0 : 0.2,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <div className="relative p-6 md:p-8 rounded-2xl bg-white/90 border border-border/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
            {/* Step number badge */}
            <div
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg"
              style={{ background: `linear-gradient(135deg, ${step.color}, ${step.color}dd)` }}
            >
              {index + 1}
            </div>

            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-2">
              Etapa {index + 1} de {totalSteps}
            </div>

            <h3 className="text-xl md:text-2xl font-bold mb-3">{step.title}</h3>

            <p className="text-muted-foreground leading-relaxed mb-5">{step.description}</p>

            {/* Details list */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.4 }}
            >
              {step.details.map((detail, i) => (
                <motion.div
                  key={detail}
                  className="flex items-center gap-2 text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{
                    delay: prefersReducedMotion ? 0 : 0.5 + i * 0.1,
                    duration: 0.3,
                  }}
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: `${step.color}20` }}
                  >
                    <Check className="w-3 h-3" style={{ color: step.color }} />
                  </div>
                  <span className="text-foreground/80">{detail}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ScrollProgress removed for performance

export function HowItWorksSection() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-50px" });

  return (
    <section
      id="process"
      ref={containerRef}
      className="scroll-mt-28 py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-secondary/20 to-background" />
      </div>

      <div className="container max-w-4xl mx-auto relative z-10">
        {/* Scroll progress removed for performance */}

        {/* Section Header */}
        <motion.div
          ref={headerRef}
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 rounded-full bg-white/80 border border-border/60 mb-4 sm:mb-6">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-gradient-to-r from-[#4FACFE] to-[#43E97B]" />
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.35em] text-muted-foreground">
              Processo Simplificado
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Como Funciona
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
            Um fluxo simples que adiciona segurança à sua operação de pagamentos.
          </p>
        </motion.div>

        {/* Steps Timeline */}
        <div className="relative pl-4 md:pl-8">
          {steps.map((step, index) => (
            <StepCard
              key={step.title}
              step={step}
              index={index}
              totalSteps={steps.length}
            />
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
          className="mt-8 md:mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.a
            href="#contact"
            className={cn(
              "group relative flex items-center gap-4 p-6 rounded-2xl border border-border/50",
              "bg-gradient-to-r from-[#4FACFE]/5 via-[#00DBDE]/5 to-[#43E97B]/5",
              "hover:from-[#4FACFE]/10 hover:via-[#00DBDE]/10 hover:to-[#43E97B]/10",
              "shadow-lg hover:shadow-xl transition-all duration-300"
            )}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4FACFE] via-[#00DBDE] to-[#43E97B] flex items-center justify-center shadow-lg">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-lg">Quer saber mais?</div>
              <div className="text-sm text-muted-foreground">
                Converse com a Kodano e avalie se faz sentido para sua operação.
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium">
              Fale Conosco
              <ArrowRight className="w-4 h-4" />
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
