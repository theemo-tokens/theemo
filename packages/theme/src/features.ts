/* eslint-disable @typescript-eslint/naming-convention */

import type { ValidationResult } from './validation';

/**
 * Color Contrasts
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast
 */
export const ColorContrast = {
  /** Indicates that the user has made no preference known to the system. This keyword value evaluates as false in the Boolean context. */
  NoPreference: 'no-preference',

  /** Indicates that user has notified the system that they prefer an interface that has a higher level of contrast. */
  More: 'more',

  /** Indicates that user has notified the system that they prefer an interface that has a lower level of contrast. */
  Less: 'less',

  /**
   * Indicates that user has notified the system for using a specific set of colors, and the contrast implied by these colors matches neither more nor less. This value will match the color palette specified by users of `forced-colors: active`.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors
   */
  Custom: 'custom'
} as const;

export type ColorContrast = (typeof ColorContrast)[keyof typeof ColorContrast];

/**
 * Color Scheme
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
 */
export const ColorScheme = {
  Light: 'light',
  Dark: 'dark'
} as const;

export type ColorScheme = (typeof ColorScheme)[keyof typeof ColorScheme];

/**
 * Motion
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
 */
export const Motion = {
  /** Indicates that the user has made no preference known to the system. This keyword value evaluates as false in the Boolean context. */
  NoPreference: 'no-preference',

  /** Indicates that user has notified the system that they prefer an interface that removes or replaces the types of motion-based animation that trigger discomfort for those with vestibular motion disorders. */
  Reduce: 'reduce'
} as const;

export type Motion = (typeof Motion)[keyof typeof Motion];

export const Behavior = {
  Mode: 'mode',
  Adaptive: 'adaptive'
} as const;

export type Behavior = (typeof Behavior)[keyof typeof Behavior];

export const BrowserMechanic = {
  ColorScheme: 'color-scheme',
  ColorContrast: 'color-contrast',
  Motion: 'motion'
} as const;

export type BrowserMechanic = (typeof BrowserMechanic)[keyof typeof BrowserMechanic];

export const Principal = {
  Browser: 'browser',
  User: 'user'
} as const;

export type Principal = (typeof Principal)[keyof typeof Principal];
/* eslint-enable @typescript-eslint/naming-convention */

export interface Feature {
  name: string;
  options: string[];
  defaultOption?: string;
  browserFeature?: BrowserMechanic;
}

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export type BrowserFeature = WithRequired<Feature, 'browserFeature'>;

export function isBrowserFeature(feature: Feature): feature is BrowserFeature {
  return [
    BrowserMechanic.ColorContrast,
    BrowserMechanic.ColorScheme,
    BrowserMechanic.Motion
  ].includes(feature.browserFeature as BrowserMechanic);
}

export function validateFeature(feature: Feature): ValidationResult {
  const errors: string[] = [];

  if (!feature.name) {
    errors.push('Feature is missing a name');
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!feature.options) {
    errors.push(`Feature '${feature.name}' requires options`);
  }

  if (!feature.browserFeature && !feature.defaultOption) {
    errors.push(`Feature '${feature.name}' requires 'defaultOption' or 'browserFeature'`);
  }

  if (feature.browserFeature && !isBrowserFeature(feature)) {
    errors.push(
      `Feature '${feature.name}' uses invalid browser mechanic: '${feature.browserFeature}' does not exist. Supported values are: '${Object.values(BrowserMechanic).join("', ")}'`
    );
  }

  return {
    success: errors.length === 0,
    errors
  };
}
