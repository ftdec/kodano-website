"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Send, CheckCircle, MessageCircle, Calendar, Building, Mail, Phone, User, Briefcase, DollarSign, BarChart } from "lucide-react";

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    nome: "",
    empresa: "",
    cargo: "",
    ticketMedio: "",
    volumeMensal: "",
    segmento: "",
    email: "",
    telefone: "",
    mensagem: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.nome,
          email: formData.email,
          phone: formData.telefone,
          message: `
Empresa: ${formData.empresa}
Cargo: ${formData.cargo}
Ticket Médio: ${formData.ticketMedio}
Volume Mensal: ${formData.volumeMensal}
Segmento: ${formData.segmento}

Mensagem: ${formData.mensagem || "N/A"}
          `.trim(),
          subject: `[Lead Qualificado] ${formData.empresa} - ${formData.segmento}`,
        }),
      });

      if (!response.ok) throw new Error("Erro ao enviar");

      setIsSuccess(true);
      setFormData({
        nome: "",
        empresa: "",
        cargo: "",
        ticketMedio: "",
        volumeMensal: "",
        segmento: "",
        email: "",
        telefone: "",
        mensagem: "",
      });
    } catch {
      setError("Erro ao enviar mensagem. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const segmentos = [
    "Automotivo",
    "Turismo",
    "Imobiliário",
    "Serviços Profissionais",
    "E-commerce",
    "Varejo",
    "Outro",
  ];

  const ticketOptions = [
    "Até R$ 5.000",
    "R$ 5.000 - R$ 20.000",
    "R$ 20.000 - R$ 50.000",
    "R$ 50.000 - R$ 100.000",
    "Acima de R$ 100.000",
  ];

  const volumeOptions = [
    "Até 50 transações",
    "50 - 200 transações",
    "200 - 500 transações",
    "500 - 1.000 transações",
    "Acima de 1.000 transações",
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass glass-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">K</span>
              </div>
              <span className="text-xl font-semibold">Kodano</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero */}
        <section className="py-16 lg:py-24 relative">
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] gradient-radial" />
          
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-2xl">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Contato
              </span>
              <h1 className="text-4xl md:text-5xl font-semibold mt-4 mb-6 leading-tight">
                Vamos conversar
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Preencha o formulário para agendar uma demonstração ou esclarecer dúvidas sobre a solução.
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
              {/* Form */}
              <div className="lg:col-span-3">
                {isSuccess ? (
                  <div className="p-12 rounded-2xl bg-card border border-white/5 text-center">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold mb-4">Mensagem enviada!</h2>
                    <p className="text-muted-foreground mb-8">
                      Recebemos sua solicitação e entraremos em contato em breve.
                    </p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 rounded-xl hover:bg-white/5 transition-all"
                    >
                      Enviar nova mensagem
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="p-8 lg:p-10 rounded-2xl bg-card border border-white/5">
                    <h2 className="text-2xl font-semibold mb-2">Agendar Demonstração</h2>
                    <p className="text-muted-foreground mb-8">Preencha os dados para qualificarmos sua solicitação.</p>

                    {error && (
                      <div className="p-4 mb-6 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                        {error}
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Nome */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium mb-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          Nome
                        </label>
                        <input
                          type="text"
                          name="nome"
                          value={formData.nome}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                          placeholder="Seu nome"
                        />
                      </div>

                      {/* Empresa */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium mb-2">
                          <Building className="w-4 h-4 text-muted-foreground" />
                          Empresa
                        </label>
                        <input
                          type="text"
                          name="empresa"
                          value={formData.empresa}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                          placeholder="Nome da empresa"
                        />
                      </div>

                      {/* Cargo */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium mb-2">
                          <Briefcase className="w-4 h-4 text-muted-foreground" />
                          Cargo
                        </label>
                        <input
                          type="text"
                          name="cargo"
                          value={formData.cargo}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                          placeholder="Seu cargo"
                        />
                      </div>

                      {/* Segmento */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium mb-2">
                          <BarChart className="w-4 h-4 text-muted-foreground" />
                          Segmento
                        </label>
                        <select
                          name="segmento"
                          value={formData.segmento}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        >
                          <option value="">Selecione...</option>
                          {segmentos.map((seg) => (
                            <option key={seg} value={seg}>{seg}</option>
                          ))}
                        </select>
                      </div>

                      {/* Ticket Médio */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium mb-2">
                          <DollarSign className="w-4 h-4 text-muted-foreground" />
                          Ticket Médio
                        </label>
                        <select
                          name="ticketMedio"
                          value={formData.ticketMedio}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        >
                          <option value="">Selecione...</option>
                          {ticketOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>

                      {/* Volume Mensal */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium mb-2">
                          <BarChart className="w-4 h-4 text-muted-foreground" />
                          Volume Mensal Estimado
                        </label>
                        <select
                          name="volumeMensal"
                          value={formData.volumeMensal}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        >
                          <option value="">Selecione...</option>
                          {volumeOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium mb-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                          placeholder="seu@email.com"
                        />
                      </div>

                      {/* Telefone */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium mb-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          Telefone
                        </label>
                        <input
                          type="tel"
                          name="telefone"
                          value={formData.telefone}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                    </div>

                    {/* Mensagem */}
                    <div className="mt-6">
                      <label className="flex items-center gap-2 text-sm font-medium mb-2">
                        <MessageCircle className="w-4 h-4 text-muted-foreground" />
                        Mensagem (opcional)
                      </label>
                      <textarea
                        name="mensagem"
                        value={formData.mensagem}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                        placeholder="Conte-nos mais sobre sua operação..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-8 inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        "Enviando..."
                      ) : (
                        <>
                          Enviar Solicitação
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-2 space-y-8">
                {/* Calendly */}
                <div className="p-8 rounded-2xl bg-card border border-white/5">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="w-6 h-6 text-primary" />
                    <h3 className="text-lg font-semibold">Agende diretamente</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Prefere agendar você mesmo? Use nosso calendário online.
                  </p>
                  <a
                    href="https://calendly.com/kodano"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 rounded-xl hover:bg-white/5 transition-all w-full justify-center"
                  >
                    Abrir Calendário
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                {/* WhatsApp */}
                <div className="p-8 rounded-2xl bg-card border border-white/5">
                  <div className="flex items-center gap-3 mb-4">
                    <MessageCircle className="w-6 h-6 text-primary" />
                    <h3 className="text-lg font-semibold">WhatsApp</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Resposta rápida via WhatsApp Business.
                  </p>
                  <a
                    href="https://wa.me/5511999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-xl hover:bg-[#20BD5A] transition-all w-full justify-center font-medium"
                  >
                    Iniciar Conversa
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                {/* Contact Info */}
                <div className="p-8 rounded-2xl bg-card border border-white/5">
                  <h3 className="text-lg font-semibold mb-6">Outras formas de contato</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <span>contato@kodano.com.br</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-primary" />
                      <span>+55 11 9999-9999</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Building className="w-5 h-5 text-primary" />
                      <span>São Paulo, SP</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Kodano
          </p>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Voltar ao início
          </Link>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/5511999999999"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </a>
    </div>
  );
}

