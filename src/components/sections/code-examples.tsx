"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Code examples in different languages
const codeExamples = {
  javascript: {
    label: "Node.js",
    code: `// Instalar: npm install @kodano/node

import { Kodano } from '@kodano/node';

const kodano = new Kodano(process.env.KODANO_SECRET_KEY);

// Criar pagamento com cartão
const payment = await kodano.payments.create({
  amount: 15000, // R$ 150,00
  currency: 'BRL',
  payment_method: {
    type: 'credit_card',
    card: {
      number: '4242424242424242',
      exp_month: 12,
      exp_year: 2025,
      cvc: '123'
    }
  },
  customer: {
    email: 'cliente@exemplo.com',
    name: 'João Silva',
    document: '123.456.789-00'
  }
});

console.log('Pagamento criado:', payment.id);
console.log('Status:', payment.status);`
  },
  python: {
    label: "Python",
    code: `# Instalar: pip install kodano

import kodano
import os

kodano.api_key = os.environ['KODANO_SECRET_KEY']

# Criar pagamento com Pix
payment = kodano.Payment.create(
    amount=15000,  # R$ 150,00
    currency='BRL',
    payment_method={
        'type': 'pix'
    },
    customer={
        'email': 'cliente@exemplo.com',
        'name': 'João Silva',
        'document': '123.456.789-00'
    }
)

print(f'QR Code: {payment.pix_qr_code}')
print(f'Copia e Cola: {payment.pix_copia_cola}')`
  },
  php: {
    label: "PHP",
    code: `// Instalar: composer require kodano/kodano-php

require_once 'vendor/autoload.php';

\\Kodano\\Kodano::setApiKey($_ENV['KODANO_SECRET_KEY']);

// Criar pagamento com boleto
$payment = \\Kodano\\Payment::create([
    'amount' => 15000, // R$ 150,00
    'currency' => 'BRL',
    'payment_method' => [
        'type' => 'boleto'
    ],
    'customer' => [
        'email' => 'cliente@exemplo.com',
        'name' => 'João Silva',
        'document' => '123.456.789-00',
        'address' => [
            'street' => 'Rua Exemplo',
            'number' => '123',
            'city' => 'São Paulo',
            'state' => 'SP',
            'zipcode' => '01234-567'
        ]
    ]
]);

echo "Linha digitável: " . $payment->boleto_line;
echo "URL do boleto: " . $payment->boleto_url;`
  },
  ruby: {
    label: "Ruby",
    code: `# Instalar: gem install kodano

require 'kodano'

Kodano.api_key = ENV['KODANO_SECRET_KEY']

# Criar split de pagamento
payment = Kodano::Payment.create(
  amount: 15000, # R$ 150,00
  currency: 'BRL',
  payment_method: {
    type: 'credit_card',
    card: {
      token: 'tok_abc123' # Token do cartão
    }
  },
  splits: [
    {
      recipient_id: 'rec_seller123',
      amount: 13500, # R$ 135,00 para o vendedor
      type: 'percentage',
      charge_fee: false
    },
    {
      recipient_id: 'rec_marketplace',
      amount: 1500, # R$ 15,00 taxa do marketplace
      type: 'fixed',
      charge_fee: true
    }
  ]
)

puts "Pagamento split criado: #{payment.id}"`
  }
};

export function CodeExamples() {
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const code = codeExamples[selectedLanguage as keyof typeof codeExamples].code;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background to-kodano-cyan/5">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-kodano-cyan/10 text-kodano-cyan">
            Code Examples
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Integração{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-kodano-cyan to-kodano-teal">
              simples e rápida
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Exemplos práticos em várias linguagens. Copie, cole e comece a aceitar pagamentos.
          </p>
        </motion.div>

        {/* Code editor */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 overflow-hidden">
            {/* Editor header */}
            <div className="flex items-center justify-between px-6 py-4 bg-gray-800 border-b border-gray-700">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>

              {/* Language tabs */}
              <div className="flex gap-1 bg-gray-900 rounded-lg p-1">
                {Object.entries(codeExamples).map(([key, example]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedLanguage(key)}
                    className={cn(
                      "px-4 py-1.5 text-sm rounded-md transition-all duration-200",
                      selectedLanguage === key
                        ? "bg-kodano-cyan text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                    )}
                  >
                    {example.label}
                  </button>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  title="Copiar código"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-400" />
                  )}
                </button>
                <button
                  className="flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
                  title="Executar código"
                >
                  <Play className="w-3 h-3" />
                  Run
                </button>
              </div>
            </div>

            {/* Code content */}
            <div className="p-6 overflow-x-auto">
              <pre className="text-sm leading-relaxed">
                <code className="text-gray-300">
                  {codeExamples[selectedLanguage as keyof typeof codeExamples].code}
                </code>
              </pre>
            </div>

            {/* Output panel */}
            <div className="border-t border-gray-800 bg-gray-950 p-6">
              <div className="text-xs text-gray-500 mb-2">OUTPUT</div>
              <div className="font-mono text-sm text-green-400">
                {selectedLanguage === "javascript" && (
                  <>
                    Pagamento criado: pay_abc123xyz789
                    <br />
                    Status: approved
                  </>
                )}
                {selectedLanguage === "python" && (
                  <>
                    QR Code: 00020126580014BR.GOV.BCB.PIX...
                    <br />
                    Copia e Cola: 00020126580014BR.GOV.BCB.PIX0136...
                  </>
                )}
                {selectedLanguage === "php" && (
                  <>
                    Linha digitável: 23793.38128 60073.384842 84000.063309 8 96290000015000
                    <br />
                    URL do boleto: https://boleto.kodano.com/b/abc123
                  </>
                )}
                {selectedLanguage === "ruby" && (
                  <>
                    Pagamento split criado: pay_split_xyz789
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8 grid md:grid-cols-3 gap-6"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-kodano-cyan/10 mb-3">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="font-semibold text-foreground mb-1">Quick Start</h3>
              <p className="text-sm text-muted-foreground">
                Guia passo a passo para sua primeira integração
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-kodano-cyan/10 mb-3">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="font-semibold text-foreground mb-1">Exemplos Completos</h3>
              <p className="text-sm text-muted-foreground">
                Aplicações de exemplo no GitHub
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-kodano-cyan/10 mb-3">
                <span className="text-2xl">🧪</span>
              </div>
              <h3 className="font-semibold text-foreground mb-1">Sandbox</h3>
              <p className="text-sm text-muted-foreground">
                Ambiente de testes completo e gratuito
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}