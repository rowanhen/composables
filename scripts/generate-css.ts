import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

interface TokenValue {
  $type: "color";
  $value: string;
}

interface TokenGroup {
  [key: string]: TokenValue | TokenGroup;
}

type Tokens = TokenGroup;

function isTokenValue(obj: unknown): obj is TokenValue {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "$type" in obj &&
    "$value" in obj
  );
}

/**
 * Flattens a nested token object into CSS variable declarations.
 * e.g., { neutral: { "50": { $value: "#FFF" } } } -> { "--neutral-50": "#FFF" }
 */
function flattenTokens(tokens: Tokens, prefix = ""): Map<string, string> {
  const result = new Map<string, string>();

  for (const [key, value] of Object.entries(tokens)) {
    const cssKey = prefix ? `${prefix}-${key}` : key;

    if (isTokenValue(value)) {
      const varName = `--${cssKey.toLowerCase().replace(/\./g, "-").replace(/\s+/g, "-")}`;
      result.set(varName, value.$value);
    } else if (typeof value === "object" && value !== null) {
      const nested = flattenTokens(value as TokenGroup, cssKey);
      for (const [nestedKey, nestedValue] of nested) {
        result.set(nestedKey, nestedValue);
      }
    }
  }

  return result;
}

/**
 * Converts a token reference like "{neutral.1000}" to "var(--neutral-1000)"
 */
function convertTokenReference(value: string): string {
  const refMatch = value.match(/^\{(.+)\}$/);
  if (refMatch) {
    const tokenPath = refMatch[1];
    const varName = `--${tokenPath.toLowerCase().replace(/\./g, "-").replace(/\s+/g, "-")}`;
    return `var(${varName})`;
  }
  return value;
}

/**
 * Flattens semantic tokens and converts references to var() syntax
 */
function flattenSemanticTokens(tokens: Tokens, prefix = ""): Map<string, string> {
  const result = new Map<string, string>();

  for (const [key, value] of Object.entries(tokens)) {
    const cssKey = prefix ? `${prefix}-${key}` : key;

    if (isTokenValue(value)) {
      const varName = `--${cssKey.toLowerCase().replace(/\./g, "-").replace(/\s+/g, "-")}`;
      const cssValue = convertTokenReference(value.$value);
      result.set(varName, cssValue);
    } else if (typeof value === "object" && value !== null) {
      const nested = flattenSemanticTokens(value as TokenGroup, cssKey);
      for (const [nestedKey, nestedValue] of nested) {
        result.set(nestedKey, nestedValue);
      }
    }
  }

  return result;
}

/**
 * Generates CSS variable declarations from a token map
 */
function generateCssBlock(tokens: Map<string, string>, indent = "  "): string {
  const lines: string[] = [];
  for (const [varName, value] of tokens) {
    lines.push(`${indent}${varName}: ${value};`);
  }
  return lines.join("\n");
}

/**
 * Shadcn variable names mapped to our semantic tokens.
 * These are the variables that shadcn components expect.
 */
const SHADCN_MAPPINGS: Record<string, string> = {
  // Page-level
  "background": "bg-surface-default",
  "foreground": "bg-fill-secondary",

  // Card
  "card": "bg-fill-default",
  "card-foreground": "bg-fill-secondary",

  // Popover
  "popover": "bg-fill-default",
  "popover-foreground": "bg-fill-secondary",

  // Primary
  "primary": "bg-fill-primary",
  "primary-foreground": "bg-fill-secondary-inverse",

  // Secondary
  "secondary": "bg-muted",
  "secondary-foreground": "bg-fill-secondary",

  // Muted
  "muted": "bg-muted",
  "muted-foreground": "text-muted",

  // Accent
  "accent": "bg-surface-hover",
  "accent-foreground": "bg-fill-secondary",

  // Destructive
  "destructive": "bg-fill-critical",

  // Border/Input/Ring
  "border": "border-default",
  "input": "border-secondary",
  "ring": "border-focus",

  // Sidebar
  "sidebar": "bg-surface-default",
  "sidebar-foreground": "bg-fill-secondary",
  "sidebar-primary": "bg-fill-primary",
  "sidebar-primary-foreground": "bg-fill-secondary-inverse",
  "sidebar-accent": "bg-surface-hover",
  "sidebar-accent-foreground": "bg-fill-secondary",
  "sidebar-border": "border-default",
  "sidebar-ring": "border-focus",
};

/**
 * Generates shadcn CSS variables (both base and --color- prefixed for Tailwind)
 */
function generateShadcnVariables(indent = "  "): { base: string; tailwind: string } {
  const baseLines: string[] = [];
  const tailwindLines: string[] = [];

  for (const [shadcnName, semanticName] of Object.entries(SHADCN_MAPPINGS)) {
    // Base variables for direct CSS usage: --popover: var(--bg-fill-default);
    baseLines.push(`${indent}--${shadcnName}: var(--${semanticName});`);
    // Tailwind variables: --color-popover: var(--bg-fill-default);
    tailwindLines.push(`${indent}--color-${shadcnName}: var(--${semanticName});`);
  }

  return {
    base: baseLines.join("\n"),
    tailwind: tailwindLines.join("\n"),
  };
}

/**
 * Generates example Tailwind theme mappings for downstream consumers.
 * Only includes bg, icon, and border tokens - text colors use var() directly.
 * - --bg-fill-brand → --color-fill-brand → bg-fill-brand
 * - --icon-brand → --color-icon-brand → text-icon-brand / bg-icon-brand
 * - --border-brand → --color-stroke-brand → border-stroke-brand
 */
function generateExampleTailwindTheme(semantics: Map<string, string>, indent = "  "): string {
  const lines: string[] = [];

  for (const [varName] of semantics) {
    let tailwindName: string;
    let comment = "";

    if (varName.startsWith("--bg-")) {
      tailwindName = varName.replace("--bg-", "");
      comment = `/* bg-${tailwindName} */`;
    } else if (varName.startsWith("--text-")) {
      tailwindName = varName.replace("--text-", "type-");
      comment = `/* text-${tailwindName} */`;
    } else if (varName.startsWith("--border-")) {
      tailwindName = varName.replace("--border-", "stroke-");
      comment = `/* border-${tailwindName} */`;
    } else if (varName.startsWith("--icon-")) {
      tailwindName = varName.replace("--", "");
      comment = `/* text-${tailwindName}, bg-${tailwindName} */`;
    } else {
      // Skip --chart-* and other tokens
      continue;
    }

    lines.push(`${indent}--color-${tailwindName}: var(${varName}); ${comment}`);
  }

  return lines.join("\n");
}

function main() {
  const tokensDir = join(__dirname, "..", "src", "tokens");
  const srcDir = join(__dirname, "..", "src");

  // Read token files
  const lightTokens: Tokens = JSON.parse(
    readFileSync(join(tokensDir, "light.json"), "utf-8")
  );
  const darkTokens: Tokens = JSON.parse(
    readFileSync(join(tokensDir, "dark.json"), "utf-8")
  );
  const semanticTokens: Tokens = JSON.parse(
    readFileSync(join(tokensDir, "semantic.json"), "utf-8")
  );

  // Flatten tokens
  const lightPrimitives = flattenTokens(lightTokens);
  const darkPrimitives = flattenTokens(darkTokens);
  const semantics = flattenSemanticTokens(semanticTokens);

  // Generate shadcn variables
  const shadcn = generateShadcnVariables();

  // Generate example Tailwind theme
  const exampleTheme = generateExampleTailwindTheme(semantics);

  // Generate CSS
  const css = `/* Auto-generated from design tokens - DO NOT EDIT MANUALLY */
/* Run \`npm run generate:tokens\` to regenerate */

:root {
  /* Primitive tokens (light theme) */
${generateCssBlock(lightPrimitives)}

  /* Semantic tokens */
${generateCssBlock(semantics)}

  /* Shadcn compatibility variables */
  --radius: 0.5rem;
${shadcn.base}
}

.dark {
  /* Primitive tokens (dark theme) */
${generateCssBlock(darkPrimitives)}
}

@theme inline {
  /* Shadcn color utilities for Tailwind */
${shadcn.tailwind}
}
`;

  // Generate example CSS file for downstream consumers
  const exampleCss = `/**
 * Example Tailwind Theme Configuration
 *
 * Copy this file to your project and import it in your main CSS file.
 * This maps all semantic tokens from @mrshmllw/smores-internal-react to Tailwind utilities.
 *
 * Usage:
 *   1. Copy this file to your project (e.g., src/styles/smores-theme.css)
 *   2. Import it in your main CSS: @import "./smores-theme.css";
 *   3. Use utilities like: bg-fill-brand, text-type-brand, text-icon-critical, border-stroke-brand, etc.
 *
 * You can remove any tokens you don't need to reduce bundle size.
 */

@import "@mrshmllw/smores-internal-react/styles.css";

@theme inline {
${exampleTheme}
}
`;

  // Write outputs
  const outputPath = join(srcDir, "tokens.css");
  const examplePath = join(srcDir, "tailwind-theme.example.css");

  writeFileSync(outputPath, css, "utf-8");
  writeFileSync(examplePath, exampleCss, "utf-8");

  console.log(`Generated ${outputPath}`);
  console.log(`  - ${lightPrimitives.size} light primitive tokens`);
  console.log(`  - ${darkPrimitives.size} dark primitive tokens`);
  console.log(`  - ${semantics.size} semantic tokens`);
  console.log(`  - ${Object.keys(SHADCN_MAPPINGS).length} shadcn mappings`);
  console.log(`Generated ${examplePath}`);
}

main();
