"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BRAND } from "@/lib/constants/brand";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function ContactForm() {
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
    const website = formData.get("website") as string;
    const volume = formData.get("volume") as string;
    const acquirers = formData.get("acquirers") as string;
    const phone = formData.get("phone") as string;
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
          website,
          volume,
          acquirers,
          phone,
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

  if (isSuccess) {
    return (
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
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 rounded-md bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Nome completo</Label>
          <Input id="name" name="name" placeholder="João Silva" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">E-mail corporativo</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="joao@empresa.com"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="company">Empresa</Label>
          <Input id="company" name="company" placeholder="Minha Empresa Ltda" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">Site</Label>
          <Input
            id="website"
            name="website"
            type="url"
            placeholder="https://www.empresa.com.br"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="volume">Volume mensal estimado</Label>
          <Input
            id="volume"
            name="volume"
            placeholder="Ex: Volume mensal estimado"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="acquirers">Solução de pagamentos atual</Label>
          <Input
            id="acquirers"
            name="acquirers"
            placeholder="Ex: Gateway próprio, outra plataforma"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="phone">Telefone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="(11) 99999-9999"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Mensagem</Label>
        <textarea
          id="message"
          name="message"
          rows={6}
          className="w-full px-3 py-2 border border-input bg-background rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          placeholder="Conte-nos mais sobre suas necessidades..."
        />
      </div>

      <div className="flex items-start space-x-2">
        <input
          type="checkbox"
          id="terms"
          name="terms"
          className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          required
        />
        <Label htmlFor="terms" className="text-sm font-normal">
          Concordo em receber comunicações da Kodano e aceito os{" "}
          <a
            href="/termos"
            className="text-primary hover:underline"
          >
            termos de uso
          </a>{" "}
          e{" "}
          <a
            href="/privacidade"
            className="text-primary hover:underline"
          >
            política de privacidade
          </a>
          .
        </Label>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button type="submit" size="lg" className="flex-1" disabled={isSubmitting}>
          Fale conosco
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        <Button type="button" size="lg" variant="outline" className="flex-1 hover:bg-accent/10 hover:border-accent hover:text-accent" asChild>
          <a href={`mailto:${BRAND.email}`}>
            Falar com vendas
          </a>
        </Button>
      </div>
    </form>
  );
}

