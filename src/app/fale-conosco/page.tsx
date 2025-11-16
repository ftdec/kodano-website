"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

/**
 * PRD DEFINITIVO – Página Fale Conosco
 * Implementação exata conforme PRD-Kodano-Final.md
 * Design Stripe-level conforme Kodano-Cursor-Master-Prompt.md
 */

const volumesMensais = [
  "Até R$ 10.000",
  "10k–50k",
  "50k–150k",
  "150k–500k",
  "500k–1M",
  "+1M",
];

export default function FaleConoscoPage() {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [formRef, formInView] = useInView({
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
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6 leading-tight tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Fale Conosco
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              Preencha os dados e entraremos em contato.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            ref={formRef}
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card className="border-border/50 shadow-lg">
              <CardHeader>
                <h2 className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-foreground">
                  Formulário de contato
                </h2>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={formInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <Label htmlFor="nome">Nome</Label>
                    <Input 
                      id="nome" 
                      placeholder="Nome completo" 
                      required 
                      className="transition-all duration-300 focus:ring-2 focus:ring-accent/50"
                    />
                  </motion.div>

                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={formInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <Label htmlFor="empresa">Empresa</Label>
                    <Input 
                      id="empresa" 
                      placeholder="Nome da empresa" 
                      required 
                      className="transition-all duration-300 focus:ring-2 focus:ring-accent/50"
                    />
                  </motion.div>

                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={formInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <Label htmlFor="email">Email corporativo</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu.email@empresa.com"
                      required
                      className="transition-all duration-300 focus:ring-2 focus:ring-accent/50"
                    />
                  </motion.div>

                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={formInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      type="tel"
                      placeholder="(11) 99999-9999"
                      required
                      className="transition-all duration-300 focus:ring-2 focus:ring-accent/50"
                    />
                  </motion.div>

                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={formInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <Label htmlFor="volume">Volume mensal</Label>
                    <Select required>
                      <SelectTrigger 
                        id="volume"
                        className="transition-all duration-300 focus:ring-2 focus:ring-accent/50"
                      >
                        <SelectValue placeholder="Selecione o volume mensal" />
                      </SelectTrigger>
                      <SelectContent>
                        {volumesMensais.map((volume, index) => (
                          <SelectItem key={index} value={volume}>
                            {volume}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={formInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    <Label htmlFor="mensagem">Mensagem (opcional)</Label>
                    <textarea
                      id="mensagem"
                      rows={6}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none transition-all duration-300"
                      placeholder="Conte-nos mais sobre suas necessidades..."
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={formInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full group"
                    >
                      Fale Conosco
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}
