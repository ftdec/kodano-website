/**
 * BenefitsSection Component
 * "O Problema" - Premium, modern design with elegant animations
 */

"use client";

import { motion } from "framer-motion";
import { AlertTriangle, ShieldX, Target, ArrowDown } from "lucide-react";
import { useIsMobile } from "@/lib/animations/hooks";

const risks = [
  {
    title: "Fraude",
    description: "Um único pagamento fraudulento pode gerar prejuízo significativo.",
    icon: AlertTriangle,
    gradient: "from-red-500 to-orange-500",
    shadowColor: "shadow-red-500/20",
    number: "01",
  },
  {
    title: "Contestação",
    description: "Sem segurança adicional, disputas podem resultar na perda do valor recebido.",
    icon: ShieldX,
    gradient: "from-amber-500 to-yellow-500",
    shadowColor: "shadow-amber-500/20",
    number: "02",
  },
  {
    title: "Risco concentrado",
    description: "Em valores altos, cada transação importa e o erro custa caro.",
    icon: Target,
    gradient: "from-[#00C8DC] to-[#002A35]",
    shadowColor: "shadow-[#00C8DC]/20",
    number: "03",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: "easeOut" as const,
    },
  }),
};

export function BenefitsSection() {
  const isMobile = useIsMobile();

  return (
    <section id="problem" className="relative py-24 md:py-32 px-6 overflow-hidden bg-[#002A35]">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-[#00C8DC]/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#00C8DC]/5 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 200, 220, 0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(0, 200, 220, 0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>
      
      <div className="container relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16 md:mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
            <div className="w-2 h-2 rounded-full bg-[#00C8DC] animate-pulse" />
            <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">
              O Problema
            </span>
          </motion.div>

          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6"
          >
            Pagamentos de alto valor exigem{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C8DC] to-[#00D4E8]">
              outro nível de cuidado
            </span>
          </motion.h2>

          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto"
          >
            Quando o valor de uma transação é relevante, fraudes, contestações e incertezas sobre quem paga se tornam riscos reais para o negócio.
          </motion.p>
        </motion.div>

        {/* Risk Cards - Premium glass design */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
        >
          {risks.map((risk, index) => {
            const Icon = risk.icon;

            return (
              <motion.div
                key={risk.title}
                custom={index}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group"
              >
                <div className="relative h-full p-8 rounded-3xl bg-white/[0.03] backdrop-blur-sm border border-white/10 hover:border-[#00C8DC]/30 transition-all duration-500 overflow-hidden">
                  {/* Card glow on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#00C8DC]/5 via-transparent to-transparent" />
                  
                  {/* Number indicator */}
                  <div className="absolute top-6 right-6 text-5xl font-bold text-white/[0.03] group-hover:text-[#00C8DC]/10 transition-colors duration-500">
                    {risk.number}
                  </div>

                  {/* Icon with gradient background */}
                  <motion.div
                    className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${risk.gradient} flex items-center justify-center mb-6 shadow-lg ${risk.shadowColor}`}
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                    
                    {/* Icon pulse ring */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${risk.gradient} opacity-0`}
                      animate={{
                        scale: [1, 1.3],
                        opacity: [0.4, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                    />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-[#00C8DC] transition-colors duration-300">
                    {risk.title}
                  </h3>
                  
                  <p className="text-white/50 leading-relaxed text-base group-hover:text-white/70 transition-colors duration-300">
                    {risk.description}
                  </p>

                  {/* Bottom accent line */}
                  <motion.div 
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${risk.gradient}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Connector to next section */}
        <motion.div
          className="flex flex-col items-center mt-16 md:mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.div 
            className="flex items-center gap-4 px-6 py-3 rounded-full bg-[#00C8DC]/10 border border-[#00C8DC]/20 backdrop-blur-sm"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-sm md:text-base font-medium text-[#00C8DC]">
              Existe uma solução
            </span>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown className="w-4 h-4 text-[#00C8DC]" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
