"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Zap, Package, Building2, Handshake, DollarSign, Info, Mail, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAVIGATION_ITEMS } from "@/lib/constants/navigation";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";

// Ícones para cada item de navegação
const navigationIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "/como-funciona": Zap,
  "/produtos": Package,
  "/solucoes": Building2,
  "/adquirentes": Handshake,
  "/precos": DollarSign,
  "/sobre": Info,
  "/contato": Mail,
};

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
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
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
            {/* Backdrop com gradiente animado */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60 backdrop-blur-md z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel - Glassmorphism */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ 
                duration: 0.4, 
                ease: [0.22, 1, 0.36, 1],
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              className="fixed top-16 left-0 right-0 z-50 lg:hidden border-t border-border/50 bg-background/95 backdrop-blur-2xl shadow-2xl"
            >
              {/* Decorative gradient line */}
              <div className="h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
              
              <div className="container mx-auto px-4 sm:px-6 py-8">
                <nav className="flex flex-col space-y-2">
                  {NAVIGATION_ITEMS.map((item, index) => {
                    const Icon = navigationIcons[item.href] || Package;
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -30, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ 
                          delay: index * 0.06,
                          type: "spring",
                          stiffness: 300,
                          damping: 25
                        }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="group relative flex items-center gap-4 min-h-[56px] px-5 py-4 text-base font-medium text-slate-900 dark:text-slate-50 rounded-xl transition-all overflow-hidden"
                        >
                          {/* Background gradient on hover */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 opacity-0 group-hover:opacity-100 rounded-xl"
                            transition={{ duration: 0.3 }}
                          />
                          
                          {/* Animated border */}
                          <motion.div
                            className="absolute inset-0 border-2 border-accent/0 group-hover:border-accent/30 rounded-xl"
                            transition={{ duration: 0.3 }}
                          />
                          
                          {/* Icon container */}
                          <motion.div
                            className="relative z-10 flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 group-hover:from-primary/30 group-hover:to-accent/30 transition-all"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            <Icon className="h-5 w-5 text-accent" />
                          </motion.div>
                          
                          {/* Text container */}
                          <div className="relative z-10 flex-1">
                            <div className="font-semibold">{item.label}</div>
                            {item.description && (
                              <div className="text-xs text-muted-foreground mt-0.5">
                                {item.description}
                              </div>
                            )}
                          </div>
                          
                          {/* Arrow icon */}
                          <motion.div
                            className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                            initial={false}
                          >
                            <ArrowRight className="h-5 w-5 text-accent" />
                          </motion.div>
                        </Link>
                      </motion.div>
                    );
                  })}
                  
                  {/* CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      delay: NAVIGATION_ITEMS.length * 0.06 + 0.1,
                      type: "spring",
                      stiffness: 300,
                      damping: 25
                    }}
                    className="pt-6 border-t border-border/50 mt-4"
                  >
                    <Button
                      asChild
                      variant="kodano"
                      rounded="full"
                      size="lg"
                      className="w-full group relative overflow-hidden"
                    >
                      <Link
                        href="/contato"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-2"
                      >
                        <span>Fale conosco</span>
                        <motion.div
                          initial={{ x: -10, opacity: 0 }}
                          whileHover={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </motion.div>
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
