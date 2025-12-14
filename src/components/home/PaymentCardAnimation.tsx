"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/animations/hooks";

// ============================================================================
// TYPES & CONFIG
// ============================================================================

type AnimationState = "idle" | "processing" | "success" | "reset";

const DURATIONS = {
  idle: 1200,
  processing: 2800,
  success: 2200,
  reset: 600,
} as const;

const COLORS = {
  cyanBase: "#0FA3B1",
  cyanLight: "#1BCAD3",
  cyanDark: "#0D8A96",
  teal: "#2FE6C8",
  white: "#FFFFFF",
  textPrimary: "rgba(255, 255, 255, 0.92)",
  textMuted: "rgba(255, 255, 255, 0.70)",
} as const;

// GPU-optimized transition defaults
const SMOOTH_TRANSITION = {
  type: "tween" as const,
  ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
  duration: 0.3,
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function PaymentCardAnimation({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();
  const [state, setState] = React.useState<AnimationState>("idle");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!mounted || prefersReducedMotion) return;

    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;
    let t3: ReturnType<typeof setTimeout>;
    let t4: ReturnType<typeof setTimeout>;

    const cycle = () => {
      setState("idle");
      t1 = setTimeout(() => setState("processing"), DURATIONS.idle);
      t2 = setTimeout(() => setState("success"), DURATIONS.idle + DURATIONS.processing);
      t3 = setTimeout(() => setState("reset"), DURATIONS.idle + DURATIONS.processing + DURATIONS.success);
      t4 = setTimeout(cycle, DURATIONS.idle + DURATIONS.processing + DURATIONS.success + DURATIONS.reset);
    };

    cycle();
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [mounted, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div className={cn("relative w-full max-w-[640px]", className)}>
        <StaticSuccessCard />
      </div>
    );
  }

  return (
    <div
      className={cn("relative w-full max-w-[640px] flex flex-col items-center gap-5", className)}
      role="img"
      aria-label="Demonstração de processamento de pagamento Kodano"
    >
      {/* Card Stage */}
      <div
        className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden bg-white"
        style={{ boxShadow: "0 24px 48px rgba(15,163,177,0.10), 0 8px 16px rgba(15,163,177,0.06)" }}
      >
        {/* Static ambient gradient (no animation = no cost) */}
        <div
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(15,163,177,0.08), transparent)",
          }}
        />

        {/* Card */}
        <div className="absolute inset-0 flex items-center justify-center">
          <PaymentCard state={state} />
        </div>

        {/* Lightweight confetti */}
        <AnimatePresence>
          {state === "success" && <LightweightConfetti />}
        </AnimatePresence>
      </div>

      {/* Status text */}
      <StatusText state={state} />

      <span className="sr-only" aria-live="polite">
        {state === "processing" && "Processando pagamento"}
        {state === "success" && "Pagamento aprovado"}
      </span>
    </div>
  );
}

// ============================================================================
// PAYMENT CARD (Optimized)
// ============================================================================

function PaymentCard({ state }: { state: AnimationState }) {
  const isSuccess = state === "success";
  const isProcessing = state === "processing";

  return (
    <motion.div
      className="relative w-[80%] max-w-[420px] rounded-2xl will-change-transform"
      style={{
        aspectRatio: "1.586 / 1",
        background: `linear-gradient(155deg, ${COLORS.cyanLight} 0%, ${COLORS.cyanBase} 50%, ${COLORS.cyanDark} 100%)`,
        boxShadow: "0 20px 40px rgba(15, 163, 177, 0.15)",
      }}
      animate={{
        scale: isSuccess ? 1.02 : 1,
        y: isSuccess ? -4 : 0,
      }}
      transition={SMOOTH_TRANSITION}
    >
      {/* Static sheen (no animation) */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background: "linear-gradient(120deg, rgba(255,255,255,0.12) 0%, transparent 50%)",
        }}
      />

      {/* Processing shimmer - simplified */}
      <AnimatePresence>
        {isProcessing && <SimpleShimmer />}
      </AnimatePresence>

      {/* Success glow - simplified */}
      {isSuccess && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(47,230,200,0.3), transparent 70%)",
          }}
        />
      )}

      {/* Card content */}
      <div className="relative h-full p-5 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <CardChip />
          <KodanoLogo />
        </div>

        <CardNumber isProcessing={isProcessing} />

        <div className="flex justify-between items-end">
          <div>
            <div className="text-[9px] mb-0.5 opacity-60" style={{ color: COLORS.white }}>TITULAR</div>
            <div className="text-xs tracking-wide" style={{ color: COLORS.textPrimary }}>DEMO USER</div>
          </div>
          <div className="text-right">
            <div className="text-[9px] mb-0.5 opacity-60" style={{ color: COLORS.white }}>VALIDADE</div>
            <div className="text-xs" style={{ color: COLORS.textPrimary }}>12/28</div>
          </div>
        </div>
      </div>

      {/* Success overlay */}
      <AnimatePresence>
        {isSuccess && <SuccessOverlay />}
      </AnimatePresence>
    </motion.div>
  );
}

// ============================================================================
// LIGHTWEIGHT COMPONENTS
// ============================================================================

function KodanoLogo() {
  return (
    <div className="flex items-center gap-1.5 opacity-90">
      <div className="w-5 h-5 rounded flex items-center justify-center bg-white/20">
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
          <path
            d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
      <span className="text-xs font-semibold tracking-wider text-white">KODANO</span>
    </div>
  );
}

function CardChip() {
  return (
    <div
      className="w-10 h-7 rounded"
      style={{
        background: "linear-gradient(145deg, #FFD700, #E5A800)",
        boxShadow: "inset 0 1px 2px rgba(255,255,255,0.3)",
      }}
    >
      <div className="h-full grid grid-cols-3 grid-rows-2 gap-px p-1">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-sm bg-amber-700/40" />
        ))}
      </div>
    </div>
  );
}

function CardNumber({ isProcessing }: { isProcessing: boolean }) {
  return (
    <div
      className="font-mono text-base md:text-lg tracking-[0.15em] flex items-center gap-2"
      style={{ color: COLORS.textPrimary, opacity: isProcessing ? 0.6 : 1 }}
    >
      <span>4532</span>
      <span>••••</span>
      <span>••••</span>
      <span>9010</span>
      {isProcessing && (
        <span className="flex gap-1 ml-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </span>
      )}
    </div>
  );
}

// ============================================================================
// ANIMATIONS (Optimized - CSS transforms only)
// ============================================================================

function SimpleShimmer() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="absolute inset-y-0 w-1/2"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
        }}
        animate={{ x: ["-100%", "300%"] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </motion.div>
  );
}

function SuccessOverlay() {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Checkmark circle */}
      <motion.div
        className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center bg-white shadow-lg"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
      >
        <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10">
          <motion.path
            d="M4 12l6 6L20 6"
            fill="none"
            stroke={COLORS.teal}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: 0.25, ease: "easeOut" }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

// Lightweight confetti - only 8 pieces, CSS animation
const CONFETTI = [
  { x: 10, delay: 0, color: COLORS.teal },
  { x: 25, delay: 0.1, color: COLORS.cyanLight },
  { x: 40, delay: 0.05, color: "#FFD700" },
  { x: 55, delay: 0.15, color: COLORS.teal },
  { x: 70, delay: 0.08, color: COLORS.cyanBase },
  { x: 85, delay: 0.12, color: "#FFD700" },
  { x: 95, delay: 0.18, color: COLORS.cyanLight },
  { x: 5, delay: 0.2, color: COLORS.teal },
];

function LightweightConfetti() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {CONFETTI.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-sm"
          style={{ left: `${p.x}%`, top: 0, background: p.color }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{ y: "100vh", opacity: 0, rotate: 360 }}
          transition={{
            duration: 1.2,
            delay: p.delay,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  );
}

// ============================================================================
// STATUS TEXT
// ============================================================================

function StatusText({ state }: { state: AnimationState }) {
  return (
    <div className="h-10 flex items-center justify-center">
      <AnimatePresence mode="wait">
        {state === "processing" && (
          <motion.div
            key="processing"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={SMOOTH_TRANSITION}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 border border-cyan-100"
          >
            <div
              className="w-4 h-4 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin"
              style={{ animationDuration: "0.8s" }}
            />
            <span className="text-sm font-medium text-cyan-700">Processando...</span>
          </motion.div>
        )}

        {state === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={SMOOTH_TRANSITION}
            className="flex items-center gap-2 px-4 py-2 rounded-full"
            style={{ background: COLORS.teal }}
          >
            <svg viewBox="0 0 16 16" className="w-4 h-4 text-white">
              <path d="M3 8l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span className="text-sm font-semibold text-white">Aprovado!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// STATIC (reduced motion)
// ============================================================================

function StaticSuccessCard() {
  return (
    <div className="flex flex-col items-center gap-5">
      <div
        className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden bg-white flex items-center justify-center"
        style={{ boxShadow: "0 24px 48px rgba(15,163,177,0.10)" }}
      >
        <div
          className="w-[80%] max-w-[420px] rounded-2xl p-5 flex flex-col justify-between"
          style={{
            aspectRatio: "1.586 / 1",
            background: `linear-gradient(155deg, ${COLORS.cyanLight}, ${COLORS.cyanBase}, ${COLORS.cyanDark})`,
          }}
        >
          <div className="flex justify-between">
            <CardChip />
            <KodanoLogo />
          </div>
          <div className="font-mono text-base tracking-[0.15em] text-white/90">4532 •••• •••• 9010</div>
          <div className="flex justify-between text-xs text-white/80">
            <span>DEMO USER</span>
            <span>12/28</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: COLORS.teal }}>
        <svg viewBox="0 0 16 16" className="w-4 h-4 text-white">
          <path d="M3 8l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <span className="text-sm font-semibold text-white">Aprovado!</span>
      </div>
    </div>
  );
}

export default PaymentCardAnimation;
