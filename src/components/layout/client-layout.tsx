"use client";

import { ReactNode, useEffect } from "react";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { I18nProvider } from "@/lib/i18n/context";
import { AIAssistantWidget } from "@/lib/ai/components/ai-assistant-widget";
import { ErrorBoundary } from "@/components/error-boundary";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "@/lib/animations/hooks";
import { ScrollProgressBar, ScrollToTop } from "@/components/animations";

interface ClientLayoutProps {
  children: ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  // Force light mode on mount and prevent any dark mode
  useEffect(() => {
    // Remove dark class immediately
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    document.documentElement.style.colorScheme = 'light';
    
    // Watch for any attempts to add dark class and remove it
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const html = document.documentElement;
          if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            html.classList.add('light');
            html.style.colorScheme = 'light';
          }
        }
      });
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      forcedTheme="light"
      enableSystem={false}
      disableTransitionOnChange
      storageKey="kodano-theme"
    >
      <SmoothScrollProvider>
        <I18nProvider locale="pt">
          <ScrollProgressBar
            height={2}
            position="top"
            color="bg-gradient-to-r from-[#4FACFE] via-[#00DBDE] to-[#43E97B]"
          />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={pathname}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8, filter: "blur(6px)" }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -8, filter: "blur(6px)" }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ willChange: "transform, opacity" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
          <ErrorBoundary level="component">
            <AIAssistantWidget />
          </ErrorBoundary>
          <ScrollToTop />
        </I18nProvider>
      </SmoothScrollProvider>
    </ThemeProvider>
  );
}
