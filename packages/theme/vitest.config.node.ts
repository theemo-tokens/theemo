import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: '@theemo/theme:node',
    include: ['tests/node/**/*.test.ts']
  }
});
