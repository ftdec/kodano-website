import { Metadata } from "next";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Laptop,
  Store,
  Heart,
  GraduationCap,
  Building2,
  ArrowRight,
  Check,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Soluções por Setor - Kodano",
  description:
    "Soluções de pagamento personalizadas para SaaS, Marketplace, HealthTech, EdTech e empresas B2B.",
};

const solutions = [
  {
    name: "SaaS",
    icon: Laptop,
    description:
      "Gerencie assinaturas recorrentes, trials gratuitos e upgrades automáticos",
    color: "from-blue-500/10 to-cyan-500/10",
    features: [
      "Billing recorrente automático",
      "Gestão de trials e upgrades",
      "Webhooks para eventos",
      "Portal do cliente",
      "Métricas MRR e churn",
    ],
  },
  {
    name: "Marketplace",
    icon: Store,
    description:
      "Split de pagamentos entre vendedores com repasses automáticos",
    color: "from-purple-500/10 to-pink-500/10",
    features: [
      "Split automático de pagamentos",
      "Gestão de sellers",
      "Repasses programados",
      "Compliance fiscal",
      "Dashboard de comissões",
    ],
  },
  {
    name: "HealthTech",
    icon: Heart,
    description:
      "Pagamentos seguros e compliance para área da saúde",
    color: "from-red-500/10 to-rose-500/10",
    features: [
      "Compliance LGPD e HIPAA",
      "Agendamento com pagamento",
      "Reembolsos automatizados",
      "Integração com prontuários",
      "Telemedicina",
    ],
  },
  {
    name: "EdTech",
    icon: GraduationCap,
    description:
      "Facilite matrículas e mensalidades para instituições de ensino",
    color: "from-green-500/10 to-emerald-500/10",
    features: [
      "Parcelamento de mensalidades",
      "Gestão de inadimplência",
      "Renovações automáticas",
      "Boletos e carnês",
      "Portal do aluno",
    ],
  },
  {
    name: "B2B",
    icon: Building2,
    description:
      "Infraestrutura robusta para transações corporativas de alto valor",
    color: "from-orange-500/10 to-amber-500/10",
    features: [
      "Transações de alto valor",
      "Múltiplas formas de pagamento",
      "Aprovações corporativas",
      "Notas fiscais automáticas",
      "Crédito empresarial",
    ],
  },
];

export default function SolucoesPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
              Soluções para cada{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                segmento
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Infraestrutura de pagamentos adaptada às necessidades específicas
              do seu setor
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <Card
                key={index}
                className="border-border hover:border-accent transition-all duration-300 hover:shadow-xl group"
              >
                <CardHeader>
                  <div
                    className={`mb-4 inline-flex p-4 rounded-xl bg-gradient-to-br ${solution.color} group-hover:scale-110 transition-transform`}
                  >
                    <solution.icon className="h-8 w-8 text-foreground" />
                  </div>
                  <h2 className="text-3xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                    {solution.name}
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    {solution.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">
                      Recursos principais
                    </h3>
                    <ul className="space-y-3">
                      {solution.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button variant="outline" className="w-full group/btn" asChild>
                    <Link href="/contato">
                      Falar com especialista
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
              Não encontrou sua solução?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Nossa equipe pode criar uma solução personalizada para as
              necessidades específicas do seu negócio.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/contato">
                  Conversar com especialista
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/desenvolvedores">Explorar documentação</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
