import type { PackageJson } from 'type-fest';

enum Feature {
  ColorScheme = 'colorScheme',
  ColorContrast = 'colorContrast'
}

type Scope = string;
type Behavior = 'mode' | 'adaptive';

/**
 * Color Scheme
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
 */
enum ColorScheme {
  Light = 'light',
  Dark = 'dark'
}

type ColorSchemes = ColorScheme.Light | ColorScheme.Dark;

interface ColorSchemeFeature {
  behavior: Behavior[];
  default: ColorSchemes;
  supports: ColorScheme[];
}

/**
 * Color Contrasts
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast
 */
enum ColorContrast {
  /** Indicates that the user has made no preference known to the system. This keyword value evaluates as false in the Boolean context. */
  NoPreference = 'no-preference',

  /** Indicates that user has notified the system that they prefer an interface that has a higher level of contrast. */
  More = 'more',

  /** Indicates that user has notified the system that they prefer an interface that has a lower level of contrast. */
  Less = 'less',

  /**
   * Indicates that user has notified the system for using a specific set of colors, and the contrast implied by these colors matches neither more nor less. This value will match the color palette specified by users of `forced-colors: active`.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors
   */
  Custom = 'custom'
}

type ColorContrasts =
  | ColorContrast.NoPreference
  | ColorContrast.More
  | ColorContrast.Less
  | ColorContrast.Custom;

interface ColorContrastFeature {
  behavior: Behavior[];
  supports: ColorContrast[];
}

export interface Theme {
  name: string;
  features?: {
    [Feature.ColorScheme]?: ColorSchemeFeature;
  };
  scopes: Scope[];
}

/**
 * Theme descriptor for `theemo` object in `package.json`
 */
export interface TheemoDescriptor {
  file?: string;
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
