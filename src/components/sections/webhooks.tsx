"use client";

import { motion } from "framer-motion";
import { Webhook, Shield, Clock, RefreshCw } from "lucide-react";

const webhookEvents = [
  { event: "payment.created", description: "Pagamento criado" },
  { event: "payment.approved", description: "Pagamento aprovado" },
  { event: "payment.declined", description: "Pagamento recusado" },
  { event: "payment.refunded", description: "Pagamento reembolsado" },
  { event: "subscription.created", description: "Assinatura criada" },
  { event: "subscription.canceled", description: "Assinatura cancelada" },
  { event: "customer.created", description: "Cliente criado" },
  { event: "dispute.created", description: "Disputa aberta" }
];

export function WebhooksSection() {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background to-kodano-cyan/5">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-kodano-cyan/10 text-kodano-cyan">
            Webhooks
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Eventos em{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-kodano-cyan to-kodano-teal">
              tempo real
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Receba notificações instantâneas sobre eventos importantes da sua integração.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Event list */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-foreground mb-6">Eventos disponíveis</h3>
            <div className="space-y-3">
              {webhookEvents.map((item, index) => (
                <motion.div
                  key={item.event}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-3 bg-card border border-border rounded-lg hover:border-kodano-cyan/50 transition-colors"
                >
                  <code className="text-sm font-mono text-kodano-cyan">{item.event}</code>
                  <span className="text-sm text-muted-foreground">{item.description}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-kodano-cyan/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-kodano-cyan" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Assinatura segura</h4>
                <p className="text-sm text-muted-foreground">
                  Todos os webhooks são assinados com HMAC SHA-256 para garantir autenticidade.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-kodano-cyan/10 flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-kodano-cyan" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Retry automático</h4>
                <p className="text-sm text-muted-foreground">
                  Tentativas automáticas com backoff exponencial em caso de falha.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-kodano-cyan/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-kodano-cyan" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Histórico completo</h4>
                <p className="text-sm text-muted-foreground">
                  Acesse o histórico de até 30 dias de todos os webhooks enviados.
                </p>
              </div>
            </div>

            {/* Code example */}
            <div className="mt-8 bg-gray-900 rounded-xl p-4 border border-gray-800">
              <div className="text-xs text-gray-500 mb-2">Verificar assinatura</div>
              <pre className="text-xs text-gray-300 overflow-x-auto">
                <code>{`const signature = req.headers['x-kodano-signature'];
const payload = JSON.stringify(req.body);

const isValid = kodano.webhooks.verify(
  payload,
  signature,
  process.env.WEBHOOK_SECRET
);`}</code>
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}