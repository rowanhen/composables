'use client'

import type { ComponentProps } from 'react'
import {
	Autocomplete as Root,
	AutocompleteContent,
	AutocompleteControl,
	AutocompleteEmpty,
	AutocompleteInput,
	AutocompleteLabel,
	AutocompleteList,
} from '../components/keyframery/autocomplete'

export type AutocompleteProps = Omit<ComponentProps<typeof Root>, 'children'> & {
	label: string
	placeholder?: string
	emptyMessage?: string
}

export function Autocomplete({
	label,
	placeholder,
	emptyMessage = 'No suggestions found.',
	...props
}: AutocompleteProps) {
	return (
		<Root {...props}>
			<div className="flex flex-col gap-1.5">
				<AutocompleteLabel>{label}</AutocompleteLabel>
				<AutocompleteControl>
					<AutocompleteInput placeholder={placeholder} />
				</AutocompleteControl>
			</div>
			<AutocompleteContent>
				<AutocompleteEmpty>{emptyMessage}</AutocompleteEmpty>
				<AutocompleteList />
			</AutocompleteContent>
		</Root>
	)
}
