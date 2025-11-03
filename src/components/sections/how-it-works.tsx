"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserPlus, Key, CreditCard, BarChart3, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Crie sua conta",
    description: "Cadastro rápido e simples, sem burocracia. Comece em minutos.",
  },
  {
    number: "02",
    icon: Key,
    title: "Gere suas API Keys",
    description: "Acesse suas credenciais de teste e produção no painel.",
  },
  {
    number: "03",
    icon: CreditCard,
    title: "Integre cartões e Pix",
    description: "Use nossos SDKs e comece a aceitar pagamentos rapidamente.",
  },
  {
    number: "04",
    icon: BarChart3,
    title: "Monitore tudo em tempo real",
    description: "Dashboard completo com métricas, analytics e relatórios.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 md:py-32 bg-accent/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
            Como{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              funciona
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Comece a aceitar pagamentos em 4 passos simples
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector Line (hidden on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-accent/50 to-transparent -translate-y-1/2" />
              )}

              <div className="relative">
                {/* Number Badge */}
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center z-10">
                  <span className="text-lg font-bold text-accent">
                    {step.number}
                  </span>
                </div>

                {/* Card */}
                <div className="border border-border bg-background rounded-2xl p-6 hover:border-accent transition-all hover:shadow-lg">
                  <div className="mb-4 inline-flex p-3 rounded-xl bg-accent/10">
                    <step.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" variant="outline" asChild>
            <Link href="/desenvolvedores">
              Ver documentação técnica
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
