import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    workspace: [
      'packages/figma',
      'packages/tokens',
      'packages/style-dictionary',
      'packages/theme/vitest.config.node.ts'
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