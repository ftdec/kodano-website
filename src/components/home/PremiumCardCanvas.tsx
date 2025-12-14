"use client";

import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, Text, Environment, ContactShadows, useTexture } from "@react-three/drei";

type PerformanceTier = "high" | "medium" | "low";

export default function PremiumCardCanvas({
  performanceTier,
  enableMotion,
  inView,
}: {
  performanceTier: PerformanceTier;
  enableMotion: boolean;
  inView: boolean;
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        alpha: true,
      }}
      camera={{ fov: 35, position: [0, 0, 8] }}
      frameloop={inView ? "always" : "demand"}
      style={{ width: "100%", height: "100%", pointerEvents: "none" }}
    >
      <Scene performanceTier={performanceTier} enableMotion={enableMotion} inView={inView} />
    </Canvas>
  );
}

function Scene({
  performanceTier,
  enableMotion,
  inView,
}: {
  performanceTier: PerformanceTier;
  enableMotion: boolean;
  inView: boolean;
}) {
  const groupRef = React.useRef<THREE.Group>(null);
  const cardRef = React.useRef<THREE.Group>(null);
  const sheenMatRef = React.useRef<THREE.ShaderMaterial | null>(null);
  const rimLightRef = React.useRef<THREE.PointLight>(null);
  const glowRef = React.useRef<THREE.Mesh>(null);
  const cameraRef = React.useRef<THREE.PerspectiveCamera | null>(null);

  const { invalidate, camera } = useThree();

  const mouseRef = React.useRef({ x: 0, y: 0 });
  const tiltRef = React.useRef({ x: 0, y: 0 });
  const sweepRef = React.useRef(0);
  const t0Ref = React.useRef<number | null>(null);

  const easeOut = (t: number) => 1 - Math.pow(1 - t, 4); // Mais dramático

  React.useEffect(() => {
    cameraRef.current = camera as THREE.PerspectiveCamera;
    cameraRef.current.position.set(0, 0, 8);
    cameraRef.current.lookAt(0, 0, 0);
  }, [camera]);

  // Garante pelo menos 1 frame inicial (mesmo com frameloop="demand")
  React.useEffect(() => {
    invalidate();
  }, [invalidate]);

  // Se o IntersectionObserver ainda não marcou visível no primeiro render,
  // isso garante o primeiro frame assim que entrar em view.
  React.useEffect(() => {
    if (!inView) return;
    invalidate();
  }, [inView, invalidate]);

  // Mouse tracking
  React.useEffect(() => {
    if (!enableMotion) return;

    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -((e.clientY / window.innerHeight) * 2 - 1);
      mouseRef.current = { x, y };
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [enableMotion]);

  // Intro setup
  React.useEffect(() => {
    invalidate();

    if (enableMotion) {
      t0Ref.current = performance.now();
      sweepRef.current = 0;
    } else {
      if (cardRef.current) {
        cardRef.current.rotation.set(-0.15, 0.4, 0);
        cardRef.current.position.set(0, 0, 0);
      }
      if (cameraRef.current) cameraRef.current.position.z = 10;
      invalidate();
    }
  }, [enableMotion, invalidate]);

  useFrame((state) => {
    const now = performance.now();

    if (!inView) return;
    if (!enableMotion) return;

    const t = state.clock.elapsedTime;

    // INTRO DRAMÁTICO (0-1s)
    const t0 = t0Ref.current ?? now;
    const introT = THREE.MathUtils.clamp((now - t0) / 1000, 0, 1); // Mais rápido
    const k = easeOut(introT);

    // Camera zoom dramático
    if (cameraRef.current) cameraRef.current.position.z = THREE.MathUtils.lerp(14, 10, k);

    if (cardRef.current) {
      const g = cardRef.current;

      // Mouse tilt AMPLIFICADO (suavizado, mas sem “matar” o idle)
      const mx = THREE.MathUtils.clamp(mouseRef.current.x, -1, 1);
      const my = THREE.MathUtils.clamp(mouseRef.current.y, -1, 1);

      // Mouse tilt <= ±5° (≈0.087rad)
      const targetX = my * 0.087;
      const targetY = mx * 0.087;

      tiltRef.current.x = THREE.MathUtils.lerp(tiltRef.current.x, targetX, 0.08);
      tiltRef.current.y = THREE.MathUtils.lerp(tiltRef.current.y, targetY, 0.08);

      // Safe zone: o cartão sempre nasce em [0, 0, 0]
      const basePosZ = 0;
      const basePosY = 0;

      const baseRotX = THREE.MathUtils.lerp(Math.PI * 0.5, -0.15, k);
      const baseRotY = THREE.MathUtils.lerp(-Math.PI * 0.3, 0.4, k);
      const baseRotZ = THREE.MathUtils.lerp(0.3, 0, k);

      // Scale punch GRANDE
      const scale = THREE.MathUtils.lerp(0.5, 1, k);
      g.scale.setScalar(scale);

      // IDLE visível (quando motion habilitado e device OK)
      const idleBlend = performanceTier !== "low" ? 1 : 0;
      const floatY = Math.sin(t * 0.5) * 0.25 * idleBlend; // 3x maior (spec)
      const floatZ = Math.cos(t * 0.3) * 0.15 * idleBlend; // Z float (spec)

      const rotX = Math.sin(t * 0.2) * 0.15 * idleBlend; // (spec)
      const rotY = Math.cos(t * 0.25) * 0.2 * idleBlend; // (spec)
      const rotZ = Math.sin(t * 0.15) * 0.08 * idleBlend; // (spec)

      g.position.set(0, basePosY + floatY, basePosZ + floatZ);
      g.rotation.set(
        baseRotX + rotX + tiltRef.current.x,
        baseRotY + rotY + tiltRef.current.y,
        baseRotZ + rotZ
      );

      // Sheen update
      if (sheenMatRef.current) {
        sheenMatRef.current.uniforms.uMouse.value.set(mx, my);
        sweepRef.current = THREE.MathUtils.lerp(sweepRef.current, introT, 0.1);
        sheenMatRef.current.uniforms.uSweep.value = sweepRef.current;
        sheenMatRef.current.uniforms.uTime.value = t;
      }
    }

    // Glow pulsante MUITO visível
    if (glowRef.current && performanceTier !== "low") {
      const pulse = Math.sin(t * 1.5) * 0.5 + 0.5;
      glowRef.current.scale.setScalar(1 + pulse * 0.3);
      const mat = glowRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.12 + pulse * 0.28;
      mat.emissiveIntensity = 0.8 + pulse * 0.8;
    }

    // Breathing light DRAMÁTICO
    if (rimLightRef.current && performanceTier !== "low") {
      const breathing = Math.sin(t * 0.8) * 0.6 + 1.2;
      rimLightRef.current.intensity = 2 * breathing;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Luzes mais dramáticas */}
      <ambientLight intensity={0.5} />
      <hemisphereLight intensity={0.4} groundColor={"#0a1f2e"} />
      <pointLight position={[6, 6, 8]} intensity={2.5} color="#ffffff" />
      <pointLight position={[-5, -3, 6]} intensity={1.2} color="#4facfe" />
      <pointLight ref={rimLightRef} position={[5, 4, -4]} intensity={2} color="#00dbde" />

      {performanceTier !== "low" && <Environment preset="city" />}

      <group ref={cardRef}>
        <CreditCard3D performanceTier={performanceTier} sheenMatRef={sheenMatRef} glowRef={glowRef} />
      </group>

      {/* ContactShadows */}
      {performanceTier !== "low" && (
        <ContactShadows
          position={[0, -1.4, 0]}
          opacity={0.5}
          scale={10}
          blur={3}
          far={4}
          frames={1}
        />
      )}
    </group>
  );
}

function CreditCard3D({
  performanceTier,
  sheenMatRef,
  glowRef,
}: {
  performanceTier: "high" | "medium" | "low";
  sheenMatRef: React.RefObject<THREE.ShaderMaterial | null>;
  glowRef: React.RefObject<THREE.Mesh | null>;
}) {
  // Carregar logo Kodano
  const logoTexture = useTexture("/kodano-logo.png");

  const baseMat = React.useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      metalness: 0.4,
      roughness: 0.2,
      clearcoat: 0.3,
      clearcoatRoughness: 0.25,
      envMapIntensity: 1.2,
      color: new THREE.Color("#1a2332"), // Mais escuro para contraste
    });
  }, []);

  const chipMat = React.useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      metalness: 1,
      roughness: 0.05,
      clearcoat: 0.5,
      clearcoatRoughness: 0.1,
      envMapIntensity: 1.5,
      color: new THREE.Color("#ffd700"), // Ouro verdadeiro
      emissive: new THREE.Color("#ff8c00"),
      emissiveIntensity: 0.3,
    });
  }, []);

  const goldMat = React.useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        metalness: 1,
        roughness: 0.2,
        color: new THREE.Color("#ffd700"),
      }),
    []
  );

  const sheenMaterial = React.useMemo(() => createSheenMaterial(), []);

  React.useEffect(() => {
    if (sheenMatRef.current) return;
    sheenMatRef.current = sheenMaterial;
  }, [sheenMatRef, sheenMaterial]);

  return (
    <group>
      {/* GLOW PULSANTE atrás do cartão */}
      {performanceTier !== "low" && (
        <mesh ref={glowRef} position={[0, 0, -0.4]}>
          <planeGeometry args={[5.5, 3.5]} />
          <meshStandardMaterial
            color="#0a1f2e"
            emissive="#4facfe"
            emissiveIntensity={1.0}
            transparent
            opacity={0.25}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      )}

      {/* Base do cartão */}
      <RoundedBox args={[4.2, 2.6, 0.15]} radius={0.15} smoothness={6}>
        <primitive object={baseMat} attach="material" />
      </RoundedBox>

      {/* Overlay gradiente VIBRANTE */}
      <mesh position={[0, 0, 0.076]}>
        <planeGeometry args={[4.15, 2.55]} />
        <meshPhysicalMaterial
          color="#2a3f5f"
          metalness={0.6}
          roughness={0.15}
          clearcoat={0.4}
          transparent
          opacity={0.9}
          emissive="#4facfe"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Sheen holográfico */}
      <mesh position={[0, 0, 0.08]}>
        <planeGeometry args={[4.15, 2.55]} />
        <primitive object={sheenMaterial} attach="material" />
      </mesh>

      {/* LOGO KODANO (centro-superior) */}
      <mesh position={[0, 0.6, 0.09]}>
        <planeGeometry args={[2, 0.6]} />
        <meshBasicMaterial
          map={logoTexture}
          transparent
          opacity={0.95}
          toneMapped={false}
        />
      </mesh>

      {/* Chip EMV */}
      <group position={[-1.25, -0.1, 0.09]}>
        <RoundedBox args={[0.95, 0.75, 0.08]} radius={0.08} smoothness={4}>
          <primitive object={chipMat} attach="material" />
        </RoundedBox>

        {/* Contactos do chip */}
        {Array.from({ length: 9 }).map((_, i) => {
          const row = Math.floor(i / 3);
          const col = i % 3;
          return (
            <mesh
              key={i}
              position={[-0.28 + col * 0.28, 0.2 - row * 0.2, 0.045]}
              scale={[0.18, 0.12, 0.02]}
            >
              <boxGeometry />
              <primitive object={goldMat} attach="material" />
            </mesh>
          );
        })}
      </group>

      {/* Número do cartão */}
      <group position={[0, -0.5, 0.09]}>
        <Text
          fontSize={0.2}
          color={"#ffffff"}
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.1}
          font="/fonts/Inter-Bold.ttf"
        >
          {"4532  ••••  ••••  9010"}
        </Text>
      </group>

      {/* Info do titular */}
      <Text
        fontSize={0.12}
        color={"#b0c4de"}
        anchorX="left"
        anchorY="middle"
        position={[-1.8, -0.9, 0.09]}
      >
        {"KODANO DEMO"}
      </Text>

      {/* Validade */}
      <Text
        fontSize={0.12}
        color={"#b0c4de"}
        anchorX="right"
        anchorY="middle"
        position={[1.8, -0.9, 0.09]}
      >
        {"12/28"}
      </Text>

      {/* Badges Kodano (canto inferior direito) */}
      <group position={[1.6, 0.3, 0.09]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.08, 32]} />
          <meshStandardMaterial
            emissive="#4facfe"
            emissiveIntensity={0.8}
            color="#0a1f2e"
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
        <mesh position={[0.35, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.08, 32]} />
          <meshStandardMaterial
            emissive="#00dbde"
            emissiveIntensity={0.8}
            color="#0a1f2e"
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
      </group>

      {/* Ícone contactless */}
      <group position={[1.5, -0.1, 0.09]}>
        {[0, 1, 2, 3].map((i) => (
          <mesh
            key={i}
            position={[i * 0.09, 0, 0]}
            rotation={[0, 0, -Math.PI / 8]}
          >
            <cylinderGeometry args={[0.035, 0.035, 0.18 + i * 0.09, 12]} />
            <meshPhysicalMaterial
              color="#ffffff"
              transparent
              opacity={0.85}
              emissive="#4facfe"
              emissiveIntensity={0.4}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function createSheenMaterial() {
  const uniforms = {
    uMouse: { value: new THREE.Vector2(0, 0) },
    uSweep: { value: 0 },
    uTime: { value: 0 },
  };

  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms,
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vWorldNormal;
      varying vec3 vWorldPos;

      void main() {
        vUv = uv;
        vWorldNormal = normalize(mat3(modelMatrix) * normal);
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPos = worldPos.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      varying vec3 vWorldNormal;
      varying vec3 vWorldPos;

      uniform vec2 uMouse;
      uniform float uSweep;
      uniform float uTime;

      float saturate(float x){ return clamp(x, 0.0, 1.0); }

      void main() {
        vec3 viewDir = normalize(cameraPosition - vWorldPos);
        float ndv = abs(dot(normalize(vWorldNormal), viewDir));
        float fresnel = pow(1.0 - ndv, 2.2);

        vec2 m = vec2(0.5 + uMouse.x * 0.25, 0.5 + uMouse.y * 0.2);
        float dist = distance(vUv, m);
        float grad = smoothstep(0.6, 0.0, dist);

        float sweep = smoothstep(vUv.x - 0.2, vUv.x + 0.2, uSweep);

        // Shimmer animado
        float shimmer = sin((vUv.x * 15.0 + uTime * 1.2)) * sin((vUv.y * 10.0 - uTime * 0.8)) * 0.15;

        float a = 0.0;
        a += fresnel * 0.3;
        a += grad * 0.25;
        a += sweep * 0.5;
        a += shimmer;

        a = saturate(a);
        a = pow(a, 1.1);
        // Shader safety: nunca deixar alpha global zerar
        a = clamp(a, 0.15, 0.85);

        vec3 color = mix(vec3(0.29, 0.68, 1.0), vec3(0.0, 0.86, 0.87), fresnel);

        gl_FragColor = vec4(color, a);
      }
    `,
  });

  return mat;
}
