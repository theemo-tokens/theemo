import { colord } from 'colord';

import { ColorAlphaFormat, ColorFormat } from './config.js';

import type { RGB, RGBA } from './-figma-variable-types.js';
import type { ColorConfig } from './config.js';
import type { ColorValue } from '@theemo/tokens';

function rgbTo255(value: RGB | RGBA): RGB | RGBA {
  return {
    ...value,
    r: value.r * 255,
    g: value.g * 255,
    b: value.b * 255
  };
}

export function parseColorValue(value: string | RGB | RGBA, config: ColorConfig): ColorValue {
  const color = colord(typeof value === 'object' ? rgbTo255(value) : value);

  if (color.alpha() === 1) {
    switch (config.color) {
      case ColorFormat.Hsl: {
        return color.toHslString();
      }

      case ColorFormat.Rgb: {
        return color.toRgbString();
      }

      default:
      case ColorFormat.Hex: {
        return color.toHex();
      }
    }
  } else {
    switch (config.colorAlpha) {
      case ColorAlphaFormat.Hsl: {
        return color.toHslString();
      }

      default:
      case ColorAlphaFormat.Rgb: {
        return color.toRgbString();
      }
    }
  }
}
