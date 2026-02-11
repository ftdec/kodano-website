import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShoppingCart, Shield, UserCheck, CheckCircle, Database, FileText, Clock, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Como Funciona",
  description: "Arquitetura técnica da Kodano: processamento baseado em eventos, API stateless, camada de verificação e vault de evidências.",
};

export default function ComoFuncionaPage() {
  const steps = [
    {
      icon: ShoppingCart,
      number: "01",
      title: "Merchant",
      subtitle: "Pagamento Iniciado",
      description: "Cliente realiza pagamento no checkout. Sistema do merchant envia requisição para Kodano.",
    },
    {
      icon: Shield,
      number: "02",
      title: "Risk Engine",
      subtitle: "Análise de Risco",
      description: "Motor analisa contexto da transação: valor, histórico, dispositivo, geolocalização.",
    },
    {
      icon: UserCheck,
      number: "03",
      title: "Verification Layer",
      subtitle: "Verificação de Identidade",
      description: "Nível de verificação proporcional ao risco. Biometria, documentos ou autenticação.",
    },
    {
      icon: CheckCircle,
      number: "04",
      title: "Approval Decision",
      subtitle: "Decisão de Aprovação",
      description: "Transação aprovada com identidade confirmada. Evidências geradas automaticamente.",
    },
    {
      icon: Database,
      number: "05",
      title: "Evidence Vault",
      subtitle: "Armazenamento Seguro",
      description: "Pacote de evidências armazenado com criptografia. Disponível para disputas.",
    },
  ];

  const technicalBlocks = [
    {
      icon: Zap,
      title: "Processamento baseado em eventos",
      description: "Arquitetura event-driven que permite integração assíncrona sem bloquear o fluxo de pagamento.",
    },
    {
      icon: FileText,
      title: "API Stateless",
      description: "Chamadas REST independentes, sem estado de sessão. Cada requisição contém todo o contexto necessário.",
    },
    {
      icon: Database,
      title: "Camada de armazenamento seguro",
      description: "Dados criptografados em repouso e em trânsito. Compliance com LGPD e padrões internacionais.",
    },
    {
      icon: Clock,
      title: "Logs e trilha de auditoria",
      description: "Registro completo de todas as operações para compliance, auditoria e análise forense.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass glass-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">K</span>
              </div>
              <span className="text-xl font-semibold">Kodano</span>
            </Link>
            <Link
              href="/contato"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-all"
            >
              Agendar Demo
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero */}
        <section className="py-24 lg:py-32 relative">
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] gradient-radial" />
          
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Arquitetura
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mt-4 mb-6 leading-tight">
                Como a Kodano{" "}
                <span className="gradient-text">funciona</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Fluxo técnico completo: do início do pagamento à aprovação segura com evidências armazenadas.
              </p>
            </div>
          </div>
        </section>

        {/* Flow Diagram */}
        <section className="py-24 lg:py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/50 to-transparent" />
          
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold mb-6">
                Fluxo de Verificação
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Cada etapa foi desenhada para adicionar segurança sem comprometer a experiência.
              </p>
            </div>

            <div className="relative">
              {/* Connection line */}
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />
              
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className="relative p-6 rounded-2xl bg-card border border-white/5 hover:border-primary/20 transition-all hover-lift"
                  >
                    <div className="absolute -top-3 left-6 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                      {step.number}
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mt-2">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-sm font-medium text-primary mb-1">{step.title}</h3>
                    <h4 className="text-lg font-semibold mb-2">{step.subtitle}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Technical Blocks */}
        <section className="py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Detalhes Técnicos
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold mt-4 mb-6">
                Arquitetura robusta
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {technicalBlocks.map((block, index) => (
                <div
                  key={index}
                  className="flex gap-6 p-8 rounded-2xl bg-card border border-white/5"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <block.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{block.title}</h3>
                    <p className="text-muted-foreground">{block.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Diagrama Simplificado */}
        <section className="py-24 lg:py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
          
          <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
            <div className="p-8 lg:p-12 rounded-2xl bg-card border border-white/5">
              <h3 className="text-2xl font-semibold mb-8 text-center">Diagrama de Fluxo</h3>
              
              <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                {[
                  { label: "Merchant", sub: "Checkout" },
                  { label: "Kodano", sub: "Risk Engine" },
                  { label: "Verification", sub: "Layer" },
                  { label: "Decision", sub: "Approval" },
                  { label: "Evidence", sub: "Vault" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-2xl bg-primary/10 border border-primary/20 flex flex-col items-center justify-center text-center p-2">
                      <span className="font-semibold text-sm">{item.label}</span>
                      <span className="text-xs text-muted-foreground">{item.sub}</span>
                    </div>
                    {index < 4 && (
                      <ArrowRight className="w-6 h-6 text-primary/50 hidden lg:block" />
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-8 border-t border-white/5 text-center">
                <p className="text-sm text-muted-foreground">
                  Latência média: <span className="text-primary font-medium">&lt; 500ms</span> | 
                  Uptime: <span className="text-primary font-medium">99.9%</span> | 
                  Criptografia: <span className="text-primary font-medium">AES-256</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 lg:py-32">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              Quer ver na prática?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Nossa equipe técnica pode demonstrar o fluxo completo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contato"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary-hover transition-all group"
              >
                Agendar Demo Técnica
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/integracao"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/10 rounded-xl font-medium hover:bg-white/5 transition-all"
              >
                Ver Documentação
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Kodano
          </p>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Voltar ao início
          </Link>
        </div>
      </footer>
    </div>
  );
}

