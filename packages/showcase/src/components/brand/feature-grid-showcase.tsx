import React from "react";
import {
	BarChart3Icon,
	Globe2Icon,
	LayersIcon,
	PaletteIcon,
	ShieldCheckIcon,
	ZapIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { VStack } from "@/components/ui/stack";
import { Typography } from "@/components/ui/typography";
import {
	FeatureGrid,
	FeatureGridDescription,
	FeatureGridIcon,
	FeatureGridItem,
	FeatureGridTitle,
	FeatureRow,
	FeatureRowContent,
	FeatureRowMedia,
} from "@/components/ui-brand";

const gridFeatures = [
	{ icon: <PaletteIcon />, title: "Token-Driven", desc: "CSS variables power every visual decision." },
	{ icon: <LayersIcon />, title: "Composable", desc: "Mix sub-components freely." },
	{ icon: <ZapIcon />, title: "Fast", desc: "Zero runtime overhead — pure CSS." },
	{ icon: <ShieldCheckIcon />, title: "Accessible", desc: "WAI-ARIA out of the box." },
	{ icon: <BarChart3Icon />, title: "Analytics", desc: "Built-in usage insights." },
	{ icon: <Globe2Icon />, title: "Global", desc: "i18n-ready from day one." },
];

export function FeatureGridShowcase() {
	return (
		<VStack gap={2}>
			<Typography variant="heading-200">Feature Grid</Typography>
			<VStack gap={6}>
				<VStack gap={1}>
					<Typography variant="caption-100">grid layout — standard</Typography>
					<FeatureGrid layout="grid" intensity="standard">
						{gridFeatures.map((f) => (
							<FeatureGridItem key={f.title} intensity="standard">
								<FeatureGridIcon>{f.icon}</FeatureGridIcon>
								<FeatureGridTitle>{f.title}</FeatureGridTitle>
								<FeatureGridDescription>{f.desc}</FeatureGridDescription>
							</FeatureGridItem>
						))}
					</FeatureGrid>
				</VStack>

				<VStack gap={1}>
					<Typography variant="caption-100">grid layout — bold</Typography>
					<FeatureGrid layout="grid" intensity="bold">
						{gridFeatures.slice(0, 3).map((f) => (
							<FeatureGridItem key={f.title} intensity="bold">
								<FeatureGridIcon>{f.icon}</FeatureGridIcon>
								<FeatureGridTitle>{f.title}</FeatureGridTitle>
								<FeatureGridDescription>{f.desc}</FeatureGridDescription>
							</FeatureGridItem>
						))}
					</FeatureGrid>
				</VStack>

				<VStack gap={1}>
					<Typography variant="caption-100">bento layout</Typography>
					<FeatureGrid layout="bento" intensity="standard">
						<FeatureGridItem intensity="standard" span={2} rowSpan={2}>
							<FeatureGridIcon><PaletteIcon /></FeatureGridIcon>
							<FeatureGridTitle className="text-base">Token-Driven Design</FeatureGridTitle>
							<FeatureGridDescription className="text-sm">
								A single token change propagates through your entire UI.
								Build once, theme infinitely with CSS custom properties.
							</FeatureGridDescription>
						</FeatureGridItem>
						<FeatureGridItem intensity="bold" span={2}>
							<FeatureGridIcon><ZapIcon /></FeatureGridIcon>
							<FeatureGridTitle>Lightning Fast</FeatureGridTitle>
							<FeatureGridDescription>Zero runtime overhead.</FeatureGridDescription>
						</FeatureGridItem>
						<FeatureGridItem intensity="standard" span={1}>
							<FeatureGridIcon><ShieldCheckIcon /></FeatureGridIcon>
							<FeatureGridTitle>Accessible</FeatureGridTitle>
							<FeatureGridDescription>WAI-ARIA patterns.</FeatureGridDescription>
						</FeatureGridItem>
						<FeatureGridItem intensity="subtle" span={1}>
							<FeatureGridIcon><Globe2Icon /></FeatureGridIcon>
							<FeatureGridTitle>Global</FeatureGridTitle>
							<FeatureGridDescription>i18n-ready.</FeatureGridDescription>
						</FeatureGridItem>
					</FeatureGrid>
				</VStack>

				<VStack gap={1}>
					<Typography variant="caption-100">alternating rows</Typography>
					<FeatureGrid layout="alternating">
						<FeatureRow reverse={false}>
							<FeatureRowContent>
								<FeatureGridTitle className="text-base">
									Design tokens that scale
								</FeatureGridTitle>
								<FeatureGridDescription className="text-sm">
									A single token change propagates through your entire UI.
									Build once, theme infinitely.
								</FeatureGridDescription>
								<Button variant="brand" className="self-start mt-2">
									Learn more
								</Button>
							</FeatureRowContent>
							<FeatureRowMedia className="bg-gradient-to-br from-surface-brand to-surface-emphasis" />
						</FeatureRow>
						<FeatureRow reverse>
							<FeatureRowContent>
								<FeatureGridTitle className="text-base">
									6 presets, infinite variations
								</FeatureGridTitle>
								<FeatureGridDescription className="text-sm">
									Default, Editorial, Brutalist, Soft, Swiss, Midnight —
									pick your vibe and ship.
								</FeatureGridDescription>
								<Button variant="brand" className="self-start mt-2">
									Explore presets
								</Button>
							</FeatureRowContent>
							<FeatureRowMedia className="bg-gradient-to-br from-surface-info to-surface-emphasis" />
						</FeatureRow>
					</FeatureGrid>
				</VStack>
			</VStack>
		</VStack>
	);
}
