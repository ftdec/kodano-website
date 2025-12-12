/**
 * KodanoPaymentFlow
 * Stripe/Cloudwalk-level product visual for Kodano payment infrastructure.
 *
 * Goals:
 * - Pure vector (SVG), GPU-friendly transforms, no raster assets
 * - Continuous narrative loop with real "payment packet" travelling through stages
 * - Intelligent routing (branch decision) with subtle pause + selected route glow
 * - States: pending -> processing -> approved -> settled (color shift Blue -> Green)
 * - Interactivity: hover intensifies node glow + local speed boost; scroll affects global speed
 * - Performance: pauses when offscreen or tab hidden; reduced-motion fallback
 */

"use client";

import { motion, useMotionValue, useMotionValueEvent, MotionValue } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile, useReducedMotion } from "@/lib/animations/hooks";

type NodeId =
  | "client"
  | "checkout"
  | "core"
  | "decision"
  | "network"
  | "approval"
  | "settlement"
  | "acqA"
  | "acqB"
  | "acqC";

type Point = { x: number; y: number };

type MobileView = {
  w: number;
  h: number;
  nodes: Record<NodeId, { p: Point; size: { w: number; h: number } }>;
  mainPath: Point[];
};

type DesktopView = {
  w: number;
  h: number;
  nodes: Record<NodeId, { p: Point; size: { w: number; h: number } }>;
  pre: Point[];
  branches: Record<"A" | "B" | "C", Point[]>;
  post: Point[];
};

type View = MobileView | DesktopView;

const BRAND = {
  blue: "#4FACFE",
  cyan: "#00DBDE",
  green: "#43E97B",
  slate: "#415A77",
  white: "#FFFFFF",
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function buildPolylineSamples(points: Point[], samplesPerSegment = 40): Point[] {
  const out: Point[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    for (let s = 0; s < samplesPerSegment; s++) {
      const t = s / samplesPerSegment;
      out.push({ x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) });
    }
  }
  out.push(points[points.length - 1]);
  return out;
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

function nodeGradient(id: NodeId) {
  // Only brand colors + white
  switch (id) {
    case "client":
      return `linear-gradient(135deg, ${BRAND.slate}, ${BRAND.blue})`;
    case "checkout":
      return `linear-gradient(135deg, ${BRAND.blue}, ${BRAND.cyan})`;
    case "core":
      return `linear-gradient(135deg, ${BRAND.blue}, ${BRAND.cyan})`;
    case "decision":
      return `linear-gradient(135deg, ${BRAND.cyan}, ${BRAND.green})`;
    case "network":
      return `linear-gradient(135deg, ${BRAND.slate}, ${BRAND.cyan})`;
    case "approval":
      return `linear-gradient(135deg, ${BRAND.blue}, ${BRAND.green})`;
    case "settlement":
      return `linear-gradient(135deg, ${BRAND.green}, ${BRAND.cyan})`;
    case "acqA":
      return `linear-gradient(135deg, ${BRAND.blue}, ${BRAND.cyan})`;
    case "acqB":
      return `linear-gradient(135deg, ${BRAND.cyan}, ${BRAND.green})`;
    case "acqC":
      return `linear-gradient(135deg, ${BRAND.slate}, ${BRAND.blue})`;
    default:
      return `linear-gradient(135deg, ${BRAND.blue}, ${BRAND.cyan})`;
  }
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

  // Scroll speed modulation (0.9..1.6), no re-render
  const scrollRef = useRef(0);
  const fallbackScroll = useMotionValue(0);
  const scrollMV = scrollProgress ?? fallbackScroll;
  useMotionValueEvent(scrollMV, "change", (v) => {
    scrollRef.current = typeof v === "number" ? v : 0;
  });

  // Hover boosts (local), no re-render per frame
  const [hovered, setHovered] = useState<NodeId | null>(null);
  const hoverBoostRef = useRef(1);

  // Narrative selection (routing choice) updated per-cycle only
  const [routePick, setRoutePick] = useState<"A" | "B" | "C">("A");
  const routePickRef = useRef<"A" | "B" | "C">("A");

  // Motion values for the payment packet position in SVG space
  const packetX = useMotionValue(0);
  const packetY = useMotionValue(0);
  const packetScale = useMotionValue(1);

  // Visual state (approved flash) – toggled per cycle, not per frame
  const [approvedPulse, setApprovedPulse] = useState(0);
  const approvedPulseRef = useRef(0);
  const [approvalState, setApprovalState] = useState<"pending" | "approved">("pending");
  const approvalStateRef = useRef<"pending" | "approved">("pending");
  const [settledState, setSettledState] = useState<"pending" | "settled">("pending");
  const settledStateRef = useRef<"pending" | "settled">("pending");
  const [activeNode, setActiveNode] = useState<NodeId | null>(null);
  const activeNodeRef = useRef<NodeId | null>(null);

  const view: View = useMemo(() => {
    // SVG coordinate system
    const w = 760;
    const h = 460;

    if (isMobile) {
      // Simplified: fewer nodes, no branching
      const nodes: Record<NodeId, { p: Point; size: { w: number; h: number } }> = {
        client: { p: { x: 80, y: 230 }, size: { w: 88, h: 56 } },
        checkout: { p: { x: 230, y: 170 }, size: { w: 108, h: 64 } },
        core: { p: { x: 380, y: 230 }, size: { w: 132, h: 76 } },
        decision: { p: { x: 540, y: 170 }, size: { w: 120, h: 64 } },
        approval: { p: { x: 620, y: 290 }, size: { w: 120, h: 64 } },
        settlement: { p: { x: 700, y: 230 }, size: { w: 120, h: 64 } },
        // unused in mobile
        network: { p: { x: -999, y: -999 }, size: { w: 0, h: 0 } },
        acqA: { p: { x: -999, y: -999 }, size: { w: 0, h: 0 } },
        acqB: { p: { x: -999, y: -999 }, size: { w: 0, h: 0 } },
        acqC: { p: { x: -999, y: -999 }, size: { w: 0, h: 0 } },
      };

      const mainPath = buildPolylineSamples(
        [
          nodes.client.p,
          nodes.checkout.p,
          nodes.core.p,
          nodes.decision.p,
          nodes.approval.p,
          nodes.settlement.p,
        ],
        36
      );

      return { w, h, nodes, mainPath };
    }

    const nodes: Record<NodeId, { p: Point; size: { w: number; h: number } }> = {
      client: { p: { x: 90, y: 240 }, size: { w: 90, h: 56 } },
      checkout: { p: { x: 220, y: 150 }, size: { w: 112, h: 64 } },
      core: { p: { x: 365, y: 240 }, size: { w: 140, h: 78 } },
      decision: { p: { x: 485, y: 135 }, size: { w: 128, h: 64 } },
      acqA: { p: { x: 600, y: 90 }, size: { w: 92, h: 52 } },
      acqB: { p: { x: 640, y: 160 }, size: { w: 92, h: 52 } },
      acqC: { p: { x: 600, y: 230 }, size: { w: 92, h: 52 } },
      network: { p: { x: 560, y: 280 }, size: { w: 122, h: 64 } },
      approval: { p: { x: 650, y: 300 }, size: { w: 126, h: 64 } },
      settlement: { p: { x: 700, y: 235 }, size: { w: 126, h: 64 } },
    };

    // Main to decision
    const pre = buildPolylineSamples([nodes.client.p, nodes.checkout.p, nodes.core.p, nodes.decision.p], 40);

    // Branches (decision -> acquirer -> network)
    const bA = buildPolylineSamples([nodes.decision.p, nodes.acqA.p, nodes.network.p], 34);
    const bB = buildPolylineSamples([nodes.decision.p, nodes.acqB.p, nodes.network.p], 34);
    const bC = buildPolylineSamples([nodes.decision.p, nodes.acqC.p, nodes.network.p], 34);

    // Post (network -> approval -> settlement -> back "cycle close" to client with a soft curve-like polyline)
    const post = buildPolylineSamples(
      [nodes.network.p, nodes.approval.p, nodes.settlement.p, { x: 520, y: 390 }, { x: 240, y: 390 }, nodes.client.p],
      42
    );

    return {
      w,
      h,
      nodes,
      pre,
      branches: { A: bA, B: bB, C: bC },
      post,
    };
  }, [isMobile]);

  // Initialize packet position
  useEffect(() => {
    const start = "mainPath" in view ? view.mainPath[0] : view.pre[0];
    packetX.set(start.x);
    packetY.set(start.y);
  }, [view, packetX, packetY]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (!inView || !pageVisible) return;

    let raf = 0;
    let start = performance.now();
    let lastCycle = -1;
    let lastApprovalCycle = -1;
    let lastSettledCycle = -1;

    // Narrative timing (seconds)
    const mobileMode = "mainPath" in view;
    const preS = mobileMode ? 0 : 1.9;
    const decisionHoldS = mobileMode ? 0 : 0.35;
    const branchS = mobileMode ? 0 : 1.35;
    const postS = mobileMode ? 4.4 : 2.4;
    const totalS = mobileMode ? 4.8 : preS + decisionHoldS + branchS + postS;

    // Choose a route per cycle (desktop)
    const pickNextRoute = () => {
      const r = Math.random();
      const next = r < 0.34 ? "A" : r < 0.67 ? "B" : "C";
      routePickRef.current = next;
      setRoutePick(next);
    };
    pickNextRoute();

    const loop = (now: number) => {
      const active = inView && pageVisible;
      if (!active) {
        raf = requestAnimationFrame(loop);
        return;
      }

      // Scroll-reactive speed (gentle)
      const scrollFactor = 0.9 + clamp(scrollRef.current, 0, 1) * 0.7; // 0.9..1.6
      const hoverBoost = hoverBoostRef.current;
      const speed = scrollFactor * hoverBoost;

      const elapsed = (now - start) / 1000;
      const tAll = elapsed * speed;
      const cycle = Math.floor(tAll / totalS);
      const tCycle = tAll % totalS;

      // Per-cycle variation: change route ONCE per cycle (desktop)
      if (!mobileMode && cycle !== lastCycle) {
        lastCycle = cycle;
        pickNextRoute();
        // reset per-cycle states
        if (approvalStateRef.current !== "pending") {
          approvalStateRef.current = "pending";
          setApprovalState("pending");
        }
        if (settledStateRef.current !== "pending") {
          settledStateRef.current = "pending";
          setSettledState("pending");
        }
        if (approvedPulseRef.current !== 0) {
          approvedPulseRef.current = 0;
          setApprovedPulse(0);
        }
      }

      // Subtle "approved" pulse once per cycle around approval phase
      // (when entering approval stage, fire a brief pulse)
      const approvalTriggerT = mobileMode ? totalS * 0.62 : preS + decisionHoldS + branchS + postS * 0.22;
      const approvalWindow = 0.14;
      const inApprovalWindow = Math.abs(tCycle - approvalTriggerT) < approvalWindow;
      if (inApprovalWindow && lastApprovalCycle !== cycle) {
        lastApprovalCycle = cycle;
        approvedPulseRef.current = 1;
        setApprovedPulse(1);
        approvalStateRef.current = "approved";
        setApprovalState("approved");
      }
      if (!inApprovalWindow && approvedPulseRef.current !== 0) {
        // decay the pulse shortly after
        if (Math.abs(tCycle - approvalTriggerT) > 0.42) {
          approvedPulseRef.current = 0;
          setApprovedPulse(0);
        }
      }

      // Settlement near end of post phase (desktop) / end of cycle (mobile)
      const settledTriggerT = mobileMode ? totalS * 0.92 : preS + decisionHoldS + branchS + postS * 0.62;
      if (tCycle > settledTriggerT && lastSettledCycle !== cycle) {
        lastSettledCycle = cycle;
        settledStateRef.current = "settled";
        setSettledState("settled");
      }

      let p: Point | null = null;
      let nodeNow: NodeId | null = null;

      if (mobileMode) {
        const path = view.mainPath;
        const tt = tCycle / totalS;
        const idx = Math.floor(tt * (path.length - 1));
        const frac = tt * (path.length - 1) - idx;
        const a = path[idx];
        const b = path[Math.min(path.length - 1, idx + 1)];
        p = { x: lerp(a.x, b.x, easeInOutCubic(frac)), y: lerp(a.y, b.y, easeInOutCubic(frac)) };
        // coarse node inference by progress
        if (tt < 0.17) nodeNow = "client";
        else if (tt < 0.34) nodeNow = "checkout";
        else if (tt < 0.52) nodeNow = "core";
        else if (tt < 0.66) nodeNow = "decision";
        else if (tt < 0.82) nodeNow = "approval";
        else nodeNow = "settlement";
      } else {
        const pre = view.pre;
        const br = view.branches[routePickRef.current];
        const post = view.post;

        if (tCycle < preS) {
          const tt = tCycle / preS;
          const idx = Math.floor(tt * (pre.length - 1));
          const frac = tt * (pre.length - 1) - idx;
          const a = pre[idx];
          const b = pre[Math.min(pre.length - 1, idx + 1)];
          p = { x: lerp(a.x, b.x, easeInOutCubic(frac)), y: lerp(a.y, b.y, easeInOutCubic(frac)) };
          if (tt < 0.22) nodeNow = "client";
          else if (tt < 0.56) nodeNow = "checkout";
          else if (tt < 0.86) nodeNow = "core";
          else nodeNow = "decision";
        } else if (tCycle < preS + decisionHoldS) {
          // pause at decision node (smart routing)
          p = br[0];
          nodeNow = "decision";
        } else if (tCycle < preS + decisionHoldS + branchS) {
          const tt = (tCycle - preS - decisionHoldS) / branchS;
          const idx = Math.floor(tt * (br.length - 1));
          const frac = tt * (br.length - 1) - idx;
          const a = br[idx];
          const b = br[Math.min(br.length - 1, idx + 1)];
          p = { x: lerp(a.x, b.x, easeInOutCubic(frac)), y: lerp(a.y, b.y, easeInOutCubic(frac)) };
          nodeNow = routePickRef.current === "A" ? "acqA" : routePickRef.current === "B" ? "acqB" : "acqC";
        } else {
          const tt = (tCycle - preS - decisionHoldS - branchS) / postS;
          const idx = Math.floor(tt * (post.length - 1));
          const frac = tt * (post.length - 1) - idx;
          const a = post[idx];
          const b = post[Math.min(post.length - 1, idx + 1)];
          p = { x: lerp(a.x, b.x, easeInOutCubic(frac)), y: lerp(a.y, b.y, easeInOutCubic(frac)) };
          if (tt < 0.22) nodeNow = "network";
          else if (tt < 0.42) nodeNow = "approval";
          else if (tt < 0.62) nodeNow = "settlement";
          else nodeNow = "client";
        }
      }

      if (p) {
        packetX.set(p.x);
        packetY.set(p.y);
      }
      if (nodeNow !== activeNodeRef.current) {
        activeNodeRef.current = nodeNow;
        setActiveNode(nodeNow);
      }

      // Micro “breathing” scale
      packetScale.set(1 + Math.sin((elapsed * speed) * 2.2) * 0.03);

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion, inView, pageVisible, view]);

  // Hover boosts speed locally (no state updates per frame)
  useEffect(() => {
    hoverBoostRef.current = hovered ? 1.35 : 1;
  }, [hovered]);

  const nodesToRender = useMemo(() => {
    const mobileMode = "mainPath" in view;
    const all: NodeId[] = mobileMode
      ? ["client", "checkout", "core", "decision", "approval", "settlement"]
      : ["client", "checkout", "core", "decision", "acqA", "acqB", "acqC", "network", "approval", "settlement"];
    return all;
  }, [view]);

  const activeBranch = "mainPath" in view ? null : routePick;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full aspect-[1.1/1] rounded-3xl border border-border/50 overflow-hidden",
        "bg-white/50 backdrop-blur-md shadow-[0_30px_90px_rgba(15,23,42,0.12)]",
        className
      )}
      aria-hidden="true"
    >
      {/* Soft wash (kept in this component to make it standalone) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white/65 via-white/35 to-transparent" />
        <div className="absolute -top-28 -right-28 w-[420px] h-[420px] rounded-full bg-[#4FACFE]/10 blur-[90px]" />
        <div className="absolute -bottom-28 -left-28 w-[420px] h-[420px] rounded-full bg-[#43E97B]/10 blur-[100px]" />
      </div>

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${view.w} ${view.h}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="kodanoFlowStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={BRAND.blue} />
            <stop offset="50%" stopColor={BRAND.cyan} />
            <stop offset="100%" stopColor={BRAND.green} />
          </linearGradient>

          <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 0.55 0"
              result="glow"
            />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="packetGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Flow paths (drawn as polylines for precision + easy sampling) */}
        {/* Pre path */}
        {"pre" in view && (
          <polyline
            points={view.pre.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="none"
            stroke="url(#kodanoFlowStroke)"
            strokeWidth="3"
            opacity="0.22"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
        {"mainPath" in view && (
          <polyline
            points={view.mainPath.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="none"
            stroke="url(#kodanoFlowStroke)"
            strokeWidth="3"
            opacity="0.22"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* Branches */}
        {"branches" in view && (
          <>
            {(["A", "B", "C"] as const).map((k) => (
              <polyline
                key={k}
                points={view.branches[k].map((p) => `${p.x},${p.y}`).join(" ")}
                fill="none"
                stroke="url(#kodanoFlowStroke)"
                strokeWidth={k === activeBranch ? 3.6 : 3}
                opacity={k === activeBranch ? 0.32 : 0.14}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
          </>
        )}

        {/* Post path */}
        {"post" in view && (
          <polyline
            points={view.post.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="none"
            stroke="url(#kodanoFlowStroke)"
            strokeWidth="3"
            opacity="0.18"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* Animated “flow direction” — dashed stroke moving */}
        {!prefersReducedMotion && (
          <motion.g opacity="0.6">
            <motion.polyline
              points={
                "mainPath" in view
                  ? view.mainPath.map((p) => `${p.x},${p.y}`).join(" ")
                  : view.pre.map((p) => `${p.x},${p.y}`).join(" ")
              }
              fill="none"
              stroke="url(#kodanoFlowStroke)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="10 14"
              animate={{ strokeDashoffset: [0, -120] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
              opacity="0.25"
            />
            {"branches" in view && (
              <>
                {(["A", "B", "C"] as const).map((k) => (
                  <motion.polyline
                    key={`dash-${k}`}
                    points={view.branches[k].map((p) => `${p.x},${p.y}`).join(" ")}
                    fill="none"
                    stroke="url(#kodanoFlowStroke)"
                    strokeWidth={k === activeBranch ? 2.4 : 2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="8 16"
                    animate={{ strokeDashoffset: [0, k === activeBranch ? -160 : -90] }}
                    transition={{ duration: k === activeBranch ? 2.2 : 3.2, repeat: Infinity, ease: "linear" }}
                    opacity={k === activeBranch ? 0.28 : 0.12}
                  />
                ))}
              </>
            )}
          </motion.g>
        )}

        {/* Nodes */}
        {nodesToRender.map((id) => {
          const n = view.nodes[id];
          const w = n.size.w;
          const h = n.size.h;
          const rx = 16;
          const x = n.p.x - w / 2;
          const y = n.p.y - h / 2;
          const isHovered = hovered === id;
          const isApproval = id === "approval";
          const showApproved = isApproval && approvedPulse === 1;
          const isActive = activeNode === id;
          const isSettled = id === "settlement" && settledState === "settled";

          const baseOpacity = isActive ? 0.88 : 0.72;
          const glowBoost = isActive ? 0.62 : isHovered ? 0.7 : 0.22;

          return (
            <g
              key={id}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "default" }}
            >
              {/* Outer glow */}
              <motion.rect
                x={x}
                y={y}
                width={w}
                height={h}
                rx={rx}
                fill="none"
                stroke="url(#kodanoFlowStroke)"
                strokeWidth="2.2"
                opacity={glowBoost}
                filter="url(#softGlow)"
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        opacity: isActive
                          ? [0.52, 0.88, 0.52]
                          : isHovered
                            ? [0.55, 0.85, 0.55]
                            : [0.14, 0.28, 0.14],
                      }
                }
                transition={
                  prefersReducedMotion
                    ? {}
                    : { duration: isActive ? 1.05 : isHovered ? 1.2 : 2.4, repeat: Infinity, ease: "easeInOut" }
                }
              />

              {/* Node base */}
              <foreignObject x={x} y={y} width={w} height={h}>
                <div
                  className="w-full h-full rounded-2xl border border-white/50"
                  style={{
                    background:
                      id === "approval" && approvalState === "approved"
                        ? `linear-gradient(135deg, ${BRAND.cyan}, ${BRAND.green})`
                        : id === "settlement" && isSettled
                          ? `linear-gradient(135deg, ${BRAND.green}, ${BRAND.cyan})`
                          : nodeGradient(id),
                    boxShadow: isHovered
                      ? "0 18px 60px rgba(15,23,42,0.20)"
                      : "0 12px 44px rgba(15,23,42,0.10)",
                    opacity: baseOpacity,
                  }}
                />
              </foreignObject>

              {/* Approved flash (blue -> green) */}
              {showApproved && !prefersReducedMotion && (
                <motion.rect
                  x={x - 6}
                  y={y - 6}
                  width={w + 12}
                  height={h + 12}
                  rx={rx + 6}
                  fill="none"
                  stroke={BRAND.green}
                  strokeWidth="2.6"
                  filter="url(#softGlow)"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: [0, 0.9, 0], scale: [0.98, 1.02, 1.04] }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                />
              )}
            </g>
          );
        })}

        {/* Payment packet (the “story”) */}
        <motion.g style={{ translateX: packetX, translateY: packetY, scale: packetScale }}>
          {/* Trail */}
          {!prefersReducedMotion && (
            <motion.circle
              r="22"
              fill="url(#kodanoFlowStroke)"
              opacity="0.10"
              filter="url(#packetGlow)"
              animate={{ r: [20, 26, 20], opacity: [0.08, 0.16, 0.08] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}

          {/* Packet */}
          <rect x={-18} y={-12} width={36} height={24} rx={10} fill={BRAND.white} opacity="0.18" />
          <rect x={-16} y={-10} width={32} height={20} rx={9} fill="url(#kodanoFlowStroke)" opacity="0.95" />
          <circle cx={-7} cy={0} r={2.4} fill={BRAND.white} opacity="0.95" />
          <rect x={-2} y={-2} width={12} height={4} rx={2} fill={BRAND.white} opacity="0.55" />
        </motion.g>

        {/* Subtle “secure layer” rings around core (no text) */}
        {!prefersReducedMotion && "post" in view && (
          <motion.g opacity="0.35">
            <motion.circle
              cx={view.nodes.core.p.x}
              cy={view.nodes.core.p.y}
              r={92}
              fill="none"
              stroke={BRAND.slate}
              strokeWidth="1.2"
              strokeDasharray="6 10"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: `${view.nodes.core.p.x}px ${view.nodes.core.p.y}px` }}
            />
            <motion.circle
              cx={view.nodes.core.p.x}
              cy={view.nodes.core.p.y}
              r={110}
              fill="none"
              stroke={BRAND.cyan}
              strokeWidth="1"
              strokeDasharray="2 12"
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: `${view.nodes.core.p.x}px ${view.nodes.core.p.y}px` }}
            />
          </motion.g>
        )}
      </svg>
    </div>
  );
}


