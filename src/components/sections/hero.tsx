"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, TrendingUp, DollarSign } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import { Suspense, useState, useEffect, useRef } from "react";
import Image from "next/image";

// Dynamic import for 3D canvas with no SSR
const HeroCanvas = dynamic(
  () => import("@/components/3d/HeroCanvas").then((mod) => mod.HeroCanvas),
  { ssr: false }
);

const HeroCanvasFallback = dynamic(
  () => import("@/components/3d/HeroCanvas").then((mod) => mod.HeroCanvasFallback),
  { ssr: false }
);

// PRD 5.2: Fallback estático para prefers-reduced-motion
function StaticPipelineFallback() {
  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center opacity-10 dark:opacity-5">
      <svg
        width="800"
        height="200"
        viewBox="0 0 800 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="max-w-full h-auto"
      >
        {/* Pipeline stages */}
        <rect x="50" y="75" width="100" height="50" rx="8" fill="#00C8DC" opacity="0.2" />
        <text x="100" y="105" textAnchor="middle" fill="#00C8DC" fontSize="12" fontWeight="600">Pedido</text>

        <rect x="200" y="75" width="100" height="50" rx="8" fill="#00C8DC" opacity="0.2" />
        <text x="250" y="105" textAnchor="middle" fill="#00C8DC" fontSize="12" fontWeight="600">Tokenização</text>

        <rect x="350" y="75" width="100" height="50" rx="8" fill="#00C8DC" opacity="0.2" />
        <text x="400" y="105" textAnchor="middle" fill="#00C8DC" fontSize="12" fontWeight="600">Antifraude</text>

        <rect x="500" y="75" width="100" height="50" rx="8" fill="#00C8DC" opacity="0.2" />
        <text x="550" y="105" textAnchor="middle" fill="#00C8DC" fontSize="12" fontWeight="600">Autorização</text>

        <rect x="650" y="75" width="100" height="50" rx="8" fill="#00C8DC" opacity="0.2" />
        <text x="700" y="105" textAnchor="middle" fill="#00C8DC" fontSize="12" fontWeight="600">Liquidação</text>

        {/* Connection lines */}
        <line x1="150" y1="100" x2="200" y2="100" stroke="#00C8DC" strokeWidth="2" opacity="0.3" />
        <line x1="300" y1="100" x2="350" y2="100" stroke="#00C8DC" strokeWidth="2" opacity="0.3" />
        <line x1="450" y1="100" x2="500" y2="100" stroke="#00C8DC" strokeWidth="2" opacity="0.3" />
        <line x1="600" y1="100" x2="650" y2="100" stroke="#00C8DC" strokeWidth="2" opacity="0.3" />
      </svg>
    </div>
  );
}

const metrics = [
  {
    icon: TrendingUp,
    label: "Aumenta aprovação de pagamentos",
  },
  {
    icon: DollarSign,
    label: "Reduz custos efetivos",
  },
  {
    icon: Shield,
    label: "Alta disponibilidade garantida",
  },
];

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Parallax effects suaves
  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, 50]
  );
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, -30]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.8]);

  // PRD 5.2: Detectar prefers-reduced-motion
  useEffect(() => {
    setIsMounted(true);
    
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // PRD v2.0: Lazy-load Canvas após 30% do Hero no viewport
  useEffect(() => {
    if (typeof window === 'undefined' || !heroRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(heroRef.current);

    return () => observer.disconnect();
  }, []);

  const showAnimations = !shouldReduceMotion && !prefersReducedMotion;

  return (
    <section
      ref={heroRef}
      className="relative min-h-[calc(100vh-4rem)] flex items-start justify-center overflow-hidden bg-gradient-to-b from-white via-slate-50 to-background dark:from-[#000000] dark:via-[#002A35]/20 dark:to-background"
    >
      {/* PRD 5.2: 3D Canvas ou fallback estático baseado em prefers-reduced-motion */}
      {prefersReducedMotion || shouldReduceMotion ? (
        <StaticPipelineFallback />
      ) : isVisible ? (
        <Suspense fallback={<HeroCanvasFallback />}>
          <HeroCanvas />
        </Suspense>
      ) : (
        <HeroCanvasFallback />
      )}

      {/* Animated background layers */}
      <motion.div
        className="absolute inset-0 will-change-transform overflow-hidden"
        style={{ y: backgroundY, opacity }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/50 to-transparent dark:from-[#000000]/80 dark:via-[#000000]/60 dark:to-transparent pointer-events-none" />

        {/* Animated gradient background */}
        {showAnimations && (
          <motion.div
            className="absolute inset-0 opacity-30 dark:opacity-20"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(0, 200, 220, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(0, 42, 53, 0.15) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, rgba(0, 200, 220, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 20%, rgba(0, 42, 53, 0.15) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, rgba(0, 200, 220, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(0, 42, 53, 0.15) 0%, transparent 50%)",
              ],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}

        {/* Grid pattern */}
        {showAnimations && (
          <motion.div
            className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,200,220,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,200,220,0.06)_1px,transparent_1px)] bg-[size:42px_42px] dark:opacity-[0.1] pointer-events-none will-change-[background-position]"
            animate={{
              backgroundPosition: ["0% 0%", "42px 42px"],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}

        {/* Floating gradient orbs - Enhanced */}
        {showAnimations && isMounted && [...Array(6)].map((_, i) => {
          const cosValue = Math.cos(i) * 30;
          const sinValue = Math.sin(i) * 20;
          return (
            <motion.div
              key={`orb-${i}`}
              className="absolute rounded-full blur-3xl will-change-transform"
              style={{
                width: 200 + i * 80,
                height: 200 + i * 80,
                left: `${10 + (i % 3) * 30}%`,
                top: `${10 + Math.floor(i / 3) * 40}%`,
                background: i % 2 === 0 
                  ? "radial-gradient(circle, rgba(0, 200, 220, 0.2), rgba(0, 212, 232, 0.1), transparent)"
                  : "radial-gradient(circle, rgba(0, 42, 53, 0.2), rgba(0, 200, 220, 0.1), transparent)",
              }}
              animate={{
                scale: [1, 1.2 + i * 0.05, 1],
                opacity: [0.1, 0.25 + i * 0.05, 0.1],
                x: [0, cosValue, 0],
                y: [0, sinValue, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 12 + i * 2,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeInOut",
              }}
            />
          );
        })}

        {/* Animated waves */}
        {showAnimations && [...Array(3)].map((_, i) => (
          <motion.div
            key={`wave-${i}`}
            className="absolute bottom-0 left-0 right-0 h-1/3 opacity-10 dark:opacity-5"
            style={{
              background: `linear-gradient(180deg, transparent, rgba(0, 200, 220, ${0.3 - i * 0.1}))`,
              clipPath: `polygon(0 ${100 - i * 10}%, 100% ${80 - i * 10}%, 100% 100%, 0% 100%)`,
            }}
            animate={{
              clipPath: [
                `polygon(0 ${100 - i * 10}%, 100% ${80 - i * 10}%, 100% 100%, 0% 100%)`,
                `polygon(0 ${90 - i * 10}%, 100% ${70 - i * 10}%, 100% 100%, 0% 100%)`,
                `polygon(0 ${100 - i * 10}%, 100% ${80 - i * 10}%, 100% 100%, 0% 100%)`,
              ],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
          />
        ))}


        {/* Light rays effect */}
        {showAnimations && (
          <motion.div
            className="absolute inset-0 opacity-5 dark:opacity-10"
            style={{
              background: "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(0, 200, 220, 0.1) 60deg, transparent 120deg, rgba(0, 212, 232, 0.1) 180deg, transparent 240deg, rgba(0, 200, 220, 0.1) 300deg, transparent 360deg)",
            }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}
      </motion.div>

      <motion.div
        ref={containerRef}
        style={{ y: contentY }}
        className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 md:pt-24 md:pb-16 lg:pt-32 lg:pb-20"
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Hero H1 */}
          <motion.h1 
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold font-[family-name:var(--font-poppins)] tracking-tight text-slate-900 dark:text-white mb-4 leading-[1.1] sm:leading-[1.15] md:leading-[1.2]"
            initial={showAnimations ? { opacity: 0, y: 30, filter: "blur(10px)" } : false}
            animate={showAnimations ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span className="block">Reduza custos e aumente</span>{" "}
            <motion.span 
              className="block text-transparent bg-clip-text bg-gradient-to-r from-[#002A35] via-[#00C8DC] to-[#002A35]"
              initial={showAnimations ? { opacity: 0, scale: 0.9 } : false}
              animate={showAnimations ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.8,
                  delay: 0.4,
                  ease: [0.22, 1, 0.36, 1],
              }}
            >
              aprovação de pagamentos
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="mx-auto mt-4 max-w-2xl text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed"
            initial={showAnimations ? { opacity: 0, y: 20 } : false}
            animate={showAnimations ? { opacity: 1, y: 0 } : {}}
                  transition={{
              duration: 0.6,
              delay: 0.5,
                    ease: [0.22, 1, 0.36, 1],
            }}
          >
            Reduza custos, aumente aprovação e tenha liquidação previsível com uma única integração.
          </motion.p>


          {/* CTA Buttons */}
                    <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6"
            initial={showAnimations ? { opacity: 0, y: 20 } : false}
            animate={showAnimations ? { opacity: 1, y: 0 } : {}}
                      transition={{
              duration: 0.6,
              delay: 0.7,
                    ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Button
              size="lg"
              variant="kodano"
              rounded="full"
              className="group"
              asChild
            >
              <Link href="/contato">
                Solicitar uma demonstração
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="kodano-outline"
              rounded="full"
              className="group"
              asChild
            >
              <Link href="/contato">
                Falar com vendas
              </Link>
            </Button>
          </motion.div>

          {/* Real-time Metrics */}
          <motion.div 
            className="mt-20 pt-8 border-t border-border/50"
            initial={showAnimations ? { opacity: 0, y: 30 } : false}
            whileInView={showAnimations ? { opacity: 1, y: 0 } : {}}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <motion.p 
              className="text-sm text-muted-foreground mb-8 text-center uppercase tracking-wider"
              initial={showAnimations ? { opacity: 0, y: 10 } : false}
              whileInView={showAnimations ? { opacity: 1, y: 0 } : {}}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              Plataforma SaaS de orquestração multiadquirente
            </motion.p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-3xl mx-auto">
              {metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={showAnimations ? { opacity: 0, y: 20, scale: 0.95 } : false}
                  whileInView={showAnimations ? { opacity: 1, y: 0, scale: 1 } : {}}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.5,
                    delay: showAnimations ? 0.3 + index * 0.1 : 0,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={showAnimations ? {
                    y: -6,
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 400, damping: 20 }
                  } : {}}
                  className="text-center group cursor-default h-full flex flex-col items-center justify-start"
                >
                  <motion.div 
                    className="flex items-center justify-center mb-3 flex-shrink-0"
                    whileHover={showAnimations ? {
                      scale: 1.2,
                      rotate: -10,
                      transition: { 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 15 
                      }
                    } : {}}
                  >
                    <motion.div
                      className="p-3 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors"
                      whileHover={showAnimations ? {
                        scale: 1.1,
                        transition: { type: "spring", stiffness: 300, damping: 15 }
                      } : {}}
                    >
                      <metric.icon className="h-6 w-6 text-accent" />
                    </motion.div>
                  </motion.div>
                  
                  <motion.p 
                    className="text-sm md:text-base text-muted-foreground font-medium flex-grow flex items-center justify-center min-h-[3rem]"
                    whileHover={showAnimations ? {
                      color: "hsl(var(--accent))",
                      transition: { duration: 0.2 }
                    } : {}}
                  >
                    {metric.label}
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Wave - simplificado */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
}
