/**
 * Shared Resend client instance
 * Uses environment variables from lib/env.ts
 */
import { Resend } from "resend";
import { env } from "./env";

if (!env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not set in environment variables");
}

export const resend = new Resend(env.RESEND_API_KEY);

// Export email configuration helpers
export const getFromEmail = () => {
  const email = env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  const name = env.RESEND_FROM_NAME || "Kodano";
  return `${name} <${email}>`;
};

export const FROM_EMAIL = env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
export const FROM_NAME = env.RESEND_FROM_NAME || "Kodano";
export const TO_EMAIL = process.env.RESEND_TO_EMAIL || "contato@kodano.com.br";

