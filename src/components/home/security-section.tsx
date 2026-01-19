/**
 * SecuritySection Component
 * "A Solução" - Clean, modern design
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
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-100",
  },
  {
    title: "Atuação pré-aprovação",
    description: "Agimos antes que a transação seja finalizada.",
    icon: Clock,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-100",
  },
  {
    title: "Menos fraude e contestação",
    description: "Redução de disputas e prejuízos na operação.",
    icon: ShieldCheck,
    color: "text-violet-600",
    bgColor: "bg-violet-50",
    borderColor: "border-violet-100",
  },
  {
    title: "Mais previsibilidade",
    description: "Confiança para vender valores elevados.",
    icon: TrendingUp,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-100",
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
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 via-white to-white" />

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
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-200">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                  A Solução
                </span>
              </div>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                A Kodano adiciona{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
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
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm"
                  >
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm font-medium text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2 mt-4 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors group"
                whileHover={{ x: 4 }}
              >
                Saiba como funciona
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right side - Feature cards */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
          >
            {solutionFeatures.map((feature, index) => {
              const Icon = feature.icon;
              const isOdd = index % 2 === 1;

              return (
                <motion.div
                  key={feature.title}
                  variants={fadeInUp}
                  className={cn(
                    "relative p-5 rounded-2xl border bg-white shadow-sm hover:shadow-md transition-shadow duration-200",
                    feature.borderColor,
                    isOdd && "mt-6" // Stagger effect
                  )}
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                      feature.bgColor
                    )}
                  >
                    <Icon className={cn("w-6 h-6", feature.color)} />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Visual connector to next section */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-slate-500 font-medium">Veja como funciona na prática</span>
            <motion.div
              className="w-6 h-6 rounded-full border-2 border-slate-300 flex items-center justify-center"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
