"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/animations/hooks";
import dynamic from "next/dynamic";
import { PremiumCardPoster } from "./PremiumCardPoster";

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

const PremiumCardCanvas = dynamic(() => import("./PremiumCardCanvas"), {
  ssr: false,
  loading: () => null,
});

export function PremiumCardAnimation({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  const [mounted, setMounted] = React.useState(false);
  const [webGLSupported, setWebGLSupported] = React.useState<boolean>(false);
  const [tier, setTier] = React.useState<PerformanceTier>("medium");
  const [inView, setInView] = React.useState(true);
  const [canvasError, setCanvasError] = React.useState(false);
  const [debug, setDebug] = React.useState(false);
  const [canvasReady, setCanvasReady] = React.useState(false);
  const [show3D, setShow3D] = React.useState(false);

  const containerRef = React.useRef<HTMLDivElement | null>(null);

  // Montagem (hydration-safe)
  React.useEffect(() => setMounted(true), []);

  // Detecta WebGL e tier só no client
  React.useEffect(() => {
    if (!mounted) return;
    setWebGLSupported(detectWebGLSupport());
    setTier(detectPerformanceTier());
    // Preload do chunk 3D para reduzir atraso
    import("./PremiumCardCanvas").catch(() => {
      /* ignore */
    });
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
    setCanvasReady(false);
    setShow3D(false);
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

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full max-w-[640px] aspect-[4/3] md:aspect-[16/10] rounded-[28px] overflow-hidden bg-white",
        "shadow-[0_32px_64px_rgba(0,42,53,0.12),0_12px_24px_rgba(0,42,53,0.08)]",
        className
      )}
      style={{ touchAction: "pan-y" }}
    >
      {/* Stage background: halo sutil + vignette (PRD: 6-10% opacity) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Halo ciano Kodano (6-8% opacity per PRD) */}
        <div
          className="absolute inset-[-20%] rounded-[28px]"
          style={{
            background:
              "radial-gradient(55% 55% at 60% 40%, rgba(0,200,220,0.07), rgba(79,172,254,0.04), transparent 60%)",
            filter: "blur(36px)",
          }}
        />
        {/* Vignette suave nas bordas (3% per PRD) */}
        <div
          className="absolute inset-0 rounded-[28px]"
          style={{
            background:
              "radial-gradient(105% 105% at 50% 50%, transparent 50%, rgba(0,42,53,0.03) 100%)",
          }}
        />
      </div>

      {/* Poster sempre presente; fade imperceptível para 3D (PRD: 150-250ms) */}
      <PremiumCardPoster
        className={cn(
          "absolute inset-0 transition-opacity duration-200 ease-out",
          show3D ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      />

      {/* Canvas 3D enhancement */}
      {shouldRender3D && (
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-200 ease-out",
            canvasReady ? "opacity-100" : "opacity-0"
          )}
        >
          <CanvasErrorBoundary fallback={null} onError={() => setCanvasError(true)}>
            <PremiumCardCanvas
              performanceTier={tier}
              enableMotion={!prefersReducedMotion}
              inView={inView}
              debug={debug}
              onReady={() => {
                setCanvasReady(true);
                setShow3D(true);
              }}
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

