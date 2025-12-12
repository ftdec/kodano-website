/**
 * Hero Orchestration Visual (Stripe/Cloudwalk-level product visual)
 * Performance:
 * - Instanced packets (single drawcall)
 * - No React setState per frame
 * - frameloop="demand" + invalidation capped ~30fps when visible
 * - Auto-disabled on reduced-motion / low-end / mobile
 */

"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";
import { MotionValue, useMotionValueEvent, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsLowEndDevice, useIsMobile, useReducedMotion } from "@/lib/animations/hooks";

type Stage = {
  id: string;
  label: string;
  position: THREE.Vector3;
};

const STAGES: Stage[] = [
  { id: "pedido", label: "Pedido", position: new THREE.Vector3(-3.6, 0.4, 0) },
  { id: "token", label: "Tokenização", position: new THREE.Vector3(-1.8, 1.2, 0.1) },
  { id: "anti", label: "Antifraude", position: new THREE.Vector3(0.2, 0.2, 0) },
  { id: "auth", label: "Autorização", position: new THREE.Vector3(2.0, 1.0, -0.1) },
  { id: "liq", label: "Liquidação", position: new THREE.Vector3(3.8, 0.4, 0) },
];

const brand = {
  blue: new THREE.Color("#4FACFE"),
  cyan: new THREE.Color("#00DBDE"),
  green: new THREE.Color("#43E97B"),
  slate: new THREE.Color("#415A77"),
};

function useInViewport(ref: React.RefObject<Element | null>, rootMargin = "200px") {
  const visibleRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      visibleRef.current = true;
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { root: null, rootMargin, threshold: 0.01 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, rootMargin]);

  return visibleRef;
}

function TickDriver({ active }: { active: boolean }) {
  const { invalidate } = useThree();

  useEffect(() => {
    if (!active) return;
    let rafId = 0;
    let last = 0;
    const targetMs = 1000 / 30;

    const tick = (t: number) => {
      if (document.visibilityState !== "visible") {
        rafId = requestAnimationFrame(tick);
        return;
      }
      if (t - last >= targetMs) {
        last = t;
        invalidate();
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [active, invalidate]);

  return null;
}

function OrchestrationScene({
  scrollProgress,
  active,
}: {
  scrollProgress: MotionValue<number> | null;
  active: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const instancedRef = useRef<THREE.InstancedMesh>(null);
  const nodesRef = useRef<Array<THREE.Mesh | null>>([]);

  // Read scroll progress without re-rendering
  const scrollRef = useRef(0);
  useMotionValueEvent(scrollProgress ?? (null as any), "change", (v) => {
    scrollRef.current = typeof v === "number" ? v : 0;
  });

  const curve = useMemo(() => {
    const points = STAGES.map((s) => s.position);
    return new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.6);
  }, []);

  // Packets
  const packetCount = 18;
  const packets = useMemo(() => {
    return Array.from({ length: packetCount }).map((_, i) => {
      const seed = i / packetCount;
      return {
        seed,
        speed: 0.08 + (i % 6) * 0.01,
        size: 0.06 + (i % 4) * 0.01,
      };
    });
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!active) return;
    const mesh = instancedRef.current;
    if (!mesh) return;

    const t = state.clock.elapsedTime;
    const p = scrollRef.current; // 0..1

    // Subtle whole-group tilt (cheap)
    if (groupRef.current) {
      groupRef.current.rotation.y = (state.pointer.x ?? 0) * 0.15;
      groupRef.current.rotation.x = (state.pointer.y ?? 0) * 0.08;
    }

    // Active stage based on scroll
    const stageIdx = Math.max(0, Math.min(STAGES.length - 1, Math.floor(p * STAGES.length)));

    // Animate nodes (no setState)
    for (let i = 0; i < STAGES.length; i++) {
      const node = nodesRef.current[i];
      if (!node) continue;
      const isActive = i <= stageIdx;
      const pulse = 0.6 + Math.sin(t * 2.2 + i * 0.4) * 0.2;
      (node.material as THREE.MeshStandardMaterial).emissiveIntensity = isActive ? pulse : 0.08;
      node.scale.setScalar(isActive ? 1.02 : 1.0);
    }

    // Move packets along curve
    for (let i = 0; i < packetCount; i++) {
      const pk = packets[i];
      // Tie packet "flow" loosely to scroll progress so it feels interactive
      const tt = (t * pk.speed + pk.seed + p * 0.2) % 1;
      const pos = curve.getPointAt(tt);
      const tangent = curve.getTangentAt(tt);

      dummy.position.copy(pos);
      dummy.position.y += Math.sin(t * 2 + i) * 0.06; // micro organic
      dummy.scale.setScalar(pk.size);
      dummy.lookAt(pos.clone().add(tangent));
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  });

  const stageColors = [brand.blue, brand.cyan, brand.green, brand.cyan, brand.blue];

  return (
    <group ref={groupRef}>
      {/* Connection line (cheap tube-ish using line) */}
      <mesh>
        <tubeGeometry args={[curve, 80, 0.035, 8, false]} />
        <meshStandardMaterial
          color={brand.cyan}
          transparent
          opacity={0.22}
          emissive={brand.cyan}
          emissiveIntensity={0.35}
        />
      </mesh>

      {/* Nodes */}
      {STAGES.map((s, i) => (
        <RoundedBox
          key={s.id}
          args={[0.62, 0.36, 0.14]}
          radius={0.08}
          smoothness={4}
          position={s.position}
          ref={(el) => {
            nodesRef.current[i] = el as unknown as THREE.Mesh;
          }}
        >
          <meshStandardMaterial
            color={stageColors[i]}
            transparent
            opacity={0.16}
            emissive={stageColors[i]}
            emissiveIntensity={0.12}
            roughness={0.35}
            metalness={0.1}
          />
        </RoundedBox>
      ))}

      {/* Packets (instanced) */}
      <instancedMesh ref={instancedRef} args={[undefined as any, undefined as any, packetCount]}>
        <sphereGeometry args={[1, 10, 10]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={brand.cyan}
          emissiveIntensity={0.55}
          transparent
          opacity={0.85}
          roughness={0.3}
          metalness={0.0}
        />
      </instancedMesh>
    </group>
  );
}

export function HeroOrchestrationVisual({
  className,
  scrollProgress,
}: {
  className?: string;
  scrollProgress: MotionValue<number> | null;
}) {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const isLowEnd = useIsLowEndDevice();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const inViewportRef = useInViewport(containerRef, "250px");

  const enabled = !prefersReducedMotion && !isMobile && !isLowEnd;

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
      {/* Soft background wash */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white/65 via-white/35 to-transparent" />
        <div className="absolute -top-28 -right-28 w-[420px] h-[420px] rounded-full bg-[#4FACFE]/10 blur-[90px]" />
        <div className="absolute -bottom-28 -left-28 w-[420px] h-[420px] rounded-full bg-[#43E97B]/10 blur-[100px]" />
      </div>

      {enabled ? (
        <Canvas
          camera={{ position: [0, 0, 7.5], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{
            alpha: true,
            antialias: false,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
          }}
          frameloop="demand"
        >
          <TickDriver active={enabled && inViewportRef.current} />
          <ambientLight intensity={0.65} />
          <directionalLight position={[4, 5, 6]} intensity={0.35} color="#ffffff" />
          <OrchestrationScene scrollProgress={scrollProgress} active={enabled && inViewportRef.current} />
        </Canvas>
      ) : (
        // Lite/static fallback (still premium) - com animação super avançada
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-[82%] h-[2px] overflow-hidden">
            {/* Linha base com gradiente */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#4FACFE] via-[#00DBDE] to-[#43E97B] opacity-60" />
            
            {/* Shimmer effect - brilho que passa pela linha */}
            {!prefersReducedMotion && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent"
                style={{
                  width: "40%",
                  height: "100%",
                }}
                animate={{
                  x: ["-100%", "300%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            )}
            
            {/* Pulsos de energia que fluem */}
            {!prefersReducedMotion &&
              [0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-r from-[#4FACFE] via-[#00DBDE] to-[#43E97B] opacity-0 blur-xl"
                  style={{
                    left: "0%",
                  }}
                  animate={{
                    x: ["-100%", "200%"],
                    opacity: [0, 0.4, 0],
                    scale: [0.5, 1.2, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 1.3,
                  }}
                />
              ))}
            
            {/* Partículas brilhantes que fluem */}
            {!prefersReducedMotion &&
              [0, 1, 2, 3].map((i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(79,172,254,0.8)]"
                  style={{
                    left: "0%",
                  }}
                  animate={{
                    x: ["-10%", "110%"],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.6,
                  }}
                />
              ))}
            
            {/* Glow pulsante nas extremidades */}
            {!prefersReducedMotion && (
              <>
                <motion.div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#4FACFE] blur-md"
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#43E97B] blur-md"
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
              </>
            )}
            
            {/* Linha de energia interna que pulsa */}
            {!prefersReducedMotion && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#4FACFE] via-[#00DBDE] to-[#43E97B]"
                animate={{
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}


