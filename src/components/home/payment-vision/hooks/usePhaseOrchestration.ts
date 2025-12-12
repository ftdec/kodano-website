/**
 * Phase Orchestration Hook
 *
 * Controls the 7-phase animation timeline:
 * 0: Card presentation (0-2s)
 * 1: Data extraction (2-4s)
 * 2: Tokenization (4-6s)
 * 3: Intelligent routing (6-8s)
 * 4: Distributed processing (8-10s)
 * 5: Elegant approval (10-11s)
 * 6: Settlement flow (11-12s)
 */

import { useEffect, useState, useRef } from "react";
import { useMotionValue, useMotionValueEvent, MotionValue } from "framer-motion";

interface PhaseOrchestrationOptions {
  totalDuration: number; // Total loop duration in seconds
  scrollProgress?: MotionValue<number> | null;
}

export function usePhaseOrchestration({
  totalDuration,
  scrollProgress,
}: PhaseOrchestrationOptions) {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [phaseProgress, setPhaseProgress] = useState(0);
  const [globalTime, setGlobalTime] = useState(0);
  const [isInView, setIsInView] = useState(true);

  const scrollSpeedRef = useRef(1);

  // Track scroll for speed modulation
  useMotionValueEvent(
    scrollProgress || useMotionValue(0),
    "change",
    (v) => {
      // Scroll affects global speed (0.8..1.3)
      scrollSpeedRef.current = 0.8 + (v || 0) * 0.5;
    }
  );

  // Phase durations (in seconds)
  const phaseDurations = [
    totalDuration * 0.17, // Phase 0: Card presentation (17%)
    totalDuration * 0.17, // Phase 1: Data extraction (17%)
    totalDuration * 0.17, // Phase 2: Tokenization (17%)
    totalDuration * 0.17, // Phase 3: Routing (17%)
    totalDuration * 0.17, // Phase 4: Processing (17%)
    totalDuration * 0.08, // Phase 5: Approval (8%)
    totalDuration * 0.07, // Phase 6: Settlement (7%)
  ];

  useEffect(() => {
    let raf: number;
    let startTime = performance.now();
    let lastPhase = -1;

    const loop = (now: number) => {
      if (!isInView) {
        raf = requestAnimationFrame(loop);
        return;
      }

      const elapsed = ((now - startTime) / 1000) * scrollSpeedRef.current;
      const cycleTime = elapsed % totalDuration;

      // Calculate current phase
      let accumulatedTime = 0;
      let phase = 0;

      for (let i = 0; i < phaseDurations.length; i++) {
        if (cycleTime < accumulatedTime + phaseDurations[i]) {
          phase = i;
          break;
        }
        accumulatedTime += phaseDurations[i];
      }

      // Calculate progress within current phase (0..1)
      const phaseStart = phaseDurations
        .slice(0, phase)
        .reduce((sum, dur) => sum + dur, 0);
      const progress =
        (cycleTime - phaseStart) / phaseDurations[phase];

      // Update state only when phase changes (not every frame)
      if (phase !== lastPhase) {
        lastPhase = phase;
        setCurrentPhase(phase);
      }

      setPhaseProgress(Math.min(1, Math.max(0, progress)));
      setGlobalTime(elapsed);

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [totalDuration, isInView]);

  // Intersection observer for performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );

    // Observer setup would need ref from component
    // For now, assume always in view
    setIsInView(true);

    return () => observer.disconnect();
  }, []);

  return {
    currentPhase,
    phaseProgress,
    globalTime,
  };
}
