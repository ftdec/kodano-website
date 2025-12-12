/**
 * Processing Network Component
 *
 * Distributed network of processing nodes
 * Each node:
 * - Breathing animation (expand/contract)
 * - Lights up when processing
 * - Connected by pulsing lines
 */

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ProcessingNetworkProps {
  progress: number;
  nodeCount: number;
}

export function ProcessingNetwork({
  progress,
  nodeCount,
}: ProcessingNetworkProps) {
  // Generate node positions (distributed in 3D space)
  const nodes = useMemo(() => {
    return Array.from({ length: nodeCount }, (_, i) => {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 2 + (i % 2) * 0.8;
      const height = Math.sin(angle * 2) * 0.8;

      return {
        id: i,
        position: new THREE.Vector3(
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius
        ),
        phase: (i / nodeCount) * Math.PI * 2,
        connections: [(i + 1) % nodeCount, (i + 2) % nodeCount],
      };
    });
  }, [nodeCount]);

  return (
    <group>
      {/* Connections between nodes */}
      {nodes.map((node) =>
        node.connections.map((targetIndex, i) => {
          const target = nodes[targetIndex];
          if (!target) return null;

          return (
            <Connection
              key={`${node.id}-${targetIndex}`}
              start={node.position}
              end={target.position}
              progress={progress}
              delay={node.phase + i * 0.3}
            />
          );
        })
      )}

      {/* Nodes */}
      {nodes.map((node) => (
        <ProcessingNode
          key={node.id}
          position={node.position}
          progress={progress}
          phase={node.phase}
        />
      ))}
    </group>
  );
}

/**
 * Single processing node (breathing sphere)
 */
function ProcessingNode({
  position,
  progress,
  phase,
}: {
  position: THREE.Vector3;
  progress: number;
  phase: number;
}) {
  const nodeRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!nodeRef.current || !glowRef.current) return;

    const time = clock.getElapsedTime();

    // Breathing animation
    const breathScale = 1 + Math.sin(time * 1.5 + phase) * 0.15;
    nodeRef.current.scale.setScalar(breathScale);

    // Glow intensity based on processing activity
    const active = Math.sin(time * 2 + phase + progress * Math.PI) > 0.3;
    const targetGlow = active ? 1 : 0.3;
    const currentGlow = glowRef.current.scale.x;
    const newGlow = currentGlow + (targetGlow - currentGlow) * 0.1;
    glowRef.current.scale.setScalar(1.2 + newGlow * 0.3);

    const material = nodeRef.current.material as THREE.MeshStandardMaterial;
    material.emissiveIntensity = 0.4 + newGlow * 0.4;
  });

  return (
    <group position={position}>
      {/* Outer glow */}
      <mesh ref={glowRef} scale={1.3}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial
          color="#4FACFE"
          emissive="#4FACFE"
          emissiveIntensity={0.3}
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Core node */}
      <mesh ref={nodeRef}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial
          color="#00DBDE"
          emissive="#00DBDE"
          emissiveIntensity={0.6}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Inner core */}
      <mesh scale={0.5}>
        <sphereGeometry args={[0.18, 8, 8]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.9}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/**
 * Connection line between nodes with pulse
 */
function Connection({
  start,
  end,
  progress,
  delay,
}: {
  start: THREE.Vector3;
  end: THREE.Vector3;
  progress: number;
  delay: number;
}) {
  const lineRef = useRef<THREE.Line>(null);

  const points = useMemo(() => {
    return [start, end];
  }, [start, end]);

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  useFrame(({ clock }) => {
    if (!lineRef.current) return;

    const time = clock.getElapsedTime();
    const pulseIntensity =
      0.2 + Math.abs(Math.sin(time * 2 + delay + progress * Math.PI)) * 0.4;

    const material = lineRef.current.material as THREE.LineBasicMaterial;
    material.opacity = pulseIntensity;
  });

  return (
    <primitive ref={lineRef} object={new THREE.Line(geometry, new THREE.LineBasicMaterial({
      color: "#4FACFE",
      transparent: true,
      opacity: 0.3,
      linewidth: 2,
    }))} />
  );
}
