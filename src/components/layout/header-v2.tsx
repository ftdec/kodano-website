"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { NAVIGATION_ITEMS } from "@/lib/constants/navigation";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/mobile-nav";
import { cn } from "@/lib/utils";
import { ChevronDown, ArrowRight } from "lucide-react";

// Import our design system
import { easings, durations } from "@/lib/design-system/motion";

// ============================================================================
// TYPES
// ============================================================================

interface NavItem {
  href: string;
  label: string;
  description?: string;
  items?: NavItem[];
  icon?: React.ComponentType<{ className?: string }>;
}

interface DropdownProps {
  items: NavItem[];
  isOpen: boolean;
}

// ============================================================================
// DROPDOWN COMPONENT (Stripe-style mega menu)
// ============================================================================

function NavigationDropdown({ items, isOpen }: DropdownProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: durations.fast }}
            className="fixed inset-0 top-16 bg-black/20 backdrop-blur-sm z-40"
          />

          {/* Dropdown Content */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: durations.normal,
              ease: easings.emphasized,
            }}
            className="absolute top-full left-0 w-full mt-px z-50"
          >
            <div className="bg-background border-b shadow-xl">
              <div className="container mx-auto px-8 py-8">
                <div className="grid grid-cols-4 gap-8">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: durations.normal,
                        ease: easings.emphasized,
                        delay: index * 0.05,
                      }}
                    >
                      <Link
                        href={item.href}
                        className="group block p-4 rounded-lg hover:bg-accent/5 transition-all duration-200"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                              {item.label}
                            </h3>
                            {item.description && (
                              <p className="mt-1 text-sm text-muted-foreground">
                                {item.description}
                              </p>
                            )}
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// NAVIGATION LINK WITH HOVER EFFECT
// ============================================================================

interface NavLinkProps {
  item: NavItem;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function NavigationLink({ item, isActive, onMouseEnter, onMouseLeave }: NavLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [hoverX, setHoverX] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!linkRef.current) return;
    const rect = linkRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    setHoverX(x);
  };

  return (
    <div className="relative" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Link
        ref={linkRef}
        href={item.href}
        onMouseMove={handleMouseMove}
        className={cn(
          "relative inline-flex items-center gap-1 px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg group",
          isActive
            ? "text-foreground bg-accent/10"
            : "text-foreground/70 hover:text-foreground hover:bg-accent/5"
        )}
      >
        {/* Hover gradient follow */}
        {!isActive && (
          <motion.span
            className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-accent/10 to-transparent opacity-0 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle at ${hoverX}px center, rgba(65, 90, 119, 0.1) 0%, transparent 70%)`,
            }}
            transition={{ duration: durations.instant }}
          />
        )}

        <span className="relative z-10">{item.label}</span>

        {item.items && (
          <ChevronDown
            className={cn(
              "relative z-10 h-3 w-3 transition-transform duration-200",
              isActive && "rotate-180"
            )}
          />
        )}

        {/* Active indicator line */}
        <motion.span
          className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isActive ? 1 : 0 }}
          transition={{
            duration: durations.normal,
            ease: easings.emphasized,
          }}
        />
      </Link>

      {/* Dropdown */}
      {item.items && <NavigationDropdown items={item.items} isOpen={isActive} />}
    </div>
  );
}

// ============================================================================
// MAIN HEADER COMPONENT
// ============================================================================

export function HeaderV2() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Mouse position for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Transform values for subtle parallax
  const backgroundX = useTransform(mouseX, [0, 1], [0, 0.5]);
  const backgroundY = useTransform(mouseY, [0, 1], [0, 0.5]);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle mouse move for parallax
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!headerRef.current) return;
    const rect = headerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("nav") && !target.closest("[role='menu']")) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Use navigation items from constants with enhanced dropdown for Produtos
  const enhancedNavItems: NavItem[] = NAVIGATION_ITEMS.map(item => {
    if (item.label === "Produtos") {
      return {
        ...item,
        items: [
          {
            href: "/produtos#orquestracao",
            label: "Orquestração Inteligente",
            description: "Otimização automática de funcionalidades avançadas",
          },
          {
            href: "/produtos#checkout",
            label: "Checkout Transparente",
            description: "Experiência de pagamento otimizada",
          },
          {
            href: "/produtos#antifraude",
            label: "Antifraude Avançado",
            description: "Proteção em tempo real com machine learning",
          },
          {
            href: "/produtos#dashboard",
            label: "Dashboard Unificado",
            description: "Visão completa de todas as transações",
          },
        ],
      };
    }
    return item;
  });

  return (
    <>
      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <MobileNav />
      </div>

      {/* Desktop Header */}
      <motion.header
        ref={headerRef}
        onMouseMove={handleMouseMove}
        className={cn(
          "hidden lg:block sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled
            ? "bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-sm"
            : "bg-background/80 backdrop-blur-md border-b border-border/30"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          duration: durations.slow,
          ease: easings.emphasized,
        }}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at ${backgroundX}% ${backgroundY}%, var(--color-accent) 0%, transparent 50%)`,
            x: backgroundX,
            y: backgroundY,
          }}
        />

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo with hover effect */}
            <motion.div
              className="flex items-center shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Logo />
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {enhancedNavItems.map((item) => (
                <NavigationLink
                  key={item.href}
                  item={item}
                  isActive={activeDropdown === item.href}
                  onMouseEnter={() => item.items && setActiveDropdown(item.href)}
                  onMouseLeave={() => setActiveDropdown(null)}
                />
              ))}
            </nav>

            {/* CTA Section */}
            <div className="flex items-center gap-4 shrink-0">
              {/* Primary CTA with enhanced animation */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Button
                  asChild
                  size="sm"
                  className={cn(
                    "relative overflow-hidden bg-primary text-primary-foreground",
                    "hover:bg-primary/90 hover:shadow-lg",
                    "transition-all duration-200"
                  )}
                >
                  <Link href="/fale-conosco">
                    <span className="relative z-10">Fale Conosco</span>
                    {/* Shimmer effect on hover */}
                    <motion.span
                      className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      whileHover={{
                        translateX: "100%",
                        transition: { duration: 0.5 },
                      }}
                    />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>
    </>
  );
}

// Export as default for easier migration
export default HeaderV2;