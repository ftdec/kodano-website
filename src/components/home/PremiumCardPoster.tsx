/**
 * PremiumCardPoster - Static poster for instant SSR rendering
 * Visually identical to the 3D Canvas for seamless transition
 * Enterprise-level card design (Stripe/Apple inspired)
 */

import { cn } from "@/lib/utils";

interface PremiumCardPosterProps {
  className?: string;
}

export function PremiumCardPoster({ className }: PremiumCardPosterProps) {
  return (
    <div
      className={cn("absolute inset-0", className)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#FFFFFF",
        borderRadius: 28,
        overflow: "hidden",
      }}
    >
      {/* Premium Card - Static Render */}
      <div
        style={{
          position: "relative",
          width: "75%", // 75% do stage (conforme PRD)
          maxWidth: 560,
          aspectRatio: "1.6 / 1",
          borderRadius: 22,
          padding: 24,
          transform: "perspective(1200px) rotate3d(1, -0.8, 0, 8deg)", // Tilt sutil
          background: `linear-gradient(155deg, #00C8DC 0%, #00AFC7 50%, #002A35 100%)`,
          boxShadow: `
            0 50px 100px rgba(0, 42, 53, 0.18),
            0 24px 48px rgba(0, 42, 53, 0.12),
            inset 0 0 0 1px rgba(255, 255, 255, 0.1)
          `,
        }}
      >
        {/* Highlight/Sheen overlay (simula reflexo) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 20,
            background: `
              linear-gradient(120deg, rgba(0, 200, 220, 0.12), transparent 45%),
              radial-gradient(60% 55% at 25% 25%, rgba(255, 255, 255, 0.14), transparent 60%)
            `,
            pointerEvents: "none",
          }}
        />

        {/* Chip EMV (Tech Blue/Teal - não dourado) */}
        <div
          style={{
            width: 52,
            height: 38,
            borderRadius: 10,
            background: `linear-gradient(135deg, #4FACFE 0%, #2FE6C8 100%)`,
            boxShadow: `
              inset 0 0 0 1px rgba(255, 255, 255, 0.25),
              0 4px 16px rgba(47, 230, 200, 0.4)
            `,
            position: "relative",
          }}
        >
          {/* Chip contacts (micro details) */}
          <div
            style={{
              position: "absolute",
              inset: 8,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "repeat(3, 1fr)",
              gap: 2,
            }}
          >
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255, 215, 0, 0.6)",
                  borderRadius: 1,
                }}
              />
            ))}
          </div>
        </div>

        {/* Número do cartão */}
        <div
          style={{
            position: "absolute",
            bottom: "28%",
            left: "50%",
            transform: "translateX(-50%)",
            color: "rgba(255, 255, 255, 0.92)",
            letterSpacing: "0.18em",
            fontWeight: 600,
            fontSize: 15,
            fontFamily: "Inter, system-ui, sans-serif",
            textShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          4532 •••• •••• 9010
        </div>

        {/* Data de expiração (direita) */}
        <div
          style={{
            position: "absolute",
            bottom: "18%",
            right: "8%",
            color: "rgba(255, 255, 255, 0.85)",
            fontSize: 13,
            letterSpacing: "0.08em",
            fontWeight: 600,
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          12/28
        </div>

        {/* Ícone contactless (ondas) */}
        <div
          style={{
            position: "absolute",
            bottom: "18%",
            right: "30%",
            display: "flex",
            gap: 2,
            transform: "rotate(-20deg)",
          }}
        >
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                width: 3,
                height: 16 + i * 4,
                borderRadius: 2,
                background: `rgba(255, 255, 255, ${0.7 - i * 0.1})`,
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            />
          ))}
        </div>

        {/* Marca d'água sutil Kodano (bem discreta, canto superior direito) */}
        <div
          style={{
            position: "absolute",
            top: "12%",
            right: "8%",
            fontSize: 11,
            letterSpacing: "0.12em",
            fontWeight: 700,
            color: "rgba(255, 255, 255, 0.25)",
            fontFamily: "Inter, system-ui, sans-serif",
            textTransform: "uppercase",
          }}
        >
          KODANO
        </div>
      </div>
    </div>
  );
}

// Helper: rgba converter (caso precise)
function hexToRgba(hex: string, alpha: number): string {
  const v = hex.replace("#", "").trim();
  const r = parseInt(v.slice(0, 2), 16);
  const g = parseInt(v.slice(2, 4), 16);
  const b = parseInt(v.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
