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

/** Default Theemo options */
export const DEFAULT_OPTIONS: TheemoRuntimeOptions = {
  outDir: 'theemo'
};

/**
 * Theemo runtime configuration put into `<script>`
 */
export interface TheemoRuntimeConfig extends TheemoConfig {
  options: TheemoRuntimeOptions;
}

/** ID to identify Theemo <meta> element */
export const THEEMO_CONFIG_ID = 'theemo-config';

/**
 * Extract the config from `<script>` element
 *
 * @param rootElement element to look for the `<script>` element in
 * @returns runtime config
 */
export function extractConfig(rootElement: Element | Document = document): TheemoRuntimeConfig {
  let script = rootElement.querySelector(`[id="${THEEMO_CONFIG_ID}"]`);

  let config = (
    script ? JSON.parse(script.textContent as string) : {}
  ) as PartialDeep<TheemoConfig>;

  return {
    options: {
      ...DEFAULT_OPTIONS,
      ...(config.options ?? {})
    },
    themes: config.themes ?? []
  };
}
