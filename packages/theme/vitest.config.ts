import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    workspace: [
      './vitest.config.node.ts'
      // './vitest.config.browser.ts'
    ]
  }
});
