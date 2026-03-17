import * as React from 'react'

import {
  Combobox as ComboboxPrimitive,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
} from '@/components/ui/combobox'

export interface ComboboxOption {
  label: string
  value: string
  disabled?: boolean
}

export interface ComboboxProps {
  /** Currently selected value */
  value?: string
  /** Callback when value changes */
  onValueChange?: (value: string) => void
  /** List of selectable options */
  options: ComboboxOption[]
  /** Placeholder text when no value is selected */
  placeholder?: string
  /** Placeholder text for the search input */
  searchPlaceholder?: string
  /** Message shown when no options match the search */
  emptyMessage?: string
  /** Whether the combobox is disabled */
  disabled?: boolean
  /** Additional class names for the input */
  className?: string
}

/**
 * Opinionated Combobox component with simplified options array API.
 * Use for standalone searchable select dropdowns (not form-bound).
 * For form usage, see form-combobox.
 *
 * @example
 * ```tsx
 * const [value, setValue] = useState('')
 *
 * <Combobox
 *   value={value}
 *   onValueChange={setValue}
 *   options={[
 *     { label: 'Apple', value: 'apple' },
 *     { label: 'Banana', value: 'banana' },
 *     { label: 'Cherry', value: 'cherry' },
 *   ]}
 *   placeholder="Select a fruit"
 *   searchPlaceholder="Search fruits..."
 *   emptyMessage="No fruits found"
 * />
 * ```
 */
function Combobox({
  value,
  onValueChange,
  options,
  placeholder = 'Select...',
  searchPlaceholder = 'Search...',
  emptyMessage = 'No results found',
  disabled = false,
  className,
}: ComboboxProps) {
  const selectedOption = options.find((opt) => opt.value === value)

  return (
    <ComboboxPrimitive
      value={value ? [value] : []}
      onValueChange={(values) => onValueChange?.(values[0] ?? '')}
    >
      <ComboboxInput
        placeholder={selectedOption?.label ?? placeholder}
        disabled={disabled}
        className={className}
        showClear={!!value}
      />
      <ComboboxContent>
        <ComboboxInput placeholder={searchPlaceholder} disabled={disabled} />
        <ComboboxList>
          {options.map((option) => (
            <ComboboxItem key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </ComboboxItem>
          ))}
        </ComboboxList>
        <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
      </ComboboxContent>
    </ComboboxPrimitive>
  )
}

// Re-export sub-components for advanced usage
export {
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
}
export { Combobox }
