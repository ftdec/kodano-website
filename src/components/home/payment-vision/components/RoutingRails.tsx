/**
 * Routing Rails Component
 *
 * Displays multiple 3D paths (rails) representing routing options
 * One path is intelligently selected (glows brighter)
 * Packet travels along selected route
 */

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface RoutingRailsProps {
  progress: number;
  pathCount: number;
}

export function RoutingRails({ progress, pathCount }: RoutingRailsProps) {
  // Randomly select a path (deterministic per render cycle)
  const selectedPath = useMemo(
    () => Math.floor(Math.random() * pathCount),
    [pathCount]
  );

  return (
    <group>
      {Array.from({ length: pathCount }, (_, i) => (
        <Rail
          key={i}
          index={i}
          total={pathCount}
          selected={i === selectedPath}
          progress={progress}
        />
      ))}
    </group>
  );
}

/**
 * Single routing rail (3D curved path)
 */
function Rail({
  index,
  total,
  selected,
  progress,
}: {
  index: number;
  total: number;
  selected: boolean;
  progress: number;
}) {
  const tubeRef = useRef<THREE.Mesh>(null);

  // Create curved path
  const curve = useMemo(() => {
    const startY = 0;
    const spread = (index - (total - 1) / 2) * 1.2;

    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-3, startY, 0),
      new THREE.Vector3(-1, startY + spread * 0.3, spread * 0.5),
      new THREE.Vector3(1, startY + spread * 0.5, spread),
      new THREE.Vector3(3, startY + spread * 0.3, spread * 0.8),
      new THREE.Vector3(5, startY, spread * 0.5),
    ]);
  }, [index, total]);

  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 64, selected ? 0.08 : 0.04, 8, false);
  }, [curve, selected]);

  useFrame(({ clock }) => {
    if (!tubeRef.current) return;

    const time = clock.getElapsedTime();
    const material = tubeRef.current.material as THREE.MeshStandardMaterial;

    if (selected) {
      // Pulsing glow for selected path
      const glowIntensity = 0.6 + Math.sin(time * 2 + progress * Math.PI) * 0.3;
      material.emissiveIntensity = glowIntensity;
      material.opacity = 0.7 + progress * 0.3;
    } else {
      // Dim inactive paths
      material.emissiveIntensity = 0.1;
      material.opacity = 0.2 + progress * 0.1;
    }
  });

  const baseColor = selected ? "#00DBDE" : "#415A77";
  const emissiveColor = selected ? "#4FACFE" : "#1e293b";

  return (
    <mesh ref={tubeRef} geometry={tubeGeometry}>
      <meshStandardMaterial
        color={baseColor}
        emissive={emissiveColor}
        emissiveIntensity={selected ? 0.6 : 0.1}
        transparent
        opacity={selected ? 0.8 : 0.3}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}
