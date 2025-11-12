import { Metadata } from "next";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Code2,
  TrendingUp,
  BarChart3,
  Shield,
  Activity,
  ArrowRight,
  Check,
  Zap,
  Eye,
  Lock,
  Database,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Produto - Plataforma Kodano",
  description:
    "Uma API unificada, um dashboard completo e um motor de orquestração configurável — com segurança, observabilidade e SLAs corporativos.",
};

const productFeatures = [
  {
    id: "api",
    icon: Code2,
    title: "API Unificada",
    description:
      "Endpoints padrão para todas as operações de pagamento e gestão.",
    features: [
      "/payments — Criar e processar pagamentos",
      "/refunds — Reembolsos e estornos",
      "/capture — Captura de autorizações",
      "/void — Cancelamento de transações",
      "/settlements — Consulta de liquidações",
      "/anticipation — Antecipação via adquirentes",
      "/disputes — Gestão de chargebacks",
      "/rates — Consulta de taxas",
      "/health — Status do sistema",
    ],
    codeExample: `// Exemplo: Criar pagamento
POST /api/v1/payments
{
  "amount": 10000,
  "currency": "BRL",
  "payment_method": "credit_card",
  "card": {
    "number": "4111111111111111",
    "exp_month": 12,
    "exp_year": 2025
  }
}

// A Kodano roteia automaticamente
// para a melhor adquirente`,
  },
  {
    id: "orchestration",
    icon: TrendingUp,
    title: "Motor de Orquestração",
    description:
      "Estratégias configuráveis de roteamento baseadas em eficiência e regras do cliente.",
    features: [
      "Roteamento por MDR efetivo",
      "Roteamento por aprovação",
      "Roteamento por latência/uptime",
      "Roteamento por liquidação",
      "Regras customizadas por bandeira",
      "Regras por BIN",
      "Regras por ticket médio",
      "Fallback automático",
    ],
    codeExample: `// Configuração de estratégia
{
  "strategy": "lowest_mdr",
  "fallback": {
    "on_failure": "next_best_approval",
    "on_timeout": "fastest_latency"
  },
  "rules": [
    {
      "condition": "bin.startsWith('4')",
      "route_to": "acquirer_a"
    }
  ]
}`,
  },
  {
    id: "dashboard",
    icon: BarChart3,
    title: "Dashboard",
    description:
      "Governança completa com dados centralizados de todas as adquirentes.",
    features: [
      "Taxas por adquirente em tempo real",
      "Saving report — economia vs. MDR direto",
      "Métricas de aprovação por adquirente",
      "SLA de liquidação e previsibilidade",
      "Conciliação multiadquirente",
      "Export de relatórios",
      "Auditoria completa de transações",
    ],
    codeExample: `// Todos os planos incluem
// acesso completo ao Dashboard Kodano

Dashboard Features:
✓ Taxas efetivas por adquirente
✓ Aprovação por bandeira/BIN
✓ Latência e uptime
✓ Conciliação automática
✓ Relatórios exportáveis`,
  },
  {
    id: "security",
    icon: Shield,
    title: "Segurança",
    description:
      "LGPD, PCI-ready, tokenização e criptografia end-to-end.",
    features: [
      "LGPD — Minimização de dados",
      "Base legal: execução contratual",
      "PCI-ready — Infraestrutura preparada",
      "Tokenização via adquirentes",
      "Segredos em KMS (Key Management)",
      "Criptografia em trânsito (TLS 1.3)",
      "Criptografia em repouso",
      "Auditoria de logs",
    ],
    codeExample: `// Segurança em camadas
- Tokenização: dados sensíveis
  nunca chegam ao seu servidor
- KMS: chaves criptográficas
  gerenciadas separadamente
- TLS 1.3: comunicação
  criptografada end-to-end`,
  },
  {
    id: "observability",
    icon: Activity,
    title: "Observabilidade",
    description:
      "Tracing, métricas, alertas e status público por adquirente.",
    features: [
      "Tracing com OpenTelemetry",
      "Métricas em tempo real",
      "Alertas configuráveis",
      "Status público por adquirente",
      "RCAs (Root Cause Analysis)",
      "Logs estruturados",
      "Dashboards de performance",
    ],
    codeExample: `// Observabilidade completa
GET /api/v1/health

{
  "status": "operational",
  "acquirers": {
    "acquirer_a": {
      "status": "operational",
      "latency_p95": 120,
      "approval_rate": 94.2
    },
    "acquirer_b": {
      "status": "degraded",
      "latency_p95": 450,
      "approval_rate": 91.8
    }
  }
}`,
  },
];

export default function ProdutosPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
              Plataforma{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Kodano
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Tudo que você precisa em uma única plataforma: API unificada, dashboard completo e roteamento inteligente.
            </p>
          </div>
        </div>
      </section>

      {/* Product Features */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {productFeatures.map((feature, index) => (
              <div
                key={feature.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="inline-flex p-4 rounded-xl bg-accent/10 mb-6">
                    <feature.icon className="h-8 w-8 text-accent" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-4">
                    {feature.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    {feature.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Code Example */}
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <Card className="border-border bg-card">
                    <CardHeader>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Code2 className="h-5 w-5" />
                        <span className="text-sm font-medium">Exemplo</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto">
                        <code className="text-sm text-foreground font-mono whitespace-pre-wrap">
                          {feature.codeExample}
                        </code>
                      </pre>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Note */}
      <section className="py-20 bg-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-4xl mx-auto border-accent/20 bg-accent/5">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <div className="inline-flex p-3 rounded-xl bg-accent/20">
                  <Eye className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-2">
                    Importante
                  </h3>
                  <p className="text-foreground">
                    <strong>Todos os planos</strong> (pay-as-you-use ou fixo+variável) incluem <strong>acesso completo ao Dashboard Kodano</strong>.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
              Pronto para integrar?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Solicite uma demonstração e veja a plataforma em ação
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/contato">
                  Solicitar uma demonstração
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/desenvolvedores">Ver documentação</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
