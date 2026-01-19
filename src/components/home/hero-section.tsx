/**
 * HeroSection Component
 * Premium hero with advanced animations
 * Stripe/CloudWalk inspired design
 */

"use client";

import { FadeInView, TextReveal, TextRevealGradient } from "@/components/animations";
import { AdvancedButton, ButtonGroup } from "@/components/animations/advanced-button";
import { ScrollIndicator } from "@/components/animations";
import { useIsMobile, useReducedMotion } from "@/lib/animations/hooks";
import { cn } from "@/lib/utils";
import { PaymentCardAnimation } from "@/components/home/PaymentCardAnimation";

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  return (
    <section
      className={cn(
        "relative min-h-[90vh] flex items-center justify-center pt-24 pb-32 px-6 overflow-hidden",
        className
      )}
    >
      {/* Lightweight gradient background (no canvas, no blur) */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[#4FACFE]/8 via-[#00DBDE]/6 to-[#43E97B]/8" />
      
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 -z-10 pointer-events-none bg-gradient-to-b from-transparent via-background/20 to-background/60" />

      {/* Signature rail (disabled for performance - static gradient only) */}
      {/* <KodanoFlowRail className="-z-10 opacity-45" enabled /> */}

      {/* Content */}
      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Left: Copy */}
          <div className="lg:col-span-6 text-center lg:text-left">
        {/* Badge */}
        <FadeInView className="flex justify-center lg:justify-start mb-8" delay={0.05} margin="-20px">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-border/40 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-sm font-medium text-muted-foreground">
              Segurança proporcional ao valor da transação
            </span>
          </div>
        </FadeInView>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.05] text-balance">
          <TextReveal
            as="span"
            text="Mais segurança para"
            className="inline-block"
            delay={0.08}
            staggerDelay={0.04}
          />
          <br className="hidden md:block" />
          <TextRevealGradient
            as="span"
            text="pagamentos de alto valor"
            className="inline-block"
            delay={0.18}
            staggerDelay={0.04}
            gradient="from-[#4FACFE] via-[#00DBDE] to-[#43E97B]"
          />
        </h1>

        {/* Subtitle */}
        <FadeInView delay={0.25} className="mb-12">
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance">
            A Kodano participa do fluxo de pagamento para trazer mais segurança a transações de alto valor, confirmando a identidade de quem está pagando antes da aprovação.
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
              Falar com a Kodano
            </AdvancedButton>
            <AdvancedButton
              href="#process"
              variant="outline"
              size="lg"
              shimmer={false}
              ripple={!prefersReducedMotion}
              className="rounded-full bg-white/80"
            >
              Como funciona
            </AdvancedButton>
          </ButtonGroup>
        </FadeInView>
          </div>

          {/* Right: Payment Processing Animation (desktop only) */}
          <div className="hidden lg:flex lg:col-span-6 items-center justify-center">
            <PaymentCardAnimation />
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
