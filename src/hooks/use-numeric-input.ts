import * as React from 'react'

import {
	formatNumericValue,
	type NumericMode,
	parseNumericValue,
	sanitizeNumericInput,
} from '../lib/numeric-input'

export interface NumericInputOptions {
	/** Enable numeric mode - handles string-to-number conversion on blur */
	numericMode?: NumericMode
	/** Current numeric value (use with numericMode) */
	numericValue?: number | null
	/** Callback when numeric value changes on blur (use with numericMode) */
	onNumericChange?: (value: number | null) => void
	/** Maximum decimal places allowed (default: 2, only applies to decimal mode) */
	maxDecimalPlaces?: number
}

export interface UseNumericInputOptions extends NumericInputOptions {
	/** Original value prop (used when not in numeric mode) */
	value?: string | number | readonly string[]
	/** Original onChange handler */
	onChange?: React.ChangeEventHandler<HTMLInputElement>
	/** Original onBlur handler */
	onBlur?: React.FocusEventHandler<HTMLInputElement>
	/** Original onFocus handler */
	onFocus?: React.FocusEventHandler<HTMLInputElement>
	/** Original type prop */
	type?: React.HTMLInputTypeAttribute
}

export interface UseNumericInputReturn {
	/** Whether numeric mode is active */
	isNumericMode: boolean
	/** Props to spread on the input element */
	inputProps: {
		type: React.HTMLInputTypeAttribute | undefined
		inputMode: 'decimal' | 'numeric' | undefined
		value: string | number | readonly string[] | undefined
		onChange: React.ChangeEventHandler<HTMLInputElement>
		onBlur: React.FocusEventHandler<HTMLInputElement>
		onFocus: React.FocusEventHandler<HTMLInputElement>
	}
}

/**
 * Hook that handles numeric input logic including sanitization and parsing.
 * Used by FormInput and FormInputGroup for consistent numeric handling.
 */
export function useNumericInput({
	numericMode,
	numericValue,
	onNumericChange,
	maxDecimalPlaces = 2,
	value,
	onChange,
	onBlur,
	onFocus,
	type,
}: UseNumericInputOptions): UseNumericInputReturn {
	// Local state for numeric mode - keeps raw string while typing
	const [localValue, setLocalValue] = React.useState(() => formatNumericValue(numericValue))
	const [isFocused, setIsFocused] = React.useState(false)

	// Sync local value when external numericValue changes (only when not focused)
	React.useEffect(() => {
		if (numericMode && !isFocused) {
			setLocalValue(formatNumericValue(numericValue))
		}
	}, [numericMode, numericValue, isFocused])

	const handleChange = React.useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			if (numericMode) {
				const sanitized = sanitizeNumericInput(e.target.value, numericMode, maxDecimalPlaces)
				setLocalValue(sanitized)
				return
			}
			onChange?.(e)
		},
		[numericMode, maxDecimalPlaces, onChange],
	)

	const handleBlur = React.useCallback(
		(e: React.FocusEvent<HTMLInputElement>) => {
			setIsFocused(false)
			if (numericMode && onNumericChange) {
				onNumericChange(parseNumericValue(e.target.value, numericMode))
			}
			onBlur?.(e)
		},
		[numericMode, onNumericChange, onBlur],
	)

	const handleFocus = React.useCallback(
		(e: React.FocusEvent<HTMLInputElement>) => {
			setIsFocused(true)
			onFocus?.(e)
		},
		[onFocus],
	)

	const isNumericMode = Boolean(numericMode)

	return {
		isNumericMode,
		inputProps: {
			type: numericMode ? 'text' : type,
			inputMode:
				numericMode === 'decimal' ? 'decimal' : numericMode === 'integer' ? 'numeric' : undefined,
			value: numericMode ? localValue : value,
			onChange: handleChange,
			onBlur: handleBlur,
			onFocus: handleFocus,
		},
	}
}
