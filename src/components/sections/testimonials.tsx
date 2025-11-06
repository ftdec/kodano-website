"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import { RevealOnScroll } from "@/components/ui/parallax";

/**
 * PRD v2.0 - Testimonials Section
 * Depoimentos de clientes B2B sobre a infraestrutura Kodano
 */

const testimonials = [
  {
    quote:
      "A Kodano nos permitiu escalar nossas operações de pagamento sem nos preocuparmos com infraestrutura. O roteamento inteligente aumentou nossa taxa de aprovação em 18%.",
    author: "Carlos Silva",
    role: "CTO",
    company: "TechCommerce",
  },
  {
    quote:
      "Implementamos o gateway da Kodano em menos de uma semana. A documentação é impecável e o suporte técnico é excepcional. Nossa solução white-label está rodando perfeitamente.",
    author: "Ana Martins",
    role: "Head of Engineering",
    company: "PayFlow Solutions",
  },
  {
    quote:
      "A segurança e compliance da Kodano nos deram a confiança necessária para processar milhões em transações. PCI DSS Nível 1 e zero dores de cabeça.",
    author: "Roberto Almeida",
    role: "CEO",
    company: "Marketplace Plus",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <RevealOnScroll>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
              Confiança de quem{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#053B3F] to-[#00A6B4]">
                constrói o futuro
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Empresas que escolheram a Kodano para processar seus pagamentos com segurança e performance
            </p>
          </div>
        </RevealOnScroll>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="border-border hover:border-[#00A6B4] transition-all duration-300 hover:shadow-lg h-full">
                <CardContent className="pt-6">
                  {/* Quote icon */}
                  <div className="mb-4">
                    <Quote className="h-8 w-8 text-[#00A6B4] opacity-50" />
                  </div>

                  {/* Quote text */}
                  <p className="text-muted-foreground leading-relaxed mb-6 italic">
                    "{testimonial.quote}"
                  </p>

                  {/* Author info */}
                  <div className="border-t border-border pt-4">
                    <p className="font-semibold text-foreground">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} • {testimonial.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-muted-foreground mb-4">
            Junte-se a dezenas de empresas que confiam na Kodano
          </p>
          <a
            href="/clientes"
            className="inline-flex items-center text-[#00A6B4] hover:text-[#053B3F] font-semibold transition-colors"
          >
            Ver casos de sucesso →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
