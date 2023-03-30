import type { ColorContrast, ColorScheme, Motion } from './features';

export type Scope = string;

export enum Behavior {
  Mode = 'mode',
  Adaptive = 'adaptive'
}

export enum Feature {
  ColorScheme = 'colorScheme',
  ColorContrast = 'colorContrast',
  Motion = 'motion'
}

interface Feat {
  enabled: boolean;
}

export type ColorSchemeOptions = ColorScheme.Light | ColorScheme.Dark;
export interface ColorSchemeFeature extends Feat {
  behavior: Behavior[];
  // options: ColorScheme[];
  default: ColorScheme;
}

export type ColorContrastOptions = ColorContrast.More | ColorContrast.Less;
export interface ColorContrastFeature extends Feat {
  behavior: Behavior[];
  // options: ColorContrastOptions;
}

export type MotionOptions = Motion.Reduce | Motion.NoPreference;
export interface MotionFeature extends Feat {
  behavior: Behavior[];
  // options: MotionOptions;
}

export interface Features {
  [Feature.ColorScheme]?: ColorSchemeFeature;
  [Feature.ColorContrast]?: ColorContrastFeature;
  [Feature.Motion]?: MotionFeature;
}

export interface Theme {
  name: string;
  features?: Features;
  scopes?: Scope[];
}
