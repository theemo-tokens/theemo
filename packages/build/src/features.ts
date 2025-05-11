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
  options: Record<string, string>;
}

export type ColorSchemeBuildFeature = ColorSchemeFeature;

export interface ColorContrastBuildFeature extends Omit<ColorContrastFeature, 'options'> {
  options: Record<ColorContrast, string>;
}

export interface MotionBuildFeature extends Omit<MotionFeature, 'options'> {
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
