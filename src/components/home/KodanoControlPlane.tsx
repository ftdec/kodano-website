/**
 * Kodano Control Plane
 *
 * "Um sistema que nunca perde o controle"
 *
 * Visualização viva de soberania sobre infraestrutura.
 * Não é fluxo de pagamento — é demonstração de controle preventivo.
 *
 * Conceito:
 * - 8-12 entidades flutuando organicamente
 * - Campo vetorial invisível (aparece durante intervenções)
 * - Correção preventiva (ajusta ANTES de problemas)
 * - Sincronia rara (a cada 40-60s)
 *
 * Tecnologia: Canvas 2D + Perlin Noise + Física simples
 * Performance: 60fps constante
 */

"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPES & CONSTANTS
// ============================================================================

type Vector2 = { x: number; y: number };

type Entity = {
  id: number;
  position: Vector2;
  velocity: Vector2;
  size: number;
  type: "square" | "circle";
  state: "idle" | "adjusting" | "syncing";
};

type SystemState = "operating" | "intervening" | "syncing" | "stable";

const ENTITY_COUNT = 10;
const FIELD_VISIBILITY_DURATION = 1000; // ms
const SYNC_INTERVAL_MIN = 40000; // 40s
const SYNC_INTERVAL_MAX = 60000; // 60s

const COLORS = {
  bg: "#FAFBFC",
  entityFill: "rgba(255, 255, 255, 0.85)",
  entityBorder: "rgba(79, 172, 254, 0.12)",
  fieldGradient: ["#4FACFE", "#00DBDE", "#43E97B"],
};

// ============================================================================
// PERLIN NOISE (Simplified)
// ============================================================================

class SimplexNoise {
  private perm: number[] = [];

  constructor(seed = Math.random()) {
    const p: number[] = [];
    for (let i = 0; i < 256; i++) p[i] = i;

    // Shuffle based on seed
    for (let i = 255; i > 0; i--) {
      const n = Math.floor((seed * 9301 + 49297) % 233280);
      seed = n / 233280.0;
      const j = Math.floor(seed * (i + 1));
      [p[i], p[j]] = [p[j], p[i]];
    }

    // Duplicate
    for (let i = 0; i < 512; i++) {
      this.perm[i] = p[i & 255];
    }
  }

  private fade(t: number): number {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  private lerp(t: number, a: number, b: number): number {
    return a + t * (b - a);
  }

  private grad(hash: number, x: number, y: number): number {
    const h = hash & 7;
    const u = h < 4 ? x : y;
    const v = h < 4 ? y : x;
    return ((h & 1) ? -u : u) + ((h & 2) ? -v : v);
  }

  noise(x: number, y: number): number {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;

    x -= Math.floor(x);
    y -= Math.floor(y);

    const u = this.fade(x);
    const v = this.fade(y);

    const a = this.perm[X] + Y;
    const aa = this.perm[a];
    const ab = this.perm[a + 1];
    const b = this.perm[X + 1] + Y;
    const ba = this.perm[b];
    const bb = this.perm[b + 1];

    return this.lerp(
      v,
      this.lerp(u, this.grad(this.perm[aa], x, y), this.grad(this.perm[ba], x - 1, y)),
      this.lerp(u, this.grad(this.perm[ab], x, y - 1), this.grad(this.perm[bb], x - 1, y - 1))
    );
  }
}

// ============================================================================
// VECTOR FIELD
// ============================================================================

class VectorField {
  private noise: SimplexNoise;
  private scale = 0.003;
  private time = 0;

  constructor() {
    this.noise = new SimplexNoise();
  }

  update(deltaTime: number) {
    this.time += deltaTime * 0.0001;
  }

  getForce(x: number, y: number): Vector2 {
    const angle =
      this.noise.noise(x * this.scale, y * this.scale + this.time) *
      Math.PI *
      2;

    return {
      x: Math.cos(angle) * 0.5,
      y: Math.sin(angle) * 0.5,
    };
  }

  render(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    opacity: number
  ) {
    if (opacity === 0) return;

    const gridSize = 40;
    const arrowLength = 20;

    ctx.save();
    ctx.globalAlpha = opacity;

    for (let x = 0; x < width; x += gridSize) {
      for (let y = 0; y < height; y += gridSize) {
        const force = this.getForce(x, y);
        const angle = Math.atan2(force.y, force.x);

        ctx.strokeStyle = COLORS.fieldGradient[1];
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + Math.cos(angle) * arrowLength, y + Math.sin(angle) * arrowLength);
        ctx.stroke();
      }
    }

    ctx.restore();
  }
}

// ============================================================================
// ENTITY PHYSICS
// ============================================================================

function createEntity(id: number, width: number, height: number): Entity {
  return {
    id,
    position: {
      x: Math.random() * width,
      y: Math.random() * height,
    },
    velocity: {
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
    },
    size: 28 + Math.random() * 16,
    type: Math.random() > 0.5 ? "square" : "circle",
    state: "idle",
  };
}

function updateEntity(
  entity: Entity,
  field: VectorField,
  width: number,
  height: number,
  entities: Entity[],
  shouldSync: boolean
): { entity: Entity; needsIntervention: boolean } {
  let needsIntervention = false;

  if (shouldSync) {
    // Syncing mode: move to center grid
    entity.state = "syncing";
    const targetX = width / 2;
    const targetY = height / 2;
    const dx = targetX - entity.position.x;
    const dy = targetY - entity.position.y;

    entity.velocity.x += dx * 0.001;
    entity.velocity.y += dy * 0.001;
    entity.velocity.x *= 0.98;
    entity.velocity.y *= 0.98;
  } else {
    // Normal mode: autonomous + controlled
    entity.state = "idle";

    // Autonomous force (random walk)
    const autonomousForce = {
      x: (Math.random() - 0.5) * 0.1,
      y: (Math.random() - 0.5) * 0.1,
    };

    // Control field force
    const controlForce = field.getForce(entity.position.x, entity.position.y);

    // Blend: 70% autonomous, 30% controlled
    const blendedForce = {
      x: autonomousForce.x * 0.7 + controlForce.x * 0.3,
      y: autonomousForce.y * 0.7 + controlForce.y * 0.3,
    };

    // Check for preventive correction
    const margin = 50;
    if (
      entity.position.x < margin ||
      entity.position.x > width - margin ||
      entity.position.y < margin ||
      entity.position.y > height - margin
    ) {
      needsIntervention = true;
      entity.state = "adjusting";

      // Corrective force (towards center)
      const toCenter = {
        x: width / 2 - entity.position.x,
        y: height / 2 - entity.position.y,
      };
      const dist = Math.sqrt(toCenter.x ** 2 + toCenter.y ** 2);
      if (dist > 0) {
        entity.velocity.x += (toCenter.x / dist) * 0.3;
        entity.velocity.y += (toCenter.y / dist) * 0.3;
      }
    } else {
      // Check collision with other entities
      for (const other of entities) {
        if (other.id === entity.id) continue;

        const dx = other.position.x - entity.position.x;
        const dy = other.position.y - entity.position.y;
        const dist = Math.sqrt(dx ** 2 + dy ** 2);
        const minDist = (entity.size + other.size) / 2 + 20;

        if (dist < minDist) {
          needsIntervention = true;
          entity.state = "adjusting";

          // Repel
          const angle = Math.atan2(dy, dx);
          entity.velocity.x -= Math.cos(angle) * 0.2;
          entity.velocity.y -= Math.sin(angle) * 0.2;
        }
      }

      if (!needsIntervention) {
        entity.velocity.x += blendedForce.x;
        entity.velocity.y += blendedForce.y;
      }
    }

    // Damping
    entity.velocity.x *= 0.99;
    entity.velocity.y *= 0.99;

    // Speed limit
    const speed = Math.sqrt(entity.velocity.x ** 2 + entity.velocity.y ** 2);
    if (speed > 3) {
      entity.velocity.x = (entity.velocity.x / speed) * 3;
      entity.velocity.y = (entity.velocity.y / speed) * 3;
    }
  }

  // Update position
  entity.position.x += entity.velocity.x;
  entity.position.y += entity.velocity.y;

  // Hard boundaries
  entity.position.x = Math.max(0, Math.min(width, entity.position.x));
  entity.position.y = Math.max(0, Math.min(height, entity.position.y));

  return { entity, needsIntervention };
}

// ============================================================================
// RENDERING
// ============================================================================

function renderEntity(ctx: CanvasRenderingContext2D, entity: Entity) {
  ctx.save();

  // Shadow
  ctx.shadowColor = "rgba(0, 0, 0, 0.08)";
  ctx.shadowBlur = 12;
  ctx.shadowOffsetY = 4;

  // Fill
  ctx.fillStyle = COLORS.entityFill;

  if (entity.type === "circle") {
    ctx.beginPath();
    ctx.arc(entity.position.x, entity.position.y, entity.size / 2, 0, Math.PI * 2);
    ctx.fill();
  } else {
    const radius = 8;
    ctx.beginPath();
    ctx.roundRect(
      entity.position.x - entity.size / 2,
      entity.position.y - entity.size / 2,
      entity.size,
      entity.size,
      radius
    );
    ctx.fill();
  }

  // Border
  ctx.shadowColor = "transparent";
  ctx.strokeStyle = COLORS.entityBorder;
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.restore();
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function KodanoControlPlane({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Setup
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    setDimensions({ width, height });

    const field = new VectorField();
    const entities: Entity[] = Array.from({ length: ENTITY_COUNT }, (_, i) =>
      createEntity(i, width, height)
    );

    let systemState: SystemState = "operating";
    let fieldOpacity = 0;
    let lastSyncTime = Date.now();
    let syncDuration = Math.random() * (SYNC_INTERVAL_MAX - SYNC_INTERVAL_MIN) + SYNC_INTERVAL_MIN;

    let lastTime = performance.now();
    let raf: number;

    const loop = (now: number) => {
      const deltaTime = now - lastTime;
      lastTime = now;

      // Clear
      ctx.fillStyle = COLORS.bg;
      ctx.fillRect(0, 0, width, height);

      // Update field
      field.update(deltaTime);

      // Check for sync
      const elapsed = Date.now() - lastSyncTime;
      const shouldSync = elapsed > syncDuration && elapsed < syncDuration + 3000;

      if (shouldSync && systemState !== "syncing") {
        systemState = "syncing";
      } else if (!shouldSync && systemState === "syncing") {
        systemState = "operating";
        lastSyncTime = Date.now();
        syncDuration = Math.random() * (SYNC_INTERVAL_MAX - SYNC_INTERVAL_MIN) + SYNC_INTERVAL_MIN;
      }

      // Update entities
      let anyIntervention = false;
      entities.forEach((entity, i) => {
        const result = updateEntity(entity, field, width, height, entities, shouldSync);
        entities[i] = result.entity;
        if (result.needsIntervention) anyIntervention = true;
      });

      // Field opacity
      if (anyIntervention || systemState === "intervening") {
        systemState = "intervening";
        fieldOpacity = Math.min(1, fieldOpacity + deltaTime / 400);
      } else {
        fieldOpacity = Math.max(0, fieldOpacity - deltaTime / 600);
        if (fieldOpacity === 0 && systemState === "intervening") {
          systemState = "operating";
        }
      }

      // Render field
      field.render(ctx, width, height, fieldOpacity * 0.1);

      // Render entities
      entities.forEach((entity) => renderEntity(ctx, entity));

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className={cn(
        "relative w-full aspect-[1.1/1] rounded-3xl border border-border/50 overflow-hidden",
        "bg-gradient-to-br from-[#4FACFE]/2 via-transparent to-[#43E97B]/3",
        "shadow-[0_30px_90px_rgba(15,23,42,0.08)]",
        className
      )}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ imageRendering: "crisp-edges" }}
      />
    </div>
  );
}
