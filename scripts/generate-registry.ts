import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SRC = join(ROOT, "src");
const REGISTRY_DIR = join(ROOT, "registry");

interface RegistryItem {
  name: string;
  category: "ui" | "ui-extended" | "ui-product";
  srcPath: string;
  registryDependencies: string[];
  files: string[];
  npmDependencies: Record<string, string>;
}

/** Read package.json to get dependency versions */
function readPackageJson(): Record<string, string> {
  const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf-8"));
  return { ...pkg.dependencies, ...pkg.peerDependencies };
}

/** Recursively collect all .ts/.tsx files in a directory (excluding tests) */
function collectFiles(dir: string): string[] {
  const results: string[] = [];
  if (!existsSync(dir)) return results;

  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      results.push(...collectFiles(full));
    } else if (
      (entry.endsWith(".ts") || entry.endsWith(".tsx")) &&
      !entry.includes(".test.")
    ) {
      results.push(full);
    }
  }
  return results;
}

/** Determine component name from a file path */
function componentName(filePath: string, category: string): string {
  const rel = relative(join(SRC, "components", category), filePath);
  // For nested dirs like ui-product/car-finance/breadcrumb.tsx -> car-finance/breadcrumb
  return rel.replace(/\.(tsx|ts)$/, "");
}

/** Extract @/ imports from a source file */
function extractInternalImports(source: string): string[] {
  const matches: string[] = [];
  const importRegex = /from\s+['"]@\/([^'"]+)['"]/g;
  let match: RegExpExecArray | null;
  while ((match = importRegex.exec(source)) !== null) {
    matches.push(match[1]);
  }
  return matches;
}

/** Extract npm package imports from source */
function extractNpmImports(source: string): string[] {
  const matches: string[] = [];
  const importRegex = /from\s+['"]([^'"@./][^'"]*|@[^/]+\/[^'"]+)['"]/g;
  let match: RegExpExecArray | null;
  while ((match = importRegex.exec(source)) !== null) {
    // Get the package name (handle scoped packages)
    const importPath = match[1];
    const parts = importPath.split("/");
    const pkgName = importPath.startsWith("@")
      ? `${parts[0]}/${parts[1]}`
      : parts[0];
    // Skip react/react-dom - they're peer deps the consumer already has
    if (pkgName === "react" || pkgName === "react-dom") continue;
    if (!matches.includes(pkgName)) {
      matches.push(pkgName);
    }
  }
  return matches;
}

/** Resolve an internal import path to a category + name */
function resolveImport(importPath: string): {
  type: "component" | "hook" | "lib";
  category?: string;
  name: string;
  filePath: string;
} | null {
  // components/ui/button -> { type: "component", category: "ui", name: "button" }
  if (importPath.startsWith("components/")) {
    const parts = importPath.replace("components/", "").split("/");
    if (parts.length >= 2) {
      const category = parts[0]; // ui, ui-extended, ui-product
      const name = parts.slice(1).join("/"); // button, car-finance/breadcrumb
      return { type: "component", category, name, filePath: importPath };
    }
  }
  // hooks/use-numeric-input
  if (importPath.startsWith("hooks/")) {
    return {
      type: "hook",
      name: importPath.replace("hooks/", ""),
      filePath: importPath,
    };
  }
  // lib/utils
  if (importPath.startsWith("lib/")) {
    return {
      type: "lib",
      name: importPath.replace("lib/", ""),
      filePath: importPath,
    };
  }
  return null;
}

/** Ensure directory exists */
function ensureDir(dir: string): void {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

function main() {
  const allDeps = readPackageJson();
  const registry: RegistryItem[] = [];

  // Collect component files by category
  const categories = ["ui", "ui-extended", "ui-product"] as const;

  for (const category of categories) {
    const dir = join(SRC, "components", category);
    const files = collectFiles(dir);

    for (const filePath of files) {
      const name = componentName(filePath, category);
      const source = readFileSync(filePath, "utf-8");
      const srcPath = `components/${category}/${name}${filePath.endsWith(".tsx") ? ".tsx" : ".ts"}`;

      const internalImports = extractInternalImports(source);
      const npmImports = extractNpmImports(source);

      const registryDependencies: string[] = [];
      const filesDeps: string[] = [];

      for (const imp of internalImports) {
        const resolved = resolveImport(imp);
        if (!resolved) continue;

        if (resolved.type === "component") {
          // Reference as "category/name"
          const depName =
            resolved.category === category
              ? resolved.name
              : `${resolved.category}/${resolved.name}`;
          registryDependencies.push(depName);
        } else {
          // hooks or lib - track as file dependency
          filesDeps.push(`${resolved.filePath}.ts`);
        }
      }

      // Resolve npm dependency versions
      const npmDependencies: Record<string, string> = {};
      for (const pkg of npmImports) {
        if (allDeps[pkg]) {
          npmDependencies[pkg] = allDeps[pkg];
        }
      }

      registry.push({
        name,
        category,
        srcPath,
        registryDependencies: [...new Set(registryDependencies)],
        files: [...new Set(filesDeps)],
        npmDependencies,
      });
    }
  }

  // Also collect hooks and lib files for the registry (they're referenced as file deps)
  const hookFiles = collectFiles(join(SRC, "hooks"));
  const libFiles = collectFiles(join(SRC, "lib"));

  // --- Write registry.json ---
  ensureDir(REGISTRY_DIR);
  writeFileSync(
    join(REGISTRY_DIR, "registry.json"),
    JSON.stringify(registry, null, 2),
    "utf-8",
  );
  console.log(`Generated registry/registry.json with ${registry.length} components`);

  // --- Copy source files into registry/ ---

  // Copy component files
  for (const item of registry) {
    const src = join(SRC, item.srcPath);
    const dest = join(REGISTRY_DIR, item.srcPath);
    ensureDir(dirname(dest));
    copyFileSync(src, dest);
  }

  // Copy hook files
  for (const hookFile of hookFiles) {
    const relPath = relative(SRC, hookFile);
    const dest = join(REGISTRY_DIR, relPath);
    ensureDir(dirname(dest));
    copyFileSync(hookFile, dest);
  }

  // Copy lib files
  for (const libFile of libFiles) {
    const relPath = relative(SRC, libFile);
    const dest = join(REGISTRY_DIR, relPath);
    ensureDir(dirname(dest));
    copyFileSync(libFile, dest);
  }

  // --- Copy token JSON files ---
  const tokensDir = join(SRC, "tokens");
  const registryTokensDir = join(REGISTRY_DIR, "tokens");
  ensureDir(registryTokensDir);
  for (const tokenFile of ["light.json", "dark.json", "semantic.json"]) {
    const src = join(tokensDir, tokenFile);
    if (existsSync(src)) {
      copyFileSync(src, join(registryTokensDir, tokenFile));
    }
  }

  console.log("Copied source files into registry/");
  console.log("Copied token files into registry/tokens/");

  // Summary
  const byCategory = Object.groupBy(registry, (item) => item.category);
  for (const [cat, items] of Object.entries(byCategory)) {
    console.log(`  ${cat}: ${items?.length ?? 0} components`);
  }
  console.log(`  hooks: ${hookFiles.length} files`);
  console.log(`  lib: ${libFiles.length} files`);
}

main();
