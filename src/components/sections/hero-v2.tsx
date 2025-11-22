/**
 * Hero Section v2.0
 * Stripe-level hero with advanced animations and visual effects
 */

"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button-v2";
import { cn } from "@/lib/utils";
import { ArrowRight, Play, ChevronDown, Sparkles, Zap } from "lucide-react";
import { easings, durations } from "@/lib/design-system/motion";

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.slow,
      ease: easings.emphasized,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: durations.slower,
      ease: easings.spring,
    },
  },
};

const floatingVariants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      ease: "easeInOut" as const,
      repeat: Infinity,
    },
  },
};

// ============================================================================
// ANIMATED BACKGROUND COMPONENT
// ============================================================================

function AnimatedBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const backgroundX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const backgroundY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Primary gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/5" />

      {/* Animated mesh gradient */}
      <motion.div
        className="absolute -inset-[100%] opacity-30"
        style={{
          x: backgroundX,
          y: backgroundY,
          willChange: 'transform',
          background: `
            radial-gradient(circle at 20% 50%, rgba(65, 90, 119, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(119, 141, 169, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, rgba(13, 27, 42, 0.05) 0%, transparent 50%)
          `,
        }}
      />

      {/* Reduced floating particles from 5 to 3 */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-64 w-64 rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(65, 90, 119, ${0.05 + i * 0.01}) 0%, transparent 70%)`,
            left: `${20 + i * 25}%`,
            top: `${10 + i * 30}%`,
            willChange: 'transform',
          }}
          animate={{
            x: [0, 20, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12 + i * 2,
            ease: "easeInOut",
            repeat: Infinity,
            delay: i * 0.8,
          }}
        />
      ))}

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(65, 90, 119, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(65, 90, 119, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  );
}

// ============================================================================
// ANIMATED TEXT COMPONENT
// ============================================================================

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

function AnimatedText({ text, className, delay = 0 }: AnimatedTextProps) {
  const words = text.split(" ");

  return (
    <motion.span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: durations.slow,
            ease: easings.emphasized,
            delay: delay + i * 0.05,
          }}
        >
          {word}
          {i < words.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </motion.span>
  );
}

// ============================================================================
// HERO METRICS COMPONENT
// ============================================================================

function HeroMetrics() {
  // Métricas removidas - não podemos exibir informações falsas
  return null;
}

// ============================================================================
// HERO VISUAL COMPONENT - ANIMATED PAYMENT FLOW
// ============================================================================

function HeroVisual() {
  // Use useMemo to prevent recalculation on every render
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Only start animations when component is visible
    setIsVisible(true);
  }, []);

  return (
    <motion.div
      variants={floatingVariants}
      initial="initial"
      animate="animate"
      className="relative w-full"
    >
      {/* Animated payment flow visualization */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 0.4,
          duration: durations.slower,
          ease: easings.emphasized,
        }}
        className="relative aspect-square max-w-full overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card/80 via-card/60 to-card/80 backdrop-blur-xl shadow-2xl"
        style={{ willChange: 'transform' }}
      >
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(65, 90, 119, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(65, 90, 119, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* SVG Container - Optimized with reduced animations */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 400 400"
          preserveAspectRatio="xMidYMid meet"
          style={{ willChange: 'contents' }}
        >
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0" />
              <stop offset="50%" stopColor="var(--color-accent)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="hubGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-accent)" />
              <stop offset="100%" stopColor="var(--color-primary)" />
            </linearGradient>
          </defs>

          {/* Reduced to 3 animated connection lines (was 6) */}
          {Array.from({ length: 3 }).map((_, i) => {
            const angle = (i / 3) * Math.PI * 2;
            const radius = 120;
            const centerX = 200;
            const centerY = 200;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;

            return (
              <motion.line
                key={`line-${i}`}
                x1={centerX}
                y1={centerY}
                x2={x}
                y2={y}
                stroke="url(#lineGradient)"
                strokeWidth="2"
                strokeDasharray="5,5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isVisible ? {
                  pathLength: [0, 1, 0],
                  opacity: [0, 0.5, 0],
                } : {}}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
                style={{ willChange: 'opacity' }}
              />
            );
          })}

          {/* Reduced to 6 static nodes with subtle pulse (was 12 animated) */}
          {Array.from({ length: 6 }).map((_, i) => {
            const angle = (i / 6) * Math.PI * 2;
            const radius = 120;
            const centerX = 200;
            const centerY = 200;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;

            return (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r="6"
                fill="var(--color-accent)"
                animate={isVisible ? {
                  opacity: [0.6, 0.9, 0.6],
                } : { opacity: 0.6 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
                style={{ willChange: 'opacity' }}
              />
            );
          })}

          {/* Central hub - simplified animation */}
          <motion.circle
            cx="200"
            cy="200"
            r="40"
            fill="url(#hubGradient)"
            animate={isVisible ? {
              opacity: [0.9, 1, 0.9],
            } : { opacity: 0.9 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ willChange: 'opacity' }}
          />
          <circle
            cx="200"
            cy="200"
            r="32"
            fill="var(--background)"
            fillOpacity="0.8"
          />
        </svg>

        {/* Central hub icon overlay - simplified rotation */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
          <motion.div
            className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent to-primary"
            animate={isVisible ? {
              scale: [1, 1.05, 1],
            } : { scale: 1 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ willChange: 'transform' }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm">
              <Zap className="h-6 w-6 text-accent" />
            </div>
          </motion.div>
        </div>

        {/* Reduced floating particles from 20 to 8 */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute h-1 w-1 rounded-full bg-accent/40"
            style={{
              left: `${20 + (i * 10)}%`,
              top: `${20 + (i * 8)}%`,
              willChange: 'transform',
            }}
            animate={isVisible ? {
              y: [0, -20, 0],
              opacity: [0, 0.6, 0],
            } : { opacity: 0 }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Status badges */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: durations.normal }}
          className="absolute left-4 top-4 rounded-lg bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-600 backdrop-blur-sm border border-green-500/20"
        >
          <span className="flex items-center gap-1">
            <motion.div
              className="h-1.5 w-1.5 rounded-full bg-green-500"
              animate={isVisible ? { scale: [1, 1.3, 1] } : { scale: 1 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Sistema Online
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4, duration: durations.normal }}
          className="absolute right-4 bottom-4 rounded-lg bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-600 backdrop-blur-sm border border-blue-500/20"
        >
          <span className="flex items-center gap-1">
            <motion.div
              className="h-1.5 w-1.5 rounded-full bg-blue-500"
              animate={isVisible ? { scale: [1, 1.3, 1] } : { scale: 1 }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
            Processando
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ============================================================================
// MAIN HERO SECTION COMPONENT
// ============================================================================

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description?: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  showMetrics?: boolean;
  showVisual?: boolean;
  className?: string;
}

export function HeroSection({
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  showMetrics = true,
  showVisual = true,
  className,
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.5]);

  return (
    <section
      ref={sectionRef}
      className={cn("relative min-h-screen overflow-hidden", className)}
    >
      {/* Animated background */}
      <AnimatedBackground />

      {/* Main content */}
      <motion.div
        style={{ y, opacity }}
        className="container relative z-10 mx-auto px-4 py-16 sm:px-6 lg:px-8 sm:py-24"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-7xl"
        >
          {/* Hero content */}
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center min-h-[600px]">
            {/* Left column - Text content */}
            <div className="text-center lg:text-left space-y-6">
              {/* Badge */}
              <motion.div variants={itemVariants} className="inline-block">
                <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
                  <Sparkles className="h-3.5 w-3.5" />
                  {subtitle}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                variants={titleVariants}
                className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl lg:text-6xl xl:text-7xl leading-tight"
              >
                <AnimatedText text={title} />
              </motion.h1>

              {/* Description */}
              {description && (
                <motion.p
                  variants={itemVariants}
                  className="text-base text-muted-foreground sm:text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0"
                >
                  {description}
                </motion.p>
              )}

              {/* CTAs */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start pt-2"
              >
                {primaryCta && (
                  <Button
                    asChild
                    size="lg"
                    variant="kodano"
                    className="group"
                    rightIcon={<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
                  >
                    <Link href={primaryCta.href}>
                      {primaryCta.label}
                    </Link>
                  </Button>
                )}

                {secondaryCta && (
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="group"
                    leftIcon={<Play className="h-4 w-4" />}
                  >
                    <Link href={secondaryCta.href}>
                      {secondaryCta.label}
                    </Link>
                  </Button>
                )}
              </motion.div>

              {/* Metrics */}
              {showMetrics && <HeroMetrics />}
            </div>

            {/* Right column - Visual */}
            {showVisual && (
              <div className="relative flex items-center justify-center lg:pl-8">
                <div className="w-full max-w-lg">
                  <HeroVisual />
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: durations.slow }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-xs font-medium">Scroll para explorar</span>
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;