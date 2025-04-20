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

export type TheemoRuntimeOptions = WithRequired<TheemoOptions, 'outDir'>;

/**
 * Complete Theemo config
 */
export interface TheemoConfig {
  options: TheemoOptions;
  themes: Theme[];
}

export const DEFAULT_OPTIONS: TheemoRuntimeOptions = {
  outDir: 'theemo'
};

export interface TheemoRuntimeConfig extends TheemoConfig {
  options: TheemoRuntimeOptions;
}

export const THEEMO_CONFIG_ID = 'theemo-config';

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
