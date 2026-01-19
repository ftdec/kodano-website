/**
 * Smooth Scroll Provider
 * DISABLED for performance - was causing infinite requestAnimationFrame loop
 */

"use client";

import { ReactNode } from "react";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  // Lenis disabled - was running requestAnimationFrame at 60fps constantly
  // Native browser scroll is sufficient and much more performant
  return <>{children}</>;
}
