"use client";

import { useState } from "react";
import { CodeBlock } from "./code-block";
import { motion } from "framer-motion";

interface CodeExample {
  language: string;
  code: string;
  label: string;
  icon?: string;
}

interface CodePlaygroundProps {
  examples: CodeExample[];
  title?: string;
  description?: string;
  className?: string;
}

export function CodePlayground({
  examples,
  title,
  description,
  className = "",
}: CodePlaygroundProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      {(title || description) && (
        <div className="space-y-2">
          {title && (
            <h3 className="text-xl font-bold text-foreground">{title}</h3>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}

      {/* Language Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border pb-2">
        {examples.map((example, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`relative px-4 py-2 text-sm font-medium rounded-t-lg transition-all ${
              activeTab === index
                ? "text-foreground bg-muted"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <span className="flex items-center gap-2">
              {example.icon && <span>{example.icon}</span>}
              {example.label}
            </span>
            {activeTab === index && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Code Display */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <CodeBlock
          code={examples[activeTab].code}
          language={examples[activeTab].language}
          showLineNumbers={true}
        />
      </motion.div>
    </div>
  );
}

// Predefined examples for common use cases
export const paymentExamples: CodeExample[] = [
  {
    label: "Node.js",
    language: "javascript",
    icon: "📦",
    code: `import { Kodano } from '@kodano/node';

const kodano = new Kodano(process.env.KODANO_SECRET_KEY);

// Criar um pagamento
const payment = await kodano.payments.create({
  amount: 10000, // Valor em centavos
  currency: 'BRL',
  method: 'credit_card',
  customer: 'cus_abc123',
  description: 'Assinatura Premium',
  metadata: {
    order_id: 'ord_789'
  }
});

console.log('Payment ID:', payment.id);
console.log('Status:', payment.status);`,
  },
  {
    label: "Python",
    language: "python",
    icon: "🐍",
    code: `import kodano

kodano.api_key = "sk_test_..."

# Criar um pagamento
payment = kodano.Payment.create(
    amount=10000,  # Valor em centavos
    currency="BRL",
    method="credit_card",
    customer="cus_abc123",
    description="Assinatura Premium",
    metadata={
        "order_id": "ord_789"
    }
)

print(f"Payment ID: {payment.id}")
print(f"Status: {payment.status}")`,
  },
  {
    label: "PHP",
    language: "php",
    icon: "🐘",
    code: `<?php

require_once('vendor/autoload.php');

\\Kodano\\Kodano::setApiKey('sk_test_...');

// Criar um pagamento
$payment = \\Kodano\\Payment::create([
    'amount' => 10000, // Valor em centavos
    'currency' => 'BRL',
    'method' => 'credit_card',
    'customer' => 'cus_abc123',
    'description' => 'Assinatura Premium',
    'metadata' => [
        'order_id' => 'ord_789'
    ]
]);

echo "Payment ID: " . $payment->id . "\\n";
echo "Status: " . $payment->status . "\\n";`,
  },
  {
    label: "cURL",
    language: "bash",
    icon: "⚡",
    code: `curl https://api.kodano.com/v1/payments \\
  -u sk_test_...: \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 10000,
    "currency": "BRL",
    "method": "credit_card",
    "customer": "cus_abc123",
    "description": "Assinatura Premium",
    "metadata": {
      "order_id": "ord_789"
    }
  }'`,
  },
];

export const webhookExamples: CodeExample[] = [
  {
    label: "Node.js",
    language: "javascript",
    icon: "📦",
    code: `import express from 'express';
import { Kodano } from '@kodano/node';

const app = express();
const kodano = new Kodano(process.env.KODANO_SECRET_KEY);

app.post('/webhooks/kodano',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const sig = req.headers['kodano-signature'];
    let event;

    try {
      // Verificar assinatura do webhook
      event = kodano.webhooks.verify(
        req.body,
        sig,
        process.env.KODANO_WEBHOOK_SECRET
      );
    } catch (err) {
      return res.status(400).send(\`Webhook Error: \${err.message}\`);
    }

    // Processar o evento
    switch (event.type) {
      case 'payment.succeeded':
        const payment = event.data.object;
        console.log('Payment succeeded:', payment.id);
        // Processar pagamento aprovado
        break;

      case 'payment.failed':
        const failedPayment = event.data.object;
        console.log('Payment failed:', failedPayment.id);
        // Processar pagamento falhou
        break;

      default:
        console.log(\`Unhandled event type: \${event.type}\`);
    }

    res.json({ received: true });
  }
);

app.listen(3000);`,
  },
  {
    label: "Python",
    language: "python",
    icon: "🐍",
    code: `from flask import Flask, request, jsonify
import kodano

app = Flask(__name__)
kodano.api_key = "sk_test_..."

@app.route('/webhooks/kodano', methods=['POST'])
def webhook():
    payload = request.get_data()
    sig_header = request.headers.get('Kodano-Signature')

    try:
        # Verificar assinatura do webhook
        event = kodano.Webhook.verify(
            payload,
            sig_header,
            webhook_secret
        )
    except ValueError as e:
        return jsonify({'error': str(e)}), 400

    # Processar o evento
    if event['type'] == 'payment.succeeded':
        payment = event['data']['object']
        print(f'Payment succeeded: {payment["id"]}')
        # Processar pagamento aprovado

    elif event['type'] == 'payment.failed':
        payment = event['data']['object']
        print(f'Payment failed: {payment["id"]}')
        # Processar pagamento falhou

    return jsonify({'received': True})

if __name__ == '__main__':
    app.run(port=3000)`,
  },
];
