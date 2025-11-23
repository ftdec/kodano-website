import { Metadata } from "next";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/constants/brand";
import { Mail } from "lucide-react";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contato - Fale com o nosso time",
  description: "Envie seus dados e nosso time retorna com uma avaliação rápida de ganhos potenciais (economia/aprovação/latência).",
};

export default function ContatoPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
              Fale com o{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#002A35] via-[#004A5A] to-[#002A35] bg-[length:200%_100%] animate-gradient">
                nosso time
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Envie seus dados e nosso time retorna com uma avaliação rápida de <strong>ganhos potenciais</strong> (economia/aprovação/latência).
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="border-border">
                <CardHeader>
                  <div className="flex items-start space-x-3">
                    <Mail className="h-6 w-6 text-accent mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Email
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {BRAND.email}
                      </p>
                    </div>
                  </div>
                </CardHeader>
              </Card>

            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-border">
                <CardHeader>
                  <h2 className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-foreground">
                    Envie sua mensagem
                  </h2>
                  <p className="text-muted-foreground">
                    Preencha o formulário abaixo e entraremos em contato em até 24 horas.
                  </p>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Additional CTAs */}
      <section className="py-20 bg-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-8 text-center">
              Outras formas de começar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-border hover:border-accent transition-all">
                <CardHeader>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Documentação técnica
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Explore nossa documentação completa e comece a integrar
                  </p>
                  <Button variant="outline" asChild>
                    <a href="/desenvolvedores">Acessar docs</a>
                  </Button>
                </CardHeader>
              </Card>

              <Card className="border-border hover:border-accent transition-all">
                <CardHeader>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Status do sistema
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Verifique o status em tempo real da nossa plataforma
                  </p>
                  <Button variant="outline" asChild>
                    <a href="/status">Ver status</a>
                  </Button>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
