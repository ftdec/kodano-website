"use client";

import { motion } from "framer-motion";
import { TestTube, CreditCard, Users, Key, Database, Sparkles } from "lucide-react";
import Link from "next/link";

const sandboxFeatures = [
  {
    icon: CreditCard,
    title: "Cartões de teste",
    description: "Números de cartão para simular aprovações, recusas e erros"
  },
  {
    icon: Users,
    title: "Dados fictícios",
    description: "Clientes, pedidos e transações de teste ilimitados"
  },
  {
    icon: Key,
    title: "API Keys de teste",
    description: "Chaves separadas para desenvolvimento e produção"
  },
  {
    icon: Database,
    title: "Base isolada",
    description: "Ambiente completamente isolado da produção"
  }
];

const testCards = [
  { number: "4242 4242 4242 4242", result: "Aprovado", brand: "Visa" },
  { number: "5555 5555 5555 4444", result: "Aprovado", brand: "Mastercard" },
  { number: "4000 0000 0000 9995", result: "Recusado", brand: "Visa" },
  { number: "4000 0000 0000 0127", result: "CVV inválido", brand: "Visa" }
];

export function SandboxSection() {
  return (
    <section id="sandbox" className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-purple-500/10 text-purple-500">
            <TestTube className="inline w-4 h-4 mr-1" />
            Sandbox
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Ambiente de testes{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              completo e gratuito
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Teste toda a integração sem processar pagamentos reais.
            Simule qualquer cenário antes de ir para produção.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-foreground mb-8">
              Tudo que você precisa para testar
            </h3>
            <div className="space-y-6">
              {sandboxFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-purple-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <Link
                href="/contato"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Sparkles className="w-5 h-5" />
                Criar conta sandbox grátis
              </Link>
            </motion.div>
          </motion.div>

          {/* Test cards table */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold text-foreground mb-6">
              Cartões de teste
            </h3>
            <div className="space-y-3">
              {testCards.map((card, index) => (
                <motion.div
                  key={card.number}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="grid grid-cols-3 gap-4 p-3 bg-surface-1 rounded-lg text-sm"
                >
                  <div>
                    <code className="font-mono text-foreground">{card.number}</code>
                    <div className="text-xs text-muted-foreground mt-1">{card.brand}</div>
                  </div>
                  <div className="text-center">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      card.result === "Aprovado"
                        ? "bg-green-500/10 text-green-500"
                        : "bg-red-500/10 text-red-500"
                    }`}>
                      {card.result}
                    </span>
                  </div>
                  <div className="text-right text-muted-foreground">
                    Use qualquer CVV e data futura
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong className="text-purple-500">Dica:</strong> Use estes cartões com qualquer
                CVV de 3 dígitos e data de expiração futura. Veja a{" "}
                <a href="#" className="text-purple-500 hover:underline">
                  documentação completa
                </a>{" "}
                para mais cenários de teste.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Interactive demo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-12 text-center border border-purple-500/20"
        >
          <TestTube className="w-16 h-16 text-purple-500 mx-auto mb-6" />
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Experimente agora mesmo
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Teste nossa API diretamente do navegador. Sem cadastro, sem cartão de crédito.
          </p>
          <button className="px-8 py-4 bg-white dark:bg-gray-900 text-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            Abrir playground interativo →
          </button>
        </motion.div>
      </div>
    </section>
  );
}