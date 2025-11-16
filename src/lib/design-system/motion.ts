/**
 * Kodano Motion System v5.0
 * Stripe-level animation patterns and utilities
 * Provides consistent, performant, and sophisticated motion throughout the site
 */

import { Variants, TargetAndTransition, Transition } from "framer-motion";

// ============================================================================
// MOTION PRINCIPLES
// ============================================================================
/**
 * 1. Subtle: Motion should enhance, not distract
 * 2. Consistent: Same easing and timing for similar interactions
 * 3. Purposeful: Every animation has a clear intent
 * 4. Performant: GPU-accelerated, no layout thrashing
 * 5. Accessible: Respect prefers-reduced-motion
 */

// ============================================================================
// EASINGS (Stripe-exact curves)
// ============================================================================
export const easings = {
  // Primary easings
  default: [0.32, 0, 0.67, 0] as const,         // Stripe's signature easing
  emphasized: [0.22, 1, 0.36, 1] as const,      // For important transitions

  // Standard easings
  linear: [0, 0, 1, 1] as const,
  easeIn: [0.4, 0, 1, 1] as const,
  easeOut: [0, 0, 0.2, 1] as const,
  easeInOut: [0.4, 0, 0.2, 1] as const,

  // Spring easings
  spring: [0.34, 1.56, 0.64, 1] as const,
  springSmooth: [0.43, 0.195, 0.02, 1.0] as const,

  // Back easings (use sparingly)
  backIn: [0.6, -0.28, 0.735, 0.045] as const,
  backOut: [0.175, 0.885, 0.32, 1.275] as const,
  backInOut: [0.68, -0.55, 0.265, 1.55] as const,
} as const;

// ============================================================================
// DURATIONS
// ============================================================================
export const durations = {
  instant: 0,
  micro: 0.1,
  fast: 0.15,
  normal: 0.25,
  slow: 0.35,
  slower: 0.5,
  slowest: 0.7,

  // Semantic durations
  interaction: 0.1,
  transition: 0.25,
  complex: 0.5,
  page: 0.6,
} as const;

// ============================================================================
// SPRING CONFIGS
// ============================================================================
export const springs = {
  // Stripe's spring configs
  smooth: {
    type: "spring",
    stiffness: 280,
    damping: 60,
  },

  snappy: {
    type: "spring",
    stiffness: 380,
    damping: 40,
  },

  bouncy: {
    type: "spring",
    stiffness: 600,
    damping: 20,
  },

  slow: {
    type: "spring",
    stiffness: 150,
    damping: 40,
  },

  molasses: {
    type: "spring",
    stiffness: 80,
    damping: 50,
  },
} as const;

// ============================================================================
// TRANSITION PRESETS
// ============================================================================
export const transitions = {
  // Default transitions
  default: {
    duration: durations.normal,
    ease: easings.default,
  } satisfies Transition,

  fast: {
    duration: durations.fast,
    ease: easings.default,
  } satisfies Transition,

  smooth: {
    duration: durations.slow,
    ease: easings.emphasized,
  } satisfies Transition,

  // Spring transitions
  spring: springs.smooth,
  springSnappy: springs.snappy,
  springBouncy: springs.bouncy,

  // Complex transitions
  pageTransition: {
    duration: durations.page,
    ease: easings.emphasized,
  } satisfies Transition,

  stagger: {
    staggerChildren: 0.05,
    delayChildren: 0.1,
  } satisfies Transition,

  staggerSlow: {
    staggerChildren: 0.1,
    delayChildren: 0.2,
  } satisfies Transition,
} as const;

// ============================================================================
// VARIANT PATTERNS
// ============================================================================

// Fade variants
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitions.default,
  },
  exit: {
    opacity: 0,
    transition: transitions.fast,
  },
};

// Fade + Scale variants
export const fadeScaleVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.smooth,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: transitions.fast,
  },
};

// Slide variants
export const slideUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.smooth,
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: transitions.fast,
  },
};

export const slideDownVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.smooth,
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: transitions.fast,
  },
};

export const slideLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.smooth,
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: transitions.fast,
  },
};

export const slideRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.smooth,
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: transitions.fast,
  },
};

// Container variants for staggered children
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      ...transitions.default,
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      ...transitions.fast,
      staggerChildren: 0.02,
      staggerDirection: -1,
    },
  },
};

// Card hover variants
export const cardHoverVariants: Variants = {
  rest: {
    scale: 1,
    transition: transitions.spring,
  },
  hover: {
    scale: 1.02,
    transition: transitions.spring,
  },
  tap: {
    scale: 0.98,
    transition: transitions.fast,
  },
};

// Button variants
export const buttonVariants: Variants = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: transitions.spring,
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: durations.instant,
    },
  },
};

// Text reveal variants (for hero headings)
export const textRevealVariants: Variants = {
  hidden: {
    y: "100%",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: durations.slower,
      ease: easings.emphasized,
    },
  },
};

// Background gradient animation variants
export const gradientVariants: Variants = {
  initial: {
    backgroundPosition: "0% 50%",
  },
  animate: {
    backgroundPosition: "100% 50%",
    transition: {
      duration: 5,
      ease: "linear",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

// ============================================================================
// HOVER EFFECTS
// ============================================================================

export const hoverEffects = {
  // Lift effect (cards, buttons)
  lift: {
    y: -4,
    transition: transitions.spring,
  } satisfies TargetAndTransition,

  // Scale effect
  scale: {
    scale: 1.05,
    transition: transitions.spring,
  } satisfies TargetAndTransition,

  // Brighten effect
  brighten: {
    filter: "brightness(1.1)",
    transition: transitions.default,
  } satisfies TargetAndTransition,

  // Glow effect
  glow: {
    boxShadow: "0 0 20px rgba(13, 27, 42, 0.1)",
    transition: transitions.default,
  } satisfies TargetAndTransition,
};

// ============================================================================
// TAP EFFECTS
// ============================================================================

export const tapEffects = {
  // Depress effect
  depress: {
    scale: 0.95,
    transition: {
      duration: durations.instant,
    },
  } satisfies TargetAndTransition,

  // Push down effect
  pushDown: {
    y: 2,
    transition: {
      duration: durations.instant,
    },
  } satisfies TargetAndTransition,
};

// ============================================================================
// SCROLL ANIMATIONS
// ============================================================================

export const scrollAnimations = {
  // Viewport settings
  viewport: {
    once: true,
    margin: "-100px",
    amount: 0.3,
  },

  // Fade in on scroll
  fadeInScroll: {
    initial: "hidden",
    whileInView: "visible",
    viewport: {
      once: true,
      margin: "-100px",
    },
    variants: fadeVariants,
  },

  // Slide up on scroll
  slideUpScroll: {
    initial: "hidden",
    whileInView: "visible",
    viewport: {
      once: true,
      margin: "-100px",
    },
    variants: slideUpVariants,
  },

  // Scale on scroll
  scaleScroll: {
    initial: "hidden",
    whileInView: "visible",
    viewport: {
      once: true,
      margin: "-100px",
    },
    variants: fadeScaleVariants,
  },
};

// ============================================================================
// PARALLAX SETTINGS
// ============================================================================

export const parallax = {
  slow: {
    y: ["0%", "-10%"],
    transition: {
      duration: 0,
    },
  },

  medium: {
    y: ["0%", "-20%"],
    transition: {
      duration: 0,
    },
  },

  fast: {
    y: ["0%", "-30%"],
    transition: {
      duration: 0,
    },
  },
};

// ============================================================================
// GESTURE ANIMATIONS
// ============================================================================

export const gestures = {
  // Draggable constraints
  dragConstraints: {
    top: -10,
    right: 10,
    bottom: 10,
    left: -10,
  },

  // Drag elastic
  dragElastic: 0.2,

  // Drag transition
  dragTransition: {
    bounceStiffness: 600,
    bounceDamping: 20,
  },
};

// ============================================================================
// PAGE TRANSITIONS
// ============================================================================

export const pageTransitions = {
  // Fade page transition
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: transitions.pageTransition,
  },

  // Slide page transition
  slide: {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "-100%" },
    transition: transitions.pageTransition,
  },

  // Scale page transition
  scale: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.1, opacity: 0 },
    transition: transitions.pageTransition,
  },
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Creates a stagger delay for list items
 */
export function staggerDelay(index: number, baseDelay = 0.05): number {
  return index * baseDelay;
}

/**
 * Creates viewport config for scroll animations
 */
export function createViewport(
  once = true,
  margin = "-100px",
  amount = 0.3
) {
  return {
    once,
    margin,
    amount,
  };
}

/**
 * Checks if user prefers reduced motion
 */
export function shouldReduceMotion(): boolean {
  if (typeof window === "undefined") return false;

  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  return mediaQuery.matches;
}

/**
 * Returns animation props based on reduced motion preference
 */
export function getMotionProps(props: any, reducedProps: any = {}) {
  if (shouldReduceMotion()) {
    return reducedProps;
  }
  return props;
}

// ============================================================================
// COMPONENT MOTION PRESETS
// ============================================================================

export const componentMotion = {
  // Hero section
  hero: {
    container: {
      initial: "hidden",
      animate: "visible",
      variants: containerVariants,
    },
    heading: {
      variants: textRevealVariants,
    },
    description: {
      variants: slideUpVariants,
    },
    cta: {
      variants: fadeScaleVariants,
    },
  },

  // Cards
  card: {
    container: {
      variants: fadeScaleVariants,
      whileHover: "hover",
      whileTap: "tap",
    },
    hover: cardHoverVariants,
  },

  // Buttons
  button: {
    whileHover: "hover",
    whileTap: "tap",
    variants: buttonVariants,
  },

  // Navigation
  nav: {
    link: {
      whileHover: { scale: 1.05 },
      whileTap: { scale: 0.95 },
      transition: transitions.spring,
    },
    dropdown: {
      initial: { opacity: 0, y: -10 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -10 },
      transition: transitions.fast,
    },
  },

  // Modals
  modal: {
    overlay: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: transitions.fast,
    },
    content: {
      initial: { scale: 0.95, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.95, opacity: 0 },
      transition: transitions.smooth,
    },
  },
};

// ============================================================================
// EXPORT
// ============================================================================

export const motion = {
  easings,
  durations,
  springs,
  transitions,
  variants: {
    fade: fadeVariants,
    fadeScale: fadeScaleVariants,
    slideUp: slideUpVariants,
    slideDown: slideDownVariants,
    slideLeft: slideLeftVariants,
    slideRight: slideRightVariants,
    container: containerVariants,
    cardHover: cardHoverVariants,
    button: buttonVariants,
    textReveal: textRevealVariants,
    gradient: gradientVariants,
  },
  hover: hoverEffects,
  tap: tapEffects,
  scroll: scrollAnimations,
  parallax,
  gestures,
  page: pageTransitions,
  component: componentMotion,
  utils: {
    staggerDelay,
    createViewport,
    shouldReduceMotion,
    getMotionProps,
  },
} as const;

export default motion;