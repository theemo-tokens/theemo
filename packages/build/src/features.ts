import { BrowserMechanic, type ColorContrast, type Feature, type Motion } from '@theemo/theme';

export interface ModeBuildFeature extends Omit<Feature, 'options'> {
  options: Record<string, string>;
}

export interface ColorSchemeBuildFeature extends Omit<Feature, 'options' | 'defaultOption'> {
  options: ('light' | 'dark')[];
  browserFeature: 'color-scheme';
}

export interface ColorContrastBuildFeature extends Omit<Feature, 'options'> {
  defaultOption: ColorContrast;
  options: Record<ColorContrast, string>;
  browserFeature: 'color-contrast';
}

export interface MotionBuildFeature extends Omit<Feature, 'options'> {
  defaultOption: Motion;
  options: Record<Motion, string>;
  browserFeature: 'motion';
}

export type MediaQueryBuildFeature = ColorContrastBuildFeature | MotionBuildFeature;

export type BuildFeature =
  | ColorSchemeBuildFeature
  | ColorContrastBuildFeature
  | MotionBuildFeature
  | ModeBuildFeature;

export function isColorSchemeFeature(feature: BuildFeature): feature is ColorSchemeBuildFeature {
  return feature.browserFeature === BrowserMechanic.ColorScheme;
}

export function isMediaQueryFeature(feature: BuildFeature): feature is MediaQueryBuildFeature {
  return (
    feature.browserFeature === BrowserMechanic.ColorContrast ||
    feature.browserFeature === BrowserMechanic.Motion
  );
}
