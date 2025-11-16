"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";

// Device detection hook
function useDeviceCapabilities() {
  const [capabilities] = useState(() => {
    // Initialize state with computed values
    const isMobile = typeof navigator !== 'undefined'
      ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      : false;

    // Detect low-end devices
    const isLowEnd = isMobile && (
      typeof navigator !== 'undefined' && navigator.hardwareConcurrency
        ? navigator.hardwareConcurrency < 4
        : true
    );

    // Adaptive pixel ratio
    const pixelRatio = typeof window !== 'undefined'
      ? Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2)
      : 1;

    return {
      isMobile,
      isLowEnd,
      pixelRatio,
    };
  });

  return capabilities;
}

// PRD 5.2: Main canvas component com Pipeline de Pagamentos
export function HeroCanvas() {
  const { pixelRatio, isMobile } = useDeviceCapabilities();

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        dpr={pixelRatio}
        gl={{
          alpha: true,
          antialias: !isMobile,
          powerPreference: "high-performance",
          stencil: false,
          depth: false,
        }}
        performance={{ min: 0.5 }}
        frameloop="demand"
      >
        <Suspense fallback={null}>
          {/* PRD v2.0: Luz ambiente 0.6; directional 0.4 */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={0.4} color="#FFFFFF" />

          {/* Background decorativo - logo removido, agora está abaixo do título */}
        </Suspense>
      </Canvas>
    </div>
  );
}

// Fallback component for non-WebGL browsers
export function HeroCanvasFallback() {
  return (
    <div className="absolute inset-0 z-0 aurora-gradient opacity-30" />
  );
}
