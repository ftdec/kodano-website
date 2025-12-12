/**
 * Shared Resend client instance
 * Uses environment variables from lib/env.ts
 */
import { Resend } from "resend";
import { env, requireResendApiKey } from "./env";

let resendClient: Resend | null = null;

export function getResendClient(): Resend {
  if (resendClient) return resendClient;
  resendClient = new Resend(requireResendApiKey());
  return resendClient;
}

// Export email configuration helpers
export const getFromEmail = () => {
  const email = env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  const name = env.RESEND_FROM_NAME || "Kodano";
  return `${name} <${email}>`;
};

export const FROM_EMAIL = env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
export const FROM_NAME = env.RESEND_FROM_NAME || "Kodano";
export const TO_EMAIL = process.env.RESEND_TO_EMAIL || "contato@kodano.com.br";

// Get all email recipients - includes Kodano emails and backup Gmail
export const getAllRecipients = (): string[] => {
  const recipients: string[] = [];
  
  // Primary Kodano emails
  if (TO_EMAIL) {
    const emails = TO_EMAIL.split(',').map(e => e.trim()).filter(Boolean);
    recipients.push(...emails);
  }
  
  // Additional Kodano emails
  if (process.env.RESEND_ADDITIONAL_EMAILS) {
    const additional = process.env.RESEND_ADDITIONAL_EMAILS.split(',')
      .map(e => e.trim())
      .filter(Boolean);
    recipients.push(...additional);
  }
  
  // Backup Gmail (always included to ensure delivery)
  const backupEmail = process.env.RESEND_BACKUP_EMAIL || "felipe.caltabiano.castro@gmail.com";
  if (backupEmail && !recipients.includes(backupEmail)) {
    recipients.push(backupEmail);
  }
  
  return recipients;
};

