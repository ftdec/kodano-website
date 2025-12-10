/**
 * MagneticButton Component
 * Button with magnetic effect that attracts cursor
 */

"use client";

import { motion } from "framer-motion";
import { ReactNode, useRef } from "react";
import { useMagneticEffect, useReducedMotion, useIsMobile } from "@/lib/animations/hooks";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number; // 0-1, how much the button moves
  disabled?: boolean;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  className,
  strength = 0.3,
  disabled = false,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const { x, y } = useMagneticEffect(ref, strength);

  // Disable magnetic effect on mobile or reduced motion
  const shouldAnimate = !prefersReducedMotion && !isMobile && !disabled;

  return (
    <motion.button
      ref={ref}
      className={cn(
        "relative inline-flex items-center justify-center",
        className
      )}
      style={shouldAnimate ? { x, y } : {}}
      onClick={onClick}
      disabled={disabled}
      whileHover={shouldAnimate ? { scale: 1.05 } : {}}
      whileTap={shouldAnimate ? { scale: 0.98 } : {}}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      {children}
    </motion.button>
  );
}

/**
 * MagneticCard Component
 * Card with magnetic hover effect
 */
interface MagneticCardProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticCard({
  children,
  className,
  strength = 0.15,
}: MagneticCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const { x, y } = useMagneticEffect(ref, strength);

  const shouldAnimate = !prefersReducedMotion && !isMobile;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={shouldAnimate ? { x, y } : {}}
    >
      {children}
    </motion.div>
  );
}
