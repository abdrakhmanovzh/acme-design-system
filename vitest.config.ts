import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '#': resolve(import.meta.dirname, './src'),
      '@': resolve(import.meta.dirname, './src')
    }
  },
  test: {
    // Vitest blanks CSS imports by default; registry css vars parse styles.css?raw.
    css: { include: [/styles\.css\?raw$/] },
    environment: 'node',
    include: ['src/**/*.test.ts'],
    pool: 'forks'
  }
})
