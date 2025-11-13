"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Zap, Code } from "lucide-react";

// 3 Provas de valor principais
const features = [
  {
    title: "Eficiência real",
    description:
      "Roteamento por taxa efetiva, aprovação e latência.",
    icon: TrendingUp,
    gradient: "from-primary/20 to-accent/20",
  },
  {
    title: "Governança multiadquirente",
    description:
      "Dados, relatórios e conciliação centralizados.",
    icon: Zap,
    gradient: "from-accent/20 to-primary/20",
  },
  {
    title: "Integração única",
    description:
      "Uma API, todas as adquirentes.",
    icon: Code,
    gradient: "from-primary/20 via-accent/20 to-primary/20",
  },
];

export function FeaturesSection() {
  return (
    <section className="relative py-20 md:py-32 bg-background overflow-hidden">
      {/* Simplified background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-primary/3 to-accent/5" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
            Por que escolher a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#002A35] via-[#004A5A] to-[#002A35] bg-[length:200%_100%] animate-gradient">
              Kodano
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Benefícios reais para seu negócio
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="border-border hover:border-accent transition-all duration-300 hover:shadow-lg group h-full">
              <CardContent className="pt-6">
                <div className="mb-4 inline-flex p-3 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
