import type * as React from 'react'

import { Kbd as KbdPrimitive, KbdGroup as KbdGroupPrimitive } from '../_internal/kbd'

export interface KbdProps extends React.ComponentProps<'kbd'> {}
export interface KbdGroupProps extends React.ComponentProps<'span'> {}

function Kbd(props: KbdProps) {
	return <KbdPrimitive {...props} />
}

function KbdGroup(props: KbdGroupProps) {
	return <KbdGroupPrimitive {...props} />
}

export { Kbd, KbdGroup }
