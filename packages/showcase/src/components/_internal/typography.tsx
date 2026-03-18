import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const typographyVariants = cva("", {
	variants: {
		variant: {
			// Hero variants - brand font, 700, tighter letter-spacing, line-height 1
			"hero-100":
				"font-brand font-bold text-4xl leading-none tracking-tighter",
			"hero-200":
				"font-brand font-bold text-5xl leading-none tracking-tighter",
			"hero-300":
				"font-brand font-bold text-6xl leading-none tracking-tighter",
			"hero-400":
				"font-brand font-bold text-7xl leading-none tracking-tighter",

			// Heading variants - heading font, 500, normal letter-spacing
			"heading-100": "font-heading font-medium text-sm tracking-normal",
			"heading-200": "font-heading font-medium text-base tracking-normal",
			"heading-300": "font-heading font-medium text-xl tracking-normal",
			"heading-400": "font-heading font-medium text-2xl tracking-normal",
			"heading-500": "font-heading font-medium text-3xl tracking-normal",
			"heading-600": "font-heading font-medium text-4xl tracking-normal",

			// Brand heading variants - brand font, 700, tight letter-spacing
			"brand-heading-100": "font-brand font-bold text-sm tracking-tight",
			"brand-heading-200": "font-brand font-bold text-base tracking-tight",
			"brand-heading-300": "font-brand font-bold text-xl tracking-tight",
			"brand-heading-400": "font-brand font-bold text-2xl tracking-tight",
			"brand-heading-500": "font-brand font-bold text-3xl tracking-tight",
			"brand-heading-600": "font-brand font-bold text-4xl tracking-tight",

			// Body variants - sans font, 400, normal letter-spacing
			"body-100": "font-sans font-normal text-sm tracking-normal",
			"body-200": "font-sans font-normal text-base tracking-normal",
			"body-300": "font-sans font-normal text-lg tracking-normal",

			// Brand body variants - brand font, 700
			"brand-body-100": "font-brand font-bold text-sm tracking-normal",
			"brand-body-200": "font-brand font-bold text-base tracking-normal",
			"brand-body-300": "font-brand font-bold text-lg tracking-normal",

			// Label variants - sans font, 500, wider letter-spacing
			"label-100":
				"font-sans font-medium text-2xs leading-none tracking-wider uppercase",
			"label-200":
				"font-sans font-medium text-base leading-none tracking-wider uppercase",

			// Brand label variants - brand font, 700, wider letter-spacing
			"brand-label-100":
				"font-brand font-bold text-2xs leading-none tracking-wider uppercase",
			"brand-label-200":
				"font-brand font-bold text-base leading-none tracking-wider uppercase",

			// Caption variant - sans font, 400
			"caption-100":
				"font-sans font-normal text-xs tracking-normal text-muted-foreground",

			// Link variants - sans font, 500, underline
			"link-100": "font-sans font-medium text-sm tracking-normal underline",
			"link-200":
				"font-sans font-medium text-base tracking-normal underline",
		},
	},
	defaultVariants: {
		variant: "body-200",
	},
});

type TypographyVariant = NonNullable<
	VariantProps<typeof typographyVariants>["variant"]
>;

type PolymorphicElement =
	| "h1"
	| "h2"
	| "h3"
	| "h4"
	| "h5"
	| "h6"
	| "p"
	| "span"
	| "div"
	| "label"
	| "a";

const defaultElementMap: Record<string, PolymorphicElement> = {
	hero: "h1",
	heading: "p",
	"brand-heading": "p",
	body: "p",
	"brand-body": "p",
	label: "span",
	"brand-label": "span",
	caption: "span",
	link: "span",
};

function getDefaultElement(variant: TypographyVariant): PolymorphicElement {
	// Match the longest prefix: e.g. "brand-heading" before "brand"
	const parts = variant.split("-");
	for (let i = parts.length - 1; i >= 1; i--) {
		const prefix = parts.slice(0, i).join("-");
		if (prefix in defaultElementMap) {
			return defaultElementMap[prefix];
		}
	}
	return defaultElementMap[parts[0]] || "p";
}

type TypographyProps<T extends PolymorphicElement = "p"> = {
	variant: TypographyVariant;
	as?: T;
	className?: string;
	children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

function Typography<T extends PolymorphicElement = "p">({
	variant,
	as,
	className,
	children,
	...props
}: TypographyProps<T>) {
	const Component = as || getDefaultElement(variant);

	return React.createElement(
		Component,
		{
			"data-slot": "typography",
			className: cn(typographyVariants({ variant }), className),
			...props,
		},
		children,
	);
}

export { Typography, typographyVariants };
export type { TypographyVariant, TypographyProps };
