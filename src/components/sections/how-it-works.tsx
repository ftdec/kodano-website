"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Handshake, Users, Zap, ArrowRight, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Handshake,
    title: "Negocia",
    description: "A Kodano fecha MPAs com adquirentes (Price Books, rebates, SLAs).",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    number: "02",
    icon: Zap,
    title: "Integra",
    description: "Conectores homologados com APIs unificadas.",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Orquestra",
    description: "Motor de decisão escolhe a melhor rota por transação.",
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    number: "04",
    icon: Users,
    title: "Liquida direto",
    description: "Dinheiro vai da adquirente para a empresa; a Kodano não custodia.",
    color: "from-orange-500/20 to-amber-500/20",
  },
];

export function HowItWorksSection() {
  return (
    <section className="relative py-20 md:py-32 bg-accent/5 overflow-hidden">
      {/* Simplified background */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/3 via-transparent to-primary/3" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
            Como{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              funciona
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Uma integração, múltiplas adquirentes. Roteamento inteligente para menor custo e maior aprovação.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-12">
          {steps.map((step, index) => (
            <div key={index} className="relative flex">
              <div className="relative flex-1 flex flex-col">
                {/* Number Badge */}
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center z-10 border-2 border-accent/30">
                  <span className="text-lg font-bold text-accent">
                    {step.number}
                  </span>
                </div>

                {/* Card */}
                <div className="border border-border bg-background rounded-2xl p-6 hover:border-accent transition-all hover:shadow-lg h-full flex flex-col group">
                  <div className="mb-4 inline-flex p-3 rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                    <step.icon className="h-6 w-6 text-accent" />
                  </div>
                  
                  <h3 className="text-xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed flex-grow">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" variant="outline" asChild className="group">
            <Link href="/como-funciona">
              Ver detalhes completos
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
