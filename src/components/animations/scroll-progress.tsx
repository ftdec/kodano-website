/**
 * ScrollProgress Component
 * Visual scroll progress indicators
 */

"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/animations/hooks";

/**
 * ScrollProgressBar
 * Horizontal progress bar at top of page
 */
interface ScrollProgressBarProps {
  className?: string;
  height?: number;
  color?: string;
  position?: "top" | "bottom";
}

export function ScrollProgressBar({
  className,
  height = 3,
  color = "bg-primary",
  position = "top",
}: ScrollProgressBarProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <motion.div
      className={cn(
        "fixed left-0 right-0 origin-left z-50",
        position === "top" ? "top-0" : "bottom-0",
        color,
        className
      )}
      style={{
        scaleX,
        height: `${height}px`,
      }}
    />
  );
}

/**
 * ScrollProgressCircle
 * Circular progress indicator
 */
interface ScrollProgressCircleProps {
  className?: string;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
}

export function ScrollProgressCircle({
  className,
  size = 60,
  strokeWidth = 4,
  color = "stroke-primary",
  backgroundColor = "stroke-gray-200",
}: ScrollProgressCircleProps) {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div className={cn("relative", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          style={{
            pathLength,
            strokeDasharray: circumference,
            strokeDashoffset: 0,
          }}
        />
      </svg>
    </div>
  );
}

/**
 * ScrollProgressSection
 * Progress for a specific section
 */
interface ScrollProgressSectionProps {
  children: ReactNode;
  className?: string;
  showIndicator?: boolean;
  indicatorPosition?: "left" | "right";
}

export function ScrollProgressSection({
  children,
  className,
  showIndicator = true,
  indicatorPosition = "left",
}: ScrollProgressSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <div ref={ref} className={cn("relative", className)}>
      {showIndicator && !prefersReducedMotion && (
        <motion.div
          className={cn(
            "absolute top-0 bottom-0 w-0.5 bg-primary origin-top",
            indicatorPosition === "left" ? "left-0" : "right-0"
          )}
          style={{ scaleY }}
        />
      )}
      {children}
    </div>
  );
}

/**
 * ScrollProgressSteps
 * Step-by-step scroll progress
 */
interface Step {
  id: string;
  label: string;
}

interface ScrollProgressStepsProps {
  steps: Step[];
  className?: string;
}

export function ScrollProgressSteps({ steps, className }: ScrollProgressStepsProps) {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {steps.map((step, index) => {
        const stepProgress = index / (steps.length - 1);
        const nextStepProgress = (index + 1) / (steps.length - 1);

        return (
          <div key={step.id} className="flex items-center gap-3">
            <motion.div
              className="w-3 h-3 rounded-full border-2 border-primary"
              style={{
                backgroundColor: useSpring(
                  scrollYProgress.get() >= stepProgress ? "currentColor" : "transparent"
                ),
              }}
            />
            <span className="text-sm font-medium">{step.label}</span>
          </div>
        );
      })}
    </div>
  );
}

/**
 * ScrollProgressPercentage
 * Displays scroll percentage as number
 */
interface ScrollProgressPercentageProps {
  className?: string;
  decimals?: number;
}

export function ScrollProgressPercentage({
  className,
  decimals = 0,
}: ScrollProgressPercentageProps) {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <motion.div className={className}>
      <motion.span>
        {scrollYProgress.get() ? Math.round(scrollYProgress.get() * 100) : 0}%
      </motion.span>
    </motion.div>
  );
}
