/**
 * Kodano Aurora Background
 * Elegant, smooth, colorful gradient mesh animation
 * Stripe/Cloudwalk-level polish with Kodano brand colors
 */

"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/animations/hooks";

const BRAND_COLORS = {
  blue: "#4FACFE",
  cyan: "#00DBDE",
  green: "#43E97B",
  slate: "#415A77",
};

interface KodanoAuroraBackgroundProps {
  className?: string;
  intensity?: "subtle" | "medium" | "vibrant";
}

export function KodanoAuroraBackground({
  className,
  intensity = "medium",
}: KodanoAuroraBackgroundProps) {
  const prefersReducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Smooth gradient mesh with multiple orbs
    const orbs = [
      {
        x: dimensions.width * 0.2,
        y: dimensions.height * 0.3,
        color: BRAND_COLORS.blue,
        radius: dimensions.width * 0.4,
        vx: 0.08,
        vy: 0.05,
      },
      {
        x: dimensions.width * 0.7,
        y: dimensions.height * 0.6,
        color: BRAND_COLORS.cyan,
        radius: dimensions.width * 0.35,
        vx: -0.06,
        vy: 0.08,
      },
      {
        x: dimensions.width * 0.5,
        y: dimensions.height * 0.8,
        color: BRAND_COLORS.green,
        radius: dimensions.width * 0.3,
        vx: 0.05,
        vy: -0.04,
      },
      {
        x: dimensions.width * 0.15,
        y: dimensions.height * 0.7,
        color: BRAND_COLORS.slate,
        radius: dimensions.width * 0.25,
        vx: 0.04,
        vy: 0.06,
      },
    ];

    const intensityMap = {
      subtle: 0.15,
      medium: 0.25,
      vibrant: 0.4,
    };
    const opacity = intensityMap[intensity];

    let animationFrame: number;
    let time = 0;

    const draw = () => {
      time += 0.002; // Very slow movement

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create gradient mesh by drawing overlapping orbs
      orbs.forEach((orb, i) => {
        // Smooth movement with sine waves
        orb.x += Math.sin(time + i * 1.5) * orb.vx;
        orb.y += Math.cos(time * 0.8 + i) * orb.vy;

        // Keep orbs within bounds with soft wrapping
        if (orb.x < -orb.radius) orb.x = canvas.width + orb.radius;
        if (orb.x > canvas.width + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = canvas.height + orb.radius;
        if (orb.y > canvas.height + orb.radius) orb.y = -orb.radius;

        // Create radial gradient for each orb
        const gradient = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          orb.radius
        );

        gradient.addColorStop(0, orb.color + "FF");
        gradient.addColorStop(0.3, orb.color + "CC");
        gradient.addColorStop(0.6, orb.color + "66");
        gradient.addColorStop(1, orb.color + "00");

        ctx.globalCompositeOperation = "screen";
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Add subtle pulsing effect
      const pulse = Math.sin(time * 2) * 0.1 + 1;
      ctx.globalAlpha = opacity * pulse;

      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [dimensions, prefersReducedMotion, intensity]);

  if (prefersReducedMotion) {
    return (
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br from-[#4FACFE]/20 via-[#00DBDE]/15 to-[#43E97B]/20",
          className
        )}
      />
    );
  }

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ imageRendering: "auto" }}
      />
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/10" />
    </div>
  );
}

