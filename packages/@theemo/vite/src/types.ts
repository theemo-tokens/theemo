import type { PackageJson } from 'type-fest';

/**
 * Theme descriptor for `theemo` object in `package.json`
 */
export interface TheemoDescriptor {
  file?: string;
  filePath?: string;
  name?: string;
  colorSchemes?: string[];
}

/**
 * A `package.json` file with `theemo` object
 */
export type TheemoPackage = PackageJson & {
  theemo?: TheemoDescriptor;
};

/**
 * Options to configure Theemo
 */
export interface TheemoOptions {
  defaultTheme?: string;
}

/**
 * Describe the features of a theme
 */
export interface ThemeFeatures {
  colorSchemes: string[];
}

/**
 * Complete Theemo config
 */
export interface TheemoConfig {
  options: TheemoOptions;
  themes: Record<string, ThemeFeatures>;
}
