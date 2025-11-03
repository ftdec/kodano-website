"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import {
  CreditCard,
  Share2,
  Receipt,
  ShoppingCart,
  Shield,
  ArrowRight,
  Check,
  Code2,
} from "lucide-react";

const products = [
  {
    id: "payments",
    name: "Payments",
    tagline: "Aceite todos os métodos de pagamento",
    description:
      "Processe pagamentos online com cartões, Pix, boleto e carteiras digitais",
    icon: CreditCard,
    color: "from-blue-500/10 to-cyan-500/10",
    features: [
      "Cartões de crédito e débito",
      "Pix com confirmação instantânea",
      "Boleto bancário com registro",
      "Apple Pay e Google Pay",
      "Tokenização segura",
      "3D Secure automático",
    ],
    pricing: "2,9% + R$ 0,39 por transação",
    code: `const payment = await kodano.payments.create({
  amount: 10000,
  currency: 'BRL',
  method: 'credit_card'
});`,
  },
  {
    id: "connect",
    name: "Connect",
    tagline: "Split para marketplaces",
    description: "Plataforma de split de pagamentos para marketplaces e SaaS",
    icon: Share2,
    color: "from-purple-500/10 to-pink-500/10",
    features: [
      "Onboarding automatizado de sellers",
      "Split configurável",
      "Repasses programados",
      "KYC e compliance fiscal",
      "Dashboard para sellers",
      "White-label completo",
    ],
    pricing: "Incluído no plano Growth",
    code: `const split = await kodano.connect.split({
  amount: 10000,
  splits: [
    { account: seller1, amount: 7000 },
    { account: platform, amount: 3000 }
  ]
});`,
  },
  {
    id: "billing",
    name: "Billing",
    tagline: "Assinaturas recorrentes",
    description: "Gestão completa de assinaturas e cobranças recorrentes",
    icon: Receipt,
    color: "from-green-500/10 to-emerald-500/10",
    features: [
      "Planos fixos ou por uso",
      "Trials gratuitos",
      "Upgrades/downgrades automáticos",
      "Prorateamento inteligente",
      "Gestão de inadimplência",
      "Métricas MRR e churn",
    ],
    pricing: "Incluído no plano Growth",
    code: `const subscription = await kodano.billing.subscribe({
  customer: customerId,
  plan: 'premium_monthly',
  trial_days: 14
});`,
  },
  {
    id: "checkout",
    name: "Checkout",
    tagline: "Checkout otimizado",
    description: "Página de checkout personalizável e otimizada para conversão",
    icon: ShoppingCart,
    color: "from-orange-500/10 to-amber-500/10",
    features: [
      "Templates customizáveis",
      "Otimizado para conversão",
      "Totalmente responsivo",
      "Recuperação de carrinho",
      "Upsell e cross-sell",
      "A/B testing nativo",
    ],
    pricing: "Incluído no plano Growth",
    code: `const checkout = await kodano.checkout.create({
  items: [
    { product: 'prod_123', quantity: 2 }
  ],
  success_url: 'https://seu-site.com/success'
});`,
  },
  {
    id: "radar",
    name: "Radar",
    tagline: "Proteção contra fraudes",
    description: "Proteção inteligente contra fraudes com machine learning",
    icon: Shield,
    color: "from-red-500/10 to-rose-500/10",
    features: [
      "Detecção em tempo real",
      "Machine learning adaptativo",
      "Regras customizáveis",
      "Score de risco",
      "Análise comportamental",
      "Proteção contra chargebacks",
    ],
    pricing: "A partir de R$ 0,10 por análise",
    code: `const analysis = await kodano.radar.analyze({
  transaction: transactionId,
  rules: ['high_risk_location'],
  threshold: 'medium'
});`,
  },
];

export function ProductsModalSection() {
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

  return (
    <>
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
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className="border-border hover:border-accent transition-all duration-300 hover:shadow-xl group overflow-hidden cursor-pointer h-full"
                  onClick={() => setSelectedProduct(product)}
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
                    <div className="flex items-center text-accent font-medium group-hover:translate-x-1 transition-transform">
                      Ver detalhes
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
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

      {/* Product Modal */}
      <Dialog
        open={!!selectedProduct}
        onOpenChange={(open) => !open && setSelectedProduct(null)}
      >
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <>
              <DialogHeader>
                <div
                  className={`mb-4 inline-flex p-4 rounded-xl bg-gradient-to-br ${selectedProduct.color} w-fit`}
                >
                  <selectedProduct.icon className="h-8 w-8 text-foreground" />
                </div>
                <DialogTitle className="text-3xl font-bold font-[family-name:var(--font-poppins)]">
                  {selectedProduct.name}
                </DialogTitle>
                <DialogDescription className="text-lg">
                  {selectedProduct.tagline}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                {/* Description */}
                <p className="text-muted-foreground">
                  {selectedProduct.description}
                </p>

                {/* Features */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">
                    Recursos principais
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedProduct.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div className="bg-accent/5 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold mb-2">Preço</h4>
                  <p className="text-lg font-bold text-foreground">
                    {selectedProduct.pricing}
                  </p>
                </div>

                {/* Code Example */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold">Exemplo de código</h4>
                    <Badge variant="secondary">
                      <Code2 className="h-3 w-3 mr-1" />
                      Node.js
                    </Badge>
                  </div>
                  <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto">
                    <code className="text-xs text-foreground font-mono">
                      {selectedProduct.code}
                    </code>
                  </pre>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button size="lg" className="flex-1" asChild>
                    <Link href="/desenvolvedores">
                      Ver documentação
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="flex-1" asChild>
                    <Link href={`/produtos#${selectedProduct.id}`}>
                      Página completa
                    </Link>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
