import type { CSSProperties } from 'react'
import type { TokenName } from './types'

type Recipe = Partial<Record<keyof CSSProperties, string>>
const ref = (name: TokenName) => `var(${name})`

/** Paint-only recipes. Layout and interaction remain composable Tailwind utilities. */
function filledButton(kind: 'destructive' | 'brand'): Record<string, Recipe> {
	return {
		[`button-${kind}`]: {
			backgroundColor: ref(`--button-${kind}-background`),
			color: ref(`--button-${kind}-foreground`),
			borderColor: ref(`--button-${kind}-border-color`),
			backgroundImage: ref(`--button-${kind}-background-image`),
			boxShadow: ref(`--button-${kind}-shadow`),
			...(kind !== 'destructive'
				? {
						fontWeight: ref('--button-brand-font-weight'),
						textShadow: ref('--button-brand-text-shadow'),
					}
				: {}),
		},
		[`button-${kind}-hover`]: {
			borderColor: ref(`--button-${kind}-border-color-hover`),
			backgroundImage: ref(`--button-${kind}-background-image-hover`),
			boxShadow: ref(`--button-${kind}-shadow-hover`),
		},
	}
}

export const componentRecipes: Record<string, Recipe> = {
	...filledButton('destructive'),
	...filledButton('brand'),
	'button-primary': {
		backgroundColor: ref('--bg-fill-primary'),
		color: ref('--text-on-fill-primary'),
		borderColor: ref('--button-primary-border-color'),
		backgroundImage: ref('--button-primary-background-image'),
		boxShadow: ref('--button-primary-shadow'),
	},
	'button-primary-hover': {
		backgroundColor: ref('--bg-fill-primary-hover'),
		borderColor: ref('--button-primary-border-color-hover'),
		backgroundImage: ref('--button-primary-background-image-hover'),
		boxShadow: ref('--button-primary-shadow-hover'),
	},
	'button-secondary': {
		backgroundColor: ref('--bg-fill-secondary'),
		color: ref('--text-on-fill-secondary'),
		borderColor: ref('--button-secondary-border-color'),
		boxShadow: ref('--button-secondary-shadow'),
	},
	'button-secondary-hover': {
		backgroundColor: ref('--button-secondary-background-hover'),
		boxShadow: ref('--button-secondary-shadow-hover'),
	},
}
