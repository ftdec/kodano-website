"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

/**
 * PRD DEFINITIVO – Página Como Funciona
 * Implementação exata conforme PRD-Kodano-Final.md
 * Design Stripe-level conforme Kodano-Cursor-Master-Prompt.md
 */

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

function StepCard({ number, text, delay = 0 }: { number: string; text: string; delay?: number }) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
    >
      <motion.div
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <Card className="border-border/50 hover:border-accent/50 transition-all duration-300 h-full group">
          <CardContent className="pt-10 pb-10 text-center">
            <motion.div 
              className="text-5xl font-bold text-accent mb-6"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: delay + 0.3, 
                type: "spring", 
                stiffness: 200, 
                damping: 20 
              }}
            >
              {number}
            </motion.div>
            <h3 className="text-xl font-semibold font-[family-name:var(--font-poppins)] text-foreground leading-tight">
              {text}
            </h3>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

export default function ComoFuncionaPage() {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(65,90,119,0.06)_0%,transparent_70%)]" />
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            ref={heroRef}
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6 leading-tight tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
            >
              Orquestração feita com precisão.
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-4 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
            >
              A rota certa, no momento certo.
            </motion.p>
            <motion.p 
              className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
            >
              Simplifica a gestão de múltiplas adquirentes.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Passos */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto"
          >
            <StepCard number="1" text="Conectamos sua empresa." delay={0} />
            <StepCard number="2" text="Integramos adquirentes." delay={0.1} />
            <StepCard number="3" text="Roteamento inteligente." delay={0.2} />
            <StepCard number="4" text="Acompanhamento claro." delay={0.3} />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <Button 
              size="lg" 
              asChild
              className="group"
            >
              <Link href="/fale-conosco">
                Fale Conosco
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}
