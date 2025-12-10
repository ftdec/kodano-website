/**
 * FadeInView Component
 * Fades in element when it enters viewport
 */

"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";
import { fadeInUp } from "@/lib/animations/variants";
import { useReducedMotion } from "@/lib/animations/hooks";
import { viewport, viewportMobile } from "@/lib/animations/constants";

interface FadeInViewProps {
  children: ReactNode;
  variant?: Variants;
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
  amount?: number;
  margin?: string;
  mobile?: boolean;
}

export function FadeInView({
  children,
  variant = fadeInUp,
  delay = 0,
  duration,
  once = true,
  className,
  amount,
  margin,
  mobile = false,
}: FadeInViewProps) {
  const prefersReducedMotion = useReducedMotion();

  const viewportConfig = mobile ? viewportMobile : viewport;

  const finalViewport = {
    once,
    margin: margin ?? viewportConfig.margin,
    amount: amount ?? viewportConfig.amount,
  };

  const transition = {
    delay,
    ...(duration && { duration }),
  };

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={variant}
      initial="initial"
      whileInView="animate"
      exit="exit"
      viewport={finalViewport}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}

/**
 * FadeInViewStagger Component
 * Container that staggers children animations
 */
interface FadeInViewStaggerProps {
  children: ReactNode;
  className?: string;
  staggerChildren?: number;
  delayChildren?: number;
  once?: boolean;
}

export function FadeInViewStagger({
  children,
  className,
  staggerChildren = 0.1,
  delayChildren = 0,
  once = true,
}: FadeInViewStaggerProps) {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants: Variants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once, margin: "-100px" }}
    >
      {children}
    </motion.div>
  );
}
