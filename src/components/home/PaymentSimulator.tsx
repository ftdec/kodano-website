/**
 * Payment Simulator - Interactive Payment Demo
 *
 * Clean, Stripe-style interactive simulator where users can:
 * 1. Enter payment amount
 * 2. Click "Process Payment"
 * 3. Watch 4-step timeline animation
 * 4. See success confirmation
 *
 * Visual Style: Stripe Checkout minimal premium
 * Tech: React + Framer Motion (NO WebGL/3D)
 */

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Shield, Route, CheckCircle, DollarSign, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type SimulatorState = "idle" | "processing" | "success";

type Step = {
  id: number;
  label: string;
  description: string;
  duration: number; // milliseconds
  icon: React.ReactNode;
};

const STEPS: Step[] = [
  {
    id: 1,
    label: "Validação",
    description: "Verificando dados do pagamento",
    duration: 1500,
    icon: <Shield className="w-5 h-5" />,
  },
  {
    id: 2,
    label: "Roteamento",
    description: "Escolhendo melhor rota",
    duration: 2000,
    icon: <Route className="w-5 h-5" />,
  },
  {
    id: 3,
    label: "Aprovação",
    description: "Processando transação",
    duration: 1500,
    icon: <CheckCircle className="w-5 h-5" />,
  },
  {
    id: 4,
    label: "Liquidação",
    description: "Confirmando pagamento",
    duration: 1000,
    icon: <DollarSign className="w-5 h-5" />,
  },
];

export function PaymentSimulator({ className }: { className?: string }) {
  const [state, setState] = useState<SimulatorState>("idle");
  const [amount, setAmount] = useState("500.00");
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Reset function
  const handleReset = () => {
    setState("idle");
    setCurrentStep(0);
    setCompletedSteps([]);
  };

  // Process payment
  const handleProcess = () => {
    if (!amount || parseFloat(amount) <= 0) return;

    setState("processing");
    setCurrentStep(1);
    setCompletedSteps([]);
  };

  // Timeline progression
  useEffect(() => {
    if (state !== "processing" || currentStep === 0) return;

    const step = STEPS[currentStep - 1];
    if (!step) return;

    const timer = setTimeout(() => {
      // Mark current step as completed
      setCompletedSteps((prev) => [...prev, currentStep]);

      // Move to next step or finish
      if (currentStep < STEPS.length) {
        setCurrentStep((prev) => prev + 1);
      } else {
        // All steps completed
        setState("success");
      }
    }, step.duration);

    return () => clearTimeout(timer);
  }, [state, currentStep]);

  return (
    <div
      className={cn(
        "relative w-full aspect-[1.1/1] rounded-3xl border border-border/50 overflow-hidden",
        "bg-white/95 backdrop-blur-sm shadow-[0_30px_90px_rgba(15,23,42,0.08)]",
        "flex items-center justify-center p-8",
        className
      )}
    >
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {/* IDLE STATE - Form */}
          {state === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-slate-900 mb-2">
                  Simular Pagamento
                </h3>
                <p className="text-sm text-slate-600">
                  Veja o fluxo Kodano em ação
                </p>
              </div>

              {/* Amount Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Valor
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
                    R$
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    step="0.01"
                    min="0"
                    className={cn(
                      "w-full pl-12 pr-4 py-3.5 rounded-xl",
                      "border border-slate-200 bg-white",
                      "text-lg font-medium text-slate-900",
                      "focus:outline-none focus:ring-2 focus:ring-[#4FACFE] focus:border-transparent",
                      "transition-shadow"
                    )}
                    placeholder="500.00"
                  />
                </div>
              </div>

              {/* Process Button */}
              <motion.button
                onClick={handleProcess}
                disabled={!amount || parseFloat(amount) <= 0}
                className={cn(
                  "w-full py-4 rounded-xl font-semibold text-white",
                  "bg-gradient-to-r from-[#4FACFE] to-[#00DBDE]",
                  "hover:shadow-lg hover:scale-[1.02]",
                  "active:scale-[0.98]",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "transition-all duration-200"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Processar Pagamento
                </span>
              </motion.button>
            </motion.div>
          )}

          {/* PROCESSING STATE - Timeline */}
          {state === "processing" && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8">
                <motion.div
                  className="inline-flex items-center gap-2 text-lg font-semibold text-slate-900"
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <div className="w-2 h-2 rounded-full bg-[#4FACFE] animate-pulse" />
                  Processando R$ {parseFloat(amount).toFixed(2)}
                </motion.div>
              </div>

              {/* Timeline */}
              <div className="space-y-6">
                {STEPS.map((step, index) => {
                  const stepNumber = index + 1;
                  const isActive = currentStep === stepNumber;
                  const isCompleted = completedSteps.includes(stepNumber);
                  const isWaiting = currentStep < stepNumber;

                  return (
                    <StepItem
                      key={step.id}
                      step={step}
                      isActive={isActive}
                      isCompleted={isCompleted}
                      isWaiting={isWaiting}
                    />
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* SUCCESS STATE */}
          {state === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, type: "spring" }}
            >
              {/* Success Icon */}
              <motion.div
                className="flex justify-center mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#43E97B] to-[#38d66a] flex items-center justify-center shadow-lg">
                  <Check className="w-10 h-10 text-white" strokeWidth={3} />
                </div>
              </motion.div>

              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-2xl font-semibold text-slate-900 mb-2">
                  Pagamento Aprovado!
                </h3>
                <p className="text-slate-600 mb-4">
                  R$ {parseFloat(amount).toFixed(2)} processado com sucesso
                </p>
                <p className="text-sm text-slate-500">
                  Liquidação em 1 dia útil
                </p>
              </motion.div>

              {/* Reset Button */}
              <motion.button
                onClick={handleReset}
                className={cn(
                  "w-full py-3.5 rounded-xl font-medium",
                  "border-2 border-slate-200 text-slate-700",
                  "hover:border-slate-300 hover:bg-slate-50",
                  "transition-colors"
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                Simular Novamente
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/**
 * Individual Step Item in Timeline
 */
function StepItem({
  step,
  isActive,
  isCompleted,
  isWaiting,
}: {
  step: Step;
  isActive: boolean;
  isCompleted: boolean;
  isWaiting: boolean;
}) {
  return (
    <motion.div
      className="flex items-start gap-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: (step.id - 1) * 0.1 }}
    >
      {/* Icon Circle */}
      <div className="relative flex-shrink-0">
        <motion.div
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center",
            "transition-colors duration-300",
            isCompleted && "bg-[#43E97B] text-white",
            isActive && "bg-[#4FACFE] text-white",
            isWaiting && "bg-slate-100 text-slate-400 border-2 border-slate-200"
          )}
          animate={
            isActive
              ? {
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(79, 172, 254, 0)",
                    "0 0 0 8px rgba(79, 172, 254, 0.1)",
                    "0 0 0 0 rgba(79, 172, 254, 0)",
                  ],
                }
              : {}
          }
          transition={
            isActive
              ? { duration: 2, repeat: Infinity }
              : { duration: 0.3 }
          }
        >
          {isCompleted ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Check className="w-6 h-6" strokeWidth={3} />
            </motion.div>
          ) : (
            step.icon
          )}
        </motion.div>
      </div>

      {/* Label & Description */}
      <div className="flex-1 pt-2">
        <h4
          className={cn(
            "font-semibold mb-1 transition-colors",
            (isActive || isCompleted) && "text-slate-900",
            isWaiting && "text-slate-400"
          )}
        >
          {step.label}
        </h4>
        <AnimatePresence mode="wait">
          {(isActive || isCompleted) && (
            <motion.p
              key={step.id}
              className="text-sm text-slate-600"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              {step.description}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Progress Bar */}
        {isActive && (
          <motion.div
            className="mt-2 h-1 bg-slate-100 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-[#4FACFE] to-[#00DBDE]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: step.duration / 1000,
                ease: "linear",
              }}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
