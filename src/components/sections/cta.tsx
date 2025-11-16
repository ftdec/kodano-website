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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#002A35] via-[#004A5A] to-[#002A35] bg-[length:200%_100%] animate-gradient">
              aprovação?
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Fale conosco e veja como podemos otimizar seus pagamentos.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              variant="kodano"
              rounded="full"
              className="group"
              asChild
            >
              <Link href="/fale-conosco">
                Fale Conosco
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="kodano-outline"
              rounded="full"
              className="group"
              asChild
            >
              <Link href="/fale-conosco">
                <MessageCircle className="mr-2 h-5 w-5" />
                Fale Conosco
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
