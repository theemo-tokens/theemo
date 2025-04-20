import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    workspace: [
      'packages/@theemo/figma',
      'packages/@theemo/tokens',
      'packages/@theemo/theme/vitest.config.node.ts'
    ],
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['html', 'clover'],
      include: ['packages/@theemo/*/src/**'],
      all: true
    }
  }
});