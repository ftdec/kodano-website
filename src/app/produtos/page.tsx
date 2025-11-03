"use client";

import { Metadata } from "next";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  CreditCard,
  Share2,
  Receipt,
  ShoppingCart,
  Shield,
  ArrowRight,
  Check,
  Code2,
  Layers,
} from "lucide-react";

// PRD 6.2: Produtos - Payments, Connect, Billing, Checkout, Radar, Platform
const products = [
  {
    id: "payments",
    name: "Payments",
    tagline: "Aceite todos os métodos de pagamento",
    description:
      "Processe pagamentos online com cartões de crédito, débito, Pix, boleto bancário e carteiras digitais. Infraestrutura completa e segura.",
    icon: CreditCard,
    color: "from-blue-500/10 to-cyan-500/10",
    badge: "Mais popular",
    features: [
      "Aceite todos os principais cartões",
      "Pix com confirmação instantânea",
      "Boleto bancário com registro",
      "Carteiras digitais (Apple Pay, Google Pay)",
      "Checkout one-click",
      "Tokenização segura",
      "3D Secure automático",
      "Múltiplas moedas",
    ],
    codeExample: `const payment = await kodano.payments.create({
  amount: 10000, // R$ 100,00
  currency: 'BRL',
  method: 'credit_card',
  customer: customerId
});`,
  },
  {
    id: "connect",
    name: "Connect",
    tagline: "Split de pagamentos para marketplaces",
    description:
      "Plataforma completa para gerenciar vendedores, realizar split de pagamentos e automatizar repasses com compliance fiscal total.",
    icon: Share2,
    color: "from-purple-500/10 to-pink-500/10",
    features: [
      "Onboarding automatizado de sellers",
      "Split configurável de comissões",
      "Repasses programados ou sob demanda",
      "KYC e compliance fiscal",
      "Dashboard para cada seller",
      "Gestão de disputas",
      "Taxas personalizadas por seller",
      "White-label completo",
    ],
    codeExample: `const split = await kodano.connect.split({
  amount: 10000,
  splits: [
    { account: seller1, amount: 7000 },
    { account: seller2, amount: 2000 },
    { account: platform, amount: 1000 }
  ]
});`,
  },
  {
    id: "billing",
    name: "Billing",
    tagline: "Assinaturas e cobranças recorrentes",
    description:
      "Gerencie todo o ciclo de vida de assinaturas: trials, upgrades, downgrades, cobranças automáticas e muito mais.",
    icon: Receipt,
    color: "from-green-500/10 to-emerald-500/10",
    features: [
      "Planos fixos ou por uso",
      "Trials gratuitos e pagos",
      "Upgrades e downgrades automáticos",
      "Prorateamento inteligente",
      "Gestão de inadimplência",
      "Tentativas de cobrança automáticas",
      "Métricas de MRR e churn",
      "Portal do cliente",
    ],
    codeExample: `const subscription = await kodano.billing.subscribe({
  customer: customerId,
  plan: 'premium_monthly',
  trial_days: 14,
  payment_method: methodId
});`,
  },
  {
    id: "checkout",
    name: "Checkout",
    tagline: "Páginas de checkout otimizadas",
    description:
      "Crie experiências de checkout personalizadas e otimizadas para conversão, com sua marca e totalmente responsivas.",
    icon: ShoppingCart,
    color: "from-orange-500/10 to-amber-500/10",
    badge: "Novo",
    features: [
      "Templates customizáveis",
      "Otimizado para conversão",
      "Totalmente responsivo",
      "Recuperação de carrinho abandonado",
      "Upsell e cross-sell",
      "Múltiplos idiomas",
      "Analytics integrado",
      "A/B testing nativo",
    ],
    codeExample: `const checkout = await kodano.checkout.create({
  items: [
    { product: 'prod_123', quantity: 2 },
    { product: 'prod_456', quantity: 1 }
  ],
  success_url: 'https://seu-site.com/success',
  cancel_url: 'https://seu-site.com/cancel'
});`,
  },
  {
    id: "radar",
    name: "Radar",
    tagline: "Proteção inteligente contra fraudes",
    description:
      "Machine learning avançado para detectar e prevenir fraudes em tempo real, sem afetar suas vendas legítimas.",
    icon: Shield,
    color: "from-red-500/10 to-rose-500/10",
    features: [
      "Detecção em tempo real",
      "Machine learning adaptativo",
      "Regras customizáveis",
      "Score de risco por transação",
      "Análise comportamental",
      "Validação de dispositivos",
      "Proteção contra chargebacks",
      "Dashboard de fraudes",
    ],
    codeExample: `const analysis = await kodano.radar.analyze({
  transaction: transactionId,
  rules: ['high_risk_location', 'velocity_check'],
  threshold: 'medium'
});
// { risk_score: 23, action: 'approve' }`,
  },
  {
    id: "platform",
    name: "Platform",
    tagline: "Infraestrutura completa para sua plataforma",
    description:
      "Solução white-label completa para criar sua própria plataforma de pagamentos com toda infraestrutura pronta.",
    icon: Layers,
    color: "from-indigo-500/10 to-violet-500/10",
    features: [
      "White-label total",
      "APIs completas e documentadas",
      "Painel administrativo customizável",
      "Multi-tenancy nativo",
      "Webhooks e integrações",
      "Sandbox ilimitado",
      "Suporte técnico prioritário",
      "SLA 99.99% garantido",
    ],
    codeExample: `const platform = await kodano.platform.configure({
  branding: {
    logo: 'https://sua-marca.com/logo.png',
    colors: { primary: '#003E4E', accent: '#00A6B4' }
  },
  features: ['payments', 'connect', 'billing'],
  subdomain: 'sua-empresa'
});`,
  },
];

// Component wrapper com animação
function ProductSection({ product, index }: { product: typeof products[0]; index: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      ref={ref}
      id={product.id}
      className={`py-20 md:py-32 ${
        index % 2 === 0 ? "bg-background" : "bg-accent/5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className={index % 2 === 0 ? "lg:order-1" : "lg:order-2"}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className={`mb-6 inline-flex p-4 rounded-xl bg-gradient-to-br ${product.color}`}
            >
              <product.icon className="h-10 w-10 text-foreground" />
            </motion.div>

            {product.badge && (
              <Badge className="mb-4" variant="secondary">
                {product.badge}
              </Badge>
            )}

            <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-4">
              {product.name}
            </h2>

            <p className="text-xl text-muted-foreground mb-6">
              {product.tagline}
            </p>

            <p className="text-lg text-muted-foreground mb-8">
              {product.description}
            </p>

            <div className="space-y-3 mb-8">
              {product.features.slice(0, 6).map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 * idx, duration: 0.4 }}
                  className="flex items-start"
                >
                  <Check className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/desenvolvedores">
                  Ver documentação
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contato">Falar com vendas</Link>
              </Button>
            </div>
          </motion.div>

          {/* Code Example */}
          <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className={index % 2 === 0 ? "lg:order-2" : "lg:order-1"}
          >
            <Card className="border-border bg-card hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Code2 className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    Exemplo de código
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto">
                  <code className="text-sm text-foreground font-mono">
                    {product.codeExample}
                  </code>
                </pre>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function ProdutosPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
              Produtos que{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                crescem com você
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Infraestrutura completa de pagamentos. Use os módulos
              individualmente ou combinados para criar a solução perfeita.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Sections - PRD 6.2: Com animações interativas */}
      <div className="bg-background">
        {products.map((product, index) => (
          <ProductSection key={product.id} product={product} index={index} />
        ))}
      </div>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-accent/10 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
              Pronto para começar?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Teste gratuitamente todos os produtos em nosso ambiente sandbox
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/desenvolvedores">
                  Criar conta grátis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/precos">Ver preços</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
