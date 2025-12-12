/**
 * Type-safe environment variables helper
 * Validates required environment variables at runtime
 */

export const env = {
  RESEND_API_KEY: process.env.RESEND_API_KEY ?? "",
  RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL ?? "",
  RESEND_FROM_NAME: process.env.RESEND_FROM_NAME ?? "Kodano Pagamentos",
} as const;

/**
 * Avoid throwing at module-eval time (breaks `next build` if env is missing locally).
 * Consumers that truly require the key should call `requireResendApiKey()` at runtime.
 */
export function requireResendApiKey(): string {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("❌ Missing RESEND_API_KEY in environment variables");
    throw new Error("RESEND_API_KEY is required");
  }
  return key;
}

if (!env.RESEND_FROM_EMAIL) {
  console.warn("⚠️  Missing RESEND_FROM_EMAIL, will use fallback: onboarding@resend.dev");
}

// Log configuration in development
if (process.env.NODE_ENV === "development") {
  console.log("📧 Resend Configuration:", {
    hasApiKey: !!env.RESEND_API_KEY,
    apiKeyPrefix: env.RESEND_API_KEY ? `${env.RESEND_API_KEY.substring(0, 10)}...` : "missing",
    fromEmail: env.RESEND_FROM_EMAIL || "onboarding@resend.dev (fallback)",
    fromName: env.RESEND_FROM_NAME,
  });
}

