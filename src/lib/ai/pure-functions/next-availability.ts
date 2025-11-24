import { DateTime } from "luxon"
import type { NextAvailabilityOutput } from "@/lib/ai/schemas"

/**
 * Find the next available window from busy slots
 */
export function findNextAvailableWindow(
  busySlots: Array<{ start: string; end: string }>,
): NextAvailabilityOutput | null {
  // Start from tomorrow at 9 AM
  let tomorrow = DateTime.now()
    .setZone("America/Sao_Paulo")
    .plus({ days: 1 })
    .set({ hour: 9, minute: 0, second: 0, millisecond: 0 })

  // Skip to next Monday if tomorrow is weekend
  while (tomorrow.weekday === 6 || tomorrow.weekday === 7) {
    tomorrow = tomorrow.plus({ days: 1 })
  }

  // Search for the next 14 days
  const searchEnd = tomorrow.plus({ days: 14 })

  let currentTime = tomorrow

  while (currentTime < searchEnd) {
    // Skip weekends
    if (currentTime.weekday === 6 || currentTime.weekday === 7) {
      currentTime = currentTime.plus({ days: 1 }).set({ hour: 9, minute: 0, second: 0, millisecond: 0 })
      continue
    }

    // Check if current time is within business hours
    if (currentTime.hour >= 18) {
      // Move to next day
      currentTime = currentTime.plus({ days: 1 }).set({ hour: 9, minute: 0, second: 0, millisecond: 0 })
      continue
    }

    // Proposed 1-hour slot
    const proposedEnd = currentTime.plus({ hours: 1 })

    // Check if proposed slot extends beyond business hours
    if (proposedEnd.hour > 18) {
      // Move to next day
      currentTime = currentTime.plus({ days: 1 }).set({ hour: 9, minute: 0, second: 0, millisecond: 0 })
      continue
    }

    // Check for conflicts with busy slots
    const hasConflict = busySlots.some((slot) => {
      const slotStart = DateTime.fromISO(slot.start, { zone: "UTC" }).setZone("America/Sao_Paulo")
      const slotEnd = DateTime.fromISO(slot.end, { zone: "UTC" }).setZone("America/Sao_Paulo")

      // Check if there's any overlap
      return currentTime < slotEnd && proposedEnd > slotStart
    })

    if (!hasConflict) {
      // Found an available slot!
      const formattedDate = currentTime.toFormat("EEEE, MMMM d 'at' h:mm a")

      return {
        message: `The next available time slot is ${formattedDate} (São Paulo Time).`,
        availability: {
          start: currentTime.toISO() || "",
          end: proposedEnd.toISO() || "",
        },
      }
    }

    // Move forward by 30 minutes
    currentTime = currentTime.plus({ minutes: 30 })
  }

  return null
}
