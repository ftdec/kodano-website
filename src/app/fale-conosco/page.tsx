/**
 * Fale Conosco Page - Kodano Website
 * Stripe-level contact page with advanced form interactions
 */

"use client";

import React, { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { CTASection } from "@/components/sections/cta-v2";
import { AnimatedSection, SectionContainer, SectionHeader } from "@/components/sections/section-wrapper";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  User,
  Building2,
  Mail,
  Phone,
  BarChart3,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react";
import { easings, durations } from "@/lib/design-system/motion";
import { Button } from "@/components/ui/button-v2";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// ============================================================================
// FORM FIELD WRAPPER WITH ANIMATIONS
// ============================================================================

interface FormFieldProps {
  label: string;
  icon: React.ReactNode;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  delay?: number;
}

function FormField({ label, icon, error, required, children, delay = 0 }: FormFieldProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: durations.normal }}
      className="space-y-2"
    >
      <Label className="flex items-center gap-2 text-sm font-medium">
        {icon}
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-xs text-red-500"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ============================================================================
// SUCCESS MESSAGE COMPONENT
// ============================================================================

function SuccessMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10"
      >
        <CheckCircle className="h-10 w-10 text-green-500" />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-2 text-2xl font-bold"
      >
        Mensagem enviada com sucesso!
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-muted-foreground"
      >
        Entraremos em contato em até 24 horas úteis.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6"
      >
        <Button variant="outline" onClick={() => window.location.reload()}>
          Enviar nova mensagem
        </Button>
      </motion.div>
    </motion.div>
  );
}

// ============================================================================
// CONTACT INFO CARDS
// ============================================================================

function ContactInfoCards() {
  const cards = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      value: "contato@kodano.com",
      description: "Resposta em até 24h",
      action: "mailto:contato@kodano.com",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Telefone",
      value: "(11) 4000-1234",
      description: "Seg-Sex, 9h-18h",
      action: "tel:+551140001234",
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      title: "WhatsApp",
      value: "(11) 99999-9999",
      description: "Resposta rápida",
      action: "https://wa.me/5511999999999",
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      title: "Agendar reunião",
      value: "30 min",
      description: "Demonstração ao vivo",
      action: "/demo",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {cards.map((card, index) => (
        <motion.a
          key={index}
          href={card.action}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02, y: -2 }}
          className="group rounded-lg border bg-card p-4 transition-all hover:shadow-md"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
              {card.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{card.title}</h3>
              <p className="text-sm font-bold text-accent">{card.value}</p>
              <p className="text-xs text-muted-foreground">{card.description}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:opacity-100" />
          </div>
        </motion.a>
      ))}
    </div>
  );
}

// ============================================================================
// MAIN FORM COMPONENT
// ============================================================================

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    volume: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const volumeOptions = [
    "Até R$ 10.000/mês",
    "R$ 10.000 - R$ 50.000/mês",
    "R$ 50.000 - R$ 150.000/mês",
    "R$ 150.000 - R$ 500.000/mês",
    "R$ 500.000 - R$ 1M/mês",
    "Acima de R$ 1M/mês",
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) newErrors.name = "Nome é obrigatório";
    if (!formData.company) newErrors.company = "Empresa é obrigatória";
    if (!formData.email) newErrors.email = "Email é obrigatório";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }
    if (!formData.phone) newErrors.phone = "Telefone é obrigatório";
    if (!formData.volume) newErrors.volume = "Selecione o volume mensal";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return <SuccessMessage />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          label="Nome completo"
          icon={<User className="h-4 w-4" />}
          required
          error={errors.name}
          delay={0.1}
        >
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="João Silva"
            className="transition-all focus:ring-2 focus:ring-accent/50"
          />
        </FormField>

        <FormField
          label="Empresa"
          icon={<Building2 className="h-4 w-4" />}
          required
          error={errors.company}
          delay={0.2}
        >
          <Input
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="Empresa XYZ"
            className="transition-all focus:ring-2 focus:ring-accent/50"
          />
        </FormField>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          label="Email corporativo"
          icon={<Mail className="h-4 w-4" />}
          required
          error={errors.email}
          delay={0.3}
        >
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="joao@empresa.com"
            className="transition-all focus:ring-2 focus:ring-accent/50"
          />
        </FormField>

        <FormField
          label="Telefone"
          icon={<Phone className="h-4 w-4" />}
          required
          error={errors.phone}
          delay={0.4}
        >
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="(11) 99999-9999"
            className="transition-all focus:ring-2 focus:ring-accent/50"
          />
        </FormField>
      </div>

      <FormField
        label="Volume mensal de transações"
        icon={<BarChart3 className="h-4 w-4" />}
        required
        error={errors.volume}
        delay={0.5}
      >
        <Select
          value={formData.volume}
          onValueChange={(value) => setFormData({ ...formData, volume: value })}
        >
          <SelectTrigger className="transition-all focus:ring-2 focus:ring-accent/50">
            <SelectValue placeholder="Selecione o volume mensal" />
          </SelectTrigger>
          <SelectContent>
            {volumeOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>

      <FormField
        label="Mensagem"
        icon={<MessageSquare className="h-4 w-4" />}
        delay={0.6}
      >
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={4}
          placeholder="Conte-nos mais sobre suas necessidades..."
          className="w-full rounded-lg border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
        />
      </FormField>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex flex-col gap-4"
      >
        <Button
          type="submit"
          size="lg"
          variant="kodano"
          disabled={isSubmitting}
          loading={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
          <Send className="ml-2 h-5 w-5" />
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          Ao enviar este formulário, você concorda com nossa{" "}
          <a href="/privacidade" className="underline">
            política de privacidade
          </a>
          .
        </p>
      </motion.div>
    </form>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function FaleConoscoPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <AnimatedSection animation="fadeInUp" className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: durations.normal }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1 text-sm font-medium text-accent"
            >
              <Sparkles className="h-4 w-4" />
              Vamos conversar
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: durations.slow }}
              className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              Transforme seus pagamentos{" "}
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                conosco
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: durations.normal }}
              className="mt-6 text-lg text-muted-foreground"
            >
              Nossa equipe de especialistas está pronta para entender suas necessidades
              e criar a solução perfeita para o seu negócio.
            </motion.p>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-col items-center justify-center gap-6 sm:flex-row"
            >
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-green-500" />
                <span className="text-sm">Resposta em até 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-500" />
                <span className="text-sm">100% Seguro</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-500" />
                <span className="text-sm">Setup em 30 min</span>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Contact Form and Info */}
      <SectionContainer spacing="xl">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: durations.slow }}
              className="rounded-xl border bg-card p-8"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold">Preencha seus dados</h2>
                <p className="mt-2 text-muted-foreground">
                  Entraremos em contato para entender melhor suas necessidades.
                </p>
              </div>
              <ContactForm />
            </motion.div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: durations.slow }}
            >
              <h3 className="mb-4 text-lg font-semibold">Outras formas de contato</h3>
              <ContactInfoCards />
            </motion.div>

            {/* Office info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-lg border bg-card p-6"
            >
              <div className="mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-accent" />
                <h3 className="font-semibold">Nosso escritório</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Av. Paulista, 1234 - 10º andar
                <br />
                São Paulo, SP - 01310-100
                <br />
                Brasil
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                Seg-Sex, 9h-18h
              </div>
            </motion.div>
          </div>
        </div>
      </SectionContainer>

      {/* CTA Section */}
      <CTASection
        variant="simple"
        title="Prefere uma demonstração ao vivo?"
        description="Agende uma chamada com nossos especialistas e veja a plataforma em ação"
        primaryCTA={{ label: "Agendar Demonstração", href: "/demo" }}
        secondaryCTA={{ label: "Documentação", href: "/documentacao" }}
        background={true}
      />
    </MainLayout>
  );
}