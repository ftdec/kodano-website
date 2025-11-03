import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CreditCard,
  Share2,
  Receipt,
  ShoppingCart,
  Shield,
  ArrowRight,
} from "lucide-react";

const products = [
  {
    name: "Payments",
    description:
      "Aceite pagamentos online com cartões, Pix, boleto e carteiras digitais",
    icon: CreditCard,
    color: "from-blue-500/10 to-cyan-500/10",
    href: "/produtos#payments",
  },
  {
    name: "Connect",
    description:
      "Plataforma de split de pagamentos para marketplaces e SaaS",
    icon: Share2,
    color: "from-purple-500/10 to-pink-500/10",
    href: "/produtos#connect",
  },
  {
    name: "Billing",
    description:
      "Gestão completa de assinaturas e cobranças recorrentes",
    icon: Receipt,
    color: "from-green-500/10 to-emerald-500/10",
    href: "/produtos#billing",
  },
  {
    name: "Checkout",
    description:
      "Página de checkout otimizada e personalizável para sua marca",
    icon: ShoppingCart,
    color: "from-orange-500/10 to-amber-500/10",
    href: "/produtos#checkout",
  },
  {
    name: "Radar",
    description:
      "Proteção inteligente contra fraudes com machine learning",
    icon: Shield,
    color: "from-red-500/10 to-rose-500/10",
    href: "/produtos#radar",
  },
];

export function ProductsSection() {
  return (
    <section className="py-20 md:py-32 bg-accent/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
            Produtos projetados para{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              crescer com você
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Módulos completos que funcionam perfeitamente juntos ou
            separadamente
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {products.map((product, index) => (
            <Card
              key={index}
              className="border-border hover:border-accent transition-all duration-300 hover:shadow-xl group overflow-hidden"
            >
              <CardHeader>
                <div
                  className={`mb-4 inline-flex p-4 rounded-xl bg-gradient-to-br ${product.color} group-hover:scale-110 transition-transform`}
                >
                  <product.icon className="h-8 w-8 text-foreground" />
                </div>
                <h3 className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-foreground">
                  {product.name}
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  {product.description}
                </p>
                <Button
                  variant="ghost"
                  className="group/btn p-0 h-auto hover:bg-transparent"
                  asChild
                >
                  <Link href={product.href}>
                    Saiba mais
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" asChild>
            <Link href="/produtos">
              Ver todos os produtos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
