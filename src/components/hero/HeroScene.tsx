"use client";
import { Canvas } from "@react-three/fiber";
import { Float, Sphere, Line } from "@react-three/drei";

/**
 * PRD v2.0 - Payment Flow Network
 * Representa o fluxo de pagamentos da Kodano: Cliente → Gateway → Tokenização → Antifraude → Autorização → Liquidação
 */
export default function HeroScene() {
  // PRD: 4 nós representando as etapas do fluxo de pagamento
  const nodes: [number, number, number][] = [
    [-2.5, 0, 0],  // Cliente → Gateway
    [-1, 1, 0],     // Tokenização
    [0.5, 0.5, 0],  // Antifraude
    [2, 0, 0],      // Autorização → Liquidação
  ];

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 45 }}>
        {/* PRD: ambientLight 0.6, directionalLight 0.4 */}
        <ambientLight intensity={0.6} />
        <directionalLight intensity={0.4} position={[2, 2, 4]} />

        {/* PRD: Float e rotação leve, loop autônomo */}
        <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
          {/* PRD: Esferas translúcidas representando as etapas do fluxo */}
          {nodes.map((pos, i) => (
            <Sphere key={i} args={[0.08, 16, 16]} position={pos}>
              <meshStandardMaterial
                color="#00C8DC"
                emissive="#00C8DC"
                emissiveIntensity={0.6}
                transparent
                opacity={0.12}
              />
            </Sphere>
          ))}

          {/* PRD: Linhas conectando os nós do fluxo */}
          <Line points={nodes} color="#00C8DC" lineWidth={1.2} />
        </Float>
      </Canvas>

      {/* PRD: Overlay gradiente translúcido from-white/70 via-white/45 to-transparent */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/70 via-white/45 to-transparent dark:from-[#000000]/70 dark:via-[#000000]/55 dark:to-transparent" />
    </div>
  );
}
