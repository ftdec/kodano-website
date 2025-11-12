import { Metadata } from "next";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  FileText,
  BookOpen,
  HelpCircle,
  ArrowRight,
  TrendingUp,
  CheckCircle,
  Code,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Recursos - Kodano",
  description:
    "Materiais técnicos, estudos de caso e FAQs sobre orquestração multiadquirente.",
};

const caseStudies = [
  {
    title: "Turismo: aprovação +x p.p.",
    description:
      "Como uma plataforma de turismo aumentou a aprovação de transações internacionais usando roteamento inteligente.",
    category: "Estudo de caso",
    status: "Em breve",
  },
  {
    title: "Varejo: redução de MDR efetivo",
    description:
      "E-commerce de grande porte reduziu custos efetivos através da orquestração multiadquirente.",
    category: "Estudo de caso",
    status: "Em breve",
  },
];

const articles = [
  {
    title: "Roteamento por eficiência",
    description:
      "Como o motor de orquestração escolhe a melhor rota por transação baseado em MDR efetivo, aprovação e latência.",
    category: "Artigo técnico",
  },
  {
    title: "Conciliação multiadquirente",
    description:
      "Guia prático para governar dados e relatórios de múltiplas adquirentes em uma única plataforma.",
    category: "Artigo técnico",
  },
  {
    title: "Observabilidade e SLAs",
    description:
      "Como monitorar performance, latência e uptime de todas as adquirentes em tempo real.",
    category: "Artigo técnico",
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
    question: "Como funciona o roteamento?",
    answer:
      "O motor de orquestração analisa cada transação em tempo real e escolhe a melhor rota baseado em estratégias configuráveis (MDR efetivo, aprovação, latência, liquidação).",
  },
  {
    question: "Quantas adquirentes vocês conectam?",
    answer:
      "Conectamos múltiplas adquirentes parceiras. A lista completa está disponível no onboarding.",
  },
  {
    question: "Como é a integração técnica?",
    answer:
      "Uma única API unificada para todas as adquirentes. Você integra uma vez e passa a governar múltiplas adquirentes.",
  },
  {
    question: "Há taxa de setup?",
    answer:
      "Não há taxa de setup. Você paga apenas conforme o modelo escolhido (pay-as-you-use ou fixo+variável).",
  },
  {
    question: "Como funciona o fee via split automático?",
    answer:
      "O fee da Kodano é descontado automaticamente pelas adquirentes parceiras em tempo real, sem intermediação financeira pela Kodano.",
  },
  {
    question: "Posso usar apenas uma adquirente?",
    answer:
      "Sim, mas o maior valor está na orquestração multiadquirente. A Kodano otimiza roteamento mesmo com múltiplas adquirentes.",
  },
  {
    question: "Como é a segurança dos dados?",
    answer:
      "LGPD (minimização, execução contratual), PCI-ready, tokenização via adquirentes, segredos em KMS, criptografia em trânsito e repouso.",
  },
  {
    question: "Vocês oferecem suporte técnico?",
    answer:
      "Sim. Todos os planos incluem suporte técnico. Planos tailor-made incluem gerente de conta dedicado.",
  },
  {
    question: "Como funciona o onboarding?",
    answer:
      "Cadastro, KYC e seleção de adquirentes; emissão de MIDs vinculados ao Partner ID da Kodano. Processo guiado pela nossa equipe.",
  },
  {
    question: "Posso mudar de modelo de preço?",
    answer:
      "Sim, modelos podem ser ajustados conforme seu crescimento. Fale com vendas para avaliar a melhor opção.",
  },
];

export default function RecursosPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
              Materiais técnicos,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                estudos e FAQs
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Recursos para entender como a orquestração multiadquirente pode otimizar seus pagamentos.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
              Estudos de caso
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {caseStudies.map((study, index) => (
              <Card key={index} className="border-border hover:border-accent transition-all">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-accent uppercase">
                      {study.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{study.status}</span>
                  </div>
                  <h3 className="text-xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-2">
                    {study.title}
                  </h3>
                  <p className="text-muted-foreground">{study.description}</p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-20 bg-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
              Artigos técnicos
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {articles.map((article, index) => (
              <Card key={index} className="border-border hover:border-accent transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-2 mb-3">
                    <BookOpen className="h-5 w-5 text-accent" />
                    <span className="text-xs font-semibold text-accent uppercase">
                      {article.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{article.description}</p>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="#">
                      Ler mais
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
                Perguntas frequentes
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="border-border">
                  <CardHeader>
                    <div className="flex items-start">
                      <HelpCircle className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="text-base font-semibold text-foreground mb-2">
                          {faq.question}
                        </h3>
                        <p className="text-sm text-muted-foreground">{faq.answer}</p>
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
      <section className="py-20 md:py-32 bg-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
              Pronto para começar?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Solicite uma demonstração e veja como a Kodano pode otimizar seus pagamentos
            </p>
            <Button size="lg" asChild>
              <Link href="/contato">
                Solicitar uma demonstração
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

