#!/usr/bin/env node
/**
 * generate-tokens.mjs
 *
 * Reads W3C Design Token JSON files (light.json, dark.json, semantic.json)
 * and produces a tokens.css file with:
 *   - @theme inline { ... }   (Tailwind v4 theme tokens from light primitives)
 *   - :root { ... }           (light primitives + resolved semantics + shadcn compat)
 *   - .dark { ... }           (dark primitives + resolved semantics + shadcn compat)
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ---------------------------------------------------------------------------
// 1. Read source JSON
// ---------------------------------------------------------------------------
const lightTokens = JSON.parse(
  readFileSync(resolve(__dirname, "light.json"), "utf-8")
);
const darkTokens = JSON.parse(
  readFileSync(resolve(__dirname, "dark.json"), "utf-8")
);
const semanticTokens = JSON.parse(
  readFileSync(resolve(__dirname, "semantic.json"), "utf-8")
);

// ---------------------------------------------------------------------------
// 2. Flatten a W3C Design Token tree into { "neutral-50": "#FDFDFDFF", ... }
// ---------------------------------------------------------------------------
function flattenTokens(obj, prefix = "") {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}-${key}` : key;
    if (value && typeof value === "object" && "$value" in value) {
      // Leaf token — normalise the path to lowercase / kebab-case
      const cssName = path.toLowerCase().replace(/\s+/g, "-");
      result[cssName] = value.$value;
    } else if (value && typeof value === "object") {
      Object.assign(result, flattenTokens(value, path));
    }
  }
  return result;
}

// ---------------------------------------------------------------------------
// 3. Build a lookup from the *reference* path used inside {…} to the flat key.
//    Reference paths use dots:  "neutral.100", "Overlays.Black-Alpha.50"
//    Flat keys use dashes:      "neutral-100", "overlays-black-alpha-50"
// ---------------------------------------------------------------------------
function refPathToFlatKey(refPath) {
  return refPath.replace(/\./g, "-").toLowerCase().replace(/\s+/g, "-");
}

// ---------------------------------------------------------------------------
// 4. Resolve semantic tokens against a primitive palette → plain values
// ---------------------------------------------------------------------------
function resolveSemanticTokens(semanticFlat, primitiveFlat) {
  const resolved = {};
  for (const [key, rawValue] of Object.entries(semanticFlat)) {
    if (typeof rawValue === "string" && rawValue.startsWith("{") && rawValue.endsWith("}")) {
      const refPath = rawValue.slice(1, -1); // e.g. "neutral.100"
      const flatKey = refPathToFlatKey(refPath);
      const resolvedValue = primitiveFlat[flatKey];
      if (resolvedValue !== undefined) {
        resolved[key] = resolvedValue;
      } else {
        console.warn(`Warning: could not resolve reference "${rawValue}" (looked up "${flatKey}")`);
        resolved[key] = rawValue; // keep raw
      }
    } else {
      resolved[key] = rawValue;
    }
  }
  return resolved;
}

// ---------------------------------------------------------------------------
// 5. Format a flat object as indented CSS custom properties
// ---------------------------------------------------------------------------
function toCssVars(flat, indent = "  ") {
  return Object.entries(flat)
    .map(([k, v]) => `${indent}--${k}: ${v};`)
    .join("\n");
}

// ---------------------------------------------------------------------------
// 6. Build shadcn-compatible variables from resolved semantic tokens
// ---------------------------------------------------------------------------
function buildShadcnVars(resolvedSemantic) {
  const map = {
    background: "bg-default",
    foreground: "text-default",
    card: "bg-surface-default",
    "card-foreground": "text-default",
    popover: "bg-surface-default",
    "popover-foreground": "text-default",
    primary: "bg-fill-primary",
    "primary-foreground": "text-inverse",
    secondary: "bg-muted",
    "secondary-foreground": "text-default",
    muted: "bg-muted",
    "muted-foreground": "text-muted",
    accent: "bg-surface-hover",
    "accent-foreground": "text-default",
    destructive: "bg-fill-critical",
    border: "border-default",
    input: "border-secondary",
    ring: "border-focus",
    // Sidebar mappings
    "sidebar-background": "bg-default",
    "sidebar-foreground": "text-default",
    "sidebar-primary": "bg-fill-primary",
    "sidebar-primary-foreground": "text-inverse",
    "sidebar-accent": "bg-surface-hover",
    "sidebar-accent-foreground": "text-default",
    "sidebar-border": "border-default",
    "sidebar-ring": "border-focus",
    // Chart tokens
    "chart-1": "chart-1",
    "chart-2": "chart-2",
    "chart-3": "chart-3",
    "chart-4": "chart-4",
    "chart-5": "chart-5",
  };

  const vars = {};
  for (const [shadcnName, semanticKey] of Object.entries(map)) {
    const value = resolvedSemantic[semanticKey];
    if (value !== undefined) {
      vars[shadcnName] = value;
    } else {
      console.warn(`Warning: shadcn mapping "${shadcnName}" → "${semanticKey}" not found in semantic tokens`);
    }
  }
  return vars;
}

// ---------------------------------------------------------------------------
// 7. Main
// ---------------------------------------------------------------------------
const lightFlat = flattenTokens(lightTokens);
const darkFlat = flattenTokens(darkTokens);
const semanticFlat = flattenTokens(semanticTokens);

const lightSemantic = resolveSemanticTokens(semanticFlat, lightFlat);
const darkSemantic = resolveSemanticTokens(semanticFlat, darkFlat);

const lightShadcn = buildShadcnVars(lightSemantic);
const darkShadcn = buildShadcnVars(darkSemantic);

// Build output
const css = `/* ==========================================================================
 * Design Tokens — auto-generated by generate-tokens.mjs
 * DO NOT EDIT BY HAND.  Re-run the script after changing the JSON sources.
 * ========================================================================== */

/* ---------- Tailwind v4 theme registration (primitive palette) ---------- */
@theme inline {
${toCssVars(lightFlat)}
}

/* ---------- Light mode (default) ---------- */
:root {
  --radius: 0.5rem;

  /* Primitive palette */
${toCssVars(lightFlat)}

  /* Semantic tokens (resolved) */
${toCssVars(lightSemantic)}

  /* shadcn / ui compatibility */
${toCssVars(lightShadcn)}
}

/* ---------- Dark mode ---------- */
.dark {
  /* Primitive palette */
${toCssVars(darkFlat)}

  /* Semantic tokens (resolved) */
${toCssVars(darkSemantic)}

  /* shadcn / ui compatibility */
${toCssVars(darkShadcn)}
}
`;

// Write to both output locations
const outputs = [
  resolve(__dirname, "tokens.css"),
  resolve(__dirname, "../../../showcase/src/styles/tokens.css"),
];

for (const outPath of outputs) {
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, css, "utf-8");
  console.log(`Wrote ${outPath}`);
}
