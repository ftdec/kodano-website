"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/animations/hooks";

// ============================================================================
// TYPES
// ============================================================================

type AnimationState = "idle" | "processing" | "success" | "reset";

const DURATIONS = {
  idle: 800,
  processing: 2200,
  success: 1400,
  reset: 600,
} as const;

// ============================================================================
// COLORS (Kodano Palette)
// ============================================================================

const COLORS = {
  cyanBase: "#0FA3B1",
  cyanLight: "#1BCAD3",
  cyanDark: "#0D8A96",
  teal: "#2FE6C8",
  white: "#FFFFFF",
  textPrimary: "rgba(255, 255, 255, 0.92)",
  textMuted: "rgba(255, 255, 255, 0.65)",
} as const;

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function PaymentCardAnimation({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();
  const [state, setState] = React.useState<AnimationState>("idle");
  const [mounted, setMounted] = React.useState(false);

  // Hydration-safe mount
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Animation cycle
  React.useEffect(() => {
    if (!mounted || prefersReducedMotion) return;

    const cycle = () => {
      setState("idle");

      const t1 = setTimeout(() => setState("processing"), DURATIONS.idle);
      const t2 = setTimeout(() => setState("success"), DURATIONS.idle + DURATIONS.processing);
      const t3 = setTimeout(() => setState("reset"), DURATIONS.idle + DURATIONS.processing + DURATIONS.success);
      const t4 = setTimeout(cycle, DURATIONS.idle + DURATIONS.processing + DURATIONS.success + DURATIONS.reset);

      return [t1, t2, t3, t4];
    };

    const timers = cycle();

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [mounted, prefersReducedMotion]);

  // Reduced motion: show static success state
  if (prefersReducedMotion) {
    return (
      <div className={cn("relative w-full max-w-[640px] aspect-[16/10]", className)}>
        <StaticSuccessCard />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative w-full max-w-[640px] aspect-[16/10] rounded-[28px] overflow-hidden",
        "bg-white shadow-[0_32px_64px_rgba(15,163,177,0.12),0_12px_24px_rgba(15,163,177,0.08)]",
        className
      )}
      role="img"
      aria-label="Demonstração de processamento de pagamento Kodano"
    >
      {/* Subtle ambient halo */}
      <div
        className="absolute inset-[-20%] pointer-events-none"
        style={{
          background: `radial-gradient(55% 55% at 50% 50%, rgba(15,163,177,0.08), transparent 60%)`,
          filter: "blur(40px)",
        }}
      />

      {/* Card container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <PaymentCard state={state} />
      </div>

      {/* Status text */}
      <StatusText state={state} />

      {/* Screen reader announcements */}
      <span className="sr-only" aria-live="polite">
        {state === "idle" && "Pronto para processar pagamento"}
        {state === "processing" && "Processando pagamento"}
        {state === "success" && "Pagamento aprovado"}
      </span>
    </div>
  );
}

// ============================================================================
// PAYMENT CARD
// ============================================================================

function PaymentCard({ state }: { state: AnimationState }) {
  const isSuccess = state === "success";
  const isProcessing = state === "processing";

  return (
    <motion.div
      className="relative w-[80%] max-w-[420px] rounded-2xl overflow-hidden"
      style={{
        aspectRatio: "1.586 / 1",
        background: `linear-gradient(155deg, ${COLORS.cyanLight} 0%, ${COLORS.cyanBase} 50%, ${COLORS.cyanDark} 100%)`,
      }}
      animate={{
        scale: isSuccess ? 1.02 : 1,
        boxShadow: isSuccess
          ? `0 35px 70px rgba(47, 230, 200, 0.25)`
          : `0 30px 60px rgba(15, 163, 177, 0.18)`,
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Subtle highlight sheen */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(120deg, rgba(255,255,255,0.12) 0%, transparent 40%)`,
        }}
      />

      {/* Success glow overlay */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: `radial-gradient(circle at 50% 50%, rgba(47,230,200,0.15), transparent 60%)`,
            }}
          />
        )}
      </AnimatePresence>

      {/* Card content */}
      <div className="relative h-full p-6 flex flex-col justify-between">
        {/* Chip */}
        <CardChip isProcessing={isProcessing} />

        {/* Card number with processing indicator */}
        <div className="relative">
          <CardNumber isProcessing={isProcessing} />
          {isProcessing && <ProcessingLine />}
        </div>

        {/* Bottom row */}
        <div className="flex justify-between items-end">
          <CardHolder />
          <CardExpiry />
        </div>
      </div>

      {/* Success checkmark overlay */}
      <AnimatePresence>
        {isSuccess && <SuccessCheckmark />}
      </AnimatePresence>
    </motion.div>
  );
}

// ============================================================================
// CARD ELEMENTS
// ============================================================================

function CardChip({ isProcessing }: { isProcessing: boolean }) {
  return (
    <motion.div
      className="w-12 h-9 rounded-lg overflow-hidden"
      style={{
        background: `linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.15))`,
        boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.25)`,
      }}
      animate={{
        opacity: isProcessing ? 0.7 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Chip lines */}
      <div className="h-full flex flex-col justify-center gap-1 px-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-[2px] rounded-full"
            style={{ background: "rgba(255,255,255,0.4)" }}
          />
        ))}
      </div>
    </motion.div>
  );
}

function CardNumber({ isProcessing }: { isProcessing: boolean }) {
  return (
    <motion.div
      className="font-mono text-lg md:text-xl tracking-[0.2em]"
      style={{ color: COLORS.textPrimary }}
      animate={{
        opacity: isProcessing ? 0.6 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      •••• •••• •••• 9010
    </motion.div>
  );
}

function CardHolder() {
  return (
    <div
      className="text-xs md:text-sm tracking-[0.1em] uppercase"
      style={{ color: COLORS.textMuted }}
    >
      PAYMENT
    </div>
  );
}

function CardExpiry() {
  return (
    <div
      className="text-xs md:text-sm tracking-[0.05em]"
      style={{ color: COLORS.textMuted }}
    >
      12/28
    </div>
  );
}

// ============================================================================
// PROCESSING LINE ANIMATION
// ============================================================================

function ProcessingLine() {
  return (
    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-8 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute h-full w-24"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)`,
        }}
        initial={{ x: "-100%" }}
        animate={{ x: "400%" }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

// ============================================================================
// SUCCESS CHECKMARK
// ============================================================================

function SuccessCheckmark() {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.div
        className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center"
        style={{
          background: `rgba(255,255,255,0.95)`,
          boxShadow: `0 8px 32px rgba(47, 230, 200, 0.4)`,
        }}
      >
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8 md:w-10 md:h-10"
          fill="none"
          stroke={COLORS.teal}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            d="M5 12l5 5L19 7"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

// ============================================================================
// STATUS TEXT
// ============================================================================

function StatusText({ state }: { state: AnimationState }) {
  const texts: Record<AnimationState, string> = {
    idle: "",
    processing: "Processando pagamento",
    success: "Pagamento aprovado",
    reset: "",
  };

  const text = texts[state];
  const isSuccess = state === "success";

  return (
    <div className="absolute bottom-6 left-0 right-0 flex justify-center">
      <AnimatePresence mode="wait">
        {text && (
          <motion.div
            key={state}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="px-4 py-2 rounded-full text-sm font-medium"
            style={{
              background: isSuccess ? COLORS.teal : "rgba(15, 163, 177, 0.1)",
              color: isSuccess ? COLORS.white : COLORS.cyanBase,
            }}
          >
            {state === "processing" && (
              <span className="inline-flex items-center gap-2">
                <ProcessingDots />
                {text}
              </span>
            )}
            {state === "success" && (
              <span className="inline-flex items-center gap-2">
                <CheckIcon />
                {text}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProcessingDots() {
  return (
    <span className="inline-flex gap-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: COLORS.cyanBase }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </span>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8l4 4 6-7" />
    </svg>
  );
}

// ============================================================================
// STATIC SUCCESS (for reduced motion)
// ============================================================================

function StaticSuccessCard() {
  return (
    <div
      className={cn(
        "relative w-full h-full rounded-[28px] overflow-hidden",
        "bg-white shadow-[0_32px_64px_rgba(15,163,177,0.12)]"
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="relative w-[80%] max-w-[420px] rounded-2xl overflow-hidden p-6"
          style={{
            aspectRatio: "1.586 / 1",
            background: `linear-gradient(155deg, ${COLORS.cyanLight} 0%, ${COLORS.cyanBase} 50%, ${COLORS.cyanDark} 100%)`,
            boxShadow: `0 30px 60px rgba(47, 230, 200, 0.2)`,
          }}
        >
          {/* Static checkmark */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: `rgba(255,255,255,0.95)`,
                boxShadow: `0 8px 32px rgba(47, 230, 200, 0.4)`,
              }}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-8 h-8"
                fill="none"
                stroke={COLORS.teal}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12l5 5L19 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Static success badge */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center">
        <div
          className="px-4 py-2 rounded-full text-sm font-medium"
          style={{ background: COLORS.teal, color: COLORS.white }}
        >
          <span className="inline-flex items-center gap-2">
            <CheckIcon />
            Pagamento aprovado
          </span>
        </div>
      </div>
    </div>
  );
}

export default PaymentCardAnimation;
