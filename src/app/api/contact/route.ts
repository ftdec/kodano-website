import { NextRequest, NextResponse } from "next/server";
import { resend, FROM_EMAIL, TO_EMAIL } from "@/lib/resend";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, message, volume, phone, website, acquirers, subject } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nome, email e mensagem são obrigatórios" },
        { status: 400 }
      );
    }

    // Log for debugging
    console.log("Sending email:", {
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      hasApiKey: !!process.env.RESEND_API_KEY,
      apiKeyPrefix: process.env.RESEND_API_KEY?.substring(0, 10) + "...",
    });

    // Validate email addresses
    if (!FROM_EMAIL || !TO_EMAIL) {
      console.error("Missing email configuration:", { FROM_EMAIL, TO_EMAIL });
      return NextResponse.json(
        { error: "Configuração de email não encontrada. Verifique as variáveis de ambiente." },
        { status: 500 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: subject || `Nova mensagem de contato de ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #002A35 0%, #004A5A 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #002A35; }
              .value { margin-top: 5px; color: #555; }
              .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #888; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Nova Mensagem de Contato - Kodano</h1>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Nome:</div>
                  <div class="value">${name}</div>
                </div>
                
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>
                
                ${company ? `
                <div class="field">
                  <div class="label">Empresa:</div>
                  <div class="value">${company}</div>
                </div>
                ` : ''}
                
                ${phone ? `
                <div class="field">
                  <div class="label">Telefone:</div>
                  <div class="value">${phone}</div>
                </div>
                ` : ''}
                
                ${website ? `
                <div class="field">
                  <div class="label">Site:</div>
                  <div class="value"><a href="${website}" target="_blank">${website}</a></div>
                </div>
                ` : ''}
                
                ${volume ? `
                <div class="field">
                  <div class="label">Volume Mensal:</div>
                  <div class="value">${volume}</div>
                </div>
                ` : ''}
                
                ${acquirers ? `
                <div class="field">
                  <div class="label">Solução de Pagamentos Atual:</div>
                  <div class="value">${acquirers}</div>
                </div>
                ` : ''}
                
                <div class="field">
                  <div class="label">Mensagem:</div>
                  <div class="value" style="white-space: pre-wrap;">${message}</div>
                </div>
                
                <div class="footer">
                  <p>Esta mensagem foi enviada através do formulário de contato do site Kodano.</p>
                  <p>Data: ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
Nova Mensagem de Contato - Kodano

Nome: ${name}
Email: ${email}
${company ? `Empresa: ${company}` : ''}
${phone ? `Telefone: ${phone}` : ''}
${website ? `Site: ${website}` : ''}
${volume ? `Volume Mensal: ${volume}` : ''}
${acquirers ? `Solução de Pagamentos Atual: ${acquirers}` : ''}

Mensagem:
${message}

---
Esta mensagem foi enviada através do formulário de contato do site Kodano.
Data: ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}
      `.trim(),
    });

    if (error) {
      console.error("Resend error:", error);
      // Return more detailed error message for debugging
      return NextResponse.json(
        { 
          error: "Erro ao enviar email. Tente novamente mais tarde.",
          details: error.message || JSON.stringify(error)
        },
        { status: 500 }
      );
    }

    console.log("Email sent successfully:", data);

    return NextResponse.json(
      { success: true, message: "Mensagem enviada com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { 
        error: "Erro interno do servidor. Tente novamente mais tarde.",
        details: errorMessage
      },
      { status: 500 }
    );
  }
}

