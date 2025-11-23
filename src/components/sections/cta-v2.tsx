/**
 * CTA Section v2.0
 * Stripe-level call-to-action sections with advanced animations
 */

"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Sparkles,
  CheckCircle,
  Zap,
  Shield,
  TrendingUp,
  Users,
  Mail,
  Phone,
  MessageCircle,
  Calendar,
  ExternalLink,
  Rocket,
  Star,
} from "lucide-react";
import { easings, durations } from "@/lib/design-system/motion";
import { SectionContainer } from "./section-wrapper";
import { Button } from "@/components/ui/button-v2";

// ============================================================================
// ANIMATED BACKGROUND
// ============================================================================

function AnimatedBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Gradient mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />

      {/* Animated orbs */}
      <motion.div
        style={{ y: y1 }}
        className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-gradient-to-br from-accent/20 to-transparent blur-3xl"
      />
      <motion.div
        style={{ y: y2, rotate }}
        className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl"
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(65, 90, 119, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(65, 90, 119, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  );
}

// ============================================================================
// BENEFIT PILL COMPONENT
// ============================================================================

interface BenefitPillProps {
  icon: React.ReactNode;
  text: string;
  delay?: number;
}

function BenefitPill({ icon, text, delay = 0 }: BenefitPillProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay,
        duration: durations.normal,
        ease: easings.spring,
      }}
      whileHover={{ scale: 1.05 }}
      className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 backdrop-blur-sm"
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      >
        {icon}
      </motion.div>
      <span className="text-sm font-medium text-accent">{text}</span>
    </motion.div>
  );
}

// ============================================================================
// CONTACT CARD COMPONENT
// ============================================================================

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  href: string;
  index: number;
}

function ContactCard({ icon, title, description, action, href, index }: ContactCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.1,
        duration: durations.normal,
        ease: easings.emphasized,
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all hover:shadow-lg"
    >
      {/* Glow effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          animate={isHovered ? { scale: 1.1, rotate: 5 } : {}}
          transition={{ type: "spring", stiffness: 400 }}
          className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10"
        >
          {icon}
        </motion.div>

        {/* Content */}
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        <p className="mb-4 text-sm text-muted-foreground">{description}</p>

        {/* Action */}
        <motion.div
          className="flex items-center gap-2 text-sm font-medium text-accent"
          animate={isHovered ? { x: 5 } : { x: 0 }}
        >
          {action}
          <ArrowRight className="h-4 w-4" />
        </motion.div>
      </div>
    </motion.a>
  );
}

// ============================================================================
// FLOATING METRICS
// ============================================================================

function FloatingMetrics() {
  // Métricas removidas - não podemos exibir informações falsas
  return null;
}

// ============================================================================
// MAIN CTA VARIANTS
// ============================================================================

interface SimpleCTAProps {
  title: string;
  description: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
}

function SimpleCTA({ title, description, primaryCTA, secondaryCTA }: SimpleCTAProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: durations.slow, ease: easings.emphasized }}
      className="relative mx-auto max-w-3xl text-center"
    >
      <FloatingMetrics />

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1 }}
        className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl"
      >
        {title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2 }}
        className="mb-8 text-lg text-muted-foreground"
      >
        {description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3 }}
        className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
      >
        <Link href={primaryCTA.href}>
          <Button
            size="lg"
            variant="kodano"
            className="group"
          >
            {primaryCTA.label}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>

        {secondaryCTA && (
          <Link href={secondaryCTA.href}>
            <Button
              size="lg"
              variant="outline"
              className="group"
            >
              {secondaryCTA.label}
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        )}
      </motion.div>

      {/* Benefit pills */}
      <div className="mt-12 flex flex-wrap justify-center gap-3">
        <BenefitPill
          icon={<CheckCircle className="h-4 w-4 text-green-500" />}
          text="Setup em 5 minutos"
          delay={0.4}
        />
        <BenefitPill
          icon={<Shield className="h-4 w-4 text-blue-500" />}
          text="100% Seguro"
          delay={0.5}
        />
        <BenefitPill
          icon={<Users className="h-4 w-4 text-purple-500" />}
          text="Suporte 24/7"
          delay={0.6}
        />
      </div>
    </motion.div>
  );
}

interface ContactCTAProps {
  title: string;
  description: string;
}

function ContactCTA({ title, description }: ContactCTAProps) {
  const contactOptions = [
    {
      icon: <Mail className="h-5 w-5 text-accent" />,
      title: "Email",
      description: "Resposta em até 24h",
      action: "contato@kodano.com",
      href: "mailto:contato@kodano.com",
    },
    {
      icon: <Phone className="h-5 w-5 text-accent" />,
      title: "Telefone",
      description: "Seg-Sex, 9h-18h",
      action: "(11) 4000-1234",
      href: "tel:+551140001234",
    },
    {
      icon: <MessageCircle className="h-5 w-5 text-accent" />,
      title: "Chat",
      description: "Suporte instantâneo",
      action: "Iniciar conversa",
      href: "#chat",
    },
    {
      icon: <Calendar className="h-5 w-5 text-accent" />,
      title: "Fale Conosco",
      description: "Entre em contato",
      action: "Enviar mensagem",
      href: "/fale-conosco",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: durations.slow }}
        className="mb-12 text-center"
      >
        <h2 className="mb-4 text-4xl font-bold">{title}</h2>
        <p className="text-lg text-muted-foreground">{description}</p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {contactOptions.map((option, index) => (
          <ContactCard key={index} {...option} index={index} />
        ))}
      </div>
    </div>
  );
}

interface FormCTAProps {
  title: string;
  description: string;
}

function FormCTA({ title, description }: FormCTAProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSuccess(false);
      setEmail("");
    }, 3000);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl border bg-gradient-to-br from-card to-accent/5 p-8 text-center shadow-xl"
      >
        {/* Sparkle decoration */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent to-primary"
        >
          <Rocket className="h-8 w-8 text-white" />
        </motion.div>

        <h2 className="mb-4 text-3xl font-bold">{title}</h2>
        <p className="mb-8 text-muted-foreground">{description}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              className="w-full rounded-lg border bg-background px-4 py-3 pr-32 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.button
                    key="submit"
                    type="submit"
                    disabled={isSubmitting}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Zap className="h-4 w-4" />
                      </motion.div>
                    ) : (
                      "Começar Agora"
                    )}
                  </motion.button>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="flex items-center gap-2 text-green-500"
                  >
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-sm font-medium">Enviado!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </form>

        {/* Trust indicators */}
        <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Shield className="h-4 w-4" />
            <span>Dados seguros</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            <span>Sem compromisso</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ============================================================================
// MAIN CTA SECTION
// ============================================================================

interface CTASectionProps {
  variant?: "simple" | "contact" | "form" | "split";
  title?: string;
  subtitle?: string;
  description?: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  background?: boolean;
  className?: string;
}

export function CTASection({
  variant = "simple",
  title = "Pronto para revolucionar seus pagamentos?",
  subtitle = "Comece hoje mesmo",
  description = "Junte-se a milhares de empresas que já transformaram suas operações de pagamento com Kodano.",
  primaryCTA = { label: "Começar Agora", href: "/cadastro" },
  secondaryCTA = { label: "Falar com Vendas", href: "/contato" },
  background = true,
  className,
}: CTASectionProps) {
  return (
    <SectionContainer
      spacing="xl"
      className={cn("relative", className)}
    >
      {/* Animated background */}
      {background && <AnimatedBackground />}

      {/* Content */}
      <div className="relative z-10">
        {variant === "simple" && (
          <SimpleCTA
            title={title}
            description={description}
            primaryCTA={primaryCTA}
            secondaryCTA={secondaryCTA}
          />
        )}

        {variant === "contact" && (
          <ContactCTA
            title={title}
            description={description}
          />
        )}

        {variant === "form" && (
          <FormCTA
            title={title}
            description={description}
          />
        )}

        {variant === "split" && (
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: durations.slow }}
            >
              <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
                {subtitle}
              </span>
              <h2 className="mt-4 text-4xl font-bold">{title}</h2>
              <p className="mt-4 text-lg text-muted-foreground">{description}</p>

              {/* Feature list */}
              <ul className="mt-8 space-y-3">
                {[
                  "Integração em minutos",
                  "Suporte 24/7 dedicado",
                  "Dashboard completo",
                  "API RESTful moderna",
                ].map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8 flex gap-4">
                <Link href={primaryCTA.href}>
                  <Button size="lg" variant="kodano">
                    {primaryCTA.label}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                {secondaryCTA && (
                  <Link href={secondaryCTA.href}>
                    <Button size="lg" variant="outline">
                      {secondaryCTA.label}
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>

            {/* Right visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: durations.slow, ease: easings.spring }}
              className="relative"
            >
              <div className="relative rounded-2xl bg-gradient-to-br from-accent/10 to-primary/10 p-8">
                {/* Placeholder for visual element */}
                <div className="aspect-square rounded-lg bg-gradient-to-br from-accent to-primary opacity-20" />

                {/* Floating elements */}
                <motion.div
                  animate={{
                    y: [-10, 10, -10],
                    rotate: [-5, 5, -5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -right-4 -top-4 rounded-lg bg-card p-3 shadow-lg"
                >
                  <Sparkles className="h-6 w-6 text-yellow-500" />
                </motion.div>

                <motion.div
                  animate={{
                    y: [10, -10, 10],
                    rotate: [5, -5, 5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="absolute -bottom-4 -left-4 rounded-lg bg-card p-3 shadow-lg"
                >
                  <Zap className="h-6 w-6 text-accent" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </SectionContainer>
  );
}

export default CTASection;