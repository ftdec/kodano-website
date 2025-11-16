import { Metadata } from "next";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Plane,
  Store,
  Heart,
  Calendar,
  Building2,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Clock,
  FileText,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Para Empresas - Kodano",
  description:
    "Menor custo efetivo, maior aprovação e liquidação previsível. Sem trocar de adquirente: você adiciona a Kodano como camada de orquestração.",
};

const benefits = [
  {
    icon: TrendingDown,
    title: "Economia direta",
    description: "Redução no MDR efetivo",
  },
  {
    icon: TrendingUp,
    title: "Aprovação superior",
    description: "Por emissor/bandeira/ticket",
  },
  {
    icon: Clock,
    title: "SLA de liquidação",
    description: "Previsibilidade de fluxo de caixa",
  },
  {
    icon: FileText,
    title: "Conciliação multiadquirente",
    description: "E auditoria centralizada",
  },
  {
    icon: Zap,
    title: "Time-to-market",
    description: "Uma integração, várias adquirentes",
  },
];

const verticals = [
  {
    name: "Turismo",
    icon: Plane,
    description: "Alta aprovação para transações internacionais e parcelamento em viagens.",
  },
  {
    name: "Varejo",
    icon: Store,
    description: "Otimização de taxas e aprovação para e-commerce e varejo físico.",
  },
  {
    name: "Saúde",
    icon: Heart,
    description: "Liquidação previsível para clínicas, hospitais e telemedicina.",
  },
  {
    name: "Eventos",
    icon: Calendar,
    description: "Alta aprovação em picos de demanda e gestão de reembolsos.",
  },
  {
    name: "Plataformas/ERPs",
    icon: Building2,
    description: "Orquestração para múltiplos clientes com governança centralizada.",
  },
];

export default function SolucoesPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
              Menor custo efetivo, maior aprovação e{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#002A35] via-[#004A5A] to-[#002A35] bg-[length:200%_100%] animate-gradient">
                liquidação previsível
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Otimize seus pagamentos sem trocar de adquirente. Uma integração, múltiplas adquirentes.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6 text-center">
              Benefícios{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#002A35] via-[#004A5A] to-[#002A35] bg-[length:200%_100%] animate-gradient">
                mensuráveis
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-border hover:border-accent transition-all">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="inline-flex p-3 rounded-xl bg-accent/10">
                      <benefit.icon className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold font-[family-name:var(--font-poppins)] text-foreground mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Verticals Section */}
      <section className="py-20 md:py-32 bg-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6 text-center">
              Soluções por{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#002A35] via-[#004A5A] to-[#002A35] bg-[length:200%_100%] animate-gradient">
                vertical
              </span>
            </h2>
            <p className="text-lg text-muted-foreground text-center">
              Otimização específica para cada segmento de mercado
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {verticals.map((vertical, index) => (
              <Card key={index} className="border-border hover:border-accent transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="inline-flex p-4 rounded-xl bg-accent/10 mb-4">
                    <vertical.icon className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                    {vertical.name}
                  </h3>
                  <p className="text-muted-foreground">{vertical.description}</p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
              Pronto para otimizar seus pagamentos?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Fale conosco e veja os ganhos potenciais para seu negócio
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/contato">
                  Fale conosco
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/precos">Ver modelos de preço</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
