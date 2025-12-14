"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/animations/hooks";
import PremiumCardCanvas from "./PremiumCardCanvas";

type PerformanceTier = "high" | "medium" | "low";

class CanvasErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode; onError?: () => void },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(err: unknown) {
    console.error("[PremiumCardAnimation] Canvas failed to render", err);
    this.props.onError?.();
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

export function PremiumCardAnimation({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  const [mounted, setMounted] = React.useState(false);
  const [webGLSupported, setWebGLSupported] = React.useState<boolean>(false);
  const [tier, setTier] = React.useState<PerformanceTier>("medium");
  const [inView, setInView] = React.useState(true);
  const [canvasError, setCanvasError] = React.useState(false);
  const [debug, setDebug] = React.useState(false);
  const [canvasVisible, setCanvasVisible] = React.useState(false);

  const containerRef = React.useRef<HTMLDivElement | null>(null);

  // Montagem (hydration-safe)
  React.useEffect(() => setMounted(true), []);

  // Detecta WebGL e tier só no client
  React.useEffect(() => {
    if (!mounted) return;
    setWebGLSupported(detectWebGLSupport());
    setTier(detectPerformanceTier());
  }, [mounted]);

  // Debug mode: habilita badge via ?cardDebug=1 (inclusive em produção)
  React.useEffect(() => {
    if (!mounted) return;
    try {
      setDebug(new URLSearchParams(window.location.search).has("cardDebug"));
    } catch {
      setDebug(false);
    }
  }, [mounted]);

  // Se o ambiente muda (ou re-monta), limpamos erro anterior do Canvas
  React.useEffect(() => {
    setCanvasError(false);
    setCanvasVisible(false);
  }, [mounted, webGLSupported, tier, prefersReducedMotion]);

  // IntersectionObserver: anima quando visível, dorme quando fora
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const shouldRender3D = mounted && !canvasError && !prefersReducedMotion && tier !== "low" && webGLSupported;

  const __DEV_BADGE =
    debug || process.env.NODE_ENV !== "production" ? (
      <div className="absolute top-3 left-3 z-20 text-[11px] px-2 py-1 rounded bg-[#0A1F2C]/70 text-white">
        {`mounted=${mounted} webgl=${webGLSupported} tier=${tier} reduced=${prefersReducedMotion} inView=${inView} err=${canvasError} canvas=${canvasVisible}`}
      </div>
    ) : null;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full aspect-[1.1/1] rounded-3xl overflow-hidden bg-white",
        className
      )}
      style={{ touchAction: "pan-y" }}
    >
      {__DEV_BADGE}

      {/* Poster sempre presente no primeiro paint (zero flash) */}
      <PosterCard className={cn("absolute inset-0 transition-opacity duration-300", canvasVisible ? "opacity-0" : "opacity-100")} />

      {/* Fallback explícito se o 3D não deve/pode rodar */}
      {!shouldRender3D && (
        <div className="absolute top-5 left-5 z-10 rounded-full border border-[#0A1F2C]/10 bg-white/70 px-3 py-1 text-[11px] text-[#0A1F2C]/80 backdrop-blur">
          Visualização simplificada
        </div>
      )}

      {/* 3D por cima com fade-in quando pronto */}
      {shouldRender3D && (
        <div
          className={cn("absolute inset-0 transition-opacity duration-300", canvasVisible ? "opacity-100" : "opacity-0")}
        >
          <CanvasErrorBoundary fallback={null} onError={() => setCanvasError(true)}>
            <PremiumCardCanvas
              performanceTier={tier}
              enableMotion={!prefersReducedMotion}
              inView={inView}
              debug={debug}
              onReady={() => setCanvasVisible(true)}
            />
          </CanvasErrorBoundary>
        </div>
      )}
    </div>
  );
}

function detectWebGLSupport(): boolean {
  try {
    const canvas = document.createElement("canvas");

    const gl2 = canvas.getContext("webgl2");
    if (gl2) return true;

    const gl1 =
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    return !!gl1;
  } catch {
    return false;
  }
}

function detectPerformanceTier(): PerformanceTier {
  try {
    const cores = navigator.hardwareConcurrency || 4;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 4;
    const dpr = window.devicePixelRatio || 1;

    let score = 0;
    if (cores >= 8) score += 2;
    if (memory >= 8) score += 2;
    if (dpr <= 1.5) score += 1;

    if (score >= 4) return "high";
    if (score >= 2) return "medium";
    return "low";
  } catch {
    return "medium";
  }
}

function PosterCard({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 flex items-center justify-center rounded-3xl bg-white", className)}>
      {/* Halo */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <div
          className="absolute inset-[-20%]"
          style={{
            background:
              "radial-gradient(60% 60% at 70% 30%, rgba(79,172,254,0.25), rgba(47,230,200,0.12), transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* Card */}
      <div
        className="relative w-[78%] aspect-[1.6/1] rounded-2xl p-6"
        style={{
          background: "linear-gradient(135deg, #0A1F2C 0%, #0D2C3F 45%, #071821 100%)",
          boxShadow: "0 30px 80px rgba(10,31,44,0.45)",
        }}
      >
        {/* Logo */}
        <div className="absolute top-5 right-6 text-white" style={{ opacity: 0.85 }}>
          KODANO
        </div>

        {/* Chip */}
        <div
          className="w-12 h-9 rounded-md"
          style={{
            background: "linear-gradient(135deg, #4FACFE, #2FE6C8)",
            boxShadow:
              "inset 0 0 0 1px rgba(255,255,255,0.25), 0 4px 12px rgba(47,230,200,0.35)",
          }}
        />

        {/* Number */}
        <div className="mt-8 text-white tracking-[0.18em] text-sm opacity-95">
          4532 •••• •••• 9010
        </div>

        {/* Name */}
        <div className="mt-2 text-xs text-[#A8C5D1]">
          KODANO DEMO
        </div>
      </div>
    </div>
  );
}
