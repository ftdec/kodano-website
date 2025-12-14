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
  idle: 1000,
  processing: 2500,
  success: 2000,
  reset: 800,
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
  textMuted: "rgba(255, 255, 255, 0.70)",
} as const;

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

    const cycle = () => {
      setState("idle");

      const t1 = setTimeout(() => setState("processing"), DURATIONS.idle);
      const t2 = setTimeout(() => setState("success"), DURATIONS.idle + DURATIONS.processing);
      const t3 = setTimeout(() => setState("reset"), DURATIONS.idle + DURATIONS.processing + DURATIONS.success);
      const t4 = setTimeout(cycle, DURATIONS.idle + DURATIONS.processing + DURATIONS.success + DURATIONS.reset);

      return [t1, t2, t3, t4];
    };

    const timers = cycle();
    return () => timers.forEach(clearTimeout);
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
      className={cn(
        "relative w-full max-w-[640px] flex flex-col items-center gap-6",
        className
      )}
      role="img"
      aria-label="Demonstração de processamento de pagamento Kodano"
    >
      {/* Card Stage */}
      <div
        className="relative w-full aspect-[16/10] rounded-[28px] overflow-hidden bg-white"
        style={{
          boxShadow: "0 32px 64px rgba(15,163,177,0.12), 0 12px 24px rgba(15,163,177,0.08)",
        }}
      >
        {/* Ambient halo */}
        <div
          className="absolute inset-[-20%] pointer-events-none"
          style={{
            background: "radial-gradient(55% 55% at 50% 50%, rgba(15,163,177,0.08), transparent 60%)",
            filter: "blur(40px)",
          }}
        />

        {/* Card */}
        <div className="absolute inset-0 flex items-center justify-center">
          <PaymentCard state={state} />
        </div>

        {/* Confetti celebration */}
        <AnimatePresence>
          {state === "success" && <ConfettiCelebration />}
        </AnimatePresence>
      </div>

      {/* Status text - BELOW the card */}
      <StatusText state={state} />

      {/* Screen reader */}
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
      className="relative w-[82%] max-w-[440px] rounded-2xl overflow-hidden"
      style={{
        aspectRatio: "1.586 / 1",
        background: `linear-gradient(155deg, ${COLORS.cyanLight} 0%, ${COLORS.cyanBase} 45%, ${COLORS.cyanDark} 100%)`,
      }}
      animate={{
        scale: isSuccess ? 1.03 : 1,
        rotateY: isSuccess ? [0, 5, -5, 0] : 0,
        boxShadow: isSuccess
          ? "0 40px 80px rgba(47, 230, 200, 0.3)"
          : "0 30px 60px rgba(15, 163, 177, 0.18)",
      }}
      transition={{
        duration: isSuccess ? 0.6 : 0.4,
        ease: "easeOut",
        rotateY: { duration: 0.8, ease: "easeInOut" },
      }}
    >
      {/* Highlight sheen */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(120deg, rgba(255,255,255,0.15) 0%, transparent 40%)",
        }}
      />

      {/* Processing shimmer overlay */}
      <AnimatePresence>
        {isProcessing && <ProcessingShimmer />}
      </AnimatePresence>

      {/* Success glow */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0.3] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(47,230,200,0.4), transparent 70%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Card content */}
      <div className="relative h-full p-5 md:p-6 flex flex-col justify-between">
        {/* Top row: Chip + Logo */}
        <div className="flex justify-between items-start">
          <CardChip isProcessing={isProcessing} />
          <KodanoLogo />
        </div>

        {/* Card number */}
        <div className="relative">
          <CardNumber isProcessing={isProcessing} />
        </div>

        {/* Bottom row */}
        <div className="flex justify-between items-end">
          <div>
            <div className="text-[10px] mb-1" style={{ color: COLORS.textMuted }}>
              TITULAR
            </div>
            <CardHolder />
          </div>
          <div className="text-right">
            <div className="text-[10px] mb-1" style={{ color: COLORS.textMuted }}>
              VALIDADE
            </div>
            <CardExpiry />
          </div>
        </div>
      </div>

      {/* Success checkmark */}
      <AnimatePresence>
        {isSuccess && <SuccessCheckmark />}
      </AnimatePresence>
    </motion.div>
  );
}

// ============================================================================
// KODANO LOGO
// ============================================================================

function KodanoLogo() {
  return (
    <div className="flex items-center gap-1.5">
      {/* Logo mark */}
      <div
        className="w-6 h-6 rounded-md flex items-center justify-center"
        style={{
          background: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(4px)",
        }}
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="white">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                fill="none"
          />
        </svg>
      </div>
      {/* Logo text */}
      <span
        className="text-sm font-semibold tracking-wider"
        style={{ color: COLORS.textPrimary }}
      >
        KODANO
      </span>
    </div>
  );
}

// ============================================================================
// CARD ELEMENTS
// ============================================================================

function CardChip({ isProcessing }: { isProcessing: boolean }) {
  return (
    <motion.div
      className="w-11 h-8 rounded-md overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #FFD700, #FFA500)",
        boxShadow: "inset 0 1px 2px rgba(255,255,255,0.4), 0 2px 4px rgba(0,0,0,0.1)",
      }}
      animate={{
        opacity: isProcessing ? 0.7 : 1,
      }}
    >
      {/* Chip pattern */}
      <div className="h-full grid grid-cols-3 grid-rows-2 gap-[1px] p-1">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="rounded-[2px]"
            style={{ background: "rgba(180,140,60,0.6)" }}
          />
        ))}
      </div>
    </motion.div>
  );
}

function CardNumber({ isProcessing }: { isProcessing: boolean }) {
  return (
    <motion.div
      className="font-mono text-lg md:text-xl tracking-[0.18em] flex items-center gap-3"
      style={{ color: COLORS.textPrimary }}
      animate={{ opacity: isProcessing ? 0.5 : 1 }}
    >
      <span>4532</span>
      <span>••••</span>
      <span>••••</span>
      <span>9010</span>
      {isProcessing && <ProcessingDots />}
    </motion.div>
  );
}

function CardHolder() {
  return (
    <div
      className="text-xs md:text-sm tracking-[0.08em] uppercase font-medium"
      style={{ color: COLORS.textPrimary }}
    >
      DEMO USER
    </div>
  );
}

function CardExpiry() {
  return (
    <div
      className="text-xs md:text-sm tracking-[0.05em] font-medium"
      style={{ color: COLORS.textPrimary }}
    >
      12/28
    </div>
  );
}

// ============================================================================
// PROCESSING ANIMATIONS
// ============================================================================

function ProcessingShimmer() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Main shimmer wave */}
      <motion.div
        className="absolute inset-y-0 w-[200%]"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 25%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.15) 75%, transparent 100%)",
        }}
        animate={{ x: ["-100%", "100%"] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Pulse rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
          style={{ borderColor: "rgba(255,255,255,0.2)" }}
          initial={{ width: 40, height: 40, opacity: 0.8 }}
          animate={{
            width: [40, 200],
            height: [40, 200],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeOut",
          }}
        />
      ))}
    </motion.div>
  );
}

function ProcessingDots() {
  return (
    <span className="inline-flex gap-1 ml-2">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-white"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.15,
          }}
        />
      ))}
    </span>
  );
}

// ============================================================================
// SUCCESS CELEBRATION
// ============================================================================

function SuccessCheckmark() {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Glowing backdrop */}
      <motion.div
        className="absolute w-28 h-28 rounded-full"
        style={{ background: "rgba(47, 230, 200, 0.3)", filter: "blur(20px)" }}
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.5, 1.2] }}
        transition={{ duration: 0.6 }}
      />

      {/* Checkmark circle */}
      <motion.div
        className="relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center"
        style={{
          background: "linear-gradient(145deg, #FFFFFF, #F0F0F0)",
          boxShadow: "0 10px 40px rgba(47, 230, 200, 0.5), inset 0 2px 4px rgba(255,255,255,0.8)",
        }}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        {/* Animated checkmark */}
        <svg viewBox="0 0 24 24" className="w-10 h-10 md:w-12 md:h-12">
          <motion.path
            d="M4 12l6 6L20 6"
            fill="none"
            stroke={COLORS.teal}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          />
        </svg>
      </motion.div>

      {/* Sparkles around checkmark */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{ background: COLORS.teal }}
          initial={{ 
            x: 0, 
            y: 0, 
            scale: 0,
            opacity: 1,
          }}
          animate={{
            x: Math.cos((i * 60 * Math.PI) / 180) * 80,
            y: Math.sin((i * 60 * Math.PI) / 180) * 80,
            scale: [0, 1.5, 0],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 0.8,
            delay: 0.4 + i * 0.05,
            ease: "easeOut",
          }}
        />
      ))}
    </motion.div>
  );
}

// Deterministic confetti data (avoids Math.random in render)
const CONFETTI_DATA = [
  { x: 5, delay: 0.0, rotation: 45, colorIdx: 0, size: 8, duration: 1.6 },
  { x: 15, delay: 0.1, rotation: 120, colorIdx: 1, size: 10, duration: 1.8 },
  { x: 25, delay: 0.05, rotation: 200, colorIdx: 2, size: 7, duration: 1.5 },
  { x: 35, delay: 0.15, rotation: 80, colorIdx: 3, size: 9, duration: 2.0 },
  { x: 45, delay: 0.08, rotation: 300, colorIdx: 4, size: 6, duration: 1.7 },
  { x: 55, delay: 0.2, rotation: 160, colorIdx: 0, size: 11, duration: 1.9 },
  { x: 65, delay: 0.12, rotation: 240, colorIdx: 1, size: 8, duration: 1.6 },
  { x: 75, delay: 0.03, rotation: 20, colorIdx: 2, size: 10, duration: 2.1 },
  { x: 85, delay: 0.18, rotation: 280, colorIdx: 3, size: 7, duration: 1.8 },
  { x: 95, delay: 0.07, rotation: 100, colorIdx: 4, size: 9, duration: 1.5 },
  { x: 10, delay: 0.25, rotation: 180, colorIdx: 0, size: 6, duration: 2.0 },
  { x: 30, delay: 0.22, rotation: 60, colorIdx: 1, size: 12, duration: 1.7 },
  { x: 50, delay: 0.1, rotation: 320, colorIdx: 2, size: 8, duration: 1.9 },
  { x: 70, delay: 0.28, rotation: 140, colorIdx: 3, size: 10, duration: 1.6 },
  { x: 90, delay: 0.15, rotation: 220, colorIdx: 4, size: 7, duration: 2.2 },
];

const CONFETTI_COLORS = [COLORS.teal, COLORS.cyanLight, COLORS.cyanBase, "#FFD700", "#FF6B6B"];

function ConfettiCelebration() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {CONFETTI_DATA.map((piece, i) => (
        <motion.div
          key={i}
          className="absolute rounded-sm"
          style={{
            left: `${piece.x}%`,
            top: "-5%",
            width: piece.size,
            height: piece.size,
            background: CONFETTI_COLORS[piece.colorIdx],
          }}
          initial={{ y: 0, rotate: 0, opacity: 1 }}
          animate={{
            y: ["0%", "120%"],
            rotate: [piece.rotation, piece.rotation + 360],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  );
}

// ============================================================================
// STATUS TEXT (Below card)
// ============================================================================

function StatusText({ state }: { state: AnimationState }) {
  const isSuccess = state === "success";
  const isProcessing = state === "processing";

  return (
    <div className="h-12 flex items-center justify-center">
      <AnimatePresence mode="wait">
        {isProcessing && (
          <motion.div
            key="processing"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 px-5 py-2.5 rounded-full"
            style={{
              background: "rgba(15, 163, 177, 0.1)",
              border: "1px solid rgba(15, 163, 177, 0.2)",
            }}
          >
            <motion.div
              className="w-5 h-5 rounded-full border-2 border-t-transparent"
              style={{ borderColor: `${COLORS.cyanBase} transparent ${COLORS.cyanBase} ${COLORS.cyanBase}` }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <span className="text-sm font-medium" style={{ color: COLORS.cyanBase }}>
              Processando pagamento...
            </span>
          </motion.div>
        )}

        {isSuccess && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full"
            style={{
              background: COLORS.teal,
              boxShadow: "0 4px 20px rgba(47, 230, 200, 0.4)",
            }}
          >
            <motion.svg
              viewBox="0 0 20 20"
              className="w-5 h-5"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <path
                d="M4 10l4 4 8-8"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
            <span className="text-sm font-semibold text-white">
              Pagamento aprovado!
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// STATIC SUCCESS (reduced motion)
// ============================================================================

function StaticSuccessCard() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div
        className="relative w-full aspect-[16/10] rounded-[28px] overflow-hidden bg-white flex items-center justify-center"
        style={{ boxShadow: "0 32px 64px rgba(15,163,177,0.12)" }}
      >
        <div
          className="relative w-[82%] max-w-[440px] rounded-2xl overflow-hidden p-6"
          style={{
            aspectRatio: "1.586 / 1",
            background: `linear-gradient(155deg, ${COLORS.cyanLight} 0%, ${COLORS.cyanBase} 45%, ${COLORS.cyanDark} 100%)`,
            boxShadow: "0 30px 60px rgba(47, 230, 200, 0.2)",
          }}
        >
          {/* Logo */}
          <div className="absolute top-5 right-5 flex items-center gap-1.5">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.2)" }}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="white">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" 
                      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
            <span className="text-sm font-semibold tracking-wider text-white/90">KODANO</span>
          </div>

          {/* Static checkmark */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(145deg, #FFFFFF, #F0F0F0)",
                boxShadow: "0 10px 40px rgba(47, 230, 200, 0.5)",
              }}
            >
              <svg viewBox="0 0 24 24" className="w-10 h-10">
                <path d="M4 12l6 6L20 6" fill="none" stroke={COLORS.teal} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Success badge */}
      <div
        className="flex items-center gap-2 px-5 py-2.5 rounded-full"
        style={{ background: COLORS.teal, boxShadow: "0 4px 20px rgba(47, 230, 200, 0.4)" }}
      >
        <svg viewBox="0 0 20 20" className="w-5 h-5">
          <path d="M4 10l4 4 8-8" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-sm font-semibold text-white">Pagamento aprovado!</span>
      </div>
    </div>
  );
}

export default PaymentCardAnimation;
