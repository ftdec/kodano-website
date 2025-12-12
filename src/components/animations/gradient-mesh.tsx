/**
 * GradientMesh Component
 * Animated gradient mesh background using WebGL
 */

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "@/lib/animations/hooks";
import * as THREE from "three";

interface MeshGradientProps {
  colors?: string[];
  speed?: number;
  className?: string;
  quality?: "high" | "balanced" | "low";
}

// Vertex shader
const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;

  // Simplex noise function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vUv = uv;
    vPosition = position;

    vec3 pos = position;
    float noise = snoise(pos.xy * 0.5 + uTime * 0.1) * 0.3;
    pos.z += noise;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// Fragment shader
const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec3 uColor4;

  void main() {
    vec2 uv = vUv;

    // Create smooth gradient blend
    float mixValue1 = smoothstep(0.0, 1.0, uv.x);
    float mixValue2 = smoothstep(0.0, 1.0, uv.y);

    // Mix colors
    vec3 color1 = mix(uColor1, uColor2, mixValue1);
    vec3 color2 = mix(uColor3, uColor4, mixValue1);
    vec3 finalColor = mix(color1, color2, mixValue2);

    // Add subtle animation
    float pulse = sin(uTime * 0.5 + vPosition.x * 2.0) * 0.5 + 0.5;
    finalColor += pulse * 0.05;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function AnimatedMesh({
  colors,
  speed = 1,
  segments,
}: {
  colors: THREE.Color[];
  speed: number;
  segments: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: colors[0] },
      uColor2: { value: colors[1] },
      uColor3: { value: colors[2] },
      uColor4: { value: colors[3] },
    }),
    [colors]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime * speed;
    }
  });

  return (
    <mesh ref={meshRef} scale={[2, 2, 1]}>
      <planeGeometry args={[10, 10, segments, segments]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export function GradientMesh({
  colors = ["#667eea", "#764ba2", "#f093fb", "#4facfe"],
  speed = 0.5,
  className = "",
  quality = "balanced",
}: MeshGradientProps) {
  const prefersReducedMotion = useReducedMotion();
  const [webglSupported, setWebglSupported] = useState(true);

  // Check WebGL support on mount only (client-side)
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      setWebglSupported(Boolean(gl));
    } catch {
      setWebglSupported(false);
    }
  }, []);

  // Convert hex colors to THREE.Color
  const threeColors = useMemo(
    () => colors.map((color) => new THREE.Color(color)),
    [colors]
  );

  // Fallback gradient for reduced motion or WebGL not supported
  if (prefersReducedMotion || !webglSupported) {
    return (
      <div
        className={className}
        style={{
          background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`,
        }}
      />
    );
  }

  const settings = (() => {
    if (quality === "high") {
      return { dpr: [1, 2] as [number, number], segments: 32, antialias: true };
    }
    if (quality === "low") {
      return { dpr: [1, 1] as [number, number], segments: 12, antialias: false };
    }
    // balanced
    return { dpr: [1, 1.5] as [number, number], segments: 16, antialias: false };
  })();

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: settings.antialias, alpha: true, powerPreference: "high-performance" }}
        dpr={settings.dpr}
      >
        <AnimatedMesh colors={threeColors} speed={speed} segments={settings.segments} />
      </Canvas>
    </div>
  );
}

/**
 * Simple gradient mesh fallback (CSS only)
 */
export function GradientMeshSimple({
  colors = ["#667eea", "#764ba2", "#f093fb", "#4facfe"],
  className = "",
}: Omit<MeshGradientProps, "speed">) {
  return (
    <div
      className={className}
      style={{
        background: `
          radial-gradient(at 27% 37%, ${colors[0]} 0px, transparent 50%),
          radial-gradient(at 97% 21%, ${colors[1]} 0px, transparent 50%),
          radial-gradient(at 52% 99%, ${colors[2]} 0px, transparent 50%),
          radial-gradient(at 10% 29%, ${colors[3]} 0px, transparent 50%),
          radial-gradient(at 97% 96%, ${colors[0]} 0px, transparent 50%),
          radial-gradient(at 33% 50%, ${colors[1]} 0px, transparent 50%),
          radial-gradient(at 79% 53%, ${colors[2]} 0px, transparent 50%)
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
}
