/**
 * Kodano Payment Vision - Revolutionary Payment Flow Animation
 *
 * Concept: "Payment X-Ray" - Cinematic visualization of payment infrastructure
 *
 * Phases (8-10s loop):
 * 1. Card presentation (0-2s)
 * 2. Data extraction (2-4s)
 * 3. Tokenization (4-6s)
 * 4. Intelligent routing (6-8s)
 * 5. Distributed processing (8-10s)
 * 6. Elegant approval (10-11s)
 * 7. Settlement flow (11-12s)
 *
 * Tech: React Three Fiber + Canvas particles + GLSL shaders
 * Performance: 60fps desktop / 30fps mobile
 */

"use client";

import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useMotionValue, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile, useReducedMotion } from "@/lib/animations/hooks";

// Components
import { CardScene } from "./components/CardScene";
import { ParticleSystem } from "./components/ParticleSystem";
import { RoutingRails } from "./components/RoutingRails";
import { ProcessingNetwork } from "./components/ProcessingNetwork";

// Hooks
import { usePhaseOrchestration } from "./hooks/usePhaseOrchestration";

interface PaymentVisionProps {
  className?: string;
  scrollProgress?: MotionValue<number> | null;
}

export function KodanoPaymentVision({
  className,
  scrollProgress,
}: PaymentVisionProps) {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);

  // Fallback for reduced motion: static illustration
  if (prefersReducedMotion) {
    return <PaymentVisionFallback className={className} />;
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full aspect-[1.1/1] rounded-3xl border border-border/50 overflow-hidden",
        "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
        "shadow-[0_30px_90px_rgba(15,23,42,0.3)]",
        className
      )}
      aria-hidden="true"
    >
      {/* Premium dark background with subtle gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4FACFE]/5 via-transparent to-[#43E97B]/5" />
        <div className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full bg-[#4FACFE]/8 blur-[120px]" />
        <div className="absolute -bottom-32 -left-32 w-[420px] h-[420px] rounded-full bg-[#43E97B]/8 blur-[120px]" />
      </div>

      {/* 3D Canvas Scene */}
      <Suspense fallback={<PaymentVisionFallback className="absolute inset-0" />}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          gl={{
            antialias: !isMobile,
            alpha: true,
            powerPreference: "high-performance",
          }}
          dpr={isMobile ? [1, 1.5] : [1, 2]}
          className="absolute inset-0"
        >
          {/* Ambient lighting */}
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#4FACFE" />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#43E97B" />

          {/* Main scene */}
          <PaymentVisionScene
            isMobile={isMobile}
            scrollProgress={scrollProgress}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}

/**
 * Main 3D scene with all animation phases
 */
function PaymentVisionScene({
  isMobile,
  scrollProgress,
}: {
  isMobile: boolean;
  scrollProgress: MotionValue<number> | null;
}) {
  const { currentPhase, phaseProgress, globalTime } = usePhaseOrchestration({
    totalDuration: isMobile ? 10 : 12, // Shorter on mobile
    scrollProgress,
  });

  return (
    <group>
      {/* Phase 1-2: Card + Data Extraction */}
      {(currentPhase === 0 || currentPhase === 1) && (
        <>
          <CardScene
            phase={currentPhase}
            progress={phaseProgress}
            time={globalTime}
          />
          {currentPhase === 1 && (
            <ParticleSystem
              mode="extraction"
              progress={phaseProgress}
              count={isMobile ? 150 : 300}
            />
          )}
        </>
      )}

      {/* Phase 3: Tokenization (morphing) */}
      {currentPhase === 2 && (
        <>
          <CardScene
            phase={currentPhase}
            progress={phaseProgress}
            time={globalTime}
            blur
          />
          <ParticleSystem
            mode="tokenization"
            progress={phaseProgress}
            count={isMobile ? 100 : 200}
          />
        </>
      )}

      {/* Phase 4: Intelligent Routing */}
      {currentPhase === 3 && (
        <>
          <RoutingRails
            progress={phaseProgress}
            pathCount={isMobile ? 3 : 5}
          />
          <ParticleSystem
            mode="packet"
            progress={phaseProgress}
            count={50}
          />
        </>
      )}

      {/* Phase 5: Distributed Processing */}
      {currentPhase === 4 && (
        <>
          <ProcessingNetwork
            progress={phaseProgress}
            nodeCount={isMobile ? 6 : 8}
          />
          <ParticleSystem
            mode="processing"
            progress={phaseProgress}
            count={isMobile ? 100 : 200}
          />
        </>
      )}

      {/* Phase 6-7: Approval + Settlement */}
      {(currentPhase === 5 || currentPhase === 6) && (
        <ParticleSystem
          mode={currentPhase === 5 ? "approval" : "settlement"}
          progress={phaseProgress}
          count={isMobile ? 150 : 300}
        />
      )}
    </group>
  );
}

/**
 * Fallback for reduced motion or WebGL failure
 */
function PaymentVisionFallback({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-full h-full flex items-center justify-center",
        "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
        className
      )}
    >
      {/* Static premium illustration */}
      <svg
        className="w-3/4 h-3/4 opacity-60"
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Card outline */}
        <rect
          x="100"
          y="100"
          width="200"
          height="120"
          rx="12"
          stroke="url(#grad1)"
          strokeWidth="2"
          fill="none"
        />

        {/* Chip */}
        <rect
          x="130"
          y="130"
          width="40"
          height="30"
          rx="4"
          fill="url(#grad1)"
          opacity="0.6"
        />

        {/* Flow lines */}
        <path
          d="M 200 220 Q 250 250 300 220"
          stroke="url(#grad1)"
          strokeWidth="2"
          strokeDasharray="4 4"
          fill="none"
          opacity="0.4"
        />

        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4FACFE" />
            <stop offset="50%" stopColor="#00DBDE" />
            <stop offset="100%" stopColor="#43E97B" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
