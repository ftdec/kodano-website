"use client";

import { AnimatedCounter } from "@/components/ui/animated-counter";

const stats = [
  {
    value: 10,
    suffix: "M+",
    label: "Transações processadas",
    description: "Mensalmente",
    decimals: 0,
  },
  {
    value: 99.99,
    suffix: "%",
    label: "Uptime garantido",
    description: "SLA com compensação",
    decimals: 2,
  },
  {
    value: 500,
    suffix: "+",
    label: "Empresas atendidas",
    description: "Em toda América Latina",
    decimals: 0,
  },
  {
    value: 12,
    suffix: "",
    label: "Países suportados",
    description: "Expansão contínua",
    decimals: 0,
  },
];

export function StatsSection() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-poppins)] text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2">
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                  duration={2.5}
                />
              </div>
              <div className="text-lg font-semibold text-foreground mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
