/**
 * ScrollIndicator Component
 * Animated scroll indicator to encourage scrolling
 */

"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/animations/hooks";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface ScrollIndicatorProps {
  className?: string;
  variant?: "mouse" | "arrow" | "dots" | "minimal";
  text?: string;
  onClick?: () => void;
}

export function ScrollIndicator({
  className,
  variant = "mouse",
  text,
  onClick,
}: ScrollIndicatorProps) {
  const [isVisible, setIsVisible] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      // Hide after scrolling 100px
      if (window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  if (!isVisible) return null;

  if (prefersReducedMotion) {
    return (
      <div
        className={cn(
          "flex flex-col items-center gap-2 cursor-pointer",
          className
        )}
        onClick={handleClick}
      >
        {text && <span className="text-sm text-muted-foreground">{text}</span>}
        <ChevronDown className="w-5 h-5 text-muted-foreground" />
      </div>
    );
  }

  return (
    <motion.div
      className={cn("flex flex-col items-center gap-2 cursor-pointer", className)}
      onClick={handleClick}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: 1 }}
    >
      {text && (
        <motion.span
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          {text}
        </motion.span>
      )}

      {variant === "mouse" && <MouseIndicator />}
      {variant === "arrow" && <ArrowIndicator />}
      {variant === "dots" && <DotsIndicator />}
      {variant === "minimal" && <MinimalIndicator />}
    </motion.div>
  );
}

function MouseIndicator() {
  return (
    <motion.div
      className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex items-start justify-center p-1.5"
      animate={{
        y: [0, -5, 0],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <motion.div
        className="w-1 h-2 rounded-full bg-muted-foreground/50"
        animate={{
          y: [0, 8, 0],
          opacity: [1, 0, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

function ArrowIndicator() {
  return (
    <motion.div
      animate={{
        y: [0, 10, 0],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <ChevronDown className="w-6 h-6 text-muted-foreground/70" />
    </motion.div>
  );
}

function DotsIndicator() {
  return (
    <div className="flex flex-col gap-1.5">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50"
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: index * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function MinimalIndicator() {
  return (
    <motion.div
      className="w-px h-12 bg-gradient-to-b from-transparent via-muted-foreground/50 to-transparent"
      animate={{
        scaleY: [1, 1.5, 1],
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

/**
 * ScrollToTop Component
 * Button to scroll back to top
 */
interface ScrollToTopProps {
  className?: string;
  threshold?: number;
}

export function ScrollToTop({ className, threshold = 400 }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <motion.button
      className={cn(
        "fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center",
        className
      )}
      onClick={scrollToTop}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={!prefersReducedMotion ? { scale: 1.1 } : {}}
      whileTap={!prefersReducedMotion ? { scale: 0.9 } : {}}
    >
      <motion.div
        animate={{
          y: [0, -3, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <ChevronDown className="w-6 h-6 rotate-180" />
      </motion.div>
    </motion.button>
  );
}
