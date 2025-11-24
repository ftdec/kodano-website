import { DateTime } from "luxon"

const BUSINESS_START_HOUR = 9 // 9 AM
const BUSINESS_END_HOUR = 18 // 6 PM

/**
 * Check if a single datetime is within business hours (Mon-Fri, 9 AM - 6 PM)
 */
export function isWithinBusinessHours(dt: DateTime): boolean {
  // Check if it's a weekday (1 = Monday, 7 = Sunday)
  if (dt.weekday === 6 || dt.weekday === 7) {
    return false
  }

  // Check if hour is within business hours
  const hour = dt.hour
  return hour >= BUSINESS_START_HOUR && hour < BUSINESS_END_HOUR
}

/**
 * Check if a time range is completely within business hours
 */
export function isTimeRangeWithinBusinessHours(start: DateTime, end: DateTime): boolean {
  // Both start and end must be on weekdays
  if (start.weekday === 6 || start.weekday === 7 || end.weekday === 6 || end.weekday === 7) {
    return false
  }

  // Start must be at or after business start time
  if (start.hour < BUSINESS_START_HOUR) {
    return false
  }

  // End must be at or before business end time
  if (end.hour > BUSINESS_END_HOUR || (end.hour === BUSINESS_END_HOUR && end.minute > 0)) {
    return false
  }

  // Start and end must be on the same day
  if (!start.hasSame(end, "day")) {
    return false
  }

  return true
}

/**
 * Clamp a datetime to the nearest business hours boundary
 */
export function clampToBusinessHours(dt: DateTime): DateTime {
  let result = dt

  // If weekend, move to next Monday
  if (result.weekday === 6) {
    // Saturday -> Monday
    result = result.plus({ days: 2 })
  } else if (result.weekday === 7) {
    // Sunday -> Monday
    result = result.plus({ days: 1 })
  }

  // Clamp hour to business hours
  if (result.hour < BUSINESS_START_HOUR) {
    result = result.set({ hour: BUSINESS_START_HOUR, minute: 0, second: 0, millisecond: 0 })
  } else if (result.hour >= BUSINESS_END_HOUR) {
    // Move to next business day at start time
    result = result.plus({ days: 1 }).set({
      hour: BUSINESS_START_HOUR,
      minute: 0,
      second: 0,
      millisecond: 0,
    })

    // Check if next day is weekend
    if (result.weekday === 6) {
      result = result.plus({ days: 2 })
    } else if (result.weekday === 7) {
      result = result.plus({ days: 1 })
    }
  }

  return result
}
