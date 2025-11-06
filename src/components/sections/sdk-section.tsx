"use client";

import { motion } from "framer-motion";
import { Download, Star, GitBranch, Package } from "lucide-react";
import { cn } from "@/lib/utils";

const sdks = [
  {
    name: "Node.js",
    logo: "🟢",
    version: "v3.2.1",
    downloads: "42K/mês",
    stars: 1243,
    package: "@kodano/node",
    install: "npm install @kodano/node",
    github: "https://github.com/kodano/kodano-node",
    features: ["TypeScript", "Promises", "Webhooks", "Retry logic"]
  },
  {
    name: "Python",
    logo: "🐍",
    version: "v2.8.0",
    downloads: "38K/mês",
    stars: 892,
    package: "kodano",
    install: "pip install kodano",
    github: "https://github.com/kodano/kodano-python",
    features: ["Async/Await", "Type hints", "Django support", "Flask support"]
  },
  {
    name: "PHP",
    logo: "🐘",
    version: "v2.5.3",
    downloads: "31K/mês",
    stars: 654,
    package: "kodano/kodano-php",
    install: "composer require kodano/kodano-php",
    github: "https://github.com/kodano/kodano-php",
    features: ["PSR-4", "Laravel", "Symfony", "WordPress"]
  },
  {
    name: "Ruby",
    logo: "💎",
    version: "v2.1.0",
    downloads: "18K/mês",
    stars: 432,
    package: "kodano",
    install: "gem install kodano",
    github: "https://github.com/kodano/kodano-ruby",
    features: ["Rails integration", "Sinatra", "RSpec tests", "Webhooks"]
  },
  {
    name: "Go",
    logo: "🔵",
    version: "v1.9.2",
    downloads: "15K/mês",
    stars: 387,
    package: "kodano-go",
    install: "go get github.com/kodano/kodano-go",
    github: "https://github.com/kodano/kodano-go",
    features: ["Contexts", "Error handling", "Concurrent safe", "Zero deps"]
  },
  {
    name: "Java",
    logo: "☕",
    version: "v1.7.4",
    downloads: "22K/mês",
    stars: 298,
    package: "com.kodano:kodano-java",
    install: 'implementation "com.kodano:kodano-java:1.7.4"',
    github: "https://github.com/kodano/kodano-java",
    features: ["Spring Boot", "Maven/Gradle", "Reactive", "Android"]
  }
];

export function SDKSection() {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-kodano-cyan/10 text-kodano-cyan">
            Official SDKs
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            SDKs oficiais{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-kodano-cyan to-kodano-teal">
              para sua linguagem
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Bibliotecas mantidas oficialmente, com suporte completo e atualizações regulares.
          </p>
        </motion.div>

        {/* SDK Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sdks.map((sdk, index) => (
            <motion.div
              key={sdk.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-card border border-border rounded-xl p-6 hover:border-kodano-cyan/50 hover:shadow-lg transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{sdk.logo}</span>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{sdk.name}</h3>
                    <p className="text-sm text-muted-foreground">{sdk.version}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  {sdk.stars}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Download className="w-3 h-3" />
                  {sdk.downloads}
                </div>
                <a
                  href={sdk.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-kodano-cyan transition-colors"
                >
                  <GitBranch className="w-3 h-3" />
                  GitHub
                </a>
              </div>

              {/* Install command */}
              <div className="bg-surface-1 rounded-lg p-3 mb-4">
                <code className="text-xs font-mono text-foreground break-all">
                  {sdk.install}
                </code>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-2">
                {sdk.features.map((feature) => (
                  <span
                    key={feature}
                    className="text-xs px-2 py-1 rounded-md bg-kodano-cyan/10 text-kodano-cyan"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Community SDKs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center p-8 bg-gradient-to-r from-kodano-cyan/10 to-kodano-teal/10 rounded-2xl border border-kodano-cyan/20"
        >
          <Package className="w-12 h-12 text-kodano-cyan mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-2">
            SDKs da Comunidade
          </h3>
          <p className="text-muted-foreground mb-4">
            Além dos SDKs oficiais, nossa comunidade mantém bibliotecas para Rust, Swift, Kotlin, C# e mais.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-kodano-cyan hover:text-kodano-teal font-medium transition-colors"
          >
            Ver todos os SDKs →
          </a>
        </motion.div>
      </div>
    </section>
  );
}