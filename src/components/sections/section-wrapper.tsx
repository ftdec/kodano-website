/**
 * Section Wrapper Components
 * Reusable wrappers for consistent section animations and layouts
 */

"use client";

import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { easings, durations } from "@/lib/design-system/motion";

// ============================================================================
// ANIMATED SECTION WRAPPER
// ============================================================================

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: "fadeIn" | "fadeInUp" | "fadeInScale" | "slideIn" | "none";
  parallax?: boolean;
  parallaxSpeed?: number;
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  animation = "fadeInUp",
  parallax = false,
  parallaxSpeed = 0.5,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [100 * parallaxSpeed, -100 * parallaxSpeed]
  );

  const animationVariants = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    fadeInUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    },
    fadeInScale: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1 },
    },
    slideIn: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 },
    },
    none: {
      hidden: {},
      visible: {},
    },
  };

  const variants = animationVariants[animation];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        delay,
        duration: durations.slow,
        ease: easings.emphasized,
      }}
      style={parallax ? { y } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// SECTION CONTAINER
// ============================================================================

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  spacing?: "sm" | "md" | "lg" | "xl";
  background?: "default" | "muted" | "accent" | "gradient" | "none";
}

export function SectionContainer({
  children,
  className,
  size = "xl",
  spacing = "lg",
  background = "none",
}: SectionContainerProps) {
  const sizeClasses = {
    sm: "max-w-3xl",
    md: "max-w-5xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
    full: "max-w-full",
  };

  const spacingClasses = {
    sm: "py-12 sm:py-16",
    md: "py-16 sm:py-20",
    lg: "py-20 sm:py-24",
    xl: "py-24 sm:py-32",
  };

  const backgroundClasses = {
    default: "bg-background",
    muted: "bg-muted/50",
    accent: "bg-accent/5",
    gradient: "bg-gradient-to-b from-background to-accent/5",
    none: "",
  };

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        spacingClasses[spacing],
        backgroundClasses[background],
        className
      )}
    >
      <div className={cn("container mx-auto px-4 sm:px-6 lg:px-8", sizeClasses[size])}>
        {children}
      </div>
    </section>
  );
}

// ============================================================================
// SECTION HEADER
// ============================================================================

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  description?: string;
  centered?: boolean;
  animated?: boolean;
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  description,
  centered = true,
  animated = true,
  className,
}: SectionHeaderProps) {
  const content = (
    <>
      {badge && (
        <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
          {badge}
        </span>
      )}

      <h2 className={cn(
        "mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl",
        centered && "mx-auto"
      )}>
        {title}
      </h2>

      {subtitle && (
        <p className="mt-2 text-xl font-medium text-accent">
          {subtitle}
        </p>
      )}

      {description && (
        <p className={cn(
          "mt-4 text-lg text-muted-foreground",
          centered && "mx-auto max-w-3xl"
        )}>
          {description}
        </p>
      )}
    </>
  );

  if (!animated) {
    return (
      <div className={cn(centered && "text-center", className)}>
        {content}
      </div>
    );
  }

  return (
    <AnimatedSection
      animation="fadeInUp"
      className={cn(centered && "text-center", className)}
    >
      {content}
    </AnimatedSection>
  );
}

// ============================================================================
// REVEAL ON SCROLL
// ============================================================================

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  stagger?: boolean;
  staggerDelay?: number;
}

export function RevealOnScroll({
  children,
  className,
  threshold = 0.1,
  stagger = false,
  staggerDelay = 0.1,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: stagger
        ? {
            staggerChildren: staggerDelay,
            delayChildren: 0.1,
          }
        : {
            duration: durations.normal,
            ease: easings.emphasized,
          },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: durations.normal,
        ease: easings.emphasized,
      },
    },
  };

  if (stagger && React.Children.count(children) > 1) {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className={className}
      >
        {React.Children.map(children, (child, index) => (
          <motion.div key={index} variants={itemVariants}>
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// PARALLAX WRAPPER
// ============================================================================

interface ParallaxWrapperProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  offset?: number;
}

export function ParallaxWrapper({
  children,
  speed = 0.5,
  className,
  offset = 0,
}: ParallaxWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [offset + 100 * speed, offset - 100 * speed]
  );

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

// ============================================================================
// FADE IN VIEW
// ============================================================================

interface FadeInViewProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}

export function FadeInView({
  children,
  className,
  delay = 0,
  duration = durations.normal,
  once = true,
}: FadeInViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{
        delay,
        duration,
        ease: easings.emphasized,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// STAGGER CONTAINER
// ============================================================================

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  delayChildren = 0,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: durations.normal,
        ease: easings.emphasized,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

// ============================================================================
// BACKGROUND DECORATION
// ============================================================================

interface BackgroundDecorationProps {
  variant?: "gradient" | "mesh" | "dots" | "grid" | "blur";
  className?: string;
}

export function BackgroundDecoration({
  variant = "gradient",
  className,
}: BackgroundDecorationProps) {
  const decorations = {
    gradient: (
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />
    ),
    mesh: (
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(at 20% 50%, rgba(65, 90, 119, 0.1) 0%, transparent 50%),
            radial-gradient(at 80% 80%, rgba(119, 141, 169, 0.08) 0%, transparent 50%),
            radial-gradient(at 40% 20%, rgba(13, 27, 42, 0.05) 0%, transparent 50%)
          `,
        }}
      />
    ),
    dots: (
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(65, 90, 119, 0.5) 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />
    ),
    grid: (
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(65, 90, 119, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(65, 90, 119, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    ),
    blur: (
      <>
        <div className="absolute -left-4 top-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -right-4 bottom-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      </>
    ),
  };

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {decorations[variant]}
    </div>
  );
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  AnimatedSection,
  SectionContainer,
  SectionHeader,
  RevealOnScroll,
  ParallaxWrapper,
  FadeInView,
  StaggerContainer,
  BackgroundDecoration,
};