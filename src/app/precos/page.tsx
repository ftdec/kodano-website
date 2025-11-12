"use client";

import { Metadata } from "next";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Check, ArrowRight, HelpCircle, Percent, Calendar } from "lucide-react";
import { FAQStructuredData } from "@/components/seo/structured-data";

const pricingModels = [
  {
    name: "Modelo A",
    subtitle: "Pay as you use",
    description: "Taxa variável sobre o GMV processado via Kodano",
    features: [
      "Sem mensalidade",
      "Taxa % sobre o GMV processado",
      "Acesso completo ao Dashboard",
      "API unificada",
      "Motor de orquestração",
      "Suporte técnico",
      "Fee via split automático",
    ],
    highlighted: false,
  },
  {
    name: "Modelo B",
    subtitle: "Fixo mensal + variável reduzida",
    description: "Assinatura em reais + % menor sobre o GMV",
    features: [
      "Assinatura mensal fixa",
      "Taxa % reduzida sobre GMV",
      "Acesso completo ao Dashboard",
      "API unificada",
      "Motor de orquestração",
      "Suporte prioritário",
      "Fee via split automático",
    ],
    highlighted: true,
  },
  {
    name: "Planos tailor-made",
    subtitle: "Contratos B2B individualizados",
    description: "Soluções customizadas para grandes volumes",
    features: [
      "Contrato personalizado",
      "Taxas negociadas",
      "Acesso completo ao Dashboard",
      "API unificada",
      "Motor de orquestração",
      "Gerente de conta dedicado",
      "SLA customizado",
    ],
    highlighted: false,
  },
];

const faqs = [
  {
    question: "A Kodano é regulada pelo BC?",
    answer:
      "Não. Provedora SaaS, sem custódia/liquidação/antecipação. Fora do escopo de instituição de pagamento.",
  },
  {
    question: "Como vocês cobram?",
    answer:
      "% sobre GMV processado via Kodano; ou modelo fixo + variável reduzida. Planos tailor-made para grandes volumes.",
  },
  {
    question: "Quem liquida?",
    answer:
      "A adquirente diretamente para a empresa. A Kodano não custodia valores.",
  },
  {
    question: "Como é o acesso ao Dashboard?",
    answer:
      "Todos os planos incluem o Dashboard completo com taxas, aprovação, conciliação e relatórios.",
  },
  {
    question: "Vocês oferecem antecipação?",
    answer:
      "Não. A antecipação é da adquirente. A Kodano apenas orquestra e roteia transações.",
  },
  {
    question: "Como funciona o fee via split automático?",
    answer:
      "O fee da Kodano é descontado automaticamente pelas adquirentes parceiras em tempo real, sem intermediação financeira pela Kodano.",
  },
  {
    question: "Há taxa de setup?",
    answer:
      "Não há taxa de setup. Você paga apenas conforme o modelo escolhido (pay-as-you-use ou fixo+variável).",
  },
  {
    question: "Posso mudar de modelo?",
    answer:
      "Sim, modelos podem ser ajustados conforme seu crescimento. Fale com vendas para avaliar a melhor opção.",
  },
];

export default function PrecosPage() {
  return (
    <MainLayout>
      <FAQStructuredData questions={faqs} />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
              Modelos de cobrança{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                simples e alinhados
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Sem números na página. Dois caminhos principais ou planos tailor-made para grandes volumes.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Models */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingModels.map((model, index) => (
              <Card
                key={index}
                className={`relative ${
                  model.highlighted
                    ? "border-accent shadow-2xl scale-105 md:scale-110"
                    : "border-border"
                }`}
              >
                {model.highlighted && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                    Mais popular
                  </Badge>
                )}
                <CardHeader>
                  <h3 className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-2">
                    {model.name}
                  </h3>
                  <p className="text-accent font-semibold mb-2">{model.subtitle}</p>
                  <p className="text-muted-foreground text-sm">{model.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {model.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={model.highlighted ? "default" : "outline"}
                    size="lg"
                    asChild
                  >
                    <Link href="/contato">
                      Solicitar uma proposta
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Important Note */}
          <div className="mt-16 max-w-4xl mx-auto">
            <Card className="border-accent/20 bg-accent/5">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <div className="inline-flex p-3 rounded-xl bg-accent/20">
                    <Percent className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-2">
                      Fee via split automático
                    </h3>
                    <p className="text-muted-foreground">
                      O fee da Kodano é descontado automaticamente pelas adquirentes parceiras (tempo real), <strong>sem intermediação financeira</strong> pela Kodano. A liquidação permanece direta entre adquirente e empresa.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
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
              Solicite uma proposta personalizada
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Modelos de preço são B2B e tailor-made; fale com vendas para encontrar a melhor opção para seu negócio.
            </p>
            <Button size="lg" asChild>
              <Link href="/contato">
                Solicitar uma proposta
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
