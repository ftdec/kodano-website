"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAVIGATION_ITEMS } from "@/lib/constants/navigation";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll lock quando menu mobile está aberto
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

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const mainNavItems = NAVIGATION_ITEMS.slice(0, 6);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 relative ${
        isScrolled
          ? "border-border/50 bg-background/80 backdrop-blur-xl shadow-sm"
          : "border-border/50 bg-background/80 backdrop-blur-xl"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors rounded-md hover:bg-accent/5 group"
                onMouseEnter={() => setActiveDropdown(item.href)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <span className="relative">
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
                </span>
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="flex items-center gap-3 shrink-0">
            <Button
              asChild
              size="sm"
              variant="kodano"
              rounded="full"
              className="hidden lg:flex"
            >
              <Link href="/contato">Fale conosco</Link>
            </Button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-border/50 hover:border-accent/50 transition-all group"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={isMobileMenuOpen ? { rotate: 90 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5 text-foreground" />
                ) : (
                  <Menu className="h-5 w-5 text-foreground" />
                )}
              </motion.div>
              {!isMobileMenuOpen && (
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 blur-sm"
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel - Fixed para acompanhar scroll */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ 
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="fixed top-16 left-0 right-0 z-50 lg:hidden bg-background border-t border-border overflow-hidden max-h-[calc(100vh-4rem)] overflow-y-auto"
            >
              {/* Close Button */}
              <div className="flex justify-end px-4 pt-4 pb-2">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-accent/10 hover:border-accent/50 transition-colors"
                  aria-label="Fechar menu"
                >
                  <X className="h-5 w-5 text-foreground" />
                </button>
              </div>

              <div className="px-4 pb-6">
                <nav className="flex flex-col space-y-0">
                  {NAVIGATION_ITEMS.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: index * 0.04,
                        duration: 0.2
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-3 text-base font-medium text-foreground hover:text-accent hover:bg-accent/5 rounded-lg transition-colors active:bg-accent/10"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                  
                  {/* CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: NAVIGATION_ITEMS.length * 0.04 + 0.1,
                      duration: 0.2
                    }}
                    className="pt-4 mt-4 border-t border-border"
                  >
                    <Button
                      asChild
                      variant="kodano"
                      rounded="full"
                      size="lg"
                      className="w-full"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Link href="/contato">
                        Fale conosco
                      </Link>
                    </Button>
                  </motion.div>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
