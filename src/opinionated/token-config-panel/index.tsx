import * as React from 'react'
import { Button } from '../../_internal/button'
import { Input } from '../../_internal/input'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../../_internal/sheet'
import { tokenCatalog } from '../../styles/tokens/catalog'
import { themeValues } from '../../styles/tokens/model'
import { themes, type ThemeName } from '../../styles/tokens/themes'
import { parseTokenOverrides, type TokenName } from '../../styles/tokens/types'
import { createPresetCSS } from '../../styles/tokens/preset'
import { removePresetStyle } from './preset-manager'

interface TokenConfigPanelProps {
	dark?: boolean
	onDarkChange?: (dark: boolean) => void
	grid?: boolean
	onGridChange?: (grid: boolean) => void
}

/** Every row comes from the token inventory; adding a token never requires editor registration. */
export function TokenConfigPanel({
	dark = false,
	onDarkChange,
	grid = false,
	onGridChange,
}: TokenConfigPanelProps = {}) {
	const [theme, setTheme] = React.useState<ThemeName>('default')
	const [values, setValues] = React.useState(() => ({
		light: themeValues('default', 'light'),
		dark: themeValues('default', 'dark'),
	}))
	const [query, setQuery] = React.useState('')
	const [json, setJson] = React.useState('')
	const [error, setError] = React.useState('')
	const mode = dark ? 'dark' : 'light'
	const rows = tokenCatalog.filter((token) =>
		`${token.name} ${token.group} ${token.description} ${token.utilities.join(' ')}`
			.toLowerCase()
			.includes(query.toLowerCase()),
	)
	function apply(next: typeof values) {
		removePresetStyle()
		const style = document.createElement('style')
		style.id = 'composables-preset-overrides'
		style.textContent = createPresetCSS(next)
		document.head.appendChild(style)
		setValues(next)
	}
	function selectTheme(name: ThemeName) {
		setTheme(name)
		apply({ light: themeValues(name, 'light'), dark: themeValues(name, 'dark') })
		setError('')
	}
	function edit(name: TokenName, value: string) {
		try {
			const parsed = parseTokenOverrides({ [name]: value })
			apply({ ...values, [mode]: { ...values[mode], ...parsed } })
			setError('')
		} catch (error) {
			setError(error instanceof Error ? error.message : 'Invalid token value')
		}
	}
	function importValues() {
		try {
			const input = JSON.parse(json)
			const light = parseTokenOverrides(input.light)
			const dark = parseTokenOverrides(input.dark)
			if (
				Object.keys(light).length !== tokenCatalog.length ||
				Object.keys(dark).length !== tokenCatalog.length
			)
				throw new Error('Import must contain every token in both light and dark maps.')
			apply({ light: { ...values.light, ...light }, dark: { ...values.dark, ...dark } })
			setError('')
		} catch (error) {
			setError(error instanceof Error ? error.message : 'Invalid JSON')
		}
	}
	return (
		<Sheet>
			<SheetTrigger render={<Button variant="outline" size="sm" />}>Tokens</SheetTrigger>
			<SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
				<SheetHeader>
					<SheetTitle>Token catalogue</SheetTitle>
				</SheetHeader>
				<div className="flex flex-col gap-4 p-4">
					<label className="flex flex-col gap-1 text-body">
						Theme
						<select
							aria-label="Theme"
							className="bg-control-surface text-control-content border border-control-stroke rounded-input h-control-md px-2"
							value={theme}
							onChange={(event) => selectTheme(event.target.value as ThemeName)}
						>
							{themes.map((theme) => (
								<option key={theme.name} value={theme.name}>
									{theme.label}
								</option>
							))}
						</select>
					</label>
					<div className="flex flex-wrap gap-2">
						{onDarkChange && (
							<Button variant="outline" size="sm" onClick={() => onDarkChange(!dark)}>
								{dark ? 'Edit light mode' : 'Edit dark mode'}
							</Button>
						)}
						{onGridChange && (
							<Button variant="outline" size="sm" onClick={() => onGridChange(!grid)}>
								{grid ? 'Hide grid' : 'Show grid'}
							</Button>
						)}
						<Button variant="outline" size="sm" onClick={() => selectTheme(theme)}>
							Reset theme
						</Button>
					</div>
					<Input
						aria-label="Search tokens"
						placeholder="Search name, purpose or utility"
						value={query}
						onChange={(event) => setQuery(event.target.value)}
					/>
					<p className="text-body text-content-muted">
						{rows.length} of {tokenCatalog.length} tokens · Editing {mode} values
					</p>
					{error && (
						<p role="alert" className="text-critical text-body">
							{error}
						</p>
					)}
					{rows.map((token) => (
						<label
							key={`${theme}-${mode}-${token.name}`}
							className="flex flex-col gap-1 border-b border-stroke pb-3"
						>
							<span className="font-mono text-body break-all">{token.name}</span>
							<span className="text-body text-content-muted">{token.description}</span>
							<Input
								aria-label={token.name}
								key={`${theme}-${mode}-${token.name}-${values[mode][token.name]}`}
								defaultValue={values[mode][token.name]}
								onBlur={(event) => {
									if (event.target.value !== values[mode][token.name])
										edit(token.name, event.target.value)
								}}
							/>
							<span className="font-mono text-xs text-content-muted break-all">
								{token.utilities.join(' · ') || 'CSS variable'}
							</span>
						</label>
					))}
					<label className="flex flex-col gap-1 text-body">
						Complete theme JSON
						<textarea
							aria-label="Complete theme JSON"
							className="min-h-40 bg-control-surface text-control-content border border-control-stroke rounded-input p-2 font-mono text-body"
							value={json}
							onChange={(event) => setJson(event.target.value)}
						/>
					</label>
					<div className="flex gap-2">
						<Button variant="outline" onClick={() => setJson(JSON.stringify(values, null, 2))}>
							Export JSON
						</Button>
						<Button variant="outline" onClick={importValues}>
							Import JSON
						</Button>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	)
}
