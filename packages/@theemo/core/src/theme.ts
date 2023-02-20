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

export type ColorSchemeOptions = ColorScheme.Light | ColorScheme.Dark;
export interface ColorSchemeFeature {
  behavior: Behavior[];
  options: ColorSchemeOptions;
  default: ColorScheme;
}

export type ColorContrastOptions = ColorContrast.More | ColorContrast.Less;
export interface ColorContrastFeature {
  behavior: Behavior[];
  options: ColorContrastOptions;
}

export type MotionOptions = Motion.Reduce | Motion.NoPreference;
export interface MotionFeature {
  behavior: Behavior[];
  options: MotionOptions;
}

export interface Theme {
  name: string;
  features?: {
    [Feature.ColorScheme]?: ColorSchemeFeature;
    [Feature.ColorContrast]?: ColorContrastFeature;
    [Feature.Motion]: MotionFeature;
  };
  scopes?: Scope[];
}
