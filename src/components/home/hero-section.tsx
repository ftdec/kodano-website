/**
 * HeroSection Component
 * Premium hero with advanced animations
 * Stripe/CloudWalk inspired design
 */

"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AnimatedBackground } from "./animated-background";
import {
  fadeIn,
  fadeInUp,
  staggerContainer,
  buttonPrimary,
  buttonSecondary,
} from "@/lib/animations/motion-variants";
import { useReducedMotion, useIsMobile } from "@/lib/animations/hooks";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  return (
    <section className={cn("relative min-h-[90vh] flex items-center justify-center pt-24 pb-32 px-6 overflow-hidden", className)}>
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Content Container */}
      <motion.div
        className="container max-w-5xl mx-auto relative z-10 text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div
          variants={fadeIn}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 dark:bg-white/5 border border-border/60 mb-8 backdrop-blur-xl"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm font-medium text-muted-foreground">
            Subadquirente Digital com Tecnologia Avançada
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          variants={fadeInUp}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]"
        >
          Pagamentos inteligentes{" "}
          <br className="hidden md:block" />
          <span className="text-foreground/90 bg-clip-text text-transparent bg-gradient-to-r from-[#4FACFE] via-[#00DBDE] to-[#43E97B]">
            para empresas modernas
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeInUp}
          className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Maximize aprovação, reduza custos e tenha controle total com APIs
          modernas e orquestração inteligente de funcionalidades.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 flex-wrap"
        >
          {/* Primary CTA */}
          <motion.a
            href="#contact"
            className="inline-flex h-12 items-center px-6 sm:px-7 rounded-full bg-foreground text-white font-medium transition-all gap-2 justify-center shadow-lg shadow-foreground/20 relative overflow-hidden group"
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
              animate={!prefersReducedMotion ? { x: [0, 3, 0] } : {}}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.div>
          </motion.a>

          {/* Secondary CTA */}
          <motion.a
            href="#process"
            className="inline-flex h-12 items-center px-6 sm:px-7 rounded-full border-2 border-border text-foreground font-medium transition-all justify-center relative overflow-hidden group"
            variants={buttonSecondary}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
          >
            {!prefersReducedMotion && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            )}
            <span className="relative z-10">Conheça nosso processo</span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      {!isMobile && !prefersReducedMotion && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-foreground/30 flex items-start justify-center p-2"
            animate={{
              borderColor: [
                "rgba(0,0,0,0.2)",
                "rgba(0,0,0,0.4)",
                "rgba(0,0,0,0.2)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="w-1 h-2 rounded-full bg-foreground/40"
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
