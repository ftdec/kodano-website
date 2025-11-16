"use client";

import { TrendingUp, Zap, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const metrics = [
  {
    icon: TrendingUp,
    label: "Aumenta aprovação de pagamentos",
    color: "from-primary to-accent",
  },
  {
    icon: Zap,
    label: "Reduz custos efetivos",
    color: "from-accent to-primary",
  },
  {
    icon: Shield,
    label: "Alta disponibilidade garantida",
    color: "from-primary via-accent to-primary",
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-background via-accent/5 to-background overflow-hidden">
      {/* Simplified background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/3 via-transparent to-primary/3" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
              Resultados{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#002A35] via-[#004A5A] to-[#002A35] bg-[length:200%_100%] animate-gradient">
                mensuráveis
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Empresas que usam a Kodano veem melhorias imediatas em aprovação, custos e performance
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {metrics.map((metric, index) => (
              <div key={index} className="relative h-full flex">
                <div className="relative bg-background/80 backdrop-blur-sm border border-border rounded-2xl p-8 hover:border-accent transition-all hover:shadow-lg group w-full flex flex-col">
                  <div className="relative z-10 flex flex-col h-full">
                    <div className={`flex items-center justify-center p-3 rounded-xl bg-gradient-to-br ${metric.color} mb-6 flex-shrink-0 w-fit mx-auto`}>
                      <metric.icon className="h-5 w-5 text-white" />
                    </div>
                    
                    <p className="text-lg font-semibold text-foreground flex-grow flex items-center justify-center text-center">
                      {metric.label}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button
              size="lg"
              variant="kodano-outline"
              rounded="full"
              className="group"
              asChild
            >
              <Link href="/fale-conosco">
                Fale Conosco
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
