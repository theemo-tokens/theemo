import { defineConfig } from 'tsdown';

import config from '@theemo-config/tsdown';

export default defineConfig({
  ...config,
  entry: ['src/index.svelte.ts']
});
