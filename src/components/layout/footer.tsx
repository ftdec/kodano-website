import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { BRAND, SOCIAL_LINKS } from "@/lib/constants/brand";
import { Linkedin, Twitter, Github, Instagram } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-screen-xl px-4 md:px-6 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Brand Column */}
          <div>
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
            <div className="flex items-center space-x-4 mt-6">
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Fale Conosco */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Fale Conosco</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/fale-conosco"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Fale Conosco
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {BRAND.name}. Todos os direitos reservados.
          </p>
          <div className="flex items-center space-x-6">
            <Link
              href="/privacidade"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacidade
            </Link>
            <Link
              href="/termos"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Termos de Uso
            </Link>
            <Link
              href="/cookies"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
