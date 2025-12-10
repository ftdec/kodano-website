/**
 * AdvancedButton Component
 * Button with advanced micro-interactions
 */

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useState, useRef } from "react";
import { useReducedMotion } from "@/lib/animations/hooks";
import { cn } from "@/lib/utils";
import { CheckCircle2, Loader2 } from "lucide-react";

interface AdvancedButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void | Promise<void>;
  disabled?: boolean;
  loading?: boolean;
  success?: boolean;
  ripple?: boolean;
  shimmer?: boolean;
  magnetic?: boolean;
}

export function AdvancedButton({
  children,
  className,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  loading = false,
  success = false,
  ripple = true,
  shimmer = true,
  magnetic = false,
}: AdvancedButtonProps) {
  const [isLoading, setIsLoading] = useState(loading);
  const [isSuccess, setIsSuccess] = useState(success);
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || isLoading) return;

    // Ripple effect
    if (ripple && !prefersReducedMotion) {
      const rect = buttonRef.current?.getBoundingClientRect();
      if (rect) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const id = Date.now();
        setRipples((prev) => [...prev, { x, y, id }]);
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== id));
        }, 600);
      }
    }

    // Handle async onClick
    if (onClick) {
      const result = onClick();
      if (result instanceof Promise) {
        setIsLoading(true);
        try {
          await result;
          setIsSuccess(true);
          setTimeout(() => setIsSuccess(false), 2000);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  const baseStyles = "relative inline-flex items-center justify-center font-medium transition-colors overflow-hidden";

  const variantStyles = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };

  const sizeStyles = {
    sm: "h-9 px-4 text-sm rounded-md",
    md: "h-11 px-6 text-base rounded-lg",
    lg: "h-13 px-8 text-lg rounded-xl",
  };

  return (
    <motion.button
      ref={buttonRef}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={handleClick}
      disabled={disabled || isLoading}
      whileHover={!prefersReducedMotion && !disabled ? { scale: 1.02 } : {}}
      whileTap={!prefersReducedMotion && !disabled ? { scale: 0.98 } : {}}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
      }}
    >
      {/* Shimmer effect */}
      {shimmer && !prefersReducedMotion && !disabled && (
        <motion.div
          className="absolute inset-0 -translate-x-full"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
          }}
          animate={{
            translateX: ["100%", "200%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "linear",
          }}
        />
      )}

      {/* Ripple effects */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full bg-white/30"
            style={{
              left: ripple.x,
              top: ripple.y,
            }}
            initial={{ width: 0, height: 0, opacity: 1 }}
            animate={{ width: 400, height: 400, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.span
              key="loading"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2"
            >
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Carregando...</span>
            </motion.span>
          ) : isSuccess ? (
            <motion.span
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Sucesso!</span>
            </motion.span>
          ) : (
            <motion.span
              key="default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {children}
            </motion.span>
          )}
        </AnimatePresence>
      </span>

      {/* Border gradient animation for outline variant */}
      {variant === "outline" && !prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background: "linear-gradient(90deg, #667eea, #764ba2, #f093fb, #4facfe)",
            backgroundSize: "200% 100%",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 0%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}
    </motion.button>
  );
}

/**
 * ButtonGroup Component
 * Group of buttons with stagger animation
 */
interface ButtonGroupProps {
  children: ReactNode;
  className?: string;
  gap?: number;
  stagger?: number;
}

export function ButtonGroup({
  children,
  className,
  gap = 4,
  stagger = 0.1,
}: ButtonGroupProps) {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: stagger,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  if (prefersReducedMotion) {
    return <div className={cn("flex flex-wrap", `gap-${gap}`, className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn("flex flex-wrap", `gap-${gap}`, className)}
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.div key={index} variants={itemVariants}>
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div variants={itemVariants}>{children}</motion.div>
      )}
    </motion.div>
  );
}
