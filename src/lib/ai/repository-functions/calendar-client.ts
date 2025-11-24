import { google } from "googleapis"

/**
 * Create and configure a Google Calendar API client
 */
export function createCalendarClient() {
  if (
    !process.env.GOOGLE_CLIENT_EMAIL ||
    !process.env.GOOGLE_PRIVATE_KEY ||
    !process.env.IMPERSONATED_USER
  ) {
    throw new Error(
      "Missing Google Calendar credentials. Please set GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, and IMPERSONATED_USER environment variables.",
    )
  }

  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/calendar"],
    subject: process.env.IMPERSONATED_USER,
  })

  return google.calendar({ version: "v3", auth })
}
