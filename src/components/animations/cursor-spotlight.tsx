/**
 * CursorSpotlight Component
 * Spotlight effect that follows the cursor
 */

"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import { useReducedMotion, useIsMobile } from "@/lib/animations/hooks";
import { cn } from "@/lib/utils";

interface CursorSpotlightProps {
  className?: string;
  size?: number;
  opacity?: number;
  blur?: number;
  color?: string;
  position?: "fixed" | "absolute";
}

export function CursorSpotlight({
  className,
  size = 600,
  opacity = 0.15,
  blur = 100,
  color = "rgba(99, 102, 241, 0.3)", // primary color with opacity
  position = "fixed",
}: CursorSpotlightProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY, prefersReducedMotion, isMobile]);

  if (prefersReducedMotion || isMobile) {
    return null;
  }

  const background = useMotionTemplate`radial-gradient(${size}px circle at ${x}px ${y}px, ${color}, transparent 80%)`;

  return (
    <motion.div
      className={cn(
        "pointer-events-none inset-0 z-0",
        position === "fixed" ? "fixed" : "absolute",
        className
      )}
      style={{
        background,
        opacity,
        filter: `blur(${blur}px)`,
      }}
    />
  );
}

/**
 * CursorGlow Component
 * Simple glow effect following cursor
 */
interface CursorGlowProps {
  className?: string;
  size?: number;
  color?: string;
}

export function CursorGlow({
  className,
  size = 300,
  color = "#6366f1",
}: CursorGlowProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY, prefersReducedMotion, isMobile]);

  if (prefersReducedMotion || isMobile) {
    return null;
  }

  return (
    <motion.div
      className={cn("pointer-events-none fixed z-50", className)}
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        transform: "translate(-50%, -50%)",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity: 0.3,
        filter: "blur(60px)",
      }}
    />
  );
}
