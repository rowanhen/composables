import React from "react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "lucide-react";
import { VStack } from "@/components/ui/stack";
import { Typography } from "@/components/ui/typography";
import {
	TeamCard,
	TeamCardAvatar,
	TeamCardBio,
	TeamCardName,
	TeamCardRole,
	TeamCardSocialLink,
	TeamCardSocials,
	TeamSection,
} from "@/components/ui-brand";

const intensities = ["subtle", "standard", "bold"] as const;

const members = [
	{
		name: "Sophie Nguyen",
		role: "CEO & Co-founder",
		bio: "Building the future of design systems.",
		initials: "SN",
	},
	{
		name: "James Park",
		role: "CTO & Co-founder",
		bio: "Obsessed with developer experience.",
		initials: "JP",
	},
	{
		name: "Aisha Diallo",
		role: "Head of Design",
		bio: "Crafting beautiful, accessible UIs.",
		initials: "AD",
	},
];

export function TeamShowcase() {
	return (
		<VStack gap={2}>
			<Typography variant="heading-200">Team</Typography>
			<VStack gap={6}>
				{intensities.map((intensity) => (
					<VStack key={intensity} gap={1}>
						<Typography variant="caption-100">{intensity}</Typography>
						<TeamSection columns={3}>
							{members.map((member) => (
								<TeamCard key={member.name} intensity={intensity}>
									<TeamCardAvatar fallback={member.initials} />
									<TeamCardName>{member.name}</TeamCardName>
									<TeamCardRole>{member.role}</TeamCardRole>
									<TeamCardBio>{member.bio}</TeamCardBio>
									<TeamCardSocials>
										<TeamCardSocialLink href="#" aria-label="Twitter">
											<TwitterIcon />
										</TeamCardSocialLink>
										<TeamCardSocialLink href="#" aria-label="LinkedIn">
											<LinkedinIcon />
										</TeamCardSocialLink>
										<TeamCardSocialLink href="#" aria-label="GitHub">
											<GithubIcon />
										</TeamCardSocialLink>
									</TeamCardSocials>
								</TeamCard>
							))}
						</TeamSection>
					</VStack>
				))}
			</VStack>
		</VStack>
	);
}
