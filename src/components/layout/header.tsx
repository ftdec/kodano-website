"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAVIGATION_ITEMS } from "@/lib/constants/navigation";
import { Logo } from "./logo";
import {
  MegaMenu,
  produtosMegaMenu,
  solucoesMegaMenu,
} from "@/components/ui/mega-menu";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // PRD 4.4: Scroll lock quando menu mobile está aberto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled
          ? "border-black/5 bg-white/70 backdrop-blur-md shadow-sm dark:border-white/5 dark:bg-[#0A0A0F]/60"
          : "border-black/5 bg-white/70 backdrop-blur-md dark:border-white/5 dark:bg-[#0A0A0F]/60"
      }`}
    >
      <div className="mx-auto max-w-screen-xl px-4 md:px-6">
        <div className="flex h-16 items-center gap-3">
          {/* Logo + nome — não deve encolher */}
          <div className="shrink-0">
            <Logo />
          </div>

          {/* Espaçador para empurrar o miolo */}
          <div className="flex-1" />

          {/* Navegação principal — PRD 4.3: gap-7, min-w-0 para evitar overflow */}
          <nav className="hidden lg:flex items-center gap-7 min-w-0">
            <MegaMenu trigger="Produtos" sections={produtosMegaMenu} />
            <MegaMenu trigger="Soluções" sections={solucoesMegaMenu} />
            {NAVIGATION_ITEMS.slice(2, 6).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-center h-10 text-sm font-medium text-slate-800 hover:text-[#00A6B4] whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#00A6B4] focus:outline-none rounded-sm transition-colors dark:text-slate-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Ações à direita — não encolher (shrink-0) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* CTA final conforme PRD 4.3 */}
            <Link
              href="/contato"
              className="rounded-full bg-[#053B3F] px-4 py-2 text-sm font-semibold text-white hover:bg-[#00A6B4] transition-colors focus-visible:ring-2 focus-visible:ring-[#00A6B4] focus:outline-none"
            >
              Fale conosco
            </Link>

            {/* Menu mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden ml-2 inline-flex h-9 w-9 items-center justify-center rounded-md border border-border hover:bg-accent transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - PRD 4.4: Off-canvas com Framer Motion (fade+slide) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
            className="lg:hidden border-t border-black/5 bg-white/95 backdrop-blur-lg dark:border-white/5 dark:bg-[#0A0A0F]/95 overflow-hidden"
          >
            <div className="mx-auto max-w-screen-xl px-4 md:px-6 py-4">
              <div className="flex flex-col space-y-1">
                {NAVIGATION_ITEMS.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center min-h-[44px] px-4 py-3 text-base font-medium text-slate-800 hover:text-[#00A6B4] hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-white/5 rounded-md transition-all border-b border-slate-100 dark:border-white/5 last:border-0"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: NAVIGATION_ITEMS.length * 0.05 }}
                  className="pt-4"
                >
                  <Link
                    href="/contato"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center min-h-[44px] w-full rounded-full bg-[#053B3F] px-6 py-3 text-base font-semibold text-white hover:bg-[#00A6B4] transition-colors"
                  >
                    Fale conosco
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
