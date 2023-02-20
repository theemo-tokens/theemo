/**
 * Color Contrast Modes
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast
 */
export enum ColorContrastModes {
  /** Indicates that user has notified the system that they prefer an interface that has a higher level of contrast. */
  More = 'more',

  /** Indicates that user has notified the system that they prefer an interface that has a lower level of contrast. */
  Less = 'less'
}
