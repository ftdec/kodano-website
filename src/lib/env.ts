/**
 * Type-safe environment variables helper
 * Validates required environment variables at runtime
 */

export const env = {
  RESEND_API_KEY: process.env.RESEND_API_KEY ?? "",
  RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL ?? "",
  RESEND_FROM_NAME: process.env.RESEND_FROM_NAME ?? "Kodano Pagamentos",
} as const;

// Validate required environment variables
if (!env.RESEND_API_KEY) {
  // eslint-disable-next-line no-console
  console.error("❌ Missing RESEND_API_KEY in environment variables");
  if (process.env.NODE_ENV !== "development") {
    throw new Error("RESEND_API_KEY is required");
  }
}

if (!env.RESEND_FROM_EMAIL) {
  // eslint-disable-next-line no-console
  console.warn("⚠️  Missing RESEND_FROM_EMAIL, will use fallback: onboarding@resend.dev");
}

// Log configuration in development
if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line no-console
  console.log("📧 Resend Configuration:", {
    hasApiKey: !!env.RESEND_API_KEY,
    apiKeyPrefix: env.RESEND_API_KEY ? `${env.RESEND_API_KEY.substring(0, 10)}...` : "missing",
    fromEmail: env.RESEND_FROM_EMAIL || "onboarding@resend.dev (fallback)",
    fromName: env.RESEND_FROM_NAME,
  });
}

