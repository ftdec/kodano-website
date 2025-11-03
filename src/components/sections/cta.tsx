import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-accent/10 to-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
            Pronto para começar?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Milhares de empresas já confiam na Kodano. Comece gratuitamente e
            escale conforme cresce.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="text-base px-8 group" asChild>
              <Link href="/desenvolvedores">
                Criar conta grátis
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base px-8"
              asChild
            >
              <Link href="/contato">
                <MessageCircle className="mr-2 h-5 w-5" />
                Falar com especialista
              </Link>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-8">
            Sem cartão de crédito • Sandbox completo • Suporte em português
          </p>
        </div>
      </div>
    </section>
  );
}
