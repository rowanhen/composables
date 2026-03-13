/** Rewrite @/ import paths in source code to use a different alias prefix */
export function rewriteImports(source: string, aliasPrefix: string): string {
  if (aliasPrefix === '@/') return source

  // Replace all `from '@/...'` and `from "@/..."` imports
  return source.replace(/(from\s+['"])@\//g, `$1${aliasPrefix}`)
}
