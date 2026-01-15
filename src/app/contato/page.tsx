import { Metadata } from "next";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Contato - Kodano",
  description: "Entre em contato com a Kodano. Estamos prontos para atender sua empresa.",
};

export default function ContatoPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
              Entre em{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#002A35] via-[#004A5A] to-[#002A35] bg-[length:200%_100%] animate-gradient">
                Contato
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Estamos prontos para atender sua empresa. Entre em contato conosco através dos canais abaixo.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Institutional Info Card */}
            <Card className="border-border mb-8">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Building2 className="h-6 w-6 text-accent" />
                  <h2 className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-foreground">
                    Informações Institucionais
                  </h2>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Company Info */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Razão Social</h3>
                      <p className="text-muted-foreground">
                        Kodano Tecnologia da Informação LTDA
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">CNPJ</h3>
                      <p className="text-muted-foreground">
                        09.688.215/0001-11
                      </p>
                    </div>
                  </div>
                  
                  {/* Address */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Endereço</h3>
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <MapPin className="h-5 w-5 mt-0.5 shrink-0 text-accent" />
                      <div>
                        <p>Rua Oscar Freire, 1437</p>
                        <p>6º andar — Conjuntos 61 ao 66</p>
                        <p>São Paulo – SP</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Channels */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone Card */}
              <Card className="border-border hover:border-accent/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-accent/10">
                      <Phone className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Telefone</h3>
                      <p className="text-sm text-muted-foreground">Atendimento comercial</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <a
                    href="tel:+5511982225822"
                    className="text-2xl font-bold text-foreground hover:text-accent transition-colors"
                  >
                    (11) 98222-5822
                  </a>
                </CardContent>
              </Card>

              {/* Email Card */}
              <Card className="border-border hover:border-accent/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-accent/10">
                      <Mail className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Email</h3>
                      <p className="text-sm text-muted-foreground">Resposta em até 24h</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <a
                    href="mailto:contato@kodano.com.br"
                    className="text-xl font-bold text-foreground hover:text-accent transition-colors break-all"
                  >
                    contato@kodano.com.br
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Policies Section */}
      <section className="py-16 bg-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
              Políticas Institucionais
            </h2>
            <p className="text-muted-foreground mb-8">
              Acesse nossas políticas de compliance e governança corporativa.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/politica-de-privacidade"
                className="px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-lg hover:border-accent hover:text-accent transition-colors"
              >
                Política de Privacidade
              </a>
              <a
                href="/politica-kyc-kyb"
                className="px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-lg hover:border-accent hover:text-accent transition-colors"
              >
                Política de KYC/KYB
              </a>
              <a
                href="/politica-pld-ft"
                className="px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-lg hover:border-accent hover:text-accent transition-colors"
              >
                Política de PLD-FT
              </a>
              <a
                href="/politica-seguranca-informacao"
                className="px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-lg hover:border-accent hover:text-accent transition-colors"
              >
                Política de Segurança da Informação
              </a>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
