import { useEffect, useRef, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseScrollTriggerOptions extends ScrollTrigger.Vars {
  animation?: gsap.core.Animation;
}

export function useScrollTrigger(
  options: UseScrollTriggerOptions
): RefObject<HTMLElement> {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      ...options,
    });

    return () => {
      trigger.kill();
    };
  }, [options]);

  return ref;
}

// Hook for scroll-triggered animations
export function useScrollAnimation(
  animation: (element: HTMLElement) => gsap.core.Animation,
  options?: Omit<ScrollTrigger.Vars, "trigger">
): RefObject<HTMLElement> {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const anim = animation(ref.current);

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      animation: anim,
      ...options,
    });

    return () => {
      trigger.kill();
      anim.kill();
    };
  }, [animation, options]);

  return ref;
}

// Hook for reveal animations on scroll
export function useScrollReveal(
  options?: Partial<ScrollTrigger.Vars>
): RefObject<HTMLElement> {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    // Set initial state
    gsap.set(element, {
      opacity: 0,
      y: 50,
    });

    // Animate in
    const animation = gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: "top 85%",
      end: "bottom 15%",
      animation,
      ...options,
    });

    return () => {
      trigger.kill();
      animation.kill();
    };
  }, [options]);

  return ref;
}
