/**
 * Hero Section v2.0
 * Stripe-level hero with advanced animations and visual effects
 */

"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button-v2";
import { cn } from "@/lib/utils";
import { ArrowRight, Play, ChevronDown, Sparkles } from "lucide-react";
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
          background: `
            radial-gradient(circle at 20% 50%, rgba(65, 90, 119, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(119, 141, 169, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, rgba(13, 27, 42, 0.05) 0%, transparent 50%)
          `,
        }}
      />

      {/* Floating particles */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-64 w-64 rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(65, 90, 119, ${0.05 + i * 0.01}) 0%, transparent 70%)`,
            left: `${20 + i * 15}%`,
            top: `${10 + i * 20}%`,
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10 + i * 2,
            ease: "easeInOut",
            repeat: Infinity,
            delay: i * 0.5,
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
// HERO VISUAL COMPONENT
// ============================================================================

function HeroVisual() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div
      variants={floatingVariants}
      initial="initial"
      animate="animate"
      className="relative"
    >
      {/* Main visual container */}
      <div className="relative mx-auto max-w-2xl">
        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.4,
            duration: durations.slower,
            ease: easings.emphasized,
          }}
          className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl shadow-2xl"
        >
          {/* Header bar */}
          <div className="flex items-center justify-between border-b border-border/50 bg-card/50 px-4 py-3">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Dashboard Kodano</span>
              <Sparkles className="h-3 w-3" />
            </div>
          </div>

          {/* Dashboard content */}
          <div className="p-6">
            {/* Stats cards */}
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.6 + i * 0.1,
                    duration: durations.normal,
                  }}
                  className="rounded-lg bg-background/50 p-4"
                >
                  <div className="h-2 w-16 rounded bg-accent/20" />
                  <div className="mt-2 h-4 w-12 rounded bg-accent/40" />
                </motion.div>
              ))}
            </div>

            {/* Chart area */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: durations.slow }}
              className="mt-6 rounded-lg bg-background/50 p-6"
            >
              <div className="h-32">
                <svg className="h-full w-full" viewBox="0 0 400 128">
                  <motion.path
                    d="M0,64 Q100,32 200,48 T400,64"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      delay: 1,
                      duration: 2,
                      ease: easings.emphasized,
                    }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.2" />
                      <stop offset="50%" stopColor="var(--color-accent)" stopOpacity="1" />
                      <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Play button overlay */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 shadow-xl backdrop-blur-sm">
                <Play className="ml-1 h-8 w-8 text-primary" fill="currentColor" />
              </div>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Floating badges */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: durations.normal }}
          className="absolute -left-4 top-8 rounded-lg bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-600 backdrop-blur-sm"
        >
          <span className="flex items-center gap-1">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
            API Online
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4, duration: durations.normal }}
          className="absolute -right-4 bottom-8 rounded-lg bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-600 backdrop-blur-sm"
        >
          <span className="flex items-center gap-1">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            API Online
          </span>
        </motion.div>
      </div>
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
        className="container relative z-10 mx-auto px-4 py-24 sm:px-6 lg:px-8"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-6xl"
        >
          {/* Hero content */}
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            {/* Left column - Text content */}
            <div className="text-center lg:text-left">
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
                className="mt-6 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl lg:text-7xl"
              >
                <AnimatedText text={title} />
              </motion.h1>

              {/* Description */}
              {description && (
                <motion.p
                  variants={itemVariants}
                  className="mt-6 text-lg text-muted-foreground sm:text-xl"
                >
                  {description}
                </motion.p>
              )}

              {/* CTAs */}
              <motion.div
                variants={itemVariants}
                className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start"
              >
                {primaryCta && (
                  <Button
                    asChild
                    size="lg"
                    variant="kodano"
                    className="group"
                  >
                    <Link href={primaryCta.href}>
                      {primaryCta.label}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                )}

                {secondaryCta && (
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="group"
                  >
                    <Link href={secondaryCta.href}>
                      <Play className="mr-2 h-4 w-4" />
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
              <div className="relative lg:pl-8">
                <HeroVisual />
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