import { defineConfig } from 'vitest/config';
import {fixturesPlugin} from './tests/server/plugin'

export default defineConfig({
  // plugins: [fixturesPlugin()],
  test: {
    // open: true,
    coverage: {
      enabled: true,
      provider: 'istanbul',
      reporter: ['text', 'html', ['lcov', { projectRoot: '../../../' }], 'json']
    },
    // browser: {
    //   enabled: true,
    //   screenshotFailures: false,
    //   provider: 'preview',
    //   instances: [
    //     { browser: 'firefox' }
    //     // tests are flaky in chromium + playwright
    //     // { browser: 'chromium' },
    //     // { browser: 'webkit' }
    //   ]
    // }
  }
});
