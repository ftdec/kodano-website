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

  let content: React.ReactNode = null;
  if (!mounted) content = <LoadingPlaceholder />;
  else if (canvasError) content = <FallbackShimmer />;
  else if (prefersReducedMotion || tier === "low" || !webGLSupported) content = <StaticPremiumFallback />;
  else {
    content = (
      <CanvasErrorBoundary fallback={<FallbackShimmer />} onError={() => setCanvasError(true)}>
        <PremiumCardCanvas
          performanceTier={tier}
          enableMotion={!prefersReducedMotion}
          inView={inView}
          debug={debug}
        />
      </CanvasErrorBoundary>
    );
  }

  const __DEV_BADGE =
    debug || process.env.NODE_ENV !== "production" ? (
      <div className="absolute top-3 left-3 z-20 text-[11px] px-2 py-1 rounded bg-black/60 text-white">
        {`mounted=${mounted} webgl=${webGLSupported} tier=${tier} reduced=${prefersReducedMotion} inView=${inView} err=${canvasError}`}
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
      {content}
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

function LoadingPlaceholder() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-[#061E26] via-[#072A35] to-[#0B2A35] relative">
      <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_30%_30%,rgba(0,200,220,0.28),transparent_45%),radial-gradient(circle_at_70%_60%,rgba(124,243,255,0.18),transparent_50%)]" />
      <div className="absolute inset-0 animate-pulse opacity-40 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.06),transparent)]" />
    </div>
  );
}

function StaticPremiumFallback() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-[#061E26] via-[#072A35] to-[#0B2A35] relative">
      <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_35%_35%,rgba(0,200,220,0.24),transparent_45%),radial-gradient(circle_at_75%_60%,rgba(155,123,214,0.14),transparent_55%)]" />
      <div className="absolute inset-0 opacity-35 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.08),transparent)]" />
      <div className="absolute top-5 left-5 rounded-full border border-white/15 bg-black/25 px-3 py-1 text-[11px] text-white/80 backdrop-blur">
        Visualização simplificada
      </div>
      <div className="absolute bottom-6 left-6 text-white/80">
        <div className="text-sm tracking-wide">KODANO</div>
        <div className="mt-2 text-xs text-white/60">Pagamentos modernos, simples e seguros</div>
      </div>
    </div>
  );
}

function FallbackShimmer() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-[#061E26] via-[#072A35] to-[#0B2A35] relative">
      <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_35%_35%,rgba(0,200,220,0.22),transparent_45%),radial-gradient(circle_at_75%_60%,rgba(124,243,255,0.16),transparent_55%)]" />
      <div className="absolute inset-0 animate-[shimmer_2.2s_infinite] opacity-40 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.10),transparent)]" />
      <div className="absolute top-5 left-5 rounded-full border border-white/15 bg-black/25 px-3 py-1 text-[11px] text-white/80 backdrop-blur">
        Visualização simplificada
      </div>
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-40%); }
          100% { transform: translateX(40%); }
        }
      `}</style>
    </div>
  );
}
