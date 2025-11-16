"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, TrendingUp, DollarSign, LayoutDashboard, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

/**
 * PRD DEFINITIVO – Homepage Kodano
 * Implementação exata conforme PRD-Kodano-Final.md
 * Design Stripe-level conforme Kodano-Cursor-Master-Prompt.md
 */

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
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

const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { 
    scale: 1.02, 
    y: -4,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "-50px"
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function BenefitCard({ icon: Icon, title, description, delay = 0 }: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
  delay?: number;
}) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        variants={cardHover}
        initial="rest"
        whileHover="hover"
      >
        <Card className="border-border/50 hover:border-accent/50 transition-all duration-300 h-full group">
          <CardContent className="pt-8 pb-8">
            <motion.div 
              className="inline-flex p-4 rounded-xl bg-accent/10 group-hover:bg-accent/20 mb-6 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Icon className="h-6 w-6 text-accent" />
            </motion.div>
            <h3 className="text-xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3 leading-tight">
              {title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {description}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

function StepCard({ number, text, delay = 0 }: { number: string; text: string; delay?: number }) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <Card className="border-border/50 hover:border-accent/50 transition-all duration-300 h-full group">
          <CardContent className="pt-8 pb-8 text-center">
            <motion.div 
              className="text-4xl font-bold text-accent mb-6"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: delay + 0.2, type: "spring", stiffness: 200, damping: 15 }}
            >
              {number}
            </motion.div>
            <h3 className="text-lg font-semibold font-[family-name:var(--font-poppins)] text-foreground leading-tight">
              {text}
            </h3>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

function ProductCard({ title, description, delay = 0 }: { title: string; description: string; delay?: number }) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <Card className="border-border/50 hover:border-accent/50 transition-all duration-300 h-full group">
          <CardContent className="pt-8 pb-8 text-center">
            <h3 className="text-lg font-semibold font-[family-name:var(--font-poppins)] text-foreground mb-2 leading-tight">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {description}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <MainLayout>
      {/* 3.1 HERO */}
      <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(65,90,119,0.08)_0%,transparent_50%)]" />
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-8 leading-tight tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Pagamentos inteligentes para empresas que exigem eficiência.
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              Orquestração que aumenta aprovação, reduz custos e traz clareza operacional.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
          </motion.div>
        </div>
      </section>

      {/* 3.2 Benefícios */}
      <AnimatedSection className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto"
          >
            <BenefitCard 
              icon={TrendingUp} 
              title="Mais aprovação, menos atrito" 
              description="Roteamos pela melhor rota."
              delay={0}
            />
            <BenefitCard 
              icon={DollarSign} 
              title="Eficiência de custos" 
              description="Reduza taxas com operação inteligente."
              delay={0.1}
            />
            <BenefitCard 
              icon={LayoutDashboard} 
              title="Centro de controle unificado" 
              description="Acompanhe tudo em um painel."
              delay={0.2}
            />
            <BenefitCard 
              icon={Shield} 
              title="Tecnologia que inspira confiança" 
              description="Infra moderna e estável."
              delay={0.3}
            />
          </motion.div>
        </div>
      </AnimatedSection>

      {/* 3.3 Como Funciona (resumo) */}
      <AnimatedSection className="py-24 md:py-32 bg-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6 leading-tight">
              Como Funciona
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto mb-16"
          >
            <StepCard number="1" text="Conectamos sua empresa." delay={0} />
            <StepCard number="2" text="Integramos adquirentes." delay={0.1} />
            <StepCard number="3" text="Roteamos com inteligência." delay={0.2} />
            <StepCard number="4" text="Você acompanha tudo." delay={0.3} />
          </motion.div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
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
      </AnimatedSection>

      {/* 3.4 Produtos (resumo) */}
      <AnimatedSection className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6 leading-tight">
              Produtos
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto mb-16"
          >
            <ProductCard title="Orquestração Inteligente" description="melhor rota." delay={0} />
            <ProductCard title="Checkout Otimizado" description="fluxo rápido." delay={0.1} />
            <ProductCard title="Antifraude" description="proteção adicional." delay={0.2} />
            <ProductCard title="Dashboard" description="visão clara." delay={0.3} />
          </motion.div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
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
      </AnimatedSection>
    </MainLayout>
  );
}
