"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/animations/hooks";

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

  const __DEV_BADGE =
    debug || process.env.NODE_ENV !== "production" ? (
      <div className="absolute top-3 left-3 z-20 text-[11px] px-2 py-1 rounded bg-[#0A1F2C]/70 text-white">
        {`mounted=${mounted} webgl=${webGLSupported} tier=${tier} reduced=${prefersReducedMotion} inView=${inView} err=${canvasError} ready=${canvasReady} show3D=${show3D} spinner=${showSpinner}`}
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

      {/* Poster sempre presente; some só quando o 3D estiver pronto */}
      <PosterCard
        className={cn(
          "absolute inset-0 transition-opacity duration-400",
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
            "absolute inset-0 transition-opacity duration-400",
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
  const CARD_NAVY_1 = "#002A35";
  const CARD_NAVY_2 = "#003F4D";
  const CARD_HIGHLIGHT = "#00C8DC";

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
          inset: -80,
          background: `radial-gradient(60% 60% at 70% 30%, ${hexToRgba(KODANO_BLUE, 0.25)}, ${hexToRgba(
            KODANO_TEAL,
            0.12
          )}, transparent 70%)`,
          filter: "blur(40px)",
        }}
      />

      {/* Card (static-first) */}
      <div
        style={{
          position: "relative",
          width: "78%",
          maxWidth: 520,
          aspectRatio: "1.6 / 1",
          borderRadius: 18,
          padding: 24,
          background: `linear-gradient(135deg, ${CARD_NAVY_1} 0%, ${CARD_NAVY_2} 100%)`,
          boxShadow: `0 40px 80px ${hexToRgba(CARD_NAVY_1, 0.08)}, 0 12px 24px ${hexToRgba(CARD_NAVY_1, 0.06)}`,
        }}
      >
        {/* Highlight sheen */}
        <div
          style={{
            position: "absolute",
            inset: 1,
            borderRadius: 17,
            background: `radial-gradient(60% 55% at 25% 25%, ${hexToRgba("#ffffff", 0.10)}, transparent 60%), radial-gradient(60% 60% at 80% 40%, ${hexToRgba(
              CARD_HIGHLIGHT,
              0.10
            )}, transparent 65%)`,
            pointerEvents: "none",
          }}
        />

        {/* Logo (nunca branco puro) */}
        <div
          style={{
            position: "absolute",
            top: 18,
            right: 22,
            color: "#CFEFFF",
            opacity: 0.85,
            letterSpacing: "0.22em",
            fontWeight: 600,
            fontSize: 12,
            filter: `drop-shadow(0 2px 8px ${hexToRgba(KODANO_BLUE, 0.25)})`,
          }}
        >
          KODANO
        </div>

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

        {/* Nome */}
        <div
          style={{
            marginTop: 8,
            color: hexToRgba(KODANO_MUTED, 0.9),
            fontSize: 12,
            letterSpacing: "0.06em",
          }}
        >
          KODANO DEMO
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
