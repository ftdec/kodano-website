"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Zap, Shield, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import dynamic from "next/dynamic";
import { Suspense, useState, useEffect, useRef, useMemo } from "react";

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

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[calc(100vh-4rem)] flex items-start justify-center overflow-hidden bg-gradient-to-b from-white via-slate-50 to-background dark:from-[#0A0A0F] dark:via-[#003E4E]/20 dark:to-background"
    >
      {/* PRD 5.2: 3D Canvas ou fallback estático baseado em prefers-reduced-motion */}
      {prefersReducedMotion ? (
        <StaticPipelineFallback />
      ) : isVisible ? (
        <Suspense fallback={<HeroCanvasFallback />}>
          <HeroCanvas />
        </Suspense>
      ) : (
        <HeroCanvasFallback />
      )}

      {/* PRD 5.2: Véu/overlay para legibilidade (from-white/70 via-white/45 to-transparent) */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/45 to-transparent dark:from-[#0A0A0F]/70 dark:via-[#0A0A0F]/55 dark:to-transparent pointer-events-none" />

      {/* Grid sutil no plano inferior */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] bg-[size:42px_42px] opacity-[0.18] dark:opacity-[0.12] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 md:pt-10 md:pb-16 lg:pt-12 lg:pb-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge - above the fold: padding e margin reduzidos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-3"
          >
            <Shield className="w-4 h-4 mr-2 text-[#00A6B4]" />
            <span className="text-sm font-medium text-foreground">
              Certificação PCI DSS
            </span>
          </motion.div>

          {/* PRD 15: Hero H1 - Above the fold: margens mínimas */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-6xl font-extrabold font-[family-name:var(--font-poppins)] tracking-tight text-slate-900 dark:text-white mb-3 leading-tight"
          >
            Infraestrutura de pagamentos B2B{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#003E4E] via-[#00A6B4] to-[#003E4E] animate-gradient">
              que move seu negócio
            </span>
          </motion.h1>

          {/* PRD 15: Subtitle - Above the fold: margens mínimas */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-2 max-w-2xl text-lg text-slate-600 dark:text-slate-300 mb-4"
          >
            APIs rápidas, compliance bancário e performance escalável.
          </motion.p>

          {/* CTA Buttons - Above the fold: margens mínimas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4"
          >
            <Button
              size="lg"
              className="text-base px-8 group bg-[#003E4E] hover:bg-[#00A6B4] text-white transition-all duration-300"
              asChild
            >
              <Link href="/contato">
                Solicitar demonstração
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base px-8 group border-white/20 hover:bg-white/10 hover:border-[#00A6B4] transition-all duration-300"
              asChild
            >
              <Link href="/desenvolvedores">
                <FileText className="mr-2 h-5 w-5" />
                Ver documentação técnica
              </Link>
            </Button>
          </motion.div>

          {/* Real-time Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 pt-8 border-t border-border"
          >
            <p className="text-sm text-muted-foreground mb-6 text-center">
              Infraestrutura de pagamentos confiável e escalável
            </p>
            <div className="grid grid-cols-3 gap-8 md:gap-12 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Zap className="h-5 w-5 text-accent mr-2" />
                  <span className="text-2xl md:text-3xl font-bold text-foreground">
                    <AnimatedCounter end={150} suffix="ms" decimals={0} duration={2} />
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Latência média</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Shield className="h-5 w-5 text-accent mr-2" />
                  <span className="text-2xl md:text-3xl font-bold text-foreground">
                    <AnimatedCounter end={99.99} suffix="%" decimals={2} duration={2} />
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Uptime SLA</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-5 w-5 text-accent mr-2" />
                  <span className="text-2xl md:text-3xl font-bold text-foreground">
                    <AnimatedCounter end={10} suffix="M+" decimals={0} duration={2} />
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Transações/mês</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
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
