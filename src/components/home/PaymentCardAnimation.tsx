"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion, useIsMobile } from "@/lib/animations/hooks";
import { CheckCircle, Shield, User, CreditCard, Lock } from "lucide-react";

// ============================================================================
// TYPES & CONFIG
// ============================================================================

type AnimationState = "payment" | "verifying" | "identity" | "approved";

// Kodano Bank - Emerald Premium Colors
const COLORS = {
  emeraldDark: "#0B5F4B",    // emerald-700
  emeraldBase: "#0F7D63",    // emerald-500 (primary)
  emeraldLight: "#6AAE9E",   // emerald-400
  emeraldPale: "#95C6BA",    // emerald-300
  white: "#FFFFFF",
} as const;

const STATE_DURATION = 2200; // ms per state

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function PaymentCardAnimation({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [state, setState] = React.useState<AnimationState>("payment");
  const [mounted, setMounted] = React.useState(false);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    setMounted(true);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  React.useEffect(() => {
    if (!mounted || prefersReducedMotion || isMobile) {
      setState("approved");
      return;
    }

    const states: AnimationState[] = ["payment", "verifying", "identity", "approved"];
    let index = 0;

    const cycle = () => {
      index = (index + 1) % states.length;
      setState(states[index]);
    };

    intervalRef.current = setInterval(cycle, STATE_DURATION);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [mounted, prefersReducedMotion, isMobile]);

  // Static for mobile/reduced motion
  if (prefersReducedMotion || isMobile) {
    return (
      <div className={cn("relative w-full max-w-[520px]", className)}>
        <StaticApprovedCard />
      </div>
    );
  }

  return (
    <div
      className={cn("relative w-full max-w-[520px] flex flex-col items-center gap-6", className)}
      role="img"
      aria-label="Demonstração de verificação de identidade em pagamentos"
    >
      {/* Card with verification overlay */}
      <div className="relative w-full aspect-[1.6/1]">
        <PaymentCard state={state} />
        <VerificationOverlay state={state} />
      </div>

      {/* Process steps */}
      <ProcessSteps state={state} />

      {/* Status message */}
      <StatusMessage state={state} />
    </div>
  );
}

// ============================================================================
// PAYMENT CARD
// ============================================================================

function PaymentCard({ state }: { state: AnimationState }) {
  const isApproved = state === "approved";

  return (
    <motion.div
      className="relative w-full h-full rounded-2xl overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${COLORS.emeraldLight} 0%, ${COLORS.emeraldBase} 50%, ${COLORS.emeraldDark} 100%)`,
        boxShadow: isApproved 
          ? "0 25px 50px rgba(15, 125, 99, 0.35)" 
          : "0 20px 40px rgba(15, 125, 99, 0.25)",
      }}
      animate={{
        scale: isApproved ? 1.02 : 1,
      }}
      transition={{ duration: 0.4 }}
    >
      {/* Card content */}
      <div className="relative h-full p-6 flex flex-col justify-between">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div
            className="w-12 h-8 rounded"
            style={{ background: "linear-gradient(145deg, #FFD700, #E5A800)" }}
          />
          <span className="text-sm font-semibold text-white/90 tracking-wider">KODANO</span>
        </div>

        {/* Card number */}
        <div className="font-mono text-lg text-white/90 tracking-widest">
          4532 •••• •••• 9010
        </div>

        {/* Footer */}
        <div className="flex justify-between text-xs text-white/70">
          <span>TITULAR DO CARTÃO</span>
          <span>12/28</span>
        </div>
      </div>

      {/* Approved glow */}
      <AnimatePresence>
        {isApproved && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(149, 198, 186, 0.2), transparent 70%)",
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ============================================================================
// VERIFICATION OVERLAY
// ============================================================================

function VerificationOverlay({ state }: { state: AnimationState }) {
  const showOverlay = state === "verifying" || state === "identity";

  return (
    <AnimatePresence>
      {showOverlay && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Scanning effect */}
          <motion.div
            className="absolute inset-0 overflow-hidden rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              animate={{ y: ["0%", "400%", "0%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Center verification icon */}
          <motion.div
            className="relative z-10 w-20 h-20 rounded-full bg-white/95 shadow-xl flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {state === "verifying" && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              >
                <Shield className="w-9 h-9 text-emerald-600" />
              </motion.div>
            )}
            {state === "identity" && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <User className="w-9 h-9 text-emerald-500" />
              </motion.div>
            )}
          </motion.div>

          {/* Pulse rings */}
          {state === "verifying" && (
            <>
              <motion.div
                className="absolute w-24 h-24 rounded-full border-2 border-white/30"
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
              <motion.div
                className="absolute w-24 h-24 rounded-full border-2 border-white/30"
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
              />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// PROCESS STEPS
// ============================================================================

const steps = [
  { id: "payment", icon: CreditCard, label: "Pagamento" },
  { id: "verifying", icon: Shield, label: "Segurança" },
  { id: "identity", icon: User, label: "Identidade" },
  { id: "approved", icon: CheckCircle, label: "Aprovado" },
];

function ProcessSteps({ state }: { state: AnimationState }) {
  const currentIndex = steps.findIndex(s => s.id === state);

  return (
    <div className="flex items-center gap-2 w-full max-w-md">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = index === currentIndex;
        const isCompleted = index < currentIndex;

        return (
          <React.Fragment key={step.id}>
            <motion.div
              className={cn(
                "flex flex-col items-center gap-1.5 flex-1",
                isActive && "scale-105"
              )}
              animate={{ opacity: isActive || isCompleted ? 1 : 0.4 }}
            >
              <motion.div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300",
                  isCompleted && "bg-emerald-100",
                  isActive && "bg-emerald-100",
                  !isActive && !isCompleted && "bg-slate-100"
                )}
                animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5 }}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 transition-colors duration-300",
                    isCompleted && "text-emerald-600",
                    isActive && "text-emerald-600",
                    !isActive && !isCompleted && "text-slate-400"
                  )}
                />
              </motion.div>
              <span
                className={cn(
                  "text-xs font-medium transition-colors duration-300",
                  isActive || isCompleted ? "text-slate-700" : "text-slate-400"
                )}
              >
                {step.label}
              </span>
            </motion.div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className="flex-shrink-0 w-8 h-0.5 bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-emerald-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: index < currentIndex ? "100%" : "0%" }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ============================================================================
// STATUS MESSAGE
// ============================================================================

const statusMessages: Record<AnimationState, { text: string; color: string }> = {
  payment: { text: "Cliente inicia o pagamento", color: "text-slate-600" },
  verifying: { text: "Kodano analisa a transação", color: "text-emerald-700" },
  identity: { text: "Verificando identidade do pagador", color: "text-emerald-700" },
  approved: { text: "Pagamento aprovado com segurança", color: "text-emerald-700" },
};

function StatusMessage({ state }: { state: AnimationState }) {
  const { text, color } = statusMessages[state];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={state}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full",
          "bg-emerald-50"
        )}
      >
        {state === "verifying" && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          >
            <Lock className="w-4 h-4 text-emerald-600" />
          </motion.div>
        )}
        {state === "identity" && <User className="w-4 h-4 text-emerald-600" />}
        {state === "approved" && <CheckCircle className="w-4 h-4 text-emerald-600" />}
        {state === "payment" && <CreditCard className="w-4 h-4 text-emerald-500" />}
        
        <span className={cn("text-sm font-medium", color)}>{text}</span>
      </motion.div>
    </AnimatePresence>
  );
}

// ============================================================================
// STATIC CARD (for mobile/reduced motion)
// ============================================================================

function StaticApprovedCard() {
  return (
    <div className="flex flex-col items-center gap-5">
      <div
        className="relative w-full aspect-[1.6/1] rounded-2xl p-6 flex flex-col justify-between"
        style={{
          background: `linear-gradient(135deg, ${COLORS.emeraldLight}, ${COLORS.emeraldBase}, ${COLORS.emeraldDark})`,
          boxShadow: "0 20px 40px rgba(15, 125, 99, 0.25)",
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
          <span>TITULAR DO CARTÃO</span>
          <span>12/28</span>
        </div>

        {/* Static verification badge */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-16 h-16 rounded-full bg-white/95 shadow-lg flex items-center justify-center">
            <Shield className="w-8 h-8 text-emerald-600" />
          </div>
        </div>
      </div>

      {/* Static steps */}
      <div className="flex items-center gap-3">
        {[
          { icon: CreditCard, label: "Pagamento" },
          { icon: Shield, label: "Segurança" },
          { icon: User, label: "Identidade" },
          { icon: CheckCircle, label: "Aprovado" },
        ].map((step, i) => (
          <React.Fragment key={step.label}>
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                <step.icon className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="text-xs text-slate-600">{step.label}</span>
            </div>
            {i < 3 && <div className="w-4 h-0.5 bg-emerald-400 rounded-full" />}
          </React.Fragment>
        ))}
      </div>

      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50">
        <CheckCircle className="w-4 h-4 text-emerald-600" />
        <span className="text-sm font-medium text-emerald-700">
          Pagamento seguro com verificação de identidade
        </span>
      </div>
    </div>
  );
}

export default PaymentCardAnimation;
