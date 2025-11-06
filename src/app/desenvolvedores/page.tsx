"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { DevelopersHero } from "@/components/sections/developers-hero";
import { APIReference } from "@/components/sections/api-reference";
import { CodeExamples } from "@/components/sections/code-examples";
import { SDKSection } from "@/components/sections/sdk-section";
import { WebhooksSection } from "@/components/sections/webhooks";
import { SandboxSection } from "@/components/sections/sandbox";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CodePlayground, paymentExamples, webhookExamples } from "@/components/ui/code-playground";
import { ApiStatus } from "@/components/ui/api-status";
import { FadeInScroll, ScaleInScroll, StaggerChildren } from "@/components/motion/ScrollStory";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  BookOpen,
  Code2,
  Terminal,
  Webhook,
  FileCode,
  Github,
  ArrowRight,
  PlayCircle,
} from "lucide-react";

// Dynamic import for Monaco Editor (client-side only)
const CodeEditor = dynamic(
  () => import("@/components/developer/CodeEditor").then((mod) => mod.CodeEditor),
  { ssr: false }
);

const resources = [
  {
    icon: BookOpen,
    title: "Documentação",
    description: "Guias completos e referência de API",
    link: "#",
    badge: "Comece aqui",
  },
  {
    icon: Code2,
    title: "SDKs",
    description: "Bibliotecas oficiais para várias linguagens",
    link: "#",
  },
  {
    icon: Terminal,
    title: "CLI",
    description: "Ferramenta de linha de comando",
    link: "#",
  },
  {
    icon: Webhook,
    title: "Webhooks",
    description: "Receba eventos em tempo real",
    link: "#",
  },
  {
    icon: FileCode,
    title: "Exemplos",
    description: "Código pronto para usar",
    link: "#",
  },
  {
    icon: Github,
    title: "GitHub",
    description: "Repositórios open source",
    link: "#",
  },
];

const sdks = [
  {
    name: "Node.js",
    lang: "JavaScript/TypeScript",
    install: "npm install @kodano/node",
    stars: "1.2k",
  },
  {
    name: "Python",
    lang: "Python 3.7+",
    install: "pip install kodano",
    stars: "850",
  },
  {
    name: "PHP",
    lang: "PHP 7.4+",
    install: "composer require kodano/kodano-php",
    stars: "620",
  },
  {
    name: "Ruby",
    lang: "Ruby 2.7+",
    install: "gem install kodano",
    stars: "450",
  },
  {
    name: "Go",
    lang: "Go 1.18+",
    install: "go get github.com/kodano/kodano-go",
    stars: "380",
  },
  {
    name: "Java",
    lang: "Java 11+",
    install: "implementation 'com.kodano:kodano-java:1.0.0'",
    stars: "290",
  },
];

export default function DesenvolvedoresPage() {
  return (
    <MainLayout>
      <DevelopersHero />
      <APIReference />
      <CodeExamples />
      <SDKSection />
      <WebhooksSection />
      <SandboxSection />

      {/* Legacy sections below - can be removed later */}
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/5" style={{ display: 'none' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6" variant="secondary">
              Developer Experience de primeira
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
              Construa pagamentos{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                em minutos
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              APIs simples, SDKs completos e documentação clara. Tudo que você
              precisa para integrar pagamentos rapidamente.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="#">
                  Ver documentação
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Tutorial rápido
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <FadeInScroll>
              <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-8 text-center">
                Comece em 3 passos
              </h2>
            </FadeInScroll>
            <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8" stagger={0.2}>
              <Card className="border-border">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-accent">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Crie sua conta
                  </h3>
                  <p className="text-muted-foreground">
                    Cadastre-se gratuitamente e obtenha suas chaves de API
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-accent">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Instale o SDK
                  </h3>
                  <p className="text-muted-foreground">
                    Escolha sua linguagem e instale nossa biblioteca
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-accent">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Faça sua primeira cobrança
                  </h3>
                  <p className="text-muted-foreground">
                    Execute seu primeiro pagamento em menos de 5 minutos
                  </p>
                </CardContent>
              </Card>
            </StaggerChildren>

            {/* Interactive Code Example */}
            <FadeInScroll className="mt-12">
              <CodePlayground
                examples={paymentExamples}
                title="Criar um pagamento"
                description="Exemplo interativo de como processar um pagamento com a Kodano API"
              />
            </FadeInScroll>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-20 bg-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <FadeInScroll>
              <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-12 text-center">
                Recursos para desenvolvedores
              </h2>
            </FadeInScroll>
            <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.15}>
              {resources.map((resource, index) => (
                <Card
                  key={index}
                  className="border-border hover:border-accent transition-all group cursor-pointer"
                >
                  <CardContent className="pt-6">
                    <div className="inline-flex p-3 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors mb-4">
                      <resource.icon className="h-6 w-6 text-accent" />
                    </div>
                    {resource.badge && (
                      <Badge className="mb-2" variant="secondary">
                        {resource.badge}
                      </Badge>
                    )}
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {resource.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {resource.description}
                    </p>
                    <Link
                      href={resource.link}
                      className="text-accent hover:underline inline-flex items-center"
                    >
                      Explorar
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </section>

      {/* SDKs */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <FadeInScroll>
              <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-12 text-center">
                SDKs oficiais
              </h2>
            </FadeInScroll>
            <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.1}>
              {sdks.map((sdk, index) => (
                <Card key={index} className="border-border">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-foreground">
                        {sdk.name}
                      </h3>
                      <Badge variant="outline">★ {sdk.stars}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {sdk.lang}
                    </p>
                    <div className="bg-muted/50 p-3 rounded-md">
                      <code className="text-xs text-foreground font-mono">
                        {sdk.install}
                      </code>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </section>

      {/* Webhooks Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <FadeInScroll>
              <div className="text-center mb-12">
                <Badge className="mb-4" variant="secondary">
                  Eventos em tempo real
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-4">
                  Webhooks
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Receba notificações em tempo real sobre eventos importantes em sua integração
                </p>
              </div>
            </FadeInScroll>

            <ScaleInScroll>
              <CodePlayground
                examples={webhookExamples}
                title="Implementar webhook endpoint"
                description="Exemplo de como receber e verificar eventos de webhooks"
              />
            </ScaleInScroll>
          </div>
        </div>
      </section>

      {/* API Status */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <FadeInScroll>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-4">
                  Status da Plataforma
                </h2>
                <p className="text-lg text-muted-foreground">
                  Monitoramento em tempo real de todos os nossos serviços
                </p>
              </div>
            </FadeInScroll>

            <ScaleInScroll>
              <ApiStatus />
            </ScaleInScroll>
          </div>
        </div>
      </section>

      {/* Interactive Code Editor */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <FadeInScroll>
              <div className="text-center mb-12">
                <Badge className="mb-4" variant="secondary">
                  Editor Interativo
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-4">
                  Teste Código ao Vivo
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Editor completo com syntax highlighting, autocomplete e execução de código
                </p>
              </div>
            </FadeInScroll>

            <ScaleInScroll>
              <CodeEditor
              defaultValue={`import { Kodano } from '@kodano/node';

// Inicializar cliente Kodano
const kodano = new Kodano(process.env.KODANO_SECRET_KEY);

async function createPayment() {
  try {
    // Criar um novo pagamento
    const payment = await kodano.payments.create({
      amount: 10000, // R$ 100,00 em centavos
      currency: 'BRL',
      method: 'credit_card',
      customer: 'cus_abc123',
      description: 'Assinatura Premium',
      metadata: {
        order_id: 'ord_789',
        plan: 'premium_monthly'
      }
    });

    console.log('Payment criado:', payment.id);
    console.log('Status:', payment.status);

    return payment;
  } catch (error) {
    console.error('Erro ao criar pagamento:', error.message);
    throw error;
  }
}

// Executar
createPayment();`}
              language="javascript"
              height="500px"
              className="shadow-2xl"
              onRun={(code) => {
                console.log("Running code:", code);
              }}
            />
            </ScaleInScroll>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-accent/10 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
              Pronto para começar?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Crie sua conta grátis e comece a aceitar pagamentos hoje
            </p>
            <Button size="lg" asChild>
              <Link href="/contato">
                Criar conta grátis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
