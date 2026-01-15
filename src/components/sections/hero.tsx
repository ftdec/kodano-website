"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, TrendingUp, DollarSign } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

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
    gradient: "from-primary/20 to-accent/20",
    iconColor: "text-primary",
  },
  {
    icon: DollarSign,
    label: "Reduz custos efetivos",
    gradient: "from-accent/20 to-primary/20",
    iconColor: "text-accent",
  },
  {
    icon: Shield,
    label: "Alta disponibilidade garantida",
    gradient: "from-primary/20 via-accent/20 to-primary/20",
    iconColor: "text-primary",
  },
];

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  const showAnimations = !shouldReduceMotion;

  return (
    <section
      ref={heroRef}
      className="relative min-h-[calc(100vh-4rem)] flex items-start justify-center overflow-hidden bg-gradient-to-b from-white via-slate-50 to-background dark:from-[#000000] dark:via-[#002A35]/20 dark:to-background"
    >
      {/* Static fallback for better performance */}
        <StaticPipelineFallback />

      {/* Background layers */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/50 to-transparent dark:from-[#000000]/80 dark:via-[#000000]/60 dark:to-transparent pointer-events-none" />

        {/* Static gradient background - Better performance */}
        {showAnimations && (
          <div
            className="absolute inset-0 opacity-25 dark:opacity-15"
            style={{
              background: "radial-gradient(circle at 30% 50%, rgba(0, 200, 220, 0.12) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(0, 42, 53, 0.12) 0%, transparent 50%)",
            }}
          />
        )}

        {/* Grid pattern - Static for better performance */}
        {showAnimations && (
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,200,220,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,200,220,0.04)_1px,transparent_1px)] bg-[size:42px_42px] dark:opacity-[0.08] pointer-events-none"
          />
        )}

        {/* Background effects removed for better performance */}


      </div>

      <div
        ref={containerRef}
        className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 md:pt-24 md:pb-16 lg:pt-32 lg:pb-20"
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Hero H1 */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold font-[family-name:var(--font-poppins)] tracking-tight mb-4 leading-[1.1] sm:leading-[1.15] md:leading-[1.2]">
            <span className="block text-slate-900 dark:text-slate-50">Reduza custos e aumente</span>{" "}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#002A35] via-[#00A6B4] to-[#002A35] bg-[length:200%_100%] animate-gradient">
              aprovação de pagamentos
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-4 max-w-2xl text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
            Reduza custos, aumente aprovação e tenha liquidação previsível com uma única integração.
          </p>


          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
            <Button
              size="lg"
              variant="kodano"
              rounded="full"
              className="group"
              asChild
            >
              <Link href="/fale-conosco">
                Fale Conosco
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* Real-time Metrics */}
          <div className="mt-24 pt-12 border-t border-border/50">
            <p className="text-xs md:text-sm text-muted-foreground mb-12 text-center uppercase tracking-wider font-semibold">
              Infraestrutura de pagamentos com tecnologia avançada
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
              {metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 1, y: 0, scale: 1 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 400, damping: 25 }
                  }}
                  className="text-center group cursor-default flex flex-col items-center justify-center"
                >
                  <motion.div 
                    className="flex items-center justify-center mb-6 flex-shrink-0"
                    whileHover={{
                      scale: 1.2,
                      rotate: [0, -10, 10, -10, 0],
                      transition: { 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 15,
                        duration: 0.5
                      }
                    }}
                  >
                    <motion.div
                      className={`flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br ${metric.gradient} shadow-lg group-hover:shadow-xl relative overflow-hidden`}
                      whileHover={{
                        scale: 1.1,
                        transition: { type: "spring", stiffness: 300, damping: 15 }
                      }}
                    >
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/40 via-primary/30 to-accent/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-sm" />
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                      <metric.icon className={`h-7 w-7 ${metric.iconColor} relative z-10`} />
                    </motion.div>
                  </motion.div>
                  
                  <p className="text-base md:text-lg text-slate-900 dark:text-slate-50 font-bold leading-tight">
                    {metric.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

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
