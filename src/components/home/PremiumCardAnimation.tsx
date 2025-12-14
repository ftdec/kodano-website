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
      <div className="absolute top-3 left-3 z-20 text-[11px] px-2 py-1 rounded bg-black/60 text-white">
        {`mounted=${mounted} webgl=${webGLSupported} tier=${tier} reduced=${prefersReducedMotion} inView=${inView} err=${canvasError} canvas=${canvasVisible}`}
      </div>
    ) : null;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full aspect-[1.1/1] rounded-3xl overflow-hidden bg-gradient-to-br from-[#061E26] via-[#072A35] to-[#0B2A35]",
        className
      )}
      style={{ touchAction: "pan-y" }}
    >
      {__DEV_BADGE}

      {/* Poster sempre presente no primeiro paint (zero flash) */}
      <PosterCard className={cn("absolute inset-0 transition-opacity duration-300", canvasVisible ? "opacity-0" : "opacity-100")} />

      {/* Fallback explícito se o 3D não deve/pode rodar */}
      {!shouldRender3D && (
        <div className="absolute top-5 left-5 z-10 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-[11px] text-[#0B1F2A]/80 backdrop-blur">
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
    <div
      className={cn(
        "w-full h-full bg-white relative",
        "bg-[radial-gradient(circle_at_35%_38%,rgba(14,165,164,0.10),transparent_52%),radial-gradient(circle_at_72%_58%,rgba(127,227,225,0.08),transparent_55%)]",
        className
      )}
    >
      {/* Aura extra */}
      <div className="absolute inset-0 opacity-60 blur-2xl bg-[radial-gradient(circle_at_40%_42%,rgba(14,165,164,0.18),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(127,227,225,0.12),transparent_55%)]" />

      {/* Card poster */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[78%] h-[52%]">
          <div className="absolute inset-0 rounded-[26px] bg-[#10161f] shadow-[0_36px_80px_rgba(0,0,0,0.22)]" />
          <div className="absolute inset-0 rounded-[26px] ring-1 ring-black/10" />

          {/* Top coat highlight (bem sutil) */}
          <div className="absolute inset-[1px] rounded-[25px] bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.10),transparent_55%),linear-gradient(120deg,rgba(127,227,225,0.08),transparent_40%)] opacity-70" />

          {/* Logo */}
          <div className="absolute top-[14%] left-1/2 -translate-x-1/2 text-[12px] tracking-[0.32em] font-semibold text-[#6FBFBF]">
            KODANO
          </div>

          {/* Chip */}
          <div className="absolute left-[14%] top-[38%] w-[22%] h-[22%] rounded-[10px] bg-[#d6b15a] shadow-inner shadow-black/20 ring-1 ring-black/10" />
          <div className="absolute left-[16.5%] top-[45%] w-[17%] h-[2px] bg-black/20" />
          <div className="absolute left-[16.5%] top-[52%] w-[17%] h-[2px] bg-black/20" />

          {/* Número */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[26%] text-[13px] tracking-[0.32em] text-[#D8F6FB]/85">
            4532 •••• •••• 9010
          </div>

          {/* Footer */}
          <div className="absolute left-[10%] bottom-[12%] text-[10px] tracking-[0.18em] text-[#D8F6FB]/70">
            KODANO DEMO
          </div>
          <div className="absolute right-[10%] bottom-[12%] text-[10px] tracking-[0.18em] text-[#D8F6FB]/70">
            12/28
          </div>
        </div>
      </div>
    </div>
  );
}
