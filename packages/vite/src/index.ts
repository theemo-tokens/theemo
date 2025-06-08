import { DEFAULT_OPTIONS } from '@theemo/theme';

import { buildPlugin } from './plugins/build';
import devPlugin from './plugins/dev';

import type { Options, PluginOptions } from './config';
import type { Plugin } from 'vite';

/**
 * Theemo plugin for vite. Use it for loading themes
 *
 * @example
 *
 * Using `theemo()` in vite.
 *
 * ```ts
 * import { defineConfig } from 'vite'
 * import { theemo } from '@theemo/vite';
 *
 * export default defineConfig({
 *   plugins: [
 *     theemo({
 *       defaultTheme: '<your-default-theme-name>'
 *     })
 *   ]
 * });
 * ```
 *
 * @param options your options, such as the default theme
 * @returns
 */
export function theemo(options: Options): Plugin[] {
  const opts = {
    ...DEFAULT_OPTIONS,
    ...options
  } as PluginOptions;

  return [devPlugin(opts), buildPlugin(opts)];
}
