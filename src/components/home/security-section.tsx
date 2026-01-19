/**
 * SecuritySection Component
 * "A Solução" - Clean, modern design with Kodano brand colors
 */

"use client";

import { motion } from "framer-motion";
import { UserCheck, Clock, ShieldCheck, TrendingUp, Check, ArrowRight } from "lucide-react";
import {
  fadeInUp,
  staggerContainer,
} from "@/lib/animations/motion-variants";
import { useIsMobile } from "@/lib/animations/hooks";
import { cn } from "@/lib/utils";

const solutionFeatures = [
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
      id="security"
      className={cn(
        "relative py-20 md:py-28 px-6 overflow-hidden",
        className
      )}
    >
      {/* Background - Kodano teal gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#002A35]/5 via-white to-white" />

      <div className="container relative z-10 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left side - Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
          >
            <motion.div variants={fadeInUp} className="space-y-6">
              {/* Badge - Kodano colors */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00C8DC]/10 border border-[#00C8DC]/30">
                <div className="w-2 h-2 rounded-full bg-[#00C8DC]" />
                <span className="text-xs font-semibold text-[#002A35] uppercase tracking-wider">
                  A Solução
                </span>
              </div>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#002A35] leading-tight">
                A Kodano adiciona{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C8DC] to-[#00D4E8]">
                  segurança
                </span>{" "}
                ao pagamento
              </h2>

              {/* Description */}
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                Atuamos no momento da aprovação, verificando a identidade do pagador. 
                Isso reduz riscos e dá mais tranquilidade para vender valores elevados.
              </p>

              {/* Benefits list */}
              <div className="flex flex-wrap gap-3 pt-2">
                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#00C8DC]/20 shadow-sm"
                  >
                    <Check className="w-4 h-4 text-[#00C8DC]" />
                    <span className="text-sm font-medium text-[#002A35]">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2 mt-4 text-[#002A35] font-semibold hover:text-[#00C8DC] transition-colors group"
                whileHover={{ x: 4 }}
              >
                Saiba como funciona
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right side - Feature cards - All same size with Kodano colors */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
          >
            {solutionFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  variants={fadeInUp}
                  className="relative p-5 rounded-2xl border border-[#00C8DC]/20 bg-white shadow-sm hover:shadow-md hover:border-[#00C8DC]/40 transition-all duration-200 flex flex-col h-full min-h-[160px]"
                >
                  {/* Icon - Kodano teal */}
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br from-[#00C8DC]/10 to-[#002A35]/5">
                    <Icon className="w-6 h-6 text-[#00C8DC]" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-[#002A35] mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed flex-grow">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Visual connector to next section - Kodano colors */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-[#002A35]/70 font-medium">Veja como funciona na prática</span>
            <motion.div
              className="w-6 h-6 rounded-full border-2 border-[#00C8DC]/40 flex items-center justify-center"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#00C8DC]" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
