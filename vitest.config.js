import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['html', 'clover'],
      include: ['packages/@theemo/*/src/**'],
      all: true
    }
  }
});