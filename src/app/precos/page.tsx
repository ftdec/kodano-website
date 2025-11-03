"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Check, ArrowRight, HelpCircle } from "lucide-react";
import { VolumeCalculator } from "@/components/pricing/VolumeCalculator";
import { FAQStructuredData } from "@/components/seo/structured-data";

// PRD 6.4: Planos claros, calculadora por volume, FAQ
const plans = [
  {
    name: "Starter",
    price: "Grátis",
    description: "Para começar e testar",
    features: [
      "Até R$ 10.000/mês em transações",
      "Todos os métodos de pagamento",
      "API completa e SDKs",
      "Sandbox ilimitado",
      "Webhooks",
      "Suporte por email",
      "Dashboard básico",
    ],
    cta: "Começar grátis",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "2,9%",
    priceDetail: "+ R$ 0,39 por transação",
    description: "Para empresas em crescimento",
    features: [
      "Volume ilimitado",
      "Todos os recursos do Starter",
      "Split de pagamentos (Connect)",
      "Assinaturas (Billing)",
      "Checkout personalizado",
      "Proteção contra fraudes (Radar)",
      "Suporte prioritário",
      "Relatórios avançados",
      "SLA de 99.9%",
    ],
    cta: "Começar agora",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Customizado",
    description: "Para grandes volumes",
    features: [
      "Todos os recursos do Growth",
      "Taxas negociadas",
      "White-label completo",
      "Gerente de conta dedicado",
      "SLA customizado",
      "Infraestrutura dedicada",
      "Integração customizada",
      "Consultoria técnica",
      "Treinamento do time",
    ],
    cta: "Falar com vendas",
    highlighted: false,
  },
];

const faqs = [
  {
    question: "Existe taxa de setup ou mensalidade?",
    answer:
      "Não! Você só paga pelas transações processadas. Sem taxas escondidas, sem mensalidades.",
  },
  {
    question: "Quando recebo meu dinheiro?",
    answer:
      "O padrão é D+2 (2 dias úteis). Para clientes Enterprise, oferecemos D+1 ou D+0.",
  },
  {
    question: "Posso mudar de plano a qualquer momento?",
    answer:
      "Sim! Você pode fazer upgrade ou downgrade a qualquer momento sem custos adicionais.",
  },
  {
    question: "Existe contrato de fidelidade?",
    answer:
      "Não. Trabalhamos sem contratos de permanência. Você pode cancelar quando quiser.",
  },
  {
    question: "Como funciona o período de teste?",
    answer:
      "Você pode testar gratuitamente em nosso ambiente sandbox por tempo ilimitado.",
  },
  {
    question: "Há taxa para chargebacks?",
    answer:
      "Sim, R$ 15,00 por chargeback recebido, conforme padrão do mercado.",
  },
];

export default function PrecosPage() {
  return (
    <MainLayout>
      {/* PRD 8: FAQ Structured Data para SEO */}
      <FAQStructuredData questions={faqs} />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
              Preços{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                simples e transparentes
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Comece grátis e escale conforme cresce. Sem taxas escondidas, sem
              surpresas.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative ${
                  plan.highlighted
                    ? "border-accent shadow-2xl scale-105 md:scale-110"
                    : "border-border"
                }`}
              >
                {plan.highlighted && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                    Mais popular
                  </Badge>
                )}
                <CardHeader>
                  <h3 className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-foreground">
                        {plan.price}
                      </span>
                    </div>
                    {plan.priceDetail && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {plan.priceDetail}
                      </p>
                    )}
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={plan.highlighted ? "default" : "outline"}
                    size="lg"
                    asChild
                  >
                    <Link
                      href={
                        plan.name === "Enterprise"
                          ? "/contato"
                          : "/desenvolvedores"
                      }
                    >
                      {plan.cta}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">
              Todos os planos incluem:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary">99.9% uptime</Badge>
              <Badge variant="secondary">Suporte em português</Badge>
              <Badge variant="secondary">Sem taxa de setup</Badge>
              <Badge variant="secondary">Sem contrato de fidelidade</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* PRD 6.4: Calculadora de Volume */}
      <section className="py-20 bg-gradient-to-br from-accent/5 to-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
                Calcule seus custos
              </h2>
              <p className="text-lg text-muted-foreground">
                Descubra quanto você vai economizar com a Kodano
              </p>
            </div>

            <VolumeCalculator />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 bg-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
                Perguntas frequentes
              </h2>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="border-border">
                  <CardHeader>
                    <div className="flex items-start">
                      <HelpCircle className="h-6 w-6 text-accent mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {faq.question}
                        </h3>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-4">
                Ainda tem dúvidas?
              </p>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contato">Falar com nosso time</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
              Comece gratuitamente hoje
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Teste todos os recursos sem compromisso
            </p>
            <Button size="lg" asChild>
              <Link href="/desenvolvedores">
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
