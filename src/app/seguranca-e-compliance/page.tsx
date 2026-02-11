import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield, FileCheck, Lock, Eye, Database, Users, Clock, CheckCircle, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Segurança e Compliance",
  description: "Trust Center Kodano: LGPD, KYC/KYB, PLD/FT, criptografia, governança e políticas de segurança da informação.",
};

export default function SegurancaCompliancePage() {
  const policies = [
    {
      icon: FileCheck,
      title: "LGPD Compliance",
      description: "Tratamento de dados pessoais em conformidade com a Lei Geral de Proteção de Dados. Base legal, consentimento, direitos dos titulares.",
      link: "/politica-de-privacidade",
    },
    {
      icon: Users,
      title: "KYC/KYB Framework",
      description: "Procedimentos de Know Your Customer e Know Your Business. Verificação de identidade, validação documental, due diligence.",
      link: "/politica-kyc-kyb",
    },
    {
      icon: Shield,
      title: "PLD/FT Controls",
      description: "Prevenção à Lavagem de Dinheiro e Financiamento ao Terrorismo. Monitoramento de transações, alertas, reportes regulatórios.",
      link: "/politica-pld-ft",
    },
    {
      icon: Lock,
      title: "Segurança da Informação",
      description: "Controles técnicos e administrativos para proteção de dados. Criptografia, controle de acesso, gestão de incidentes.",
      link: "/politica-seguranca-informacao",
    },
  ];

  const technicalControls = [
    { icon: Lock, title: "Criptografia AES-256", desc: "Dados em repouso e em trânsito" },
    { icon: Database, title: "Retenção Controlada", desc: "Política de retenção e descarte" },
    { icon: Eye, title: "Logs de Auditoria", desc: "Rastreabilidade completa" },
    { icon: Clock, title: "Backup & DR", desc: "Recuperação de desastres" },
  ];

  const governance = [
    "Comitê de Segurança da Informação",
    "DPO (Data Protection Officer) designado",
    "Avaliações de risco periódicas",
    "Treinamento contínuo de colaboradores",
    "Gestão de terceiros e fornecedores",
    "Plano de resposta a incidentes",
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary mb-6">
                <Shield className="w-4 h-4" />
                Trust Center
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mt-4 mb-6 leading-tight">
                Segurança e{" "}
                <span className="gradient-text">Compliance</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Infraestrutura construída com os mais altos padrões de segurança, 
                conformidade regulatória e governança corporativa.
              </p>
            </div>
          </div>
        </section>

        {/* Policies */}
        <section className="py-24 lg:py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/50 to-transparent" />
          
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Políticas
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold mt-4 mb-6">
                Framework de Compliance
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Políticas institucionais que regem todas as operações da Kodano.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {policies.map((policy, index) => (
                <div
                  key={index}
                  className="p-8 rounded-2xl bg-card border border-white/5 hover:border-primary/20 transition-all"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <policy.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{policy.title}</h3>
                  <p className="text-muted-foreground mb-6">{policy.description}</p>
                  <Link
                    href={policy.link}
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                  >
                    Ler política completa
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Controls */}
        <section className="py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Controles Técnicos
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold mt-4 mb-6">
                Segurança em camadas
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {technicalControls.map((control, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-card border border-white/5 text-center hover-lift"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <control.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{control.title}</h3>
                  <p className="text-sm text-muted-foreground">{control.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Data Encryption */}
        <section className="py-24 lg:py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
          
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-sm font-medium text-primary uppercase tracking-wider">
                  Criptografia
                </span>
                <h2 className="text-3xl md:text-4xl font-semibold mt-4 mb-6">
                  Proteção de dados
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Todos os dados sensíveis são protegidos com criptografia de nível bancário, 
                  tanto em trânsito quanto em repouso.
                </p>
                <ul className="space-y-4">
                  {[
                    "AES-256 para dados em repouso",
                    "TLS 1.3 para dados em trânsito",
                    "HSM para gestão de chaves",
                    "Tokenização de dados sensíveis",
                    "Segregação de ambientes",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-8 rounded-2xl bg-card border border-white/5">
                <h3 className="text-lg font-semibold mb-6">Política de Retenção</h3>
                <div className="space-y-4">
                  {[
                    { data: "Dados de verificação", period: "5 anos" },
                    { data: "Logs de acesso", period: "2 anos" },
                    { data: "Evidências de transação", period: "10 anos" },
                    { data: "Dados de sessão", period: "90 dias" },
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-4 rounded-lg bg-white/5">
                      <span className="text-muted-foreground">{item.data}</span>
                      <span className="text-primary font-medium">{item.period}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Governance */}
        <section className="py-24 lg:py-32">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Governança
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold mt-4 mb-6">
                Estrutura de Governança
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Governança corporativa sólida que garante a execução consistente 
                de políticas e procedimentos.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {governance.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-xl bg-card border border-white/5"
                >
                  <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-24 lg:py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/50 to-transparent" />
          
          <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Certificações
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold mt-4 mb-6">
              Padrões reconhecidos
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Comprometidos com os mais altos padrões de segurança e compliance.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "LGPD",
                "ISO 27001",
                "PCI DSS",
                "SOC 2",
              ].map((cert, index) => (
                <span
                  key={index}
                  className="px-6 py-3 rounded-full bg-card border border-white/10 font-medium"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 lg:py-32">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              Dúvidas sobre segurança?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Nossa equipe de compliance está disponível para esclarecer qualquer questão.
            </p>
            <Link
              href="/contato"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary-hover transition-all group"
            >
              Falar com Compliance
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
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

