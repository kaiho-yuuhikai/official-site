import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['tests/**/*.test.{ts,js,mjs}'],
    environment: 'node',
    globals: false,
  },
})
