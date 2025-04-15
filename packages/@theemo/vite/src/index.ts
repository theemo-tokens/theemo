import { buildPlugin } from './plugins/build';
import devPlugin from './plugins/dev';

import type { Plugin } from 'vite';

export interface Options {
  defaultTheme: string;
}

export default function viteTheemo(options: Options): Plugin[] {
  return [devPlugin(options), buildPlugin(options)];
}
