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
        <rect x="50" y="75" width="100" height="50" rx="8" fill="#00A6B4" opacity="0.2" />
        <text x="100" y="105" textAnchor="middle" fill="#00A6B4" fontSize="12" fontWeight="600">Pedido</text>

        <rect x="200" y="75" width="100" height="50" rx="8" fill="#00A6B4" opacity="0.2" />
        <text x="250" y="105" textAnchor="middle" fill="#00A6B4" fontSize="12" fontWeight="600">Tokenização</text>

        <rect x="350" y="75" width="100" height="50" rx="8" fill="#00A6B4" opacity="0.2" />
        <text x="400" y="105" textAnchor="middle" fill="#00A6B4" fontSize="12" fontWeight="600">Antifraude</text>

        <rect x="500" y="75" width="100" height="50" rx="8" fill="#00A6B4" opacity="0.2" />
        <text x="550" y="105" textAnchor="middle" fill="#00A6B4" fontSize="12" fontWeight="600">Autorização</text>

        <rect x="650" y="75" width="100" height="50" rx="8" fill="#00A6B4" opacity="0.2" />
        <text x="700" y="105" textAnchor="middle" fill="#00A6B4" fontSize="12" fontWeight="600">Liquidação</text>

        {/* Connection lines */}
        <line x1="150" y1="100" x2="200" y2="100" stroke="#00A6B4" strokeWidth="2" opacity="0.3" />
        <line x1="300" y1="100" x2="350" y2="100" stroke="#00A6B4" strokeWidth="2" opacity="0.3" />
        <line x1="450" y1="100" x2="500" y2="100" stroke="#00A6B4" strokeWidth="2" opacity="0.3" />
        <line x1="600" y1="100" x2="650" y2="100" stroke="#00A6B4" strokeWidth="2" opacity="0.3" />
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
  const [isLogoHovered, setIsLogoHovered] = useState(false);
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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const showAnimations = !shouldReduceMotion && !prefersReducedMotion;

  return (
    <section
      ref={heroRef}
      className="relative min-h-[calc(100vh-4rem)] flex items-start justify-center overflow-hidden bg-gradient-to-b from-white via-slate-50 to-background dark:from-[#0A0A0F] dark:via-[#003E4E]/20 dark:to-background"
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
        className="absolute inset-0 will-change-transform"
        style={{ y: backgroundY, opacity }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/50 to-transparent dark:from-[#0A0A0F]/80 dark:via-[#0A0A0F]/60 dark:to-transparent pointer-events-none" />

        {/* Grid pattern */}
        {showAnimations && (
          <motion.div
            className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,166,180,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,166,180,0.06)_1px,transparent_1px)] bg-[size:42px_42px] dark:opacity-[0.1] pointer-events-none will-change-[background-position]"
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

        {/* Floating gradient orbs */}
        {showAnimations && [...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-accent/10 to-primary/10 blur-3xl will-change-transform"
            style={{
              width: 300 + i * 100,
              height: 300 + i * 100,
              left: `${20 + i * 20}%`,
              top: `${15 + (i % 2) * 40}%`,
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.1, 0.2, 0.1],
              x: [0, 20, 0],
              y: [0, -15, 0],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 1,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      <motion.div
        ref={containerRef}
        style={{ y: contentY }}
        className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-12 md:pt-4 md:pb-16 lg:pt-6 lg:pb-20"
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 group cursor-default">
            <Shield className="w-4 h-4 mr-2 text-[#00A6B4]" />
            <span className="text-sm font-medium text-foreground">
              Certificação PCI DSS
            </span>
          </div>

          {/* Hero H1 */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold font-[family-name:var(--font-poppins)] tracking-tight text-slate-900 dark:text-white mb-4 leading-tight">
            Reduza custos e aumente{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#003E4E] via-[#00A6B4] to-[#003E4E]">
              aprovação de pagamentos
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-4 max-w-2xl text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
            Reduza custos, aumente aprovação e tenha liquidação previsível com uma única integração.
          </p>

          {/* Logo Kodano - Animado Premium */}
          <motion.div
            className="flex justify-center items-center mb-8"
            initial={showAnimations ? { opacity: 0 } : false}
            animate={showAnimations ? { opacity: 1 } : {}}
            transition={{
              duration: 1.2,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.div
              className="relative flex items-center gap-4 group"
              initial={showAnimations ? { 
                y: 40,
                scale: 0.7,
                rotateY: -20,
                rotateX: 10,
              } : false}
              animate={showAnimations ? {
                y: isLogoHovered ? 0 : [0, -12, 0],
                scale: 1,
                rotateY: 0,
                rotateX: 0,
              } : {}}
              onHoverStart={() => setIsLogoHovered(true)}
              onHoverEnd={() => setIsLogoHovered(false)}
              transition={{
                y: {
                  duration: isLogoHovered ? 0.3 : 6,
                  repeat: isLogoHovered ? 0 : Infinity,
                  ease: [0.4, 0, 0.6, 1],
                },
                scale: {
                  duration: 1.2,
                  delay: 0.4,
                  ease: [0.34, 1.56, 0.64, 1],
                },
                rotateY: {
                  duration: 1.5,
                  delay: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                },
                rotateX: {
                  duration: 1.5,
                  delay: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
            >
              {/* Camadas de brilho em múltiplas direções */}
              {showAnimations && [...Array(4)].map((_, i) => (
                <motion.div
                  key={`glow-${i}`}
                  animate={{
                    scale: [1, 1.4 + i * 0.1, 1],
                    opacity: [0.2 + i * 0.1, 0.5 + i * 0.15, 0.2 + i * 0.1],
                    rotate: [0, 90 * (i + 1), 360],
                    x: [0, Math.cos(i * Math.PI / 2) * 10, 0],
                    y: [0, Math.sin(i * Math.PI / 2) * 10, 0],
                  }}
                  transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                  className={`absolute inset-0 rounded-full blur-2xl ${
                    i % 2 === 0 
                      ? "bg-gradient-to-br from-[#00A6B4]/30 to-[#003E4E]/30" 
                      : "bg-gradient-to-tr from-[#003E4E]/25 to-[#00A6B4]/25"
                  }`}
                  style={{ zIndex: -i - 1 }}
                />
              ))}
              
              {/* Ondas de energia */}
              {showAnimations && [...Array(3)].map((_, i) => (
                <motion.div
                  key={`wave-${i}`}
                  className="absolute inset-0 rounded-full border-2 border-[#00A6B4]/20"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: [0.8, 1.5 + i * 0.3, 2],
                    opacity: [0.6, 0.3, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 1,
                    ease: "easeOut",
                  }}
                  style={{ zIndex: -5 }}
                />
              ))}
              
              {/* Container do logo com efeitos avançados */}
              <motion.div
                className="relative w-14 h-14 md:w-16 md:h-16 shrink-0 flex items-center justify-center"
                initial={showAnimations ? {
                  rotate: -360,
                  scale: 0,
                  rotateX: -90,
                } : false}
                animate={showAnimations && !isLogoHovered ? {
                  rotate: 0,
                  scale: 1,
                  rotateX: 0,
                } : showAnimations ? {
                  scale: 1.1,
                  rotate: 0,
                  rotateX: 0,
                } : {}}
                transition={{
                  rotate: {
                    duration: 2,
                    delay: 0.6,
                    ease: [0.34, 1.56, 0.64, 1],
                  },
                  scale: {
                    duration: 0.3,
                    ease: "easeOut",
                  },
                  rotateX: {
                    duration: 1.2,
                    delay: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }}
                style={{ willChange: showAnimations ? "transform" : "auto" }}
              >
                {/* Brilho interno em camadas - pausado no hover */}
                {showAnimations && !isLogoHovered && [...Array(2)].map((_, i) => (
                  <motion.div
                    key={`inner-glow-${i}`}
                    animate={{
                      scale: [1, 1.2 + i * 0.1, 1],
                      opacity: [0.5 + i * 0.2, 1, 0.5 + i * 0.2],
                      rotate: [0, 360 * (i % 2 === 0 ? 1 : -1)],
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.5,
                    }}
                    className={`absolute inset-0 rounded-full blur-lg ${
                      i === 0 
                        ? "bg-gradient-to-br from-[#00A6B4]/50 to-[#003E4E]/50"
                        : "bg-gradient-to-tl from-[#003E4E]/40 to-[#00A6B4]/40"
                    }`}
                  />
                ))}
                
                {/* Múltiplas sombras animadas - pausadas no hover */}
                {showAnimations && !isLogoHovered && [...Array(2)].map((_, i) => (
                  <motion.div
                    key={`shadow-${i}`}
                    animate={{
                      scale: [1, 1.15 + i * 0.05, 1],
                      opacity: [0.3 + i * 0.2, 0.6 + i * 0.2, 0.3 + i * 0.2],
                      y: [0, 2 + i * 2, 0],
                    }}
                    transition={{
                      duration: 2.5 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3,
                    }}
                    className={`absolute left-1/2 -translate-x-1/2 rounded-full bg-[#00A6B4]/30 blur-md ${
                      i === 0 ? "w-3/4 h-3 -bottom-2" : "w-full h-4 -bottom-3"
                    }`}
                  />
                ))}
                
                {/* Logo com efeito de profundidade */}
                <motion.div
                  className="relative z-10"
                  animate={showAnimations && !isLogoHovered ? {
                    y: [0, -2, 0],
                  } : {}}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    filter: "drop-shadow(0 10px 20px rgba(0, 166, 180, 0.3))",
                    willChange: showAnimations ? "transform" : "auto",
                  }}
                >
                  <Image
                    src="/kodano-logo.png"
                    alt="Kodano"
                    width={64}
                    height={64}
                    className="object-contain brightness-110 contrast-125 filter"
                    priority
                  />
                </motion.div>
                
                {/* Efeito de partículas ao redor do logo - pausado no hover */}
                {showAnimations && !isLogoHovered && [...Array(4)].map((_, i) => {
                  const angle = (i / 4) * Math.PI * 2;
                  return (
                    <motion.div
                      key={`particle-${i}`}
                      className="absolute w-1 h-1 rounded-full bg-[#00A6B4]"
                      initial={{
                        x: 0,
                        y: 0,
                        opacity: 0,
                        scale: 0,
                      }}
                      animate={{
                        x: [0, Math.cos(angle) * 20, 0],
                        y: [0, Math.sin(angle) * 20, 0],
                        opacity: [0, 0.8, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.4,
                        ease: "easeInOut",
                      }}
                      style={{
                        left: "50%",
                        top: "50%",
                        boxShadow: "0 0 6px rgba(0, 166, 180, 0.6)",
                        willChange: "transform",
                      }}
                    />
                  );
                })}
              </motion.div>
              
              {/* Texto Kodano com efeitos premium */}
              <motion.span
                className="text-2xl md:text-3xl font-bold tracking-tight font-[family-name:var(--font-poppins)] text-transparent bg-clip-text bg-gradient-to-r from-[#003E4E] via-[#00A6B4] to-[#003E4E] bg-[length:200%_100%] relative z-10"
                initial={showAnimations ? {
                  opacity: 0,
                  x: -30,
                  filter: "blur(15px)",
                  scale: 0.8,
                } : false}
                animate={showAnimations ? {
                  opacity: 1,
                  x: 0,
                  filter: "blur(0px)",
                  scale: isLogoHovered ? 1.05 : 1,
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                } : {}}
                transition={{
                  opacity: {
                    duration: 1,
                    delay: 1.2,
                    ease: "easeOut",
                  },
                  x: {
                    duration: 1,
                    delay: 1.2,
                    ease: [0.22, 1, 0.36, 1],
                  },
                  filter: {
                    duration: 1,
                    delay: 1.2,
                    ease: "easeOut",
                  },
                  scale: {
                    duration: 0.2,
                    ease: "easeOut",
                  },
                  backgroundPosition: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
                style={{
                  textShadow: "0 0 20px rgba(0, 166, 180, 0.3)",
                  willChange: showAnimations ? "transform" : "auto",
                  letterSpacing: isLogoHovered ? "0.05em" : "normal",
                }}
              >
                Kodano
              </motion.span>
              
              {/* Partículas decorativas orbitais - pausadas no hover */}
              {showAnimations && !isLogoHovered && [...Array(5)].map((_, i) => {
                const radius = 45 + (i % 2) * 10;
                return (
                  <motion.div
                    key={`orbital-${i}`}
                    className="absolute w-1 h-1 rounded-full"
                    animate={{
                      x: [
                        Math.cos((i / 5) * Math.PI * 2) * radius,
                        Math.cos((i / 5) * Math.PI * 2 + Math.PI) * radius,
                        Math.cos((i / 5) * Math.PI * 2 + Math.PI * 2) * radius,
                      ],
                      y: [
                        Math.sin((i / 5) * Math.PI * 2) * radius,
                        Math.sin((i / 5) * Math.PI * 2 + Math.PI) * radius,
                        Math.sin((i / 5) * Math.PI * 2 + Math.PI * 2) * radius,
                      ],
                      opacity: [0, 0.8, 0.5, 0.8, 0],
                      scale: [0, 1, 0.7, 1, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeInOut",
                    }}
                    style={{
                      left: "50%",
                      top: "50%",
                      background: `radial-gradient(circle, rgba(0, 166, 180, ${0.7 - i * 0.1}), transparent)`,
                      boxShadow: "0 0 4px rgba(0, 166, 180, 0.5)",
                      willChange: "transform",
                    }}
                  />
                );
              })}
            </motion.div>
          </motion.div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
            <Button
              size="lg"
              className="text-base px-8 group bg-[#053B3F] hover:bg-[#00A6B4] text-white transition-all duration-300 rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-accent/30"
              asChild
            >
              <Link href="/contato">
                Solicitar uma demonstração
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="text-base px-8 group border-[#053B3F] hover:bg-accent/10 hover:border-[#00A6B4] hover:text-[#00A6B4] transition-all duration-300 rounded-full text-[#053B3F] dark:text-white dark:hover:text-accent backdrop-blur-sm"
              asChild
            >
              <Link href="/contato">
                Falar com vendas
              </Link>
            </Button>
          </div>

          {/* Real-time Metrics */}
          <motion.div 
            className="mt-20 pt-8 border-t border-border/50"
            initial={showAnimations ? { opacity: 0 } : false}
            whileInView={showAnimations ? { opacity: 1 } : {}}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <motion.p 
              className="text-sm text-muted-foreground mb-8 text-center uppercase tracking-wider"
              initial={showAnimations ? { opacity: 0, y: 10 } : false}
              whileInView={showAnimations ? { opacity: 1, y: 0 } : {}}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
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
