import * as React from "react";
import { cn } from "@/lib/utils";

interface KodanoGradientProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "simple" | "premium";
}

export function KodanoGradient({
  children,
  variant = "simple",
  className,
  ...props
}: KodanoGradientProps) {
  const gradientClass =
    variant === "premium"
      ? "bg-gradient-to-r from-[#003845] via-[#005A6A] to-[#00C8DC]"
      : "bg-gradient-to-r from-[#002A35] to-[#00C8DC]";

  return (
    <span
      className={cn(
        "text-transparent bg-clip-text",
        gradientClass,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
