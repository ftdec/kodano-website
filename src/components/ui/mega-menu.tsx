"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Share2,
  Receipt,
  ShoppingCart,
  Shield,
  BookOpen,
  Code2,
  Zap,
  Building,
  GraduationCap,
  Heart,
  Store,
  ChevronRight,
} from "lucide-react";

interface MegaMenuItem {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: string;
}

interface MegaMenuSection {
  title: string;
  items: MegaMenuItem[];
}

interface MegaMenuProps {
  trigger: string;
  sections: MegaMenuSection[];
  className?: string;
}

export function MegaMenu({ trigger, sections, className = "" }: MegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Trigger */}
      <button className="flex items-center justify-center gap-1 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent/50 rounded-md transition-all h-10">
        {trigger}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center"
        >
          <ChevronRight className="h-4 w-4 rotate-90" />
        </motion.div>
      </button>

      {/* Mega Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 top-16"
            />

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-1/2 -translate-x-1/2 mt-2 z-50"
              style={{ width: "calc(100vw - 4rem)", maxWidth: "1200px" }}
            >
              <div className="bg-background/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {sections.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                        {section.title}
                      </h3>
                      <div className="space-y-2">
                        {section.items.map((item, itemIndex) => (
                          <Link
                            key={itemIndex}
                            href={item.href}
                            className="block p-3 rounded-lg hover:bg-accent/50 transition-colors group"
                          >
                            <div className="flex items-start gap-3">
                              <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                                <item.icon className="h-5 w-5 text-accent" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-foreground group-hover:text-accent transition-colors">
                                    {item.title}
                                  </span>
                                  {item.badge && (
                                    <span className="px-2 py-0.5 text-xs font-medium bg-accent/20 text-accent rounded">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground mt-0.5">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Predefined mega menu configurations
export const produtosMegaMenu: MegaMenuSection[] = [
  {
    title: "Produtos Principais",
    items: [
      {
        title: "Payments",
        description: "Aceite todos os métodos de pagamento",
        icon: CreditCard,
        href: "/produtos#payments",
        badge: "Popular",
      },
      {
        title: "Connect",
        description: "Split para marketplaces",
        icon: Share2,
        href: "/produtos#connect",
      },
      {
        title: "Billing",
        description: "Assinaturas e recorrência",
        icon: Receipt,
        href: "/produtos#billing",
      },
    ],
  },
  {
    title: "Ferramentas",
    items: [
      {
        title: "Checkout",
        description: "Páginas otimizadas",
        icon: ShoppingCart,
        href: "/produtos#checkout",
        badge: "Novo",
      },
      {
        title: "Radar",
        description: "Antifraude inteligente",
        icon: Shield,
        href: "/produtos#radar",
      },
      {
        title: "Documentação",
        description: "Guias e referências",
        icon: BookOpen,
        href: "/desenvolvedores",
      },
    ],
  },
];

export const solucoesMegaMenu: MegaMenuSection[] = [
  {
    title: "Por Segmento",
    items: [
      {
        title: "SaaS",
        description: "Assinaturas e billing",
        icon: Building,
        href: "/solucoes#saas",
      },
      {
        title: "Marketplace",
        description: "Split de pagamentos",
        icon: Store,
        href: "/solucoes#marketplace",
      },
      {
        title: "EdTech",
        description: "Educação online",
        icon: GraduationCap,
        href: "/solucoes#edtech",
      },
      {
        title: "HealthTech",
        description: "Saúde digital",
        icon: Heart,
        href: "/solucoes#healthtech",
      },
    ],
  },
];
