export type SemanticColorToken = {
	[Category in 'bg' | 'text' | 'icon' | 'border' | 'chart']: {
		cssVar: `--${Category}-${string}`
		category: Category
		label: string
	}
}['bg' | 'text' | 'icon' | 'border' | 'chart']

export interface CssAlias {
	cssVar: string
	target: SemanticColorName
}

export interface TailwindColorAlias {
	cssVar: string
	target: SemanticColorName | (typeof sidebarColorCssVars)[number]
}

export interface PublicSemanticUtility {
	className: SemanticUtilityClassName
	declarations: ReadonlyArray<readonly [property: string, value: string]>
	category: SemanticColorToken['category']
	token: SemanticColorName
}

export const semanticColorTokens = [
	// Background
	{ cssVar: '--bg-default', category: 'bg', label: 'default' },
	{ cssVar: '--bg-inverse', category: 'bg', label: 'inverse' },
	{ cssVar: '--bg-muted', category: 'bg', label: 'muted' },
	{
		cssVar: '--bg-surface-default',
		category: 'bg',
		label: 'surface-default',
	},
	{
		cssVar: '--bg-surface-popover',
		category: 'bg',
		label: 'surface-popover',
	},
	{
		cssVar: '--bg-surface-accent',
		category: 'bg',
		label: 'surface-accent',
	},
	{
		cssVar: '--bg-surface-field',
		category: 'bg',
		label: 'surface-field',
	},
	{ cssVar: '--bg-surface-info', category: 'bg', label: 'surface-info' },
	{
		cssVar: '--bg-surface-success',
		category: 'bg',
		label: 'surface-success',
	},
	{
		cssVar: '--bg-surface-warning',
		category: 'bg',
		label: 'surface-warning',
	},
	{
		cssVar: '--bg-surface-critical',
		category: 'bg',
		label: 'surface-critical',
	},
	{
		cssVar: '--bg-surface-emphasis',
		category: 'bg',
		label: 'surface-emphasis',
	},
	{
		cssVar: '--bg-surface-inverse',
		category: 'bg',
		label: 'surface-inverse',
	},
	{
		cssVar: '--bg-surface-transparent',
		category: 'bg',
		label: 'surface-transparent',
	},
	{
		cssVar: '--bg-overlay',
		category: 'bg',
		label: 'overlay',
	},
	{ cssVar: '--bg-surface-brand', category: 'bg', label: 'surface-brand' },
	{
		cssVar: '--bg-surface-brand-2',
		category: 'bg',
		label: 'surface-brand-2',
	},
	{
		cssVar: '--bg-surface-brand-3',
		category: 'bg',
		label: 'surface-brand-3',
	},
	{
		cssVar: '--bg-surface-brand-4',
		category: 'bg',
		label: 'surface-brand-4',
	},
	{
		cssVar: '--bg-surface-brand-5',
		category: 'bg',
		label: 'surface-brand-5',
	},
	{
		cssVar: '--bg-surface-hover',
		category: 'bg',
		label: 'surface-hover',
	},
	{
		cssVar: '--bg-surface-input',
		category: 'bg',
		label: 'surface-input',
	},
	{
		cssVar: '--bg-fill-default',
		category: 'bg',
		label: 'fill-default',
	},
	{
		cssVar: '--bg-fill-primary',
		category: 'bg',
		label: 'fill-primary',
	},
	{
		cssVar: '--bg-fill-primary-hover',
		category: 'bg',
		label: 'fill-primary-hover',
	},
	{ cssVar: '--bg-fill-brand', category: 'bg', label: 'fill-brand' },
	{
		cssVar: '--bg-fill-brand-2',
		category: 'bg',
		label: 'fill-brand-2',
	},
	{
		cssVar: '--bg-fill-brand-3',
		category: 'bg',
		label: 'fill-brand-3',
	},
	{
		cssVar: '--bg-fill-brand-4',
		category: 'bg',
		label: 'fill-brand-4',
	},
	{
		cssVar: '--bg-fill-brand-5',
		category: 'bg',
		label: 'fill-brand-5',
	},
	{ cssVar: '--bg-fill-info', category: 'bg', label: 'fill-info' },
	{ cssVar: '--bg-fill-success', category: 'bg', label: 'fill-success' },
	{ cssVar: '--bg-fill-warning', category: 'bg', label: 'fill-warning' },
	{ cssVar: '--bg-fill-critical', category: 'bg', label: 'fill-critical' },
	{ cssVar: '--bg-fill-emphasis', category: 'bg', label: 'fill-emphasis' },
	{
		cssVar: '--bg-fill-transparent',
		category: 'bg',
		label: 'fill-transparent',
	},
	{
		cssVar: '--bg-fill-secondary',
		category: 'bg',
		label: 'fill-secondary',
	},
	{
		cssVar: '--bg-fill-secondary-hover',
		category: 'bg',
		label: 'fill-secondary-hover',
	},
	{
		cssVar: '--bg-fill-selected',
		category: 'bg',
		label: 'fill-selected',
	},
	{
		cssVar: '--bg-fill-secondary-inverse',
		category: 'bg',
		label: 'fill-secondary-inverse',
	},

	// Text
	{ cssVar: '--text-default', category: 'text', label: 'content-default' },
	{
		cssVar: '--text-secondary',
		category: 'text',
		label: 'content-secondary',
	},
	{
		cssVar: '--text-muted',
		category: 'text',
		label: 'content-muted',
	},
	{ cssVar: '--text-disabled', category: 'text', label: 'disabled' },
	{ cssVar: '--text-inverse', category: 'text', label: 'content-inverse' },
	{
		cssVar: '--text-on-fill-primary',
		category: 'text',
		label: 'on-fill-primary',
	},
	{
		cssVar: '--text-on-fill-brand',
		category: 'text',
		label: 'on-fill-brand',
	},
	{
		cssVar: '--text-on-fill-secondary',
		category: 'text',
		label: 'on-fill-secondary',
	},
	{
		cssVar: '--text-on-fill-selected',
		category: 'text',
		label: 'on-fill-selected',
	},
	{
		cssVar: '--text-on-surface-accent',
		category: 'text',
		label: 'on-surface-accent',
	},
	{ cssVar: '--text-info', category: 'text', label: 'info' },
	{ cssVar: '--text-success', category: 'text', label: 'success' },
	{ cssVar: '--text-warning', category: 'text', label: 'warning' },
	{ cssVar: '--text-critical', category: 'text', label: 'critical' },
	{ cssVar: '--text-emphasis', category: 'text', label: 'emphasis' },
	{ cssVar: '--text-brand', category: 'text', label: 'brand' },
	{ cssVar: '--text-brand-2', category: 'text', label: 'brand-2' },
	{ cssVar: '--text-brand-3', category: 'text', label: 'brand-3' },
	{ cssVar: '--text-brand-4', category: 'text', label: 'brand-4' },
	{ cssVar: '--text-brand-5', category: 'text', label: 'brand-5' },
	{ cssVar: '--text-link', category: 'text', label: 'link' },

	// Icon
	{ cssVar: '--icon-default', category: 'icon', label: 'default' },
	{ cssVar: '--icon-secondary', category: 'icon', label: 'secondary' },
	{ cssVar: '--icon-disabled', category: 'icon', label: 'disabled' },
	{ cssVar: '--icon-inverse', category: 'icon', label: 'inverse' },
	{ cssVar: '--icon-info', category: 'icon', label: 'info' },
	{ cssVar: '--icon-success', category: 'icon', label: 'success' },
	{ cssVar: '--icon-warning', category: 'icon', label: 'warning' },
	{ cssVar: '--icon-critical', category: 'icon', label: 'critical' },
	{ cssVar: '--icon-emphasis', category: 'icon', label: 'emphasis' },
	{ cssVar: '--icon-brand', category: 'icon', label: 'brand' },
	{ cssVar: '--icon-brand-2', category: 'icon', label: 'brand-2' },
	{ cssVar: '--icon-brand-3', category: 'icon', label: 'brand-3' },
	{ cssVar: '--icon-brand-4', category: 'icon', label: 'brand-4' },
	{ cssVar: '--icon-brand-5', category: 'icon', label: 'brand-5' },

	// Border
	{ cssVar: '--border-default', category: 'border', label: 'default' },
	{
		cssVar: '--border-secondary',
		category: 'border',
		label: 'secondary',
	},
	{ cssVar: '--border-input', category: 'border', label: 'input' },
	{
		cssVar: '--border-tertiary',
		category: 'border',
		label: 'tertiary',
	},
	{
		cssVar: '--border-disabled',
		category: 'border',
		label: 'disabled',
	},
	{ cssVar: '--border-inverse', category: 'border', label: 'inverse' },
	{ cssVar: '--border-focus', category: 'border', label: 'focus' },
	{ cssVar: '--border-brand', category: 'border', label: 'brand' },
	{ cssVar: '--border-brand-2', category: 'border', label: 'brand-2' },
	{ cssVar: '--border-brand-3', category: 'border', label: 'brand-3' },
	{ cssVar: '--border-brand-4', category: 'border', label: 'brand-4' },
	{ cssVar: '--border-brand-5', category: 'border', label: 'brand-5' },
	{ cssVar: '--border-info', category: 'border', label: 'info' },
	{ cssVar: '--border-success', category: 'border', label: 'success' },
	{ cssVar: '--border-warning', category: 'border', label: 'warning' },
	{ cssVar: '--border-critical', category: 'border', label: 'critical' },
	{ cssVar: '--border-emphasis', category: 'border', label: 'emphasis' },

	// Chart
	{ cssVar: '--chart-1', category: 'chart', label: '1' },
	{ cssVar: '--chart-2', category: 'chart', label: '2' },
	{ cssVar: '--chart-3', category: 'chart', label: '3' },
	{ cssVar: '--chart-4', category: 'chart', label: '4' },
	{ cssVar: '--chart-5', category: 'chart', label: '5' },
] as const satisfies readonly SemanticColorToken[]

export type SemanticColorName = (typeof semanticColorTokens)[number]['cssVar']

type UtilityFor<Token> = Token extends {
	category: infer Category
	label: infer Label extends string
}
	? Category extends 'bg'
		? `bg-${Label}`
		: Category extends 'text'
			? `text-${Label}`
			: Category extends 'border'
				? `border-stroke-${Label}`
				: Category extends 'icon'
					? `${'text' | 'fill' | 'stroke'}-icon-${Label}`
					: Category extends 'chart'
						? `${'fill' | 'stroke'}-chart-${Label}`
						: never
	: never
export type SemanticUtilityClassName = UtilityFor<(typeof semanticColorTokens)[number]>

export const shadcnCompatAliases: CssAlias[] = [
	{ cssVar: '--background', target: '--bg-default' },
	{ cssVar: '--foreground', target: '--text-default' },
	{ cssVar: '--card', target: '--bg-surface-default' },
	{ cssVar: '--card-foreground', target: '--text-default' },
	{ cssVar: '--popover', target: '--bg-surface-popover' },
	{ cssVar: '--popover-foreground', target: '--text-default' },
	{ cssVar: '--primary', target: '--bg-fill-primary' },
	{ cssVar: '--primary-foreground', target: '--text-on-fill-primary' },
	{ cssVar: '--secondary', target: '--bg-fill-secondary' },
	{ cssVar: '--secondary-foreground', target: '--text-on-fill-secondary' },
	{ cssVar: '--muted', target: '--bg-muted' },
	{ cssVar: '--muted-foreground', target: '--text-muted' },
	{ cssVar: '--accent', target: '--bg-surface-accent' },
	{ cssVar: '--accent-foreground', target: '--text-on-surface-accent' },
	{ cssVar: '--destructive', target: '--bg-fill-critical' },
	{ cssVar: '--border', target: '--border-default' },
	{ cssVar: '--input', target: '--border-input' },
	{ cssVar: '--ring', target: '--border-focus' },
]

/** Independent component roles: presets own these values directly. */
export const sidebarColorCssVars = [
	'--sidebar-background',
	'--sidebar-foreground',
	'--sidebar-primary',
	'--sidebar-primary-foreground',
	'--sidebar-accent',
	'--sidebar-accent-foreground',
	'--sidebar-border',
	'--sidebar-ring',
] as const

const legacyTailwindColorAliases: TailwindColorAlias[] = [
	...sidebarColorCssVars.map((cssVar) => ({
		cssVar: `--color-${cssVar.slice(2)}`,
		target: cssVar,
	})),
	{ cssVar: '--color-overlay', target: '--bg-overlay' },
	{ cssVar: '--color-sidebar', target: '--sidebar-background' },
	{ cssVar: '--color-page', target: '--bg-default' },
	{ cssVar: '--color-stroke', target: '--border-default' },
	{ cssVar: '--color-field', target: '--border-secondary' },
	{ cssVar: '--color-focus', target: '--border-focus' },
	{ cssVar: '--color-fill-critical', target: '--bg-fill-critical' },
	{ cssVar: '--color-selected', target: '--bg-fill-selected' },
	{ cssVar: '--color-selected-foreground', target: '--text-on-fill-selected' },
	{ cssVar: '--color-sidebar-stroke', target: '--border-default' },
	{ cssVar: '--color-chart-1', target: '--chart-1' },
	{ cssVar: '--color-chart-2', target: '--chart-2' },
	{ cssVar: '--color-chart-3', target: '--chart-3' },
	{ cssVar: '--color-chart-4', target: '--chart-4' },
	{ cssVar: '--color-chart-5', target: '--chart-5' },
	{ cssVar: '--color-success', target: '--text-success' },
	{ cssVar: '--color-warning', target: '--text-warning' },
	{ cssVar: '--color-critical', target: '--text-critical' },
	{ cssVar: '--color-info', target: '--text-info' },
	{ cssVar: '--color-emphasis', target: '--text-emphasis' },
	{ cssVar: '--color-brand', target: '--text-brand' },
	{ cssVar: '--color-brand-2', target: '--text-brand-2' },
	{ cssVar: '--color-brand-3', target: '--text-brand-3' },
	{ cssVar: '--color-brand-4', target: '--text-brand-4' },
	{ cssVar: '--color-brand-5', target: '--text-brand-5' },
	{ cssVar: '--color-surface-success', target: '--bg-surface-success' },
	{ cssVar: '--color-surface-warning', target: '--bg-surface-warning' },
	{ cssVar: '--color-surface-field', target: '--bg-surface-field' },
	{ cssVar: '--color-surface-critical', target: '--bg-surface-critical' },
	{ cssVar: '--color-surface-info', target: '--bg-surface-info' },
	{ cssVar: '--color-surface-emphasis', target: '--bg-surface-emphasis' },
	{ cssVar: '--color-surface-input', target: '--bg-surface-input' },
	{ cssVar: '--color-surface-brand', target: '--bg-surface-brand' },
	{ cssVar: '--color-surface-brand-2', target: '--bg-surface-brand-2' },
	{ cssVar: '--color-surface-brand-3', target: '--bg-surface-brand-3' },
	{ cssVar: '--color-surface-brand-4', target: '--bg-surface-brand-4' },
	{ cssVar: '--color-surface-brand-5', target: '--bg-surface-brand-5' },
	{ cssVar: '--color-surface-hover', target: '--bg-surface-hover' },
	{ cssVar: '--color-icon-success', target: '--icon-success' },
	{ cssVar: '--color-icon-warning', target: '--icon-warning' },
	{ cssVar: '--color-icon-critical', target: '--icon-critical' },
	{ cssVar: '--color-icon-info', target: '--icon-info' },
	{ cssVar: '--color-icon-emphasis', target: '--icon-emphasis' },
	{ cssVar: '--color-icon-brand', target: '--icon-brand' },
	{ cssVar: '--color-icon-brand-2', target: '--icon-brand-2' },
	{ cssVar: '--color-icon-brand-3', target: '--icon-brand-3' },
	{ cssVar: '--color-icon-brand-4', target: '--icon-brand-4' },
	{ cssVar: '--color-icon-brand-5', target: '--icon-brand-5' },
	{ cssVar: '--color-stroke-critical', target: '--border-critical' },
	{ cssVar: '--color-stroke-success', target: '--border-success' },
	{ cssVar: '--color-stroke-warning', target: '--border-warning' },
	{ cssVar: '--color-stroke-info', target: '--border-info' },
	{ cssVar: '--color-stroke-emphasis', target: '--border-emphasis' },
	{ cssVar: '--color-stroke-brand', target: '--border-brand' },
	{ cssVar: '--color-stroke-brand-2', target: '--border-brand-2' },
	{ cssVar: '--color-stroke-brand-3', target: '--border-brand-3' },
	{ cssVar: '--color-stroke-brand-4', target: '--border-brand-4' },
	{ cssVar: '--color-stroke-brand-5', target: '--border-brand-5' },
]

/** Canonical aliases support opacity modifiers and variants through native Tailwind. */
export const tailwindColorAliases: TailwindColorAlias[] = [
	...new Map(
		[
			...legacyTailwindColorAliases,
			...semanticColorTokens.map((token) => ({
				cssVar: `--color-${token.category === 'border' ? 'stroke-' : token.category === 'icon' ? 'icon-' : token.category === 'chart' ? 'chart-' : ''}${token.label}`,
				target: token.cssVar,
			})),
		].map((alias) => [alias.cssVar, alias]),
	).values(),
]

/**
 * The guaranteed, framework-independent semantic color utility contract.
 *
 * Keep this matrix intentionally narrow: each token category only generates
 * utilities for CSS properties that match its semantic role. Tailwind's color
 * adapter remains available internally for richer variant composition, but
 * consumers can rely on every class below existing in the precompiled CSS.
 */
export const publicSemanticUtilities: PublicSemanticUtility[] = semanticColorTokens.flatMap(
	(token): PublicSemanticUtility[] => {
		const value = `var(${token.cssVar})`
		const utility = (
			className: SemanticUtilityClassName,
			declarations: PublicSemanticUtility['declarations'],
		): PublicSemanticUtility => ({
			className,
			declarations,
			category: token.category,
			token: token.cssVar,
		})

		switch (token.category) {
			case 'bg':
				return [utility(`bg-${token.label}`, [['background-color', value]])]
			case 'text':
				return [utility(`text-${token.label}`, [['color', value]])]
			case 'icon':
				return [
					utility(`text-icon-${token.label}`, [['color', value]]),
					utility(`fill-icon-${token.label}`, [['fill', value]]),
					utility(`stroke-icon-${token.label}`, [['stroke', value]]),
				]
			case 'border':
				return [utility(`border-stroke-${token.label}`, [['border-color', value]])]
			case 'chart':
				return [
					utility(`fill-chart-${token.label}`, [['fill', value]]),
					utility(`stroke-chart-${token.label}`, [['stroke', value]]),
				]
		}
	},
)

export const semanticColorCssVars = semanticColorTokens.map((token) => token.cssVar)
export const shadcnCompatCssVars = shadcnCompatAliases.map((alias) => alias.cssVar)
export const tailwindColorCssVars = tailwindColorAliases.map((alias) => alias.cssVar)
export const publicSemanticUtilityClassNames = publicSemanticUtilities.map(
	(utility) => utility.className,
)
