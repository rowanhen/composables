'use client'

export * from './primitives/form'

/* Theming variables (set on a part or ancestor; absent values preserve the theme):
   --form-muted: Status colour; default: text-muted-foreground.
   --form-gap: Form section gap; default: gap-4.
*/

/* Styled form: the animated primitive plus the Keyframery look. The fields are Keyframery's styled
   Field (`@/components/ui/field`), so a form item looks and moves exactly like a field; shadcn's
   part names point at them. The submit button is a primary key that turns the success green when
   the submission lands. */

import * as React from 'react'

import {
	Field,
	FieldControl,
	FieldDescription,
	FieldError,
	FieldLabel,
	useFieldControl,
} from './field'
import {
	Form as FormPrimitive,
	FormStatus as FormStatusPrimitive,
	FormSubmit as FormSubmitPrimitive,
} from './primitives/form'
import { Speed, type SpeedProps } from './motion'
import { cn } from '../../lib/utils'
import { buttonClassName } from './button'

/* UI SDK accepts a class name or a function of state; keep both working. */
function withClass<S>(
	base: string,
	className: string | ((state: S) => string | undefined) | undefined,
) {
	return typeof className === 'function'
		? (state: S) => cn(base, className(state))
		: cn(base, className)
}

function Form({
	speed,
	className,
	...props
}: React.ComponentProps<typeof FormPrimitive> & SpeedProps) {
	return (
		<Speed speed={speed}>
			<FormPrimitive
				className={withClass('flex min-w-0 flex-col gap-[var(--form-gap,1rem)]', className)}
				{...props}
			/>
		</Speed>
	)
}

function FormSubmit({ className, ...props }: React.ComponentProps<typeof FormSubmitPrimitive>) {
	return (
		<FormSubmitPrimitive
			className={buttonClassName(className, {
				variant: 'primary',
				render: Boolean(props.render),
				extra:
					'aria-disabled:cursor-progress data-[status=success]:bg-surface-success data-[status=success]:text-success',
			})}
			{...props}
		/>
	)
}

function FormStatus({ className, ...props }: React.ComponentProps<typeof FormStatusPrimitive>) {
	return (
		<FormStatusPrimitive
			className={withClass(
				cn(
					'text-xs leading-[var(--body-line-height)] text-[color:var(--form-muted,var(--muted-foreground))]',
					'data-[status=error]:font-medium data-[status=error]:text-destructive',
				),
				className,
			)}
			{...props}
		/>
	)
}

/* shadcn's names for the field parts. FormItem and FormField are the same part: a field takes the
   `name` its control submits under, and wires its label, description and errors itself. */
const FormItem = Field
const FormField = Field
const FormLabel = FieldLabel
const FormControl = FieldControl
const FormDescription = FieldDescription
const FormMessage = FieldError

export {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormStatus,
	FormSubmit,
	useFieldControl,
}
