import {
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	Select as SelectPrimitive,
	SelectScrollDownButton,
	SelectScrollUpButton,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
} from '../_internal/select'

export interface SelectOption {
	label: string
	value: string
	disabled?: boolean
}

export interface SelectProps {
	/** Currently selected value */
	value?: string
	/** Callback when value changes */
	onValueChange?: (value: string) => void
	/** List of selectable options */
	options: SelectOption[]
	/** Placeholder text when no value is selected */
	placeholder?: string
	/** Whether the select is disabled */
	disabled?: boolean
	/** Additional class names for the trigger */
	className?: string
	/** Size variant */
	size?: 'sm' | 'default'
}

/**
 * Opinionated Select component with simplified options array API.
 * Use for standalone dropdown selects (not form-bound).
 * For form usage, see form-select.
 *
 * @example
 * ```tsx
 * const [value, setValue] = useState('')
 *
 * <Select
 *   value={value}
 *   onValueChange={setValue}
 *   options={[
 *     { label: 'Small', value: 'sm' },
 *     { label: 'Medium', value: 'md' },
 *     { label: 'Large', value: 'lg' },
 *   ]}
 *   placeholder="Select size"
 * />
 * ```
 */
function Select({
	value,
	onValueChange,
	options,
	placeholder = 'Select...',
	disabled = false,
	className,
	size = 'default',
}: SelectProps) {
	return (
		<SelectPrimitive
			value={value}
			onValueChange={(v) => {
				if (v !== null) onValueChange?.(v)
			}}
			disabled={disabled}
		>
			<SelectTrigger className={className} size={size}>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{options.map((option) => (
					<SelectItem key={option.value} value={option.value} disabled={option.disabled}>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</SelectPrimitive>
	)
}

// Re-export sub-components for advanced usage
export {
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectScrollDownButton,
	SelectScrollUpButton,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
}
export { Select }
