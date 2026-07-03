import {
	DirectionProvider as DirectionProviderPrimitive,
	useDirection,
	type DirectionProviderProps,
	type TextDirection,
} from '@base-ui/react/direction-provider'

function DirectionProvider(props: DirectionProviderProps) {
	return <DirectionProviderPrimitive {...props} />
}

export { DirectionProvider, useDirection, type DirectionProviderProps, type TextDirection }
