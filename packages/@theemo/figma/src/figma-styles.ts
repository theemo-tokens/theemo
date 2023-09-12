import { EffectType } from 'figma-api';

import { parseColorValue } from './token-values.js';

import type { RGBA } from './-figma-variable-types.js';
import type { ColorConfig } from './config.js';
import type {
  DimensionValue,
  ShadowValue,
  ShadowValueSingular,
  TextTransformValue,
  TokenType,
  TypographyValue
} from '@theemo/core';
import type { Effect, Style, TextCase, TypeStyle } from 'figma-api';

export interface StyleColor extends RGBA {
  visible: boolean;
}

export interface StyleShadow {
  inner: boolean;
  x: number;
  y: number;
  radius: number;
  color: StyleColor;
}

export function getTypefromStyle(style: Style): TokenType | void {
  // 'FILL' | 'STROKE' | 'TEXT' | 'EFFECT' | 'GRID'
  const type = style.styleType;

  switch (type.toLowerCase()) {
    case 'fill':
    case 'stroke':
      return 'color';

    case 'effect':
      return 'shadow';

    case 'text':
      return 'typography';
  }
}

export function getDimension(value: number | string, unit: string): DimensionValue {
  let val = typeof value === 'string' ? Number.parseFloat(value) : value;

  return val === 0 ? '0' : `${val}${unit}`;
}

export function parseColorFromStyle(color: StyleColor, config: ColorConfig): string {
  if (color.visible === false) {
    return 'transparent';
  }

  return parseColorValue(color, config);
}

export function parseShadowsFromStyle(effects: Effect[], config: ColorConfig): ShadowValue {
  const shadows: ShadowValueSingular[] = [];

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  for (const effect of effects) {
    if (
      effect.visible &&
      (effect.type === EffectType.DROP_SHADOW || effect.type === EffectType.INNER_SHADOW)
    ) {
      shadows.push({
        // inner: effect.type === EffectType.INNER_SHADOW,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        color: parseColorFromStyle({ ...effect.color, visible: true }, config),
        offsetX: getDimension(effect.offset?.x ?? 0, 'px'),
        offsetY: getDimension(effect.offset?.y ?? 0, 'px'),
        blur: getDimension(effect.radius, 'px'),
        spread: getDimension(effect.spread ?? 0, 'px')
      });
    }
  }

  return shadows.length === 1 ? shadows[0] : shadows;
}

function parseTextTransform(textCase: TextCase): TextTransformValue {
  switch (textCase) {
    case 'UPPER':
      return 'uppercase';

    case 'LOWER':
      return 'lowercase';

    case 'TITLE':
    case 'SMALL_CAPS':
    case 'SMALL_CAPS_FORCED':
      return 'capitalize';

    case 'ORIGINAL':
    default:
      return 'none';
  }
}

export function parseTypographyFromStyle(text: TypeStyle): TypographyValue {
  return {
    fontFamily: text.fontFamily,
    fontSize: getDimension(text.fontSize, 'px'),
    fontWeight: text.fontWeight,
    letterSpacing: getDimension(text.letterSpacing, 'px'),
    lineHeight: Number.parseFloat((text.lineHeightPx / text.fontSize).toFixed(2)),
    textTransform: text.textCase ? parseTextTransform(text.textCase) : 'none'
  };
}
