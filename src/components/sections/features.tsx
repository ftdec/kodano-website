"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  ShieldCheck,
  TrendingUp,
  Zap,
  DollarSign,
  Code,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import { RevealOnScroll } from "@/components/ui/parallax";

// PRD v2.0 Section 5.2: 4 Features principais
const features = [
  {
    title: "Processamento inteligente",
    description:
      "Roteamento automático entre adquirentes para reduzir custos e aumentar aprovação.",
    icon: TrendingUp,
  },
  {
    title: "Integração total",
    description:
      "Cartão, Pix e boleto em uma única API modular.",
    icon: Zap,
  },
  {
    title: "White-label completo",
    description:
      "Sua marca, suas regras — nós operamos nos bastidores.",
    icon: Code,
  },
  {
    title: "Segurança certificada",
    description:
      "PCI DSS Nível 1 + tokenização e monitoramento antifraude.",
    icon: ShieldCheck,
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <RevealOnScroll>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
              Por que escolher a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Kodano
              </span>
              ?
            </h2>
            <p className="text-lg text-muted-foreground">
              Uma plataforma completa de pagamentos construída para escalar com
              seu negócio
            </p>
          </div>
        </RevealOnScroll>

        {/* Features Grid - PRD: 4 cards em grid 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="border-border hover:border-accent transition-all duration-300 hover:shadow-lg group h-full">
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
