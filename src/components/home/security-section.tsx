/**
 * SecuritySection Component
 * Segurança & Confiabilidade com visual robusto
 * Stripe/CloudWalk inspired design
 */

"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileCheck, CheckCircle2 } from "lucide-react";
import {
  fadeInUp,
  staggerContainer,
  fadeIn,
} from "@/lib/animations/motion-variants";
import { useReducedMotion, useIsMobile } from "@/lib/animations/hooks";
import { cn } from "@/lib/utils";

const securityFeatures = [
  {
    title: "Certificação PCI-DSS",
    description: "Padrão global de segurança para processamento de cartões, validado por auditoria rigorosa.",
    icon: <Shield className="w-6 h-6" />,
    highlight: true,
  },
  {
    title: "Criptografia Ponta a Ponta",
    description: "Todos os dados sensíveis são criptografados durante transmissão e armazenamento.",
    icon: <Lock className="w-6 h-6" />,
  },
  {
    title: "Tokenização Avançada",
    description: "Armazenamento seguro de dados de cartão usando tokens, nunca armazenamos dados completos.",
    icon: <Eye className="w-6 h-6" />,
  },
  {
    title: "LGPD Compliant",
    description: "Total conformidade com a legislação brasileira de proteção de dados pessoais.",
    icon: <FileCheck className="w-6 h-6" />,
  },
];

interface SecuritySectionProps {
  className?: string;
}

export function SecuritySection({ className }: SecuritySectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  return (
    <section
      id="security"
      className={cn(
        "relative py-28 px-6 overflow-hidden bg-gradient-to-b from-background via-secondary/20 to-background",
        className
      )}
    >
      {/* Dark Background with Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Circuit-like dots */}
        <div className="absolute inset-0 opacity-[0.02]">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-foreground"
              style={{
                left: `${(i * 7) % 100}%`,
                top: `${(i * 11) % 100}%`,
                animation: prefersReducedMotion
                  ? "none"
                  : `pulse 3s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Gradient Overlays */}
        <div
          className={cn(
            "absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-primary/5 to-transparent",
            isMobile ? "blur-[60px]" : "blur-[120px]"
          )}
        />
        <div
          className={cn(
            "absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-t from-blue-500/5 to-transparent rounded-full",
            isMobile ? "blur-[70px]" : "blur-[140px]"
          )}
        />
      </div>

      <div className="container relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
        >
          <motion.div
            variants={fadeInUp}
            className={cn(
              "inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/70 dark:bg-white/5 border border-border/60 mb-6",
              isMobile ? "backdrop-blur-sm" : "backdrop-blur-xl"
            )}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-green-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
              Segurança & Confiabilidade
            </span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-heading font-semibold leading-[1.2] text-balance mb-4"
          >
            Segurança de nível bancário
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted-foreground/80 leading-relaxed text-balance"
          >
            Infraestrutura robusta com certificações internacionais e monitoramento
            contínuo para proteger cada transação.
          </motion.p>
        </motion.div>

        {/* Security Features Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 mb-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
        >
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={fadeInUp}
              custom={index}
              initial={prefersReducedMotion ? {} : { opacity: 0, filter: "blur(4px)" }}
              whileInView={
                prefersReducedMotion
                  ? {}
                  : { opacity: 1, filter: "blur(0px)" }
              }
              viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={cn(
                "relative p-6 rounded-2xl border border-border/40 bg-white/80 dark:bg-background/40 backdrop-blur-xl shadow-lg transition-all duration-500",
                feature.highlight &&
                  "ring-2 ring-primary/20 bg-gradient-to-br from-primary/5 to-transparent"
              )}
            >
              {/* Animated Background Line */}
              {!prefersReducedMotion && (
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(90deg, transparent, rgba(79, 172, 254, 0.1), transparent)`,
                  }}
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}

              <div className="relative z-10 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center text-primary shrink-0">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground/90 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8 pt-8 border-t border-border/40"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            "Monitoramento 24/7",
            "Backup e Redundância",
            "ISO 27001",
            "Auditorias Regulares",
          ].map((item, index) => (
            <motion.div
              key={item}
              className="flex items-center gap-2 text-muted-foreground"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-medium">{item}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.02; }
          50% { opacity: 0.08; }
        }
      `}</style>
    </section>
  );
}

