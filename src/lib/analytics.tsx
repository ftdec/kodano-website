/**
 * Analytics and Monitoring Setup
 * Stripe-level analytics tracking and monitoring
 */

"use client";

import React, { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// ============================================================================
// ANALYTICS TYPES
// ============================================================================

interface AnalyticsEvent {
  event: string;
  category?: string;
  action?: string;
  label?: string;
  value?: number;
  properties?: Record<string, any>;
}

interface PageViewEvent {
  url: string;
  title: string;
  referrer?: string;
}

interface UserProperties {
  userId?: string;
  email?: string;
  plan?: string;
  company?: string;
  [key: string]: any;
}

// ============================================================================
// GOOGLE ANALYTICS 4
// ============================================================================

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

class GoogleAnalytics {
  private initialized = false;
  private measurementId: string;

  constructor(measurementId: string) {
    this.measurementId = measurementId;
  }

  initialize() {
    if (this.initialized || !this.measurementId || typeof window === "undefined") {
      return;
    }

    // Load Google Analytics script
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`;
    document.head.appendChild(script);

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer?.push(arguments);
    };

    window.gtag("js", new Date());
    window.gtag("config", this.measurementId, {
      page_path: window.location.pathname,
      send_page_view: true,
    });

    this.initialized = true;
  }

  pageView({ url, title }: PageViewEvent) {
    if (!this.initialized || typeof window === "undefined") return;

    window.gtag?.("config", this.measurementId, {
      page_path: url,
      page_title: title,
    });
  }

  event({ event, category, action, label, value, properties }: AnalyticsEvent) {
    if (!this.initialized || typeof window === "undefined") return;

    window.gtag?.("event", event, {
      event_category: category,
      event_action: action,
      event_label: label,
      value: value,
      ...properties,
    });
  }

  setUserProperties(properties: UserProperties) {
    if (!this.initialized || typeof window === "undefined") return;

    window.gtag?.("set", { user_properties: properties });
  }

  timing(category: string, variable: string, value: number, label?: string) {
    if (!this.initialized || typeof window === "undefined") return;

    window.gtag?.("event", "timing_complete", {
      event_category: category,
      name: variable,
      value: Math.round(value),
      event_label: label,
    });
  }
}

// ============================================================================
// CUSTOM ANALYTICS TRACKER
// ============================================================================

class CustomAnalytics {
  private endpoint: string;
  private sessionId: string;
  private events: AnalyticsEvent[] = [];
  private flushInterval: NodeJS.Timeout | null = null;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.sessionId = this.generateSessionId();
    this.startFlushInterval();
  }

  private generateSessionId(): string {
    return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private startFlushInterval() {
    // Flush events every 10 seconds
    this.flushInterval = setInterval(() => {
      this.flush();
    }, 10000);

    // Also flush on page unload
    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", () => this.flush());
    }
  }

  private async flush() {
    if (this.events.length === 0) return;

    const eventsToSend = [...this.events];
    this.events = [];

    try {
      await fetch(this.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: this.sessionId,
          events: eventsToSend,
          timestamp: Date.now(),
        }),
      });
    } catch (error) {
      console.error("Failed to send analytics:", error);
      // Re-add events to queue on failure
      this.events = [...eventsToSend, ...this.events];
    }
  }

  track(event: AnalyticsEvent) {
    this.events.push({
      ...event,
      timestamp: Date.now(),
    });
  }

  trackPageView(pageView: PageViewEvent) {
    this.track({
      event: "page_view",
      properties: pageView,
    });
  }

  trackClick(element: string, properties?: Record<string, any>) {
    this.track({
      event: "click",
      category: "interaction",
      action: "click",
      label: element,
      properties,
    });
  }

  trackForm(formName: string, action: "start" | "complete" | "error", properties?: Record<string, any>) {
    this.track({
      event: `form_${action}`,
      category: "form",
      action,
      label: formName,
      properties,
    });
  }

  trackError(error: Error, properties?: Record<string, any>) {
    this.track({
      event: "error",
      category: "error",
      action: error.name,
      label: error.message,
      properties: {
        stack: error.stack,
        ...properties,
      },
    });
  }

  destroy() {
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
    }
    this.flush();
  }
}

// ============================================================================
// ANALYTICS CONTEXT
// ============================================================================

interface AnalyticsContextValue {
  track: (event: AnalyticsEvent) => void;
  trackPageView: (pageView: PageViewEvent) => void;
  trackClick: (element: string, properties?: Record<string, any>) => void;
  trackForm: (formName: string, action: "start" | "complete" | "error", properties?: Record<string, any>) => void;
  trackTiming: (category: string, variable: string, value: number, label?: string) => void;
  setUserProperties: (properties: UserProperties) => void;
}

const AnalyticsContext = React.createContext<AnalyticsContextValue>({
  track: () => {},
  trackPageView: () => {},
  trackClick: () => {},
  trackForm: () => {},
  trackTiming: () => {},
  setUserProperties: () => {},
});

// ============================================================================
// ANALYTICS PROVIDER
// ============================================================================

interface AnalyticsProviderProps {
  children: React.ReactNode;
  googleAnalyticsId?: string;
  customEndpoint?: string;
  enableInDevelopment?: boolean;
}

export function AnalyticsProvider({
  children,
  googleAnalyticsId,
  customEndpoint,
  enableInDevelopment = false,
}: AnalyticsProviderProps) {
  const gaRef = React.useRef<GoogleAnalytics | null>(null);
  const customRef = React.useRef<CustomAnalytics | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize analytics
  useEffect(() => {
    const isDev = process.env.NODE_ENV === "development";
    if (isDev && !enableInDevelopment) return;

    // Initialize Google Analytics
    if (googleAnalyticsId && !gaRef.current) {
      gaRef.current = new GoogleAnalytics(googleAnalyticsId);
      gaRef.current.initialize();
    }

    // Initialize custom analytics
    if (customEndpoint && !customRef.current) {
      customRef.current = new CustomAnalytics(customEndpoint);
    }

    return () => {
      if (customRef.current) {
        customRef.current.destroy();
      }
    };
  }, [googleAnalyticsId, customEndpoint, enableInDevelopment]);

  // Track page views
  useEffect(() => {
    const url = pathname + (searchParams ? `?${searchParams}` : "");
    const pageView = {
      url,
      title: document.title,
      referrer: document.referrer,
    };

    gaRef.current?.pageView(pageView);
    customRef.current?.trackPageView(pageView);
  }, [pathname, searchParams]);

  // Analytics methods
  const track = React.useCallback((event: AnalyticsEvent) => {
    gaRef.current?.event(event);
    customRef.current?.track(event);
  }, []);

  const trackPageView = React.useCallback((pageView: PageViewEvent) => {
    gaRef.current?.pageView(pageView);
    customRef.current?.trackPageView(pageView);
  }, []);

  const trackClick = React.useCallback((element: string, properties?: Record<string, any>) => {
    track({
      event: "click",
      category: "interaction",
      action: "click",
      label: element,
      properties,
    });
  }, [track]);

  const trackForm = React.useCallback((formName: string, action: "start" | "complete" | "error", properties?: Record<string, any>) => {
    track({
      event: `form_${action}`,
      category: "form",
      action,
      label: formName,
      properties,
    });
  }, [track]);

  const trackTiming = React.useCallback((category: string, variable: string, value: number, label?: string) => {
    gaRef.current?.timing(category, variable, value, label);
  }, []);

  const setUserProperties = React.useCallback((properties: UserProperties) => {
    gaRef.current?.setUserProperties(properties);
  }, []);

  return (
    <AnalyticsContext.Provider
      value={{
        track,
        trackPageView,
        trackClick,
        trackForm,
        trackTiming,
        setUserProperties,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
}

// ============================================================================
// ANALYTICS HOOKS
// ============================================================================

export function useAnalytics() {
  return React.useContext(AnalyticsContext);
}

export function useTrackEvent() {
  const { track } = useAnalytics();
  return track;
}

export function useTrackClick(element: string) {
  const { trackClick } = useAnalytics();

  return React.useCallback(
    (properties?: Record<string, any>) => {
      trackClick(element, properties);
    },
    [trackClick, element]
  );
}

export function useTrackForm(formName: string) {
  const { trackForm } = useAnalytics();

  return {
    trackStart: (properties?: Record<string, any>) =>
      trackForm(formName, "start", properties),
    trackComplete: (properties?: Record<string, any>) =>
      trackForm(formName, "complete", properties),
    trackError: (error: string, properties?: Record<string, any>) =>
      trackForm(formName, "error", { error, ...properties }),
  };
}

// ============================================================================
// CONVERSION TRACKING
// ============================================================================

export function trackConversion(type: string, value?: number, properties?: Record<string, any>) {
  if (typeof window === "undefined") return;

  // Google Analytics conversion
  window.gtag?.("event", "conversion", {
    send_to: `${process.env.NEXT_PUBLIC_GA_ID}/${type}`,
    value: value,
    currency: "BRL",
    ...properties,
  });

  // Facebook Pixel (if available)
  if ((window as any).fbq) {
    (window as any).fbq("track", type, {
      value: value,
      currency: "BRL",
      ...properties,
    });
  }
}

// ============================================================================
// ERROR TRACKING
// ============================================================================

export function setupErrorTracking() {
  if (typeof window === "undefined") return;

  // Track unhandled errors
  window.addEventListener("error", (event) => {
    const { error, filename, lineno, colno } = event;

    if (error) {
      window.gtag?.("event", "exception", {
        description: error.message,
        fatal: false,
        error: {
          message: error.message,
          stack: error.stack,
          filename,
          lineno,
          colno,
        },
      });
    }
  });

  // Track unhandled promise rejections
  window.addEventListener("unhandledrejection", (event) => {
    window.gtag?.("event", "exception", {
      description: `Unhandled Promise Rejection: ${event.reason}`,
      fatal: false,
    });
  });
}

// ============================================================================
// A/B TESTING
// ============================================================================

export function useABTest(testName: string, variants: string[]): string {
  const [variant, setVariant] = React.useState<string>("");
  const { track } = useAnalytics();

  useEffect(() => {
    // Get or assign variant
    const storageKey = `ab-test-${testName}`;
    let assignedVariant = localStorage.getItem(storageKey);

    if (!assignedVariant) {
      // Randomly assign variant
      assignedVariant = variants[Math.floor(Math.random() * variants.length)];
      localStorage.setItem(storageKey, assignedVariant);

      // Track assignment
      track({
        event: "ab_test_assignment",
        category: "ab_test",
        action: testName,
        label: assignedVariant,
      });
    }

    setVariant(assignedVariant);
  }, [testName, variants, track]);

  return variant;
}