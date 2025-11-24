/**
 * Homepage - Kodano Website
 * Simplified, modern, single-page design
 */

"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Zap, Shield, BarChart3, Layers, Send, CheckCircle2 } from "lucide-react";

import Image from "next/image";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Button as ButtonV2 } from "@/components/ui/button-v2";
import { InputGroup, InputGroupInput, InputGroupTextarea } from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/layout/logo";

const orchestrationFeatures = [
  {
    title: "Processamento Inteligente",
    desc: "Tecnologia avançada que otimiza cada transação para maximizar taxas de aprovação e reduzir custos.",
    icon: <Layers className="w-6 h-6" />,
    accent: {
      border: "from-[#4FACFE] via-[#00DBDE] to-[#43E97B]",
      icon: "from-[#E0F2FE] via-white to-[#F4ECFF]",
      glow: "from-[#4FACFE]/40 via-[#43E97B]/10 to-transparent"
    }
  },
  {
    title: "Retentativas Automáticas",
    desc: "Recuperação de vendas perdidas com retentativas inteligentes e transparentes.",
    icon: <Zap className="w-6 h-6" />,
    accent: {
      border: "from-[#FAD961] via-[#F76B1C] to-[#FAD961]",
      icon: "from-[#FFF7E5] via-white to-[#FFE5D0]",
      glow: "from-[#FAD961]/40 via-[#F76B1C]/15 to-transparent"
    }
  },
  {
    title: "Conciliação Integrada",
    desc: "Dashboard unificado para controle total de todas as suas transações e recebíveis.",
    icon: <BarChart3 className="w-6 h-6" />,
    accent: {
      border: "from-[#A8FF78] via-[#78FFD6] to-[#A8FF78]",
      icon: "from-[#ECFDF5] via-white to-[#DCFCE7]",
      glow: "from-[#A8FF78]/40 via-[#78FFD6]/15 to-transparent"
    }
  },
  {
    title: "Segurança Bancária",
    desc: "Certificação PCI-DSS e conformidade total com as normas do Banco Central.",
    icon: <Shield className="w-6 h-6" />,
    accent: {
      border: "from-[#B8C6FF] via-[#6D83F2] to-[#B8C6FF]",
      icon: "from-[#EEF2FF] via-white to-[#E0E7FF]",
      glow: "from-[#B8C6FF]/40 via-[#6D83F2]/15 to-transparent"
    }
  }
] as const;

// Mobile Nav Component for One-Page
function MobileNavOnePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const scrollThreshold = 20;

  const menuItems: Array<{ label: string; href: string; key: string }> = [
    { label: "Como Funciona", href: "#process", key: "como-funciona" },
    { label: "Produtos", href: "#concept", key: "produtos" },
    { label: "Preços", href: "#contact", key: "precos" },
    { label: "Sobre", href: "#contact", key: "sobre" },
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

export default function Home() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

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
          message,
          subject: "Nova mensagem do formulário principal",
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
    { label: "Como Funciona", href: "#process", key: "como-funciona" },
    { label: "Produtos", href: "#concept", key: "produtos" },
    { label: "Preços", href: "#contact", key: "precos" },
    { label: "Sobre", href: "#contact", key: "sobre" },
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
            "hidden lg:block sticky top-0 z-50 w-full border-b transition-all duration-300 relative",
            isScrolled
              ? "border-border/50 bg-background/80 shadow-sm"
              : "border-border/50 bg-background/80",
            isMobile ? "backdrop-blur-sm" : "backdrop-blur-xl"
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
        <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-32 px-6">
          {/* Background Elements - Reduced blur on mobile */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className={cn(
              "absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-kodano-blue-light/10 rounded-full",
              isMobile ? "blur-[60px]" : "blur-[120px]"
            )} />
            <div className={cn(
              "absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-kodano-blue-medium/10 rounded-full",
              isMobile ? "blur-[50px]" : "blur-[100px]"
            )} />
          </div>

          <div className="container max-w-5xl mx-auto relative z-10 text-center">
            {prefersReducedMotion ? (
              <>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border mb-8 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-sm font-medium text-muted-foreground">Subadquirente Digital com Tecnologia Avançada</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
                  Pagamentos inteligentes <br className="hidden md:block" />
                  <span className="text-foreground/90">para empresas modernas</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
                  Maximize aprovação, reduza custos e tenha controle total com APIs modernas e orquestração inteligente de funcionalidades.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 flex-wrap">
              </>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, y: isMobile ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: isMobile ? 0.3 : 0.6 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border mb-8 backdrop-blur-sm"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm font-medium text-muted-foreground">Subadquirente Digital com Tecnologia Avançada</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: isMobile ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: isMobile ? 0.3 : 0.6, delay: isMobile ? 0 : 0.1 }}
                  className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]"
                >
                  Pagamentos inteligentes <br className="hidden md:block" />
                  <span className="text-foreground/90">
                    para empresas modernas
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: isMobile ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: isMobile ? 0.3 : 0.6, delay: isMobile ? 0 : 0.2 }}
                  className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
                >
                  Maximize aprovação, reduza custos e tenha controle total com APIs modernas e orquestração inteligente de funcionalidades.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: isMobile ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: isMobile ? 0.3 : 0.6, delay: isMobile ? 0 : 0.3 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 flex-wrap"
                >
                  <a
                    href="#contact"
                    className="inline-flex h-12 items-center px-6 sm:px-7 rounded-full bg-foreground text-white font-medium hover:opacity-90 transition-opacity gap-2 justify-center shadow-md shadow-foreground/15"
                  >
                    Fale com o Kodano
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#process"
                    className="inline-flex h-12 items-center px-6 sm:px-7 rounded-full border border-border text-foreground font-medium hover:bg-primary/5 transition-colors justify-center"
                  >
                    Conheça nosso processo
                  </a>
                </motion.div>
              </>
            )}
          </div>
        </section>

        {/* WHAT WE DO (CONCEPT) */}
        <section id="concept" className="relative py-28 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/60 via-background to-background" />
          <div className={cn(
            "absolute -top-32 right-0 w-[420px] h-[420px] bg-[radial-gradient(circle_at_center,_rgba(65,90,119,0.25),_transparent_65%)]",
            isMobile ? "blur-[60px]" : "blur-[120px]"
          )} />
          <div className={cn(
            "absolute bottom-[-20%] left-[-5%] w-[520px] h-[520px] bg-[radial-gradient(circle_at_center,_rgba(13,27,42,0.15),_transparent_65%)]",
            isMobile ? "blur-[70px]" : "blur-[140px]"
          )} />
          <div className="absolute inset-x-0 top-16 hidden md:block">
            <div className="mx-auto w-[70%] rounded-[48px] border border-border/40 border-dashed h-[70vh] max-h-[520px] opacity-40" />
          </div>

          <div className="container relative z-10 max-w-6xl mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <motion.div
                initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion || isMobile ? 0 : 20 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
                transition={{ duration: isMobile ? 0.3 : 0.6 }}
                className="space-y-6"
              >
                <div className={cn(
                  "inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/70 dark:bg-white/5 border border-border/60",
                  isMobile ? "backdrop-blur-sm" : "backdrop-blur-xl"
                )}>
                  <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-sky-400 animate-pulse" />
                  <span className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">Tecnologia proprietária</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-heading font-semibold leading-[1.2] text-balance">
                  Orquestração feita com precisão cirúrgica
                </h2>
                <p className="text-lg text-muted-foreground/80 leading-relaxed text-balance">
                  Processamento feito com precisão. Automatizamos regras complexas de aprovação, retentativas e conciliação em uma camada inteligente que otimiza cada transação para máxima eficiência.
                </p>
              </motion.div>
            </div>

            <div className="relative max-w-5xl mx-auto">
              <div className="pointer-events-none absolute inset-6 hidden md:block">
                <div className="absolute left-1/2 top-0 bottom-0 border-l border-border/50 border-dashed" />
                <div className="absolute top-1/2 left-0 right-0 border-t border-border/50 border-dashed" />
              </div>

              <div className="grid md:grid-cols-2 gap-6 relative">
                {orchestrationFeatures.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion || isMobile ? 0 : 20 }}
                    whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
                    transition={{ duration: isMobile ? 0.3 : 0.6, delay: isMobile ? 0 : i * 0.1 }}
                  >
                    <Card className={cn(
                      "group relative h-full overflow-hidden border border-border/40 bg-white/80 dark:bg-background/40 shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition-all",
                      isMobile ? "backdrop-blur-sm duration-200" : "backdrop-blur-2xl duration-500 hover:-translate-y-1 hover:shadow-[0_35px_65px_rgba(15,23,42,0.15)]"
                    )}>
                      <div className={cn("absolute inset-x-0 top-0 h-1 bg-gradient-to-r", item.accent.border)} />
                      {!isMobile && (
                        <div className="absolute inset-0 pointer-events-none">
                          <div className={cn("absolute inset-x-6 -top-10 h-24 bg-gradient-to-r blur-3xl opacity-0 group-hover:opacity-70 transition-all duration-700", item.accent.glow)} />
                        </div>
                      )}

                      <CardHeader className="relative z-10 space-y-4 p-8">
                        <div className="flex items-start justify-between gap-4">
                          <div className={cn("w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center text-primary shadow-inner shadow-white/60", item.accent.icon)}>
                            {item.icon}
                          </div>
                        </div>
                        <CardTitle className="text-2xl leading-tight pt-2">{item.title}</CardTitle>
                        <p className="text-muted-foreground/90 leading-relaxed text-base">
                          {item.desc}
                        </p>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS (PROCESS) */}
        <section id="process" className="scroll-mt-28 py-16 sm:py-24 md:py-32 px-4 sm:px-6">
          <div className="container max-w-5xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <div className={cn(
                "inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 rounded-full bg-white/70 dark:bg-white/5 border border-border/60 mb-4 sm:mb-6",
                isMobile ? "backdrop-blur-sm" : "backdrop-blur-xl"
              )}>
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse" />
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.35em] text-muted-foreground">Processo Simplificado</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Como Funciona</h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
                Do setup à primeira transação em poucos passos.
              </p>
            </div>

            <div className="relative">
              {/* Connecting Line - ajustado para mobile */}
              <div className="absolute left-6 sm:left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent md:-translate-x-1/2" />

              <div className="space-y-10 sm:space-y-12 md:space-y-16">
                {[
                  {
                    title: "Integração Rápida",
                    desc: "Conecte-se à nossa API RESTful moderna em minutos, com documentação clara e SDKs prontos.",
                    icon: <Layers className="w-5 h-5 sm:w-6 sm:h-6" />
                  },
                  {
                    title: "Configure Pagamentos",
                    desc: "Defina suas regras de negócio, métodos de pagamento aceitos e fluxo de checkout.",
                    icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
                  },
                  {
                    title: "Processe Transações",
                    desc: "Nossa tecnologia processa cada transação com otimização inteligente para maximizar aprovações.",
                    icon: <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />
                  },
                  {
                    title: "Monitore e Otimize",
                    desc: "Acompanhe tudo em tempo real pelo dashboard e deixe nossa IA otimizar as conversões.",
                    icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
                  }
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion || isMobile ? 0 : 20 }}
                    whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
                    transition={{ duration: isMobile ? 0.2 : 0.5, delay: isMobile ? 0 : i * 0.1 }}
                    className={`relative flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 ${i % 2 === 0 ? "md:text-right" : "md:flex-row-reverse md:text-left"}`}
                  >
                    {/* Mobile: conteúdo à direita do círculo, Desktop: layout alternado */}
                    <div className={`flex-1 pl-12 sm:pl-14 ${i % 2 === 0 ? "md:pl-0 md:pr-12" : "md:pl-12 md:pr-0"}`}>
                      <h3 className="text-lg sm:text-xl font-bold mb-1.5 sm:mb-2">{step.title}</h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>

                    {/* Círculo com ícone - posicionado à esquerda no mobile, centralizado no desktop */}
                    <div className="absolute left-0 md:left-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10 md:-translate-x-1/2 shrink-0">
                      <div className="text-primary text-sm sm:text-base">{step.icon}</div>
                    </div>

                    {/* Espaço vazio no desktop para layout alternado */}
                    <div className="flex-1 hidden md:block" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

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
                  <div className={cn(
                    "inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/5 border border-primary/10",
                    isMobile ? "backdrop-blur-sm" : "backdrop-blur-xl"
                  )}>
                    <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">Fale Conosco</span>
                  </div>

                  <h2 className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight">
                    Vamos escalar sua <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">operação financeira?</span>
                  </h2>

                  <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                    Nossa equipe de especialistas está pronta para desenhar a arquitetura ideal para o seu negócio.
                  </p>
                </div>

                <div className="space-y-6 pt-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Resposta em 24h</h4>
                      <p className="text-muted-foreground text-sm">Nosso time comercial analisa seu perfil rapidamente.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Consultoria Técnica</h4>
                      <p className="text-muted-foreground text-sm">Acesso direto aos nossos arquitetos de solução.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Form */}
              <motion.div
                initial={{ opacity: prefersReducedMotion ? 1 : 0, x: prefersReducedMotion || isMobile ? 0 : 20 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
                transition={{ duration: isMobile ? 0.3 : 0.6, delay: isMobile ? 0 : 0.2 }}
                className={cn(
                  "bg-card/50 border border-border/50 rounded-[2rem] p-8 md:p-10 shadow-2xl shadow-black/5",
                  isMobile ? "backdrop-blur-sm" : "backdrop-blur-sm"
                )}
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
                      whileHover={!isSubmitting ? { scale: 1.01 } : {}}
                      whileTap={!isSubmitting ? { scale: 0.99 } : {}}
                    >
                      {/* Pulse effect when submitting */}
                      {isSubmitting && (
                        <motion.div
                          className="absolute inset-0 rounded-lg"
                          animate={{
                            boxShadow: [
                              "0 0 0 0 rgba(59, 130, 246, 0.6)",
                              "0 0 0 10px rgba(59, 130, 246, 0)",
                              "0 0 0 0 rgba(59, 130, 246, 0)"
                            ],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeOut"
                          }}
                          style={{ pointerEvents: "none", zIndex: -1 }}
                        />
                      )}
                      <ButtonV2
                      type="submit"
                      variant="primary"
                      size="lg"
                        className={cn(
                          "w-full h-12 text-base mt-2 relative overflow-hidden transition-all duration-300",
                          isSubmitting && "shadow-xl shadow-primary/40"
                        )}
                      loading={isSubmitting}
                        shimmer={isSubmitting}
                        rightIcon={
                          <motion.div
                            animate={isSubmitting ? {
                              rotate: [0, 15, -15, 0],
                              scale: [1, 1.1, 1],
                            } : {}}
                            transition={isSubmitting ? {
                              duration: 0.8,
                              repeat: Infinity,
                              ease: "easeInOut"
                            } : {}}
                          >
                            <Send className="w-4 h-4" />
                          </motion.div>
                        }
                        disabled={isSubmitting}
                      >
                        <motion.span
                          animate={isSubmitting ? {
                            opacity: [1, 0.8, 1],
                          } : {}}
                          transition={isSubmitting ? {
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          } : {}}
                        >
                          {isSubmitting ? "Enviando..." : "Solicitar Contato"}
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

      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}
