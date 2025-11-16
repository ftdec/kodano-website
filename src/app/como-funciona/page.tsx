import { Metadata } from "next";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Como Funciona - Kodano",
  description: "Orquestração feita com precisão. A rota certa, no momento certo.",
};

export default function ComoFuncionaPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
              Orquestração feita com precisão.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
              A rota certa, no momento certo.
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Simplifica a gestão de múltiplas adquirentes.
            </p>
          </div>
        </div>
      </section>

      {/* Passos */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <Card className="border-border">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl font-bold text-accent mb-4">1</div>
                <h3 className="text-xl font-semibold font-[family-name:var(--font-poppins)] text-foreground">
                  Conectamos sua empresa.
                </h3>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl font-bold text-accent mb-4">2</div>
                <h3 className="text-xl font-semibold font-[family-name:var(--font-poppins)] text-foreground">
                  Integramos adquirentes.
                </h3>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl font-bold text-accent mb-4">3</div>
                <h3 className="text-xl font-semibold font-[family-name:var(--font-poppins)] text-foreground">
                  Roteamento inteligente.
                </h3>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl font-bold text-accent mb-4">4</div>
                <h3 className="text-xl font-semibold font-[family-name:var(--font-poppins)] text-foreground">
                  Acompanhamento claro.
                </h3>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-accent/5">
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
