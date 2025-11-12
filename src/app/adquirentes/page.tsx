import { Metadata } from "next";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  TrendingUp,
  Code,
  BarChart3,
  Target,
  ArrowRight,
  Check,
  Users,
  Zap,
  Shield,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Para Adquirentes - Kodano",
  description:
    "Parceria para eficiência e crescimento de volume. A Kodano amplifica o alcance das adquirentes com merchants prontos e reduz CAC.",
};

const benefits = [
  {
    icon: TrendingUp,
    title: "Volume incremental qualificado",
    description:
      "Merchants prontos para processar, sem necessidade de aquisição direta.",
  },
  {
    icon: Code,
    title: "Integração única, múltiplos clientes",
    description:
      "Uma integração técnica com a Kodano, acesso a N merchants.",
  },
  {
    icon: BarChart3,
    title: "Dados para otimizar",
    description:
      "Aprovação e latência por vertical para melhorar performance.",
  },
  {
    icon: Target,
    title: "Competição por eficiência",
    description:
      "Ganha onde é melhor, não guerra de preço.",
  },
];

export default function AdquirentesPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
              Parceria para{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                eficiência e crescimento
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              A Kodano não compete pela liquidação; <strong>amplifica</strong> o alcance das adquirentes com merchants prontos, reduz CAC e oferece <strong>dados de performance</strong> por vertical.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6 text-center">
              Benefícios da{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                parceria
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-border hover:border-accent transition-all hover:shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="inline-flex p-4 rounded-xl bg-accent/10">
                      <benefit.icon className="h-8 w-8 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition Box */}
      <section className="py-20 bg-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-4xl mx-auto border-accent/20 bg-background">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="inline-flex p-4 rounded-xl bg-accent/10 mb-4">
                    <Users className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">CAC ≈ 0</h3>
                  <p className="text-muted-foreground">Volume incremental sem custo de aquisição</p>
                </div>
                <div>
                  <div className="inline-flex p-4 rounded-xl bg-accent/10 mb-4">
                    <Zap className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">1 integração</h3>
                  <p className="text-muted-foreground">Custo técnico baixo para múltiplos merchants</p>
                </div>
                <div>
                  <div className="inline-flex p-4 rounded-xl bg-accent/10 mb-4">
                    <BarChart3 className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Dados de performance</h3>
                  <p className="text-muted-foreground">Aprovação e latência por vertical</p>
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
              Vamos conversar sobre parceria?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Entre em contato com nosso time comercial para discutir como podemos trabalhar juntos
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/contato">
                  Falar com vendas
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

