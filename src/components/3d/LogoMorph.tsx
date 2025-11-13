"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, Text } from "@react-three/drei";
import * as THREE from "three";

// Componente que morfa formas geométricas no logo da Kodano
export function LogoMorph() {
  const groupRef = useRef<THREE.Group>(null);
  const [morphPhase, setMorphPhase] = useState<"scatter" | "morph" | "logo">("scatter");
  
  // Criar partículas que se juntam para formar o logo
  const particleCount = 80;
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      // Posição inicial aleatória em uma esfera grande
      initialPosition: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
      ] as [number, number, number],
      // Posição final (formando o logo em formato circular)
      targetPosition: [
        Math.cos((i / particleCount) * Math.PI * 2) * 1.5,
        Math.sin((i / particleCount) * Math.PI * 2) * 1.5,
        (Math.random() - 0.5) * 0.5,
      ] as [number, number, number],
      delay: (i / particleCount) * 1.5,
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    const elapsed = state.clock.elapsedTime;
    
    // Controlar fase da animação
    const cycle = (elapsed % 12);
    if (cycle < 4) {
      setMorphPhase("scatter");
    } else if (cycle < 8) {
      setMorphPhase("morph");
    } else {
      setMorphPhase("logo");
    }
    
    // Rotação suave do grupo
    groupRef.current.rotation.y = Math.sin(elapsed * 0.2) * 0.15;
    groupRef.current.rotation.x = Math.sin(elapsed * 0.15) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* Logo central que aparece na fase final */}
      {morphPhase === "logo" && <LogoCenter />}
      
      {/* Partículas que morfam para o logo */}
      {particles.map((particle) => (
        <MorphingParticle
          key={particle.id}
          initialPosition={particle.initialPosition}
          targetPosition={particle.targetPosition}
          delay={particle.delay}
          morphPhase={morphPhase}
        />
      ))}
    </group>
  );
}

// Logo central que aparece após o morphing
function LogoCenter() {
  const meshRef = useRef<THREE.Mesh>(null);
  const logoTexture = useTexture("/kodano-logo.png");
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    const elapsed = state.clock.elapsedTime;
    
    // Pulsação suave
    const pulse = Math.sin(elapsed * 1.2) * 0.08 + 1;
    meshRef.current.scale.setScalar(pulse);
    
    // Rotação leve 3D
    meshRef.current.rotation.y = Math.sin(elapsed * 0.3) * 0.1;
    meshRef.current.rotation.x = Math.sin(elapsed * 0.2) * 0.05;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[4, 4]} />
      <meshStandardMaterial
        map={logoTexture}
        transparent
        opacity={0.95}
        emissive="#00C8DC"
        emissiveIntensity={0.4}
      />
    </mesh>
  );
}

// Partícula individual que morfa
function MorphingParticle({
  initialPosition,
  targetPosition,
  delay,
  morphPhase,
}: {
  initialPosition: [number, number, number];
  targetPosition: [number, number, number];
  delay: number;
  morphPhase: "scatter" | "morph" | "logo";
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    const elapsed = state.clock.elapsedTime;
    const material = meshRef.current.material as THREE.MeshStandardMaterial;
    
    let currentPosition: [number, number, number];
    let scale = 1;
    let opacity = 1;
    
    if (morphPhase === "scatter") {
      // Fase 1: Partículas espalhadas
      const scatterProgress = Math.max(0, Math.min(1, (elapsed - delay) / 2));
      const eased = scatterProgress < 0.5
        ? 2 * scatterProgress * scatterProgress
        : 1 - Math.pow(-2 * scatterProgress + 2, 3) / 2;
      
      currentPosition = [
        THREE.MathUtils.lerp(0, initialPosition[0], eased),
        THREE.MathUtils.lerp(0, initialPosition[1], eased),
        THREE.MathUtils.lerp(0, initialPosition[2], eased),
      ];
      scale = eased * 0.15;
      opacity = eased;
    } else if (morphPhase === "morph") {
      // Fase 2: Morphing para o logo
      const morphProgress = Math.max(0, Math.min(1, ((elapsed - delay - 2) % 4) / 2));
      const eased = morphProgress < 0.5
        ? 2 * morphProgress * morphProgress
        : 1 - Math.pow(-2 * morphProgress + 2, 3) / 2;
      
      currentPosition = [
        THREE.MathUtils.lerp(initialPosition[0], targetPosition[0], eased),
        THREE.MathUtils.lerp(initialPosition[1], targetPosition[1], eased),
        THREE.MathUtils.lerp(initialPosition[2], targetPosition[2], eased),
      ];
      scale = 0.15 - eased * 0.1; // Diminui conforme se aproxima
      opacity = 1 - eased * 0.8; // Desaparece conforme se aproxima
    } else {
      // Fase 3: Logo formado - partículas desaparecem
      currentPosition = targetPosition;
      scale = 0;
      opacity = 0;
    }
    
    meshRef.current.position.set(...currentPosition);
    meshRef.current.scale.setScalar(scale);
    material.opacity = opacity;
    
    // Rotação contínua
    meshRef.current.rotation.x = elapsed * 2 + delay;
    meshRef.current.rotation.y = elapsed * 1.5 + delay;
  });

  return (
    <mesh ref={meshRef} position={initialPosition}>
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      <meshStandardMaterial
        color="#00C8DC"
        transparent
        opacity={0}
        emissive="#00C8DC"
        emissiveIntensity={0.7}
      />
    </mesh>
  );
}

