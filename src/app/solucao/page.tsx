import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield, Eye, FileCheck, Layers, CheckCircle, Zap, Lock, BarChart } from "lucide-react";

export const metadata: Metadata = {
  title: "Solução",
  description: "Verificação de identidade pré-aprovação para transações de alto valor. Orquestração de risco inteligente com evidências para defesa.",
};

export default function SolucaoPage() {
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
                A Solução
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mt-4 mb-6 leading-tight">
                Verificação pré-aprovação para{" "}
                <span className="gradient-text">alto valor</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                A Kodano atua no momento crítico da aprovação, confirmando a identidade do pagador 
                e gerando evidências que protegem sua operação.
              </p>
              <Link
                href="/contato"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary-hover transition-all group"
              >
                Falar com Especialista
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Conceito Pré-Aprovação */}
        <section className="py-24 lg:py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/50 to-transparent" />
          
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-sm font-medium text-primary uppercase tracking-wider">
                  Conceito Central
                </span>
                <h2 className="text-3xl md:text-4xl font-semibold mt-4 mb-6">
                  Verificação antes da aprovação
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Diferente de soluções tradicionais que atuam após o pagamento, 
                  a Kodano intervém no momento exato da aprovação — quando ainda 
                  é possível prevenir, não apenas remediar.
                </p>
                <ul className="space-y-4">
                  {[
                    "Identidade confirmada antes da transação ser autorizada",
                    "Nível de verificação proporcional ao valor",
                    "Decisão em tempo real sem fricção excessiva",
                    "Evidências geradas automaticamente",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="relative">
                <div className="p-8 rounded-2xl bg-card border border-white/5">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
                      <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                        <Zap className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Tempo Real</h4>
                        <p className="text-sm text-muted-foreground">Verificação em milissegundos</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
                      <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                        <Lock className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Seguro</h4>
                        <p className="text-sm text-muted-foreground">Criptografia end-to-end</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
                      <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                        <BarChart className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Proporcional</h4>
                        <p className="text-sm text-muted-foreground">Adequado ao valor da transação</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Orquestração de Risco */}
        <section className="py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Motor de Risco
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold mt-4 mb-6">
                Orquestração inteligente
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                O motor de risco Kodano analisa múltiplas variáveis para determinar 
                o nível adequado de verificação.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Shield, title: "Análise de Risco", desc: "Score dinâmico baseado em contexto" },
                { icon: Eye, title: "Verificação Modular", desc: "Ativação por threshold de valor" },
                { icon: FileCheck, title: "Evidências", desc: "Documentação automática" },
                { icon: Layers, title: "Integração", desc: "Compatível com gateways" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-card border border-white/5 hover:border-primary/20 transition-all hover-lift"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modelo de Evidências */}
        <section className="py-24 lg:py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
          
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="p-8 rounded-2xl bg-card border border-white/5">
                  <h4 className="font-semibold mb-6">Dados Capturados</h4>
                  <div className="space-y-4 font-mono text-sm">
                    {[
                      { label: "Timestamp", value: "2026-02-11T14:30:00Z" },
                      { label: "ID Transação", value: "txn_8f7d6c5b4a3e2f1g" },
                      { label: "Documento", value: "***.***.789-00" },
                      { label: "Verificação", value: "Biometria facial" },
                      { label: "Match Score", value: "98.7%" },
                      { label: "Dispositivo", value: "iPhone 15 Pro" },
                      { label: "Geolocalização", value: "São Paulo, SP" },
                      { label: "IP", value: "189.***.***.42" },
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="text-primary">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="order-1 lg:order-2">
                <span className="text-sm font-medium text-primary uppercase tracking-wider">
                  Evidências
                </span>
                <h2 className="text-3xl md:text-4xl font-semibold mt-4 mb-6">
                  Documentação para defesa
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Cada verificação gera um pacote completo de evidências que pode ser 
                  utilizado em disputas e contestações, fortalecendo sua posição jurídica.
                </p>
                <ul className="space-y-4">
                  {[
                    "Prova de consentimento do titular",
                    "Dados biométricos e documentais",
                    "Metadados de dispositivo e localização",
                    "Trilha de auditoria completa",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 lg:py-32">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              Pronto para conhecer a solução?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Agende uma demonstração e veja como funciona na prática.
            </p>
            <Link
              href="/contato"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary-hover transition-all group"
            >
              Agendar Demonstração
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

