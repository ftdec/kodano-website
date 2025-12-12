/**
 * HeroSection Component
 * Premium hero with advanced animations
 * Stripe/CloudWalk inspired design
 */

"use client";

import { FadeInView, TextReveal, TextRevealGradient } from "@/components/animations";
import { AdvancedButton, ButtonGroup } from "@/components/animations/advanced-button";
import { CursorSpotlight, GradientMesh, GradientMeshSimple, ScrollIndicator } from "@/components/animations";
import { useIsLowEndDevice, useIsMobile, useReducedMotion } from "@/lib/animations/hooks";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const isLowEnd = useIsLowEndDevice();
  const heavyEffectsEnabled = !prefersReducedMotion && !isMobile && !isLowEnd;

  return (
    <section
      className={cn(
        "relative min-h-[90vh] flex items-center justify-center pt-24 pb-32 px-6 overflow-hidden",
        className
      )}
    >
      {/* Premium Background (paleta atual) */}
      {heavyEffectsEnabled ? (
        <GradientMesh
          className="absolute inset-0 -z-20 opacity-85"
          colors={["#4FACFE", "#00DBDE", "#43E97B", "#415A77"]}
          speed={0.22}
        />
      ) : (
        <GradientMeshSimple
          className="absolute inset-0 -z-20 opacity-85"
          colors={["#4FACFE", "#00DBDE", "#43E97B", "#415A77"]}
        />
      )}

      {/* Subtle overlays for depth/legibility */}
      <div className="absolute inset-0 -z-10 pointer-events-none bg-gradient-to-b from-background/0 via-background/25 to-background/70" />
      {!isLowEnd && (
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 -z-10 w-[820px] h-[820px] rounded-full bg-[#4FACFE]/10 blur-[90px]" />
      )}

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
      <div className="container max-w-5xl mx-auto relative z-10 text-center">
        {/* Badge */}
        <FadeInView className="flex justify-center mb-8" delay={0.05} margin="-20px">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-border/60 backdrop-blur-xl">
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
          <ButtonGroup className="flex flex-col sm:flex-row items-center justify-center flex-wrap" gap={4} stagger={0.08}>
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
              className="rounded-full bg-white/50 backdrop-blur-xl"
            >
              Conheça nosso processo
            </AdvancedButton>
          </ButtonGroup>
        </FadeInView>
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
