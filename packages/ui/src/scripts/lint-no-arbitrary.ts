#!/usr/bin/env bun
/**
 * lint-no-arbitrary.ts
 *
 * Scans TSX/TSX files for Tailwind CSS arbitrary values (e.g. `rounded-[8px]`,
 * `text-[14px]`, `bg-[#ff0000]`, `w-[200px]`) and exits non-zero if any are found.
 *
 * Usage:
 *   bun scripts/lint-no-arbitrary.ts [dir]       # defaults to "src"
 *   bun scripts/lint-no-arbitrary.ts src/app
 *
 * Exits 0 if clean, 1 if violations found.
 *
 * Excludes:
 *   - CSS/SCSS/config files (only checks .tsx, .ts, .jsx, .js)
 *   - node_modules, .next, dist, build directories
 *   - Tailwind config files (tailwind.config.*)
 *   - Comments and string-only lines that look like config
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname, basename } from "node:path";

const TARGET_EXTENSIONS = new Set([".tsx", ".ts", ".jsx", ".js"]);
const SKIP_DIRS = new Set(["node_modules", ".next", "dist", "build", ".git"]);
const SKIP_FILE_PREFIXES = ["tailwind.config", "postcss.config", "vite.config"];

/**
 * Matches Tailwind arbitrary values in class names.
 * Pattern: word-chars followed by -[...] where [...] contains a value.
 * Examples matched: rounded-[8px], text-[14px], bg-[#ff0000], w-[200px], p-[1rem]
 * Examples NOT matched: group-[.open]:visible (Tailwind modifiers), [&>div]:flex
 */
const ARBITRARY_VALUE_RE =
  /(?<!\[&[^\]]*\])(?:^|[\s"'`{])([a-z][a-z0-9-]*-\[[^\]]+\])/gm;

/**
 * Some arbitrary patterns are legitimate Tailwind modifiers, not values.
 * Skip these: group-[...], peer-[...], data-[...], aria-[...], supports-[...],
 * [&...], has-[...], not-[...], in-[...], out-[...]
 */
const MODIFIER_PREFIXES = [
  "group-[",
  "peer-[",
  "data-[",
  "aria-[",
  "supports-[",
  "has-[",
  "not-[",
  "in-[",
  "out-[",
];

function isModifier(match: string): boolean {
  const trimmed = match.trim().replace(/^["'`{]\s*/, "");
  return MODIFIER_PREFIXES.some((prefix) => trimmed.startsWith(prefix));
}

function collectFiles(dir: string): string[] {
  const results: string[] = [];
  let entries: ReturnType<typeof readdirSync>;
  try {
    entries = readdirSync(dir);
  } catch {
    return results;
  }

  for (const entry of entries) {
    const fullPath = join(dir, entry);

    if (SKIP_DIRS.has(entry)) continue;
    if (SKIP_FILE_PREFIXES.some((p) => entry.startsWith(p))) continue;

    let stat: ReturnType<typeof statSync>;
    try {
      stat = statSync(fullPath);
    } catch {
      continue;
    }

    if (stat.isDirectory()) {
      results.push(...collectFiles(fullPath));
    } else if (TARGET_EXTENSIONS.has(extname(entry))) {
      results.push(fullPath);
    }
  }

  return results;
}

interface Violation {
  file: string;
  line: number;
  match: string;
  text: string;
}

function scanFile(filePath: string): Violation[] {
  const violations: Violation[] = [];
  const content = readFileSync(filePath, "utf-8");
  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Skip pure comment lines
    if (line.trimStart().startsWith("//") || line.trimStart().startsWith("*")) {
      continue;
    }

    let match: RegExpExecArray | null;
    ARBITRARY_VALUE_RE.lastIndex = 0;
    while ((match = ARBITRARY_VALUE_RE.exec(line)) !== null) {
      const captured = match[1];
      if (!isModifier(captured)) {
        violations.push({
          file: filePath,
          line: i + 1,
          match: captured,
          text: line.trim(),
        });
      }
    }
  }

  return violations;
}

// ── Main ──────────────────────────────────────────────────────────────

const targetDir = process.argv[2] || "src";
const files = collectFiles(targetDir);
const allViolations: Violation[] = [];

for (const file of files) {
  allViolations.push(...scanFile(file));
}

if (allViolations.length === 0) {
  console.log(`✓ No arbitrary Tailwind values found (scanned ${files.length} files)`);
  process.exit(0);
} else {
  console.error(
    `✗ Found ${allViolations.length} arbitrary Tailwind value(s) in ${files.length} files:\n`,
  );
  for (const v of allViolations) {
    console.error(`  ${v.file}:${v.line}`);
    console.error(`    ${v.match}`);
    console.error(`    ${v.text}\n`);
  }
  console.error(
    "Use design tokens or extend your Tailwind theme instead of arbitrary values.",
  );
  console.error(
    'Example: replace `text-[14px]` with `text-sm` or add a custom size to your theme.\n',
  );
  process.exit(1);
}
