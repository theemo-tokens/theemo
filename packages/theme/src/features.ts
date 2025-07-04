import type { ValidationResult } from './validation';
import type { Simplify } from 'type-fest';

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

/**
 * The principal who is responsible for the value
 *
 * @see https://theemo.io/design-tokens/traits#principals-and-agents
 */
export const Principal = {
  Browser: 'browser',
  User: 'user'
} as const;

export type Principal = (typeof Principal)[keyof typeof Principal];

interface BaseFeature {
  /** name of the feature */
  name: string;
  options: string[];
  defaultOption?: string;
  browserFeature?: string;
}

/**
 * Custom Feature based on modality
 */
export interface CustomFeature extends BaseFeature {
  defaultOption: string;
}

/**
 * Color Scheme Feature
 *
 * The first value in `options` is also the default
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
 */
export interface ColorSchemeFeature extends BaseFeature {
  /**
   * Color scheme options. The first will be the default
   */
  options: ColorScheme[];
  browserFeature: 'color-scheme';
}

/**
 * Color Contrasts Feature
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast
 */
export interface ColorContrastFeature extends BaseFeature {
  defaultOption?: ColorContrast;
  options: ColorContrast[];
  browserFeature: 'color-contrast';
}

/**
 * Motion Feature
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
 */
export interface MotionFeature extends BaseFeature {
  defaultOption?: Motion;
  options: Motion[];
  browserFeature: 'motion';
}

/**
 * All features supported by browser mechanics
 */
export type BrowserFeature = ColorSchemeFeature | ColorContrastFeature | MotionFeature;

/**
 * All features that have model behvaior and thus require a default value
 */
export type ModalFeature = Simplify<
  Exclude<Feature, ColorSchemeFeature> &
    Required<Pick<Exclude<Feature, ColorSchemeFeature>, 'defaultOption'>>
>;

/**
 * All features
 */
export type Feature = ColorSchemeFeature | ColorContrastFeature | MotionFeature | CustomFeature;

/**
 * The value of all features
 */
export type FeatureValue = ColorScheme | ColorContrast | Motion | (string & {});

type WithValue<T extends Feature> = T & {
  value: FeatureValue;
  browserValue?: FeatureValue;
  principal: Principal;
};

/**
 * A feature with a value present on the principal who set it
 */
export type FeatureWithValue = Simplify<WithValue<Feature>>;

/**
 * Verifies if the given feature has the browser as principal that can change
 * it based on media query or other mechanics
 *
 * @see https://theemo.io/design-tokens/traits#principals-and-agents
 * @param feature the feature in question
 * @returns `true` for a browser feature, otherwise `false`
 */
export function isBrowserFeature(feature: Feature): feature is BrowserFeature {
  return [
    BrowserMechanic.ColorContrast,
    BrowserMechanic.ColorScheme,
    BrowserMechanic.Motion
  ].includes(feature.browserFeature as BrowserMechanic);
}

/**
 * Checks wether the given feature uses mode behavior
 *
 * @param feature the feature in question
 * @returns `true` for a mode behavior, otherwise `false`
 */
export function isModalFeature(feature: Feature): feature is ModalFeature {
  return feature.defaultOption !== undefined;
}

/**
 * Checks if the feature contains all valid fields to be operational
 *
 * @param feature the feature in question
 * @returns validation result
 */
export function validateFeature(feature: Feature): ValidationResult {
  const errors: string[] = [];

  if (!feature.name) {
    errors.push('Feature is missing a name');
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!feature.options) {
    errors.push(`Feature '${feature.name}' requires options`);
  }

  if (!feature.browserFeature && !(feature as BaseFeature).defaultOption) {
    errors.push(`Feature '${feature.name}' requires 'defaultOption' or 'browserFeature'`);
  }

  if (
    (feature as BaseFeature).defaultOption &&
    !(feature.options as FeatureValue[]).includes(
      (feature as BaseFeature).defaultOption as FeatureValue
    )
  ) {
    errors.push(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      `Feature '${feature.name}' has 'defaultOption' to be set to '${(feature as BaseFeature).defaultOption!}', which is not allowed. Allowed values are '${feature.options.join(`', '`)}'.`
    );
  }

  if (feature.browserFeature && !isBrowserFeature(feature)) {
    errors.push(
      `Feature '${feature.name}' uses invalid browser mechanic: '${feature.browserFeature}' does not exist. Supported values are: '${Object.values(BrowserMechanic).join("', ")}'.`
    );
  }

  return {
    success: errors.length === 0,
    errors
  };
}
