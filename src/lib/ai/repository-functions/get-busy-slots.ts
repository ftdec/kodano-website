import { createCalendarClient } from "./calendar-client"

/**
 * Get busy time slots from Google Calendar
 */
export async function getBusySlots(
  startUtc: string,
  endUtc: string,
): Promise<Array<{ start: string; end: string }>> {
  const calendar = createCalendarClient()

  const freeBusyResponse = await calendar.freebusy.query({
    requestBody: {
      timeMin: startUtc,
      timeMax: endUtc,
      items: [{ id: "primary" }],
    },
  })

  const busySlots = (freeBusyResponse.data.calendars?.primary?.busy || []).filter(
    (
      slot: { start?: string | null; end?: string | null },
    ): slot is { start: string; end: string } =>
      typeof slot.start === "string" && typeof slot.end === "string",
  )

  return busySlots
}
