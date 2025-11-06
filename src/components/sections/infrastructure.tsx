"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Globe, Shield, Zap, Server } from "lucide-react";

// Dynamic import for 3D map
const InfrastructureMap = dynamic(
  () => import("@/components/3d/InfrastructureMap").then(mod => mod.InfrastructureMap),
  { ssr: false }
);

// Infrastructure stats
const stats = [
  {
    icon: Globe,
    value: "8",
    label: "Data Centers",
    description: "Distribuídos globalmente"
  },
  {
    icon: Zap,
    value: "<50ms",
    label: "Latência",
    description: "Entre regiões"
  },
  {
    icon: Shield,
    value: "99.99%",
    label: "Uptime",
    description: "SLA garantido"
  },
  {
    icon: Server,
    value: "10x",
    label: "Auto-scaling",
    description: "Capacidade de pico"
  }
];

export function InfrastructureSection() {
  return (
    <section className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-background via-kodano-cyan/5 to-background">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-kodano-cyan/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-kodano-teal/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-kodano-cyan/10 text-kodano-cyan">
            Infrastructure
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Infraestrutura{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-kodano-cyan to-kodano-teal">
              global e resiliente
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Multi-cloud, multi-região com redundância automática.
            Nossa infraestrutura escala com seu negócio, globalmente.
          </p>
        </motion.div>

        {/* 3D Globe Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="relative rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-8 h-[500px]">
            {/* DISABLED FOR PERFORMANCE - InfrastructureMap */}
            <div className="flex items-center justify-center h-full opacity-20 dark:opacity-10">
              <svg width="600" height="400" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="300" cy="200" r="150" stroke="#00A6B4" strokeWidth="1" fill="none" opacity="0.3" />
                <circle cx="200" cy="150" r="5" fill="#00A6B4" />
                <circle cx="400" cy="150" r="5" fill="#00A6B4" />
                <circle cx="300" cy="100" r="5" fill="#00A6B4" />
                <circle cx="300" cy="300" r="5" fill="#00A6B4" />
                <text x="300" y="380" textAnchor="middle" fill="#00A6B4" fontSize="14" fontWeight="600">
                  Global Infrastructure
                </text>
              </svg>
            </div>

            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 border border-border">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-kodano-cyan" />
                  <span className="text-muted-foreground">Ativo</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  <span className="text-muted-foreground">Planejado</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-kodano-cyan/20 to-kodano-teal/20">
                  <Icon className="w-6 h-6 text-kodano-cyan" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-foreground mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.description}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Features List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <h3 className="text-lg font-bold text-foreground mb-2">
              Multi-Cloud
            </h3>
            <p className="text-sm text-muted-foreground">
              AWS, Google Cloud e Azure com failover automático entre provedores.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-bold text-foreground mb-2">
              Edge Computing
            </h3>
            <p className="text-sm text-muted-foreground">
              CDN global com 200+ pontos de presença para latência mínima.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-bold text-foreground mb-2">
              Disaster Recovery
            </h3>
            <p className="text-sm text-muted-foreground">
              Backup em tempo real com RTO menor que 5 minutos e RPO menor que 1 minuto.
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <button className="px-8 py-3 rounded-full bg-gradient-to-r from-kodano-cyan to-kodano-teal text-white font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105">
            Ver documentação técnica
          </button>
        </motion.div>
      </div>
    </section>
  );
}