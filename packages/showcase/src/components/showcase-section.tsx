// Showcase imports from _internal/ to demonstrate primitive components.
// In your app, always import from @/components/ui-opinionated/ instead.
import type React from 'react'
import { Spacer } from '@/components/_internal/spacer'
import { VStack } from '@/components/_internal/stack'
import { Typography } from '@/components/_internal/typography'

export function ShowcaseSection({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="scroll-mt-24" id={title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}>
      <VStack gap={2}>
        <Typography variant="heading-400" as="h2">
          {title}
        </Typography>
        {description && (
          <Typography variant="body-200" className="text-muted-foreground">
            {description}
          </Typography>
        )}
      </VStack>
      <Spacer size={6} />
      {children}
    </section>
  )
}

export function Swatch({
  label,
  bg,
  borderColor,
}: {
  label: string
  bg?: string
  borderColor?: string
}) {
  return (
    <VStack gap={1} align="center">
      <div
        className="size-10 rounded-md border border-border/40"
        style={{
          backgroundColor: bg ? `var(${bg})` : undefined,
          borderColor: borderColor ? `var(${borderColor})` : undefined,
          borderWidth: borderColor ? 2 : undefined,
        }}
      />
      <Typography variant="caption-100" className="text-center truncate max-w-20 text-foreground">
        {label}
      </Typography>
    </VStack>
  )
}

export function ShowcaseGroup({
  label,
  children,
}: {
  label?: string
  children: React.ReactNode
}) {
  return (
    <VStack gap={2}>
      {label && <Typography variant="heading-200">{label}</Typography>}
      {children}
    </VStack>
  )
}

export function DemoBox({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-md bg-[var(--bg-fill-brand)] text-white flex items-center justify-center px-2 py-3 text-xs font-medium ${className ?? ''}`}
    >
      {children}
    </div>
  )
}
