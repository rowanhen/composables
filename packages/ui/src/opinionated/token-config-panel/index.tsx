import React from 'react'

import { Button } from '../../_internal/button'
import { ScrollArea } from '../../_internal/scroll-area'
import { Separator } from '../../_internal/separator'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../../_internal/sheet'
import { HStack, VStack } from '../../_internal/stack'
import { Switch } from '../../_internal/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../_internal/tabs'
import { Typography } from '../../_internal/typography'

import { colorTokens, colorCategories, colorTokensByCategory, ColorTokenRow } from './color-editor'
import {
  spacingTokens,
  borderWidthTokens,
  radiusTokens,
  typographySizeTokens,
  lineHeightTokens,
  letterSpacingTokens,
  opacityTokens,
  shadowDimensionTokens,
  shadowColorToken,
  dropdownOffsetTokens,
  overlayOffsetTokens,
  containerTokens,
  allDimensionTokens,
  allStringTokens,
  DimensionSliderRow,
  StringTokenRow,
} from './spacing-editor'
import { FontSelectRow, fontCssVars, loadGoogleFont } from './typography-editor'
import { presets, injectPresetStyle, removePresetStyle } from './preset-manager'
import { buildJsonSnapshot, JsonImportExport } from './json-import-export'

/* ------------------------------------------------------------------ */
/*  SectionHeader                                                       */
/* ------------------------------------------------------------------ */

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      variant="caption-100"
      className="text-muted-foreground uppercase tracking-wider mb-1 block"
    >
      {children}
    </Typography>
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

interface TokenConfigPanelProps {
  dark?: boolean
  onDarkChange?: (dark: boolean) => void
  grid?: boolean
  onGridChange?: (grid: boolean) => void
}

export function TokenConfigPanel({ dark, onDarkChange, grid, onGridChange }: TokenConfigPanelProps = {}) {
  const [overrides, setOverrides] = React.useState<Record<string, string>>({})
  const [activePreset, setActivePreset] = React.useState<string>('default')
  const [jsonText, setJsonText] = React.useState('')


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
  }

  function resetAll() {
    clearInlineOverrides()
    removePresetStyle()
    setActivePreset('default')
  }

  function applyPreset(presetKey: string) {
    clearInlineOverrides()
    removePresetStyle()
    setActivePreset(presetKey)

    const preset = presets[presetKey]
    if (!preset) return

    for (const v of fontCssVars) {
      const fontValue = preset.overrides[v]
      if (fontValue) {
        const match = fontValue.match(/^"([^"]+)"/)
        if (match) loadGoogleFont(match[1])
      }
    }

    injectPresetStyle(preset)
    setOverrides(preset.overrides)
  }

  function handleTabChange(value: string) {
    if (value === 'json') {
      setJsonText(JSON.stringify(buildJsonSnapshot(), null, 2))
    }
  }

  const overrideCount = Object.keys(overrides).length

  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" size="icon" className="size-8" />}>
        <PaletteIcon className="size-4" />
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-[400px] sm:max-w-[440px] px-0 pb-0 pt-14">
        <SheetHeader className="px-4 pt-4 pb-2">
          <SheetTitle className="flex items-center justify-between">
            <span>Token Config</span>
            {overrideCount > 0 && (
              <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={resetAll}>
                Reset all ({overrideCount})
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>

        {(onDarkChange !== undefined || onGridChange !== undefined) && (
          <div className="px-4 pb-3">
            <Typography
              variant="caption-100"
              className="text-muted-foreground uppercase tracking-wider mb-2 block"
            >
              Display
            </Typography>
            <HStack gap={4}>
              {onDarkChange !== undefined && (
                <HStack gap={2} align="center">
                  <Switch checked={dark ?? false} onCheckedChange={onDarkChange} aria-label="Toggle dark mode" />
                  <Typography variant="caption-100" className="text-muted-foreground">Dark mode</Typography>
                </HStack>
              )}
              {onGridChange !== undefined && (
                <HStack gap={2} align="center">
                  <Switch checked={grid ?? false} onCheckedChange={onGridChange} aria-label="Toggle grid overlay" />
                  <Typography variant="caption-100" className="text-muted-foreground">Grid</Typography>
                </HStack>
              )}
            </HStack>
          </div>
        )}

        <div className="px-4 pb-2">
          <Typography
            variant="caption-100"
            className="text-muted-foreground uppercase tracking-wider mb-1 block"
          >
            Preset
          </Typography>
          <select
            value={activePreset}
            onChange={(e) => applyPreset(e.target.value)}
            className="w-full h-7 rounded-md border border-stroke bg-transparent px-2 text-xs text-foreground outline-none focus:ring-[length:var(--border-width)] focus:ring-focus"
          >
            <option value="default">Default</option>
            {Object.entries(presets)
              .filter(([key]) => key !== 'default')
              .map(([key, preset]) => (
                <option key={key} value={key}>
                  {preset?.label ?? key}
                </option>
              ))}
          </select>
        </div>

        <Tabs
          defaultValue="visual"
          className="flex flex-col h-[calc(100vh-14rem)]"
          onValueChange={handleTabChange}
        >
          <TabsList className="mx-4 mb-2">
            <TabsTrigger value="visual">Visual</TabsTrigger>
            <TabsTrigger value="json">JSON</TabsTrigger>
          </TabsList>

          <TabsContent value="visual" className="flex-1 overflow-hidden mt-0">
            <ScrollArea className="h-full">
              <div className="px-4 pb-6">
                <div className="mb-4">
                  <SectionHeader>Spacing</SectionHeader>
                  <VStack gap={1}>
                    {spacingTokens.map((t) => (
                      <DimensionSliderRow key={t.cssVar} token={t} onApply={applyOverride} />
                    ))}
                  </VStack>
                </div>
                <Separator className="my-3" />

                <div className="mb-4">
                  <SectionHeader>Border Width</SectionHeader>
                  <VStack gap={1}>
                    {borderWidthTokens.map((t) => (
                      <DimensionSliderRow key={t.cssVar} token={t} onApply={applyOverride} />
                    ))}
                  </VStack>
                </div>
                <Separator className="my-3" />

                <div className="mb-4">
                  <SectionHeader>Border Radius</SectionHeader>
                  <VStack gap={1}>
                    {radiusTokens.map((t) => (
                      <DimensionSliderRow key={t.cssVar} token={t} onApply={applyOverride} />
                    ))}
                  </VStack>
                </div>
                <Separator className="my-3" />

                <div className="mb-4">
                  <SectionHeader>Font Size</SectionHeader>
                  <VStack gap={1}>
                    {typographySizeTokens.map((t) => (
                      <DimensionSliderRow key={t.cssVar} token={t} onApply={applyOverride} />
                    ))}
                  </VStack>
                </div>
                <Separator className="my-3" />

                <div className="mb-4">
                  <SectionHeader>Line Height</SectionHeader>
                  <VStack gap={1}>
                    {lineHeightTokens.map((t) => (
                      <DimensionSliderRow key={t.cssVar} token={t} onApply={applyOverride} />
                    ))}
                  </VStack>
                </div>
                <Separator className="my-3" />

                <div className="mb-4">
                  <SectionHeader>Letter Spacing</SectionHeader>
                  <VStack gap={1}>
                    {letterSpacingTokens.map((t) => (
                      <DimensionSliderRow key={t.cssVar} token={t} onApply={applyOverride} />
                    ))}
                  </VStack>
                </div>
                <Separator className="my-3" />

                <div className="mb-4">
                  <SectionHeader>Font Family</SectionHeader>
                  <VStack gap={1}>
                    <FontSelectRow label="Sans / body (--font-sans)" cssVar="--font-sans" onApply={applyOverride} />
                    <FontSelectRow label="Heading (--font-heading)" cssVar="--font-heading" onApply={applyOverride} />
                    <FontSelectRow label="Brand (--font-brand)" cssVar="--font-brand" onApply={applyOverride} />
                  </VStack>
                </div>
                <Separator className="my-3" />

                <div className="mb-4">
                  <SectionHeader>Shadow</SectionHeader>
                  <VStack gap={1}>
                    {shadowDimensionTokens.map((t) => (
                      <DimensionSliderRow key={t.cssVar} token={t} onApply={applyOverride} />
                    ))}
                    <StringTokenRow token={shadowColorToken} onApply={applyOverride} />
                  </VStack>
                </div>
                <Separator className="my-3" />

                <div className="mb-4">
                  <SectionHeader>Opacity</SectionHeader>
                  <VStack gap={1}>
                    {opacityTokens.map((t) => (
                      <DimensionSliderRow key={t.cssVar} token={t} onApply={applyOverride} />
                    ))}
                  </VStack>
                </div>
                <Separator className="my-3" />

                <div className="mb-4">
                  <SectionHeader>Container Breakpoints</SectionHeader>
                  <VStack gap={1}>
                    {containerTokens.map((t) => (
                      <DimensionSliderRow key={t.cssVar} token={t} onApply={applyOverride} />
                    ))}
                  </VStack>
                </div>
                <Separator className="my-3" />

                <div className="mb-4">
                  <SectionHeader>Positioning</SectionHeader>
                  <VStack gap={1}>
                    {dropdownOffsetTokens.map((t) => (
                      <DimensionSliderRow key={t.cssVar} token={t} onApply={applyOverride} />
                    ))}
                    {overlayOffsetTokens.map((t) => (
                      <DimensionSliderRow key={t.cssVar} token={t} onApply={applyOverride} />
                    ))}
                  </VStack>
                </div>
                <Separator className="my-3" />

                {colorCategories.map((cat) => (
                  <div key={cat} className="mb-4">
                    <SectionHeader>{cat}</SectionHeader>
                    <VStack gap={0}>
                      {(colorTokensByCategory[cat] ?? []).map((token: import('./types').FlatToken) => (
                        <ColorTokenRow key={token.cssVar} token={token} onApply={applyOverride} />
                      ))}
                    </VStack>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="json" className="flex-1 overflow-hidden mt-0 px-4">
            <JsonImportExport
              jsonText={jsonText}
              setJsonText={setJsonText}
              setOverrides={setOverrides}
              setActivePreset={setActivePreset}
              resetAll={resetAll}
            />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}
