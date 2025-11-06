// GSAP Configuration for Kodano Aurora Experience
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Aurora-specific GSAP configurations
export const auroraGSAPConfig = {
  // Default easing
  ease: "power3.out",

  // Scroll trigger defaults
  scrollTrigger: {
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse",
    markers: false, // Set to true for debugging
  },

  // Animation durations
  duration: {
    fast: 0.3,
    medium: 0.6,
    slow: 1.2,
    verySlow: 2.0,
  },
};

// Initialize GSAP with Aurora settings
export function initGSAP() {
  if (typeof window === "undefined") return;

  // Set default ease
  gsap.defaults({
    ease: auroraGSAPConfig.ease,
    duration: auroraGSAPConfig.duration.medium,
  });

  // Configure ScrollTrigger
  ScrollTrigger.config({
    limitCallbacks: true,
    syncInterval: 150,
  });

  // Refresh ScrollTrigger on window resize
  ScrollTrigger.refresh();
}

// Aurora Animation Presets
export const auroraAnimations = {
  // Fade in from bottom
  fadeInUp: (element: gsap.TweenTarget, delay = 0) => {
    return gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: auroraGSAPConfig.duration.medium,
        delay,
        ease: auroraGSAPConfig.ease,
      }
    );
  },

  // Fade in with scale
  fadeInScale: (element: gsap.TweenTarget, delay = 0) => {
    return gsap.fromTo(
      element,
      {
        opacity: 0,
        scale: 0.9,
      },
      {
        opacity: 1,
        scale: 1,
        duration: auroraGSAPConfig.duration.medium,
        delay,
        ease: auroraGSAPConfig.ease,
      }
    );
  },

  // Stagger children animation
  staggerChildren: (
    container: gsap.TweenTarget,
    childrenSelector: string,
    staggerAmount = 0.1
  ) => {
    return gsap.fromTo(
      `${container} ${childrenSelector}`,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: auroraGSAPConfig.duration.medium,
        stagger: staggerAmount,
        ease: auroraGSAPConfig.ease,
      }
    );
  },

  // Aurora gradient animation
  animateGradient: (element: gsap.TweenTarget) => {
    return gsap.to(element, {
      backgroundPosition: "200% center",
      duration: 3,
      ease: "none",
      repeat: -1,
    });
  },

  // Parallax effect
  parallax: (element: gsap.TweenTarget, speed = 0.5) => {
    return gsap.to(element, {
      y: () => window.innerHeight * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element as gsap.DOMTarget,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  },

  // Pin section
  pinSection: (section: gsap.TweenTarget, pinSpacing = true) => {
    return ScrollTrigger.create({
      trigger: section as gsap.DOMTarget,
      start: "top top",
      end: "+=100%",
      pin: true,
      pinSpacing,
      anticipatePin: 1,
    });
  },

  // Scroll-triggered reveal
  scrollReveal: (
    element: gsap.TweenTarget,
    options?: gsap.TweenVars & { scrollTrigger?: ScrollTrigger.Vars }
  ) => {
    const scrollTriggerConfig = Object.assign(
      {},
      auroraGSAPConfig.scrollTrigger,
      options?.scrollTrigger || {}
    );

    return gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: auroraGSAPConfig.duration.medium,
        ease: auroraGSAPConfig.ease,
        scrollTrigger: Object.assign({ trigger: element }, scrollTriggerConfig),
        ...options,
      }
    );
  },

  // Hero title reveal with split text effect
  heroTitleReveal: (element: gsap.TweenTarget) => {
    return gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 100,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: auroraGSAPConfig.duration.slow,
        ease: "power4.out",
      }
    );
  },

  // Card hover effect
  cardHover: (element: gsap.TweenTarget) => {
    const tl = gsap.timeline({ paused: true });

    tl.to(element, {
      y: -8,
      scale: 1.02,
      boxShadow: "0 12px 32px rgba(0, 166, 180, 0.25)",
      duration: 0.3,
      ease: "power2.out",
    });

    return tl;
  },

  // Counter animation
  countUp: (
    element: gsap.TweenTarget,
    endValue: number,
    duration = 2,
    decimals = 0
  ) => {
    const obj = { value: 0 };

    return gsap.to(obj, {
      value: endValue,
      duration,
      ease: "power2.out",
      onUpdate: function () {
        if (element instanceof Element) {
          element.textContent = obj.value.toFixed(decimals);
        }
      },
      scrollTrigger: {
        trigger: element as gsap.DOMTarget,
        start: "top 80%",
      },
    });
  },

  // Magnetic button effect
  magnetic: (button: HTMLElement, strength = 0.5) => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(button, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)",
      });
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup function
    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  },
};

// Timeline factory for complex sequences
export const createAuroraTimeline = (options?: gsap.TimelineVars) => {
  return gsap.timeline({
    ease: auroraGSAPConfig.ease,
    ...options,
  });
};

// Utility to kill all ScrollTriggers
export const killAllScrollTriggers = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};

// Utility to refresh ScrollTrigger
export const refreshScrollTrigger = () => {
  ScrollTrigger.refresh();
};

export { gsap, ScrollTrigger };
