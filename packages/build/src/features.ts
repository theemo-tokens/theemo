import { BrowserMechanic, isModalFeature } from '@theemo/theme';

import type {
  ColorContrast,
  ColorContrastFeature,
  ColorSchemeFeature,
  CustomFeature,
  Feature,
  Motion,
  MotionFeature
} from '@theemo/theme';

export interface CustomBuildFeature extends Omit<CustomFeature, 'options'> {
  /**
   * Use options to point at a CSS file for that option
   *
   * @example
   *
   * ```json
   * {
   *   "options": {
   *     "option-a": "build/option-a.css",
   *     "option-b": "build/option-b.css"
   *   }
   * }
   * ```
   */
  options: Record<string, string>;
}

export type ColorSchemeBuildFeature = ColorSchemeFeature;

export interface ColorContrastBuildFeature extends Omit<ColorContrastFeature, 'options'> {
  /**
   * Use options to point at a CSS file for that option
   *
   * @example
   *
   * ```json
   * {
   *   "options": {
   *     "less": "build/contrast-less.css",
   *     "more": "build/contrast-more.css"
   *   }
   * }
   * ```
   */
  options: Record<ColorContrast, string>;
}

export interface MotionBuildFeature extends Omit<MotionFeature, 'options'> {
  /**
   * Use options to point at a CSS file for that option
   *
   * @example
   *
   * ```json
   * {
   *   "options": {
   *     "no-preference": "build/motion.css",
   *     "reduce": "build/motion-reduce.css"
   *   }
   * }
   * ```
   */
  options: Record<Motion, string>;
}

export type MediaQueryBuildFeature = ColorContrastBuildFeature | MotionBuildFeature;

export type BuildFeature =
  | ColorSchemeBuildFeature
  | ColorContrastBuildFeature
  | MotionBuildFeature
  | CustomBuildFeature;

export type ModalBuildFeature = Exclude<BuildFeature, ColorSchemeBuildFeature>;

export function isModalBuildFeature(feature: BuildFeature): feature is ModalBuildFeature {
  return isModalFeature(feature as unknown as Feature);
}

export function isColorSchemeFeature(feature: BuildFeature): feature is ColorSchemeBuildFeature {
  return feature.browserFeature === BrowserMechanic.ColorScheme;
}

export function isMediaQueryFeature(feature: BuildFeature): feature is MediaQueryBuildFeature {
  return (
    feature.browserFeature === BrowserMechanic.ColorContrast ||
    feature.browserFeature === BrowserMechanic.Motion
  );
}
