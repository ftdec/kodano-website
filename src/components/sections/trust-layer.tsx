"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Award, Shield, Users } from "lucide-react";
import { cn } from "@/lib/utils";

// Trust metrics
const metrics = [
  {
    icon: Users,
    value: "50K+",
    label: "Empresas confiam",
    description: "em nossa plataforma"
  },
  {
    icon: Shield,
    value: "PCI DSS",
    label: "Level 1",
    description: "Certificação máxima"
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "Avaliação",
    description: "2000+ reviews"
  },
  {
    icon: Award,
    value: "#1",
    label: "Gateway B2B",
    description: "América Latina"
  }
];

// Company logos (using placeholder SVGs)
const companies = [
  { name: "Nubank", logo: "N", color: "#8A05BE" },
  { name: "iFood", logo: "iF", color: "#EA1D2C" },
  { name: "Mercado Livre", logo: "ML", color: "#FFE600" },
  { name: "Stone", logo: "S", color: "#00A868" },
  { name: "PagSeguro", logo: "PS", color: "#2FB344" },
  { name: "Rappi", logo: "R", color: "#FF441F" },
  { name: "Uber", logo: "U", color: "#000000" },
  { name: "99", logo: "99", color: "#FFCC00" },
];

// Testimonial data
const testimonials = [
  {
    quote: "A Kodano transformou completamente nossa operação de pagamentos. Reduzimos custos em 40% e aumentamos aprovação em 15%.",
    author: "Carlos Silva",
    role: "CTO",
    company: "TechCorp Brasil",
    rating: 5
  },
  {
    quote: "APIs incríveis, documentação perfeita e suporte excepcional. É o que todo desenvolvedor sonha em uma plataforma de pagamentos.",
    author: "Ana Costa",
    role: "Head of Engineering",
    company: "StartupXYZ",
    rating: 5
  },
  {
    quote: "Migração sem dor, performance impressionante. Processamos 10x mais volume sem nenhum problema de escala.",
    author: "Roberto Lima",
    role: "VP Financeiro",
    company: "E-commerce Plus",
    rating: 5
  }
];

// Company logo component
function CompanyLogo({ company }: { company: typeof companies[0] }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-center justify-center"
    >
      <div
        className="w-24 h-24 rounded-xl flex items-center justify-center font-bold text-2xl text-white/90 shadow-lg"
        style={{ backgroundColor: company.color + "20", color: company.color }}
      >
        {company.logo}
      </div>
    </motion.div>
  );
}

// Testimonial card
function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-card rounded-2xl p-6 border border-border hover:border-kodano-cyan/50 transition-all duration-300 hover:shadow-xl"
    >
      {/* Rating stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-foreground/90 mb-6 italic">
        "{testimonial.quote}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-kodano-cyan to-kodano-teal flex items-center justify-center text-white font-bold">
          {testimonial.author.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <p className="font-semibold text-foreground">{testimonial.author}</p>
          <p className="text-sm text-muted-foreground">
            {testimonial.role} • {testimonial.company}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function TrustLayer() {
  return (
    <section className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-background via-kodano-cyan/5 to-background">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-kodano-cyan/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-kodano-teal/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-kodano-cyan/10 text-kodano-cyan">
            Trust & Security
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Confiança de{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-kodano-cyan to-kodano-teal">
              líderes do mercado
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Empresas de todos os tamanhos confiam na Kodano para processar
            bilhões em transações com segurança e eficiência.
          </p>
        </motion.div>

        {/* Trust metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-kodano-cyan/10 to-kodano-teal/10">
                  <Icon className="w-8 h-8 text-kodano-cyan" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {metric.value}
                </div>
                <div className="text-sm font-medium text-foreground">
                  {metric.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {metric.description}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Company logos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <p className="text-center text-sm text-muted-foreground mb-8 uppercase tracking-wider">
            Empresas que confiam na Kodano
          </p>

          {/* Logo grid with infinite scroll effect */}
          <div className="relative overflow-hidden">
            <div className="flex gap-8 animate-scroll">
              {[...companies, ...companies].map((company, index) => (
                <CompanyLogo key={`${company.name}-${index}`} company={company} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>

        {/* Security badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8"
        >
          {/* PCI DSS Badge */}
          <div className="flex items-center gap-3 px-6 py-3 rounded-full border border-border bg-card/50">
            <Shield className="w-5 h-5 text-green-500" />
            <span className="font-semibold text-foreground">PCI DSS Level 1</span>
          </div>

          {/* ISO Badge */}
          <div className="flex items-center gap-3 px-6 py-3 rounded-full border border-border bg-card/50">
            <Award className="w-5 h-5 text-blue-500" />
            <span className="font-semibold text-foreground">ISO 27001</span>
          </div>

          {/* SOC2 Badge */}
          <div className="flex items-center gap-3 px-6 py-3 rounded-full border border-border bg-card/50">
            <Shield className="w-5 h-5 text-purple-500" />
            <span className="font-semibold text-foreground">SOC 2 Type II</span>
          </div>

          {/* LGPD Badge */}
          <div className="flex items-center gap-3 px-6 py-3 rounded-full border border-border bg-card/50">
            <Shield className="w-5 h-5 text-orange-500" />
            <span className="font-semibold text-foreground">LGPD Compliant</span>
          </div>
        </motion.div>
      </div>

    </section>
  );
}