"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Shield,
  AlertTriangle,
  Scale,
  TrendingDown,
  CheckCircle,
  ShieldCheck,
  FileCheck,
  BarChart3,
  Car,
  Plane,
  Building2,
  Briefcase,
  Webhook,
  Lock,
  Code2,
  ArrowUpRight,
} from "lucide-react";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// Header Component
function Header() {
  const navItems = [
    { label: "Solução", href: "/solucao" },
    { label: "Como Funciona", href: "/como-funciona" },
    { label: "Segmentos", href: "/segmentos" },
    { label: "Integração", href: "/integracao" },
    { label: "Segurança", href: "/seguranca-e-compliance" },
    { label: "Sobre", href: "/sobre" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass glass-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">K</span>
            </div>
            <span className="text-xl font-semibold text-foreground">Kodano</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contato"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-all hover-glow"
            >
              Agendar Demonstração
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] gradient-radial" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl"
        >
          <motion.div variants={fadeInUp} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-subtle" />
              Infraestrutura Enterprise
            </span>
          </motion.div>

          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] mb-6"
          >
            Infraestrutura de confiança para{" "}
            <span className="gradient-text">pagamentos de alto valor</span>
          </motion.h1>

          <motion.p 
            variants={fadeInUp}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
          >
            Verificação de identidade antes da aprovação. Redução estrutural de contestação e risco.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contato"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium bg-primary text-primary-foreground rounded-xl hover:bg-primary-hover transition-all hover-glow group"
            >
              Agendar Demonstração
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contato"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium border border-white/10 text-foreground rounded-xl hover:bg-white/5 transition-all"
            >
              Falar com Especialista
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 rounded-full bg-white/40"
          />
        </div>
      </motion.div>
    </section>
  );
}

// Problem Section
function ProblemSection() {
  const problems = [
    {
      icon: AlertTriangle,
      title: "Fraude em transações de alto valor",
      description: "Um único pagamento fraudulento pode representar perdas significativas para a operação.",
    },
    {
      icon: Scale,
      title: "Chargebacks estratégicos",
      description: "Contestações indevidas em tickets altos geram disputas custosas e demoradas.",
    },
    {
      icon: TrendingDown,
      title: "Risco operacional concentrado",
      description: "Verticais premium operam com poucos clientes e valores elevados por transação.",
    },
    {
      icon: Shield,
      title: "Antifraude tradicional insuficiente",
      description: "Soluções convencionais não foram desenhadas para o contexto de alto valor.",
    },
  ];

  return (
    <section className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/50 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="text-sm font-medium text-primary uppercase tracking-wider">
            O Desafio
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-semibold mt-4 mb-6">
            Por que transações de alto valor<br />exigem abordagem diferente
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Quando cada transação representa valor significativo, os riscos tradicionais se amplificam.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-6"
        >
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="p-8 rounded-2xl bg-card border border-white/5 hover:border-primary/20 transition-all hover-lift group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <problem.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{problem.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Solution Section
function SolutionSection() {
  const steps = [
    {
      number: "01",
      title: "Pagamento iniciado",
      description: "Cliente inicia a transação normalmente no seu checkout ou sistema.",
    },
    {
      number: "02",
      title: "Análise de risco acionada",
      description: "Motor de risco Kodano avalia a transação em tempo real.",
    },
    {
      number: "03",
      title: "Verificação proporcional",
      description: "Identidade confirmada com nível de segurança adequado ao valor.",
    },
    {
      number: "04",
      title: "Evidência + Aprovação",
      description: "Transação aprovada com evidências armazenadas para defesa.",
    },
  ];

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] gradient-radial opacity-50" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="text-sm font-medium text-primary uppercase tracking-wider">
            A Solução
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-semibold mt-4 mb-6">
            Verificação inteligente<br />integrada ao pagamento
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fluxo contínuo que adiciona segurança sem fricção desnecessária.
          </motion.p>
        </motion.div>

          <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="relative p-6 rounded-2xl bg-card border border-white/5 hover:border-primary/20 transition-all group"
            >
              <span className="text-5xl font-bold text-primary/20 group-hover:text-primary/30 transition-colors">
                {step.number}
              </span>
              <h3 className="text-lg font-semibold mt-4 mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-white/10 to-transparent" />
              )}
            </motion.div>
          ))}
                  </motion.div>
                </div>
    </section>
  );
}

// Benefits Section
function BenefitsSection() {
  const benefits = [
    {
      icon: TrendingDown,
      title: "Redução estrutural de disputas",
      description: "Evidências robustas que sustentam contestações.",
    },
    {
      icon: ShieldCheck,
      title: "Segurança operacional elevada",
      description: "Confiança para aprovar transações de alto valor.",
    },
    {
      icon: FileCheck,
      title: "Defensibilidade jurídica reforçada",
      description: "Documentação completa para processos.",
    },
    {
      icon: BarChart3,
      title: "Maior confiança na aprovação",
      description: "Decisões baseadas em identidade confirmada.",
    },
  ];

  return (
    <section className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="text-sm font-medium text-primary uppercase tracking-wider">
            Benefícios
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-semibold mt-4 mb-6">
            Resultados mensuráveis
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="text-center p-8 rounded-2xl bg-card/50 border border-white/5 hover:border-primary/20 transition-all hover-lift"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <benefit.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
            </div>
    </section>
  );
}

// Verticals Section
function VerticalsSection() {
  const verticals = [
    {
      icon: Car,
      title: "Automotivo",
      description: "Concessionárias, locadoras e serviços automotivos premium.",
      href: "/segmentos#automotivo",
    },
    {
      icon: Plane,
      title: "Turismo Premium",
      description: "Agências de viagens sob medida e operadoras de alto padrão.",
      href: "/segmentos#turismo",
    },
    {
      icon: Building2,
      title: "Imobiliário",
      description: "Locações de alto valor e transações imobiliárias.",
      href: "/segmentos#imobiliario",
    },
    {
      icon: Briefcase,
      title: "Serviços de Alto Valor",
      description: "Consultorias, clínicas e serviços especializados.",
      href: "/segmentos#servicos",
    },
  ];

  return (
    <section className="py-24 lg:py-32 relative">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="text-sm font-medium text-primary uppercase tracking-wider">
            Segmentos
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-semibold mt-4 mb-6">
            Para quem vendemos
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Verticais que operam com tickets elevados e exigem segurança proporcional.
          </motion.p>
        </motion.div>

              <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-6"
        >
          {verticals.map((vertical, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Link
                href={vertical.href}
                className="flex items-start gap-6 p-8 rounded-2xl bg-card border border-white/5 hover:border-primary/20 transition-all hover-lift group"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <vertical.icon className="w-7 h-7 text-primary" />
                  </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                    {vertical.title}
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-muted-foreground">{vertical.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Integration Section
function IntegrationSection() {
  const features = [
    { icon: Code2, title: "REST API", description: "Interface simples e documentada" },
    { icon: Webhook, title: "Webhooks", description: "Eventos em tempo real" },
    { icon: Lock, title: "Segurança", description: "Criptografia end-to-end" },
  ];

  return (
    <section className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/50 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={fadeInUp}>
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Integração
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold mt-4 mb-6">
              API moderna e flexível
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Arquitetura baseada em eventos, compatível com gateways existentes. 
              Implementação típica em 2-4 semanas.
            </p>
            
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                    <h4 className="font-medium">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/integracao"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              Ver documentação técnica
              <ArrowRight className="w-4 h-4" />
            </Link>
              </motion.div>

          <motion.div variants={fadeInUp} className="relative">
            <div className="p-8 rounded-2xl bg-card border border-white/5">
              <pre className="text-sm text-muted-foreground overflow-x-auto">
                <code>{`// Exemplo de integração
const kodano = new Kodano({
  apiKey: process.env.KODANO_API_KEY
});

const verification = await kodano.verify({
  transaction_id: "txn_123",
  amount: 50000,
  customer: {
    document: "123.456.789-00",
    email: "cliente@empresa.com"
  }
});

// Verificação proporcional ao valor
console.log(verification.status);`}</code>
              </pre>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Trust Section
function TrustSection() {
  const certifications = [
    "LGPD Compliance",
    "KYC/KYB",
    "PLD/FT",
    "Criptografia AES-256",
    "Logs de Auditoria",
  ];

  return (
    <section className="py-24 lg:py-32 relative">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
              <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center"
        >
          <motion.span variants={fadeInUp} className="text-sm font-medium text-primary uppercase tracking-wider">
            Segurança & Compliance
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-semibold mt-4 mb-6">
            Confiança certificada
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Infraestrutura construída com os mais altos padrões de segurança e conformidade regulatória.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4 mb-8">
            {certifications.map((cert, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-white/10 text-sm"
              >
                <CheckCircle className="w-4 h-4 text-primary" />
                {cert}
              </span>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Link
              href="/seguranca-e-compliance"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              Acessar Trust Center
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
                    </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 gradient-radial" />
      
      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
            Pronto para elevar a segurança<br />dos seus pagamentos?
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Converse com nosso time e entenda como a Kodano pode se integrar à sua operação.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contato"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium bg-primary text-primary-foreground rounded-xl hover:bg-primary-hover transition-all hover-glow group"
            >
              Agendar Demonstração
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contato"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium border border-white/10 text-foreground rounded-xl hover:bg-white/5 transition-all"
            >
              Falar com Especialista
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  const links = {
    produto: [
      { label: "Solução", href: "/solucao" },
      { label: "Como Funciona", href: "/como-funciona" },
      { label: "Segmentos", href: "/segmentos" },
      { label: "Integração", href: "/integracao" },
    ],
    empresa: [
      { label: "Sobre", href: "/sobre" },
      { label: "Segurança", href: "/seguranca-e-compliance" },
      { label: "Contato", href: "/contato" },
      { label: "Blog", href: "/blog" },
    ],
    legal: [
      { label: "Privacidade", href: "/politica-de-privacidade" },
      { label: "KYC/KYB", href: "/politica-kyc-kyb" },
      { label: "PLD/FT", href: "/politica-pld-ft" },
      { label: "Segurança da Informação", href: "/politica-seguranca-informacao" },
    ],
  };

  return (
    <footer className="py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">K</span>
                  </div>
              <span className="text-xl font-semibold">Kodano</span>
            </Link>
            <p className="text-muted-foreground max-w-sm">
              Infraestrutura de confiança para pagamentos de alto valor.
            </p>
                    </div>

          <div>
            <h4 className="font-semibold mb-4">Produto</h4>
            <ul className="space-y-3">
              {links.produto.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
                      </div>

          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-3">
              {links.empresa.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
                      </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {links.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
                      </div>
                    </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Kodano. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a href="https://linkedin.com/company/kodano" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main Page
export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <BenefitsSection />
        <VerticalsSection />
        <IntegrationSection />
        <TrustSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
