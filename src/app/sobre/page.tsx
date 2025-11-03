import { Metadata } from "next";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Target, Users, Zap, ArrowRight, Heart, Shield, Code } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre a Kodano - Gateway de Pagamentos B2B",
  description:
    "Conheça a Kodano, nossa missão de simplificar pagamentos para empresas e a história por trás da plataforma.",
};

const values = [
  {
    icon: Heart,
    title: "Centrados no cliente",
    description:
      "Cada decisão que tomamos tem como foco resolver problemas reais dos nossos clientes.",
  },
  {
    icon: Shield,
    title: "Segurança em primeiro lugar",
    description:
      "Proteção de dados e transações é nossa prioridade máxima em tudo que fazemos.",
  },
  {
    icon: Code,
    title: "Developer-first",
    description:
      "Construímos ferramentas que desenvolvedores adoram usar, com APIs claras e documentação excelente.",
  },
  {
    icon: Zap,
    title: "Velocidade",
    description:
      "Agilidade na implementação, nas respostas e na evolução constante da plataforma.",
  },
];

const milestones = [
  {
    year: "2023",
    title: "Fundação",
    description:
      "Kodano é fundada com a missão de simplificar pagamentos para empresas B2B.",
  },
  {
    year: "2024",
    title: "Primeiros clientes",
    description:
      "Conquistamos nossos primeiros 100 clientes e processamos R$ 50M em transações.",
  },
  {
    year: "2025",
    title: "Expansão",
    description:
      "Lançamento de novos produtos e expansão para outros países da América Latina.",
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
              Simplificando{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                pagamentos
              </span>{" "}
              para empresas
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              A Kodano nasceu da frustração com a complexidade dos sistemas de
              pagamento tradicionais. Nossa missão é criar a melhor
              infraestrutura de pagamentos para empresas B2B.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="border-border">
              <CardHeader>
                <Target className="h-12 w-12 text-accent mb-4" />
                <h2 className="text-3xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-4">
                  Nossa Missão
                </h2>
                <p className="text-lg text-muted-foreground">
                  Capacitar empresas de todos os tamanhos com uma infraestrutura
                  de pagamentos moderna, segura e fácil de usar. Acreditamos que
                  aceitar pagamentos não deveria ser complicado.
                </p>
              </CardHeader>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <Users className="h-12 w-12 text-accent mb-4" />
                <h2 className="text-3xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-4">
                  Nossa Visão
                </h2>
                <p className="text-lg text-muted-foreground">
                  Ser a infraestrutura de pagamentos preferida por empresas B2B
                  na América Latina, conhecida pela excelência técnica, suporte
                  excepcional e inovação constante.
                </p>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-32 bg-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
              Nossos valores
            </h2>
            <p className="text-lg text-muted-foreground">
              Princípios que guiam cada decisão que tomamos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {values.map((value, index) => (
              <Card
                key={index}
                className="border-border text-center hover:border-accent transition-all"
              >
                <CardContent className="pt-6">
                  <div className="inline-flex p-4 rounded-xl bg-accent/10 mb-4">
                    <value.icon className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
              Nossa trajetória
            </h2>
            <p className="text-lg text-muted-foreground">
              Do primeiro commit à plataforma que processamos milhões hoje
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-accent">
                      {milestone.year}
                    </span>
                  </div>
                </div>
                <Card className="flex-1 border-border">
                  <CardHeader>
                    <h3 className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-lg text-muted-foreground">
                      {milestone.description}
                    </p>
                  </CardHeader>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
              Fundadores
            </h2>
            <p className="text-lg text-muted-foreground">
              Conheça os fundadores por trás da Kodano
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-border text-center">
              <CardContent className="pt-8">
                <div className="inline-flex w-24 h-24 rounded-full bg-accent/10 items-center justify-center mb-4">
                  <Users className="h-12 w-12 text-accent" />
                </div>
                <h3 className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-2">
                  Felipe Caltabiano Távora de Castro
                </h3>
                <p className="text-accent font-semibold mb-4">Co-Founder</p>
                <p className="text-muted-foreground">
                  Visão estratégica e liderança em infraestrutura de pagamentos B2B
                </p>
              </CardContent>
            </Card>

            <Card className="border-border text-center">
              <CardContent className="pt-8">
                <div className="inline-flex w-24 h-24 rounded-full bg-accent/10 items-center justify-center mb-4">
                  <Users className="h-12 w-12 text-accent" />
                </div>
                <h3 className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-2">
                  Marcelo Kodaira Almeida
                </h3>
                <p className="text-accent font-semibold mb-4">Co-Founder</p>
                <p className="text-muted-foreground">
                  Expertise em tecnologia e desenvolvimento de soluções escaláveis
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-32 bg-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
              Junte-se ao nosso time
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Estamos sempre em busca de pessoas talentosas e apaixonadas por
              tecnologia para crescer conosco.
            </p>
            <Button size="lg" variant="outline" asChild>
              <Link href="/carreiras">
                Ver vagas abertas
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
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
                  Falar com vendas
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/desenvolvedores">Começar grátis</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
