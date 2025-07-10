import { defineConfig } from 'vitest/config';

import { theemo } from '@theemo/vite';
import path from 'node:path';

import { canEmulateColorScheme, emulateColorScheme } from './tests/commands';

export default defineConfig({
  plugins: [
    theemo({
      defaultTheme: 'ocean'
    })
  ],
  test: {
    name: '@theemo/theme:browser',
    include: ['tests/**/*.test.ts'],
    coverage: {
      enabled: true,
      provider: 'istanbul',
      include: [`${path.resolve('../../packages/theme/src')}/**/*`],
      reporter: ['text', 'html', ['lcov', { projectRoot: '../../../' }], 'json'],
      allowExternal: true
    },
    browser: {
      enabled: true,
      headless: true,
      screenshotFailures: false,
      // provider: 'preview',
      provider: 'webdriverio',
      testerHtmlPath: 'index.html',
      instances: [{ browser: 'firefox' }, { browser: 'chrome' }],
      commands: {
        emulateColorScheme,
        canEmulateColorScheme
      }
    },
    alias: {
      '@theemo/theme': path.resolve('../../packages/theme/src/index.ts')
    }
  }
});
