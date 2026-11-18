import type { CSSProperties } from 'react'
import type { TokenName } from './types'

type Recipe = Partial<Record<keyof CSSProperties, string>>
const ref = (name: TokenName, fallback?: TokenName) =>
	`var(${name}${fallback ? `,var(${fallback})` : ''})`

/** Paint-only recipes. Layout and interaction remain composable Tailwind utilities. */
function filledButton(
	kind: 'destructive' | 'brand' | 'brand-2' | 'brand-3' | 'brand-4' | 'brand-5',
): Record<string, Recipe> {
	const semantic = kind === 'destructive' ? 'critical' : kind
	return {
		[`button-${kind}`]: {
			backgroundColor: ref(`--button-${kind}-bg`, `--bg-surface-${semantic}`),
			color: ref(`--button-${kind}-text`, `--text-${semantic}`),
			borderColor: ref(`--button-${kind}-border`, `--border-${semantic}`),
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
			borderColor: ref(`--button-${kind}-hover-border`, '--hover-ring-color'),
			backgroundImage: ref(`--button-${kind}-hover-background-image`),
			boxShadow: ref(`--button-${kind}-hover-shadow`, '--hover-shadow'),
		},
	}
}

export const componentRecipes: Record<string, Recipe> = {
	...filledButton('destructive'),
	...filledButton('brand'),
	...filledButton('brand-2'),
	...filledButton('brand-3'),
	...filledButton('brand-4'),
	...filledButton('brand-5'),
	'button-primary': {
		backgroundColor: ref('--bg-fill-primary'),
		color: ref('--text-on-fill-primary'),
		borderColor: ref('--button-primary-border'),
		backgroundImage: ref('--button-primary-background-image'),
		boxShadow: ref('--button-primary-shadow'),
	},
	'button-primary-hover': {
		backgroundColor: ref('--bg-fill-primary-hover'),
		borderColor: ref('--button-primary-hover-border', '--hover-ring-color'),
		backgroundImage: ref('--button-primary-hover-background-image'),
		boxShadow: ref('--button-primary-hover-shadow', '--hover-shadow'),
	},
	'button-secondary': {
		backgroundColor: ref('--bg-fill-secondary'),
		color: ref('--text-on-fill-secondary'),
		borderColor: ref('--button-secondary-border'),
		boxShadow: ref('--button-secondary-shadow'),
	},
	'button-secondary-hover': {
		backgroundColor: ref('--button-secondary-hover-bg', '--bg-fill-secondary-hover'),
		boxShadow: ref('--button-secondary-hover-shadow', '--hover-shadow'),
	},
}
