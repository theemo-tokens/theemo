import { DEFAULT_OPTIONS } from '@theemo/theme';

import { buildPlugin } from './plugins/build';
import devPlugin from './plugins/dev';

import type { Options, PluginOptions } from './config';
import type { Plugin } from 'vite';

export default function theemo(options: Options): Plugin[] {
  const opts = {
    ...DEFAULT_OPTIONS,
    ...options
  } as PluginOptions;

  return [devPlugin(opts), buildPlugin(opts)];
}
