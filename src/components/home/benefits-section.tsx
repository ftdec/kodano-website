/**
 * BenefitsSection Component
 * "O Problema" - Riscos em pagamentos de alto valor
 * Clean, fluid design with smooth animations
 */

"use client";

import { motion } from "framer-motion";
import { AlertTriangle, ShieldX, Target } from "lucide-react";
import {
  fadeInUp,
  staggerContainer,
  defaultViewport,
  mobileViewport,
} from "@/lib/animations/motion-variants";
import { useIsMobile, useReducedMotion } from "@/lib/animations/hooks";
import { cn } from "@/lib/utils";

const risks = [
  {
    title: "Fraude",
    description: "Um único pagamento fraudulento pode gerar prejuízo significativo.",
    icon: AlertTriangle,
    color: "text-red-500",
    bgColor: "bg-red-50",
    borderColor: "border-red-100",
    iconBg: "bg-red-100",
  },
  {
    title: "Contestação",
    description: "Sem segurança adicional, disputas podem resultar na perda do valor recebido.",
    icon: ShieldX,
    color: "text-amber-500",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-100",
    iconBg: "bg-amber-100",
  },
  {
    title: "Risco concentrado",
    description: "Em valores altos, cada transação importa e o erro custa caro.",
    icon: Target,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-100",
    iconBg: "bg-blue-100",
  },
];

export function BenefitsSection() {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="concept" className="relative py-20 md:py-28 px-6 overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 via-white to-white" />
      
      <div className="container relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="max-w-2xl mx-auto text-center mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={isMobile ? mobileViewport : defaultViewport}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="space-y-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
              Pagamentos de alto valor exigem{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-900">
                outro nível de cuidado
              </span>
            </h2>

            <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto">
              Quando o valor de uma transação é relevante, fraudes, contestações e incertezas sobre quem paga se tornam riscos reais para o negócio.
            </p>
          </motion.div>
        </motion.div>

        {/* Risk Cards - Clean horizontal layout */}
        <motion.div
          className="grid md:grid-cols-3 gap-4 md:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={isMobile ? mobileViewport : defaultViewport}
          variants={staggerContainer}
        >
          {risks.map((risk, index) => {
            const Icon = risk.icon;

            return (
              <motion.div
                key={risk.title}
                variants={fadeInUp}
                custom={index}
                whileHover={
                  !prefersReducedMotion
                    ? { y: -4, transition: { duration: 0.2 } }
                    : {}
                }
              >
                <div
                  className={cn(
                    "relative h-full p-6 md:p-8 rounded-2xl border transition-all duration-300",
                    "bg-white hover:shadow-lg hover:shadow-slate-200/50",
                    risk.borderColor
                  )}
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center mb-5",
                      risk.iconBg
                    )}
                  >
                    <Icon className={cn("w-6 h-6", risk.color)} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {risk.title}
                  </h3>
                  
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                    {risk.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Subtle connector line on desktop */}
        <motion.div
          className="hidden md:flex justify-center mt-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-slate-300" />
            <span className="font-medium">Existe uma solução</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-slate-300" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
