import type { Theme } from '@theemo/tokens';
import type { PackageJson } from 'type-fest';

/**
 * A `package.json` file with `theemo` object
 */
export type TheemoPackage = PackageJson & {
  theemo?: Theme;
};

/**
 * Options to configure Theemo
 */
export interface TheemoOptions {
  defaultTheme?: string;
}

/**
 * Complete Theemo config
 */
export interface TheemoConfig {
  options: TheemoOptions;
  themes: Record<string, Theme>;
}
