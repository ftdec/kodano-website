import { Metadata } from "next";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Target, Users, Zap, ArrowRight, Heart, Shield, Code, Scale, Eye, TrendingUp, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre a Kodano - Por que criamos a Kodano",
  description:
    "O mercado de pagamentos brasileiro é grande e ineficiente. A Kodano surgiu para orquestrar o ecossistema, negociando, integrando e roteando de forma neutra e inteligente — sem tocar no dinheiro.",
};

const principles = [
  {
    icon: Scale,
    title: "Neutralidade",
    description:
      "Roteamento baseado em eficiência, não em preferências comerciais.",
  },
  {
    icon: Shield,
    title: "Segurança",
    description:
      "LGPD, PCI-ready e compliance-first em tudo que fazemos.",
  },
  {
    icon: Eye,
    title: "Transparência",
    description:
      "Dados, relatórios e métricas acessíveis para governança completa.",
  },
  {
    icon: TrendingUp,
    title: "Performance",
    description:
      "Otimização contínua de aprovação, latência e custo efetivo.",
  },
  {
    icon: CheckCircle,
    title: "Compliance-first",
    description:
      "Auditoria de logs, status público, RCAs e conformidade regulatória.",
  },
];

const compliance = [
  {
    title: "LGPD",
    description: "Minimização de dados; base legal: execução contratual",
  },
  {
    title: "PCI-ready",
    description: "Infraestrutura preparada para certificação PCI DSS",
  },
  {
    title: "Auditoria",
    description: "Logs estruturados e rastreabilidade completa",
  },
  {
    title: "Status público",
    description: "Transparência sobre operação e performance",
  },
  {
    title: "RCAs",
    description: "Root Cause Analysis para incidentes",
  },
];

export default function SobrePage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
              Por que criamos a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Kodano
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              O mercado de pagamentos brasileiro é grande e ineficiente. Empresas negociam isoladamente, prendem-se a 1 adquirente e integram APIs distintas. A Kodano surgiu para <strong>orquestrar</strong> o ecossistema, <strong>negociando, integrando e roteando</strong> de forma <strong>neutra</strong> e <strong>inteligente</strong> — <strong>sem tocar no dinheiro</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
              Nossos princípios
            </h2>
            <p className="text-lg text-muted-foreground">
              Valores que guiam cada decisão que tomamos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {principles.map((principle, index) => (
              <Card
                key={index}
                className="border-border text-center hover:border-accent transition-all"
              >
                <CardContent className="pt-6">
                  <div className="inline-flex p-4 rounded-xl bg-accent/10 mb-4">
                    <principle.icon className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                    {principle.title}
                  </h3>
                  <p className="text-muted-foreground">{principle.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-20 md:py-32 bg-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
                Compliance
              </h2>
              <p className="text-lg text-muted-foreground">
                Conformidade regulatória e segurança em primeiro lugar
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {compliance.map((item, index) => (
                <Card key={index} className="border-border">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold font-[family-name:var(--font-poppins)] text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Legal Message */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-4xl mx-auto border-accent/20 bg-accent/5">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <p className="text-foreground">
                  <strong>A Kodano é uma plataforma SaaS</strong> de orquestração. <strong>Não</strong> custodia valores, <strong>não</strong> liquida e <strong>não</strong> antecipa.
                </p>
                <p className="text-foreground">
                  Liquidação financeira é realizada <strong>diretamente pelas adquirentes</strong> ao cliente.
                </p>
                <p className="text-foreground">
                  Modelos de preço são <strong>B2B e tailor-made</strong>; fale com vendas.
                </p>
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
              Vamos crescer juntos?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Converse com nosso time e descubra como podemos ajudar seu negócio
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/contato">
                  Solicitar uma demonstração
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/produtos">Ver produtos</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
