/**
 * HeroSection Component
 * Premium hero with advanced animations
 * Stripe/CloudWalk inspired design
 */

"use client";

import { useState, useEffect } from "react";
import { FadeInView, TextReveal, TextRevealGradient } from "@/components/animations";
import { AdvancedButton, ButtonGroup } from "@/components/animations/advanced-button";
import { CursorSpotlight, GradientMesh, GradientMeshSimple, ScrollIndicator } from "@/components/animations";
import { KodanoAuroraBackground } from "@/components/animations/kodano-aurora-background";
import { useIsLowEndDevice, useIsMobile, useReducedMotion } from "@/lib/animations/hooks";
import { cn } from "@/lib/utils";
import { KodanoFlowRail } from "@/components/home/kodano-flow-rail";
import { useScroll } from "framer-motion";
import { PremiumCardAnimation } from "@/components/home/PremiumCardAnimation";

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const isLowEnd = useIsLowEndDevice();
  const { scrollYProgress } = useScroll();

  // Prevent hydration mismatch by only enabling heavy effects on client
  const [heavyEffectsEnabled, setHeavyEffectsEnabled] = useState(false);

  useEffect(() => {
    setHeavyEffectsEnabled(!prefersReducedMotion && !isMobile && !isLowEnd);
  }, [prefersReducedMotion, isMobile, isLowEnd]);

  return (
    <section
      className={cn(
        "relative min-h-[90vh] flex items-center justify-center pt-24 pb-32 px-6 overflow-hidden",
        className
      )}
    >
      {/* Super elegant Aurora Background - smooth, colorful, chique */}
      <KodanoAuroraBackground
        className="absolute inset-0 -z-20"
        intensity={heavyEffectsEnabled ? "medium" : "subtle"}
      />

      {/* Subtle overlays for depth/legibility */}
      <div className="absolute inset-0 -z-10 pointer-events-none bg-gradient-to-b from-background/0 via-background/25 to-background/70" />
      {!isLowEnd && (
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 -z-10 w-[820px] h-[820px] rounded-full bg-[#4FACFE]/10 blur-[90px]" />
      )}

      {/* Signature rail (advanced but cheap; auto-disables pulses on low-end/reduced-motion) */}
      <KodanoFlowRail className="-z-10 opacity-45" enabled />

      {/* Spotlight follows cursor (desktop only; auto-disabled on mobile/reduced-motion) */}
      {heavyEffectsEnabled && (
        <CursorSpotlight
          position="absolute"
          className="z-0"
          size={620}
          opacity={0.10}
          blur={60}
          color="rgba(79, 172, 254, 0.22)"
        />
      )}

      {/* Content */}
      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Left: Copy */}
          <div className="lg:col-span-6 text-center lg:text-left">
        {/* Badge */}
        <FadeInView className="flex justify-center lg:justify-start mb-8" delay={0.05} margin="-20px">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-border/60 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">
              Subadquirente Digital com Tecnologia Avançada
            </span>
          </div>
        </FadeInView>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.05] text-balance">
          <TextReveal
            as="span"
            text="Pagamentos inteligentes"
            className="inline-block"
            delay={0.08}
            staggerDelay={0.04}
          />
          <br className="hidden md:block" />
          <TextRevealGradient
            as="span"
            text="para empresas modernas"
            className="inline-block"
            delay={0.18}
            staggerDelay={0.04}
            gradient="from-[#4FACFE] via-[#00DBDE] to-[#43E97B]"
          />
        </h1>

        {/* Subtitle */}
        <FadeInView delay={0.25} className="mb-12">
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance">
            Maximize aprovação, reduza custos e tenha controle total com APIs modernas e
            orquestração inteligente de funcionalidades.
          </p>
        </FadeInView>

        {/* CTAs */}
        <FadeInView delay={0.35} margin="-40px">
          <ButtonGroup className="flex flex-col sm:flex-row items-center justify-center lg:justify-start flex-wrap" gap={4} stagger={0.08}>
            <AdvancedButton
              href="#contact"
              variant="primary"
              size="lg"
              shimmer={!prefersReducedMotion}
              ripple={!prefersReducedMotion}
              className="rounded-full"
            >
              Fale com o Kodano
            </AdvancedButton>
            <AdvancedButton
              href="#process"
              variant="outline"
              size="lg"
              shimmer={false}
              ripple={!prefersReducedMotion}
              className="rounded-full bg-white/50 backdrop-blur-md"
            >
              Conheça nosso processo
            </AdvancedButton>
          </ButtonGroup>
        </FadeInView>
          </div>

          {/* Right: Premium Card Animation (desktop only) */}
          <div className="hidden lg:block lg:col-span-6">
            <PremiumCardAnimation />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {!isMobile && (
        <ScrollIndicator
          variant="mouse"
          text="Role para descobrir"
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        />
      )}
    </section>
  );
}
