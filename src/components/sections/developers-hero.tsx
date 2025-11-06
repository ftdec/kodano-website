"use client";

import { motion } from "framer-motion";
import { Code, Terminal, Book, Zap } from "lucide-react";
import Link from "next/link";

export function DevelopersHero() {
  return (
    <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-br from-kodano-dark via-kodano-teal/20 to-kodano-dark">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%2300A6B4" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-center" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-kodano-cyan/10 border border-kodano-cyan/20 mb-6">
            <Code className="w-4 h-4 mr-2 text-kodano-cyan" />
            <span className="text-sm font-medium text-kodano-cyan">
              Developer First Platform
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            APIs que desenvolvedores{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-kodano-cyan to-emerald-400">
              adoram usar
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Documentação clara, SDKs robustos e suporte excepcional.
            Integre pagamentos em minutos, não em semanas.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { icon: Terminal, value: "< 5min", label: "Para integrar" },
              { icon: Code, value: "8+", label: "SDKs oficiais" },
              { icon: Zap, value: "150ms", label: "Latência P95" },
              { icon: Book, value: "100+", label: "Exemplos de código" }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                >
                  <Icon className="w-8 h-8 text-kodano-cyan mb-2 mx-auto" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#api-reference"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-kodano-cyan to-emerald-400 text-white font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Ver documentação
            </Link>
            <Link
              href="#sandbox"
              className="px-8 py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-all duration-300"
            >
              Testar no sandbox
            </Link>
          </div>
        </motion.div>

        {/* Code preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16 relative"
        >
          <div className="bg-gray-900 rounded-xl shadow-2xl border border-gray-800 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-gray-700">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-sm text-gray-400">index.js</span>
            </div>
            <pre className="p-6 text-sm overflow-x-auto">
              <code className="language-javascript text-gray-300">
{`// Inicializar Kodano
const kodano = new Kodano('sk_live_...');

// Criar pagamento
const payment = await kodano.payments.create({
  amount: 10000, // R$ 100,00
  customer: 'cus_abc123',
  method: 'pix'
});

console.log(payment.qr_code);`}
              </code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}