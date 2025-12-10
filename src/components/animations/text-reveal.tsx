/**
 * TextReveal Component
 * Animates text with split and stagger effect
 */

"use client";

import { motion, Variants } from "framer-motion";
import { useMemo } from "react";
import { splitTextIntoWords, calculateStaggerDelay } from "@/lib/animations/utils";
import { fadeInUp, containerStagger } from "@/lib/animations/variants";
import { useReducedMotion } from "@/lib/animations/hooks";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  className?: string;
  delay?: number;
  staggerDelay?: number;
  variant?: Variants;
  once?: boolean;
}

export function TextReveal({
  text,
  as: Component = "p",
  className,
  delay = 0,
  staggerDelay = 0.05,
  variant = fadeInUp,
  once = true,
}: TextRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = useMemo(() => splitTextIntoWords(text), [text]);

  // If reduced motion, just render plain text
  if (prefersReducedMotion) {
    return <Component className={className}>{text}</Component>;
  }

  const containerVariants: Variants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  return (
    <Component className={className}>
      <motion.span
        className="inline-block"
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once, margin: "-100px" }}
      >
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            className="inline-block mr-[0.25em]"
            variants={variant}
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
}

/**
 * TextRevealCharacter Component
 * Animates text character by character
 */
interface TextRevealCharacterProps extends Omit<TextRevealProps, "text"> {
  text: string;
  preserveSpaces?: boolean;
}

export function TextRevealCharacter({
  text,
  as: Component = "p",
  className,
  delay = 0,
  staggerDelay = 0.03,
  variant = fadeInUp,
  once = true,
  preserveSpaces = true,
}: TextRevealCharacterProps) {
  const prefersReducedMotion = useReducedMotion();
  const characters = useMemo(() => text.split(""), [text]);

  if (prefersReducedMotion) {
    return <Component className={className}>{text}</Component>;
  }

  const containerVariants: Variants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  return (
    <Component className={className}>
      <motion.span
        className="inline-block"
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once, margin: "-100px" }}
      >
        {characters.map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            className={cn(
              "inline-block",
              char === " " && preserveSpaces && "w-[0.25em]"
            )}
            variants={variant}
          >
            {char === " " && !preserveSpaces ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
}

/**
 * TextRevealGradient Component
 * Text reveal with animated gradient
 */
interface TextRevealGradientProps extends TextRevealProps {
  gradient?: string;
}

export function TextRevealGradient({
  text,
  as: Component = "p",
  className,
  delay = 0,
  gradient = "from-primary via-blue-500 to-purple-500",
  ...props
}: TextRevealGradientProps) {
  return (
    <TextReveal
      text={text}
      as={Component}
      className={cn(
        "text-transparent bg-clip-text bg-gradient-to-r animate-gradient",
        gradient,
        className
      )}
      delay={delay}
      {...props}
    />
  );
}
