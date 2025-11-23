/**
 * GPU Acceleration Utilities
 * Stripe-level performance optimizations for animations
 */

/**
 * CSS properties for GPU acceleration
 * Apply these to animated elements for hardware acceleration
 */
export const gpuAcceleration = {
  // Force GPU layer creation
  transform: "translateZ(0)",
  willChange: "transform",
  backfaceVisibility: "hidden" as const,
  perspective: "1000px",
} as const;

/**
 * Optimized transform string for GPU acceleration
 * Use this instead of regular transform for better performance
 */
export function gpu3dTransform(
  x = 0,
  y = 0,
  z = 0,
  scale = 1,
  rotate = 0
): string {
  return `translate3d(${x}px, ${y}px, ${z}px) scale3d(${scale}, ${scale}, 1) rotate3d(0, 0, 1, ${rotate}deg)`;
}

/**
 * Motion variants with GPU optimization
 * Pre-configured for hardware acceleration
 */
export const gpuVariants = {
  hidden: {
    opacity: 0,
    transform: gpu3dTransform(0, 20, 0),
  },
  visible: {
    opacity: 1,
    transform: gpu3dTransform(0, 0, 0),
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1], // Stripe's emphasized easing
    },
  },
} as const;

/**
 * Optimized hover effect with GPU acceleration
 */
export const gpuHoverVariants = {
  rest: {
    transform: gpu3dTransform(0, 0, 0, 1),
  },
  hover: {
    transform: gpu3dTransform(0, -4, 10, 1.02),
    transition: {
      duration: 0.3,
      ease: [0.32, 0, 0.67, 0], // Stripe's default easing
    },
  },
} as const;

/**
 * Stagger children with GPU optimization
 */
export const gpuStaggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
} as const;

export const gpuStaggerItem = {
  hidden: {
    opacity: 0,
    transform: gpu3dTransform(0, 20, 0, 0.95),
  },
  visible: {
    opacity: 1,
    transform: gpu3dTransform(0, 0, 0, 1),
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
} as const;

/**
 * Apply GPU acceleration styles to an element
 */
export function applyGPUAcceleration(element: HTMLElement): void {
  Object.assign(element.style, {
    transform: "translateZ(0)",
    willChange: "transform",
    backfaceVisibility: "hidden",
  });
}

/**
 * Remove GPU acceleration (cleanup)
 */
export function removeGPUAcceleration(element: HTMLElement): void {
  element.style.transform = "";
  element.style.willChange = "";
  element.style.backfaceVisibility = "";
}

/**
 * Hook for GPU-accelerated animations
 */
export function useGPUAnimation() {
  return {
    initial: { opacity: 0, transform: gpu3dTransform(0, 20, 0) },
    animate: { opacity: 1, transform: gpu3dTransform(0, 0, 0) },
    exit: { opacity: 0, transform: gpu3dTransform(0, -20, 0) },
    whileHover: { transform: gpu3dTransform(0, -2, 5, 1.02) },
    whileTap: { transform: gpu3dTransform(0, 0, 0, 0.98) },
  };
}

// Performance monitoring for animations
export function measureAnimationPerformance(
  animationName: string,
  callback: () => void
): void {
  if (typeof window === "undefined") return;

  const startTime = performance.now();

  requestAnimationFrame(() => {
    callback();
    requestAnimationFrame(() => {
      const endTime = performance.now();
      const duration = endTime - startTime;

      // Log if animation takes longer than 16ms (60fps threshold)
      if (duration > 16) {
        console.warn(
          `Animation "${animationName}" took ${duration.toFixed(2)}ms (target: 16ms for 60fps)`
        );
      }
    });
  });
}

const GPUExports = {
  gpuAcceleration,
  gpu3dTransform,
  gpuVariants,
  gpuHoverVariants,
  gpuStaggerContainer,
  gpuStaggerItem,
  applyGPUAcceleration,
  removeGPUAcceleration,
  useGPUAnimation,
  measureAnimationPerformance,
};

export default GPUExports;