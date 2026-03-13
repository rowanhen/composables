import react from '@vitejs/plugin-react'
import { glob } from 'glob'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// Find all entry points
const entries = glob.sync('src/**/*.{ts,tsx}', {
  ignore: ['**/*.test.*', '**/__tests__/**', '**/index.css', 'src/cli/**'],
  cwd: __dirname,
})

// Convert to entry object: { 'components/ui/button': 'src/components/ui/button.tsx' }
const entryPoints = Object.fromEntries(
  entries.map((file) => {
    const name = file.replace('src/', '').replace(/\.(ts|tsx)$/, '')
    return [name, resolve(__dirname, file)]
  }),
)

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
    dts({
      include: ['src/**/*'],
      exclude: ['src/**/__tests__/**', '**/*.test.ts', '**/*.test.tsx'],
      tsconfigPath: './tsconfig.build.json',
      rollupTypes: false, // Keep individual .d.ts files for wildcard exports
    }),
  ],
  css: {
    postcss: './postcss.config.mjs',
  },
  build: {
    lib: {
      entry: entryPoints,
      formats: ['es'],
      cssFileName: 'styles',
    },
    cssCodeSplit: false, // Single CSS file output
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        // Peer dependencies - externalize all @base-ui/react imports
        /^@base-ui\/react/,
        '@tanstack/react-router',
        'class-variance-authority',
        'clsx',
        'lucide-react',
        'react-day-picker',
        'react-dropzone',
        'react-resizable-panels',
        'sonner',
        'tailwind-merge',
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'styles.css'
          }
          return '[name][extname]'
        },
      },
    },
    sourcemap: true,
    minify: false, // Library code should not be minified
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
