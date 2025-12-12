/**
 * KodanoFlowRail
 * Signature animation (Stripe-level) implemented as SVG + MotionValues.
 * Performance rules:
 * - No React state updates per frame
 * - RAF runs only when visible + enabled + tab visible
 * - Auto-disables on reduced motion + low-end devices
 */

"use client";

import {
  motion,
  motionValue,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useIsLowEndDevice, useReducedMotion } from "@/lib/animations/hooks";

type RailQuality = "full" | "static";

interface KodanoFlowRailProps {
  className?: string;
  /**
   * When true, allows animated pulses (still gated by reduced-motion/low-end/viewport).
   * If false, renders static rail.
   */
  enabled?: boolean;
  /**
   * Override quality (mostly for debugging).
   */
  quality?: RailQuality;
}

type Pulse = {
  x: ReturnType<typeof motionValue<number>>;
  y: ReturnType<typeof motionValue<number>>;
  opacity: ReturnType<typeof motionValue<number>>;
  phase: number;
  speed: number;
  size: number;
};

function useInViewportOnce(ref: React.RefObject<Element | null>, margin = "200px") {
  const inView = useMotionValue(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      inView.set(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        inView.set(entry.isIntersecting);
      },
      { root: null, rootMargin: margin, threshold: 0.01 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [inView, ref, margin]);

  return inView;
}

export function KodanoFlowRail({
  className,
  enabled = true,
  quality,
}: KodanoFlowRailProps) {
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const isLowEnd = useIsLowEndDevice();

  useEffect(() => {
    setMounted(true);
  }, []);

  const resolvedQuality: RailQuality =
    quality ?? (!enabled || prefersReducedMotion || isLowEnd ? "static" : "full");

  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Subtle global response to scroll (cheap, no re-render)
  const { scrollYProgress } = useScroll();
  const scroll = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  const railOpacity = useTransform(scroll, [0, 0.15], [0.85, 0.55]);
  const railShift = useTransform(scroll, [0, 1], [0, -18]);

  const inViewport = useInViewportOnce(containerRef, "250px");

  // Pulses (MotionValues) - defined once
  const pulses = useMemo<Pulse[]>(() => {
    // keep count modest: high perceived quality, low cost
    const configs = [
      { phase: 0.02, speed: 0.22, size: 6 },
      { phase: 0.18, speed: 0.18, size: 5 },
      { phase: 0.37, speed: 0.26, size: 7 },
      { phase: 0.55, speed: 0.20, size: 5 },
      { phase: 0.72, speed: 0.24, size: 6 },
      { phase: 0.88, speed: 0.16, size: 5 },
    ];

    return configs.map((c) => ({
      // IMPORTANT: use motionValue() here (not useMotionValue) to avoid calling hooks inside useMemo.
      x: motionValue(0),
      y: motionValue(0),
      opacity: motionValue(0),
      phase: c.phase,
      speed: c.speed,
      size: c.size,
    }));
  }, []);

  // Main RAF loop: update pulse positions via getPointAtLength
  useEffect(() => {
    if (resolvedQuality !== "full") return;
    const path = pathRef.current;
    if (!path) return;

    let rafId = 0;
    let alive = true;
    const length = path.getTotalLength();

    const tick = (t: number) => {
      if (!alive) return;

      const isVisible =
        document.visibilityState === "visible" && Boolean(inViewport.get());
      if (!isVisible) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      const time = t / 1000;

      for (const pulse of pulses) {
        // 0..1 along the path
        const p = (time * pulse.speed + pulse.phase) % 1;
        const point = path.getPointAtLength(p * length);

        pulse.x.set(point.x);
        pulse.y.set(point.y);

        // soft fade in/out along the loop (no blur)
        const o = Math.sin(p * Math.PI) * 0.9; // 0..0.9..0
        pulse.opacity.set(o);
      }

      rafId = requestAnimationFrame(tick);
    };

    // visibility changes
    const onVisibility = () => {
      // no-op; checked each frame
    };
    document.addEventListener("visibilitychange", onVisibility);

    rafId = requestAnimationFrame(tick);
    return () => {
      alive = false;
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(rafId);
    };
  }, [inViewport, pulses, resolvedQuality]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div
        ref={containerRef}
        className={cn("pointer-events-none absolute inset-0", className)}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("pointer-events-none absolute inset-0", className)}
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: railOpacity,
          y: railShift,
          willChange: "transform, opacity",
        }}
      >
        <svg
          ref={svgRef}
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1000 600"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="kodano-rail-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#4FACFE" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#00DBDE" stopOpacity="0.95" />
              <stop offset="75%" stopColor="#43E97B" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#415A77" stopOpacity="0.85" />
            </linearGradient>

            <linearGradient id="kodano-rail-gradient-soft" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#4FACFE" stopOpacity="0.20" />
              <stop offset="50%" stopColor="#00DBDE" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#43E97B" stopOpacity="0.16" />
            </linearGradient>
          </defs>

          {/* Rail path (soft underlay) */}
          <path
            d="M -40 420 C 120 300, 220 480, 360 360 C 520 220, 590 410, 720 330 C 850 250, 980 280, 1120 190"
            fill="none"
            stroke="url(#kodano-rail-gradient-soft)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="1"
          />

          {/* Rail path (main) */}
          <path
            ref={pathRef}
            d="M -40 420 C 120 300, 220 480, 360 360 C 520 220, 590 410, 720 330 C 850 250, 980 280, 1120 190"
            fill="none"
            stroke="url(#kodano-rail-gradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />

          {/* Nodes (static, cheap) */}
          {[
            { cx: 170, cy: 350 },
            { cx: 365, cy: 360 },
            { cx: 610, cy: 360 },
            { cx: 880, cy: 260 },
          ].map((n, i) => (
            <g key={i}>
              <circle cx={n.cx} cy={n.cy} r="7" fill="#ffffff" opacity="0.20" />
              <circle cx={n.cx} cy={n.cy} r="3.5" fill="#ffffff" opacity="0.55" />
            </g>
          ))}

          {/* Pulses (animated only in full quality) */}
          {resolvedQuality === "full" &&
            pulses.map((p, idx) => (
              <g key={idx}>
                {/* Glow-ish under dot (no blur: just bigger + low opacity) */}
                <motion.circle
                  cx={p.x}
                  cy={p.y}
                  r={p.size * 2.2}
                  fill="url(#kodano-rail-gradient-soft)"
                  style={{
                    opacity: p.opacity,
                  }}
                />
                {/* Main dot */}
                <motion.circle
                  cx={p.x}
                  cy={p.y}
                  r={p.size}
                  fill="#ffffff"
                  style={{
                    opacity: p.opacity,
                  }}
                />
              </g>
            ))}
        </svg>
      </motion.div>
    </div>
  );
}


