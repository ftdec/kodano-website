import { DateTime } from "luxon"

/**
 * Map weekday names to Luxon weekday numbers (1 = Monday, 7 = Sunday)
 */
export const WEEKDAY_MAP: Record<string, number> = {
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  sunday: 7,
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6,
  sun: 7,
}

/**
 * Calculate the date for a specific weekday occurrence
 * @param weekday - Name of the weekday (e.g., "Monday", "Tuesday")
 * @param sequence - Which occurrence (1 = next, 2 = the one after, etc.)
 */
export function calculateNextWeekdayDate(
  weekday: string,
  sequence: number = 1,
): { date: DateTime; formatted: string } {
  const targetWeekday = WEEKDAY_MAP[weekday.toLowerCase()]

  if (!targetWeekday) {
    throw new Error(`Invalid weekday: ${weekday}`)
  }

  const today = DateTime.now().setZone("America/Sao_Paulo").startOf("day")
  let currentDate = today
  let count = 0

  // Find the next occurrence(s) of the target weekday
  while (count < sequence) {
    currentDate = currentDate.plus({ days: 1 })

    if (currentDate.weekday === targetWeekday) {
      count++
    }

    // Safety check: don't search more than 90 days ahead
    if (currentDate.diff(today, "days").days > 90) {
      throw new Error("Could not find weekday within 90 days")
    }
  }

  const formatted = currentDate.toFormat("EEEE, MMMM d, yyyy")

  return {
    date: currentDate,
    formatted,
  }
}
