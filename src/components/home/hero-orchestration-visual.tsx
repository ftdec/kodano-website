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
        // Lite/static fallback - SUPER ANIMAÇÃO 2D do pipeline de orquestração com FLUXO CONTÍNUO
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <div className="relative w-full h-full max-w-[90%] max-h-[80%]">
            {/* Pipeline Stages - Nós conectados */}
            {STAGES.map((stage, idx) => {
              // Converter posições 3D para 2D (normalizar para o container)
              const x = ((stage.position.x + 4) / 8) * 100; // -4 a 4 -> 0 a 100%
              const y = ((stage.position.y + 1) / 3) * 100; // -1 a 2 -> 0 a 100%
              
              return (
                <div key={stage.id} className="absolute" style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}>
                  {/* Glow pulsante ao redor do nó - mais intenso quando processando */}
                  {!prefersReducedMotion && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#4FACFE] via-[#00DBDE] to-[#43E97B] blur-xl"
                      style={{ width: "100px", height: "100px", margin: "-50px" }}
                      animate={{
                        opacity: [0.15, 0.6, 0.15],
                        scale: [0.7, 1.4, 0.7],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: idx * 0.4,
                      }}
                    />
                  )}
                  
                  {/* Nó principal com efeito de processamento */}
                  <motion.div
                    className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-[#4FACFE] via-[#00DBDE] to-[#43E97B] shadow-xl border-2 border-white/60"
                    animate={!prefersReducedMotion ? {
                      scale: [1, 1.15, 1],
                    } : {}}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: idx * 0.5,
                    }}
                  >
                    {/* Efeito de processamento interno - pulsa quando recebe dados */}
                    {!prefersReducedMotion && (
                      <>
                        <motion.div
                          className="absolute inset-0 rounded-xl bg-white/40"
                          animate={{
                            opacity: [0.2, 0.8, 0.2],
                            scale: [0.9, 1.1, 0.9],
                          }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: idx * 0.6,
                          }}
                        />
                        {/* Partículas saindo do nó */}
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={`node-particle-${idx}-${i}`}
                            className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(79,172,254,1)]"
                            style={{ x: "-50%", y: "-50%" }}
                            animate={{
                              x: [0, Math.cos((idx * 60 + i * 120) * Math.PI / 180) * 30],
                              y: [0, Math.sin((idx * 60 + i * 120) * Math.PI / 180) * 30],
                              opacity: [1, 0],
                              scale: [1, 0.3],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeOut",
                              delay: idx * 0.8 + i * 0.3,
                            }}
                          />
                        ))}
                      </>
                    )}
                  </motion.div>
                </div>
              );
            })}

            {/* Linhas conectando os nós com fluxo contínuo */}
            {STAGES.slice(0, -1).map((stage, idx) => {
              const nextStage = STAGES[idx + 1];
              const x1 = ((stage.position.x + 4) / 8) * 100;
              const y1 = ((stage.position.y + 1) / 3) * 100;
              const x2 = ((nextStage.position.x + 4) / 8) * 100;
              const y2 = ((nextStage.position.y + 1) / 3) * 100;
              
              const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
              const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
              
              return (
                <div
                  key={`line-${idx}`}
                  className="absolute origin-left"
                  style={{
                    left: `${x1}%`,
                    top: `${y1}%`,
                    width: `${length}%`,
                    height: "3px",
                    transform: `rotate(${angle}deg)`,
                    transformOrigin: "0 50%",
                  }}
                >
                  {/* Linha base com gradiente mais visível */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#4FACFE] via-[#00DBDE] to-[#43E97B] opacity-50" />
                  
                  {/* Pacotes grandes fluindo pela linha - FLUXO CONTÍNUO */}
                  {!prefersReducedMotion &&
                    Array.from({ length: 3 }).map((_, i) => (
                      <motion.div
                        key={`packet-${idx}-${i}`}
                        className="absolute top-1/2 -translate-y-1/2"
                        style={{ left: "0%" }}
                        animate={{
                          left: ["-5%", "105%"],
                        }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          ease: "linear",
                          delay: i * 0.6 + idx * 0.3,
                        }}
                      >
                        {/* Pacote principal */}
                        <motion.div
                          className="relative w-6 h-6 rounded-lg bg-gradient-to-br from-[#4FACFE] to-[#43E97B] shadow-[0_0_20px_rgba(79,172,254,0.8)] border border-white/50"
                          animate={{
                            rotate: [0, 360],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            rotate: {
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                            },
                            scale: {
                              duration: 0.8,
                              repeat: Infinity,
                              ease: "easeInOut",
                            },
                          }}
                        >
                          {/* Brilho interno */}
                          <div className="absolute inset-1 rounded bg-white/40" />
                        </motion.div>
                        {/* Rastro do pacote */}
                        <motion.div
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-1 rounded-full bg-gradient-to-r from-transparent via-[#4FACFE]/60 to-transparent blur-sm"
                          animate={{
                            opacity: [0.3, 0.8, 0.3],
                            scaleX: [0.8, 1.2, 0.8],
                          }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      </motion.div>
                    ))}
                  
                  {/* Partículas pequenas fluindo continuamente */}
                  {!prefersReducedMotion &&
                    Array.from({ length: 5 }).map((_, i) => (
                      <motion.div
                        key={`particle-${idx}-${i}`}
                        className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(79,172,254,1)]"
                        style={{ left: "0%" }}
                        animate={{
                          left: ["-2%", "102%"],
                          opacity: [0, 1, 1, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "linear",
                          delay: i * 0.3 + idx * 0.2,
                        }}
                      />
                    ))}
                  
                  {/* Shimmer que passa pela linha - mais rápido */}
                  {!prefersReducedMotion && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent"
                      style={{ width: "25%" }}
                      animate={{
                        left: ["-25%", "125%"],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear",
                        delay: idx * 0.3,
                      }}
                    />
                  )}
                  
                  {/* Onda de energia que propaga */}
                  {!prefersReducedMotion && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#4FACFE]/30 via-[#00DBDE]/50 to-[#43E97B]/30"
                      style={{ width: "40%" }}
                      animate={{
                        left: ["-40%", "140%"],
                        opacity: [0, 0.6, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: idx * 0.5,
                      }}
                    />
                  )}
                </div>
              );
            })}

            {/* Partículas de fundo flutuantes - mais movimento */}
            {!prefersReducedMotion &&
              Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={`float-${i}`}
                  className="absolute w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#4FACFE] to-[#43E97B] blur-[2px] shadow-[0_0_8px_rgba(79,172,254,0.6)]"
                  style={{
                    left: `${15 + (i * 7)}%`,
                    top: `${25 + (i % 4) * 15}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    x: [0, Math.sin(i * 0.5) * 20, 0],
                    opacity: [0.2, 0.9, 0.2],
                    scale: [0.6, 1.4, 0.6],
                  }}
                  transition={{
                    duration: 2.5 + i * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                />
              ))}

            {/* Background grid animado */}
            {!prefersReducedMotion && (
              <motion.div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(79,172,254,0.15) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(79,172,254,0.15) 1px, transparent 1px)
                  `,
                  backgroundSize: "40px 40px",
                }}
                animate={{
                  backgroundPosition: ["0 0", "40px 40px"],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}


