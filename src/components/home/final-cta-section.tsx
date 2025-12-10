/**
 * FinalCTASection Component
 * CTA final com gradiente suave e pulso discreto
 * Stripe/CloudWalk inspired design
 */

"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  fadeInUp,
  staggerContainer,
  buttonPrimary,
} from "@/lib/animations/motion-variants";
import { useReducedMotion, useIsMobile } from "@/lib/animations/hooks";
import { cn } from "@/lib/utils";

interface FinalCTASectionProps {
  className?: string;
}

export function FinalCTASection({ className }: FinalCTASectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  return (
    <section
      id="final-cta"
      className={cn(
        "relative py-28 px-6 overflow-hidden",
        className
      )}
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-blue-500/5 to-purple-500/10" />
        <div
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/20 via-blue-500/15 to-purple-500/20 rounded-full",
            isMobile ? "blur-[100px]" : "blur-[150px]"
          )}
        />
      </div>

      <div className="container relative z-10 max-w-4xl mx-auto">
        <motion.div
          className="text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
        >
          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            className={cn(
              "inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/70 dark:bg-white/5 border border-border/60 mb-6",
              isMobile ? "backdrop-blur-sm" : "backdrop-blur-xl"
            )}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
              Pronto para começar?
            </span>
          </motion.div>

          {/* Title with Subtle Pulse */}
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1]"
            animate={
              !prefersReducedMotion
                ? {
                    scale: [1, 1.01, 1],
                  }
                : {}
            }
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Vamos escalar sua{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-purple-500">
              operação financeira?
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Nossa equipe de especialistas está pronta para desenhar a arquitetura
            ideal para o seu negócio.
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={fadeInUp}>
            <motion.a
              href="#contact"
              className="inline-flex h-14 items-center px-8 rounded-full bg-foreground text-white font-semibold transition-all gap-3 justify-center shadow-2xl shadow-foreground/30 relative overflow-hidden group text-lg"
              variants={buttonPrimary}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              {/* Shimmer Effect */}
              {!prefersReducedMotion && (
                <>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: "200%" }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                      repeatDelay: 0.5,
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                </>
              )}
              <span className="relative z-10">Fale com o Kodano</span>
              <motion.div
                className="relative z-10"
                animate={!prefersReducedMotion ? { x: [0, 4, 0] } : {}}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </motion.a>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-muted-foreground"
            variants={fadeInUp}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Resposta em 24h</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span>Consultoria Técnica</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <span>Sem compromisso</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

