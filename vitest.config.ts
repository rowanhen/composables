import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      reporters: ['verbose'],
      environment: 'jsdom',
      globals: true,
      testTimeout: 60000,
      setupFiles: ['./vitest.setup.ts'],
      include: [
        '**/__tests__/**/*.{js,ts,tsx}',
        '**/*.test.{js,ts,tsx}',
        '**/*.spec.{js,ts,tsx}',
      ],
      exclude: ['**/node_modules/**', '**/dist/**'],
    },
  }),
)
