"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Footer } from "@/components/layout/footer";
import { BRAND } from "@/lib/constants/brand";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PolicySection {
  title: string;
  content: string | string[];
  subsections?: {
    title: string;
    content: string | string[];
  }[];
}

interface PolicyPageProps {
  title: string;
  subtitle: string;
  year: string;
  sections: PolicySection[];
}

// Mobile Nav Component for Policy Pages
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

function PolicyMobileNav() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const scrollThreshold = 20;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 4);
      if (isOpen && currentScrollY > lastScrollY.current + scrollThreshold) {
        setIsOpen(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const navElement = document.querySelector('[data-mobile-nav]');
      if (navElement && !navElement.contains(target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <header
      className="lg:hidden relative z-50 w-full bg-white"
      data-mobile-nav
    >
      <div
        className={`w-full px-4 sm:px-6 h-16 flex items-center justify-between transition-shadow duration-200 ${
          isScrolled ? "shadow-sm" : ""
        }`}
      >
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 shrink-0 transition-transform group-hover:scale-110 flex items-center justify-center">
            <Image
              src="/kodano-logo.png"
              alt="Kodano"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          </div>
          <span className="text-xl font-bold font-[family-name:var(--font-poppins)] text-transparent bg-clip-text bg-gradient-to-r from-[#002A35] via-[#00A6B4] to-[#002A35] bg-[length:200%_100%] animate-gradient whitespace-nowrap">
            {BRAND.name}
          </span>
        </Link>
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          whileTap={{ scale: 0.95 }}
        >
          <HamburgerIcon isOpen={isOpen} />
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
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
              <nav className="p-4 pb-4 space-y-1">
                <motion.div>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      router.push("/");
                      window.location.href = "/";
                    }}
                    className="block w-full text-left px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Home
                  </button>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function PolicyPage({ title, subtitle, year, sections }: PolicyPageProps) {
  const router = useRouter();
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full bg-background text-foreground overflow-x-hidden font-sans selection:bg-primary/20">
      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <PolicyMobileNav />
      </div>

      {/* Desktop Header */}
      <header
        className={cn(
          "hidden lg:block sticky top-0 z-50 w-full border-b transition-all duration-300 relative",
          isScrolled
            ? "border-border/50 bg-background/80 shadow-sm backdrop-blur-xl"
            : "border-border/50 bg-background/80 backdrop-blur-xl"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center shrink-0">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative w-10 h-10 md:w-11 md:h-11 shrink-0 transition-transform group-hover:scale-110 flex items-center justify-center">
                  <Image
                    src="/kodano-logo.png"
                    alt="Kodano"
                    width={44}
                    height={44}
                    className="object-contain"
                    priority
                  />
                </div>
                <span className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-transparent bg-clip-text bg-gradient-to-r from-[#002A35] via-[#00A6B4] to-[#002A35] bg-[length:200%_100%] animate-gradient whitespace-nowrap">
                  {BRAND.name}
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <button
                onClick={() => {
                  router.push("/");
                  window.location.href = "/";
                }}
                className="relative px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors rounded-md hover:bg-accent/5 group"
              >
                <span className="relative">
                  Home
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
                </span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col w-full">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(65,90,119,0.06)_0%,transparent_70%)]" />
          
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              ref={heroRef}
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 40 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <motion.div
                className="inline-block mb-6 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Documento Institucional de Compliance
              </motion.div>
              <motion.h1 
                className="text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6 leading-tight tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
              >
                {title}
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
              >
                {subtitle}
              </motion.p>
              <motion.p 
                className="text-sm text-muted-foreground/80"
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
              >
                Versão: {year}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {sections.map((section, index) => (
                <motion.div 
                  key={index}
                  className="mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                >
                  <h2 className="text-xl md:text-2xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-4">
                    {index + 1}. {section.title}
                  </h2>
                  <div className="prose prose-gray max-w-none">
                    {Array.isArray(section.content) ? (
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        {section.content.map((item, i) => (
                          <li key={i} className="text-base leading-relaxed">{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-base text-muted-foreground leading-relaxed">{section.content}</p>
                    )}
                  </div>
                  
                  {section.subsections && section.subsections.map((subsection, subIndex) => (
                    <div key={subIndex} className="mt-6 pl-4 border-l-2 border-accent/20">
                      <h3 className="text-lg font-semibold text-foreground mb-3">
                        {index + 1}.{subIndex + 1} {subsection.title}
                      </h3>
                      {Array.isArray(subsection.content) ? (
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                          {subsection.content.map((item, i) => (
                            <li key={i} className="text-base leading-relaxed">{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-base text-muted-foreground leading-relaxed">{subsection.content}</p>
                      )}
                    </div>
                  ))}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer Info */}
        <section className="py-12 bg-accent/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-sm text-muted-foreground">
                <strong>{BRAND.legalName}</strong>
              </p>
              <p className="text-sm text-muted-foreground">
                CNPJ: {BRAND.cnpj}
              </p>
              <p className="text-xs text-muted-foreground/80 mt-4">
                Este documento é de uso institucional e foi elaborado para fins de compliance.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
