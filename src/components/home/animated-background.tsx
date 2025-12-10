/**
 * AnimatedBackground Component
 * Premium animated gradient background for Hero section
 * Inspired by Stripe's sophisticated backgrounds
 */

"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/animations/hooks";
import { cn } from "@/lib/utils";

interface AnimatedBackgroundProps {
  className?: string;
}

export function AnimatedBackground({ className }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);

  useEffect(() => {
    // Check WebGL support
    const testCanvas = document.createElement("canvas");
    const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
    if (!gl) {
      setIsWebGLSupported(false);
      return;
    }

    if (prefersReducedMotion || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Kodano colors (from PRD)
    const colors = [
      { r: 79, g: 172, b: 254 },   // #4FACFE - Blue
      { r: 0, g: 219, b: 222 },    // #00DBDE - Cyan
      { r: 67, g: 233, b: 123 },   // #43E97B - Green
      { r: 65, g: 90, b: 119 },    // #415A77 - Dark Blue
    ];

    // Gradient orbs
    class GradientOrb {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      color: { r: number; g: number; b: number };

      constructor(width: number, height: number, color: { r: number; g: number; b: number }) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 300 + 200;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.color = color;
      }

      update(width: number, height: number) {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < -this.radius || this.x > width + this.radius) this.vx *= -1;
        if (this.y < -this.radius || this.y > height + this.radius) this.vy *= -1;
      }

      draw(ctx: CanvasRenderingContext2D) {
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.radius
        );

        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.15)`);
        gradient.addColorStop(0.5, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.08)`);
        gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }

    // Create orbs
    const orbs = colors.map(color => new GradientOrb(canvas.width, canvas.height, color));

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dark base
      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update orbs
      orbs.forEach(orb => {
        orb.update(canvas.width, canvas.height);
        orb.draw(ctx);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", setCanvasSize);
    };
  }, [prefersReducedMotion]);

  // Fallback for reduced motion or no WebGL
  if (prefersReducedMotion || !isWebGLSupported) {
    return (
      <div className={cn("absolute inset-0", className)}>
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(circle at 20% 50%, rgba(79, 172, 254, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(0, 219, 222, 0.25) 0%, transparent 50%),
              radial-gradient(circle at 40% 20%, rgba(67, 233, 123, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 90% 10%, rgba(65, 90, 119, 0.15) 0%, transparent 50%)
            `,
          }}
        />
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 pointer-events-none", className)}
      style={{ opacity: 0.6 }}
    />
  );
}

/**
 * Lightweight CSS-only version (alternative)
 * Use this if performance is a concern
 */
export function AnimatedBackgroundSimple({ className }: AnimatedBackgroundProps) {
  return (
    <div className={cn("absolute inset-0", className)}>
      <div
        className="absolute inset-0 opacity-40 animate-gradient"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(79, 172, 254, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(0, 219, 222, 0.25) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, rgba(67, 233, 123, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 90% 10%, rgba(65, 90, 119, 0.15) 0%, transparent 50%)
          `,
          backgroundSize: "200% 200%",
        }}
      />
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[#4FACFE]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-[#00DBDE]/10 rounded-full blur-[100px]" />
    </div>
  );
}
