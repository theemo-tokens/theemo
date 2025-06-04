import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    projects: [
      'packages/figma',
      'packages/tokens',
      'packages/style-dictionary',
      'packages/theme'
    ],
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['html', 'clover'],
      include: ['packages/*/src/**'],
      all: true
    }
  }
});