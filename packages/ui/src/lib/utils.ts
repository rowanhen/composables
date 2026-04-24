import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

/**
 * Centralised focus ring style for all focusable elements.
 * Change this once to update focus behaviour across every component.
 */
export const FOCUS_RING =
	'focus-visible:border-[var(--focus-ring-color)] focus-visible:ring-[color:var(--focus-ring-color)]/30 focus-visible:ring-[length:var(--focus-ring-width)] aria-invalid:ring-stroke-critical/20 dark:aria-invalid:ring-stroke-critical/40 aria-invalid:border-stroke-critical dark:aria-invalid:border-stroke-critical/50 aria-invalid:ring-[length:var(--focus-ring-width)]'

/** Destructive-variant focus override – layer on top of FOCUS_RING. */
export const FOCUS_RING_DESTRUCTIVE =
	'focus-visible:ring-stroke-critical/20 dark:focus-visible:ring-stroke-critical/40 focus-visible:border-stroke-critical/40'

/** Disabled state opacity — single source of truth for all disabled elements. */
export const DISABLED_OPACITY = 'disabled:opacity-disabled'

/**
 * Left-pad a string to a given total length using the provided fill character.
 * Used by CodeBlock to right-align line numbers.
 *
 * @example leftPad('7', 3)   // '  7'  (using space fill)
 * @example leftPad('42', 3)  // ' 42'
 */
export function leftPad(str: string, length: number, fill = ' '): string {
	return str.length >= length ? str : fill.repeat(length - str.length) + str
}
