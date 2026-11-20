'use client'

import { CircleAlertIcon, CircleCheckIcon, InfoIcon, TriangleAlertIcon } from 'lucide-react'
import type { ComponentProps, ReactNode } from 'react'
import {
	Alert as Root,
	AlertClose,
	AlertDescription,
	AlertTitle,
} from '../../components/keyframery/alert'

type RootProps = ComponentProps<typeof Root>
export type AlertVariant = NonNullable<RootProps['variant']>
export type AlertType = 'notice' | 'negative' | 'positive' | 'default' | 'warning'

export type AlertProps = Omit<RootProps, 'title' | 'children'> & {
	type?: AlertType
	title?: ReactNode
	message?: ReactNode
	children?: ReactNode
	action?: ReactNode
	dismissible?: boolean
}

const icons = {
	default: null,
	notice: InfoIcon,
	negative: CircleAlertIcon,
	positive: CircleCheckIcon,
	warning: TriangleAlertIcon,
}

export function Alert({
	type = 'default',
	variant = type === 'negative' ? 'destructive' : 'default',
	title,
	message,
	children,
	action,
	dismissible = false,
	...props
}: AlertProps) {
	const Icon = icons[type]
	const content = message ?? children

	return (
		<Root variant={variant} {...props}>
			{Icon && <Icon aria-hidden />}
			{title != null && <AlertTitle>{title}</AlertTitle>}
			{content != null && <AlertDescription>{content}</AlertDescription>}
			{action != null && <div className="col-start-2">{action}</div>}
			{dismissible && <AlertClose />}
		</Root>
	)
}

export { AlertClose, AlertDescription, AlertTitle }
