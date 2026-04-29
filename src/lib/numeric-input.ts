/**
 * Utilities for numeric input handling
 */

export type NumericMode = 'integer' | 'decimal'

/**
 * Creates a regex pattern for validating numeric input
 */
export function createNumericPattern(mode: NumericMode, maxDecimalPlaces: number): RegExp {
	if (mode === 'integer') {
		return /^-?\d*$/
	}
	return new RegExp(`^-?\\d*\\.?\\d{0,${maxDecimalPlaces}}$`)
}

/**
 * Tests if a string value is valid for the given numeric mode
 */
export function isValidNumericInput(
	value: string,
	mode: NumericMode,
	maxDecimalPlaces: number,
): boolean {
	const pattern = createNumericPattern(mode, maxDecimalPlaces)
	return pattern.test(value)
}

/**
 * Sanitizes input by removing invalid characters and enforcing constraints.
 * Always returns a valid string for the given mode.
 */
export function sanitizeNumericInput(
	value: string,
	mode: NumericMode,
	maxDecimalPlaces: number,
): string {
	if (value === '') return ''

	if (mode === 'integer') {
		// Keep only digits and minus
		const hasLeadingMinus = value.startsWith('-')
		const digits = value.replace(/[^\d]/g, '')
		return hasLeadingMinus ? `-${digits}` : digits
	}

	// Decimal mode
	// Keep only digits, decimal point, and minus
	const hasLeadingMinus = value.startsWith('-')
	let cleaned = value.replace(/[^\d.]/g, '')

	// Handle multiple decimal points - keep only first
	const dotIndex = cleaned.indexOf('.')
	if (dotIndex !== -1) {
		cleaned = cleaned.slice(0, dotIndex + 1) + cleaned.slice(dotIndex + 1).replace(/\./g, '')
	}

	// Limit decimal places
	const parts = cleaned.split('.')
	if (parts[1] !== undefined && parts[1].length > maxDecimalPlaces) {
		cleaned = `${parts[0]}.${parts[1].slice(0, maxDecimalPlaces)}`
	}

	return hasLeadingMinus ? `-${cleaned}` : cleaned
}

/**
 * Parses a string value to a number based on the mode
 * Returns null for empty strings or invalid numbers
 */
export function parseNumericValue(value: string, mode: NumericMode): number | null {
	const trimmed = value.trim()
	if (trimmed === '') {
		return null
	}
	const num = mode === 'integer' ? parseInt(trimmed, 10) : parseFloat(trimmed)
	return Number.isNaN(num) ? null : num
}

/**
 * Formats a numeric value to a string for display
 */
export function formatNumericValue(value: number | null | undefined): string {
	if (value == null) {
		return ''
	}
	return String(value)
}
