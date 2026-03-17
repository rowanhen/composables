/**
 * Opinionated Calendar component.
 * Re-exports the primitive as the API is already clean.
 *
 * @example
 * ```tsx
 * <Calendar
 *   mode="single"
 *   selected={date}
 *   onSelect={setDate}
 * />
 *
 * <Calendar
 *   mode="range"
 *   selected={dateRange}
 *   onSelect={setDateRange}
 * />
 * ```
 */
export { Calendar, type CalendarProps } from '@/components/ui/calendar'
