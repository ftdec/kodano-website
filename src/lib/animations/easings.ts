/**
 * Custom Easing Functions
 * Collection of easing curves for smooth animations
 */

import { Transition } from "framer-motion";

// Standard easings (cubic-bezier)
export const easeOut = [0.0, 0.0, 0.2, 1] as const;
export const easeIn = [0.4, 0.0, 1, 1] as const;
export const easeInOut = [0.4, 0.0, 0.2, 1] as const;

// Custom easings
export const smooth = [0.25, 0.1, 0.25, 1] as const;
export const expo = [0.87, 0, 0.13, 1] as const;
export const expoOut = [0.16, 1, 0.3, 1] as const;
export const sharp = [0.4, 0.0, 0.6, 1] as const;
export const snappy = [0.2, 1, 0.3, 1] as const;

// Spring presets
export const spring = {
  type: "spring",
  stiffness: 300,
  damping: 30,
} as const;

export const springBounce = {
  type: "spring",
  stiffness: 400,
  damping: 10,
  mass: 0.5,
} as const;

export const springSmooth = {
  type: "spring",
  stiffness: 200,
  damping: 40,
  mass: 1,
} as const;

export const springSnappy = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 0.3,
} as const;

// Tween presets
export const tween = {
  type: "tween",
  ease: easeOut,
} as const;

export const tweenSmooth = {
  type: "tween",
  ease: smooth,
} as const;

export const tweenExpo = {
  type: "tween",
  ease: expo,
} as const;

// Helper to create custom transition
export const createTransition = (
  duration: number,
  ease: typeof easeOut | typeof spring = easeOut,
  delay = 0
): Transition => {
  if (typeof ease === 'object' && 'type' in ease && ease.type === 'spring') {
    return {
      ...ease,
      delay,
    };
  }

  return {
    type: "tween",
    duration,
    ease: ease as number[],
    delay,
  };
};
