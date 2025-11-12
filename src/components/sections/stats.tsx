"use client";

import { TrendingUp, Shield, DollarSign } from "lucide-react";

const stats = [
  {
    icon: TrendingUp,
    label: "Aumenta aprovação de pagamentos",
    description: "",
  },
  {
    icon: DollarSign,
    label: "Reduz custos efetivos",
    description: "",
  },
  {
    icon: Shield,
    label: "Alta disponibilidade garantida",
    description: "",
  },
];

export function StatsSection() {
  return (
    <section className="relative py-20 md:py-32 bg-background overflow-hidden">
      {/* Simplified background */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/3 via-transparent to-primary/3" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center relative group"
            >
              {/* Icon */}
              <div className="inline-flex p-3 rounded-xl bg-accent/10 mb-4 group-hover:bg-accent/20 transition-colors">
                <stat.icon className="h-6 w-6 text-accent" />
              </div>

              <div className="text-lg font-semibold text-foreground mb-1">
                {stat.label}
              </div>
              {stat.description && (
                <div className="text-sm text-muted-foreground">
                  {stat.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
