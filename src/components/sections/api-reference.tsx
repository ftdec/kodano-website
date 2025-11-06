"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// API endpoints data
const apiEndpoints = [
  {
    category: "Payments",
    endpoints: [
      {
        method: "POST",
        path: "/v1/payments",
        description: "Criar novo pagamento"
      },
      {
        method: "GET",
        path: "/v1/payments/:id",
        description: "Buscar pagamento"
      },
      {
        method: "POST",
        path: "/v1/payments/:id/capture",
        description: "Capturar pagamento"
      },
      {
        method: "POST",
        path: "/v1/payments/:id/refund",
        description: "Reembolsar pagamento"
      }
    ]
  },
  {
    category: "Customers",
    endpoints: [
      {
        method: "POST",
        path: "/v1/customers",
        description: "Criar cliente"
      },
      {
        method: "GET",
        path: "/v1/customers/:id",
        description: "Buscar cliente"
      },
      {
        method: "PUT",
        path: "/v1/customers/:id",
        description: "Atualizar cliente"
      },
      {
        method: "DELETE",
        path: "/v1/customers/:id",
        description: "Deletar cliente"
      }
    ]
  },
  {
    category: "Subscriptions",
    endpoints: [
      {
        method: "POST",
        path: "/v1/subscriptions",
        description: "Criar assinatura"
      },
      {
        method: "POST",
        path: "/v1/subscriptions/:id/cancel",
        description: "Cancelar assinatura"
      },
      {
        method: "PUT",
        path: "/v1/subscriptions/:id",
        description: "Atualizar assinatura"
      }
    ]
  }
];

// Method badge colors
const methodColors = {
  GET: "bg-green-500/10 text-green-500 border-green-500/20",
  POST: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  PUT: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  DELETE: "bg-red-500/10 text-red-500 border-red-500/20"
};

export function APIReference() {
  const [selectedCategory, setSelectedCategory] = useState("Payments");
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  const handleCopy = (path: string) => {
    navigator.clipboard.writeText(`https://api.kodano.com${path}`);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  return (
    <section id="api-reference" className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-kodano-cyan/10 text-kodano-cyan">
            API Reference
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            RESTful API{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-kodano-cyan to-kodano-teal">
              completa e intuitiva
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Nossa API segue os padrões REST e retorna JSON em todas as respostas.
            Autenticação via Bearer token.
          </p>
        </motion.div>

        {/* API Explorer */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Categories sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-2">
              {apiEndpoints.map((category) => (
                <button
                  key={category.category}
                  onClick={() => setSelectedCategory(category.category)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-lg transition-all duration-300",
                    selectedCategory === category.category
                      ? "bg-kodano-cyan/10 text-kodano-cyan border-l-4 border-kodano-cyan"
                      : "hover:bg-surface-1 text-muted-foreground"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{category.category}</span>
                    <ChevronRight className={cn(
                      "w-4 h-4 transition-transform",
                      selectedCategory === category.category && "rotate-90"
                    )} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Endpoints list */}
          <div className="lg:col-span-3 space-y-4">
            {apiEndpoints
              .filter(cat => cat.category === selectedCategory)
              .map(category => (
                <div key={category.category} className="space-y-4">
                  {category.endpoints.map((endpoint, index) => (
                    <motion.div
                      key={endpoint.path}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-card border border-border rounded-xl p-6 hover:border-kodano-cyan/50 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className={cn(
                            "px-3 py-1 text-xs font-bold rounded-md border",
                            methodColors[endpoint.method as keyof typeof methodColors]
                          )}>
                            {endpoint.method}
                          </span>
                          <code className="text-sm font-mono text-foreground">
                            {endpoint.path}
                          </code>
                        </div>
                        <button
                          onClick={() => handleCopy(endpoint.path)}
                          className="p-2 hover:bg-surface-1 rounded-lg transition-colors"
                        >
                          {copiedPath === endpoint.path ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4 text-muted-foreground" />
                          )}
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {endpoint.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              ))}

            {/* Code example */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 bg-gray-900 rounded-xl p-6 border border-gray-800"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-400">Exemplo de requisição</span>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-xs bg-gray-800 text-gray-300 rounded">
                    cURL
                  </button>
                  <button className="px-3 py-1 text-xs bg-gray-700 text-gray-400 rounded">
                    Node.js
                  </button>
                  <button className="px-3 py-1 text-xs bg-gray-700 text-gray-400 rounded">
                    Python
                  </button>
                </div>
              </div>
              <pre className="text-sm text-gray-300 overflow-x-auto">
                <code>{`curl -X POST https://api.kodano.com/v1/payments \\
  -H "Authorization: Bearer sk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 10000,
    "currency": "BRL",
    "customer": "cus_abc123",
    "payment_method": "credit_card"
  }'`}</code>
              </pre>
            </motion.div>
          </div>
        </div>

        {/* API Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          {[
            {
              title: "Idempotência",
              description: "Todas as requisições POST aceitam chave de idempotência para evitar duplicações"
            },
            {
              title: "Paginação",
              description: "Resultados paginados com cursores para navegação eficiente em grandes datasets"
            },
            {
              title: "Rate Limiting",
              description: "1000 req/min em produção com headers informativos sobre limites"
            }
          ].map((feature, index) => (
            <div key={index} className="text-center">
              <h3 className="text-lg font-bold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}