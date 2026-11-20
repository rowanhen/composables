'use client'

import type { ComponentProps } from 'react'
import { Field as Root, FieldError as ErrorPart } from '../../components/keyframery/field'
import { cn } from '../../lib/utils'

export {
	FieldControl,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from '../../components/keyframery/field'

export type FieldProps = Omit<ComponentProps<typeof Root>, 'className'> & {
	orientation?: 'vertical' | 'horizontal' | 'responsive'
	className?: string
}

export function Field({ orientation = 'vertical', className, ...props }: FieldProps) {
	return (
		<Root
			className={cn(
				'w-full',
				orientation === 'horizontal' && 'flex-row items-start',
				orientation === 'responsive' && 'sm:flex-row sm:items-start',
				className,
			)}
			{...props}
		/>
	)
}

/** Lets compound fields group the control and its supporting text in one column. */
export function FieldContent({ className, ...props }: ComponentProps<'div'>) {
	return <div className={cn('flex min-w-0 flex-1 flex-col gap-1.5', className)} {...props} />
}

type FieldErrorItem = { message?: string } | undefined

export type FieldErrors = string | string[] | FieldErrorItem[]

export function fieldErrors(error?: FieldErrors) {
	const items = Array.isArray(error) ? error : [error]
	return items.flatMap((item) => {
		const message = typeof item === 'string' ? item : item?.message
		return message ? [{ message }] : []
	})
}

export function FieldError({
	children,
	errors,
	...props
}: ComponentProps<typeof ErrorPart> & {
	errors?: FieldErrorItem[]
}) {
	const messages = [...new Set(errors?.flatMap((error) => (error?.message ? [error.message] : [])))]
	const content =
		children ??
		(messages.length > 1 ? (
			<ul className="list-inside list-disc">
				{messages.map((message) => (
					<li key={message}>{message}</li>
				))}
			</ul>
		) : (
			messages[0]
		))

	return <ErrorPart {...props}>{content}</ErrorPart>
}
