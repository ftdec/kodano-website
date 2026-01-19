/**
 * Card3D Component - Performance Optimized
 * Simple hover effect without heavy 3D transforms
 */

"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Card3DProps {
  children: ReactNode;
  className?: string;
  maxRotation?: number;
  perspective?: number;
  glare?: boolean;
  shadow?: boolean;
}

export function Card3D({
  children,
  className,
}: Card3DProps) {
  // Simplified: just render children without heavy 3D effects
  return (
    <div className={cn("relative", className)}>
      <div className="relative w-full h-full transition-transform duration-200 hover:scale-[1.02]">
        {children}
      </div>
    </div>
  );
}

/**
 * Card3DLayer Component - Simplified
 */
interface Card3DLayerProps {
  children: ReactNode;
  className?: string;
  depth?: number;
}

export function Card3DLayer({ children, className }: Card3DLayerProps) {
  return <div className={className}>{children}</div>;
}
