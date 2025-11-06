"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Navigation structure with dropdowns
const navigation = [
  {
    name: "Produtos",
    href: "#",
    dropdown: [
      { name: "Gateway de Pagamentos", href: "/produtos/gateway", icon: "💳" },
      { name: "Split de Pagamentos", href: "/produtos/split", icon: "📊" },
      { name: "Checkout Transparente", href: "/produtos/checkout", icon: "🛒" },
      { name: "Antifraude", href: "/produtos/antifraude", icon: "🛡️" },
    ],
  },
  {
    name: "Soluções",
    href: "#",
    dropdown: [
      { name: "E-commerce", href: "/solucoes/ecommerce", icon: "🛍️" },
      { name: "Marketplaces", href: "/solucoes/marketplaces", icon: "🏪" },
      { name: "SaaS", href: "/solucoes/saas", icon: "☁️" },
      { name: "Fintechs", href: "/solucoes/fintechs", icon: "🏦" },
    ],
  },
  { name: "Desenvolvedores", href: "/desenvolvedores" },
  { name: "Preços", href: "/precos" },
  { name: "Sobre", href: "/sobre" },
];

export function NavbarV2() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  // Smart hide/show on scroll
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > 100 && latest > previous) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
    setIsScrolled(latest > 10);
  });

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scroll when mobile menu is open
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
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-sticky",
          "transition-all duration-300",
          isScrolled
            ? "bg-white/70 dark:bg-kodano-dark/70 backdrop-blur-xl border-b border-black/5 dark:border-white/5 shadow-sm"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="group flex items-center gap-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-kodano-cyan to-accent-purple rounded-lg opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
                  <div className="relative bg-gradient-to-br from-kodano-cyan to-kodano-teal text-white font-bold text-xl w-12 h-12 rounded-lg flex items-center justify-center">
                    K
                  </div>
                </div>
                <span className="font-display font-bold text-xl text-foreground">
                  Kodano
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:gap-8">
              {navigation.map((item) => (
                <div key={item.name} className="relative">
                  {item.dropdown ? (
                    <button
                      className={cn(
                        "flex items-center gap-1 text-sm font-medium transition-colors",
                        "hover:text-kodano-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-kodano-cyan rounded-md px-2 py-1",
                        pathname.startsWith(item.href) ? "text-kodano-cyan" : "text-foreground/70"
                      )}
                      onMouseEnter={() => setActiveDropdown(item.name)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      {item.name}
                      <ChevronDown className="h-3 w-3" />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "text-sm font-medium transition-colors",
                        "hover:text-kodano-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-kodano-cyan rounded-md px-2 py-1",
                        pathname === item.href ? "text-kodano-cyan" : "text-foreground/70"
                      )}
                    >
                      {item.name}
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.dropdown && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-full mt-2 w-64 rounded-xl bg-white dark:bg-surface-1 shadow-xl border border-black/5 dark:border-white/10 overflow-hidden"
                        onMouseEnter={() => setActiveDropdown(item.name)}
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        <div className="p-2">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-surface-2 group"
                            >
                              <span className="text-xl">{subItem.icon}</span>
                              <span className="flex-1 text-foreground/70 group-hover:text-foreground">
                                {subItem.name}
                              </span>
                              <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex lg:items-center lg:gap-4">
              <Link
                href="/contato"
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                Entrar
              </Link>
              <Link
                href="/contato"
                className="relative group overflow-hidden rounded-full bg-gradient-to-r from-kodano-cyan to-kodano-teal px-6 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
              >
                <span className="relative z-10">Falar com vendas</span>
                <div className="absolute inset-0 bg-gradient-to-r from-kodano-teal to-kodano-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative z-10 p-2 rounded-lg hover:bg-surface-1 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-white dark:bg-kodano-dark border-l border-black/5 dark:border-white/5 shadow-2xl lg:hidden"
            >
              <div className="flex h-16 items-center justify-between px-4 border-b border-black/5 dark:border-white/5">
                <span className="font-display font-bold text-xl">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-surface-1 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-col h-[calc(100vh-4rem)] overflow-y-auto">
                <div className="flex-1 px-4 py-6 space-y-1">
                  {navigation.map((item) => (
                    <div key={item.name}>
                      {item.dropdown ? (
                        <details className="group">
                          <summary className="flex items-center justify-between rounded-lg px-3 py-2.5 text-base font-medium text-foreground/70 hover:bg-surface-1 cursor-pointer">
                            {item.name}
                            <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                          </summary>
                          <div className="ml-4 mt-1 space-y-1">
                            {item.dropdown.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground/60 hover:bg-surface-1"
                              >
                                <span>{subItem.icon}</span>
                                <span>{subItem.name}</span>
                              </Link>
                            ))}
                          </div>
                        </details>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block rounded-lg px-3 py-2.5 text-base font-medium text-foreground/70 hover:bg-surface-1"
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>

                <div className="border-t border-black/5 dark:border-white/5 p-4 space-y-3">
                  <Link
                    href="/contato"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full rounded-lg border border-black/10 dark:border-white/10 px-4 py-2.5 text-center text-sm font-medium hover:bg-surface-1 transition-colors"
                  >
                    Entrar
                  </Link>
                  <Link
                    href="/contato"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full rounded-full bg-gradient-to-r from-kodano-cyan to-kodano-teal px-4 py-2.5 text-center text-sm font-semibold text-white shadow-lg"
                  >
                    Falar com vendas
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}