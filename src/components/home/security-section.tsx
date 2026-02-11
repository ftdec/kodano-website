/**
 * SecuritySection Component
 * "A Solução" - Clean design with gradient transition
 * Kodano Bank - Emerald Premium
 */

"use client";

import { motion } from "framer-motion";
import { UserCheck, Clock, ShieldCheck, TrendingUp, Check, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

// Analytics helper
function trackEvent(eventName: string, data?: Record<string, string>) {
  if (typeof window !== 'undefined' && (window as typeof window & { gtag?: (command: string, eventName: string, data?: Record<string, string>) => void }).gtag) {
    (window as typeof window & { gtag: (command: string, eventName: string, data?: Record<string, string>) => void }).gtag('event', eventName, data);
  }
}

const features = [
  {
    title: "Verificação de identidade",
    description: "Confirmamos quem está pagando antes da aprovação.",
    icon: UserCheck,
  },
  {
    title: "Atuação pré-aprovação",
    description: "Agimos antes que a transação seja finalizada.",
    icon: Clock,
  },
  {
    title: "Menos fraude e contestação",
    description: "Redução de disputas e prejuízos na operação.",
    icon: ShieldCheck,
  },
  {
    title: "Infraestrutura escalável",
    description: "Camadas adicionais de governança e liquidez sob demanda.",
    icon: Layers,
    isLiquidity: true,
  },
];

const benefits = [
  "Segurança para alto valor",
  "Menos contestações",
  "Menos fraudes",
  "Escalável sob demanda",
];

interface SecuritySectionProps {
  className?: string;
}

export function SecuritySection({ className }: SecuritySectionProps) {
  return (
    <section
      id="solution"
      className={cn("relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 overflow-hidden", className)}
    >
      {/* Background gradient - transitions to next section */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-100/20 via-background to-secondary/20" />
      </div>

      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
          
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 rounded-full bg-white/80 border border-border/60 mb-4 sm:mb-6">
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400" />
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.35em] text-muted-foreground">
                A Solução
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4 sm:mb-6">
              A Kodano adiciona{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">
                segurança
              </span>{" "}
              ao pagamento
            </h2>

            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0">
              Atuamos no momento da aprovação, verificando a identidade do pagador. 
              Isso reduz riscos e dá mais tranquilidade para vender valores elevados.
            </p>

            {/* Benefits */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/80 border border-border/40"
                >
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                  <span className="text-xs sm:text-sm font-medium text-foreground">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Feature cards */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isLiquidity = 'isLiquidity' in feature && feature.isLiquidity;

              const CardWrapper = isLiquidity ? 'a' : 'div';
              const cardProps = isLiquidity ? {
                href: '#contact',
                onClick: () => trackEvent('liquidez_interest_click', { source: 'security_section' }),
              } : {};

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <CardWrapper 
                    {...cardProps}
                    className={cn(
                      "block h-full p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/90 border border-border/40 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300",
                      isLiquidity && "cursor-pointer group"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-400/5 flex items-center justify-center mb-3 sm:mb-4",
                      isLiquidity && "group-hover:from-emerald-500/20 group-hover:to-emerald-400/10 transition-all"
                    )}>
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>

                    <h3 className="text-sm sm:text-base font-semibold text-foreground mb-1 sm:mb-2">
                      {feature.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>

                    {isLiquidity && (
                      <p className="text-xs text-primary mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        Saiba mais →
                      </p>
                    )}
                  </CardWrapper>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
