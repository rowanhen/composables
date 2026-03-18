import react from "@vitejs/plugin-react";
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
	base: process.env.GITHUB_PAGES ? "/composables/" : "/",
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			// Map showcase @/ imports to the library source so everything
			// resolves against the @leitware/composables package.
			"@/components/_internal": path.resolve(__dirname, "../ui/src/_internal"),
			"@/components/ui-opinionated": path.resolve(__dirname, "../ui/src/opinionated"),
			"@/lib": path.resolve(__dirname, "../ui/src/lib"),
			"@/hooks": path.resolve(__dirname, "../ui/src/hooks"),
			// Keep @/ for showcase-local files (presets, styles, non-library code)
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
