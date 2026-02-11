/**
 * Homepage - Kodano Website
 * Premium Stripe/CloudWalk level design with advanced animations
 * Refactored to use modular components
 */

"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Shield, Layers } from "lucide-react";

import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Button as ButtonV2 } from "@/components/ui/button-v2";
import { InputGroup, InputGroupInput, InputGroupTextarea } from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/layout/logo";

// Premium Home Components
import { HeroSection } from "@/components/home/hero-section";
import { BenefitsSection } from "@/components/home/benefits-section";
import { HowItWorksSection } from "@/components/home/how-it-works-section";
import { SegmentsSection } from "@/components/home/segments-section";
import { SecuritySection } from "@/components/home/security-section";
import { FinalCTASection } from "@/components/home/final-cta-section";

// Removed - now handled by BenefitsSection component

// Mobile Nav Component for One-Page
function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="relative w-6 h-6 flex items-center justify-center">
      <motion.div
        className="absolute w-6 h-5 flex flex-col justify-between"
        initial={false}
        animate={isOpen ? "open" : "closed"}
      >
        <motion.span
          className="block w-full h-0.5 bg-[#111111] rounded-full origin-center"
          variants={{
            closed: { rotate: 0, y: 0 },
            open: { rotate: 45, y: 8 },
          }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        />
        <motion.span
          className="block w-full h-0.5 bg-[#111111] rounded-full origin-center"
          variants={{
            closed: { opacity: 1, scale: 1 },
            open: { opacity: 0, scale: 0 },
          }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        />
        <motion.span
          className="block w-full h-0.5 bg-[#111111] rounded-full origin-center"
          variants={{
            closed: { rotate: 0, y: 0 },
            open: { rotate: -45, y: -8 },
          }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        />
      </motion.div>
    </div>
  );
}

function MobileNavOnePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const scrollThreshold = 20;

  const menuItems: Array<{ label: string; href: string; key: string }> = [
    { label: "A Solução", href: "#security", key: "solucao" },
    { label: "Como Funciona", href: "#process", key: "como-funciona" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 4);
      if (isOpen && currentScrollY > lastScrollY.current + scrollThreshold) {
        setIsOpen(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const navElement = document.querySelector('[data-mobile-nav]');
      if (navElement && !navElement.contains(target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <header
      className="lg:hidden relative z-50 w-full bg-white"
      data-mobile-nav
    >
      <div
        className={`w-full px-4 sm:px-6 h-16 flex items-center justify-between transition-shadow duration-200 ${
          isScrolled ? "shadow-sm" : ""
        }`}
      >
        <Logo />
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          whileTap={{ scale: 0.95 }}
        >
          <HamburgerIcon isOpen={isOpen} />
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 right-0 top-full bg-white shadow-lg rounded-b-xl"
            style={{
              maxHeight: "50vh",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.10)",
            }}
          >
            <div className="overflow-y-auto" style={{ maxHeight: "50vh" }}>
              <nav className="p-4 pb-4 space-y-1">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.key}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {item.label}
                  </motion.a>
                ))}
                <div className="pt-4 mt-4 border-t border-gray-100 pb-2 space-y-2">
                  <motion.div whileTap={{ scale: 0.98 }}>
                    <a
                      href="#contact"
                      onClick={() => setIsOpen(false)}
                      className="block w-full px-4 py-3 text-base font-semibold text-white text-center rounded-lg bg-[#0D1B2A] hover:bg-[#415A77] active:bg-[#0D1B2A]/90 transition-all duration-200"
                    >
                      Fale Conosco
                    </a>
                  </motion.div>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// Analytics helper
function trackEvent(eventName: string, data?: Record<string, string>) {
  if (typeof window !== 'undefined' && (window as typeof window & { gtag?: (command: string, eventName: string, data?: Record<string, string>) => void }).gtag) {
    (window as typeof window & { gtag: (command: string, eventName: string, data?: Record<string, string>) => void }).gtag('event', eventName, data);
  }
}

function HomeContent() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [assunto, setAssunto] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Pre-fill assunto from URL params
  useEffect(() => {
    const assuntoParam = searchParams.get('assunto');
    if (assuntoParam === 'liquidez') {
      setAssunto('Liquidez sob demanda');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Contato do Site",
          email,
          phone,
          message: `Assunto: ${assunto || 'Não especificado'}\n\n${message}`,
          subject: assunto === 'Liquidez sob demanda' 
            ? "[Liquidez] Nova solicitação do site" 
            : "Nova mensagem do formulário principal",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data.details
          ? `${data.error}\n\nDetalhes: ${data.details}`
          : data.error || "Erro ao enviar mensagem";
        throw new Error(errorMsg);
      }

      setIsSuccess(true);
      setEmail("");
      setPhone("");
      setAssunto("");
      setMessage("");
      // Reset success state after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao enviar mensagem. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Navigation items for one-page with anchors
  const onePageNavItems: Array<{ label: string; href: string; key: string }> = [
    { label: "A Solução", href: "#security", key: "solucao" },
    { label: "Como Funciona", href: "#process", key: "como-funciona" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);

  // Detect mobile and reduced motion preference
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    
    return () => {
      window.removeEventListener("resize", checkMobile);
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  // Throttled scroll handler for better performance
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          // If href is just "#", scroll to top
          if (href === '#') {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
            return;
          }
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            const headerHeight = 64; // Header height
            const targetPosition = targetElement.offsetTop - headerHeight;
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full bg-background text-foreground overflow-x-hidden font-sans selection:bg-primary/20">
      {/* HEADER COM MENU E LOGO ANIMADO */}
      <>
        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <MobileNavOnePage />
        </div>

        {/* Desktop Header */}
        <header
          className={cn(
            "hidden lg:block sticky top-0 z-50 w-full border-b transition-all duration-200 relative",
            isScrolled
              ? "border-border/50 bg-white shadow-sm"
              : "border-transparent bg-white/95"
          )}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Logo Animado */}
              <div className="flex items-center shrink-0">
                <Logo />
          </div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-1">
                {onePageNavItems.map((item) => (
            <a
                    key={item.key}
                    href={item.href}
                    className="relative px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors rounded-md hover:bg-accent/5 group"
            >
                    <span className="relative">
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
                    </span>
            </a>
                ))}
          </nav>

              {/* CTA Button */}
              <div className="flex items-center gap-3 shrink-0">
                <Button
                  asChild
                  size="sm"
                  variant="kodano"
                  rounded="full"
                  className="hidden lg:flex"
                >
                  <a href="#contact">Fale Conosco</a>
                </Button>
              </div>
            </div>
        </div>
      </header>
      </>

      <main className="flex-1 flex flex-col w-full">
        {/* HERO SECTION */}
        <HeroSection />

        {/* O PROBLEMA - Riscos de pagamentos de alto valor */}
        <BenefitsSection />

        {/* A SOLUÇÃO - Como a Kodano adiciona segurança */}
        <SecuritySection />

        {/* COMO FUNCIONA */}
        <HowItWorksSection />

        {/* PARA QUEM É */}
        <SegmentsSection />

        {/* CTA FINAL */}
        <FinalCTASection />

        {/* CONTACT */}
        <section id="contact" className="scroll-mt-28 py-24 px-6 relative overflow-hidden">
          {/* Background Gradients */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-secondary/20 to-background" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
            <div className="absolute top-20 left-[-100px] w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[80px]" />
          </div>

          <div className="container max-w-6xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">

              {/* Left Column: Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-8 pt-4"
              >
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/5 border border-primary/10">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">Fale Conosco</span>
                  </div>

                  <h2 className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight">
                    Fale com a <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-400">Kodano</span>
                  </h2>

                  <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                    Converse com nossa equipe e avalie se a solução faz sentido para sua operação.
                  </p>
                </div>

                <div className="space-y-6 pt-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Sem compromisso</h4>
                      <p className="text-muted-foreground text-sm">Conversa inicial para entender se faz sentido para você.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Resposta rápida</h4>
                      <p className="text-muted-foreground text-sm">Nossa equipe retorna seu contato em até 24h.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-white border border-border/50 rounded-2xl p-8 md:p-10 shadow-lg"
              >
                {isSuccess ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center h-full min-h-[400px]">
                    <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6 animate-in zoom-in duration-300">
                      <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Mensagem enviada!</h3>
                    <p className="text-muted-foreground max-w-xs mx-auto">
                      Recebemos seu contato e retornaremos em breve para o email informado.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-8"
                      onClick={() => setIsSuccess(false)}
                    >
                      Enviar nova mensagem
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2 mb-6">
                      <h3 className="text-2xl font-semibold">Envie uma mensagem</h3>
                      <p className="text-sm text-muted-foreground">Preencha os dados abaixo para iniciar a conversa.</p>
                    </div>

                    {error && (
                      <div className="p-4 rounded-md bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                        {error}
                      </div>
                    )}

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium ml-1">Email Corporativo</label>
                        <InputGroup>
                          <InputGroupInput
                            id="email"
                            type="email"
                            placeholder="nome@empresa.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="h-12"
                          />
                        </InputGroup>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium ml-1">Telefone</label>
                        <InputGroup>
                          <InputGroupInput
                            id="phone"
                            type="tel"
                            placeholder="(11) 99999-9999"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            className="h-12"
                          />
                        </InputGroup>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="assunto" className="text-sm font-medium ml-1">Assunto</label>
                        <select
                          id="assunto"
                          value={assunto}
                          onChange={(e) => setAssunto(e.target.value)}
                          className="w-full h-12 px-4 rounded-lg border border-border/50 bg-white text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        >
                          <option value="">Selecione...</option>
                          <option value="Pagamentos de alto valor">Pagamentos de alto valor</option>
                          <option value="Integração técnica">Integração técnica</option>
                          <option value="Liquidez sob demanda">Liquidez sob demanda</option>
                          <option value="Outro">Outro</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium ml-1">Como podemos ajudar?</label>
                        <InputGroup>
                          <InputGroupTextarea
                            id="message"
                            placeholder="Descreva seu volume atual e principais desafios..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            rows={5}
                            className="min-h-[120px] resize-none"
                          />
                        </InputGroup>
                      </div>
                    </div>

                    <motion.div
                      className="relative"
                      initial={false}
                      animate={isSubmitting ? {
                        scale: 1,
                      } : {}}
                      whileHover={!isSubmitting ? { 
                        scale: 1.02,
                        transition: { duration: 0.2, ease: [0.32, 0, 0.67, 0] }
                      } : {}}
                      whileTap={!isSubmitting ? { 
                        scale: 0.98,
                        transition: { duration: 0.15 }
                      } : {}}
                    >
                      {/* Animated pulse ring when submitting */}
                      {isSubmitting && (
                        <>
                          <motion.div
                            className="absolute inset-0 rounded-lg"
                            animate={{
                              boxShadow: [
                                "0 0 0 0 rgba(59, 130, 246, 0.7)",
                                "0 0 0 8px rgba(59, 130, 246, 0.3)",
                                "0 0 0 16px rgba(59, 130, 246, 0)",
                                "0 0 0 0 rgba(59, 130, 246, 0)"
                              ],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeOut"
                            }}
                            style={{ pointerEvents: "none", zIndex: -1 }}
                          />
                          <motion.div
                            className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            animate={{
                              x: ["-100%", "100%"],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                              repeatDelay: 0.5
                            }}
                            style={{ 
                              pointerEvents: "none",
                              zIndex: 1,
                              mixBlendMode: "overlay"
                            }}
                          />
                        </>
                      )}
                      <ButtonV2
                      type="submit"
                      variant="primary"
                      size="lg"
                        className={cn(
                          "w-full h-12 text-base mt-2 relative overflow-hidden transition-all duration-300",
                          isSubmitting 
                            ? "shadow-2xl shadow-primary/50 cursor-wait" 
                            : "shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                        )}
                      loading={isSubmitting}
                        shimmer={isSubmitting}
                        rightIcon={
                          <motion.div
                            className="relative"
                            animate={isSubmitting ? {
                              rotate: [0, 10, -10, 0],
                            } : {}}
                            transition={isSubmitting ? {
                              duration: 1.2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            } : {
                              type: "spring",
                              stiffness: 400,
                              damping: 25
                            }}
                            whileHover={!isSubmitting ? {
                              x: 4,
                              transition: { duration: 0.2 }
                            } : {}}
                          >
                            <Send className="w-4 h-4" />
                            {isSubmitting && (
                              <motion.div
                                className="absolute inset-0"
                                animate={{
                                  scale: [1, 1.3, 1],
                                  opacity: [0.5, 0, 0.5]
                                }}
                                transition={{
                                  duration: 1.2,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              >
                                <Send className="w-4 h-4" />
                              </motion.div>
                            )}
                          </motion.div>
                        }
                        disabled={isSubmitting}
                      >
                        <motion.span
                          className="relative z-10"
                          animate={isSubmitting ? {
                            opacity: [1, 0.9, 1],
                          } : {}}
                          transition={isSubmitting ? {
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          } : {}}
                        >
                          {isSubmitting ? (
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              Enviando...
                            </motion.span>
                          ) : (
                            <motion.span
                              initial={{ opacity: 1 }}
                              animate={{ opacity: 1 }}
                    >
                      Solicitar Contato
                            </motion.span>
                          )}
                        </motion.span>
                      </ButtonV2>
                    </motion.div>

                    <p className="text-xs text-center text-muted-foreground mt-4">
                      Ao enviar, você concorda com nossa Política de Privacidade.
                    </p>
                  </form>
                )}
              </motion.div>

            </div>
          </div>
        </section>

        {/* LIQUIDITY LAYER - Institutional Section */}
        <section className="py-20 px-6 relative overflow-hidden border-t border-border/30">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/3 rounded-full blur-[120px]" />
          </div>
          
          <div className="container max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-6"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mx-auto">
                <Layers className="w-7 h-7 text-primary" />
              </div>
              
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                Infraestrutura que evolui com sua operação
              </h2>
              
              <div className="max-w-2xl mx-auto space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Para operações de alto valor, a Kodano pode ativar camadas adicionais de governança e liquidez sob demanda, integradas à sua infraestrutura de pagamentos e evidências.
                </p>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Essas estruturas são desenhadas caso a caso, respeitando critérios de elegibilidade, controles internos e trilha auditável compatível com políticas de compliance.
                </p>
              </div>
              
              <div className="pt-4">
                <a
                  href="#contact"
                  onClick={() => {
                    setAssunto('Liquidez sob demanda');
                    trackEvent('liquidez_interest_click', { source: 'home_section' });
                  }}
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors group"
                >
                  Falar com especialista
                  <svg 
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
