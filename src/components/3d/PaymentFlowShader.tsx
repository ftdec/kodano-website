"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import {
  Float,
  OrbitControls,
  PerspectiveCamera,
  PerformanceMonitor,
  Preload
} from "@react-three/drei";
import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";

// GLSL Shader for glowing nodes
const GlowShaderMaterial = shaderMaterial(
  // Uniforms
  {
    time: 0,
    color: new THREE.Color(0.0, 0.65, 0.71),
    intensity: 1.0,
    pulseSpeed: 1.0
  },
  // Vertex Shader
  /*glsl*/`
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float time;

    void main() {
      vUv = uv;
      vPosition = position;

      // Add subtle pulsing to vertices
      vec3 pos = position;
      float pulse = sin(time * 2.0) * 0.02;
      pos *= 1.0 + pulse;

      vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;

      gl_Position = projectedPosition;
    }
  `,
  // Fragment Shader
  /*glsl*/`
    uniform float time;
    uniform vec3 color;
    uniform float intensity;
    uniform float pulseSpeed;
    varying vec2 vUv;

    void main() {
      // Create radial gradient for glow effect
      vec2 center = vec2(0.5, 0.5);
      float dist = distance(vUv, center);

      // Pulsing glow
      float pulse = sin(time * pulseSpeed) * 0.3 + 0.7;
      float glow = (1.0 - dist * 2.0) * pulse * intensity;
      glow = clamp(glow, 0.0, 1.0);

      // Apply glow with transparency
      vec3 glowColor = color * glow * 2.0;
      float alpha = glow * 0.9;

      gl_FragColor = vec4(glowColor, alpha);
    }
  `
);

// Extend for TypeScript
extend({ GlowShaderMaterial });

// Types
interface NodeData {
  id: string;
  position: [number, number, number];
  label: string;
  color: string;
  connections: string[];
}

interface ParticleData {
  id: number;
  path: string[];
  progress: number;
  speed: number;
  color: string;
}

// Network nodes configuration
const NETWORK_NODES: NodeData[] = [
  { id: 'merchant', position: [-4, 0, 0], label: 'Comerciante', color: '#00A6B4', connections: ['gateway'] },
  { id: 'gateway', position: [-2, 0.5, 0], label: 'Gateway', color: '#053B3F', connections: ['tokenization', 'antifraud'] },
  { id: 'tokenization', position: [0, 1, 0], label: 'Tokenização', color: '#00A6B4', connections: ['processor'] },
  { id: 'antifraud', position: [0, -1, 0], label: 'Antifraude', color: '#10B981', connections: ['processor'] },
  { id: 'processor', position: [2, 0, 0], label: 'Processador', color: '#053B3F', connections: ['bank'] },
  { id: 'bank', position: [4, 0, 0], label: 'Banco', color: '#00A6B4', connections: [] },
];

// Glowing network node component
function NetworkNode({ data, isActive }: { data: NodeData; isActive: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime();
      materialRef.current.uniforms.intensity.value = isActive ? 1.5 : 1.0;
    }

    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = data.position[1] + Math.sin(clock.getElapsedTime() + data.position[0]) * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
      <mesh ref={meshRef} position={data.position}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <glowShaderMaterial
          ref={materialRef}
          color={new THREE.Color(data.color)}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          pulseSpeed={isActive ? 2.0 : 1.0}
        />
      </mesh>
    </Float>
  );
}

// Connection line between nodes
function ConnectionLine({ start, end }: { start: [number, number, number]; end: [number, number, number] }) {
  const points = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(...start),
      new THREE.Vector3(
        (start[0] + end[0]) / 2,
        (start[1] + end[1]) / 2 + 0.5,
        (start[2] + end[2]) / 2
      ),
      new THREE.Vector3(...end),
    ]);
    return curve.getPoints(50);
  }, [start, end]);

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#00A6B4" opacity={0.3} transparent linewidth={1} />
    </line>
  );
}

// Flowing particle along path
function FlowingParticle({ data, nodes }: { data: ParticleData; nodes: NodeData[] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    // Update particle position along path
    const pathIndex = Math.floor(data.progress * (data.path.length - 1));
    const nextIndex = Math.min(pathIndex + 1, data.path.length - 1);

    const currentNode = nodes.find(n => n.id === data.path[pathIndex]);
    const nextNode = nodes.find(n => n.id === data.path[nextIndex]);

    if (currentNode && nextNode) {
      const localProgress = (data.progress * (data.path.length - 1)) % 1;

      meshRef.current.position.x = THREE.MathUtils.lerp(
        currentNode.position[0],
        nextNode.position[0],
        localProgress
      );
      meshRef.current.position.y = THREE.MathUtils.lerp(
        currentNode.position[1],
        nextNode.position[1],
        localProgress
      );
      meshRef.current.position.z = THREE.MathUtils.lerp(
        currentNode.position[2],
        nextNode.position[2],
        localProgress
      ) + 0.1;
    }

    // Update progress
    data.progress += data.speed * 0.01;
    if (data.progress >= 1) {
      data.progress = 0;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshBasicMaterial color={data.color} />
    </mesh>
  );
}

// Main Payment Flow Scene
function PaymentFlowScene() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [particles] = useState<ParticleData[]>(() => [
    { id: 1, path: ['merchant', 'gateway', 'tokenization', 'processor', 'bank'], progress: 0, speed: 1, color: '#00A6B4' },
    { id: 2, path: ['merchant', 'gateway', 'antifraud', 'processor', 'bank'], progress: 0.3, speed: 0.8, color: '#10B981' },
    { id: 3, path: ['merchant', 'gateway', 'tokenization', 'processor', 'bank'], progress: 0.6, speed: 1.2, color: '#8B5CF6' },
  ]);

  const [dpr, setDpr] = useState(1);

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas dpr={dpr} gl={{ antialias: true, alpha: true }}>
        <PerformanceMonitor
          onIncline={() => setDpr(2)}
          onDecline={() => setDpr(1)}
          flipflops={3}
          onFallback={() => setDpr(1)}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />

          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.6} color="#ffffff" />
          <pointLight position={[-5, 5, -5]} intensity={0.3} color="#00A6B4" />

          {/* Network Nodes */}
          {NETWORK_NODES.map((node) => (
            <NetworkNode
              key={node.id}
              data={node}
              isActive={activeNode === node.id}
            />
          ))}

          {/* Connections */}
          {NETWORK_NODES.map((node) =>
            node.connections.map((targetId) => {
              const target = NETWORK_NODES.find(n => n.id === targetId);
              if (!target) return null;
              return (
                <ConnectionLine
                  key={`${node.id}-${targetId}`}
                  start={node.position}
                  end={target.position}
                />
              );
            })
          )}

          {/* Flowing Particles */}
          {particles.map((particle) => (
            <FlowingParticle key={particle.id} data={particle} nodes={NETWORK_NODES} />
          ))}

          {/* Camera controls for development */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            autoRotate
            autoRotateSpeed={0.5}
          />

          <Preload all />
        </PerformanceMonitor>
      </Canvas>

      {/* Gradient overlay for text legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/80 via-white/50 to-transparent dark:from-kodano-dark/80 dark:via-kodano-dark/50 dark:to-transparent" />
    </div>
  );
}

// Export with fallback
export function PaymentFlowNetwork() {
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // SSR fallback
  if (!mounted) {
    return <PaymentFlowFallback />;
  }

  // Reduced motion fallback
  if (prefersReducedMotion) {
    return <PaymentFlowFallback />;
  }

  return <PaymentFlowScene />;
}

// SVG Fallback for SSR and reduced motion
function PaymentFlowFallback() {
  return (
    <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-20 dark:opacity-10">
      <svg
        width="800"
        height="300"
        viewBox="0 0 800 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="max-w-full h-auto"
      >
        {/* Static nodes */}
        <circle cx="100" cy="150" r="20" fill="#00A6B4" opacity="0.5" />
        <circle cx="250" cy="120" r="20" fill="#053B3F" opacity="0.5" />
        <circle cx="400" cy="100" r="20" fill="#00A6B4" opacity="0.5" />
        <circle cx="400" cy="200" r="20" fill="#10B981" opacity="0.5" />
        <circle cx="550" cy="150" r="20" fill="#053B3F" opacity="0.5" />
        <circle cx="700" cy="150" r="20" fill="#00A6B4" opacity="0.5" />

        {/* Static connections */}
        <path
          d="M120,150 Q185,135 250,120"
          stroke="#00A6B4"
          strokeWidth="2"
          opacity="0.3"
          fill="none"
        />
        <path
          d="M270,120 Q335,110 400,100"
          stroke="#00A6B4"
          strokeWidth="2"
          opacity="0.3"
          fill="none"
        />
        <path
          d="M270,120 Q335,160 400,200"
          stroke="#00A6B4"
          strokeWidth="2"
          opacity="0.3"
          fill="none"
        />
        <path
          d="M420,100 Q485,125 550,150"
          stroke="#00A6B4"
          strokeWidth="2"
          opacity="0.3"
          fill="none"
        />
        <path
          d="M420,200 Q485,175 550,150"
          stroke="#00A6B4"
          strokeWidth="2"
          opacity="0.3"
          fill="none"
        />
        <path
          d="M570,150 Q635,150 700,150"
          stroke="#00A6B4"
          strokeWidth="2"
          opacity="0.3"
          fill="none"
        />

        {/* Labels */}
        <text x="100" y="185" textAnchor="middle" fill="#00A6B4" fontSize="12" fontWeight="600">
          Comerciante
        </text>
        <text x="250" y="155" textAnchor="middle" fill="#053B3F" fontSize="12" fontWeight="600">
          Gateway
        </text>
        <text x="400" y="85" textAnchor="middle" fill="#00A6B4" fontSize="12" fontWeight="600">
          Tokenização
        </text>
        <text x="400" y="235" textAnchor="middle" fill="#10B981" fontSize="12" fontWeight="600">
          Antifraude
        </text>
        <text x="550" y="185" textAnchor="middle" fill="#053B3F" fontSize="12" fontWeight="600">
          Processador
        </text>
        <text x="700" y="185" textAnchor="middle" fill="#00A6B4" fontSize="12" fontWeight="600">
          Banco
        </text>
      </svg>
    </div>
  );
}

// Add missing imports
import { useState, useEffect } from "react";