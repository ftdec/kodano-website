"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { NAVIGATION_ITEMS } from "@/lib/constants/navigation";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/mobile-nav";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <>
      {/* Mobile Navigation - Apenas Mobile */}
      <div className="lg:hidden">
        <MobileNav />
      </div>

      {/* Desktop Header - Apenas Desktop */}
      <header
        className={`hidden lg:block sticky top-0 z-50 w-full border-b transition-all duration-300 relative ${
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

            {/* CTA Buttons */}
            <div className="flex items-center gap-3 shrink-0">
              <Button
                asChild
                size="sm"
                variant="outline"
                rounded="full"
                className="hidden lg:flex"
              >
                <Link href="/desenvolvedores">Documentação</Link>
              </Button>
              <Button
                asChild
                size="sm"
                variant="kodano"
                rounded="full"
                className="hidden lg:flex"
              >
                <Link href="/fale-conosco">Fale Conosco</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
