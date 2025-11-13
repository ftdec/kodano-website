"use client";

import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";

// Device detection hook
function useDeviceCapabilities() {
  const [capabilities, setCapabilities] = useState({
    isMobile: false,
    isLowEnd: false,
    pixelRatio: 1,
  });

  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    // Detect low-end devices
    const isLowEnd = isMobile && (
      navigator.hardwareConcurrency ? navigator.hardwareConcurrency < 4 : true
    );

    // Adaptive pixel ratio
    const pixelRatio = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);

    setCapabilities({
      isMobile,
      isLowEnd,
      pixelRatio,
    });
  }, []);

  return capabilities;
}

// PRD 5.2: Main canvas component com Pipeline de Pagamentos
export function HeroCanvas() {
  const { isMobile, isLowEnd, pixelRatio } = useDeviceCapabilities();

  // PRD 5.2: 60-90 objetos simultâneos máx
  const maxPackets = isLowEnd ? 6 : isMobile ? 8 : 12;

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
