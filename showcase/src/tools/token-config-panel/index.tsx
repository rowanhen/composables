import React from 'react'

import { Button } from '../../../../src/opinionated/button'
import { ScrollArea } from '../../../../src/opinionated/scroll-area'
import { Separator } from '../../../../src/opinionated/separator'
import {
	Drawer,
	DrawerBackdrop,
	DrawerClose,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '../../../../src/components/keyframery/drawer'
import { Switch } from '../../../../src/opinionated/switch'
import {
	Tabs,
	TabsPanel,
	TabsPanels,
	TabsList,
	TabsTab,
} from '../../../../src/components/keyframery/tabs'

import { colorTokens, colorCategories, colorTokensByCategory, ColorTokenRow } from './color-editor'
import {
	controlShapeTokens,
	controlSizeTokens,
	FactorSliderRow,
	spacingTokens,
	borderWidthTokens,
	radiusTokens,
	typographySizeTokens,
	lineHeightTokens,
	letterSpacingTokens,
	opacityTokens,
	shadowDimensionTokens,
	shadowColorToken,
	containerTokens,
	allDimensionTokens,
	allStringTokens,
	DimensionSliderRow,
	StringTokenRow,
} from './spacing-editor'
import { FontSelectRow, fontCssVars, loadGoogleFont } from './typography-editor'
import { applyPresetStyles, presetOptions } from '../../presets'
import defaultPreset from '../../../../src/styles/presets/default.css?raw'
import { derivedColorAliases } from '../../../../src/styles/theme'
import { buildJsonSnapshot, JsonImportExport } from './json-import-export'

/* ------------------------------------------------------------------ */
/*  SectionHeader                                                       */
/* ------------------------------------------------------------------ */

function SectionHeader({ children }: { children: React.ReactNode }) {
	return (
		<span className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">
			{children}
		</span>
	)
}

/* ------------------------------------------------------------------ */
/*  PaletteIcon                                                         */
/* ------------------------------------------------------------------ */

function PaletteIcon({ className }: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			aria-hidden="true"
		>
			<title>Palette</title>
			<circle cx="13.5" cy="6.5" r="0.5" fill="currentColor" />
			<circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" />
			<circle cx="8.5" cy="7.5" r="0.5" fill="currentColor" />
			<circle cx="6.5" cy="12" r="0.5" fill="currentColor" />
			<path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
		</svg>
	)
}

/* ------------------------------------------------------------------ */
/*  TokenConfigPanel                                                    */
/* ------------------------------------------------------------------ */

const PRESET_STYLE_ID = 'composables-preset-overrides'
const derivedAliases = derivedColorAliases(
	defaultPreset,
	new Set(colorTokens.map(({ cssVar }) => cssVar)),
)

interface TokenConfigPanelProps {
	dark?: boolean
	onDarkChange?: (dark: boolean) => void
}

export function TokenConfigPanel({ dark, onDarkChange }: TokenConfigPanelProps = {}) {
	const [overrides, setOverrides] = React.useState<Record<string, string>>({})
	const [activePreset, setActivePreset] = React.useState<string>('default')
	const [jsonText, setJsonText] = React.useState('')
	const [colorRevision, refreshColors] = React.useReducer((revision: number) => revision + 1, 0)

	function applyOverride(cssVar: string, value: string) {
		document.documentElement.style.setProperty(cssVar, value)
		setOverrides((prev) => ({ ...prev, [cssVar]: value }))
	}

	function clearInlineOverrides() {
		for (const token of colorTokens) {
			document.documentElement.style.removeProperty(token.cssVar)
		}
		for (const token of allDimensionTokens) {
			document.documentElement.style.removeProperty(token.cssVar)
		}
		for (const token of allStringTokens) {
			document.documentElement.style.removeProperty(token.cssVar)
		}
		for (const v of fontCssVars) {
			document.documentElement.style.removeProperty(v)
		}
		setOverrides({})
		refreshColors()
	}

	function resetAll() {
		clearInlineOverrides()
		applyPresetStyles('default', PRESET_STYLE_ID)
		setActivePreset('default')
	}

	function applyPreset(presetKey: string) {
		clearInlineOverrides()
		const stylesheet = applyPresetStyles(presetKey, PRESET_STYLE_ID)
		setActivePreset(presetKey)

		const lightRule = Array.from(stylesheet?.cssRules ?? []).find(
			(rule): rule is CSSStyleRule => rule instanceof CSSStyleRule && rule.selectorText === ':root',
		)
		if (!lightRule) return

		const values = Object.fromEntries(
			Array.from(lightRule.style)
				.filter((name) => name.startsWith('--') && !derivedAliases.has(name))
				.map((name) => [name, lightRule.style.getPropertyValue(name).trim()]),
		)
		for (const name of fontCssVars) {
			const family = values[name]?.match(/^(['"])(.*?)\1/)?.[2]
			if (family) loadGoogleFont(family)
		}
		setOverrides(values)
	}

	function handleTabChange(value: string | null) {
		if (value === 'json') {
			setJsonText(JSON.stringify(buildJsonSnapshot(), null, 2))
		}
	}

	const overrideCount = Object.keys(overrides).length

	return (
		<Drawer side="right">
			<DrawerTrigger
				render={<button type="button" aria-label="Open token configuration" />}
				className="size-8"
			>
				<PaletteIcon className="size-4" />
			</DrawerTrigger>
			<DrawerBackdrop />
			<DrawerContent className="[--drawer-width:400px] sm:[--drawer-width:440px]">
				<DrawerClose className="absolute right-3 top-3">Close</DrawerClose>
				<DrawerHeader className="px-4 pt-4 pb-2 pr-24">
					<DrawerTitle className="flex items-center justify-between">
						<span>Token Config</span>
						{overrideCount > 0 && (
							<Button variant="ghost" size="sm" className="h-7 text-xs" onClick={resetAll}>
								Reset all ({overrideCount})
							</Button>
						)}
					</DrawerTitle>
				</DrawerHeader>

				{onDarkChange !== undefined && (
					<div className="px-4 pb-3">
						<span className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
							Display
						</span>
						<div className="flex gap-4">
							{onDarkChange !== undefined && (
								<div className="flex gap-2 items-center">
									<Switch
										checked={dark ?? false}
										onCheckedChange={onDarkChange}
										aria-label="Toggle dark mode"
									/>
									<span className="text-xs text-muted-foreground">Dark mode</span>
								</div>
							)}
						</div>
					</div>
				)}

				<div className="px-4 pb-2">
					<span className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">
						Preset
					</span>
					<select
						aria-label="Preset"
						value={activePreset}
						onChange={(e) => applyPreset(e.target.value)}
						className="w-full h-7 rounded-md border border-stroke bg-transparent px-2 text-xs text-foreground outline-none focus:ring-[length:var(--border-width)] focus:ring-focus"
					>
						<option value="default">Default</option>
						{presetOptions
							.filter(({ value }) => value !== 'default')
							.map(({ value, title }) => (
								<option key={value} value={value}>
									{title}
								</option>
							))}
					</select>
				</div>

				<Tabs
					defaultValue="visual"
					className="flex flex-col h-[calc(100vh-14rem)]"
					onValueChange={handleTabChange}
				>
					<TabsList className="mx-4 mb-2" aria-label="Token editor view">
						<TabsTab value="visual">Visual</TabsTab>
						<TabsTab value="json">JSON</TabsTab>
					</TabsList>

					<TabsPanels className="min-h-0 flex flex-col mt-0">
						<TabsPanel value="visual" className="flex-1 overflow-hidden mt-0">
							<ScrollArea className="h-full">
								<div className="px-4 pb-6">
									<div className="mb-4">
										<SectionHeader>Spacing</SectionHeader>
										<div className="flex flex-col gap-1">
											{spacingTokens.map((t) => (
												<DimensionSliderRow key={t.cssVar} token={t} onApply={applyOverride} />
											))}
										</div>
									</div>
									<Separator className="my-3" />

									<div className="mb-4">
										<SectionHeader>Border Width</SectionHeader>
										<div className="flex flex-col gap-1">
											{borderWidthTokens.map((t) => (
												<DimensionSliderRow key={t.cssVar} token={t} onApply={applyOverride} />
											))}
										</div>
									</div>
									<Separator className="my-3" />

									<div className="mb-4">
										<SectionHeader>Border Radius</SectionHeader>
										<div className="flex flex-col gap-1">
											{radiusTokens.map((t) => (
												<DimensionSliderRow key={t.cssVar} token={t} onApply={applyOverride} />
											))}
										</div>
									</div>
									<Separator className="my-3" />

									<div className="mb-4">
										<SectionHeader>Control Shape</SectionHeader>
										<div className="flex flex-col gap-1">
											{controlShapeTokens.map((t) => (
												<FactorSliderRow key={t.cssVar} token={t} onApply={applyOverride} />
											))}
										</div>
									</div>
									<Separator className="my-3" />

									<div className="mb-4">
										<SectionHeader>Control Size</SectionHeader>
										<div className="flex flex-col gap-1">
											{controlSizeTokens.map((t) => (
												<FactorSliderRow key={t.cssVar} token={t} onApply={applyOverride} />
											))}
										</div>
									</div>
									<Separator className="my-3" />

									<div className="mb-4">
										<SectionHeader>Font Size</SectionHeader>
										<div className="flex flex-col gap-1">
											{typographySizeTokens.map((t) => (
												<DimensionSliderRow key={t.cssVar} token={t} onApply={applyOverride} />
											))}
										</div>
									</div>
									<Separator className="my-3" />

									<div className="mb-4">
										<SectionHeader>Line Height</SectionHeader>
										<div className="flex flex-col gap-1">
											{lineHeightTokens.map((t) => (
												<DimensionSliderRow key={t.cssVar} token={t} onApply={applyOverride} />
											))}
										</div>
									</div>
									<Separator className="my-3" />

									<div className="mb-4">
										<SectionHeader>Letter Spacing</SectionHeader>
										<div className="flex flex-col gap-1">
											{letterSpacingTokens.map((t) => (
												<DimensionSliderRow key={t.cssVar} token={t} onApply={applyOverride} />
											))}
										</div>
									</div>
									<Separator className="my-3" />

									<div className="mb-4">
										<SectionHeader>Font Family</SectionHeader>
										<div className="flex flex-col gap-1">
											<FontSelectRow
												label="Sans / body (--font-sans)"
												cssVar="--font-sans"
												onApply={applyOverride}
											/>
											<FontSelectRow
												label="Heading (--font-heading)"
												cssVar="--font-heading"
												onApply={applyOverride}
											/>
											<FontSelectRow
												label="Brand (--font-brand)"
												cssVar="--font-brand"
												onApply={applyOverride}
											/>
										</div>
									</div>
									<Separator className="my-3" />

									<div className="mb-4">
										<SectionHeader>Shadow</SectionHeader>
										<div className="flex flex-col gap-1">
											{shadowDimensionTokens.map((t) => (
												<DimensionSliderRow key={t.cssVar} token={t} onApply={applyOverride} />
											))}
											<StringTokenRow token={shadowColorToken} onApply={applyOverride} />
										</div>
									</div>
									<Separator className="my-3" />

									<div className="mb-4">
										<SectionHeader>Opacity</SectionHeader>
										<div className="flex flex-col gap-1">
											{opacityTokens.map((t) => (
												<DimensionSliderRow key={t.cssVar} token={t} onApply={applyOverride} />
											))}
										</div>
									</div>
									<Separator className="my-3" />

									<div className="mb-4">
										<SectionHeader>Container Breakpoints</SectionHeader>
										<div className="flex flex-col gap-1">
											{containerTokens.map((t) => (
												<DimensionSliderRow key={t.cssVar} token={t} onApply={applyOverride} />
											))}
										</div>
									</div>
									<Separator className="my-3" />

									{colorCategories.map((cat) => (
										<div key={cat} className="mb-4">
											<SectionHeader>{cat}</SectionHeader>
											<div className="flex flex-col gap-0">
												{(colorTokensByCategory[cat] ?? []).map(
													(token: import('./types').FlatToken) => (
														<ColorTokenRow
															key={`${token.cssVar}-${colorRevision}-${dark}`}
															token={token}
															onApply={applyOverride}
														/>
													),
												)}
											</div>
										</div>
									))}
								</div>
							</ScrollArea>
						</TabsPanel>

						<TabsPanel value="json" className="flex-1 overflow-hidden mt-0 px-4">
							<JsonImportExport
								jsonText={jsonText}
								setJsonText={setJsonText}
								setOverrides={setOverrides}
								resetAll={resetAll}
							/>
						</TabsPanel>
					</TabsPanels>
				</Tabs>
			</DrawerContent>
		</Drawer>
	)
}
