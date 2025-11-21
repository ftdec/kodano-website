/**
 * Bundle Optimization and Code Splitting Utilities
 * Stripe-level performance optimization strategies
 */

import dynamic from "next/dynamic";
import React, { ComponentType } from "react";

// ============================================================================
// DYNAMIC IMPORT CONFIGURATIONS
// ============================================================================

/**
 * Dynamic import with loading state
 * Use for heavy components that aren't needed immediately
 */
export function dynamicImport<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options?: {
    ssr?: boolean;
    loading?: ComponentType;
  }
) {
  return dynamic(importFn, {
    ssr: options?.ssr ?? true,
    loading: options?.loading
      ? () => React.createElement(options.loading as ComponentType)
      : () => null,
  });
}

// ============================================================================
// LAZY LOADED COMPONENTS
// ============================================================================

// Placeholder lazy loaded components - uncomment when implementing these features

// Heavy chart components
// export const LazyChartComponent = dynamicImport(
//   () => import("@/components/charts/advanced-chart"),
//   { ssr: false }
// );

// Animation-heavy components
// export const LazyParticleBackground = dynamicImport(
//   () => import("@/components/backgrounds/particle-background"),
//   { ssr: false }
// );

// export const Lazy3DScene = dynamicImport(
//   () => import("@/components/3d/scene"),
//   { ssr: false }
// );

// Form components (load on interaction)
// export const LazyComplexForm = dynamicImport(
//   () => import("@/components/forms/complex-form")
// );

// export const LazyFileUploader = dynamicImport(
//   () => import("@/components/forms/file-uploader"),
//   { ssr: false }
// );

// Modal components
// export const LazyVideoModal = dynamicImport(
//   () => import("@/components/modals/video-modal")
// );

// export const LazyImageGallery = dynamicImport(
//   () => import("@/components/gallery/image-gallery")
// );

// ============================================================================
// PRELOAD STRATEGIES
// ============================================================================

/**
 * Preload component on hover or focus
 * Reduces perceived loading time
 */
export function preloadOnInteraction(
  importFn: () => Promise<any>
): {
  onMouseEnter: () => void;
  onFocus: () => void;
} {
  let preloaded = false;

  const preload = () => {
    if (!preloaded) {
      preloaded = true;
      importFn();
    }
  };

  return {
    onMouseEnter: preload,
    onFocus: preload,
  };
}

/**
 * Preload component when idle
 * Uses requestIdleCallback for non-critical resources
 */
export function preloadWhenIdle(importFn: () => Promise<any>) {
  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    requestIdleCallback(() => importFn());
  } else {
    // Fallback for browsers that don't support requestIdleCallback
    setTimeout(() => importFn(), 1);
  }
}

/**
 * Preload component after delay
 * Useful for components likely to be needed soon
 */
export function preloadAfterDelay(importFn: () => Promise<any>, delay = 2000) {
  if (typeof window !== "undefined") {
    setTimeout(() => importFn(), delay);
  }
}

/**
 * Preload component when visible
 * Uses IntersectionObserver for viewport-based loading
 */
export function preloadWhenVisible(
  element: HTMLElement | null,
  importFn: () => Promise<any>,
  options?: IntersectionObserverInit
) {
  if (!element || typeof window === "undefined") return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        importFn();
        observer.disconnect();
      }
    });
  }, options);

  observer.observe(element);

  return () => observer.disconnect();
}

// ============================================================================
// RESOURCE OPTIMIZATION
// ============================================================================

/**
 * Load external script dynamically
 * Prevents render-blocking scripts
 */
export function loadScript(src: string, attributes?: Record<string, string>): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if script already exists
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;

    // Add custom attributes
    if (attributes) {
      Object.entries(attributes).forEach(([key, value]) => {
        script.setAttribute(key, value);
      });
    }

    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));

    document.head.appendChild(script);
  });
}

/**
 * Load CSS dynamically
 * Useful for theme switching or conditional styles
 */
export function loadCSS(href: string, attributes?: Record<string, string>): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if stylesheet already exists
    if (document.querySelector(`link[href="${href}"]`)) {
      resolve();
      return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;

    // Add custom attributes
    if (attributes) {
      Object.entries(attributes).forEach(([key, value]) => {
        link.setAttribute(key, value);
      });
    }

    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed to load CSS: ${href}`));

    document.head.appendChild(link);
  });
}

// ============================================================================
// IMAGE OPTIMIZATION
// ============================================================================

/**
 * Progressive image loading
 * Loads low-quality placeholder first, then full image
 */
export class ProgressiveImage {
  private placeholder: string;
  private src: string;
  private img: HTMLImageElement | null = null;

  constructor(placeholder: string, src: string) {
    this.placeholder = placeholder;
    this.src = src;
  }

  load(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.img = new Image();
      this.img.onload = () => resolve(this.src);
      this.img.onerror = reject;
      this.img.src = this.src;
    });
  }

  cancel() {
    if (this.img) {
      this.img.onload = null;
      this.img.onerror = null;
      this.img.src = "";
      this.img = null;
    }
  }
}

/**
 * Lazy load images with IntersectionObserver
 */
export function lazyLoadImages(selector = "img[data-lazy]") {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    return;
  }

  const images = document.querySelectorAll(selector);

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.dataset.lazy;

        if (src) {
          img.src = src;
          img.removeAttribute("data-lazy");
          imageObserver.unobserve(img);
        }
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// ============================================================================
// PERFORMANCE MONITORING
// ============================================================================

/**
 * Measure component render time
 */
export function measureRenderTime(componentName: string) {
  if (typeof window === "undefined" || !window.performance) return;

  const startMark = `${componentName}-start`;
  const endMark = `${componentName}-end`;
  const measureName = `${componentName}-render`;

  return {
    start: () => performance.mark(startMark),
    end: () => {
      performance.mark(endMark);
      performance.measure(measureName, startMark, endMark);

      const measure = performance.getEntriesByName(measureName)[0];
      if (measure && process.env.NODE_ENV === "development") {
        console.log(`${componentName} rendered in ${measure.duration.toFixed(2)}ms`);
      }

      // Clean up marks and measures
      performance.clearMarks(startMark);
      performance.clearMarks(endMark);
      performance.clearMeasures(measureName);

      return measure?.duration;
    },
  };
}

/**
 * Debounce expensive operations
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Throttle frequent events
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// ============================================================================
// BUNDLE SIZE HELPERS
// ============================================================================

/**
 * Tree-shake unused exports
 * Use in production builds only
 */
export const treeShake = <T>(condition: boolean, module: T): T | null => {
  return condition ? module : null;
};

/**
 * Conditional module loading based on environment
 */
export const loadForEnvironment = async (
  production: () => Promise<any>,
  development: () => Promise<any>
) => {
  if (process.env.NODE_ENV === "production") {
    return production();
  } else {
    return development();
  }
};

// ============================================================================
// PREFETCH STRATEGIES
// ============================================================================

/**
 * Prefetch route on hover
 * Next.js specific optimization
 */
export function prefetchRoute(href: string) {
  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    requestIdleCallback(() => {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = href;
      document.head.appendChild(link);
    });
  }
}

/**
 * DNS prefetch for external domains
 */
export function dnsPrefetch(domain: string) {
  if (typeof document !== "undefined") {
    const link = document.createElement("link");
    link.rel = "dns-prefetch";
    link.href = domain;
    document.head.appendChild(link);
  }
}

/**
 * Preconnect to external domains
 */
export function preconnect(domain: string) {
  if (typeof document !== "undefined") {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = domain;
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  }
}

// ============================================================================
// EXPORT OPTIMIZATION CONFIG
// ============================================================================

export const optimizationConfig = {
  // Chunk size limits
  maxChunkSize: 244 * 1024, // 244KB gzipped
  maxInitialChunkSize: 100 * 1024, // 100KB gzipped

  // Resource hints
  preconnectDomains: [
    "https://fonts.googleapis.com",
    "https://fonts.gstatic.com",
  ],

  dnsPrefetchDomains: [
    "https://www.google-analytics.com",
    "https://www.googletagmanager.com",
  ],

  // Critical CSS
  criticalCSS: `
    /* Critical above-the-fold styles */
    body { margin: 0; font-family: system-ui, -apple-system, sans-serif; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
    /* Add more critical styles */
  `,

  // Performance budgets
  budgets: {
    javascript: 300 * 1024, // 300KB
    css: 60 * 1024, // 60KB
    images: 500 * 1024, // 500KB per image
    total: 1000 * 1024, // 1MB total
  },
};