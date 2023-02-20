import type { Behavior } from '../vocabulary';

/**
 * Color Contrasts
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast
 */
export enum ColorContrast {
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

type ColorContrastModes = ColorContrast.More | ColorContrast.Less;

export interface ColorContrastFeature {
  behavior: Behavior[];
  modes: ColorContrastModes;
}
