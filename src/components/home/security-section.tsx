/**
 * SecuritySection Component
 * "A Solução" - Clean, minimal design
 */

"use client";

import { motion } from "framer-motion";
import { UserCheck, Clock, ShieldCheck, TrendingUp, Check } from "lucide-react";
import { useIsMobile } from "@/lib/animations/hooks";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Verificação de identidade",
    description: "Confirmamos quem está pagando antes da aprovação.",
    icon: UserCheck,
  },
  {
    title: "Atuação pré-aprovação",
    description: "Agimos antes que a transação seja finalizada.",
    icon: Clock,
  },
  {
    title: "Menos fraude e contestação",
    description: "Redução de disputas e prejuízos na operação.",
    icon: ShieldCheck,
  },
  {
    title: "Mais previsibilidade",
    description: "Confiança para vender valores elevados.",
    icon: TrendingUp,
  },
];

const benefits = [
  "Segurança para alto valor",
  "Menos contestações",
  "Menos fraudes",
  "Mais confiança",
];

interface SecuritySectionProps {
  className?: string;
}

export function SecuritySection({ className }: SecuritySectionProps) {
  const isMobile = useIsMobile();

  return (
    <section
      id="solution"
      className={cn("relative py-24 md:py-32 px-6", className)}
    >
      {/* Background matching site pattern */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50/50 via-background to-background" />
      
      <div className="container max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block text-[#00C8DC] text-sm font-medium tracking-wider uppercase mb-4">
              A Solução
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#002A35] leading-tight mb-6">
              A Kodano adiciona{" "}
              <span className="text-[#00C8DC]">segurança</span>{" "}
              ao pagamento
            </h2>

            <p className="text-lg text-slate-600 mb-8 max-w-lg">
              Atuamos no momento da aprovação, verificando a identidade do pagador. 
              Isso reduz riscos e dá mais tranquilidade para vender valores elevados.
            </p>

            {/* Benefits */}
            <div className="flex flex-wrap gap-3">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#002A35]/5 border border-[#002A35]/10"
                >
                  <Check className="w-4 h-4 text-[#00C8DC]" />
                  <span className="text-sm font-medium text-[#002A35]">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Feature cards */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="h-full p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#00C8DC]/30 hover:bg-white hover:shadow-lg hover:shadow-slate-100 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-[#00C8DC]/10 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-[#00C8DC]" />
                    </div>

                    <h3 className="text-base font-semibold text-[#002A35] mb-2">
                      {feature.title}
                    </h3>
                    
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
