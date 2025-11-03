import { Metadata } from "next";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Quote, TrendingUp, Users, DollarSign, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Clientes - Kodano",
  description:
    "Cases de sucesso e depoimentos de empresas que confiam na Kodano para processar pagamentos.",
};

const testimonials = [
  {
    quote:
      "A Kodano revolucionou nossa operação de pagamentos. Reduzimos em 60% o tempo de implementação e os custos caíram 40%.",
    author: "Maria Silva",
    role: "CTO",
    company: "TechFlow SaaS",
    avatar: "MS",
  },
  {
    quote:
      "Suporte excepcional e documentação impecável. Nossa equipe integrou tudo em menos de uma semana.",
    author: "João Santos",
    role: "Head of Engineering",
    company: "MarketHub",
    avatar: "JS",
  },
  {
    quote:
      "A proteção contra fraudes do Radar nos economizou milhares de reais. O ROI foi imediato.",
    author: "Ana Costa",
    role: "CEO",
    company: "HealthPlus",
    avatar: "AC",
  },
  {
    quote:
      "Finalmente um gateway que pensa como desenvolvedor. A API é perfeita e os SDKs funcionam perfeitamente.",
    author: "Pedro Oliveira",
    role: "Tech Lead",
    company: "EduTech Brasil",
    avatar: "PO",
  },
  {
    quote:
      "O split de pagamentos do Connect transformou nosso marketplace. Gerenciar 500+ sellers nunca foi tão fácil.",
    author: "Carla Mendes",
    role: "Product Manager",
    company: "ShopConnect",
    avatar: "CM",
  },
  {
    quote:
      "99.99% de uptime não é marketing, é realidade. Em 2 anos, nunca tivemos problemas de indisponibilidade.",
    author: "Roberto Lima",
    role: "CFO",
    company: "PayFlow B2B",
    avatar: "RL",
  },
];

const caseStudies = [
  {
    company: "TechFlow SaaS",
    industry: "SaaS",
    challenge:
      "Gerenciar 10.000+ assinaturas recorrentes com múltiplos planos",
    solution: "Implementação do Kodano Billing com automação completa",
    results: [
      "+35% na taxa de conversão",
      "-60% de chargebacks",
      "50h/mês economizadas em gestão manual",
    ],
    metrics: {
      icon: TrendingUp,
      value: "R$ 2.5M",
      label: "MRR processado",
    },
  },
  {
    company: "MarketHub",
    industry: "Marketplace",
    challenge: "Split complexo entre 500+ sellers com diferentes comissões",
    solution: "Kodano Connect com regras customizadas de split",
    results: [
      "Onboarding de sellers reduzido de 3 dias para 2 horas",
      "100% de automação nos repasses",
      "Compliance fiscal garantido",
    ],
    metrics: {
      icon: Users,
      value: "500+",
      label: "Sellers ativos",
    },
  },
  {
    company: "HealthPlus",
    industry: "HealthTech",
    challenge: "Reduzir fraudes sem afetar pacientes legítimos",
    solution: "Implementação do Kodano Radar com ML adaptativo",
    results: [
      "-85% em transações fraudulentas",
      "0% de falsos positivos",
      "R$ 150k economizados em 6 meses",
    ],
    metrics: {
      icon: DollarSign,
      value: "R$ 150k",
      label: "Economizados em fraudes",
    },
  },
];

export default function ClientesPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
              Empresas que{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                confiam
              </span>{" "}
              na Kodano
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Mais de 500 empresas processam milhões em transações todos os dias
              com nossa plataforma.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-12 text-center">
              O que nossos clientes dizem
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  className="border-border hover:border-accent transition-all"
                >
                  <CardContent className="pt-6">
                    <Quote className="h-8 w-8 text-accent/30 mb-4" />
                    <p className="text-foreground mb-6 italic">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-accent">
                          {testimonial.avatar}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          {testimonial.author}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role} • {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-12 text-center">
              Cases de sucesso
            </h2>
            <div className="space-y-12">
              {caseStudies.map((study, index) => (
                <Card key={index} className="border-border">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-foreground">
                            {study.company}
                          </h3>
                          <Badge variant="secondary">{study.industry}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-accent mt-4 md:mt-0">
                        <study.metrics.icon className="h-6 w-6" />
                        <div>
                          <div className="text-2xl font-bold">
                            {study.metrics.value}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {study.metrics.label}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">
                          Desafio
                        </h4>
                        <p className="text-muted-foreground">
                          {study.challenge}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">
                          Solução
                        </h4>
                        <p className="text-muted-foreground">
                          {study.solution}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">
                          Resultados
                        </h4>
                        <ul className="space-y-2">
                          {study.results.map((result, idx) => (
                            <li
                              key={idx}
                              className="text-muted-foreground flex items-start"
                            >
                              <span className="text-accent mr-2">✓</span>
                              {result}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2">
                  500+
                </div>
                <p className="text-muted-foreground">Empresas ativas</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2">
                  R$ 100M+
                </div>
                <p className="text-muted-foreground">Processado/mês</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2">
                  99.99%
                </div>
                <p className="text-muted-foreground">Uptime</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2">
                  4.9/5
                </div>
                <p className="text-muted-foreground">Satisfação</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-accent/10 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
              Seja o próximo case de sucesso
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Junte-se a centenas de empresas que já transformaram seus
              pagamentos
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
