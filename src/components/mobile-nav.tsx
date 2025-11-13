"use client";

import React, { useState, useEffect } from "react";
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
          className="block w-full h-0.5 bg-white rounded-full origin-center"
          variants={{
            closed: { rotate: 0, y: 0 },
            open: { rotate: 45, y: 8 },
          }}
          transition={{ type: "spring", stiffness: 140, damping: 18 }}
        />
        <motion.span
          className="block w-full h-0.5 bg-white rounded-full origin-center"
          variants={{
            closed: { opacity: 1, scale: 1 },
            open: { opacity: 0, scale: 0 },
          }}
          transition={{ type: "spring", stiffness: 140, damping: 18 }}
        />
        <motion.span
          className="block w-full h-0.5 bg-white rounded-full origin-center"
          variants={{
            closed: { rotate: 0, y: 0 },
            open: { rotate: -45, y: -8 },
          }}
          transition={{ type: "spring", stiffness: 140, damping: 18 }}
        />
      </motion.div>
    </div>
  );
}

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Menu items na ordem exata especificada
  const menuItems = NAVIGATION_ITEMS.slice(0, 6);

  // Scroll lock quando menu está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Detectar scroll para sombra na barra
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 4);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Barra Superior Fixa - Apenas Mobile */}
      <motion.header
        className="lg:hidden fixed top-0 left-0 right-0 z-50 w-full"
        initial={{ y: 0 }}
        animate={{ y: 0 }}
      >
        <motion.div
          className="w-full px-4 sm:px-6 h-16 flex items-center justify-between"
          animate={{
            backgroundColor: isScrolled
              ? "rgba(11, 11, 11, 0.95)"
              : "rgba(11, 11, 11, 0.8)",
            boxShadow: isScrolled
              ? "0 1px 3px rgba(0, 0, 0, 0.3)"
              : "none",
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <Logo />
          </div>

          {/* Botão Hambúrguer */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            whileTap={{ scale: 0.95 }}
          >
            <HamburgerIcon isOpen={isOpen} />
          </motion.button>
        </motion.div>
      </motion.header>

      {/* Overlay com Blur */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 backdrop-blur-sm z-[60] lg:hidden"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.55)" }}
              onClick={closeMenu}
            />

            {/* Painel Rollout */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                type: "spring",
                stiffness: 140,
                damping: 18,
              }}
              className="fixed top-16 left-0 right-0 z-[70] lg:hidden bg-[#0B0B0B] rounded-b-[24px] overflow-hidden"
              style={{ height: "87.5vh", maxHeight: "87.5vh", minHeight: "85vh" }}
            >
              <div className="h-full flex flex-col overflow-y-auto">
                {/* Conteúdo do Menu */}
                <nav className="flex-1 px-4 pt-8 pb-6 space-y-1">
                  {menuItems.map((item, index) => {
                    return (
                      <MobileNavLink
                        key={item.href}
                        href={item.href}
                        label={item.label}
                        index={index}
                        onClose={closeMenu}
                      />
                    );
                  })}
                </nav>

                {/* CTA Fixo no Final */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: menuItems.length * 0.05 + 0.1,
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                  }}
                  className="px-4 pb-6 pt-4 border-t border-white/10"
                >
                  <motion.div whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/contato"
                      onClick={closeMenu}
                      className="block w-full px-6 py-4 text-base font-semibold text-white text-center rounded-xl bg-[#1B4FFD] hover:bg-[#1B4FFD]/90 active:bg-[#1B4FFD]/80 transition-all duration-200 shadow-lg shadow-[#1B4FFD]/20"
                    >
                      Fale com um especialista
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

