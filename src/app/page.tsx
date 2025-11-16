import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, TrendingUp, DollarSign, LayoutDashboard, Shield } from "lucide-react";

/**
 * PRD DEFINITIVO – Homepage Kodano
 * Implementação exata conforme PRD-Kodano-Final.md
 */
export default function Home() {
  return (
    <MainLayout>
      {/* 3.1 HERO */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
              Pagamentos inteligentes para empresas que exigem eficiência.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Orquestração que aumenta aprovação, reduz custos e traz clareza operacional.
            </p>
            <Button size="lg" asChild>
              <Link href="/fale-conosco">
                Fale Conosco
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 3.2 Benefícios */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <Card className="border-border hover:border-accent transition-all">
              <CardContent className="pt-6">
                <div className="inline-flex p-3 rounded-xl bg-accent/10 mb-4">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                  Mais aprovação, menos atrito
                </h3>
                <p className="text-muted-foreground">
                  Roteamos pela melhor rota.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:border-accent transition-all">
              <CardContent className="pt-6">
                <div className="inline-flex p-3 rounded-xl bg-accent/10 mb-4">
                  <DollarSign className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                  Eficiência de custos
                </h3>
                <p className="text-muted-foreground">
                  Reduza taxas com operação inteligente.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:border-accent transition-all">
              <CardContent className="pt-6">
                <div className="inline-flex p-3 rounded-xl bg-accent/10 mb-4">
                  <LayoutDashboard className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                  Centro de controle unificado
                </h3>
                <p className="text-muted-foreground">
                  Acompanhe tudo em um painel.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:border-accent transition-all">
              <CardContent className="pt-6">
                <div className="inline-flex p-3 rounded-xl bg-accent/10 mb-4">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                  Tecnologia que inspira confiança
                </h3>
                <p className="text-muted-foreground">
                  Infra moderna e estável.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 3.3 Como Funciona (resumo) */}
      <section className="py-20 md:py-32 bg-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
              Como Funciona
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-12">
            <Card className="border-border">
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-accent mb-4">1</div>
                <h3 className="text-lg font-semibold font-[family-name:var(--font-poppins)] text-foreground mb-2">
                  Conectamos sua empresa.
                </h3>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-accent mb-4">2</div>
                <h3 className="text-lg font-semibold font-[family-name:var(--font-poppins)] text-foreground mb-2">
                  Integramos adquirentes.
                </h3>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-accent mb-4">3</div>
                <h3 className="text-lg font-semibold font-[family-name:var(--font-poppins)] text-foreground mb-2">
                  Roteamos com inteligência.
                </h3>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-accent mb-4">4</div>
                <h3 className="text-lg font-semibold font-[family-name:var(--font-poppins)] text-foreground mb-2">
                  Você acompanha tudo.
                </h3>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" asChild>
              <Link href="/fale-conosco">
                Fale Conosco
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 3.4 Produtos (resumo) */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
              Produtos
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-12">
            <Card className="border-border">
              <CardContent className="pt-6 text-center">
                <h3 className="text-lg font-semibold font-[family-name:var(--font-poppins)] text-foreground mb-2">
                  Orquestração Inteligente
                </h3>
                <p className="text-muted-foreground text-sm">
                  melhor rota.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6 text-center">
                <h3 className="text-lg font-semibold font-[family-name:var(--font-poppins)] text-foreground mb-2">
                  Checkout Otimizado
                </h3>
                <p className="text-muted-foreground text-sm">
                  fluxo rápido.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6 text-center">
                <h3 className="text-lg font-semibold font-[family-name:var(--font-poppins)] text-foreground mb-2">
                  Antifraude
                </h3>
                <p className="text-muted-foreground text-sm">
                  proteção adicional.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6 text-center">
                <h3 className="text-lg font-semibold font-[family-name:var(--font-poppins)] text-foreground mb-2">
                  Dashboard
                </h3>
                <p className="text-muted-foreground text-sm">
                  visão clara.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" asChild>
              <Link href="/fale-conosco">
                Fale Conosco
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
