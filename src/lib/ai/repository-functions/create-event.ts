import { calendar_v3 } from "googleapis"
import { v4 as uuidv4 } from "uuid"
import { DateTime } from "luxon"
import { createCalendarClient } from "./calendar-client"

/**
 * Create a new calendar event with Google Meet link
 */
export async function createCalendarEvent(
  title: string,
  description: string,
  startDateTime: string,
  endDateTime: string,
  attendees: string | undefined,
): Promise<calendar_v3.Schema$Event> {
  const calendar = createCalendarClient()

  const startDt = DateTime.fromISO(startDateTime, { zone: "America/Sao_Paulo" })
  const endDt = DateTime.fromISO(endDateTime, { zone: "America/Sao_Paulo" })

  const attendeesList = attendees
    ? attendees.split(",").map((email: string) => ({ email: email.trim() }))
    : []

  const event: calendar_v3.Schema$Event = {
    summary: title,
    description,
    start: {
      dateTime: startDt.toUTC().toISO() ?? undefined,
      timeZone: "America/Sao_Paulo",
    },
    end: {
      dateTime: endDt.toUTC().toISO() ?? undefined,
      timeZone: "America/Sao_Paulo",
    },
    attendees: attendeesList,
    guestsCanModify: false,
    guestsCanInviteOthers: false,
    guestsCanSeeOtherGuests: true,
  }

  // Add Google Meet link
  event.conferenceData = {
    createRequest: {
      requestId: uuidv4(),
      conferenceSolutionKey: { type: "hangoutsMeet" },
    },
  }

  const createdEvent = await calendar.events.insert({
    calendarId: "primary",
    requestBody: event,
    conferenceDataVersion: 1,
    sendUpdates: "all",
  })

  if (!createdEvent.data) {
    throw new Error("Failed to create calendar event")
  }

  return createdEvent.data
}
