'use client'

import type { ComponentProps, ReactNode } from 'react'
import { Avatar as Root, AvatarFallback, AvatarImage } from '../../components/keyframery/avatar'

export type AvatarProps = Omit<ComponentProps<typeof Root>, 'children'> & {
	src?: string
	alt?: string
	name?: string
	fallback?: ReactNode
}

function initials(name?: string) {
	const words = name?.trim().split(/\s+/).filter(Boolean) ?? []
	const first = words[0]
	if (!first) return '?'
	return (
		words.length === 1 ? first.slice(0, 2) : first[0] + words[words.length - 1][0]
	).toUpperCase()
}

export function Avatar({ src, alt, name, fallback, ...props }: AvatarProps) {
	return (
		<Root {...props}>
			{src && <AvatarImage src={src} alt={alt ?? name ?? ''} />}
			<AvatarFallback>{fallback ?? initials(name)}</AvatarFallback>
		</Root>
	)
}

export { AvatarFallback, AvatarImage } from '../../components/keyframery/avatar'
