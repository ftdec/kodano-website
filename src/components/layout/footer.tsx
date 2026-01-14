import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { BRAND } from "@/lib/constants/brand";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-screen-xl px-4 md:px-6 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-3 group"
              aria-label="Kodano - Início"
            >
              <div className="relative w-10 h-10 md:w-11 md:h-11 shrink-0 transition-transform group-hover:scale-110 flex items-center justify-center">
                <Image
                  src="/kodano-logo.png"
                  alt=""
                  width={44}
                  height={44}
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-transparent bg-clip-text bg-gradient-to-r from-[#002A35] via-[#00A6B4] to-[#002A35] bg-[length:200%_100%] animate-gradient whitespace-nowrap flex items-center leading-none">
                {BRAND.name}
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              {BRAND.description}
            </p>
            
            {/* Institutional Info */}
            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">
                Kodano Tecnologia da Informação LTDA
              </p>
              <p>CNPJ: 63.611.170/0001-22</p>
            </div>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contato</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:contato@kodano.com.br"
                  className="flex items-start gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <Mail className="h-4 w-4 mt-0.5 shrink-0 group-hover:text-primary transition-colors" />
                  <div>
                    <p className="font-medium text-foreground">contato@kodano.com.br</p>
                    <p className="text-xs text-muted-foreground">Resposta em até 24h</p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="tel:+5511982225822"
                  className="flex items-start gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <Phone className="h-4 w-4 mt-0.5 shrink-0 group-hover:text-primary transition-colors" />
                  <div>
                    <p className="font-medium text-foreground">(11) 98222-5822</p>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                  <div>
                    <p>Rua Oscar Freire, 1437</p>
                    <p>6º andar — Conjuntos 61 ao 66</p>
                    <p>São Paulo – SP</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Policies Column */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Políticas</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/politica-de-privacidade"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-kyc-kyb"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Política de KYC/KYB
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-pld-ft"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Política de PLD-FT
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-seguranca-informacao"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Política de Segurança da Informação
                </Link>
              </li>
              <li>
                <Link
                  href="/contato"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © {currentYear} {BRAND.name}. Todos os direitos reservados.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Kodano Tecnologia da Informação LTDA — CNPJ: 63.611.170/0001-22
            </p>
          </div>
          <div className="flex items-center flex-wrap justify-center gap-x-6 gap-y-2">
            <Link
              href="/politica-de-privacidade"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacidade
            </Link>
            <Link
              href="/politica-kyc-kyb"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              KYC/KYB
            </Link>
            <Link
              href="/politica-pld-ft"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              PLD-FT
            </Link>
            <Link
              href="/politica-seguranca-informacao"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Segurança
            </Link>
            <Link
              href="/contato"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contato
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
