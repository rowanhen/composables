import React from "react";
import { VStack } from "@/components/ui/stack";
import { Typography } from "@/components/ui/typography";
import {
	TestimonialAuthor,
	TestimonialAvatar,
	TestimonialCard,
	TestimonialName,
	TestimonialQuote,
	TestimonialRole,
	TestimonialSection,
} from "@/components/ui-brand";

const intensities = ["subtle", "standard", "bold"] as const;

const testimonials = [
	{
		quote: "This design system has saved us weeks of work. Every component just works.",
		name: "Sarah Johnson",
		role: "CTO, Acme Corp",
		fallback: "SJ",
	},
	{
		quote: "Switching presets is like magic. One click and the whole product feels different.",
		name: "Marcus Klein",
		role: "Design Lead, StartupCo",
		fallback: "MK",
	},
	{
		quote: "Token-driven theming is the future. This library nails the developer experience.",
		name: "Ana Lima",
		role: "Frontend Eng, DevCo",
		fallback: "AL",
	},
];

export function TestimonialShowcase() {
	return (
		<VStack gap={2}>
			<Typography variant="heading-200">Testimonials</Typography>
			<VStack gap={6}>
				{intensities.map((intensity) => (
					<VStack key={intensity} gap={2}>
						<Typography variant="caption-100">
							{intensity} — grid
						</Typography>
						<TestimonialSection layout="grid">
							{testimonials.map((t) => (
								<TestimonialCard key={t.name} intensity={intensity}>
									<TestimonialQuote>{t.quote}</TestimonialQuote>
									<TestimonialAuthor>
										<TestimonialAvatar fallback={t.fallback} />
										<VStack gap={0}>
											<TestimonialName>{t.name}</TestimonialName>
											<TestimonialRole>{t.role}</TestimonialRole>
										</VStack>
									</TestimonialAuthor>
								</TestimonialCard>
							))}
						</TestimonialSection>
					</VStack>
				))}
				<VStack gap={2}>
					<Typography variant="caption-100">masonry layout</Typography>
					<TestimonialSection layout="masonry">
						{testimonials.map((t) => (
							<TestimonialCard key={t.name} intensity="standard">
								<TestimonialQuote>{t.quote}</TestimonialQuote>
								<TestimonialAuthor>
									<TestimonialAvatar fallback={t.fallback} />
									<VStack gap={0}>
										<TestimonialName>{t.name}</TestimonialName>
										<TestimonialRole>{t.role}</TestimonialRole>
									</VStack>
								</TestimonialAuthor>
							</TestimonialCard>
						))}
					</TestimonialSection>
				</VStack>
			</VStack>
		</VStack>
	);
}
