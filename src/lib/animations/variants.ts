/**
 * Framer Motion Variants Library
 * Reusable animation variants for consistent animations across the site
 */

import { Variants } from "framer-motion";
import { durations, delays, stagger } from "./constants";
import { easeOut, smooth, expo, spring } from "./easings";

// ============================================
// FADE ANIMATIONS
// ============================================

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: durations.normal, ease: easeOut }
  },
  exit: {
    opacity: 0,
    transition: { duration: durations.fast }
  },
};

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.normal, ease: easeOut }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: durations.fast }
  },
};

export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.normal, ease: easeOut }
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: durations.fast }
  },
};

export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -30 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: durations.normal, ease: easeOut }
  },
  exit: {
    opacity: 0,
    x: 30,
    transition: { duration: durations.fast }
  },
};

export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 30 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: durations.normal, ease: easeOut }
  },
  exit: {
    opacity: 0,
    x: -30,
    transition: { duration: durations.fast }
  },
};

// ============================================
// SCALE ANIMATIONS
// ============================================

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: durations.normal, ease: easeOut }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: durations.fast }
  },
};

export const scaleInBounce: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { ...spring, duration: durations.slow }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: durations.fast }
  },
};

export const scaleInCenter: Variants = {
  initial: { opacity: 0, scale: 0 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: durations.slow, ease: expo }
  },
  exit: {
    opacity: 0,
    scale: 0,
    transition: { duration: durations.normal }
  },
};

// ============================================
// BLUR ANIMATIONS
// ============================================

export const blurIn: Variants = {
  initial: { opacity: 0, filter: "blur(10px)" },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: durations.slow, ease: smooth }
  },
  exit: {
    opacity: 0,
    filter: "blur(10px)",
    transition: { duration: durations.normal }
  },
};

export const blurInUp: Variants = {
  initial: { opacity: 0, y: 20, filter: "blur(10px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: durations.slow, ease: smooth }
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: "blur(10px)",
    transition: { duration: durations.normal }
  },
};

export const blurInScale: Variants = {
  initial: { opacity: 0, scale: 0.95, filter: "blur(10px)" },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: durations.slow, ease: smooth }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    filter: "blur(10px)",
    transition: { duration: durations.normal }
  },
};

// ============================================
// SLIDE ANIMATIONS
// ============================================

export const slideInRight: Variants = {
  initial: { opacity: 0, x: 50 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: durations.normal, ease: easeOut }
  },
  exit: {
    opacity: 0,
    x: -50,
    transition: { duration: durations.fast }
  },
};

export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -50 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: durations.normal, ease: easeOut }
  },
  exit: {
    opacity: 0,
    x: 50,
    transition: { duration: durations.fast }
  },
};

export const slideInUp: Variants = {
  initial: { opacity: 0, y: 100 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.slow, ease: expo }
  },
  exit: {
    opacity: 0,
    y: -100,
    transition: { duration: durations.normal }
  },
};

export const slideInDown: Variants = {
  initial: { opacity: 0, y: -100 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.slow, ease: expo }
  },
  exit: {
    opacity: 0,
    y: 100,
    transition: { duration: durations.normal }
  },
};

// ============================================
// CONTAINER ANIMATIONS (for stagger children)
// ============================================

export const containerStagger: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: stagger.normal,
      delayChildren: delays.short,
    },
  },
  exit: {
    transition: {
      staggerChildren: stagger.fast,
      staggerDirection: -1,
    },
  },
};

export const containerStaggerFast: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: stagger.fast,
    },
  },
  exit: {
    transition: {
      staggerChildren: stagger.fast / 2,
      staggerDirection: -1,
    },
  },
};

export const containerStaggerSlow: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: stagger.slow,
      delayChildren: delays.medium,
    },
  },
  exit: {
    transition: {
      staggerChildren: stagger.normal,
      staggerDirection: -1,
    },
  },
};

// ============================================
// ROTATE ANIMATIONS
// ============================================

export const rotateIn: Variants = {
  initial: { opacity: 0, rotate: -10 },
  animate: {
    opacity: 1,
    rotate: 0,
    transition: { duration: durations.normal, ease: easeOut }
  },
  exit: {
    opacity: 0,
    rotate: 10,
    transition: { duration: durations.fast }
  },
};

export const rotate3D: Variants = {
  initial: { opacity: 0, rotateY: 90 },
  animate: {
    opacity: 1,
    rotateY: 0,
    transition: { duration: durations.slow, ease: expo }
  },
  exit: {
    opacity: 0,
    rotateY: -90,
    transition: { duration: durations.normal }
  },
};

export const flip: Variants = {
  initial: { opacity: 0, rotateX: -90 },
  animate: {
    opacity: 1,
    rotateX: 0,
    transition: { duration: durations.slow, ease: expo }
  },
  exit: {
    opacity: 0,
    rotateX: 90,
    transition: { duration: durations.normal }
  },
};

// ============================================
// SPECIAL EFFECTS
// ============================================

export const glowPulse: Variants = {
  initial: { opacity: 0.7 },
  animate: {
    opacity: [0.7, 1, 0.7],
    scale: [1, 1.02, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
};

export const bounce: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-5, 0, -5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
};

export const float: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 0, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
      times: [0, 0.5, 1]
    }
  },
};

export const shimmer: Variants = {
  initial: { backgroundPosition: "-200% 0" },
  animate: {
    backgroundPosition: "200% 0",
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear"
    }
  },
};

// ============================================
// DRAW ANIMATIONS (for SVG)
// ============================================

export const drawLine: Variants = {
  initial: { pathLength: 0, opacity: 0 },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: durations.slower, ease: easeOut },
      opacity: { duration: durations.fast }
    }
  },
};

export const drawLineStagger: Variants = {
  initial: { pathLength: 0, opacity: 0 },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: durations.slow, ease: easeOut },
      opacity: { duration: durations.fast }
    }
  },
};

// ============================================
// PAGE TRANSITIONS
// ============================================

export const pageTransition: Variants = {
  initial: { opacity: 0, filter: "blur(10px)" },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: durations.slow, ease: smooth }
  },
  exit: {
    opacity: 0,
    filter: "blur(10px)",
    transition: { duration: durations.normal }
  },
};

export const pageSlide: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: durations.slow, ease: expo }
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: { duration: durations.normal }
  },
};

// ============================================
// UTILITY VARIANTS
// ============================================

// For reduced motion users
export const reducedMotion: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

// Hover states
export const hoverScale = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: durations.fast, ease: easeOut }
  },
  tap: {
    scale: 0.98,
    transition: { duration: durations.instant }
  },
};

export const hoverLift = {
  rest: { y: 0, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" },
  hover: {
    y: -4,
    boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
    transition: { duration: durations.fast, ease: easeOut }
  },
  tap: {
    y: -2,
    transition: { duration: durations.instant }
  },
};

export const hoverGlow = {
  rest: { opacity: 0.8 },
  hover: {
    opacity: 1,
    transition: { duration: durations.fast }
  },
};
