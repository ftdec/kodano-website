"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/layout/logo";
import { MobileNavLink } from "./mobile-nav-link";
import { NAVIGATION_ITEMS } from "@/lib/constants/navigation";
import Link from "next/link";

// Ícone hambúrguer animado customizado
function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="relative w-6 h-6 flex items-center justify-center">
      <motion.div
        className="absolute w-6 h-5 flex flex-col justify-between"
        initial={false}
        animate={isOpen ? "open" : "closed"}
      >
        <motion.span
          className="block w-full h-0.5 bg-[#111111] rounded-full origin-center"
          variants={{
            closed: { rotate: 0, y: 0 },
            open: { rotate: 45, y: 8 },
          }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        />
        <motion.span
          className="block w-full h-0.5 bg-[#111111] rounded-full origin-center"
          variants={{
            closed: { opacity: 1, scale: 1 },
            open: { opacity: 0, scale: 0 },
          }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        />
        <motion.span
          className="block w-full h-0.5 bg-[#111111] rounded-full origin-center"
          variants={{
            closed: { rotate: 0, y: 0 },
            open: { rotate: -45, y: -8 },
          }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        />
      </motion.div>
    </div>
  );
}

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const scrollThreshold = 20;

  // Menu items na ordem exata especificada
  const menuItems = NAVIGATION_ITEMS.slice(0, 6);

  // Detectar scroll para sombra na barra e fechar menu
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 4);

      // Fechar menu se usuário scrollar > 20px para baixo
      if (isOpen && currentScrollY > lastScrollY.current + scrollThreshold) {
        setIsOpen(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  // Fechar menu ao clicar fora
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const navElement = document.querySelector('[data-mobile-nav]');
      const dropdownElement = document.querySelector('[data-mobile-dropdown]');

      if (
        navElement &&
        dropdownElement &&
        !navElement.contains(target) &&
        !dropdownElement.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header
      className="lg:hidden sticky top-0 z-50 w-full bg-white"
      style={{ position: "sticky" }}
      data-mobile-nav
    >
      {/* Navbar Sticky */}
      <div
        className={`w-full px-4 sm:px-6 h-16 flex items-center justify-between transition-shadow duration-200 ${
          isScrolled ? "shadow-sm" : ""
        }`}
      >
        {/* Logo */}
        <div className="flex items-center shrink-0">
          <Logo />
        </div>

        {/* Botão Hambúrguer */}
        <motion.button
          onClick={toggleMenu}
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          whileTap={{ scale: 0.95 }}
        >
          <HamburgerIcon isOpen={isOpen} />
        </motion.button>
      </div>

      {/* Dropdown - Abre abaixo da navbar usando absolute top-full */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            data-mobile-dropdown
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 right-0 top-full bg-white shadow-lg rounded-b-xl"
            style={{
              maxHeight: "50vh",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.10)",
            }}
          >
            <div className="overflow-y-auto" style={{ maxHeight: "50vh" }}>
              {/* Conteúdo do Menu */}
              <nav className="p-4 pb-4 space-y-1">
                {menuItems.map((item, index) => (
                  <MobileNavLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    index={index}
                    onClose={closeMenu}
                  />
                ))}

                {/* CTA */}
                <div className="pt-4 mt-4 border-t border-gray-100 pb-2">
                  <motion.div whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/contato"
                      onClick={closeMenu}
                      className="block w-full px-4 py-3 text-base font-semibold text-white text-center rounded-lg bg-[#002A35] hover:bg-[#00C8DC] active:bg-[#002A35]/90 transition-all duration-200"
                    >
                      Fale conosco
                    </Link>
                  </motion.div>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
