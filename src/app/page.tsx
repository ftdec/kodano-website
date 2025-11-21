/**
 * Homepage - Kodano Website
 * Simplified, modern, single-page design
 */

"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Zap, Shield, BarChart3, Layers, Mail, Phone, MapPin } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/layout/footer";

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
        <section id="concept" className="py-24 px-6 bg-secondary/20">
          <div className="container max-w-6xl mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Orquestração feita com <br />
                  <span className="text-kodano-blue-medium">precisão cirúrgica</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  A rota certa, no momento certo. Nossa tecnologia simplifica o processamento de pagamentos e maximiza suas aprovações automaticamente, sem a complexidade dos gateways tradicionais.
                </p>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {[
                {
                  title: "Roteamento Inteligente",
                  desc: "Direcionamento dinâmico de transações para a adquirente com maior probabilidade de aprovação.",
                  icon: <Layers className="w-6 h-6" />
                },
                {
                  title: "Retentativas Automáticas",
                  desc: "Recuperação de vendas perdidas com retentativas inteligentes e transparentes.",
                  icon: <Zap className="w-6 h-6" />
                },
                {
                  title: "Conciliação Integrada",
                  desc: "Dashboard unificado para controle total de todas as suas transações e recebíveis.",
                  icon: <BarChart3 className="w-6 h-6" />
                },
                {
                  title: "Segurança Bancária",
                  desc: "Certificação PCI-DSS e conformidade total com as normas do Banco Central.",
                  icon: <Shield className="w-6 h-6" />
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card className="h-full border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/20 hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                        {item.icon}
                      </div>
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {item.desc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
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
          <div className="container max-w-6xl mx-auto">
            <div className="bg-background/90 border border-border/60 rounded-3xl shadow-xl shadow-foreground/5 p-8 md:p-12">
              <div className="grid md:grid-cols-[1.2fr,0.8fr] gap-10 md:gap-12 items-start">
                <div className="space-y-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">Contato</p>
                    <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-3">Fale com nosso time</h2>
                    <p className="text-lg text-muted-foreground">
                      Entenda como podemos aumentar suas aprovações e simplificar seus fluxos de pagamento. Respondemos em até 1 dia útil.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      {
                        icon: <Mail className="w-4 h-4" />,
                        label: "Email",
                        value: "contato@kodano.com.br",
                        caption: "Resposta em até 24h",
                        href: "mailto:contato@kodano.com.br",
                      },
                      {
                        icon: <Phone className="w-4 h-4" />,
                        label: "Telefone",
                        value: "(11) 4000-1234",
                        caption: "Seg-Sex, 9h-18h",
                        href: "tel:+551140001234",
                      },
                      {
                        icon: <MapPin className="w-4 h-4" />,
                        label: "Escritório",
                        value: "Av. Paulista, 1234 - 10º andar",
                        caption: "São Paulo, SP",
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 rounded-2xl border border-border/60 bg-secondary/40 px-4 py-3"
                      >
                        <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                          {item.icon}
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-sm font-semibold text-foreground">{item.label}</p>
                          {item.href ? (
                            <a href={item.href} className="text-sm font-medium text-primary hover:underline">
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-sm font-medium">{item.value}</p>
                          )}
                          <p className="text-xs text-muted-foreground">{item.caption}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="mailto:contato@kodano.com.br"
                      className="inline-flex h-12 items-center justify-center px-6 rounded-full bg-foreground text-white font-medium hover:opacity-90 transition-opacity gap-2 shadow-md shadow-foreground/10"
                    >
                      Enviar um e-mail
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <a
                      href="#process"
                      className="inline-flex h-12 items-center justify-center px-6 rounded-full border border-border text-foreground font-medium hover:bg-primary/5 transition-colors"
                    >
                      Ver etapas do processo
                    </a>
                  </div>
                </div>

                <div className="w-full rounded-2xl border border-border/70 bg-secondary/40 p-6 space-y-4">
                  <h3 className="text-lg font-semibold">Pronto para começar?</h3>
                  <p className="text-sm text-muted-foreground">
                    Compartilhe seu volume estimado e objetivos. Nosso time retorna com um plano customizado.
                  </p>
                  <ul className="space-y-3 text-sm text-foreground">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                      Onboarding guiado e sem fricção.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                      APIs e SDKs com documentação clara.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                      Suporte dedicado com SLAs definidos.
                    </li>
                  </ul>
                  <div className="rounded-xl bg-background border border-border p-4">
                    <p className="text-sm font-semibold mb-1">Tempo médio de resposta</p>
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      &lt; 24 horas úteis
                    </div>
                  </div>
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
