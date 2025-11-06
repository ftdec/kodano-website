"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Wallet, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { RevealOnScroll } from "@/components/ui/parallax";

/**
 * PRD v2.0 - Integrations Section
 * Destaca os 3 métodos de pagamento integrados: Cartão, Pix e Boleto
 */

const integrations = [
  {
    title: "Cartão",
    description:
      "Aceitamos todas as bandeiras com segurança PCI DSS Nível 1 e tokenização avançada.",
    icon: CreditCard,
    color: "#00A6B4",
  },
  {
    title: "Pix",
    description:
      "Integração nativa com Pix para pagamentos instantâneos 24/7 com baixo custo.",
    icon: Wallet,
    color: "#32BCAD",
  },
  {
    title: "Boleto",
    description:
      "Geração automática de boletos bancários com conciliação e notificações em tempo real.",
    icon: FileText,
    color: "#053B3F",
  },
];

export function IntegrationsSection() {
  return (
    <section className="py-20 md:py-32 bg-slate-50 dark:bg-[#0A0A0F]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <RevealOnScroll>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
              Integração total em{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#053B3F] to-[#00A6B4]">
                uma única API
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Cartão, Pix e boleto em uma plataforma modular, pronta para escalar com seu negócio
            </p>
          </div>
        </RevealOnScroll>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {integrations.map((integration, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="border-border hover:border-[#00A6B4] transition-all duration-300 hover:shadow-lg group h-full">
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
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href="/desenvolvedores"
            className="inline-flex items-center px-6 py-3 rounded-full bg-[#053B3F] text-white font-semibold hover:bg-[#00A6B4] transition-colors"
          >
            Ver documentação da API
          </a>
        </motion.div>
      </div>
    </section>
  );
}
