import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Eye, Heart, Users, Building, Shield, Linkedin } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conheça a Kodano: missão, visão, valores, equipe fundadora e nossa filosofia de governança corporativa.",
};

export default function SobrePage() {
  const values = [
    {
      icon: Shield,
      title: "Segurança em Primeiro Lugar",
      description: "Toda decisão considera o impacto na segurança dos nossos clientes e seus dados.",
    },
    {
      icon: Users,
      title: "Parceria de Longo Prazo",
      description: "Construímos relacionamentos duradouros baseados em confiança e resultados.",
    },
    {
      icon: Target,
      title: "Excelência Técnica",
      description: "Infraestrutura robusta, código limpo, documentação completa.",
    },
    {
      icon: Heart,
      title: "Compromisso com o Cliente",
      description: "Sucesso do cliente é nosso sucesso. Suporte dedicado e responsivo.",
    },
  ];

  const founders = [
    {
      name: "Felipe Cabral",
      role: "CEO & Co-founder",
      bio: "Experiência em fintechs e pagamentos. Anteriormente em posições de liderança em empresas de tecnologia financeira.",
      linkedin: "https://linkedin.com/in/felipecabral",
    },
    {
      name: "Guilherme Cabral",
      role: "CTO & Co-founder",
      bio: "Engenheiro de software com foco em sistemas distribuídos e segurança. Background em infraestrutura crítica.",
      linkedin: "https://linkedin.com/in/guilhermecabral",
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
              Fale Conosco
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
                Sobre Nós
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mt-4 mb-6 leading-tight">
                Construindo{" "}
                <span className="gradient-text">confiança</span>
                <br />em pagamentos
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                A Kodano nasceu da visão de que transações de alto valor merecem 
                segurança proporcional. Somos infraestrutura, não produto.
              </p>
            </div>
          </div>
        </section>

        {/* Mission, Vision */}
        <section className="py-24 lg:py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/50 to-transparent" />
          
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 lg:p-12 rounded-2xl bg-card border border-white/5">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold mb-4">Missão</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Fornecer infraestrutura de verificação de identidade que permita 
                  a empresas operar com segurança em transações de alto valor, 
                  reduzindo fraudes e contestações de forma estrutural.
                </p>
              </div>
              
              <div className="p-8 lg:p-12 rounded-2xl bg-card border border-white/5">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold mb-4">Visão</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Ser a camada de confiança padrão para pagamentos de alto valor 
                  no Brasil e na América Latina, tornando fraude e contestação 
                  problemas do passado.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Valores
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold mt-4 mb-6">
                O que nos guia
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-card border border-white/5 hover:border-primary/20 transition-all hover-lift text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Founders */}
        <section className="py-24 lg:py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
          
          <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Liderança
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold mt-4 mb-6">
                Equipe Fundadora
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {founders.map((founder, index) => (
                <div
                  key={index}
                  className="p-8 rounded-2xl bg-card border border-white/5"
                >
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <Users className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{founder.name}</h3>
                  <p className="text-primary mb-4">{founder.role}</p>
                  <p className="text-muted-foreground mb-6">{founder.bio}</p>
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Info */}
        <section className="py-24 lg:py-32">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Building className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-semibold">Informações Legais</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Razão Social:</strong><br />
                    Kodano Tecnologia e Pagamentos LTDA
                  </p>
                  <p>
                    <strong className="text-foreground">CNPJ:</strong><br />
                    XX.XXX.XXX/0001-XX
                  </p>
                  <p>
                    <strong className="text-foreground">Endereço:</strong><br />
                    São Paulo, SP - Brasil
                  </p>
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-semibold">Governança</h2>
                </div>
                <p className="text-muted-foreground mb-6">
                  Operamos com estrutura de governança corporativa sólida, 
                  incluindo conselho consultivo, comitês especializados e 
                  processos de auditoria regular.
                </p>
                <Link
                  href="/seguranca-e-compliance"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  Ver políticas de compliance
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 lg:py-32 relative">
          <div className="absolute inset-0 gradient-radial" />
          
          <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              Quer conhecer mais?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Entre em contato e conheça como podemos ajudar sua operação.
            </p>
            <Link
              href="/contato"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary-hover transition-all group"
            >
              Falar com a Kodano
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

