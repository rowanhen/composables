export const themes = [
	{
		name: 'gutenberg',
		label: 'Gutenberg',
		description: 'Soft neutral surfaces, blue accents, and generous pill-shaped controls.',
	},
	{
		name: 'default',
		label: 'Default',
		description: 'Clean, neutral, Inter-based. The "no opinion" starting point.',
	},
	{
		name: 'brutalist',
		label: 'Brutalist',
		description:
			'Raw, architectural, uncompromising. Structural honesty: things look exactly like what they are.',
	},
	{
		name: 'signal-pop',
		label: 'Signal Pop',
		description:
			'Bright consumer-tech energy: electric modules, capsule controls, hard outlines, and codey labels.',
	},
	{
		name: 'editorial-grid',
		label: 'Editorial Grid',
		description: 'Flat editorial grid, visible rules, and vivid signals.',
	},
	{
		name: 'kumo',
		label: 'Kumo',
		description:
			'Cloudflare Kumo-inspired: neutral surfaces, blue actions, and highlighted gradient buttons.',
	},
	{
		name: 'oqita',
		label: 'Oqita',
		description:
			'Friendly and soft: expressive type, compact pill controls, quiet surfaces, and cobalt actions.',
	},
	{
		name: 'sponder',
		label: 'Sponder',
		description: 'Warm light surfaces, dark slate surfaces, and green brand accents.',
	},
] as const
export type ThemeName = (typeof themes)[number]['name']
