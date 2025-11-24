import { DateTime } from "luxon"
import type { CheckAvailabilityOutput, DayWindows } from "@/lib/ai/schemas"
import { isWithinBusinessHours } from "./business-hours"

/**
 * Format available time windows from busy slots
 */
export function formatAvailableWindows(
  startDateTime: string,
  endDateTime: string,
  busySlots: Array<{ start: string; end: string }>,
): CheckAvailabilityOutput {
  const startDt = DateTime.fromISO(startDateTime, { zone: "America/Sao_Paulo" })
  const endDt = DateTime.fromISO(endDateTime, { zone: "America/Sao_Paulo" })

  // Group windows by day
  const dayMap = new Map<string, DayWindows>()

  // Iterate through each day in the range
  let currentDay = startDt.startOf("day")
  const endDay = endDt.startOf("day")

  while (currentDay <= endDay) {
    // Skip weekends
    if (currentDay.weekday === 6 || currentDay.weekday === 7) {
      currentDay = currentDay.plus({ days: 1 })
      continue
    }

    const dayKey = currentDay.toFormat("yyyy-MM-dd")
    const dayName = currentDay.toFormat("EEEE, MMMM d")

    // Define business hours for this day
    const dayStart = currentDay.set({ hour: 9, minute: 0, second: 0, millisecond: 0 })
    const dayEnd = currentDay.set({ hour: 18, minute: 0, second: 0, millisecond: 0 })

    // Adjust for first and last day
    const effectiveStart = currentDay.hasSame(startDt, "day") ? DateTime.max(startDt, dayStart) : dayStart
    const effectiveEnd = currentDay.hasSame(endDt, "day") ? DateTime.min(endDt, dayEnd) : dayEnd

    // Find busy slots for this day
    const dayBusySlots = busySlots
      .map((slot) => ({
        start: DateTime.fromISO(slot.start, { zone: "UTC" }).setZone("America/Sao_Paulo"),
        end: DateTime.fromISO(slot.end, { zone: "UTC" }).setZone("America/Sao_Paulo"),
      }))
      .filter((slot) => {
        // Check if slot overlaps with this day
        return slot.start < effectiveEnd && slot.end > effectiveStart
      })
      .sort((a, b) => a.start.toMillis() - b.start.toMillis())

    // Find free windows
    const windows: string[] = []
    let windowStart = effectiveStart

    for (const busySlot of dayBusySlots) {
      const gapStart = DateTime.max(windowStart, effectiveStart)
      const gapEnd = DateTime.min(busySlot.start, effectiveEnd)

      if (gapEnd > gapStart) {
        const durationMinutes = gapEnd.diff(gapStart, "minutes").minutes
        if (durationMinutes >= 30) {
          // Only show windows of at least 30 minutes
          windows.push(`${gapStart.toFormat("h:mm a")} - ${gapEnd.toFormat("h:mm a")}`)
        }
      }

      windowStart = DateTime.max(windowStart, busySlot.end)
    }

    // Check for remaining time after last busy slot
    if (windowStart < effectiveEnd) {
      const durationMinutes = effectiveEnd.diff(windowStart, "minutes").minutes
      if (durationMinutes >= 30) {
        windows.push(`${windowStart.toFormat("h:mm a")} - ${effectiveEnd.toFormat("h:mm a")}`)
      }
    }

    if (windows.length > 0) {
      dayMap.set(dayKey, {
        date: dayKey,
        dayName,
        windows,
      })
    }

    currentDay = currentDay.plus({ days: 1 })
  }

  const days = Array.from(dayMap.values())

  const message =
    days.length > 0
      ? `I found ${days.length} day(s) with availability. Here are the available time slots:`
      : "No availability found in the requested time range. All slots are already booked."

  return {
    message,
    days,
    availability: {
      start: startDateTime,
      end: endDateTime,
    },
  }
}
