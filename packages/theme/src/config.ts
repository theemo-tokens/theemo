import type { Theme } from './theme';
import type { PartialDeep } from 'type-fest';

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

/**
 * Options to configure Theemo
 */
export interface TheemoOptions {
  defaultTheme?: string;
  outDir?: string;
}

/**
 * Options relevant for the Theemo runtime
 */
export type TheemoRuntimeOptions = WithRequired<TheemoOptions, 'outDir'>;

/**
 * Entire Theemo config with options and themes
 */
export interface TheemoConfig {
  options: TheemoOptions;
  themes: Theme[];
}

/**
 * Default Theemo options
 *
 * @internal
 */
export const DEFAULT_OPTIONS: TheemoRuntimeOptions = {
  outDir: 'theemo'
};

/**
 * Runtime theme
 *
 * @internal
 */
export interface TheemoRuntimeTheme extends Theme {
  filename: string;
}

/**
 * Theemo runtime configuration put into `<meta>`
 */
export interface TheemoRuntimeConfig extends TheemoConfig {
  options: TheemoRuntimeOptions;
  themes: TheemoRuntimeTheme[];
}

/**
 * ID to identify Theemo `<meta>` element
 *
 * @internal
 */
export const THEEMO_CONFIG_ID = 'theemo-config';

/**
 * Extract the config from `<meta>` element
 *
 * @param rootElement element to look for the `<meta>` element in
 * @returns runtime config
 */
export function extractConfig(rootElement: Element | Document = document): TheemoRuntimeConfig {
  const meta = rootElement.querySelector<HTMLMetaElement>(`meta[name="${THEEMO_CONFIG_ID}"]`);

  const config = (
    meta ? JSON.parse(decodeURI(meta.content)) : {}
  ) as PartialDeep<TheemoRuntimeConfig>;

  return {
    options: {
      ...DEFAULT_OPTIONS,
      ...config.options
    },
    themes: config.themes ?? []
  };
}
