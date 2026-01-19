/**
 * SecuritySection Component
 * "A Solução" - Premium, modern design with elegant animations
 */

"use client";

import { motion } from "framer-motion";
import { UserCheck, Clock, ShieldCheck, TrendingUp, Check, ArrowRight, Sparkles } from "lucide-react";
import { useIsMobile } from "@/lib/animations/hooks";
import { cn } from "@/lib/utils";

const solutionFeatures = [
  {
    title: "Verificação de identidade",
    description: "Confirmamos quem está pagando antes da aprovação.",
    icon: UserCheck,
    step: "01",
  },
  {
    title: "Atuação pré-aprovação",
    description: "Agimos antes que a transação seja finalizada.",
    icon: Clock,
    step: "02",
  },
  {
    title: "Menos fraude e contestação",
    description: "Redução de disputas e prejuízos na operação.",
    icon: ShieldCheck,
    step: "03",
  },
  {
    title: "Mais previsibilidade",
    description: "Confiança para vender valores elevados.",
    icon: TrendingUp,
    step: "04",
  },
];

const benefits = [
  { text: "Segurança para alto valor", delay: 0 },
  { text: "Menos contestações", delay: 0.1 },
  { text: "Menos fraudes", delay: 0.2 },
  { text: "Mais confiança", delay: 0.3 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

interface SecuritySectionProps {
  className?: string;
}

export function SecuritySection({ className }: SecuritySectionProps) {
  const isMobile = useIsMobile();

  return (
    <section
      id="solution"
      className={cn(
        "relative py-24 md:py-32 px-6 overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white",
        className
      )}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orb */}
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#00C8DC]/10 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[#002A35]/5 to-transparent blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container relative z-10 max-w-6xl mx-auto">
        {/* Main content area */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* Left side - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
          >
            <div className="space-y-8">
              {/* Badge */}
              <motion.div variants={itemVariants}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#00C8DC]/10 to-[#002A35]/5 border border-[#00C8DC]/20">
                  <Sparkles className="w-4 h-4 text-[#00C8DC]" />
                  <span className="text-xs font-semibold text-[#002A35] uppercase tracking-wider">
                    A Solução
                  </span>
                </div>
              </motion.div>

              {/* Title */}
              <motion.h2 
                variants={itemVariants}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#002A35] leading-[1.15]"
              >
                A Kodano adiciona{" "}
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C8DC] to-[#00D4E8]">
                    segurança
                  </span>
                  {/* Underline accent */}
                  <motion.svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 200 8"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    <motion.path
                      d="M0 4 Q50 0, 100 4 T200 4"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00C8DC" />
                        <stop offset="100%" stopColor="#00D4E8" />
                      </linearGradient>
                    </defs>
                  </motion.svg>
                </span>{" "}
                ao pagamento
              </motion.h2>

              {/* Description */}
              <motion.p 
                variants={itemVariants}
                className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl"
              >
                Atuamos no momento da aprovação, verificando a identidade do pagador. 
                Isso reduz riscos e dá mais tranquilidade para vender valores elevados.
              </motion.p>

              {/* Benefits chips */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap gap-3"
              >
                {benefits.map((benefit, i) => (
                  <motion.div
                    key={benefit.text}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + benefit.delay }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#00C8DC]/20 shadow-sm hover:shadow-md hover:border-[#00C8DC]/40 transition-all duration-300 cursor-default"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.5 + benefit.delay, type: "spring" }}
                    >
                      <Check className="w-4 h-4 text-[#00C8DC]" />
                    </motion.div>
                    <span className="text-sm font-medium text-[#002A35]">{benefit.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Button */}
              <motion.div variants={itemVariants}>
                <motion.a
                  href="#how-it-works"
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#002A35] text-white font-semibold hover:bg-[#003a4a] transition-colors group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Saiba como funciona
                  <motion.div
                    className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10"
                    whileHover={{ x: 4 }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </motion.a>
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Feature cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
            variants={containerVariants}
          >
            {solutionFeatures.map((feature, index) => {
              const Icon = feature.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  custom={index}
                  className={cn(
                    "group",
                    !isMobile && isEven && "sm:mt-8" // Offset for visual interest
                  )}
                >
                  <motion.div
                    className="relative h-full p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#00C8DC]/30 transition-all duration-500 overflow-hidden"
                    whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  >
                    {/* Hover gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00C8DC]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Step number */}
                    <div className="absolute top-4 right-4 text-4xl font-bold text-slate-100 group-hover:text-[#00C8DC]/20 transition-colors duration-500">
                      {feature.step}
                    </div>

                    {/* Icon */}
                    <motion.div
                      className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-[#00C8DC] to-[#002A35] flex items-center justify-center mb-4 shadow-lg shadow-[#00C8DC]/20"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                      
                      {/* Animated ring */}
                      <motion.div
                        className="absolute inset-0 rounded-xl border-2 border-[#00C8DC]"
                        animate={{
                          scale: [1, 1.3],
                          opacity: [0.5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.2,
                        }}
                      />
                    </motion.div>

                    {/* Content */}
                    <h3 className="relative text-lg font-bold text-[#002A35] mb-2 group-hover:text-[#00C8DC] transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="relative text-sm text-slate-500 leading-relaxed group-hover:text-slate-600 transition-colors duration-300">
                      {feature.description}
                    </p>

                    {/* Bottom line accent */}
                    <motion.div 
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#00C8DC] to-[#00D4E8]"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                      viewport={{ once: true }}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Visual connector to next section */}
        <motion.div
          className="flex justify-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-sm text-slate-500 font-medium">Veja como funciona na prática</span>
            <motion.div
              className="w-10 h-10 rounded-full border-2 border-[#00C8DC]/30 flex items-center justify-center bg-white shadow-sm"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-[#00C8DC]"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
