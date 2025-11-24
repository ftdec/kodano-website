import { calendar_v3 } from "googleapis"
import { createCalendarClient } from "./calendar-client"

/**
 * Check if there are any conflicting events in the specified time range
 */
export async function checkConflictingEvents(
  startUtc: string,
  endUtc: string,
): Promise<calendar_v3.Schema$Event | null> {
  const calendar = createCalendarClient()

  const conflictCheckResponse = await calendar.events.list({
    calendarId: "primary",
    timeMin: startUtc,
    timeMax: endUtc,
    singleEvents: true,
    maxResults: 1,
    orderBy: "startTime",
  })

  if (conflictCheckResponse.data.items && conflictCheckResponse.data.items.length > 0) {
    return conflictCheckResponse.data.items[0]
  }

  return null
}
