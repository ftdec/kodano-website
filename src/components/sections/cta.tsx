"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/10 via-accent/10 to-background overflow-hidden">
      {/* Simplified background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
            Quer reduzir custos e aumentar{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              aprovação?
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Solicite uma demonstração e veja como podemos otimizar seus pagamentos.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="text-base px-8 group bg-primary hover:bg-accent" asChild>
              <Link href="/contato">
                Solicitar demonstração
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="text-base px-8 hover:bg-accent/10 hover:border-accent hover:text-accent"
              asChild
            >
              <Link href="/contato">
                <MessageCircle className="mr-2 h-5 w-5" />
                Falar com vendas
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
