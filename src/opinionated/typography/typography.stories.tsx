import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Button, Typography, type TypographyVariant } from '@leitware/composables'
import { Gallery, Group } from '../../_storybook/gallery'

const meta = { title: 'Foundations/Typography' } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

const families = {
	Display: ['hero-100', 'heading-600', 'heading-400', 'heading-200', 'brand-heading-200'],
	Body: ['body-300', 'body-200', 'body-100', 'brand-body-200'],
	Supporting: ['label-200', 'label-100', 'brand-label-100', 'caption-100'],
} satisfies Record<string, TypographyVariant[]>

export const Scale: Story = {
	render: () => (
		<Gallery>
			{Object.entries(families).map(([label, variants]) => (
				<Group key={label} label={label}>
					{variants.map((variant) => (
						<Typography
							key={variant}
							as={variant === 'hero-100' ? 'h1' : undefined}
							variant={variant}
						>
							{variant.charAt(0).toUpperCase() + variant.slice(1).replaceAll('-', ' ')}
						</Typography>
					))}
				</Group>
			))}
			<Typography variant="link-100" as="a" href="#storybook-root">
				Back to top
			</Typography>
		</Gallery>
	),
}

function RevealDemo() {
	const [revision, setRevision] = useState(0)
	return (
		<div className="flex max-w-sm flex-col items-start gap-4">
			<Button onClick={() => setRevision((current) => current + 1)}>Replay reveal</Button>
			<Typography key={revision} as="h2" variant="heading-300" motion="reveal" speed="slow">
				Your changes are ready
			</Typography>
			<Typography variant="body-200">
				The preview uses the active motion style and the typography of this preset.
			</Typography>
		</div>
	)
}

export const Reveal: Story = { render: () => <RevealDemo /> }
