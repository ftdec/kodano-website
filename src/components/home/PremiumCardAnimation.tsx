/**
 * Premium Card Animation - Ultra Version
 *
 * Bigger, more colorful, more animated!
 * Maximum visual impact
 */

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Check, Sparkles, Zap, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

type AnimationPhase = "idle" | "processing" | "success";

export function PremiumCardAnimation({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<AnimationPhase>("idle");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const sequence = async () => {
      setPhase("idle");
      await wait(4000); // Mais tempo no idle

      setPhase("processing");
      await wait(4500); // Processamento mais lento

      setPhase("success");
      await wait(3000); // Sucesso mais longo

      sequence();
    };

    sequence();
  }, [mounted]);

  if (!mounted) {
    return (
      <div
        className={cn(
          "relative w-full aspect-[1.1/1] rounded-3xl overflow-hidden",
          "bg-gradient-to-br from-slate-50 via-white to-slate-50",
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "relative w-full aspect-[1.1/1] rounded-3xl overflow-hidden",
        "bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50",
        "flex items-center justify-center p-6",
        className
      )}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, #4FACFE 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, #00DBDE 0%, transparent 50%)",
            "radial-gradient(circle at 50% 80%, #43E97B 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, #4FACFE 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-[#4FACFE] to-[#00DBDE]"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Main card container */}
      <motion.div
        className="relative z-10"
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute -inset-4 rounded-3xl opacity-50 blur-2xl"
          animate={{
            background: phase === "processing"
              ? "linear-gradient(45deg, #4FACFE, #00DBDE, #43E97B)"
              : phase === "success"
              ? "linear-gradient(45deg, #43E97B, #38d66a)"
              : "linear-gradient(45deg, #4FACFE, #00DBDE)",
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Card */}
        <div className="relative w-[420px] h-[260px]">
          {/* Processing waves */}
          <AnimatePresence>
            {phase === "processing" && (
              <>
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      border: "3px solid",
                      borderImage: "linear-gradient(45deg, #4FACFE, #00DBDE, #43E97B) 1",
                    }}
                    initial={{ scale: 1, opacity: 0 }}
                    animate={{
                      scale: [1, 1.4, 1.8],
                      opacity: [0.8, 0.4, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.4,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>

          {/* Success confetti */}
          <AnimatePresence>
            {phase === "success" && (
              <>
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                      background: i % 3 === 0 ? "#4FACFE" : i % 3 === 1 ? "#00DBDE" : "#43E97B",
                      left: "50%",
                      top: "50%",
                    }}
                    initial={{ scale: 0, x: 0, y: 0 }}
                    animate={{
                      scale: [0, 1, 0],
                      x: (Math.random() - 0.5) * 300,
                      y: (Math.random() - 0.5) * 300,
                      opacity: [1, 1, 0],
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.03,
                    }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>

          {/* Main card */}
          <motion.div
            className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
            animate={{
              scale: phase === "processing" ? [1, 1.03, 1] : 1,
              rotateY: phase === "idle" ? [0, 5, 0] : 0,
            }}
            transition={{
              scale: { duration: 2, repeat: phase === "processing" ? Infinity : 0 },
              rotateY: { duration: 4, repeat: Infinity },
            }}
          >
            {/* Holographic moving gradient */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
                backgroundSize: "200% 200%",
              }}
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            />

            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ["-200%", "200%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />

            {/* Card content */}
            <div className="relative w-full h-full p-8 flex flex-col justify-between">
              {/* Top row */}
              <div className="flex items-start justify-between">
                {/* Chip */}
                <motion.div
                  className="w-16 h-12 rounded-lg shadow-lg overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
                  }}
                  animate={{
                    boxShadow: phase === "processing"
                      ? ["0 0 20px rgba(246, 211, 101, 0.5)", "0 0 40px rgba(246, 211, 101, 0.8)", "0 0 20px rgba(246, 211, 101, 0.5)"]
                      : "0 0 20px rgba(246, 211, 101, 0.3)",
                  }}
                  transition={{ duration: 1, repeat: phase === "processing" ? Infinity : 0 }}
                >
                  <div className="w-full h-full p-1.5">
                    <div className="w-full h-full rounded border-2 border-yellow-400/40 grid grid-cols-3 gap-0.5">
                      {[...Array(9)].map((_, i) => (
                        <div key={i} className="bg-yellow-600/20 rounded-sm" />
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Contactless + Sparkles */}
                <div className="flex gap-3">
                  <motion.div
                    animate={{
                      scale: phase === "processing" ? [1, 1.2, 1] : 1,
                      rotate: phase === "processing" ? [0, 10, -10, 0] : 0,
                    }}
                    transition={{ duration: 1, repeat: phase === "processing" ? Infinity : 0 }}
                  >
                    <Sparkles className="w-6 h-6 text-white" />
                  </motion.div>

                  <motion.div
                    className="flex gap-0.5"
                    animate={{
                      opacity: phase === "processing" ? [0.5, 1, 0.5] : 0.7,
                    }}
                    transition={{ duration: 1, repeat: phase === "processing" ? Infinity : 0 }}
                  >
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-1.5 h-4 bg-white/60 rounded-full"
                        style={{
                          height: `${16 + i * 5}px`,
                          transform: "rotate(-25deg)",
                        }}
                      />
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Card number */}
              <div className="space-y-6">
                <div className="flex gap-4 text-white font-mono text-2xl tracking-widest">
                  {["4532", "••••", "••••", "9010"].map((group, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.2 * i + 0.5,
                        type: "spring",
                        bounce: 0.5,
                      }}
                    >
                      {group}
                    </motion.span>
                  ))}
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-xs text-white/50 uppercase tracking-wider mb-1.5">
                      Card Holder
                    </div>
                    <div className="text-base text-white font-semibold tracking-wide">
                      KODANO DEMO
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-white/50 uppercase tracking-wider mb-1.5">
                      Expires
                    </div>
                    <div className="text-base text-white font-semibold tracking-wide">
                      12/28
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom: Kodano logo */}
              <div className="flex justify-between items-end">
                <CreditCard className="w-8 h-8 text-white/40" />
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-10 h-10 rounded-full"
                    style={{
                      background: "linear-gradient(135deg, #4FACFE 0%, #00DBDE 100%)",
                    }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="w-10 h-10 rounded-full -ml-5"
                    style={{
                      background: "linear-gradient(135deg, #00DBDE 0%, #43E97B 100%)",
                    }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                </div>
              </div>
            </div>

            {/* Processing overlay */}
            <AnimatePresence>
              {phase === "processing" && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(79, 172, 254, 0.9), rgba(0, 219, 222, 0.9))",
                    backdropFilter: "blur(8px)",
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <div className="flex flex-col items-center gap-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Zap className="w-12 h-12 text-white" />
                    </motion.div>
                    <div className="flex gap-2">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-3 h-3 rounded-full bg-white"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success overlay */}
            <AnimatePresence>
              {phase === "success" && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(67, 233, 123, 0.95), rgba(56, 214, 106, 0.95))",
                    backdropFilter: "blur(8px)",
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 12,
                      delay: 0.1,
                    }}
                  >
                    <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-2xl">
                      <Check className="w-12 h-12 text-[#43E97B]" strokeWidth={4} />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Status text */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <AnimatePresence mode="wait">
            {phase === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: [1, 1.05, 1],
                }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                }}
                className="relative"
              >
                {/* Subtle glow background */}
                <motion.div
                  className="absolute -inset-4 rounded-2xl opacity-30 blur-xl"
                  animate={{
                    background: [
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      "linear-gradient(135deg, #4FACFE 0%, #00DBDE 100%)",
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    ],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Badge container */}
                <div className="relative px-6 py-3 rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-violet-200/60 shadow-lg">
                  <div className="flex items-center justify-center gap-3">
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Sparkles className="w-6 h-6 text-violet-600" />
                    </motion.div>
                    <p className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                      Pronto para processar
                    </p>
                    <motion.div
                      className="w-2.5 h-2.5 rounded-full bg-violet-500"
                      animate={{
                        opacity: [1, 0.3, 1],
                        scale: [1, 1.3, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
            {phase === "processing" && (
              <motion.div
                key="processing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center justify-center gap-2"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Zap className="w-5 h-5 text-blue-600" />
                </motion.div>
                <p className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Processando pagamento...
                </p>
              </motion.div>
            )}
            {phase === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center justify-center gap-2"
              >
                <Check className="w-6 h-6 text-green-600" strokeWidth={3} />
                <p className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Pagamento aprovado!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
