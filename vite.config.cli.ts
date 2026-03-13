import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/cli/index.ts"),
      formats: ["es"],
      fileName: "index",
    },
    outDir: "dist/cli",
    rollupOptions: {
      external: [
        /^node:/,
        "fs",
        "path",
        "url",
        "os",
        "readline",
        "child_process",
      ],
      output: {
        entryFileNames: "index.js",
        banner: "#!/usr/bin/env node",
      },
    },
    target: "node18",
    minify: false,
    sourcemap: false,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
