"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

/**
 * PRD DEFINITIVO – Página Para Empresas
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
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

function BenefitItem({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
    >
      <motion.div
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <Card className="border-border/50 hover:border-accent/50 transition-all duration-300 group">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Check className="h-6 w-6 text-accent mt-0.5 flex-shrink-0" />
              </motion.div>
              <h3 className="text-lg font-semibold font-[family-name:var(--font-poppins)] text-foreground">
                {text}
              </h3>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

function UseCaseCard({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
    >
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <Card className="border-border/50 hover:border-accent/50 transition-all duration-300 h-full group">
          <CardContent className="pt-8 pb-8 text-center">
            <h3 className="text-lg font-semibold font-[family-name:var(--font-poppins)] text-foreground leading-tight">
              {text}
            </h3>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

const beneficios = [
  "Mais aprovação",
  "Menor custo por transação",
  "Painel unificado",
  "Simplificação operacional",
  "Suporte próximo",
];

const casosDeUso = [
  "E-commerce",
  "Assinaturas",
  "Marketplaces",
  "Apps",
  "Serviços digitais",
];

export default function ParaEmpresasPage() {
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
              Tecnologia que impulsiona empresas que crescem com consistência.
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
            >
              Eficiência, estabilidade, clareza.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-4xl mx-auto mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6 text-center leading-tight">
              Benefícios
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {beneficios.map((beneficio, index) => (
              <BenefitItem key={index} text={beneficio} delay={index * 0.1} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Casos de uso */}
      <section className="py-24 md:py-32 bg-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-4xl mx-auto mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6 text-center leading-tight">
              Casos de uso
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {casosDeUso.map((caso, index) => (
              <UseCaseCard key={index} text={caso} delay={index * 0.1} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-background">
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
