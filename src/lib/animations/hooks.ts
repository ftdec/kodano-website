/**
 * Animation Hooks
 * Custom hooks for advanced animation logic
 */

"use client";

import { useEffect, useState, useRef, RefObject } from "react";
import { useScroll, useTransform, useMotionValue, useSpring, MotionValue } from "framer-motion";

// ============================================
// SCROLL HOOKS
// ============================================

/**
 * Get scroll progress of an element (0 to 1)
 */
export function useScrollProgress(ref: RefObject<HTMLElement>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  return scrollYProgress;
}

/**
 * Get smooth scroll progress with spring physics
 */
export function useSmoothScrollProgress(ref: RefObject<HTMLElement>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return smoothProgress;
}

/**
 * Pin element during scroll within a range
 */
export function useScrollPin(ref: RefObject<HTMLElement>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  return scrollYProgress;
}

/**
 * Parallax effect based on scroll
 */
export function useParallax(ref: RefObject<HTMLElement>, distance = 100) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);

  return y;
}

/**
 * Scale element based on scroll progress
 */
export function useScrollScale(ref: RefObject<HTMLElement>, range: [number, number] = [0.8, 1]) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [range[0], range[1], range[0]]);

  return scale;
}

/**
 * Opacity based on scroll
 */
export function useScrollOpacity(ref: RefObject<HTMLElement>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return opacity;
}

// ============================================
// MOUSE HOOKS
// ============================================

/**
 * Track mouse position
 */
export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return mousePosition;
}

/**
 * Track mouse position relative to element
 */
export function useMousePositionInElement(ref: RefObject<HTMLElement>) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updatePosition = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    element.addEventListener("mousemove", updatePosition);

    return () => {
      element.removeEventListener("mousemove", updatePosition);
    };
  }, [ref]);

  return position;
}

/**
 * Calculate rotation based on mouse position for 3D tilt effect
 */
export function useMouseTilt(ref: RefObject<HTMLElement>, maxRotation = 10) {
  const [rotation, setRotation] = useState({ rotateX: 0, rotateY: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updateRotation = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * maxRotation;
      const rotateX = -((y - centerY) / centerY) * maxRotation;

      setRotation({ rotateX, rotateY });
    };

    const resetRotation = () => {
      setRotation({ rotateX: 0, rotateY: 0 });
    };

    element.addEventListener("mousemove", updateRotation);
    element.addEventListener("mouseleave", resetRotation);

    return () => {
      element.removeEventListener("mousemove", updateRotation);
      element.removeEventListener("mouseleave", resetRotation);
    };
  }, [ref, maxRotation]);

  return rotation;
}

/**
 * Magnetic button effect - element follows cursor
 */
export function useMagneticEffect(ref: RefObject<HTMLElement>, strength = 0.3) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updatePosition = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      x.set(distanceX * strength);
      y.set(distanceY * strength);
    };

    const resetPosition = () => {
      x.set(0);
      y.set(0);
    };

    element.addEventListener("mouseenter", updatePosition);
    element.addEventListener("mousemove", updatePosition);
    element.addEventListener("mouseleave", resetPosition);

    return () => {
      element.removeEventListener("mouseenter", updatePosition);
      element.removeEventListener("mousemove", updatePosition);
      element.removeEventListener("mouseleave", resetPosition);
    };
  }, [ref, strength, x, y]);

  return { x: springX, y: springY };
}

// ============================================
// VIEWPORT HOOKS
// ============================================

/**
 * Detect if element is in viewport
 */
export function useInViewport(ref: RefObject<HTMLElement>, threshold = 0.1) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold]);

  return isInView;
}

/**
 * Detect if element has been seen (doesn't toggle back to false)
 */
export function useHasBeenSeen(ref: RefObject<HTMLElement>, threshold = 0.1) {
  const [hasBeenSeen, setHasBeenSeen] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || hasBeenSeen) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasBeenSeen(true);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, hasBeenSeen]);

  return hasBeenSeen;
}

// ============================================
// UTILITY HOOKS
// ============================================

/**
 * Detect if user prefers reduced motion
 */
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return prefersReducedMotion;
}

/**
 * Detect if device is mobile
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      );
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return isMobile;
}

/**
 * Counter animation hook
 */
export function useCountAnimation(
  target: number,
  duration = 2000,
  start = 0,
  isInView = true
) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function (easeOutExpo)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setCount(Math.floor(start + (target - start) * easeProgress));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [target, duration, start, isInView]);

  return count;
}

/**
 * Stagger reveal hook for children elements
 */
export function useStaggerReveal(ref: RefObject<HTMLElement>, delay = 100) {
  const [revealedIndexes, setRevealedIndexes] = useState<Set<number>>(new Set());
  const isInView = useInViewport(ref);

  useEffect(() => {
    if (!isInView || !ref.current) return;

    const children = Array.from(ref.current.children);

    children.forEach((_, index) => {
      setTimeout(() => {
        setRevealedIndexes(prev => new Set([...prev, index]));
      }, index * delay);
    });
  }, [isInView, ref, delay]);

  return revealedIndexes;
}
