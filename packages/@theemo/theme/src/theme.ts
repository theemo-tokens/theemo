import type { ColorContrastFeature } from './features/color-contrast';
import type { ColorSchemeFeature } from './features/color-scheme';
import type { MotionFeature } from './features/motion';
import type { Scope } from './vocabulary';

export enum Feature {
  ColorScheme = 'colorScheme',
  ColorContrast = 'colorContrast',
  Motion = 'motion'
}

export interface Theme {
  name: string;
  features?: {
    [Feature.ColorScheme]?: ColorSchemeFeature;
    [Feature.ColorContrast]?: ColorContrastFeature;
    [Feature.Motion]: MotionFeature;
  };
  scopes: Scope[];
}
