/**
 * ParallaxSection Component
 * Creates parallax scrolling effect
 */

"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ReactNode, useRef } from "react";
import { useReducedMotion, useIsMobile } from "@/lib/animations/hooks";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number; // 0.5 = slower, 1.5 = faster than normal scroll
  direction?: "up" | "down";
  disabled?: boolean;
}

export function ParallaxSection({
  children,
  className,
  speed = 0.5,
  direction = "up",
  disabled = false,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculate distance based on viewport height
  const distance = typeof window !== "undefined" ? window.innerHeight * 0.5 : 200;
  const range = direction === "up" ? [-distance, distance] : [distance, -distance];

  // Adjust range based on speed
  const adjustedRange = range.map((val) => val * (1 - speed)) as [number, number];

  const y = useTransform(scrollYProgress, [0, 1], adjustedRange);

  // Disable parallax on mobile or reduced motion
  if (prefersReducedMotion || isMobile || disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}

/**
 * ParallaxLayer Component
 * For creating multi-layer parallax effects
 */
interface ParallaxLayerProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export function ParallaxLayer({
  children,
  className,
  speed = 0.5,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const distance = 200;
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [-distance * speed, distance * speed]
  );

  if (prefersReducedMotion || isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}

/**
 * ParallaxScale Component
 * Scales element based on scroll progress
 */
interface ParallaxScaleProps {
  children: ReactNode;
  className?: string;
  scaleRange?: [number, number];
}

export function ParallaxScale({
  children,
  className,
  scaleRange = [0.8, 1.2],
}: ParallaxScaleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [scaleRange[0], scaleRange[1], scaleRange[0]]
  );

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} className={className} style={{ scale }}>
      {children}
    </motion.div>
  );
}

/**
 * ParallaxOpacity Component
 * Fades element in/out based on scroll
 */
interface ParallaxOpacityProps {
  children: ReactNode;
  className?: string;
  opacityRange?: [number, number, number, number];
}

export function ParallaxOpacity({
  children,
  className,
  opacityRange = [0, 1, 1, 0],
}: ParallaxOpacityProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], opacityRange);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} className={className} style={{ opacity }}>
      {children}
    </motion.div>
  );
}
