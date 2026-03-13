import type React from 'react'
import { Spacer } from '../../src/components/ui/spacer'
import { VStack } from '../../src/components/ui/stack'
import { Typography } from '../../src/components/ui/typography'

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
