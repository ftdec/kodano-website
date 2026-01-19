"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion, useIsMobile } from "@/lib/animations/hooks";
import { CheckCircle } from "lucide-react";

// ============================================================================
// TYPES & CONFIG - Simplified for performance
// ============================================================================

type AnimationState = "idle" | "processing" | "success";

const COLORS = {
  cyanBase: "#0FA3B1",
  cyanLight: "#1BCAD3",
  teal: "#2FE6C8",
  white: "#FFFFFF",
} as const;

// ============================================================================
// MAIN COMPONENT - Performance optimized
// ============================================================================

export function PaymentCardAnimation({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [state, setState] = React.useState<AnimationState>("idle");
  const [mounted, setMounted] = React.useState(false);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    setMounted(true);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  React.useEffect(() => {
    // Skip animation on mobile or reduced motion preference
    if (!mounted || prefersReducedMotion || isMobile) {
      setState("success");
      return;
    }

    // Simple state machine with longer intervals
    const states: AnimationState[] = ["idle", "processing", "success"];
    let index = 0;

    const cycle = () => {
      index = (index + 1) % states.length;
      setState(states[index]);
    };

    intervalRef.current = setInterval(cycle, 2500);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [mounted, prefersReducedMotion, isMobile]);

  // Static card for mobile/reduced motion
  if (prefersReducedMotion || isMobile) {
    return (
      <div className={cn("relative w-full max-w-[480px]", className)}>
        <StaticCard />
      </div>
    );
  }

  return (
    <div
      className={cn("relative w-full max-w-[480px] flex flex-col items-center gap-4", className)}
      role="img"
      aria-label="Demonstração de pagamento seguro"
    >
      <div className="relative w-full aspect-[1.6/1]">
        <SimplePaymentCard state={state} />
      </div>
      <StatusBadge state={state} />
    </div>
  );
}

// ============================================================================
// SIMPLE PAYMENT CARD - No heavy effects
// ============================================================================

function SimplePaymentCard({ state }: { state: AnimationState }) {
  const isSuccess = state === "success";

  return (
    <motion.div
      className="relative w-full h-full rounded-2xl overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${COLORS.cyanLight} 0%, ${COLORS.cyanBase} 100%)`,
        boxShadow: isSuccess 
          ? "0 20px 40px rgba(15, 163, 177, 0.3)" 
          : "0 15px 30px rgba(15, 163, 177, 0.2)",
      }}
      animate={{
        scale: isSuccess ? 1.02 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Card content */}
      <div className="relative h-full p-6 flex flex-col justify-between">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div
            className="w-12 h-8 rounded"
            style={{
              background: "linear-gradient(145deg, #FFD700, #E5A800)",
            }}
          />
          <span className="text-sm font-semibold text-white/90 tracking-wider">KODANO</span>
        </div>

        {/* Card number */}
        <div className="font-mono text-lg text-white/90 tracking-widest">
          4532 •••• •••• 9010
        </div>

        {/* Footer */}
        <div className="flex justify-between text-xs text-white/70">
          <span>DEMO USER</span>
          <span>12/28</span>
        </div>
      </div>

      {/* Simple success overlay */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center"
            >
              <CheckCircle className="w-8 h-8 text-white" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ============================================================================
// STATUS BADGE
// ============================================================================

function StatusBadge({ state }: { state: AnimationState }) {
  return (
    <div className="h-8 flex items-center justify-center">
      <AnimatePresence mode="wait">
        {state === "processing" && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-sm"
          >
            <div className="w-3 h-3 rounded-full border-2 border-slate-400 border-t-transparent animate-spin" />
            <span>Processando...</span>
          </motion.div>
        )}

        {state === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Aprovado</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// STATIC CARD (for mobile/reduced motion)
// ============================================================================

function StaticCard() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative w-full aspect-[1.6/1] rounded-2xl p-6 flex flex-col justify-between"
        style={{
          background: `linear-gradient(135deg, ${COLORS.cyanLight}, ${COLORS.cyanBase})`,
          boxShadow: "0 15px 30px rgba(15,163,177,0.2)",
        }}
      >
        <div className="flex justify-between items-start">
          <div
            className="w-12 h-8 rounded"
            style={{ background: "linear-gradient(145deg, #FFD700, #E5A800)" }}
          />
          <span className="text-sm font-semibold text-white/90 tracking-wider">KODANO</span>
        </div>
        <div className="font-mono text-lg text-white/90 tracking-widest">
          4532 •••• •••• 9010
        </div>
        <div className="flex justify-between text-xs text-white/70">
          <span>DEMO USER</span>
          <span>12/28</span>
        </div>
      </div>
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
        <CheckCircle className="w-4 h-4" />
        <span>Pagamento Seguro</span>
      </div>
    </div>
  );
}

export default PaymentCardAnimation;
