/**
 * KodanoPaymentFlow V2 — Payment Fabric
 *
 * Concept: Living infrastructure mesh, not step-by-step explainer.
 * Inspired by: Stripe product visuals, CloudWalk, Vercel deployment graphs.
 *
 * Design Philosophy:
 * - No linear narrative (no "start → end")
 * - No explicit approval/success states (no green flash)
 * - Continuous operation (system always running)
 * - Hypnotic, slow movement (almost meditative)
 * - Abstract mesh, not literal flow chart
 *
 * Visual Elements:
 * - 8-node mesh (abstract geometric positions)
 * - Multiple simultaneous data pulses (not single packet)
 * - Breathing nodes (subtle expand/contract)
 * - Dynamic connection weights (reorganizing mesh)
 * - Perlin-noise-like organic movement
 */

"use client";

import { motion, useMotionValue, useMotionValueEvent, MotionValue } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile, useReducedMotion } from "@/lib/animations/hooks";

type Point = { x: number; y: number };

type Node = {
  id: number;
  p: Point;
  size: number;
  phase: number; // breathing phase offset
};

type Pulse = {
  id: number;
  path: number[]; // node IDs
  progress: number; // 0..1 along current segment
  speed: number;
  intensity: number;
};

const BRAND = {
  blue: "#4FACFE",
  cyan: "#00DBDE",
  green: "#43E97B",
  slate: "#415A77",
  white: "#FFFFFF",
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

// Smooth easing
function easeInOutQuad(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function useInViewport(ref: React.RefObject<Element | null>, rootMargin = "220px") {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { root: null, rootMargin, threshold: 0.01 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, rootMargin]);

  return inView;
}

function usePageVisible() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const onChange = () => setVisible(document.visibilityState === "visible");
    onChange();
    document.addEventListener("visibilitychange", onChange, { passive: true });
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);
  return visible;
}

export function KodanoPaymentFlow({
  className,
  scrollProgress,
}: {
  className?: string;
  scrollProgress: MotionValue<number> | null;
}) {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inView = useInViewport(containerRef);
  const pageVisible = usePageVisible();

  // Scroll modulation (subtle speed variation)
  const scrollRef = useRef(0);
  const fallbackScroll = useMotionValue(0);
  const scrollMV = scrollProgress ?? fallbackScroll;
  useMotionValueEvent(scrollMV, "change", (v) => {
    scrollRef.current = typeof v === "number" ? v : 0;
  });

  const [hovered, setHovered] = useState(false);

  // Mesh topology (8 nodes, non-linear positions)
  const mesh = useMemo(() => {
    const w = 760;
    const h = 460;

    if (isMobile) {
      // Simplified: 6 nodes
      const nodes: Node[] = [
        { id: 0, p: { x: 120, y: 140 }, size: 72, phase: 0 },
        { id: 1, p: { x: 280, y: 90 }, size: 88, phase: 0.3 },
        { id: 2, p: { x: 460, y: 130 }, size: 96, phase: 0.6 },
        { id: 3, p: { x: 640, y: 180 }, size: 76, phase: 0.9 },
        { id: 4, p: { x: 520, y: 320 }, size: 82, phase: 1.2 },
        { id: 5, p: { x: 240, y: 340 }, size: 78, phase: 1.5 },
      ];

      // Mesh connections (who connects to whom)
      const edges: [number, number][] = [
        [0, 1], [1, 2], [2, 3],
        [3, 4], [4, 5], [5, 0],
        [1, 4], [0, 2],
      ];

      return { w, h, nodes, edges };
    }

    // Desktop: 8 nodes, richer mesh
    const nodes: Node[] = [
      { id: 0, p: { x: 100, y: 160 }, size: 76, phase: 0 },
      { id: 1, p: { x: 240, y: 100 }, size: 92, phase: 0.25 },
      { id: 2, p: { x: 380, y: 140 }, size: 108, phase: 0.5 },
      { id: 3, p: { x: 520, y: 90 }, size: 88, phase: 0.75 },
      { id: 4, p: { x: 660, y: 180 }, size: 96, phase: 1.0 },
      { id: 5, p: { x: 580, y: 320 }, size: 84, phase: 1.25 },
      { id: 6, p: { x: 360, y: 360 }, size: 90, phase: 1.5 },
      { id: 7, p: { x: 160, y: 300 }, size: 82, phase: 1.75 },
    ];

    const edges: [number, number][] = [
      [0, 1], [1, 2], [2, 3], [3, 4],
      [4, 5], [5, 6], [6, 7], [7, 0],
      [1, 7], [2, 5], [0, 2], [3, 5],
      [1, 6], [2, 4],
    ];

    return { w, h, nodes, edges };
  }, [isMobile]);

  // Pulses (multiple simultaneous data flows)
  const pulsesRef = useRef<Pulse[]>([]);
  const [pulsesInitialized, setPulsesInitialized] = useState(false);

  // Initialize pulses only on client (fix hydration)
  useEffect(() => {
    if (prefersReducedMotion || pulsesInitialized) return;
    
    const numPulses = isMobile ? 3 : 5;
    // Use deterministic seed for consistent initialization
    let seed = 0.12345;
    const seededRandom = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    
    pulsesRef.current = Array.from({ length: numPulses }, (_, i) => {
      const path = generateRandomPath(mesh.nodes.length, isMobile ? 4 : 6, seededRandom);
      return {
        id: i,
        path,
        progress: seededRandom(),
        speed: 0.04 + seededRandom() * 0.06, // Slower: 0.04-0.10
        intensity: 0.7 + seededRandom() * 0.3,
      };
    });
    setPulsesInitialized(true);
  }, [prefersReducedMotion, isMobile, mesh.nodes.length, pulsesInitialized]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (!inView || !pageVisible || !pulsesInitialized) return;

    let raf = 0;
    const startTime = performance.now();

    const loop = (now: number) => {
      if (!inView || !pageVisible) {
        raf = requestAnimationFrame(loop);
        return;
      }

      const elapsed = (now - startTime) / 1000;

      // Scroll-reactive global speed (slower: 0.6..1.0 for fluid motion)
      const scrollFactor = 0.6 + clamp(scrollRef.current, 0, 1) * 0.4;
      const hoverBoost = hovered ? 1.15 : 1;
      const globalSpeed = scrollFactor * hoverBoost;

      // Update pulses (slower, more fluid)
      pulsesRef.current.forEach((pulse) => {
        pulse.progress += pulse.speed * globalSpeed * 0.008; // Slower: ~30fps equivalent

        // When pulse completes a segment, move to next
        if (pulse.progress >= 1) {
          pulse.progress = 0;
          // Use deterministic random for consistency
          const seed = (pulse.id * 1000 + elapsed * 100) % 10000;
          const seededRandom = () => {
            const s = (seed * 9301 + 49297) % 233280;
            return s / 233280;
          };
          pulse.path = generateRandomPath(mesh.nodes.length, isMobile ? 4 : 6, seededRandom);
          pulse.speed = 0.04 + seededRandom() * 0.06;
          pulse.intensity = 0.7 + seededRandom() * 0.3;
        }
      });

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [prefersReducedMotion, inView, pageVisible, pulsesInitialized, mesh, isMobile, hovered]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full aspect-[1.1/1] rounded-3xl border border-border/50 overflow-hidden",
        "bg-white/50 backdrop-blur-md shadow-[0_30px_90px_rgba(15,23,42,0.12)]",
        className
      )}
      aria-hidden="true"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background wash */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-white/20" />
        <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-[#4FACFE]/8 blur-[120px]" />
        <div className="absolute -bottom-32 -left-32 w-[480px] h-[480px] rounded-full bg-[#43E97B]/8 blur-[120px]" />
      </div>

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${mesh.w} ${mesh.h}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="meshGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={BRAND.blue} />
            <stop offset="50%" stopColor={BRAND.cyan} />
            <stop offset="100%" stopColor={BRAND.green} />
          </linearGradient>

          <linearGradient id="cardShimmer" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor={BRAND.white} stopOpacity="0.6" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>

          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={BRAND.cyan} stopOpacity="0.9" />
            <stop offset="60%" stopColor={BRAND.blue} stopOpacity="0.6" />
            <stop offset="100%" stopColor={BRAND.slate} stopOpacity="0.1" />
          </radialGradient>

          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.7 0"
              result="glow"
            />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="pulseGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="nodeShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#0F172A" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Ambient background pulse (very subtle) */}
        {!prefersReducedMotion && (
          <motion.rect
            x="0"
            y="0"
            width={mesh.w}
            height={mesh.h}
            fill="url(#meshGradient)"
            opacity="0.04"
            animate={{ opacity: [0.03, 0.06, 0.03] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* Mesh connections (edges) */}
        <g opacity="0.12">
          {mesh.edges.map(([a, b], i) => {
            const nodeA = mesh.nodes[a];
            const nodeB = mesh.nodes[b];
            return (
              <motion.line
                key={`edge-${i}`}
                x1={nodeA.p.x}
                y1={nodeA.p.y}
                x2={nodeB.p.x}
                y2={nodeB.p.y}
                stroke="url(#meshGradient)"
                strokeWidth="2"
                strokeLinecap="round"
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        strokeWidth: [1.8, 2.4, 1.8],
                        opacity: [0.08, 0.18, 0.08],
                      }
                }
                transition={{
                  duration: 4 + (i % 3) * 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
              />
          );
        })}
        </g>

        {/* Nodes (breathing, no labels) */}
        {mesh.nodes.map((node) => (
          <motion.g key={node.id}>
            {/* Outer glow ring */}
            <motion.circle
              cx={node.p.x}
              cy={node.p.y}
              r={node.size / 2 + 12}
              fill="none"
              stroke="url(#meshGradient)"
              strokeWidth="1.5"
              opacity="0.2"
              filter="url(#softGlow)"
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      r: [node.size / 2 + 10, node.size / 2 + 16, node.size / 2 + 10],
                      opacity: [0.15, 0.3, 0.15],
                    }
              }
              transition={{
                duration: 3.5 + node.phase * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: node.phase * 0.4,
              }}
            />

            {/* Node base */}
            <motion.circle
              cx={node.p.x}
              cy={node.p.y}
              r={node.size / 2}
              fill="url(#nodeGlow)"
              opacity="0.85"
              filter="url(#nodeShadow)"
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      r: [node.size / 2 - 1, node.size / 2 + 1, node.size / 2 - 1],
                    }
              }
              transition={{
                duration: 4 + node.phase * 0.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: node.phase * 0.5,
              }}
            />

            {/* Inner highlight */}
            <circle
              cx={node.p.x}
              cy={node.p.y}
              r={node.size / 2 - 2}
              fill="none"
              stroke={BRAND.white}
              strokeWidth="1.2"
              opacity="0.4"
            />

            {/* Core dot */}
            <motion.circle
              cx={node.p.x}
              cy={node.p.y}
              r={6}
              fill={BRAND.white}
              opacity="0.8"
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      opacity: [0.6, 0.95, 0.6],
                      r: [5, 7, 5],
                    }
              }
              transition={{
                duration: 2.5 + node.phase * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: node.phase * 0.3,
              }}
            />
          </motion.g>
        ))}

        {/* Data pulses (traveling along edges) */}
        {!prefersReducedMotion && (
          <PulseLayer mesh={mesh} pulsesRef={pulsesRef} />
        )}
      </svg>
    </div>
  );
}

// Helper: generate random path through mesh
function generateRandomPath(numNodes: number, length: number, randomFn: () => number = Math.random): number[] {
  const path: number[] = [];
  let current = Math.floor(randomFn() * numNodes);
  path.push(current);

  for (let i = 1; i < length; i++) {
    // Pick a random neighbor (simplified: just pick random next node)
    let next = Math.floor(randomFn() * numNodes);
    while (next === current && numNodes > 1) {
      next = Math.floor(randomFn() * numNodes);
    }
    path.push(next);
    current = next;
  }

  return path;
}

// Pulse rendering (separate component for clarity)
function PulseLayer({
  mesh,
  pulsesRef,
}: {
  mesh: { nodes: Node[]; edges: [number, number][] };
  pulsesRef: React.RefObject<Pulse[]>;
}) {
  const [, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 50); // Update pulse positions ~20fps (smoother than necessary, but good)
    return () => clearInterval(interval);
  }, []);

  if (!pulsesRef.current) return null;

  return (
    <g>
      {pulsesRef.current.map((pulse) => {
        if (pulse.path.length < 2) return null;

        const segmentIndex = Math.floor(pulse.progress * (pulse.path.length - 1));
        const segmentProgress = pulse.progress * (pulse.path.length - 1) - segmentIndex;
        const nodeA = mesh.nodes[pulse.path[segmentIndex]];
        const nodeB = mesh.nodes[pulse.path[Math.min(segmentIndex + 1, pulse.path.length - 1)]];

        if (!nodeA || !nodeB) return null;

        const x = lerp(nodeA.p.x, nodeB.p.x, easeInOutQuad(segmentProgress));
        const y = lerp(nodeA.p.y, nodeB.p.y, easeInOutQuad(segmentProgress));

        // Calculate angle for card rotation (follows path direction)
        const dx = nodeB.p.x - nodeA.p.x;
        const dy = nodeB.p.y - nodeA.p.y;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        // Card dimensions (larger and more prominent)
        const cardWidth = 72;
        const cardHeight = 44;
        const cardRx = 8;

        return (
          <motion.g
            key={pulse.id}
            style={{
              opacity: pulse.intensity,
              transformOrigin: `${x}px ${y}px`,
            }}
            animate={{
              rotate: [angle - 1.5, angle + 1.5, angle - 1.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Elegant trail with gradient */}
            <motion.ellipse
              cx={x}
              cy={y}
              rx={cardWidth * 0.8}
              ry={cardHeight * 0.6}
              fill="url(#meshGradient)"
              opacity="0.08"
              filter="url(#pulseGlow)"
              animate={{
                rx: [cardWidth * 0.8, cardWidth * 1.3, cardWidth * 0.8],
                ry: [cardHeight * 0.6, cardHeight * 1.0, cardHeight * 0.6],
                opacity: [0.08, 0.20, 0.08],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Card shadow layer */}
            <ellipse
              cx={x + 2}
              cy={y + 3}
              rx={cardWidth / 2}
              ry={cardHeight / 2}
              fill="#000000"
              opacity="0.15"
              filter="url(#pulseGlow)"
            />

            {/* Credit card base (premium gradient) */}
            <motion.rect
              x={x - cardWidth / 2}
              y={y - cardHeight / 2}
              width={cardWidth}
              height={cardHeight}
              rx={cardRx}
              fill="url(#meshGradient)"
              opacity="0.95"
              filter="url(#pulseGlow)"
              style={{
                transformOrigin: `${x}px ${y}px`,
              }}
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.92, 1.0, 0.92],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Card inner border (premium detail) */}
            <rect
              x={x - cardWidth / 2 + 2}
              y={y - cardHeight / 2 + 2}
              width={cardWidth - 4}
              height={cardHeight - 4}
              rx={cardRx - 1}
              fill="none"
              stroke={BRAND.white}
              strokeWidth="1.5"
              opacity="0.4"
            />

            {/* Shimmer effect (moving highlight) - slower and more visible */}
            <motion.rect
              x={x - cardWidth / 2}
              y={y - cardHeight / 2}
              width={cardWidth * 0.5}
              height={cardHeight}
              rx={cardRx}
              fill={BRAND.white}
              opacity="0"
              animate={{
                opacity: [0, 0.7, 0],
                x: [x - cardWidth / 2 - cardWidth * 0.3, x + cardWidth / 2 + cardWidth * 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: pulse.id * 0.6,
              }}
            />

            {/* Card chip (premium detail) - larger */}
            <rect
              x={x - cardWidth / 2 + 12}
              y={y - cardHeight / 2 + 12}
              width={18}
              height={14}
              rx={3}
              fill={BRAND.white}
              opacity="0.7"
            />
            <rect
              x={x - cardWidth / 2 + 13}
              y={y - cardHeight / 2 + 13}
              width={16}
              height={12}
              rx={2}
              fill="url(#meshGradient)"
              opacity="0.5"
            />

            {/* Card number lines (abstract) - more visible */}
            <rect
              x={x - cardWidth / 2 + 36}
              y={y - 3}
              width={24}
              height={3}
              rx={1.5}
              fill={BRAND.white}
              opacity="0.6"
            />
            <rect
              x={x - cardWidth / 2 + 36}
              y={y + 2}
              width={18}
              height={3}
              rx={1.5}
              fill={BRAND.white}
              opacity="0.5"
            />
            <rect
              x={x - cardWidth / 2 + 36}
              y={y + 7}
              width={20}
              height={3}
              rx={1.5}
              fill={BRAND.white}
              opacity="0.45"
            />

            {/* Glow pulse when near nodes */}
            <motion.circle
              cx={x}
              cy={y}
              r={cardWidth * 0.6}
              fill="none"
              stroke={BRAND.cyan}
              strokeWidth="1.5"
              opacity="0"
              animate={{
                opacity: [0, 0.5, 0],
                r: [cardWidth * 0.6, cardWidth * 1.5, cardWidth * 0.6],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: pulse.id * 0.5,
              }}
            />
          </motion.g>
        );
      })}
    </g>
  );
}
