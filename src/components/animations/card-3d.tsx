/**
 * Card3D Component
 * Card with 3D tilt effect based on mouse position
 */

"use client";

import { motion } from "framer-motion";
import { ReactNode, useRef, useState } from "react";
import { useMouseTilt, useReducedMotion, useIsMobile } from "@/lib/animations/hooks";
import { cn } from "@/lib/utils";

interface Card3DProps {
  children: ReactNode;
  className?: string;
  maxRotation?: number; // degrees
  perspective?: number; // px
  glare?: boolean;
  shadow?: boolean;
}

export function Card3D({
  children,
  className,
  maxRotation = 15,
  perspective = 1000,
  glare = true,
  shadow = true,
}: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const { rotateX, rotateY } = useMouseTilt(ref, maxRotation);

  const shouldAnimate = !prefersReducedMotion && !isMobile;

  return (
    <div
      style={{
        perspective: shouldAnimate ? `${perspective}px` : undefined,
      }}
      className={cn("relative", className)}
    >
      <motion.div
        ref={ref}
        className="relative w-full h-full"
        style={
          shouldAnimate
            ? {
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }
            : {}
        }
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        {/* Content */}
        <div className="relative z-10">{children}</div>

        {/* Glare effect */}
        {glare && shouldAnimate && (
          <motion.div
            className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit]"
            style={{
              background: isHovered
                ? "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.2) 0%, transparent 50%)"
                : "none",
              mixBlendMode: "overlay",
            }}
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
          />
        )}

        {/* Dynamic shadow */}
        {shadow && shouldAnimate && (
          <motion.div
            className="absolute inset-0 -z-10 rounded-[inherit]"
            style={{
              filter: "blur(20px)",
              opacity: 0.3,
            }}
            animate={{
              translateY: isHovered ? 10 : 0,
              scale: isHovered ? 1.05 : 1,
            }}
          />
        )}
      </motion.div>
    </div>
  );
}

/**
 * Card3DLayer Component
 * For creating parallax layers inside 3D card
 */
interface Card3DLayerProps {
  children: ReactNode;
  className?: string;
  depth?: number; // 0-100, how far the layer is
}

export function Card3DLayer({ children, className, depth = 20 }: Card3DLayerProps) {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  return (
    <div
      className={className}
      style={
        !prefersReducedMotion && !isMobile
          ? {
              transform: `translateZ(${depth}px)`,
            }
          : {}
      }
    >
      {children}
    </div>
  );
}
