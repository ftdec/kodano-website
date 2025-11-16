/**
 * Performance Monitoring and Optimization Utilities
 * Stripe-level performance tracking and optimization
 */

"use client";

import React, { useEffect, useCallback, useState } from "react";
import { usePathname } from "next/navigation";

// ============================================================================
// PERFORMANCE METRICS TYPES
// ============================================================================

interface PerformanceMetrics {
  FCP: number | null;  // First Contentful Paint
  LCP: number | null;  // Largest Contentful Paint
  FID: number | null;  // First Input Delay
  CLS: number | null;  // Cumulative Layout Shift
  TTFB: number | null; // Time to First Byte
  INP: number | null;  // Interaction to Next Paint
}

interface PerformanceConfig {
  enableLogging?: boolean;
  enableReporting?: boolean;
  reportingEndpoint?: string;
  sampleRate?: number; // 0-1, percentage of users to track
}

// ============================================================================
// WEB VITALS OBSERVER
// ============================================================================

class WebVitalsObserver {
  private metrics: PerformanceMetrics = {
    FCP: null,
    LCP: null,
    FID: null,
    CLS: null,
    TTFB: null,
    INP: null,
  };

  private config: PerformanceConfig;
  private observers: Map<string, PerformanceObserver> = new Map();

  constructor(config: PerformanceConfig = {}) {
    this.config = {
      enableLogging: false,
      enableReporting: false,
      sampleRate: 1,
      ...config,
    };

    // Only track if user is in sample
    if (Math.random() > this.config!.sampleRate!) {
      return;
    }

    this.initializeObservers();
  }

  private initializeObservers() {
    // Observe paint timing
    this.observePaintTiming();

    // Observe largest contentful paint
    this.observeLCP();

    // Observe first input delay
    this.observeFID();

    // Observe cumulative layout shift
    this.observeCLS();

    // Observe interaction to next paint
    this.observeINP();
  }

  private observePaintTiming() {
    if (!("PerformanceObserver" in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === "first-contentful-paint") {
            this.metrics.FCP = Math.round(entry.startTime);
            this.logMetric("FCP", this.metrics.FCP);
          }
        }
      });

      observer.observe({ entryTypes: ["paint"] });
      this.observers.set("paint", observer);
    } catch (e) {
      console.error("Failed to observe paint timing:", e);
    }
  }

  private observeLCP() {
    if (!("PerformanceObserver" in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.LCP = Math.round(lastEntry.startTime);
        this.logMetric("LCP", this.metrics.LCP);
      });

      observer.observe({ entryTypes: ["largest-contentful-paint"] });
      this.observers.set("lcp", observer);
    } catch (e) {
      console.error("Failed to observe LCP:", e);
    }
  }

  private observeFID() {
    if (!("PerformanceObserver" in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        const firstEntry = list.getEntries()[0] as any;
        this.metrics.FID = Math.round(firstEntry.processingStart - firstEntry.startTime);
        this.logMetric("FID", this.metrics.FID);
      });

      observer.observe({ entryTypes: ["first-input"] });
      this.observers.set("fid", observer);
    } catch (e) {
      console.error("Failed to observe FID:", e);
    }
  }

  private observeCLS() {
    if (!("PerformanceObserver" in window)) return;

    let clsValue = 0;
    let clsEntries: PerformanceEntry[] = [];

    const updateCLS = () => {
      const sessionValue = clsEntries.reduce((acc, entry: any) => acc + entry.value, 0);

      if (sessionValue > clsValue) {
        clsValue = sessionValue;
        this.metrics.CLS = Math.round(clsValue * 1000) / 1000;
        this.logMetric("CLS", this.metrics.CLS);
      }
    };

    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          clsEntries.push(entry);
        }
        updateCLS();
      });

      observer.observe({ entryTypes: ["layout-shift"] });
      this.observers.set("cls", observer);
    } catch (e) {
      console.error("Failed to observe CLS:", e);
    }
  }

  private observeINP() {
    if (!("PerformanceObserver" in window)) return;

    let worstINP = 0;

    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as PerformanceEventTiming[]) {
          if (entry.duration > worstINP) {
            worstINP = entry.duration;
            this.metrics.INP = Math.round(worstINP);
            this.logMetric("INP", this.metrics.INP);
          }
        }
      });

      observer.observe({ entryTypes: ["event"] });
      this.observers.set("inp", observer);
    } catch (e) {
      console.error("Failed to observe INP:", e);
    }
  }

  private logMetric(name: string, value: number | null) {
    if (!this.config.enableLogging) return;

    const rating = this.getRating(name, value);
    const color = rating === "good" ? "green" : rating === "needs-improvement" ? "orange" : "red";

    console.log(
      `%c[Performance] ${name}: ${value}ms (${rating})`,
      `color: ${color}; font-weight: bold;`
    );
  }

  private getRating(metric: string, value: number | null): "good" | "needs-improvement" | "poor" {
    if (value === null) return "poor";

    const thresholds: Record<string, [number, number]> = {
      FCP: [1800, 3000],
      LCP: [2500, 4000],
      FID: [100, 300],
      CLS: [0.1, 0.25],
      TTFB: [800, 1800],
      INP: [200, 500],
    };

    const [good, poor] = thresholds[metric] || [0, 0];

    if (value <= good) return "good";
    if (value <= poor) return "needs-improvement";
    return "poor";
  }

  public getMetrics(): PerformanceMetrics {
    // Calculate TTFB
    if (!this.metrics.TTFB && typeof window !== "undefined") {
      const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
      if (navigation) {
        this.metrics.TTFB = Math.round(navigation.responseStart - navigation.requestStart);
      }
    }

    return { ...this.metrics };
  }

  public report() {
    if (!this.config.enableReporting || !this.config.reportingEndpoint) return;

    const metrics = this.getMetrics();

    // Send metrics to reporting endpoint
    fetch(this.config.reportingEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        metrics,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      }),
    }).catch((error) => {
      console.error("Failed to report metrics:", error);
    });
  }

  public destroy() {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers.clear();
  }
}

// ============================================================================
// PERFORMANCE CONTEXT
// ============================================================================

interface PerformanceContextValue {
  metrics: PerformanceMetrics;
  isLoading: boolean;
  markInteraction: (name: string) => void;
}

const PerformanceContext = React.createContext<PerformanceContextValue>({
  metrics: {
    FCP: null,
    LCP: null,
    FID: null,
    CLS: null,
    TTFB: null,
    INP: null,
  },
  isLoading: true,
  markInteraction: () => {},
});

// ============================================================================
// PERFORMANCE PROVIDER
// ============================================================================

export function PerformanceProvider({
  children,
  config = {},
}: {
  children: React.ReactNode;
  config?: PerformanceConfig;
}) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    FCP: null,
    LCP: null,
    FID: null,
    CLS: null,
    TTFB: null,
    INP: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const observerRef = React.useRef<WebVitalsObserver | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Initialize observer on mount
    if (typeof window !== "undefined") {
      observerRef.current = new WebVitalsObserver(config);

      // Update metrics periodically
      const interval = setInterval(() => {
        if (observerRef.current) {
          setMetrics(observerRef.current.getMetrics());
          setIsLoading(false);
        }
      }, 1000);

      // Report on page unload
      const handleUnload = () => {
        if (observerRef.current) {
          observerRef.current.report();
        }
      };

      window.addEventListener("beforeunload", handleUnload);

      return () => {
        clearInterval(interval);
        window.removeEventListener("beforeunload", handleUnload);
        if (observerRef.current) {
          observerRef.current.destroy();
        }
      };
    }
  }, [pathname, config]);

  const markInteraction = useCallback((name: string) => {
    if (typeof window !== "undefined") {
      performance.mark(`interaction:${name}`);
    }
  }, []);

  return (
    <PerformanceContext.Provider value={{ metrics, isLoading, markInteraction }}>
      {children}
    </PerformanceContext.Provider>
  );
}

// ============================================================================
// PERFORMANCE HOOKS
// ============================================================================

export function usePerformance() {
  return React.useContext(PerformanceContext);
}

export function useInteractionTracking(interactionName: string) {
  const { markInteraction } = usePerformance();

  return useCallback(() => {
    markInteraction(interactionName);
  }, [markInteraction, interactionName]);
}

// ============================================================================
// PERFORMANCE BUDGET MONITOR
// ============================================================================

interface PerformanceBudget {
  FCP?: number;
  LCP?: number;
  FID?: number;
  CLS?: number;
  TTFB?: number;
  INP?: number;
  bundleSize?: number;
  imageSize?: number;
}

export function usePerformanceBudget(budget: PerformanceBudget) {
  const { metrics } = usePerformance();
  const [violations, setViolations] = useState<string[]>([]);

  useEffect(() => {
    const newViolations: string[] = [];

    Object.entries(budget).forEach(([key, threshold]) => {
      const value = metrics[key as keyof PerformanceMetrics];
      if (value !== null && value !== undefined && value > threshold) {
        newViolations.push(`${key} (${value}ms) exceeds budget (${threshold}ms)`);
      }
    });

    setViolations(newViolations);

    if (newViolations.length > 0 && process.env.NODE_ENV === "development") {
      console.warn("[Performance Budget Violations]", newViolations);
    }
  }, [metrics, budget]);

  return violations;
}

// ============================================================================
// LAZY LOADING WRAPPER
// ============================================================================

interface LazyComponentProps {
  loader: () => Promise<{ default: React.ComponentType<any> }>;
  fallback?: React.ReactNode;
  delay?: number;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

export function LazyComponent({
  loader,
  fallback = null,
  delay = 0,
  onLoad,
  onError,
}: LazyComponentProps) {
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const timer = setTimeout(() => {
      if (!mounted) return;

      loader()
        .then((module) => {
          if (mounted) {
            setComponent(() => module.default);
            setIsLoading(false);
            onLoad?.();
          }
        })
        .catch((err) => {
          if (mounted) {
            setError(err);
            setIsLoading(false);
            onError?.(err);
          }
        });
    }, delay);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [loader, delay, onLoad, onError]);

  if (error) {
    throw error;
  }

  if (isLoading || !Component) {
    return <>{fallback}</>;
  }

  return <Component />;
}

// ============================================================================
// RESOURCE HINTS
// ============================================================================

export function ResourceHints() {
  useEffect(() => {
    // Preconnect to critical third-party origins
    const origins = [
      "https://fonts.googleapis.com",
      "https://fonts.gstatic.com",
    ];

    origins.forEach((origin) => {
      const link = document.createElement("link");
      link.rel = "preconnect";
      link.href = origin;
      document.head.appendChild(link);
    });

    // DNS prefetch for potential resources
    const dnsPrefetchOrigins = [
      "https://www.google-analytics.com",
      "https://www.googletagmanager.com",
    ];

    dnsPrefetchOrigins.forEach((origin) => {
      const link = document.createElement("link");
      link.rel = "dns-prefetch";
      link.href = origin;
      document.head.appendChild(link);
    });
  }, []);

  return null;
}

// Export for use
export default WebVitalsObserver;