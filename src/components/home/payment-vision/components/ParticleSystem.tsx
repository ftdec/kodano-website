/**
 * Particle System Component
 *
 * Optimized particle rendering using InstancedMesh
 * Supports multiple modes:
 * - extraction: Particles emerge from chip
 * - tokenization: Particles converge to cube
 * - packet: Single packet traveling
 * - processing: Distributed parallel flows
 * - approval: Convergence + color shift
 * - settlement: Liquid dispersion
 */

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleSystemProps {
  mode:
    | "extraction"
    | "tokenization"
    | "packet"
    | "processing"
    | "approval"
    | "settlement";
  progress: number;
  count: number;
}

export function ParticleSystem({ mode, progress, count }: ParticleSystemProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  // Pre-generate particle positions (deterministic randomness)
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      seed: Math.random(),
      angle: (i / count) * Math.PI * 2,
      radius: 0.3 + Math.random() * 0.5,
      speed: 0.5 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
    }));
  }, [count]);

  // Color gradient (Kodano palette)
  const colorGradient = useMemo(() => {
    return [
      new THREE.Color("#4FACFE"), // Blue
      new THREE.Color("#00DBDE"), // Cyan
      new THREE.Color("#43E97B"), // Green
    ];
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const time = clock.getElapsedTime();
    const matrix = new THREE.Matrix4();
    const color = new THREE.Color();

    particles.forEach((p, i) => {
      let x = 0,
        y = 0,
        z = 0;
      let scale = 1;
      let colorIndex = 0;

      // Mode-specific positioning
      switch (mode) {
        case "extraction":
          // Emerge from chip position (-0.8, 0.3)
          const extractProgress = Math.min(1, progress * 1.2);
          const spread = extractProgress * 3;
          x = -0.8 + Math.cos(p.angle) * spread * p.radius;
          y = 0.3 + Math.sin(p.angle) * spread * p.radius;
          z = 0.06 + extractProgress * 2 + p.seed * 0.5;
          scale = 0.03 + extractProgress * 0.02;
          colorIndex = Math.min(2, Math.floor(extractProgress * 3));
          break;

        case "tokenization":
          // Converge to cube center
          const cubeProgress = easeInOutCubic(progress);
          const targetX = 0;
          const targetY = 0;
          const targetZ = 2;
          const startX = Math.cos(p.angle) * 3;
          const startY = Math.sin(p.angle) * 2;
          const startZ = 0;

          x = lerp(startX, targetX, cubeProgress);
          y = lerp(startY, targetY, cubeProgress);
          z = lerp(startZ, targetZ, cubeProgress);
          scale = 0.02 + (1 - cubeProgress) * 0.03;
          colorIndex = 1; // Cyan
          break;

        case "packet":
          // Single traveling packet
          const packetProgress = easeInOutQuad(progress);
          x = -4 + packetProgress * 8;
          y = Math.sin(packetProgress * Math.PI) * 0.5;
          z = 0;

          // Only show particles in compact formation
          const dx = Math.cos(p.angle) * p.radius * 0.2;
          const dy = Math.sin(p.angle) * p.radius * 0.2;
          x += dx;
          y += dy;
          scale = 0.04;
          colorIndex = 2; // Green
          break;

        case "processing":
          // Distributed flow through nodes
          const t = (progress + p.seed) % 1;
          const pathX = -3 + Math.cos(p.phase + t * Math.PI * 2) * 2;
          const pathY = -2 + Math.sin(p.phase + t * Math.PI * 2) * 2;
          const pathZ = Math.sin(time * p.speed + p.phase) * 0.5;

          x = pathX;
          y = pathY;
          z = pathZ;
          scale = 0.025;
          colorIndex = Math.floor(t * 3) % 3;
          break;

        case "approval":
          // Converge with color shift blue → green
          const approvalProgress = easeOutCubic(progress);
          const convergeFactor = approvalProgress;

          x = Math.cos(p.angle) * (3 - convergeFactor * 2.5);
          y = Math.sin(p.angle) * (2 - convergeFactor * 1.8);
          z = convergeFactor * 1;
          scale = 0.04 + approvalProgress * 0.02;
          colorIndex = Math.floor(approvalProgress * 2.9); // Shift to green
          break;

        case "settlement":
          // Liquid dispersion (mercury-like)
          const settleProgress = progress;
          const liquidX = Math.cos(p.angle + time * 0.5) * (1 + settleProgress * 2);
          const liquidY = Math.sin(p.angle + time * 0.3) * (1 + settleProgress * 1.5);
          const liquidZ = settleProgress * 3 - 1.5;

          x = liquidX;
          y = liquidY + settleProgress * -2; // Fall down
          z = liquidZ;
          scale = 0.03 * (1 - settleProgress * 0.5);
          colorIndex = 2; // Green
          break;
      }

      // Set transform
      matrix.setPosition(x, y, z);
      matrix.scale(new THREE.Vector3(scale, scale, scale));
      meshRef.current!.setMatrixAt(i, matrix);

      // Set color
      const baseColor = colorGradient[colorIndex];
      const pulseIntensity = 0.8 + Math.sin(time * 2 + p.phase) * 0.2;
      color.copy(baseColor).multiplyScalar(pulseIntensity);
      meshRef.current!.setColorAt(i, color);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      frustumCulled={false}
    >
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial
        color="#4FACFE"
        emissive="#4FACFE"
        emissiveIntensity={0.8}
        toneMapped={false}
      />
    </instancedMesh>
  );
}

// Easing functions
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}
