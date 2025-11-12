"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Wallet, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const integrations = [
  {
    title: "Cartão",
    description:
      "Aceitamos todas as bandeiras com segurança PCI DSS Nível 1 e tokenização avançada.",
    icon: CreditCard,
    color: "#00A6B4",
    delay: 0,
  },
  {
    title: "Pix",
    description:
      "Integração nativa com Pix para pagamentos instantâneos 24/7 com baixo custo.",
    icon: Wallet,
    color: "#32BCAD",
    delay: 0.1,
  },
  {
    title: "Boleto",
    description:
      "Geração automática de boletos bancários com conciliação e notificações em tempo real.",
    icon: FileText,
    color: "#053B3F",
    delay: 0.2,
  },
];

export function IntegrationsSection() {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-slate-50 via-background to-slate-50 dark:from-[#0A0A0F] dark:via-background dark:to-[#0A0A0F] overflow-hidden">
      {/* Simplified background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/3 via-transparent to-primary/3" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
            Uma integração,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#053B3F] to-[#00A6B4]">
              múltiplas adquirentes
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Roteamento inteligente para menor custo e maior aprovação
          </p>
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {integrations.map((integration, index) => (
            <Card key={index} className="border-border hover:border-[#00A6B4] transition-all duration-300 hover:shadow-lg group h-full">
              <CardContent className="pt-6 text-center">
                <div
                  className="mb-4 inline-flex p-4 rounded-lg transition-colors"
                  style={{
                    backgroundColor: `${integration.color}15`,
                  }}
                >
                  <integration.icon
                    className="h-8 w-8"
                    style={{ color: integration.color }}
                  />
                </div>
                
                <h3 className="text-2xl font-semibold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                  {integration.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {integration.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-12 text-center">
          <Button size="lg" asChild className="group">
            <Link href="/contato">
              Solicitar demonstração
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
