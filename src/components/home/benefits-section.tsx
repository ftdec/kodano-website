/**
 * BenefitsSection Component
 * "O Problema" - Clean design with gradient transition
 * Kodano Bank - Emerald Premium
 */

"use client";

import { motion } from "framer-motion";
import { AlertTriangle, ShieldX, Target } from "lucide-react";

const risks = [
  {
    title: "Fraude",
    description: "Um único pagamento fraudulento pode gerar prejuízo significativo.",
    icon: AlertTriangle,
  },
  {
    title: "Contestação",
    description: "Sem segurança adicional, disputas podem resultar na perda do valor recebido.",
    icon: ShieldX,
  },
  {
    title: "Risco concentrado",
    description: "Em valores altos, cada transação importa e o erro custa caro.",
    icon: Target,
  },
];

export function BenefitsSection() {
  return (
    <section id="problem" className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 overflow-hidden">
      {/* Background gradient - transitions from hero colors */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-100/30 via-background to-neutral-100/20" />
      </div>
      
      <div className="container max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-10 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 rounded-full bg-white/80 border border-border/60 mb-4 sm:mb-6">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-700" />
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.35em] text-muted-foreground">
              O Problema
            </span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4 sm:mb-6 px-2">
            Pagamentos de alto valor exigem{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-800">
              outro nível de cuidado
            </span>
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
            Quando o valor de uma transação é relevante, fraudes, contestações e incertezas 
            sobre quem paga se tornam riscos reais para o negócio.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {risks.map((risk, index) => {
            const Icon = risk.icon;

            return (
              <motion.div
                key={risk.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="h-full p-6 sm:p-8 rounded-2xl bg-white/90 border border-border/40 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-700/5 flex items-center justify-center mb-4 sm:mb-5">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">
                    {risk.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {risk.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
