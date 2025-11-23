/**
 * Fale Conosco Page - Kodano Website
 * Simplified, modern, split-layout design
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button-v2";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FaleConoscoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const company = formData.get("company") as string;
    const volume = formData.get("volume") as string;
    const message = formData.get("message") as string;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          company,
          volume,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data.details 
          ? `${data.error}\n\nDetalhes: ${data.details}` 
          : data.error || "Erro ao enviar mensagem";
        throw new Error(errorMsg);
      }

      setIsSuccess(true);
      e.currentTarget.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao enviar mensagem. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-background text-foreground overflow-x-hidden font-sans selection:bg-primary/20">

      {/* MINIMAL HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-kodano-blue-medium flex items-center justify-center text-white font-bold text-lg">
              K
            </div>
            <span className="font-bold text-xl tracking-tight">Kodano</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/" className="flex items-center gap-2 hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" /> Voltar para Home
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex flex-col w-full pt-24 pb-12 px-6">
        <div className="container max-w-6xl mx-auto h-full flex-1 flex flex-col lg:flex-row gap-12 lg:gap-24 items-start justify-center py-8">

          {/* LEFT COLUMN - INFO */}
          <div className="flex-1 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Vamos conversar sobre <br />
                <span className="text-kodano-blue-medium">o seu negócio</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
                Nossa equipe de especialistas está pronta para entender suas necessidades e mostrar como a Kodano pode transformar sua operação de pagamentos.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <p className="text-muted-foreground text-sm">contato@kodano.com</p>
                    <p className="text-xs text-muted-foreground mt-1">Resposta em até 24h</p>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN - FORM */}
          <div className="flex-1 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm"
            >
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Mensagem enviada!</h3>
                  <p className="text-muted-foreground mb-8">
                    Obrigado pelo contato. Retornaremos em breve.
                  </p>
                  <Button variant="outline" onClick={() => setIsSuccess(false)}>
                    Enviar outra mensagem
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    {error && (
                      <div className="p-4 rounded-md bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                        {error}
                      </div>
                    )}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome completo</Label>
                        <Input id="name" name="name" placeholder="João Silva" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Empresa</Label>
                        <Input id="company" name="company" placeholder="Empresa XYZ" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email corporativo</Label>
                      <Input id="email" name="email" type="email" placeholder="joao@empresa.com" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="volume">Volume mensal de transações</Label>
                      <Select name="volume" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o volume" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Até R$ 50k/mês">Até R$ 50k/mês</SelectItem>
                          <SelectItem value="R$ 50k - R$ 200k/mês">R$ 50k - R$ 200k/mês</SelectItem>
                          <SelectItem value="R$ 200k - R$ 1M/mês">R$ 200k - R$ 1M/mês</SelectItem>
                          <SelectItem value="Acima de R$ 1M/mês">Acima de R$ 1M/mês</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Mensagem</Label>
                      <textarea
                        id="message"
                        name="message"
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Conte-nos sobre sua necessidade..."
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg" loading={isSubmitting} disabled={isSubmitting}>
                    Enviar Mensagem <Send className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              )}
            </motion.div>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-border bg-secondary/10">
        <div className="container max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary to-kodano-blue-medium flex items-center justify-center text-white font-bold text-xs">
              K
            </div>
            <span className="font-bold text-xl tracking-tight">Kodano</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Kodano. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}