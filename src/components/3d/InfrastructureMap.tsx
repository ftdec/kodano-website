"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  Float,
  PerspectiveCamera,
  Stars,
  PerformanceMonitor
} from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three";

// Data center locations worldwide
const DATA_CENTERS = [
  { id: "sao-paulo", name: "São Paulo", position: [-46.6, -23.5], region: "South America", status: "active" },
  { id: "virginia", name: "N. Virginia", position: [-77.5, 38.7], region: "North America", status: "active" },
  { id: "oregon", name: "Oregon", position: [-122.6, 45.5], region: "North America", status: "active" },
  { id: "frankfurt", name: "Frankfurt", position: [8.6, 50.1], region: "Europe", status: "active" },
  { id: "singapore", name: "Singapore", position: [103.8, 1.3], region: "Asia Pacific", status: "active" },
  { id: "tokyo", name: "Tokyo", position: [139.6, 35.6], region: "Asia Pacific", status: "active" },
  { id: "sydney", name: "Sydney", position: [151.2, -33.8], region: "Oceania", status: "active" },
  { id: "mumbai", name: "Mumbai", position: [72.8, 19.0], region: "Asia", status: "planned" },
];

// Convert lat/lng to 3D sphere coordinates
function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

// Data Center Marker Component
function DataCenterMarker({ center, isHovered, onHover }: {
  center: typeof DATA_CENTERS[0];
  isHovered: boolean;
  onHover: (id: string | null) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const position = latLonToVector3(center.position[1], center.position[0], 2.05);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(isHovered ? 1.3 : 1);
    }
    if (ringRef.current && isHovered) {
      ringRef.current.rotation.z = clock.getElapsedTime() * 2;
    }
  });

  return (
    <group position={position}>
      {/* Main marker */}
      <mesh
        ref={meshRef}
        onPointerEnter={() => onHover(center.id)}
        onPointerLeave={() => onHover(null)}
      >
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshBasicMaterial
          color={center.status === "active" ? "#00A6B4" : "#FFA500"}
          emissive={center.status === "active" ? "#00A6B4" : "#FFA500"}
          emissiveIntensity={isHovered ? 2 : 1}
        />
      </mesh>

      {/* Pulse ring */}
      {isHovered && (
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.05, 0.07, 32]} />
          <meshBasicMaterial
            color="#00A6B4"
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Label (shown on hover) */}
      {isHovered && (
        <Float speed={2} rotationIntensity={0} floatIntensity={0.5}>
          <group position={[0, 0.1, 0]}>
            <mesh>
              <planeGeometry args={[0.5, 0.15]} />
              <meshBasicMaterial
                color="#053B3F"
                transparent
                opacity={0.9}
              />
            </mesh>
          </group>
        </Float>
      )}
    </group>
  );
}

// Connection Line Between Data Centers
function ConnectionLine({ start, end, intensity = 1 }: {
  start: typeof DATA_CENTERS[0];
  end: typeof DATA_CENTERS[0];
  intensity?: number;
}) {
  const curve = useMemo(() => {
    const startVec = latLonToVector3(start.position[1], start.position[0], 2.03);
    const endVec = latLonToVector3(end.position[1], end.position[0], 2.03);

    // Create an arc between points
    const midVec = new THREE.Vector3()
      .addVectors(startVec, endVec)
      .multiplyScalar(0.5)
      .normalize()
      .multiplyScalar(2.15); // Slightly elevated arc

    return new THREE.QuadraticBezierCurve3(startVec, midVec, endVec);
  }, [start, end]);

  const points = curve.getPoints(50);
  const lineRef = useRef<THREE.Line>(null);

  useFrame(({ clock }) => {
    if (lineRef.current && lineRef.current.material) {
      const mat = lineRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.3 + Math.sin(clock.getElapsedTime() * 2) * 0.1;
    }
  });

  return (
    <line ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#00A6B4"
        transparent
        opacity={0.3 * intensity}
        linewidth={1}
      />
    </line>
  );
}

// Earth Globe Component
function Earth() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshPhongMaterial
        color="#053B3F"
        emissive="#003E4E"
        emissiveIntensity={0.1}
        shininess={10}
        opacity={0.8}
        transparent
      />
    </mesh>
  );
}

// Grid overlay on globe
function GlobeGrid() {
  return (
    <mesh>
      <sphereGeometry args={[2.01, 32, 32]} />
      <meshBasicMaterial
        color="#00A6B4"
        wireframe
        transparent
        opacity={0.1}
      />
    </mesh>
  );
}

// Main Infrastructure Scene
function InfrastructureScene() {
  const [hoveredCenter, setHoveredCenter] = useState<string | null>(null);
  const [dpr, setDpr] = useState(1);

  // Define connections between data centers
  const connections = useMemo(() => [
    { start: DATA_CENTERS[0], end: DATA_CENTERS[1] }, // São Paulo - Virginia
    { start: DATA_CENTERS[1], end: DATA_CENTERS[2] }, // Virginia - Oregon
    { start: DATA_CENTERS[1], end: DATA_CENTERS[3] }, // Virginia - Frankfurt
    { start: DATA_CENTERS[3], end: DATA_CENTERS[4] }, // Frankfurt - Singapore
    { start: DATA_CENTERS[4], end: DATA_CENTERS[5] }, // Singapore - Tokyo
    { start: DATA_CENTERS[4], end: DATA_CENTERS[6] }, // Singapore - Sydney
    { start: DATA_CENTERS[0], end: DATA_CENTERS[3] }, // São Paulo - Frankfurt
  ], []);

  return (
    <Canvas dpr={dpr} gl={{ antialias: true, alpha: true }}>
      <PerformanceMonitor
        onIncline={() => setDpr(2)}
        onDecline={() => setDpr(1)}
        flipflops={3}
        onFallback={() => setDpr(1)}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#00A6B4" />

        {/* Background stars */}
        <Stars radius={100} depth={50} count={2000} factor={2} saturation={0} fade speed={1} />

        {/* Earth and grid */}
        <Earth />
        <GlobeGrid />

        {/* Data Centers */}
        {DATA_CENTERS.map((center) => (
          <DataCenterMarker
            key={center.id}
            center={center}
            isHovered={hoveredCenter === center.id}
            onHover={setHoveredCenter}
          />
        ))}

        {/* Connections */}
        {connections.map((conn, i) => (
          <ConnectionLine
            key={i}
            start={conn.start}
            end={conn.end}
            intensity={
              hoveredCenter === conn.start.id || hoveredCenter === conn.end.id
                ? 2
                : 1
            }
          />
        ))}

        {/* Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI * 2 / 3}
        />
      </PerformanceMonitor>
    </Canvas>
  );
}

// Fallback for SSR/reduced motion
function InfrastructureFallback() {
  return (
    <div className="flex items-center justify-center h-full opacity-20 dark:opacity-10">
      <svg width="600" height="400" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="300" cy="200" r="150" stroke="#00A6B4" strokeWidth="1" fill="none" opacity="0.3" />
        <circle cx="300" cy="200" r="100" stroke="#00A6B4" strokeWidth="1" fill="none" opacity="0.2" />

        {/* Data center points */}
        <circle cx="200" cy="150" r="5" fill="#00A6B4" />
        <circle cx="400" cy="150" r="5" fill="#00A6B4" />
        <circle cx="250" cy="250" r="5" fill="#00A6B4" />
        <circle cx="350" cy="250" r="5" fill="#00A6B4" />
        <circle cx="300" cy="100" r="5" fill="#00A6B4" />
        <circle cx="300" cy="300" r="5" fill="#00A6B4" />

        {/* Connection lines */}
        <path d="M200,150 Q300,100 400,150" stroke="#00A6B4" strokeWidth="1" opacity="0.3" fill="none" />
        <path d="M250,250 Q300,200 350,250" stroke="#00A6B4" strokeWidth="1" opacity="0.3" fill="none" />

        <text x="300" y="380" textAnchor="middle" fill="#00A6B4" fontSize="14" fontWeight="600">
          Global Infrastructure
        </text>
      </svg>
    </div>
  );
}

// Main export component
export function InfrastructureMap() {
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

  if (!mounted || prefersReducedMotion) {
    return <InfrastructureFallback />;
  }

  return (
    <div className="w-full h-full min-h-[500px]">
      <Suspense fallback={<InfrastructureFallback />}>
        <InfrastructureScene />
      </Suspense>
    </div>
  );
}

// Add missing imports
import { useState, useEffect } from "react";