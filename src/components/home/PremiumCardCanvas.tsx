"use client";

import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, Text, ContactShadows } from "@react-three/drei";

type PerformanceTier = "high" | "medium" | "low";

export default function PremiumCardCanvas({
  performanceTier,
  enableMotion,
  inView,
  debug = false,
  onReady,
}: {
  performanceTier: PerformanceTier;
  enableMotion: boolean;
  inView: boolean;
  debug?: boolean;
  onReady?: () => void;
}) {
  const dpr: [number, number] =
    performanceTier === "high" ? [1, 2] : [1, 1.5];

  const readyOnceRef = React.useRef(false);
  const activeUntilRef = React.useRef<number>(0);

  return (
    <Canvas
      dpr={dpr}
      gl={{
        antialias: performanceTier !== "low",
        powerPreference: "high-performance",
        alpha: true,
      }}
      camera={{ fov: 35, position: [0, 0, 8] }}
      frameloop="demand"
      onPointerMove={() => {
        // acorda por 1.8s após movimento
        const now = performance.now();
        activeUntilRef.current = Math.max(activeUntilRef.current, now + 1800);
      }}
      style={{ width: "100%", height: "100%", pointerEvents: "none" }}
      onCreated={() => {
        if (readyOnceRef.current) return;
        // marca "pronto" após o primeiro frame útil
        requestAnimationFrame(() => {
          if (readyOnceRef.current) return;
          readyOnceRef.current = true;
          onReady?.();
        });
      }}
    >
      <color attach="background" args={["#ffffff"]} />
      <Scene
        performanceTier={performanceTier}
        enableMotion={enableMotion}
        inView={inView}
        debug={debug}
        activeUntilRef={activeUntilRef}
      />
    </Canvas>
  );
}

function Scene({
  performanceTier,
  enableMotion,
  inView,
  debug,
  activeUntilRef,
}: {
  performanceTier: PerformanceTier;
  enableMotion: boolean;
  inView: boolean;
  debug: boolean;
  activeUntilRef: React.RefObject<number>;
}) {
  const groupRef = React.useRef<THREE.Group>(null);
  const cardRef = React.useRef<THREE.Group>(null);
  const chipLayerRef = React.useRef<THREE.Group>(null);
  const textLayerRef = React.useRef<THREE.Group>(null);
  const logoLayerRef = React.useRef<THREE.Group>(null);
  const sheenMatRef = React.useRef<THREE.ShaderMaterial | null>(null);
  const rimLightRef = React.useRef<THREE.PointLight>(null);
  const cameraRef = React.useRef<THREE.PerspectiveCamera | null>(null);

  const { invalidate, camera, gl } = useThree();

  const mouseRef = React.useRef({ x: 0, y: 0 });
  const tiltRef = React.useRef({ x: 0, y: 0 });
  const sweepRef = React.useRef(0);

  React.useEffect(() => {
    cameraRef.current = camera as THREE.PerspectiveCamera;
    cameraRef.current.position.set(0, 0, 7.8);
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

  // Mouse tracking (relativo ao container/canvas, sem depender de pointer events)
  React.useEffect(() => {
    if (!enableMotion) return;

    const onMove = (e: MouseEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current = { x, y };
      const now = performance.now();
      activeUntilRef.current = Math.max(activeUntilRef.current ?? 0, now + 1800);
      invalidate();
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [enableMotion, gl.domElement, invalidate, activeUntilRef]);

  // Setup pose base (sem intro)
  React.useEffect(() => {
    invalidate();
    const now = performance.now();
    activeUntilRef.current = Math.max(activeUntilRef.current ?? 0, now + 1600); // janela inicial de animação

    if (cardRef.current) {
      cardRef.current.rotation.set(-0.21, 0.314, 0); // -12°, 18°
      cardRef.current.position.set(0, 0, 0);
      cardRef.current.scale.setScalar(1.22);
    }
    if (cameraRef.current) cameraRef.current.position.z = 7.8;
    sweepRef.current = 0.6;
    invalidate();
  }, [invalidate, activeUntilRef]);

  useFrame((state) => {
    if (!inView) return;
    if (!enableMotion) return;

    // frameloop="demand": só invalida enquanto ativo
    const now = performance.now();
    if (activeUntilRef.current && now <= activeUntilRef.current) {
      invalidate();
    }

    const t = state.clock.elapsedTime;

    if (cardRef.current) {
      const g = cardRef.current;

      // Mouse tilt sutil
      const mx = THREE.MathUtils.clamp(mouseRef.current.x, -1, 1);
      const my = THREE.MathUtils.clamp(mouseRef.current.y, -1, 1);

      // Tilt máximo ~3° (≈0.052rad)
      const targetX = my * 0.052;
      const targetY = mx * 0.052;

      tiltRef.current.x = THREE.MathUtils.lerp(tiltRef.current.x, targetX, 0.04);
      tiltRef.current.y = THREE.MathUtils.lerp(tiltRef.current.y, targetY, 0.04);

      // Pose hero persistente (sem entrada)
      const basePosZ = 0;
      const baseRotX = -0.21; // ~-12°
      const baseRotY = 0.314; // ~18°
      const baseRotZ = 0.0;
      g.scale.setScalar(1.22);

      // Idle sutil (premium)
      const idleBlend = performanceTier !== "low" ? 1 : 0;
      const floatY = Math.sin(t * (Math.PI * 0.5)) * 0.04 * idleBlend; // ~0.25 Hz
      const floatZ = Math.cos(t * (Math.PI * 0.5)) * 0.01 * idleBlend;
      const microRot = Math.sin(t * (Math.PI * 0.5)) * 0.035 * idleBlend; // ~2°

      g.position.set(0, floatY, basePosZ + floatZ);
      g.rotation.set(
        baseRotX + microRot + tiltRef.current.x,
        baseRotY + microRot * 0.25 + tiltRef.current.y,
        baseRotZ
      );

      // Parallax por layers (extras sobre o tilt base)
      const tx = tiltRef.current.x;
      const ty = tiltRef.current.y;
      if (chipLayerRef.current) {
        chipLayerRef.current.rotation.x = tx * 0.1;
        chipLayerRef.current.rotation.y = ty * 0.1;
      }
      if (textLayerRef.current) {
        textLayerRef.current.rotation.x = tx * 0.15;
        textLayerRef.current.rotation.y = ty * 0.15;
      }
      if (logoLayerRef.current) {
        logoLayerRef.current.rotation.x = tx * 0.12;
        logoLayerRef.current.rotation.y = ty * 0.12;
      }

      // Sheen update
      if (sheenMatRef.current) {
        sheenMatRef.current.uniforms.uMouse.value.set(mx, my);
        // Sheen sutil, sempre ligado (sem entrada/sweep chamativo)
        sweepRef.current = THREE.MathUtils.lerp(sweepRef.current, 0.6, 0.02);
        sheenMatRef.current.uniforms.uSweep.value = sweepRef.current;
        sheenMatRef.current.uniforms.uTime.value = t;
      }
    }

    // Breathing light (bem sutil)
    if (rimLightRef.current && performanceTier !== "low") {
      const breathing = Math.sin(t * 0.25) * 0.25 + 1.0;
      rimLightRef.current.intensity = 1.4 * breathing;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Lighting clean (hero branco) */}
      <ambientLight intensity={0.6} />
      <hemisphereLight intensity={0.2} groundColor={"#f8fcff"} />
      <pointLight position={[5, 4, 8]} intensity={1.4} color="#ffffff" />
      <pointLight position={[-5, -2, 6]} intensity={1.0} color="#eaf7ff" />
      <pointLight ref={rimLightRef} position={[4, 3, -4]} intensity={1.2} color="#4FACFE" />

      {/* Sanity mesh (debug): confirma pipeline/câmera */}
      {debug && (
        <mesh position={[0, 0, -1.2]}>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshStandardMaterial color="hotpink" />
        </mesh>
      )}

      <group ref={cardRef}>
        <CreditCard3D
          sheenMatRef={sheenMatRef}
          chipLayerRef={chipLayerRef}
          textLayerRef={textLayerRef}
          logoLayerRef={logoLayerRef}
        />
      </group>

      {/* ContactShadows */}
      {performanceTier !== "low" && (
        <ContactShadows
          position={[0, -1.4, 0]}
          opacity={0.25}
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
  sheenMatRef,
  chipLayerRef,
  textLayerRef,
  logoLayerRef,
}: {
  sheenMatRef: React.RefObject<THREE.ShaderMaterial | null>;
  chipLayerRef: React.RefObject<THREE.Group | null>;
  textLayerRef: React.RefObject<THREE.Group | null>;
  logoLayerRef: React.RefObject<THREE.Group | null>;
}) {
  // Carregar logo Kodano (com fallback se falhar)
  const [logoTexture, setLogoTexture] = React.useState<THREE.Texture | null>(null);

  React.useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      "/kodano-logo.png",
      (texture) => setLogoTexture(texture),
      undefined,
      (error) => {
        console.warn("Failed to load Kodano logo:", error);
        setLogoTexture(null);
      }
    );
  }, []);

  const baseMat = React.useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      metalness: 0.25,
      roughness: 0.38,
      clearcoat: 0.28,
      clearcoatRoughness: 0.35,
      envMapIntensity: 0.8,
      color: new THREE.Color("#003F4D"),
    });
  }, []);

  const chipMat = React.useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      metalness: 0.95,
      roughness: 0.08,
      clearcoat: 0.35,
      clearcoatRoughness: 0.18,
      envMapIntensity: 1.2,
      color: new THREE.Color("#d6b15a"),
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
      {/* Base do cartão */}
      <RoundedBox args={[4.2, 2.6, 0.16]} radius={0.22} smoothness={12}>
        <primitive object={baseMat} attach="material" />
      </RoundedBox>

      {/* Top coat / sheen view-dependent (rounded, não "overlay chapado") */}
      <group position={[0, 0, 0.085]}>
        <RoundedBox args={[4.16, 2.56, 0.002]} radius={0.22} smoothness={10}>
          <primitive object={sheenMaterial} attach="material" />
        </RoundedBox>
      </group>

      {/* LOGO LAYER (parallax leve) */}
      <group ref={logoLayerRef} position={[0, 0, 0.01]}>
        {logoTexture && (
          <mesh position={[0, 0.62, 0.085]}>
            <planeGeometry args={[1.8, 0.52]} />
            <meshStandardMaterial
              map={logoTexture}
              transparent
              opacity={0.9}
              color="#00C8DC"
              metalness={0}
              roughness={0.9}
              emissive="#000000"
              emissiveIntensity={0}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        )}

        {!logoTexture && (
          <Text
            fontSize={0.32}
            color={"#00C8DC"}
            fillOpacity={0.9}
            anchorX="center"
            anchorY="middle"
            position={[0, 0.62, 0.085]}
            font="/fonts/Inter-SemiBold.ttf"
          >
            {"KODANO"}
          </Text>
        )}
      </group>

      {/* Chip EMV */}
      <group ref={chipLayerRef} position={[0, 0, 0.02]}>
        <group position={[-1.25, -0.1, 0.085]}>
          <RoundedBox args={[0.95, 0.75, 0.09]} radius={0.09} smoothness={8}>
            <primitive object={chipMat} attach="material" />
          </RoundedBox>

          {/* Contactos do chip (micro relevo) */}
          {Array.from({ length: 9 }).map((_, i) => {
            const row = Math.floor(i / 3);
            const col = i % 3;
            return (
              <mesh
                key={i}
                position={[-0.28 + col * 0.28, 0.2 - row * 0.2, 0.06]}
                scale={[0.18, 0.12, 0.02]}
              >
                <boxGeometry />
                <primitive object={goldMat} attach="material" />
              </mesh>
            );
          })}
        </group>
      </group>

      {/* Número do cartão */}
      <group ref={textLayerRef} position={[0, 0, 0.01]}>
        <group position={[0, -0.48, 0.085]}>
          <Text
            fontSize={0.19}
            color={"#D8F6FB"}
            fillOpacity={0.86}
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.095}
            font="/fonts/Inter-SemiBold.ttf"
          >
            {"4532  ••••  ••••  9010"}
          </Text>
        </group>

        <Text
          fontSize={0.12}
          color={"#D8F6FB"}
          fillOpacity={0.72}
          anchorX="left"
          anchorY="middle"
          position={[-1.8, -0.9, 0.085]}
          font="/fonts/Inter-SemiBold.ttf"
        >
          {"KODANO DEMO"}
        </Text>

        <Text
          fontSize={0.12}
          color={"#D8F6FB"}
          fillOpacity={0.72}
          anchorX="right"
          anchorY="middle"
          position={[1.8, -0.9, 0.085]}
          font="/fonts/Inter-SemiBold.ttf"
        >
          {"12/28"}
        </Text>
      </group>

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
        // Sheen premium: view-dependent, sem "washout" (alpha máx ~0.25)
        a *= 0.55;
        a = smoothstep(0.02, 0.9, a);
        a = clamp(a, 0.0, 0.25);

        vec3 color = mix(vec3(0.29, 0.68, 1.0), vec3(0.0, 0.86, 0.87), fresnel);

        gl_FragColor = vec4(color, a);
      }
    `,
  });

  return mat;
}
