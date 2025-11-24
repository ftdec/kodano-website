import { ToolLoopAgent, tool } from "ai"
import { createXai } from "@ai-sdk/xai"
import { z } from "zod"
import * as pure from "@/lib/ai/pure-functions"
import * as repository from "@/lib/ai/repository-functions"
import {
  BookMeetingInputSchema,
  BookMeetingOutput,
  CheckAvailabilityInputSchema,
  CheckAvailabilityOutput,
  GetWeekdayDateInputSchema,
  GetWeekdayDateOutput,
  NextAvailabilityOutput,
} from "@/lib/ai/schemas"
import { DateTime } from "luxon"

const DEFAULT_ATTENDEES = ["contato@kodano.com.br"]

// Tool implementations
export async function bookMeeting(params: unknown): Promise<BookMeetingOutput> {
  try {
    // Check if calendar is configured
    if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.IMPERSONATED_USER) {
      return {
        success: false,
        message: "Desculpe, o agendamento de reuniões não está disponível no momento. Por favor, entre em contato diretamente pelo email contato@kodano.com.br para agendar uma reunião.",
        error: "Google Calendar não configurado",
      }
    }

    const validatedParams = BookMeetingInputSchema.parse(params)

    // Parse dates with timezone
    const startDt = DateTime.fromISO(validatedParams.startDateTime, {
      zone: "America/Sao_Paulo",
    })
    const endDt = DateTime.fromISO(validatedParams.endDateTime, { zone: "America/Sao_Paulo" })

    if (!startDt.isValid || !endDt.isValid) {
      throw new Error(
        `Invalid date format: ${startDt.invalidReason || endDt.invalidReason}`,
      )
    }

    // Validate time range
    pure.validateTimeRange(startDt, endDt)

    // Check business hours
    if (!pure.isTimeRangeWithinBusinessHours(startDt, endDt)) {
      throw new Error(
        "Requested time is outside business hours (Monday-Friday, 9 AM - 6 PM)",
      )
    }

    // Convert to UTC for API
    const startUtc = startDt.toUTC().toISO()
    const endUtc = endDt.toUTC().toISO()

    if (!startUtc || !endUtc) {
      throw new Error("Failed to convert dates to UTC")
    }

    // Check for conflicts
    const conflictingEvent = await repository.checkConflictingEvents(startUtc, endUtc)
    if (conflictingEvent) {
      throw new Error("Time slot is already booked")
    }

    // Merge attendees
    const defaultAttendeesLower = DEFAULT_ATTENDEES.map((email) => email.toLowerCase())
    const userAttendees = validatedParams.attendees
      ? validatedParams.attendees.split(",").map((email) => email.trim())
      : []
    const allAttendees = [
      ...DEFAULT_ATTENDEES,
      ...userAttendees.filter((email) => !defaultAttendeesLower.includes(email.toLowerCase())),
    ]
    const attendeesString = allAttendees.join(", ")

    // Create event
    const createdEvent = await repository.createCalendarEvent(
      validatedParams.title,
      validatedParams.description,
      validatedParams.startDateTime,
      validatedParams.endDateTime,
      attendeesString,
    )

    const message = pure.formatMeetingConfirmation(
      validatedParams.startDateTime,
      attendeesString,
    )

    return {
      success: true,
      message,
      eventId: createdEvent.id || undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: "Failed to book meeting",
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

export async function checkAvailability(params: unknown): Promise<CheckAvailabilityOutput> {
  try {
    // Check if calendar is configured
    if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.IMPERSONATED_USER) {
      return {
        message: "Desculpe, a verificação de disponibilidade não está disponível no momento. Por favor, entre em contato diretamente para agendar.",
        days: [],
        availability: { start: "", end: "" },
        error: "Google Calendar não configurado",
      }
    }

    const validatedParams = CheckAvailabilityInputSchema.parse(params)

    const startDt = DateTime.fromISO(validatedParams.startDateTime, {
      zone: "America/Sao_Paulo",
    })
    const endDt = DateTime.fromISO(validatedParams.endDateTime, { zone: "America/Sao_Paulo" })

    if (!startDt.isValid || !endDt.isValid) {
      throw new Error("Invalid date format")
    }

    pure.validateTimeRange(startDt, endDt)

    if (!pure.isTimeRangeWithinBusinessHours(startDt, endDt)) {
      throw new Error("Time range is outside business hours")
    }

    const startUtc = startDt.toUTC().toISO()
    const endUtc = endDt.toUTC().toISO()

    if (!startUtc || !endUtc) {
      throw new Error("Failed to convert dates to UTC")
    }

    const busySlots = await repository.getBusySlots(startUtc, endUtc)

    const result = pure.formatAvailableWindows(
      validatedParams.startDateTime,
      validatedParams.endDateTime,
      busySlots,
    )

    return result
  } catch (error) {
    return {
      message: "Failed to check availability",
      days: [],
      availability: {
        start: "",
        end: "",
      },
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

export function getWeekdayDate(params: unknown): GetWeekdayDateOutput {
  try {
    const validatedParams = GetWeekdayDateInputSchema.parse(params)

    if (!pure.WEEKDAY_MAP[validatedParams.weekday.toLowerCase()]) {
      throw new Error("Invalid weekday")
    }

    const { date, formatted } = pure.calculateNextWeekdayDate(
      validatedParams.weekday,
      validatedParams.sequence,
    )

    const dateIso = date.toISO()
    if (!dateIso) {
      throw new Error("Failed to convert date to ISO")
    }

    return {
      weekday: validatedParams.weekday,
      sequence: validatedParams.sequence,
      date: dateIso,
      formatted,
    }
  } catch (error) {
    return {
      weekday: "",
      sequence: 1,
      date: "",
      formatted: "",
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

export async function getNextAvailability(): Promise<NextAvailabilityOutput> {
  try {
    // Check if calendar is configured
    if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.IMPERSONATED_USER) {
      return {
        message: "Desculpe, a verificação de disponibilidade não está disponível no momento. Por favor, entre em contato diretamente pelo email contato@kodano.com.br.",
        availability: { start: "", end: "" },
        error: "Google Calendar não configurado",
      }
    }

    let tomorrow = DateTime.now()
      .setZone("America/Sao_Paulo")
      .plus({ days: 1 })
      .set({ hour: 9, minute: 0, second: 0, millisecond: 0 })

    while (tomorrow.weekday === 6 || tomorrow.weekday === 7) {
      tomorrow = tomorrow.plus({ days: 1 })
    }
    tomorrow = tomorrow.set({ hour: 9, minute: 0, second: 0, millisecond: 0 })

    const endDate = tomorrow
      .plus({ days: 7 })
      .set({ hour: 18, minute: 0, second: 0, millisecond: 0 })

    const startUtc = tomorrow.toUTC().toISO() || ""
    const endUtc = endDate.toUTC().toISO() || ""

    if (!startUtc || !endUtc) {
      throw new Error("Failed to convert dates to UTC")
    }

    const busySlots = await repository.getBusySlots(startUtc, endUtc)
    const availableWindow = pure.findNextAvailableWindow(busySlots)

    if (!availableWindow) {
      throw new Error("No available windows found")
    }

    return availableWindow
  } catch (error) {
    return {
      message: "Failed to find next availability",
      availability: {
        start: "",
        end: "",
      },
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

// Create the AI agent
export function createCalendarAgent() {
  const xaiApiKey = process.env.XAI_API_KEY
  if (!xaiApiKey) {
    throw new Error("XAI_API_KEY environment variable is required")
  }

  const xai = createXai({
    apiKey: xaiApiKey,
  })

  const agent = new ToolLoopAgent({
    model: xai("grok-4-1-fast-non-reasoning"),
    instructions: pure.getAgentSystemPrompt(),
    tools: {
      checkAvailability: tool({
        description: "Check available time windows within a date range",
        inputSchema: CheckAvailabilityInputSchema,
        execute: async (params) => {
          return await checkAvailability(params)
        },
      }),
      bookMeeting: tool({
        description: "Book a meeting in Google Calendar",
        inputSchema: BookMeetingInputSchema,
        execute: async (params) => {
          return await bookMeeting(params)
        },
      }),
      getWeekdayDate: tool({
        description: "Get the date for a specific weekday",
        inputSchema: GetWeekdayDateInputSchema,
        execute: async (params) => {
          return getWeekdayDate(params)
        },
      }),
      getNextAvailability: tool({
        description: "Find the next available window",
        inputSchema: z.object({}),
        execute: async () => {
          return await getNextAvailability()
        },
      }),
    },
  })

  return agent
}
