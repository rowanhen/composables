import type { ComponentProps } from 'react'
import { DropZoneField } from '../form-dropzone/form-dropzone'

export type FormMultiDropZoneProps = Omit<ComponentProps<typeof DropZoneField>, 'multiple'>

export function FormMultiDropZone(props: FormMultiDropZoneProps) {
	return <DropZoneField {...props} multiple />
}
