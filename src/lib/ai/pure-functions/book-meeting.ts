import { DateTime } from "luxon"

/**
 * Validate that start time is before end time
 */
export function validateTimeRange(start: DateTime, end: DateTime): void {
  if (start >= end) {
    throw new Error("Start time must be before end time")
  }
}

/**
 * Format a meeting confirmation message
 */
export function formatMeetingConfirmation(startDateTime: string, attendees: string): string {
  const startDt = DateTime.fromISO(startDateTime, { zone: "America/Sao_Paulo" })
  const formatted = startDt.toFormat("EEEE, MMMM d 'at' h:mm a")

  return `Meeting successfully scheduled for ${formatted} (São Paulo Time).\n\nAttendees: ${attendees}\n\nYou will receive a calendar invitation with all the details including a Google Meet link.`
}
