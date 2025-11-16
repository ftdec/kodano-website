import { Metadata } from "next";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Para Empresas - Kodano",
  description: "Tecnologia que impulsiona empresas que crescem com consistência.",
};

const beneficios = [
  "Mais aprovação",
  "Menor custo por transação",
  "Painel unificado",
  "Simplificação operacional",
  "Suporte próximo",
];

const casosDeUso = [
  "E-commerce",
  "Assinaturas",
  "Marketplaces",
  "Apps",
  "Serviços digitais",
];

export default function ParaEmpresasPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
              Tecnologia que impulsiona empresas que crescem com consistência.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Eficiência, estabilidade, clareza.
            </p>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6 text-center">
              Benefícios
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {beneficios.map((beneficio, index) => (
              <Card key={index} className="border-border">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-3">
                    <Check className="h-6 w-6 text-accent mt-0.5 flex-shrink-0" />
                    <h3 className="text-lg font-semibold font-[family-name:var(--font-poppins)] text-foreground">
                      {beneficio}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Casos de uso */}
      <section className="py-20 md:py-32 bg-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6 text-center">
              Casos de uso
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {casosDeUso.map((caso, index) => (
              <Card key={index} className="border-border">
                <CardContent className="pt-6 text-center">
                  <h3 className="text-lg font-semibold font-[family-name:var(--font-poppins)] text-foreground">
                    {caso}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
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

