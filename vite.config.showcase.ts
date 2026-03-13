import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react({ jsxRuntime: 'automatic' })],
  base: '/',
  root: resolve(__dirname, 'showcase'),
  css: {
    postcss: resolve(__dirname, 'postcss.config.mjs'),
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})
