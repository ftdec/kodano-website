/**
 * Test Email Page
 * Simple form to test Resend email sending
 * Access at: /test-email
 */
"use client";

import { useState } from "react";

export default function TestEmailPage() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("Teste Resend Kodano");
  const [message, setMessage] = useState("<p>Olá! Este é um teste da Resend ✅</p>");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ type: "success" | "error"; message: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to,
          subject,
          html: message,
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.ok) {
        setResult({
          type: "error",
          message: `Erro: ${json.error ?? "Falha ao enviar email"}${
            json.details ? `\n\nDetalhes: ${json.details}` : ""
          }`,
        });
      } else {
        setResult({
          type: "success",
          message: `Email enviado com sucesso ✅\n\nID: ${json.data?.id ?? "N/A"}`,
        });
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setResult({
        type: "error",
        message: `Erro inesperado: ${errorMessage}`,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-2">Testar envio de email (Resend)</h1>
          <p className="text-sm text-muted-foreground">
            Preencha os campos abaixo para testar o envio de emails via Resend
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="space-y-2">
            <label htmlFor="to" className="text-sm font-medium">
              Destinatário (to) *
            </label>
            <input
              id="to"
              type="email"
              required
              placeholder="seu@email.com"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full border border-input bg-background rounded-md px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium">
              Assunto *
            </label>
            <input
              id="subject"
              type="text"
              required
              placeholder="Assunto do email"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border border-input bg-background rounded-md px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Mensagem HTML *
            </label>
            <textarea
              id="message"
              rows={8}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-input bg-background rounded-md px-3 py-2 text-sm font-mono ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
              placeholder="<p>Conteúdo HTML aqui</p>"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground rounded-md px-4 py-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            {loading ? "Enviando..." : "Enviar email de teste"}
          </button>
        </form>

        {result && (
          <div
            className={`p-4 rounded-md border ${
              result.type === "success"
                ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200"
                : "bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200"
            }`}
          >
            <p className="text-sm whitespace-pre-wrap font-mono">{result.message}</p>
          </div>
        )}

        <div className="text-xs text-muted-foreground text-center space-y-1">
          <p>💡 Dica: Verifique a pasta de spam se não receber o email</p>
          <p>
            📧 API Route: <code className="bg-muted px-1 rounded">/api/email/send</code>
          </p>
        </div>
      </div>
    </main>
  );
}

