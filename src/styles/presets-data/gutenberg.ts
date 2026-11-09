import { defaultPreset, defaultPresetDark } from './default'

const shape: Record<string, string> = {
	'--font-sans': 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
	'--font-heading': 'ui-sans-serif, system-ui, sans-serif',
	'--radius': '0.375rem',
	'--button-radius': 'var(--radius)',
	'--button-height': '2.5rem',
	'--button-font-size': '0.8125rem',
	'--control-size-md': 'calc(var(--spacing) * 10)',
}

export const gutenberg: Record<string, string> = {
	...defaultPreset,
	...shape,
	...{
		'--bg-default': '#f6f3e9',
		'--bg-surface-default': '#fffdf6',
		'--bg-muted': '#ede9dc',
		'--bg-surface-hover': '#e6dfcb',
		'--bg-surface-field': '#fffdf6',
		'--bg-fill-brand': '#846000',
		'--bg-fill-primary': '#846000',
		'--text-on-fill-primary': '#ffffff',
		'--text-default': '#323437',
		'--text-secondary': '#58594e',
		'--text-muted': '#6b6b60',
		'--text-brand': '#846000',
		'--text-on-fill-brand': '#ffffff',
		'--border-default': '#d3cebd',
		'--border-input': '#c3bda9',
		'--border-focus': '#846000',
	},
}

export const gutenbergDark: Record<string, string> = {
	...defaultPresetDark,
	...shape,
	...{
		'--bg-default': '#323437',
		'--bg-surface-default': '#2c2e31',
		'--bg-muted': '#292b2e',
		'--bg-surface-hover': '#3b3d40',
		'--bg-surface-field': '#393b3e',
		'--bg-fill-brand': '#e2b714',
		'--bg-fill-primary': '#e2b714',
		'--text-on-fill-primary': '#323437',
		'--text-default': '#d1d0c5',
		'--text-secondary': '#b5b5ac',
		'--text-muted': '#9a9c9e',
		'--text-brand': '#e2b714',
		'--text-on-fill-brand': '#323437',
		'--text-critical': '#f17a86',
		'--bg-surface-critical': '#473638',
		'--border-default': '#494b4d',
		'--border-input': '#55575a',
		'--border-focus': '#e2b714',
	},
}
