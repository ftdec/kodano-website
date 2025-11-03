"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Zap, Palette } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/parallax";

const pillars = [
  {
    icon: Shield,
    title: "Segurança e Compliance",
    description:
      "PCI DSS, LGPD e autenticação 3DS2. Proteção total para suas transações.",
    color: "from-blue-500/10 to-cyan-500/10",
  },
  {
    icon: Zap,
    title: "Escalabilidade e Performance",
    description:
      "Infraestrutura AWS global e redundante. Processe milhões com latência ultra-baixa.",
    color: "from-purple-500/10 to-pink-500/10",
  },
  {
    icon: Palette,
    title: "White Label Personalizável",
    description:
      "Checkout e painel sob sua marca. Customização completa da experiência.",
    color: "from-green-500/10 to-emerald-500/10",
  },
];

export function ThreePillarsSection() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <RevealOnScroll>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
              Três pilares da{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Kodano
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              A base sólida que sustenta a melhor infraestrutura de pagamentos B2B
            </p>
          </div>
        </RevealOnScroll>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="border-border hover:border-accent transition-all duration-300 hover:shadow-xl h-full group">
                <CardContent className="pt-6 text-center">
                  <div
                    className={`mb-6 inline-flex p-6 rounded-2xl bg-gradient-to-br ${pillar.color} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <pillar.icon className="h-10 w-10 text-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-4">
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
