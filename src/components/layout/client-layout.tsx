"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { I18nProvider } from "@/lib/i18n/context";
import { AIAssistantWidget } from "@/lib/ai/components/ai-assistant-widget";

interface ClientLayoutProps {
  children: ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <I18nProvider locale="pt">
        {children}
        <AIAssistantWidget />
      </I18nProvider>
    </ThemeProvider>
  );
}
