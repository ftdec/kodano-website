"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
  Search,
  Home,
  Package,
  Code2,
  Shield,
  Users,
  DollarSign,
  FileText,
  Mail,
  Building,
  CreditCard,
  Share2,
  Receipt,
  ShoppingCart,
  Zap,
} from "lucide-react";

interface CommandItem {
  id: string;
  title: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  keywords?: string[];
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  // Toggle command palette with cmd+k / ctrl+k
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Close on escape
  useEffect(() => {
    if (open) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setOpen(false);
        }
      };
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [open]);

  const navigate = (path: string) => {
    setOpen(false);
    setSearch("");
    router.push(path);
  };

  const commands: CommandItem[] = [
    // Páginas principais
    {
      id: "home",
      title: "Início",
      description: "Página inicial",
      icon: Home,
      action: () => navigate("/"),
      keywords: ["home", "inicio", "principal"],
    },
    {
      id: "produtos",
      title: "Produtos",
      description: "Conheça nossa infraestrutura completa",
      icon: Package,
      action: () => navigate("/produtos"),
      keywords: ["produtos", "products", "solucoes"],
    },
    {
      id: "desenvolvedores",
      title: "Desenvolvedores",
      description: "Documentação e APIs",
      icon: Code2,
      action: () => navigate("/desenvolvedores"),
      keywords: ["dev", "docs", "api", "documentacao"],
    },
    {
      id: "precos",
      title: "Preços",
      description: "Planos e valores",
      icon: DollarSign,
      action: () => navigate("/precos"),
      keywords: ["precos", "pricing", "planos"],
    },
    {
      id: "seguranca",
      title: "Segurança",
      description: "Compliance e certificações",
      icon: Shield,
      action: () => navigate("/seguranca"),
      keywords: ["seguranca", "security", "compliance"],
    },
    {
      id: "clientes",
      title: "Clientes",
      description: "Cases de sucesso",
      icon: Users,
      action: () => navigate("/clientes"),
      keywords: ["clientes", "customers", "cases"],
    },
    {
      id: "sobre",
      title: "Sobre Nós",
      description: "Conheça a Kodano",
      icon: Building,
      action: () => navigate("/sobre"),
      keywords: ["sobre", "about", "empresa"],
    },
    {
      id: "contato",
      title: "Contato",
      description: "Fale conosco",
      icon: Mail,
      action: () => navigate("/contato"),
      keywords: ["contato", "contact", "falar"],
    },

    // Produtos específicos
    {
      id: "payments",
      title: "Payments",
      description: "Aceite todos os métodos de pagamento",
      icon: CreditCard,
      action: () => navigate("/produtos#payments"),
      keywords: ["payments", "pagamentos", "cartao"],
    },
    {
      id: "connect",
      title: "Connect",
      description: "Split de pagamentos para marketplaces",
      icon: Share2,
      action: () => navigate("/produtos#connect"),
      keywords: ["connect", "split", "marketplace"],
    },
    {
      id: "billing",
      title: "Billing",
      description: "Assinaturas e cobranças recorrentes",
      icon: Receipt,
      action: () => navigate("/produtos#billing"),
      keywords: ["billing", "assinaturas", "recorrente"],
    },
    {
      id: "checkout",
      title: "Checkout",
      description: "Páginas de checkout otimizadas",
      icon: ShoppingCart,
      action: () => navigate("/produtos#checkout"),
      keywords: ["checkout", "carrinho"],
    },
    {
      id: "radar",
      title: "Radar",
      description: "Proteção inteligente contra fraudes",
      icon: Zap,
      action: () => navigate("/produtos#radar"),
      keywords: ["radar", "fraude", "antifraude"],
    },

    // Soluções
    {
      id: "solucoes",
      title: "Soluções",
      description: "Soluções por segmento",
      icon: FileText,
      action: () => navigate("/solucoes"),
      keywords: ["solucoes", "solutions", "segmentos"],
    },
  ];

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground bg-muted/50 hover:bg-muted rounded-lg border border-border transition-colors"
      >
        <Search className="h-4 w-4" />
        <span>Buscar...</span>
        <kbd className="hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Mobile Search Icon */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Buscar"
      >
        <Search className="h-5 w-5" />
      </button>

      {/* Command Palette */}
      {open && (
        <div className="fixed inset-0 z-50 animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Command Dialog */}
          <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-2xl animate-in zoom-in-95 duration-200">
            <Command className="rounded-lg border border-border bg-background shadow-2xl">
              <div className="flex items-center border-b border-border px-4">
                <Search className="h-5 w-5 text-muted-foreground mr-2" />
                <Command.Input
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Digite para buscar..."
                  className="flex h-14 w-full bg-transparent py-3 text-base outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                />
                <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  ESC
                </kbd>
              </div>

              <Command.List className="max-h-[400px] overflow-y-auto p-2">
                <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                  Nenhum resultado encontrado.
                </Command.Empty>

                <Command.Group heading="Páginas" className="mb-2">
                  {commands
                    .filter((cmd) =>
                      ["home", "produtos", "desenvolvedores", "precos", "seguranca", "clientes", "sobre", "contato", "solucoes"].includes(cmd.id)
                    )
                    .map((command) => (
                      <Command.Item
                        key={command.id}
                        value={`${command.title} ${command.description} ${command.keywords?.join(" ")}`}
                        onSelect={() => command.action()}
                        className="flex items-center gap-3 rounded-md px-3 py-2.5 cursor-pointer hover:bg-accent/50 transition-colors data-[selected=true]:bg-accent/50"
                      >
                        <command.icon className="h-5 w-5 text-accent" />
                        <div className="flex-1">
                          <div className="font-medium text-foreground">
                            {command.title}
                          </div>
                          {command.description && (
                            <div className="text-xs text-muted-foreground">
                              {command.description}
                            </div>
                          )}
                        </div>
                      </Command.Item>
                    ))}
                </Command.Group>

                <Command.Group heading="Produtos" className="mt-4">
                  {commands
                    .filter((cmd) =>
                      ["payments", "connect", "billing", "checkout", "radar"].includes(cmd.id)
                    )
                    .map((command) => (
                      <Command.Item
                        key={command.id}
                        value={`${command.title} ${command.description} ${command.keywords?.join(" ")}`}
                        onSelect={() => command.action()}
                        className="flex items-center gap-3 rounded-md px-3 py-2.5 cursor-pointer hover:bg-accent/50 transition-colors data-[selected=true]:bg-accent/50"
                      >
                        <command.icon className="h-5 w-5 text-accent" />
                        <div className="flex-1">
                          <div className="font-medium text-foreground">
                            {command.title}
                          </div>
                          {command.description && (
                            <div className="text-xs text-muted-foreground">
                              {command.description}
                            </div>
                          )}
                        </div>
                      </Command.Item>
                    ))}
                </Command.Group>
              </Command.List>

              {/* Footer */}
              <div className="border-t border-border px-4 py-2 text-xs text-muted-foreground flex items-center justify-between">
                <span>Use ↑↓ para navegar</span>
                <span>Enter para selecionar</span>
              </div>
            </Command>
          </div>
        </div>
      )}
    </>
  );
}
