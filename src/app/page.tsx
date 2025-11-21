/**
 * Homepage - Kodano Website
 * Simplified, modern, single-page design
 */

"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, BarChart3, Layers } from "lucide-react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/layout/footer";
import { cn } from "@/lib/utils";

const orchestrationFeatures = [
  {
    title: "Roteamento Inteligente",
    desc: "Direcionamento dinâmico de transações para a adquirente com maior probabilidade de aprovação.",
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

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-background text-foreground overflow-x-hidden font-sans selection:bg-primary/20">

      {/* MINIMAL HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="w-full px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/kodano-logo.png"
              alt="Kodano"
              width={36}
              height={36}
              className="rounded-lg"
            />
            <span className="font-bold text-xl tracking-tight">Kodano</span>
          </div>
          <nav className="hidden md:flex items-center gap-4 text-sm font-medium text-muted-foreground">
            <a
              href="#contact"
              className="px-4 py-2 rounded-full bg-foreground text-white font-medium hover:opacity-90 transition-opacity text-sm"
            >
              Fale Conosco
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex flex-col w-full">

        {/* HERO SECTION */}
        <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-32 px-6">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-kodano-blue-light/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-kodano-blue-medium/10 rounded-full blur-[100px]" />
          </div>

          <div className="container max-w-5xl mx-auto relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border mb-8 backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground">Subadquirente Digital com Tecnologia Avançada</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]"
            >
              Pagamentos inteligentes <br className="hidden md:block" />
              <span className="text-foreground/90">
                para empresas modernas
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              Maximize aprovação, reduza custos e tenha controle total com APIs modernas e orquestração inteligente de funcionalidades.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
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
          </div>
        </section>

        {/* WHAT WE DO (CONCEPT) */}
        <section id="concept" className="relative py-28 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/60 via-background to-background" />
          <div className="absolute -top-32 right-0 w-[420px] h-[420px] bg-[radial-gradient(circle_at_center,_rgba(65,90,119,0.25),_transparent_65%)] blur-[120px]" />
          <div className="absolute bottom-[-20%] left-[-5%] w-[520px] h-[520px] bg-[radial-gradient(circle_at_center,_rgba(13,27,42,0.15),_transparent_65%)] blur-[140px]" />
          <div className="absolute inset-x-0 top-16 hidden md:block">
            <div className="mx-auto w-[70%] rounded-[48px] border border-border/40 border-dashed h-[70vh] max-h-[520px] opacity-40" />
          </div>

          <div className="container relative z-10 max-w-6xl mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/70 dark:bg-white/5 border border-border/60 backdrop-blur-xl">
                  <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-sky-400 animate-pulse" />
                  <span className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">Tecnologia proprietária</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-heading font-semibold leading-[1.2] text-balance">
                  Orquestração feita com{" "}
                  <span className="text-transparent bg-gradient-to-r from-[#415A77] via-[#1B263B] to-[#778DA9] bg-clip-text">
                    precisão cirúrgica
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground/80 leading-relaxed text-balance">
                  A rota certa, no momento certo. Automatizamos regras complexas de aprovação, retentativas e conciliação em uma camada inteligente que se integra com seus adquirentes sem atrito operacional.
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
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                  >
                    <Card className="group relative h-full overflow-hidden border border-border/40 bg-white/80 dark:bg-background/40 backdrop-blur-2xl shadow-[0_20px_50px_rgba(15,23,42,0.08)] hover:-translate-y-1 hover:shadow-[0_35px_65px_rgba(15,23,42,0.15)] transition-all duration-500">
                      <div className={cn("absolute inset-x-0 top-0 h-1 bg-gradient-to-r", item.accent.border)} />
                      <div className="absolute inset-0 pointer-events-none">
                        <div className={cn("absolute inset-x-6 -top-10 h-24 bg-gradient-to-r blur-3xl opacity-0 group-hover:opacity-70 transition-all duration-700", item.accent.glow)} />
                      </div>

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
        <section id="process" className="py-32 px-6">
          <div className="container max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Como Funciona</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Do setup à primeira transação em poucos passos.
              </p>
            </div>

            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent md:-translate-x-1/2" />

              <div className="space-y-16">
                {[
                  {
                    title: "Integração Rápida",
                    desc: "Conecte-se à nossa API RESTful moderna em minutos, com documentação clara e SDKs prontos.",
                    icon: <Layers className="w-6 h-6" />
                  },
                  {
                    title: "Configure Pagamentos",
                    desc: "Defina suas regras de negócio, métodos de pagamento aceitos e fluxo de checkout.",
                    icon: <Zap className="w-6 h-6" />
                  },
                  {
                    title: "Processe Transações",
                    desc: "Nossa orquestração escolhe automaticamente o melhor adquirente para cada venda.",
                    icon: <BarChart3 className="w-6 h-6" />
                  },
                  {
                    title: "Monitore e Otimize",
                    desc: "Acompanhe tudo em tempo real pelo dashboard e deixe nossa IA otimizar as conversões.",
                    icon: <Shield className="w-6 h-6" />
                  }
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className={`relative flex flex-col md:flex-row gap-8 ${i % 2 === 0 ? "md:text-right" : "md:flex-row-reverse md:text-left"
                      }`}
                  >
                    <div className={`flex-1 ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.desc}</p>
                    </div>

                    <div className="absolute left-0 md:left-1/2 w-10 h-10 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10 md:-translate-x-1/2">
                      <div className="text-primary">{step.icon}</div>
                    </div>

                    <div className="flex-1 hidden md:block" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="scroll-mt-28 py-24 px-6 bg-secondary/20">
          <div className="container max-w-4xl mx-auto">
            <div className="bg-background/90 border border-border/60 rounded-3xl shadow-xl shadow-foreground/5 p-8 md:p-12">
              <div className="space-y-6 text-center">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">Contato</p>
                  <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-3">Fale com nosso time</h2>
                  <p className="text-lg text-muted-foreground">
                    Entenda como podemos aumentar suas aprovações e simplificar seus fluxos de pagamento. Respondemos em até 1 dia útil.
                  </p>
                </div>

                <div className="flex justify-center">
                  <a
                    href="mailto:contato@kodano.com.br"
                    className="inline-flex h-12 items-center justify-center px-6 rounded-full bg-foreground text-white font-medium hover:opacity-90 transition-opacity gap-2 shadow-md shadow-foreground/10"
                  >
                    Enviar um e-mail
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}
