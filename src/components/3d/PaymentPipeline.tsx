"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Html } from "@react-three/drei";
import * as THREE from "three";

// PRD 5.1: Tipos de pagamento que fluem pelo pipeline
type PaymentMethod = "card" | "pix" | "boleto";
type PaymentStatus = "pending" | "approved" | "review" | "denied";

// PRD 5.1: 5 etapas do pipeline de pagamentos
const PIPELINE_STAGES = [
  { id: "pedido", label: "Pedido", position: [-6, 0, 0] as [number, number, number] },
  { id: "tokenizacao", label: "Tokenização", position: [-3, 0, 0] as [number, number, number] },
  { id: "antifraude", label: "Antifraude", position: [0, 0, 0] as [number, number, number] },
  { id: "autorizacao", label: "Autorização", position: [3, 0, 0] as [number, number, number] },
  { id: "liquidacao", label: "Liquidação", position: [6, 0, 0] as [number, number, number] },
];

// Ícones simples usando geometrias
function PaymentIcon({
  method,
  position
}: {
  method: PaymentMethod;
  position: [number, number, number]
}) {
  // Cores por método de pagamento - Baseado no novo logo
  const colors = {
    card: "#00C8DC",      // Ciano principal do logo
    pix: "#00D4E8",       // Ciano vibrante do logo
    boleto: "#FF6B35",
  };

  return (
    <mesh position={position}>
      <boxGeometry args={[0.3, 0.2, 0.05]} />
      <meshStandardMaterial
        color={colors[method]}
        transparent
        opacity={0.9}
        emissive={colors[method]}
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

// PRD 5.1: Nódulo (card) representando cada etapa do pipeline
function PipelineNode({
  position,
  label,
  status = "pending",
  isHovered,
  onHover
}: {
  position: [number, number, number];
  label: string;
  status?: PaymentStatus;
  isHovered: boolean;
  onHover: (hover: boolean) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  // PRD 5.1: Cores por estado
  const statusColors = {
    pending: "#E6E8EB",
    approved: "#00A6B4", // Ciano
    review: "#F59E0B",   // Amarelo
    denied: "#EF4444",   // Vermelho
  };

  const color = statusColors[status];

  useFrame((state) => {
    if (!meshRef.current) return;

    // Pulsar suave para status "review"
    if (status === "review") {
      const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.5 + 0.5;
      meshRef.current.scale.setScalar(0.9 + pulse * 0.1);
    } else {
      meshRef.current.scale.setScalar(isHovered ? 1.1 : 1);
    }
  });

  return (
    <group>
      <RoundedBox
        ref={meshRef}
        args={[1.2, 0.8, 0.1]}
        position={position}
        radius={0.1}
        smoothness={4}
        onPointerEnter={() => onHover(true)}
        onPointerLeave={() => onHover(false)}
      >
        <meshStandardMaterial
          color={color}
          transparent
          opacity={status === "pending" ? 0.1 : 0.15}
          emissive={color}
          emissiveIntensity={status === "pending" ? 0 : 0.4}
        />
      </RoundedBox>

      {/* PRD 5.2: Tooltip ao hover */}
      {isHovered && (
        <Html position={[position[0], position[1] + 0.8, position[2]]}>
          <div className="bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap backdrop-blur-sm">
            {label}
          </div>
        </Html>
      )}
    </group>
  );
}

// Linha conectando os nós
function ConnectionLine({
  start,
  end
}: {
  start: [number, number, number];
  end: [number, number, number]
}) {
  const points = useMemo(() => {
    return [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  }, [start, end]);

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [points]);

  return (
    <primitive object={new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({
      color: "#00A6B4",
      transparent: true,
      opacity: 0.2,
      linewidth: 2
    }))} />
  );
}

// Pacote que flui pelo pipeline com movimento suave e ondulado
function FlowingPacket({
  method,
  progress,
  id
}: {
  method: PaymentMethod;
  progress: number;
  id: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Interpolar posição ao longo do pipeline
  const stageIndex = Math.floor(progress * (PIPELINE_STAGES.length - 1));
  const localProgress = (progress * (PIPELINE_STAGES.length - 1)) % 1;

  const currentStage = PIPELINE_STAGES[Math.min(stageIndex, PIPELINE_STAGES.length - 1)];
  const nextStage = PIPELINE_STAGES[Math.min(stageIndex + 1, PIPELINE_STAGES.length - 1)];

  // Movimento base horizontal
  const baseX = THREE.MathUtils.lerp(currentStage.position[0], nextStage.position[0], localProgress);
  const baseY = THREE.MathUtils.lerp(currentStage.position[1], nextStage.position[1], localProgress);
  const baseZ = THREE.MathUtils.lerp(currentStage.position[2], nextStage.position[2], localProgress);

  // Animação suave com rotação e movimento vertical ondulado
  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Movimento vertical ondulado (onda senoidal)
    const waveOffset = Math.sin(state.clock.elapsedTime * 2 + id * 0.5) * 0.3;
    
    // Rotação suave contínua
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.5 + id * 0.3;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 1.5 + id * 0.2) * 0.2;
    
    // Posição com onda vertical
    groupRef.current.position.set(
      baseX,
      baseY + waveOffset,
      baseZ + 0.2
    );
  });

  return (
    <group ref={groupRef}>
      <PaymentIcon method={method} position={[0, 0, 0]} />
    </group>
  );
}

// Componente principal do Pipeline
export function PaymentPipeline({
  maxPackets = 12
}: {
  maxPackets?: number
}) {
  const [packets, setPackets] = useState<Array<{ id: number; method: PaymentMethod; progress: number }>>([]);
  const [nodeStates, setNodeStates] = useState<PaymentStatus[]>(
    Array(PIPELINE_STAGES.length).fill("pending")
  );
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const packetIdRef = useRef(0);

  // Gerar novos pacotes periodicamente
  useEffect(() => {
    const interval = setInterval(() => {
      if (packets.length < maxPackets) {
        const methods: PaymentMethod[] = ["card", "pix", "boleto"];
        const randomMethod = methods[Math.floor(Math.random() * methods.length)];

        setPackets((prev) => [
          ...prev,
          { id: packetIdRef.current++, method: randomMethod, progress: 0 },
        ]);
      }
    }, 2000); // Novo pacote a cada 2 segundos

    return () => clearInterval(interval);
  }, [packets.length, maxPackets]);

  // Atualizar progresso dos pacotes com velocidade variável
  useFrame((state, delta) => {
    setPackets((prev) =>
      prev
        .map((packet) => ({
          ...packet,
          // Velocidade variável baseada na posição (mais rápido no meio)
          progress: packet.progress + delta * (0.12 + Math.sin(packet.progress * Math.PI) * 0.06),
        }))
        .filter((packet) => packet.progress < 1) // Remover pacotes que completaram
    );

    // Simular mudanças de estado nos nós
    const elapsed = state.clock.elapsedTime;
    setNodeStates(
      PIPELINE_STAGES.map((_, index) => {
        const offset = index * 0.5;
        const cycle = (elapsed + offset) % 8;

        if (cycle < 2) return "pending";
        if (cycle < 4) return "approved";
        if (cycle < 6) return "review";
        return "denied";
      })
    );
  });

  return (
    <group>
      {/* Nós do pipeline */}
      {PIPELINE_STAGES.map((stage, index) => (
        <PipelineNode
          key={stage.id}
          position={stage.position}
          label={stage.label}
          status={nodeStates[index]}
          isHovered={hoveredNode === index}
          onHover={(hover) => setHoveredNode(hover ? index : null)}
        />
      ))}

      {/* Linhas conectando os nós */}
      {PIPELINE_STAGES.slice(0, -1).map((stage, index) => (
        <ConnectionLine
          key={`line-${stage.id}`}
          start={stage.position}
          end={PIPELINE_STAGES[index + 1].position}
        />
      ))}

      {/* Pacotes fluindo com animação melhorada */}
      {packets.map((packet) => (
        <FlowingPacket
          key={packet.id}
          method={packet.method}
          progress={packet.progress}
          id={packet.id}
        />
      ))}
    </group>
  );
}
