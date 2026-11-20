import type { ComponentProps } from 'react'
import { Direction, DirectionProvider } from '../../components/keyframery/direction'

export type DirectionProviderProps = ComponentProps<typeof DirectionProvider>
export { Direction, DirectionProvider }
export {
	DirectionToggle,
	useDirection,
	type Dir as TextDirection,
} from '../../components/keyframery/direction'
