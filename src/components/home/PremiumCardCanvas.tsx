"use client";

import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, Text, Environment, ContactShadows } from "@react-three/drei";

type PerformanceTier = "high" | "medium" | "low";

export default function PremiumCardCanvas({
  performanceTier,
  enableMotion,
}: {
  performanceTier: PerformanceTier;
  enableMotion: boolean;
}) {
  // Canvas em "demand" por padrão: só renderiza quando invalidate() é chamado.
  // A lógica de invalidação fica dentro da Scene.
  return (
    <Canvas
      dpr={performanceTier === "high" ? [1, 2] : performanceTier === "medium" ? [1, 1.5] : [1, 1.25]}
      gl={{
        antialias: performanceTier !== "low",
        powerPreference: "high-performance",
        alpha: true,
      }}
      camera={{ fov: 35, position: [0, 0, 10] }}
      frameloop="demand"
      // Importante: não bloquear scroll/click do layout
      style={{ width: "100%", height: "100%", pointerEvents: "none" }}
    >
      <Scene performanceTier={performanceTier} enableMotion={enableMotion} />
    </Canvas>
  );
}

function Scene({
  performanceTier,
  enableMotion,
}: {
  performanceTier: PerformanceTier;
  enableMotion: boolean;
}) {
  const groupRef = React.useRef<THREE.Group>(null);
  const cardRef = React.useRef<THREE.Group>(null);
  const sheenMatRef = React.useRef<THREE.ShaderMaterial | null>(null);

  const { invalidate, camera } = useThree();

  // Mouse via ref (sem re-render)
  const mouseRef = React.useRef({ x: 0, y: 0 });

  // Controle de "janela de animação" para não gastar GPU para sempre
  // - Intro: ~1.4s
  // - Idle: roda por mais alguns segundos após interação, depois dorme.
  const t0Ref = React.useRef<number | null>(null);
  const animUntilRef = React.useRef<number>(0);

  // Sweep do intro
  const sweepRef = React.useRef(0);

  // Helpers
  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3.5);

  // Captura mouse global apenas em desktop (o componente pai já só renderiza no lg+)
  React.useEffect(() => {
    if (!enableMotion) return;

    const onMove = (e: MouseEvent) => {
      // Normaliza para [-1, 1]
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -((e.clientY / window.innerHeight) * 2 - 1);
      mouseRef.current = { x, y };

      // Acorda animação por alguns segundos após movimento
      animUntilRef.current = performance.now() + 2500;
      invalidate();
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [enableMotion, invalidate]);

  // Dispara intro ao montar
  React.useEffect(() => {
    // Sempre renderiza 1 frame inicial para mostrar a cena estática
    invalidate();

    // Intro somente se motion habilitado
    if (enableMotion) {
      t0Ref.current = performance.now();
      animUntilRef.current = performance.now() + 1800; // intro + settle
      sweepRef.current = 0;
      invalidate();
    } else {
      // Pose estática premium
      if (cardRef.current) {
        cardRef.current.rotation.set(-0.12, 0.38, 0);
        cardRef.current.position.set(0, 0, 0);
      }
      camera.position.z = 10;
      invalidate();
    }
  }, [enableMotion, invalidate, camera]);

  useFrame((state) => {
    const now = performance.now();

    // Se motion desligado: cena estática (1 frame quando necessário)
    if (!enableMotion) return;

    // Se "janela de animação" acabou: dorme (não chama invalidate -> não renderiza mais frames)
    if (now > animUntilRef.current) return;

    const t = state.clock.getElapsedTime();

    // Intro (baseado no tempo desde mount)
    const t0 = t0Ref.current ?? now;
    const introT = THREE.MathUtils.clamp((now - t0) / 1400, 0, 1);
    const k = easeOut(introT);

    // Dolly camera (micro)
    camera.position.z = THREE.MathUtils.lerp(12, 10, k);

    // Card transform (Z + scale + settle)
    if (cardRef.current) {
      const g = cardRef.current;

      // Entrada em profundidade e escala
      g.position.z = THREE.MathUtils.lerp(-6, 0, k);
      const s = THREE.MathUtils.lerp(0.82, 1.0, k);
      g.scale.setScalar(s);

      // Pose hero
      g.rotation.x = THREE.MathUtils.lerp(-0.08, -0.12, k);
      g.rotation.y = THREE.MathUtils.lerp(0.1, 0.38, k);
      g.rotation.z = THREE.MathUtils.lerp(0.02, 0.0, k);

      // Idle suave (após intro avançar um pouco)
      if (introT > 0.7 && performanceTier !== "low") {
        const floatY = Math.sin(t * 0.4) * 0.06;
        const rotW = Math.sin(t * 0.35) * 0.03;

        g.position.y = floatY;
        g.rotation.y += rotW * 0.15;
      }

      // Tilt por mouse (clamp "não toy-like")
      const mx = THREE.MathUtils.clamp(mouseRef.current.x, -1, 1);
      const my = THREE.MathUtils.clamp(mouseRef.current.y, -1, 1);

      const targetX = my * 0.08; // ~4.5°
      const targetY = mx * 0.08;

      // Lerp suave
      g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -0.12 + targetX, 0.06);
      g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, 0.38 + targetY, 0.06);

      // Atualiza uniforms do sheen
      if (sheenMatRef.current) {
        sheenMatRef.current.uniforms.uMouse.value.set(mx, my);
        // sweep do intro (só durante intro, depois estabiliza)
        sweepRef.current = THREE.MathUtils.lerp(sweepRef.current, introT, 0.08);
        sheenMatRef.current.uniforms.uSweep.value = sweepRef.current;
        sheenMatRef.current.uniforms.uTime.value = t;
      }
    }

    // Renderiza apenas enquanto necessário
    invalidate();
  });

  return (
    <group ref={groupRef}>
      {/* Luzes cinematográficas */}
      <ambientLight intensity={0.45} />
      <hemisphereLight intensity={0.35} groundColor={"#071A1F"} />
      <pointLight position={[5, 5, 8]} intensity={2.2} />
      <pointLight position={[-4, -2, 5]} intensity={0.9} />
      <pointLight position={[4, 3, -3]} intensity={performanceTier === "low" ? 1.1 : 1.6} />

      {/* Environment leve (dá reflexo premium) */}
      {performanceTier !== "low" && <Environment preset="city" />}

      <group ref={cardRef}>
        <CreditCard3D performanceTier={performanceTier} sheenMatRef={sheenMatRef} />
      </group>

      {/* ContactShadows leve: frames=1 (não acumula) */}
      {performanceTier !== "low" && (
        <ContactShadows
          position={[0, -1.4, 0]}
          opacity={0.35}
          scale={8}
          blur={2.5}
          far={3}
          frames={1}
        />
      )}
    </group>
  );
}

function CreditCard3D({
  performanceTier,
  sheenMatRef,
}: {
  performanceTier: "high" | "medium" | "low";
  sheenMatRef: React.RefObject<THREE.ShaderMaterial | null>;
}) {
  // Base do cartão
  const baseMat = React.useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      metalness: 0.35,
      roughness: 0.25,
      clearcoat: 0.2,
      clearcoatRoughness: 0.3,
      envMapIntensity: performanceTier === "low" ? 0.6 : 0.9,
      color: new THREE.Color("#0B2A35"),
    });
  }, [performanceTier]);

  const chipMat = React.useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      metalness: 0.95,
      roughness: 0.08,
      clearcoat: 0.4,
      clearcoatRoughness: 0.2,
      envMapIntensity: performanceTier === "low" ? 0.7 : 1.0,
      color: new THREE.Color("#F5A05A"),
      emissive: new THREE.Color("#1A0F06"),
      emissiveIntensity: 0.2,
    });
  }, [performanceTier]);

  const goldMat = React.useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        metalness: 0.85,
        roughness: 0.25,
        color: new THREE.Color("#D4AF37"),
      }),
    []
  );

  const sheenMaterial = React.useMemo(() => createSheenMaterial(), []);

  // Conecta ref
  React.useEffect(() => {
    if (sheenMatRef.current) return;
    sheenMatRef.current = sheenMaterial;
  }, [sheenMatRef, sheenMaterial]);

  return (
    <group>
      {/* Base */}
      <RoundedBox args={[4.2, 2.6, 0.15]} radius={0.12} smoothness={4}>
        <primitive object={baseMat} attach="material" />
      </RoundedBox>

      {/* Sheen / holographic pass (shader) */}
      <mesh position={[0, 0, 0.081]}>
        <planeGeometry args={[4.15, 2.55]} />
        <primitive object={sheenMaterial} attach="material" />
      </mesh>

      {/* Chip */}
      <group position={[-1.25, 0.35, 0.09]}>
        <RoundedBox args={[0.95, 0.75, 0.06]} radius={0.08} smoothness={4}>
          <primitive object={chipMat} attach="material" />
        </RoundedBox>

        {/* Contatos (9) */}
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

      {/* Texto real (drei/Text) */}
      <group position={[0, -0.35, 0.09]}>
        <Text
          fontSize={0.18}
          color={"#D8F6FB"}
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.08}
        >
          {"4532  ••••  ••••  9010"}
        </Text>
        <Text fontSize={0.11} color={"#A7E6EE"} anchorX="left" anchorY="middle" position={[-2.0, -0.45, 0]}>
          {"KODANO DEMO"}
        </Text>
        <Text fontSize={0.11} color={"#A7E6EE"} anchorX="right" anchorY="middle" position={[2.0, -0.45, 0]}>
          {"12/28"}
        </Text>
      </group>

      {/* Badges "Kodano" (simples e premium) */}
      <group position={[1.55, 0.95, 0.09]}>
        <mesh>
          <cylinderGeometry args={[0.18, 0.18, 0.06, 24]} />
          <meshStandardMaterial emissive={"#00C8DC"} emissiveIntensity={0.6} color={"#0B2A35"} />
        </mesh>
        <mesh position={[0.32, 0, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.06, 24]} />
          <meshStandardMaterial emissive={"#7CF3FF"} emissiveIntensity={0.45} color={"#0B2A35"} />
        </mesh>
      </group>
    </group>
  );
}

/**
 * Sheen shader (sem washout/banding):
 * - Fresnel controlado
 * - gradient por mouse
 * - sweep por intro
 * - clamp + curva para alpha suave
 */
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
        // View dir em world space
        vec3 viewDir = normalize(cameraPosition - vWorldPos);

        // Fresnel (controlado)
        float ndv = abs(dot(normalize(vWorldNormal), viewDir));
        float fresnel = pow(1.0 - ndv, 2.4); // curva mais suave

        // Gradient por mouse (UV)
        vec2 m = vec2(0.5 + uMouse.x * 0.22, 0.5 + uMouse.y * 0.18);
        float dist = distance(vUv, m);
        float grad = smoothstep(0.55, 0.0, dist);

        // Sweep do intro (varre no eixo x)
        float sweep = smoothstep(vUv.x - 0.18, vUv.x + 0.18, uSweep);

        // Combinações (evitar washout)
        float a = 0.0;
        a += fresnel * 0.22;
        a += grad * 0.18;
        a += sweep * 0.35;

        // Micro shimmer sutil (não carnaval)
        float shimmer = sin((vUv.x * 12.0 + uTime * 0.8)) * 0.03;
        a += shimmer;

        // Clamp + curva para evitar banding/estouro
        a = saturate(a);
        a = pow(a, 1.15); // suaviza transição

        // Cor do sheen (branco levemente frio)
        vec3 color = vec3(0.92, 0.98, 1.0);

        gl_FragColor = vec4(color, a);
      }
    `,
  });

  return mat;
}
