/**
 * CardScene Component
 *
 * Premium 3D credit card with holographic material
 * Phases:
 * - 0: Card enters and rotates elegantly
 * - 1: Chip activates (blue glow)
 * - 2+: Card blurs and fades (focus shifts to data)
 */

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

interface CardSceneProps {
  phase: number;
  progress: number;
  time: number;
  blur?: boolean;
}

export function CardScene({ phase, progress, time, blur = false }: CardSceneProps) {
  const cardRef = useRef<THREE.Group>(null);
  const chipRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!cardRef.current) return;

    // Phase 0: Card entrance + elegant rotation
    if (phase === 0) {
      const entryProgress = Math.min(1, progress * 1.5);
      const eased = easeOutCubic(entryProgress);

      cardRef.current.position.x = -8 + eased * 8; // Enter from left
      cardRef.current.rotation.y = Math.PI * 0.2 * (1 - eased); // Rotate to front
      cardRef.current.position.z = 2 * (1 - eased); // Slightly forward
    }

    // Phase 1: Stabilize + subtle breathing
    if (phase === 1) {
      cardRef.current.rotation.y = Math.sin(time * 0.5) * 0.02; // Subtle sway
      cardRef.current.position.y = Math.sin(time * 0.8) * 0.05; // Breathing
    }

    // Phase 2+: Blur out (defocus)
    if (phase >= 2 && cardRef.current) {
      const fadeOut = Math.min(1, (phase - 2) * 0.5);
      cardRef.current.position.z = 2 + fadeOut * 4; // Move back
      cardRef.current.scale.setScalar(1 - fadeOut * 0.3); // Shrink
    }

    // Chip glow (phase 1)
    if (chipRef.current && phase === 1) {
      const glowIntensity = 0.5 + Math.sin(time * 3) * 0.3;
      (chipRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        glowIntensity;
    }
  });

  const cardOpacity = blur ? 0.3 : 1;

  return (
    <group ref={cardRef} position={[-8, 0, 2]}>
      {/* Card body */}
      <RoundedBox
        args={[3.4, 2.1, 0.08]}
        radius={0.1}
        smoothness={4}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.7}
          roughness={0.3}
          opacity={cardOpacity}
          transparent
          emissive="#4FACFE"
          emissiveIntensity={0.1}
        />
      </RoundedBox>

      {/* Holographic overlay */}
      <RoundedBox
        args={[3.38, 2.08, 0.01]}
        radius={0.1}
        smoothness={4}
        position={[0, 0, 0.05]}
      >
        <meshStandardMaterial
          color="#4FACFE"
          metalness={0.9}
          roughness={0.1}
          opacity={0.15 * cardOpacity}
          transparent
          emissive="#00DBDE"
          emissiveIntensity={0.2}
        />
      </RoundedBox>

      {/* EMV Chip */}
      <RoundedBox
        ref={chipRef}
        args={[0.5, 0.4, 0.05]}
        radius={0.05}
        smoothness={2}
        position={[-0.8, 0.3, 0.06]}
      >
        <meshStandardMaterial
          color="#d4af37"
          metalness={1}
          roughness={0.2}
          emissive="#4FACFE"
          emissiveIntensity={phase === 1 ? 0.5 : 0}
        />
      </RoundedBox>

      {/* Card numbers (mockup) */}
      <CardNumbers position={[0, -0.3, 0.045]} opacity={cardOpacity} />
    </group>
  );
}

/**
 * Card numbers visualization (abstract, not real)
 */
function CardNumbers({
  position,
  opacity,
}: {
  position: [number, number, number];
  opacity: number;
}) {
  return (
    <group position={position}>
      {[0, 1, 2, 3].map((group) => (
        <group key={group} position={[group * 0.75 - 1.1, 0, 0]}>
          {[0, 1, 2, 3].map((digit) => (
            <mesh
              key={digit}
              position={[digit * 0.15, 0, 0]}
              scale={[0.08, 0.12, 0.01]}
            >
              <boxGeometry />
              <meshStandardMaterial
                color="#94a3b8"
                emissive="#4FACFE"
                emissiveIntensity={0.1}
                opacity={opacity * 0.6}
                transparent
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

// Easing functions
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}
