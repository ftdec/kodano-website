import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Code2, Webhook, Shield, Clock, Server, CheckCircle, Terminal, Key, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Integração",
  description: "Documentação técnica da API Kodano: REST, webhooks, sandbox, segurança e timeline de implementação.",
};

export default function IntegracaoPage() {
  const features = [
    {
      icon: Code2,
      title: "REST API",
      description: "Interface RESTful simples e bem documentada. JSON request/response, autenticação via API Key.",
    },
    {
      icon: Webhook,
      title: "Webhooks",
      description: "Receba eventos em tempo real: verificação iniciada, concluída, aprovada ou rejeitada.",
    },
    {
      icon: Shield,
      title: "Segurança",
      description: "HTTPS obrigatório, criptografia AES-256, assinatura HMAC para webhooks.",
    },
    {
      icon: Server,
      title: "SLA & Uptime",
      description: "99.9% de disponibilidade garantida. Latência média < 500ms. Suporte 24/7.",
    },
  ];

  const timeline = [
    { week: "Semana 1", title: "Setup & Credenciais", desc: "Configuração de ambiente sandbox e chaves de API" },
    { week: "Semana 2", title: "Integração Core", desc: "Implementação do fluxo principal de verificação" },
    { week: "Semana 3", title: "Testes & Ajustes", desc: "Validação de cenários e ajustes finos" },
    { week: "Semana 4", title: "Go-Live", desc: "Migração para produção e monitoramento" },
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
                Integração
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mt-4 mb-6 leading-tight">
                API moderna e{" "}
                <span className="gradient-text">flexível</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Integração simples, documentação completa, ambiente sandbox para testes. 
                Implementação típica em 2-4 semanas.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contato"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary-hover transition-all group"
                >
                  Solicitar Acesso
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="#docs"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-white/10 rounded-xl font-medium hover:bg-white/5 transition-all"
                >
                  Ver Documentação
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 lg:py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/50 to-transparent" />
          
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex gap-6 p-8 rounded-2xl bg-card border border-white/5 hover:border-primary/20 transition-all"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Code Examples */}
        <section id="docs" className="py-24 lg:py-32 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Exemplos de Código
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold mt-4 mb-6">
                Integração em minutos
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Create Verification */}
              <div className="rounded-2xl bg-card border border-white/5 overflow-hidden">
                <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
                  <Terminal className="w-5 h-5 text-primary" />
                  <span className="font-medium">Criar Verificação</span>
                </div>
                <pre className="p-6 text-sm overflow-x-auto">
                  <code className="text-muted-foreground">{`// POST /v1/verifications
const response = await fetch(
  'https://api.kodano.com.br/v1/verifications',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer sk_live_...',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      transaction_id: 'txn_123456',
      amount: 50000, // R$ 500,00 em centavos
      customer: {
        document: '123.456.789-00',
        name: 'João Silva',
        email: 'joao@email.com'
      },
      metadata: {
        order_id: 'order_789'
      }
    })
  }
);

const verification = await response.json();
// { id: 'ver_abc123', status: 'pending', ... }`}</code>
                </pre>
              </div>

              {/* Webhook Event */}
              <div className="rounded-2xl bg-card border border-white/5 overflow-hidden">
                <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
                  <Webhook className="w-5 h-5 text-primary" />
                  <span className="font-medium">Webhook Event</span>
                </div>
                <pre className="p-6 text-sm overflow-x-auto">
                  <code className="text-muted-foreground">{`// Webhook: verification.completed
{
  "id": "evt_xyz789",
  "type": "verification.completed",
  "data": {
    "verification_id": "ver_abc123",
    "transaction_id": "txn_123456",
    "status": "approved",
    "confidence_score": 0.987,
    "verified_at": "2026-02-11T14:30:00Z",
    "evidence": {
      "document_match": true,
      "biometric_match": true,
      "liveness_check": true
    }
  },
  "created_at": "2026-02-11T14:30:00Z"
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Sandbox */}
        <section className="py-24 lg:py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
          
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-sm font-medium text-primary uppercase tracking-wider">
                  Ambiente de Testes
                </span>
                <h2 className="text-3xl md:text-4xl font-semibold mt-4 mb-6">
                  Sandbox completo
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Teste toda a integração sem riscos. Ambiente isolado que simula 
                  todos os cenários: aprovação, rejeição, timeout, erros.
                </p>
                <ul className="space-y-4">
                  {[
                    "Credenciais de teste separadas",
                    "Simulação de todos os cenários",
                    "Logs detalhados para debugging",
                    "Sem custos durante desenvolvimento",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-8 rounded-2xl bg-card border border-white/5">
                <div className="flex items-center gap-3 mb-6">
                  <Key className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-semibold">Credenciais Sandbox</h3>
                </div>
                <div className="space-y-4 font-mono text-sm">
                  <div className="p-4 rounded-lg bg-white/5">
                    <span className="text-muted-foreground">API Key:</span>
                    <div className="text-primary mt-1">sk_test_xxxxxxxxxxxxxxxxxx</div>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5">
                    <span className="text-muted-foreground">Webhook Secret:</span>
                    <div className="text-primary mt-1">whsec_xxxxxxxxxxxxxxxxxx</div>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5">
                    <span className="text-muted-foreground">Base URL:</span>
                    <div className="text-primary mt-1">https://sandbox.kodano.com.br</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-24 lg:py-32">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Timeline
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold mt-4 mb-6">
                Implementação em 2-4 semanas
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {timeline.map((item, index) => (
                <div key={index} className="relative">
                  <div className="p-6 rounded-2xl bg-card border border-white/5 hover:border-primary/20 transition-all h-full">
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-primary">{item.week}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-white/10 to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security Controls */}
        <section className="py-24 lg:py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/50 to-transparent" />
          
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Segurança
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold mt-4 mb-6">
                Controles de Segurança
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Shield, title: "HTTPS Obrigatório", desc: "Todas as comunicações são criptografadas via TLS 1.3" },
                { icon: Key, title: "API Keys Seguras", desc: "Rotação de chaves, escopo por ambiente, revogação imediata" },
                { icon: Zap, title: "Rate Limiting", desc: "Proteção contra abuso com limites configuráveis" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-card border border-white/5 text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 lg:py-32">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              Pronto para integrar?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Solicite acesso à API e comece a testar hoje mesmo.
            </p>
            <Link
              href="/contato"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary-hover transition-all group"
            >
              Solicitar Acesso à API
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

