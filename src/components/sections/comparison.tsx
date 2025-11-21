"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

const comparisonData = [
  {
    feature: "APIs modernas (RESTful)",
    kodano: true,
    competitors: "Limitado",
    kodanoHighlight: true,
  },
  {
    feature: "White-label completo",
    kodano: true,
    competitors: false,
    kodanoHighlight: true,
  },
  {
    feature: "Split de pagamentos",
    kodano: true,
    competitors: "Adicional",
    kodanoHighlight: true,
  },
  {
    feature: "Documentação técnica",
    kodano: "Excelente",
    competitors: "Básica",
    kodanoHighlight: true,
  },
  {
    feature: "Suporte técnico",
    kodano: "24/7 em português",
    competitors: "Horário comercial",
    kodanoHighlight: true,
  },
  {
    feature: "Sandbox completo",
    kodano: true,
    competitors: "Limitado",
    kodanoHighlight: true,
  },
  {
    feature: "Webhooks em tempo real",
    kodano: true,
    competitors: true,
    kodanoHighlight: false,
  },
  {
    feature: "SDKs oficiais",
    kodano: "6+ linguagens",
    competitors: "2-3 linguagens",
    kodanoHighlight: true,
  },
  {
    feature: "Tempo de setup",
    kodano: "< 1 dia",
    competitors: "3-7 dias",
    kodanoHighlight: true,
  },
  {
    feature: "Customização de checkout",
    kodano: "Total",
    competitors: "Limitada",
    kodanoHighlight: true,
  },
  {
    feature: "Antifraude com ML",
    kodano: true,
    competitors: "Básico",
    kodanoHighlight: true,
  },
];

const renderValue = (value: boolean | string) => {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="h-5 w-5 text-accent mx-auto" />
    ) : (
      <X className="h-5 w-5 text-red-500 mx-auto" />
    );
  }
  return <span className="text-center block">{value}</span>;
};

export function ComparisonSection() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
            Por que escolher a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#002A35] via-[#004A5A] to-[#002A35] bg-[length:200%_100%] animate-gradient">
              Kodano
            </span>
            ?
          </h2>
          <p className="text-lg text-muted-foreground">
            Compare e veja por que somos a melhor escolha para sua empresa
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-5xl mx-auto">
          <Card className="border-border overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-accent/5 border-b border-border">
              <div className="text-sm font-medium text-muted-foreground">
                Recurso
              </div>
              <div className="text-center">
                <Badge className="bg-accent text-accent-foreground">
                  Kodano
                </Badge>
              </div>
              <div className="text-center text-sm font-medium text-muted-foreground">
                PSPs Tradicionais
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-border">
              {comparisonData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`grid grid-cols-3 gap-4 p-6 hover:bg-accent/5 transition-colors ${
                    item.kodanoHighlight ? "bg-accent/[0.02]" : ""
                  }`}
                >
                  <div className="text-sm font-medium text-foreground flex items-center">
                    {item.feature}
                  </div>
                  <div className="text-sm text-foreground font-semibold flex items-center justify-center">
                    {renderValue(item.kodano)}
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center justify-center">
                    {renderValue(item.competitors)}
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Bottom Note */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              * Comparação baseada em pesquisa de mercado realizada em Nov/2025
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
