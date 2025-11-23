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
import { resend, getFromEmail } from "@/lib/resend";
import { env } from "@/lib/env";

export async function POST(req: Request) {
  try {
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
      return NextResponse.json(
        {
          ok: false,
          error: error.message || String(error),
          details: process.env.NODE_ENV === "development" ? error : undefined,
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

