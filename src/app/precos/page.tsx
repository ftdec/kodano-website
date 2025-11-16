import { Metadata } from "next";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Preços - Kodano",
  description: "Flexibilidade para acompanhar o ritmo da sua empresa.",
};

export default function PrecosPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
              Flexibilidade para acompanhar o ritmo da sua empresa.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Dois modelos simples e eficientes.
            </p>
          </div>
        </div>
      </section>

      {/* Planos */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            {/* Plano 1 */}
            <Card className="border-border">
              <CardHeader>
                <h3 className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-2">
                  Plano 1 – Pay as You Use
                </h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Sem mensalidade fixa</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Custos proporcionais ao uso</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Ideal para sazonalidade</span>
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/fale-conosco">
                    Fale Conosco
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Plano 2 */}
            <Card className="border-border">
              <CardHeader>
                <h3 className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-2">
                  Plano 2 – Plano Fixo Mensal com taxas reduzidas
                </h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Mensalidade fixa</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Taxas mais baixas</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Ideal para alto volume</span>
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/fale-conosco">
                    Fale Conosco
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Mensagem */}
          <div className="max-w-4xl mx-auto">
            <Card className="border-accent/20 bg-accent/5">
              <CardContent className="pt-6 text-center">
                <p className="text-foreground">
                  Modelos personalizados conforme operação.
                </p>
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
