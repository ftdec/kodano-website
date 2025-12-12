/**
 * Email sending API route
 * POST /api/email/send
 * 
 * Body:
 * - to: string | string[] (required)
 * - subject: string (required)
 * - html?: string (required if text is not provided)
 * - text?: string (required if html is not provided)
 * - name?: string (optional sender name override)
 */
import { NextResponse } from "next/server";
import { getResendClient } from "@/lib/resend";
import { env } from "@/lib/env";

export async function POST(req: Request) {
  try {
    const resend = getResendClient();
    // Parse JSON body
    const body = await req.json().catch(() => null);

    if (!body) {
      console.error("[Resend API] Invalid JSON body");
      return NextResponse.json(
        { ok: false, error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    // Extract and validate required fields
    const { to, subject, html, text, name } = body as {
      to?: string | string[];
      subject?: string;
      html?: string;
      text?: string;
      name?: string;
    };

    // Validation
    if (!to) {
      return NextResponse.json(
        { ok: false, error: "Missing required field: to" },
        { status: 400 }
      );
    }

    if (!subject) {
      return NextResponse.json(
        { ok: false, error: "Missing required field: subject" },
        { status: 400 }
      );
    }

    if (!html && !text) {
      return NextResponse.json(
        {
          ok: false,
          error: "Missing required field: either 'html' or 'text' must be provided",
        },
        { status: 400 }
      );
    }

    // Prepare from email
    const fromEmail = env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const fromName = name || env.RESEND_FROM_NAME || "Kodano";
    const from = `${fromName} <${fromEmail}>`;

    // Log email attempt
    console.log("[Resend API] Sending email:", {
      from,
      to: Array.isArray(to) ? to.join(", ") : to,
      subject,
      hasHtml: !!html,
      hasText: !!text,
    });

    // Send email via Resend
    // Build payload ensuring at least html or text is present (already validated above)
    const emailPayload = {
      from,
      to: Array.isArray(to) ? to : to,
      subject,
      ...(html && { html }),
      ...(text && { text }),
    };

    const { data, error } = await resend.emails.send(emailPayload as Parameters<typeof resend.emails.send>[0]);

    // Handle Resend errors
    if (error) {
      console.error("[Resend API] Resend error:", {
        error,
        message: error.message,
        name: error.name,
      });
      
      // Check if error is due to unverified domain
      const errorMessage = error.message || String(error);
      const isDomainNotVerified = errorMessage.toLowerCase().includes('domain is not verified') || 
                                   errorMessage.toLowerCase().includes('domain not verified') ||
                                   errorMessage.toLowerCase().includes('not verified');
      
      if (isDomainNotVerified && fromEmail !== "onboarding@resend.dev") {
        console.warn("[Resend API] Domain not verified, attempting fallback to onboarding@resend.dev");
        
        // Try again with Resend test domain
        try {
          const fallbackPayload = {
            from: "onboarding@resend.dev",
            to: Array.isArray(to) ? to : to,
            subject: `[TEST DOMAIN] ${subject}`,
            ...(html && { html: `<p><strong>⚠️ Aviso:</strong> O domínio não está verificado. Este email foi enviado usando o domínio de teste do Resend.</p>${html}` }),
            ...(text && { text: `⚠️ AVISO: O domínio não está verificado. Este email foi enviado usando o domínio de teste do Resend.\n\n${text}` }),
          };
          
          const fallbackResult = await resend.emails.send(fallbackPayload as Parameters<typeof resend.emails.send>[0]);
          
          if (fallbackResult.error) {
            throw fallbackResult.error;
          }
          
          console.log("[Resend API] Email sent successfully using fallback domain:", fallbackResult.data);
          return NextResponse.json(
            {
              ok: true,
              data: {
                id: fallbackResult.data?.id,
                message: "Email sent successfully (using test domain - please verify notifications.kodano.com.br at https://resend.com/domains)",
              },
              warning: "O domínio notifications.kodano.com.br não está verificado. Verifique em https://resend.com/domains",
            },
            { status: 200 }
          );
        } catch (fallbackError) {
          console.error("[Resend API] Fallback email also failed:", fallbackError);
        }
      }
      
      return NextResponse.json(
        {
          ok: false,
          error: errorMessage,
          details: process.env.NODE_ENV === "development" ? error : undefined,
          help: isDomainNotVerified ? "Verifique o domínio em https://resend.com/domains" : undefined,
        },
        { status: 400 }
      );
    }

    // Success
    console.log("[Resend API] Email sent successfully:", {
      id: data?.id,
      to: Array.isArray(to) ? to.join(", ") : to,
    });

    return NextResponse.json(
      {
        ok: true,
        data: {
          id: data?.id,
          message: "Email sent successfully",
        },
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    // Catch any unexpected errors
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error("[Resend API] Unexpected error:", {
      error: errorMessage,
      stack: err instanceof Error ? err.stack : undefined,
    });

    return NextResponse.json(
      {
        ok: false,
        error: "Internal server error",
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined,
      },
      { status: 500 }
    );
  }
}

// Reject non-POST methods
export async function GET() {
  return NextResponse.json(
    { ok: false, error: "Method not allowed. Use POST." },
    { status: 405 }
  );
}

