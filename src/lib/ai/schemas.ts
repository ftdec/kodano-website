import { z } from "zod"

// Book Meeting Schemas
export const BookMeetingInputSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  startDateTime: z.string(),
  endDateTime: z.string(),
  attendees: z.string().optional(),
})

export type BookMeetingInput = z.infer<typeof BookMeetingInputSchema>

export const BookMeetingOutputSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  eventId: z.string().optional(),
  error: z.string().optional(),
})

export type BookMeetingOutput = z.infer<typeof BookMeetingOutputSchema>

// Check Availability Schemas
export const CheckAvailabilityInputSchema = z.object({
  startDateTime: z.string(),
  endDateTime: z.string(),
})

export type CheckAvailabilityInput = z.infer<typeof CheckAvailabilityInputSchema>

export const AvailableWindowSchema = z.object({
  start: z.string(),
  end: z.string(),
  duration: z.number(),
  durationFormatted: z.string(),
  formattedTime: z.string(),
  dayKey: z.string(),
})

export type AvailableWindow = z.infer<typeof AvailableWindowSchema>

export const DayWindowsSchema = z.object({
  date: z.string(),
  dayName: z.string(),
  windows: z.array(z.string()),
})

export type DayWindows = z.infer<typeof DayWindowsSchema>

export const CheckAvailabilityOutputSchema = z.object({
  message: z.string(),
  days: z.array(DayWindowsSchema),
  availability: z.object({
    start: z.string(),
    end: z.string(),
  }),
  error: z.string().optional(),
})

export type CheckAvailabilityOutput = z.infer<typeof CheckAvailabilityOutputSchema>

// Get Weekday Date Schemas
export const GetWeekdayDateInputSchema = z.object({
  weekday: z.string(),
  sequence: z.number().int().positive().default(1),
})

export type GetWeekdayDateInput = z.infer<typeof GetWeekdayDateInputSchema>

export const GetWeekdayDateOutputSchema = z.object({
  weekday: z.string(),
  sequence: z.number(),
  date: z.string(),
  formatted: z.string(),
  error: z.string().optional(),
})

export type GetWeekdayDateOutput = z.infer<typeof GetWeekdayDateOutputSchema>

// Next Availability Schemas
export const NextAvailabilityOutputSchema = z.object({
  message: z.string(),
  availability: z.object({
    start: z.string(),
    end: z.string(),
  }),
  error: z.string().optional(),
})

export type NextAvailabilityOutput = z.infer<typeof NextAvailabilityOutputSchema>
