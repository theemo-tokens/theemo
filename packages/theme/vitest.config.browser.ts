import { defineConfig } from 'vitest/config';

// @ts-expect-error yeah, because turbo detects a circular dep, when there is none
import theemo from '@theemo/vite';

export default defineConfig({
  plugins: [
    theemo({
      defaultTheme: 'ocean'
    })
  ],
  test: {
    name: '@theemo/theme:browser',
    include: ['tests/browser/**/*.test.ts'],
    // open: true,
    coverage: {
      enabled: true,
      provider: 'istanbul',
      reporter: ['text', 'html', ['lcov', { projectRoot: '../../../' }], 'json']
    },
    browser: {
      enabled: true,
      headless: true,
      screenshotFailures: false,
      // provider: 'preview',
      provider: 'webdriverio',
      testerHtmlPath: 'tests/browser/index.html',
      instances: [{ browser: 'firefox' }, { browser: 'chrome' }]
    }
  }
});
