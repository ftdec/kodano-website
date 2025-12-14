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
}: {
  performanceTier: PerformanceTier;
  enableMotion: boolean;
  inView: boolean;
  debug?: boolean;
}) {
  const dpr: [number, number] =
    performanceTier === "high" ? [1, 2] : [1, 1.5];

  return (
    <Canvas
      dpr={dpr}
      gl={{
        antialias: performanceTier !== "low",
        powerPreference: "high-performance",
        alpha: true,
      }}
      camera={{ fov: 35, position: [0, 0, 8] }}
      frameloop={inView ? "always" : "demand"}
      style={{ width: "100%", height: "100%", pointerEvents: "none" }}
    >
      <Scene performanceTier={performanceTier} enableMotion={enableMotion} inView={inView} debug={debug} />
    </Canvas>
  );
}

function Scene({
  performanceTier,
  enableMotion,
  inView,
  debug,
}: {
  performanceTier: PerformanceTier;
  enableMotion: boolean;
  inView: boolean;
  debug: boolean;
}) {
  const groupRef = React.useRef<THREE.Group>(null);
  const cardRef = React.useRef<THREE.Group>(null);
  const chipLayerRef = React.useRef<THREE.Group>(null);
  const textLayerRef = React.useRef<THREE.Group>(null);
  const logoLayerRef = React.useRef<THREE.Group>(null);
  const sheenMatRef = React.useRef<THREE.ShaderMaterial | null>(null);
  const rimLightRef = React.useRef<THREE.PointLight>(null);
  const glowRef = React.useRef<THREE.Mesh>(null);
  const cameraRef = React.useRef<THREE.PerspectiveCamera | null>(null);

  const { invalidate, camera, gl } = useThree();

  const mouseRef = React.useRef({ x: 0, y: 0 });
  const tiltRef = React.useRef({ x: 0, y: 0 });
  const sweepRef = React.useRef(0);
  const t0Ref = React.useRef<number | null>(null);

  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

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

  // Mouse tracking (relativo ao container/canvas, sem depender de pointer events)
  React.useEffect(() => {
    if (!enableMotion) return;

    const onMove = (e: MouseEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current = { x, y };
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [enableMotion, gl.domElement]);

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

    // INTRO cinematográfico (0–1.2s)
    const t0 = t0Ref.current ?? now;
    const introT = THREE.MathUtils.clamp((now - t0) / 1200, 0, 1);
    const k = easeOutCubic(introT);

    // Dolly sutil (filmic)
    if (cameraRef.current) cameraRef.current.position.z = THREE.MathUtils.lerp(10.5, 8.8, k);

    if (cardRef.current) {
      const g = cardRef.current;

      // Mouse tilt AMPLIFICADO (suavizado, mas sem “matar” o idle)
      const mx = THREE.MathUtils.clamp(mouseRef.current.x, -1, 1);
      const my = THREE.MathUtils.clamp(mouseRef.current.y, -1, 1);

      // Mouse tilt <= ±6° (≈0.105rad)
      const targetX = my * 0.105;
      const targetY = mx * 0.105;

      tiltRef.current.x = THREE.MathUtils.lerp(tiltRef.current.x, targetX, 0.08);
      tiltRef.current.y = THREE.MathUtils.lerp(tiltRef.current.y, targetY, 0.08);

      // Intro: z-in + rotate + scale → pose 3/4
      const basePosZ = THREE.MathUtils.lerp(-2.0, 0.0, k);
      const baseRotX = THREE.MathUtils.lerp(0.28, -0.15, k);
      const baseRotY = THREE.MathUtils.lerp(0.75, 0.38, k);
      const baseRotZ = THREE.MathUtils.lerp(0.08, 0.0, k);

      const scale = THREE.MathUtils.lerp(0.92, 1.0, k);
      g.scale.setScalar(scale);

      // Idle sutil (premium)
      const idleBlend = performanceTier !== "low" ? 1 : 0;
      const floatY = Math.sin(t * 0.5) * 0.06 * idleBlend;
      const floatZ = Math.cos(t * 0.35) * 0.02 * idleBlend;
      const microRot = Math.sin(t * 0.35) * 0.015 * idleBlend;

      g.position.set(0, floatY, basePosZ + floatZ);
      g.rotation.set(
        baseRotX + microRot + tiltRef.current.x,
        baseRotY + microRot * 0.35 + tiltRef.current.y,
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
      const breathing = Math.sin(t * 0.7) * 0.25 + 1.0;
      rimLightRef.current.intensity = 2.0 * breathing;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Lighting cinematográfica (3-point + rim) */}
      <ambientLight intensity={0.35} />
      <hemisphereLight intensity={0.25} groundColor={"#07141d"} />
      <pointLight position={[5, 4, 8]} intensity={2.4} color="#ffffff" />
      <pointLight position={[-6, -2, 6]} intensity={0.9} color="#cfe9ff" />
      <pointLight ref={rimLightRef} position={[4, 3, -4]} intensity={2.0} color="#4facfe" />

      {/* Background volume sutil */}
      <mesh position={[0, 0, -3.2]}>
        <planeGeometry args={[14, 10]} />
        <meshStandardMaterial
          color="#050b12"
          emissive="#0b1b2a"
          emissiveIntensity={0.9}
          transparent
          opacity={0.55}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Sanity mesh (debug): confirma pipeline/câmera */}
      {debug && (
        <mesh position={[0, 0, -1.2]}>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshStandardMaterial color="hotpink" />
        </mesh>
      )}

      <group ref={cardRef}>
        <CreditCard3D
          performanceTier={performanceTier}
          sheenMatRef={sheenMatRef}
          glowRef={glowRef}
          chipLayerRef={chipLayerRef}
          textLayerRef={textLayerRef}
          logoLayerRef={logoLayerRef}
        />
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
  chipLayerRef,
  textLayerRef,
  logoLayerRef,
}: {
  performanceTier: "high" | "medium" | "low";
  sheenMatRef: React.RefObject<THREE.ShaderMaterial | null>;
  glowRef: React.RefObject<THREE.Mesh | null>;
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
      roughness: 0.22,
      clearcoat: 0.55,
      clearcoatRoughness: 0.15,
      envMapIntensity: 1.1,
      color: new THREE.Color("#10161f"),
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
            <meshBasicMaterial map={logoTexture} transparent opacity={0.92} toneMapped={false} />
          </mesh>
        )}

        {!logoTexture && (
          <Text
            fontSize={0.32}
            color={"#D8F6FB"}
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
