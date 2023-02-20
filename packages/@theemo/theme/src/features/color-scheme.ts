import type { Behavior } from '../vocabulary';

/**
 * Color Scheme
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
 */
export enum ColorScheme {
  Light = 'light',
  Dark = 'dark'
}

type ColorSchemeModes = ColorScheme.Light | ColorScheme.Dark;

export interface ColorSchemeFeature {
  behavior: Behavior[];
  modes: ColorSchemeModes;
  default: ColorScheme;
}
