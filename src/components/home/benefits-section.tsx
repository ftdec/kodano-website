/**
 * BenefitsSection Component
 * "O Problema" - Clean, minimal design
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
    <section id="problem" className="relative py-24 md:py-32 px-6">
      {/* Background matching site pattern */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-slate-50/50 to-background" />
      
      <div className="container max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-[#00C8DC] text-sm font-medium tracking-wider uppercase mb-4">
            O Problema
          </span>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#002A35] leading-tight mb-6">
            Pagamentos de alto valor exigem{" "}
            <span className="text-[#00C8DC]">outro nível de cuidado</span>
          </h2>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Quando o valor de uma transação é relevante, fraudes, contestações e incertezas 
            sobre quem paga se tornam riscos reais para o negócio.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
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
                <div className="h-full p-8 rounded-2xl bg-white border border-slate-100 hover:border-[#00C8DC]/30 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-[#00C8DC]/10 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-[#00C8DC]" />
                  </div>

                  <h3 className="text-xl font-semibold text-[#002A35] mb-3">
                    {risk.title}
                  </h3>
                  
                  <p className="text-slate-500 leading-relaxed">
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
