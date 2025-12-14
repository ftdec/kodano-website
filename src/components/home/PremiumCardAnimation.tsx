"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/animations/hooks";
import dynamic from "next/dynamic";

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
  const [showSpinner, setShowSpinner] = React.useState(false);

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
    setShowSpinner(false);
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

  // Controla spinner: delay anti-flicker (200ms) e só até o 3D estar pronto
  React.useEffect(() => {
    if (!shouldRender3D || show3D) {
      setShowSpinner(false);
      return;
    }
    let cancelled = false;
    const delay = window.setTimeout(() => {
      if (!cancelled && !show3D) setShowSpinner(true);
    }, 200);
    return () => {
      cancelled = true;
      window.clearTimeout(delay);
    };
  }, [shouldRender3D, show3D]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full max-w-[620px] md:max-w-[640px] aspect-[4/3] md:aspect-[16/10] rounded-[32px] overflow-hidden bg-white",
        "shadow-[0_32px_64px_rgba(0,42,53,0.12),0_12px_24px_rgba(0,42,53,0.08)]",
        className
      )}
      style={{ touchAction: "pan-y" }}
    >
      {/* Stage background: halo premium + vignette sutil */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Halo ciano Kodano forte */}
        <div
          className="absolute inset-[-25%] rounded-[32px]"
          style={{
            background:
              "radial-gradient(55% 55% at 65% 35%, rgba(0,200,220,0.18), rgba(79,172,254,0.12), rgba(47,230,200,0.06), transparent 65%)",
            filter: "blur(40px)",
          }}
        />
        {/* Vignette suave nas bordas */}
        <div
          className="absolute inset-0 rounded-[32px]"
          style={{
            background:
              "radial-gradient(110% 110% at 50% 50%, transparent 55%, rgba(0,42,53,0.03) 100%)",
          }}
        />
      </div>

      {/* Poster sempre presente; some só quando o 3D estiver pronto */}
      <PosterCard
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          show3D ? "opacity-0" : "opacity-100"
        )}
      />

      {/* Spinner ciano (sobreposto) enquanto 3D não pronto */}
      <CyanSpinner
        className={cn(
          "absolute inset-0 transition-opacity duration-200",
          show3D || !showSpinner ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      />

      {/* Canvas 3D enhancement */}
      {shouldRender3D && (
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-500",
            canvasReady ? "opacity-100" : "opacity-0"
          )}
          style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }}
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
                setShowSpinner(false);
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

function PosterCard({ className }: { className?: string }) {
  // Kodano Core
  const KODANO_BLUE = "#4FACFE";
  const KODANO_TEAL = "#2FE6C8";
  const KODANO_WHITE = "#FFFFFF";
  const KODANO_MUTED = "#A8C5D1";

  // Kodano card base (definitivo)
  const CARD_CYAN_BASE = "#00C8DC";
  const CARD_CYAN_DEEP = "#00AFC7";
  const CARD_NAVY_DEEP = "#002A35";

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: KODANO_WHITE,
        borderRadius: 24,
        overflow: "hidden",
      }}
    >
      {/* Halo (ambiente, não “card dentro de card”) */}
      <div
        style={{
          position: "absolute",
          inset: -100,
          background: `radial-gradient(55% 55% at 65% 35%, ${hexToRgba("#00C8DC", 0.22)}, ${hexToRgba(KODANO_BLUE, 0.14)}, ${hexToRgba(
            KODANO_TEAL,
            0.08
          )}, transparent 60%)`,
          filter: "blur(48px)",
        }}
      />

      {/* Card (static-first) — maior para dominar o stage */}
      <div
        style={{
          position: "relative",
          width: "88%",
          maxWidth: 560,
          aspectRatio: "1.6 / 1",
          borderRadius: 22,
          padding: 24,
          transform: "rotate3d(1, -1, 0, 8deg)", // perspectiva sutil
          background: `linear-gradient(155deg, ${CARD_CYAN_BASE} 0%, ${CARD_CYAN_DEEP} 50%, ${CARD_NAVY_DEEP} 100%)`,
          boxShadow: `0 50px 100px ${hexToRgba(CARD_NAVY_DEEP, 0.18)}, 0 24px 48px ${hexToRgba(CARD_NAVY_DEEP, 0.12)}`,
        }}
      >
        {/* Highlight sheen */}
        <div
          style={{
            position: "absolute",
            inset: 1,
            borderRadius: 20,
            background: `linear-gradient(120deg, ${hexToRgba(CARD_CYAN_BASE, 0.08)}, transparent 45%), radial-gradient(60% 55% at 25% 25%, ${hexToRgba(
              "#ffffff",
              0.10
            )}, transparent 60%)`,
            pointerEvents: "none",
          }}
        />

        {/* Chip (tech Kodano, não laranja) */}
        <div
          style={{
            width: 48,
            height: 36,
            borderRadius: 10,
            background: `linear-gradient(135deg, ${KODANO_BLUE}, ${KODANO_TEAL})`,
            boxShadow: `inset 0 0 0 1px ${hexToRgba("#ffffff", 0.25)}, 0 4px 12px ${hexToRgba(KODANO_TEAL, 0.35)}`,
          }}
        />

        {/* Número */}
        <div
          style={{
            marginTop: 32,
            color: hexToRgba("#ffffff", 0.92),
            letterSpacing: "0.18em",
            fontWeight: 500,
            fontSize: 13,
          }}
        >
          4532 •••• •••• 9010
        </div>

        {/* Nome/identidade neutra (sem logo Kodano) */}
        <div
          style={{
            marginTop: 8,
            color: hexToRgba(KODANO_MUTED, 0.9),
            fontSize: 12,
            letterSpacing: "0.06em",
          }}
        >
          PAYMENTS DEMO
        </div>
      </div>
    </div>
  );
}

function hexToRgba(hex: string, alpha: number) {
  const v = hex.replace("#", "").trim();
  const r = parseInt(v.slice(0, 2), 16);
  const g = parseInt(v.slice(2, 4), 16);
  const b = parseInt(v.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function CyanSpinner({ className }: { className?: string }) {
  return (
    <div className={cn("grid place-items-center", className)} aria-label="Carregando cartão">
      <div className="h-11 w-11 rounded-full border-[3px] border-[#00C8DC]/25 border-t-[#00C8DC] animate-spin opacity-90" />
    </div>
  );
}
