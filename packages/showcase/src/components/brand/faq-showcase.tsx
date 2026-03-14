import React from "react";
import { VStack } from "@/components/ui/stack";
import { Typography } from "@/components/ui/typography";
import {
	FAQAccordion,
	FAQSection,
} from "@/components/ui-brand";

const intensities = ["subtle", "standard", "bold"] as const;

const faqItems = [
	{
		question: "How do I switch between presets?",
		answer:
			"Use the preset selector in the top-right panel. Switching presets updates all CSS variable tokens instantly, so every component reflects the new look.",
	},
	{
		question: "Can I use these components without Tailwind?",
		answer:
			"These components rely on Tailwind v4 for utility classes. Tailwind v4 is required, but the token layer is standard CSS custom properties so you could theoretically port them.",
	},
	{
		question: "Are the components accessible?",
		answer:
			"Yes — all interactive components are built on Base UI primitives which follow WAI-ARIA patterns and manage focus correctly.",
	},
	{
		question: "Can I customise the tokens?",
		answer:
			"Absolutely. Every preset is a plain object of CSS custom properties. Override any token in your global CSS or by passing a custom preset object.",
	},
];

export function FAQShowcase() {
	return (
		<VStack gap={2}>
			<Typography variant="heading-200">FAQ Section</Typography>
			<VStack gap={6}>
				{intensities.map((intensity) => (
					<VStack key={intensity} gap={1}>
						<Typography variant="caption-100">
							{intensity} — single
						</Typography>
						<FAQSection intensity={intensity} layout="single">
							<FAQAccordion
								intensity={intensity}
								layout="single"
								items={faqItems.slice(0, 3)}
							/>
						</FAQSection>
					</VStack>
				))}
				<VStack gap={1}>
					<Typography variant="caption-100">
						two-col layout — items split across columns
					</Typography>
					<FAQSection intensity="standard" layout="two-col">
						<FAQAccordion
							intensity="standard"
							layout="two-col"
							items={faqItems}
						/>
					</FAQSection>
				</VStack>
				<VStack gap={1}>
					<Typography variant="caption-100">
						bold + two-col
					</Typography>
					<FAQSection intensity="bold" layout="two-col">
						<FAQAccordion
							intensity="bold"
							layout="two-col"
							items={faqItems}
						/>
					</FAQSection>
				</VStack>
			</VStack>
		</VStack>
	);
}
