import { Metadata } from "next";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Handshake, Users, Zap, TrendingUp, ArrowRight, Check, Building2, FileText, Code, BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "Como Funciona - Kodano",
  description:
    "Como a Kodano opera — ponta a ponta. Parcerias com adquirentes, onboarding do cliente, execução e liquidação direta.",
};

const steps = [
  {
    number: "01",
    icon: Handshake,
    title: "Parcerias com adquirentes",
    description:
      "Master Partner Agreements: Price Book por segmento/faixa, pisos, rebates, SLAs, sandbox e suporte técnico.",
  },
  {
    number: "02",
    icon: Users,
    title: "Onboarding do cliente",
    description:
      "Cadastro, KYC e seleção de adquirentes; emissão de MIDs vinculados ao Partner ID da Kodano.",
  },
  {
    number: "03",
    icon: Zap,
    title: "Execução",
    description:
      "Transações entram via API Kodano → motor de orquestração decide a rota ótima em tempo real → adquirente processa.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Liquidação",
    description:
      "Adquirente liquida direto ao cliente; a Kodano recebe seu fee via split automático (sem intermediar valores).",
  },
];

const whyAcquirers = [
  {
    icon: TrendingUp,
    title: "Volume incremental",
    description: "CAC ≈ 0",
  },
  {
    icon: Code,
    title: "Custo técnico baixo",
    description: "1 integração, N merchants",
  },
  {
    icon: BarChart3,
    title: "Dados de performance",
    description: "Aprovação/latência por vertical",
  },
  {
    icon: Building2,
    title: "Competição por eficiência",
    description: "E não guerra de preço",
  },
];

export default function ComoFuncionaPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
              Como a Kodano{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#002A35] via-[#004A5A] to-[#002A35] bg-[length:200%_100%] animate-gradient">
                opera
              </span>
              {" "}— ponta a ponta
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Uma integração, múltiplas adquirentes. Roteamento inteligente para menor custo e maior aprovação. Liquidação direta entre adquirente e cliente.
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {steps.map((step, index) => (
                <Card key={index} className="border-border hover:border-accent transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="inline-flex p-3 rounded-xl bg-accent/10">
                        <step.icon className="h-6 w-6 text-accent" />
                      </div>
                      <span className="text-2xl font-bold text-accent/20">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Acquirers Accept Section */}
      <section className="py-20 md:py-32 bg-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
                Por que as adquirentes{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#002A35] via-[#004A5A] to-[#002A35] bg-[length:200%_100%] animate-gradient">
                  aceitam
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {whyAcquirers.map((item, index) => (
                <Card key={index} className="border-border">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="inline-flex p-3 rounded-xl bg-accent/10">
                        <item.icon className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold font-[family-name:var(--font-poppins)] text-foreground mb-2">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
              Pronto para começar?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Fale conosco e veja como a Kodano pode otimizar seus pagamentos
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/contato">
                  Fale conosco
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

