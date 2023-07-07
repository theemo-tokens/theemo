import Color from 'color';

import { ColorAlphaFormat, ColorFormat } from './config.js';

import type { ColorConfig } from './config.js';
import type { BaseToken } from '@theemo/core';
import type { Node, Style } from 'figma-api';

interface TokenColor {
  r: number;
  g: number;
  b: number;
  a: number;
  visible: boolean;
}

interface TokenShadow {
  inner: boolean;
  x: number;
  y: number;
  radius: number;
  color: TokenColor;
}

export interface FigmaToken extends BaseToken {
  /**
   * The tokens literal value
   */
  value?: string;

  /**
   * The color is described in its essential parts
   *
   * @remarks
   *
   * - `r` - red
   * - `g` - green
   * - `b` - blue
   * - `a` - alpha
   * - `visible` - if completely transparent
   */
  color?: TokenColor;

  /**
   * Shadows values
   */
  shadows?: TokenShadow[];

  data?: unknown;

  referenceToken?: FigmaToken;

  figmaName: string;

  figmaReference?: string;

  node: Node;

  style?: Style;
}

export function getLength(value: number): string {
  return value === 0 ? '0' : `${value}px`;
}

export function colorToValue(color: Color, config: ColorConfig): string {
  if (color.alpha() === 1) {
    switch (config.color) {
      case ColorFormat.Rgb: {
        return color.rgb().string();
      }

      case ColorFormat.Hsl: {
        return color.hsl().string();
      }

      case ColorFormat.Hex:
      default:
        return color.hex();
    }
  }

  switch (config.colorAlpha) {
    case ColorAlphaFormat.Hsl: {
      return color.hsl().string();
    }

    case ColorAlphaFormat.Rgb:

    // eslint-disable-next-line no-fallthrough
    default: {
      return color.rgb().string();
    }
  }
}

export function figmaToColor(color: TokenColor): Color {
  return Color({
    r: Math.round(color.r * 255),
    g: Math.round(color.g * 255),
    b: Math.round(color.b * 255)
  }).alpha(color.a);
}

export function getColor(color: TokenColor, config: ColorConfig): string {
  if (color.visible === false) {
    return 'transparent';
  }

  return colorToValue(figmaToColor(color), config);
}

export function getValue(token: FigmaToken, config: ColorConfig): string {
  if (token.color) {
    return getColor(token.color, config);
  }

  if (token.shadows) {
    const shadows = [];

    for (const shadow of token.shadows) {
      shadows.push(
        `${shadow.inner ? 'inset ' : ''}${getLength(shadow.x)} ${getLength(shadow.y)} ${getLength(
          shadow.radius
        )} ${getColor(shadow.color, config)}`
      );
    }

    return shadows.join(', ');
  }

  return token.value ?? '';
}

export function getTypefromStyle(style: Style) {
  // 'FILL' | 'STROKE' | 'TEXT' | 'EFFECT' | 'GRID'
  const type = style.styleType;

  switch (type.toLowerCase()) {
    case 'fill':
    case 'stroke':
      return 'color';

    case 'effects':
      return 'shadow';

    // case 'TEXT':
    //   return 'typography';

    default:
      return type.toLowerCase();
  }
}
