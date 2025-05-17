import { isColor, isComputedValue, transformColorValue } from '@theemo/tokens';

import type { ComputedValue, Token } from '@theemo/tokens';
import type { PlatformConfig } from 'style-dictionary';
import type { Transform, TransformedToken } from 'style-dictionary/types';

function isColorTransform(token: TransformedToken): boolean {
  return isComputedValue(token.value) && isColor(token as Token);
}

function calc(value: number) {
  if (value < 0) {
    return `- ${Math.abs(value).toString()}`;
  }

  return `+ ${value.toString()}`;
}

function applyCSSColorTransform(value: ComputedValue<'color'>) {
  const from = value.value;
  const transforms = value.transforms;

  const h = transforms.hue ? `calc(h ${calc(transforms.hue)})` : 'h';
  const s = transforms.saturation ? `calc(s ${calc(transforms.saturation)})` : 's';
  const l = transforms.lightness ? `calc(l ${calc(transforms.lightness)})` : 'l';
  const a = transforms.alpha ? ` / ${(1 - Math.abs(transforms.alpha) / 100).toString()}` : '';

  return `hsl(from ${from} ${h} ${s} ${l}${a})`;
}

export function transformColor(token: TransformedToken, config: PlatformConfig = {}): string {
  const value = token.value as ComputedValue<'color'>;

  if (config.options?.useCSSColorTransform) {
    return applyCSSColorTransform(value);
  }

  return transformColorValue(value);
}

/**
 * Apply color transformations. Either during build time - or - at runtime using
 * CSS color functions.
 *
 * @example
 *
 * Usage:
 *
 * ```js
 * import StyleDictionary from 'style-dictionary';
 * import { colorTransform } from '@theemo/style-dictionary';
 *
 * StyleDictionary.registerTransform(colorTransform);
 *
 * export default {
 *   source: ['tokens/**\/*.json'],
 *   platforms: {
 *     css: {
 *       options: {
 *         useCSSColorTransform: true
 *       },
 *       transforms: ['color/transforms']
 *     }
 *   }
 * };
 * ```
 *
 * @example
 *
 * Calculate during build time.
 *
 * Computing this formula:
 *
 * ```json
 * {
 *   "$value": {
 *     "value": "#f00",
 *     "transforms": {
 *       "hue": 180
 *     }
 *   },
 *   "$type": "color"
 * }
 * ```
 *
 * to:
 *
 * ```json [token]
 * {
 *   "$value": "#ff0800",
 *   "$type": "color"
 * }
 * ```
 *
 * @example
 *
 * When using `useCSSColorTransform` the output looks like this:
 *
 * ```json
 * {
 *   "$value": "hsl(from red calc(h + 180) s l)",
 *   "$type": "color"
 * }
 * ```
 */
export const colorTransform: Transform = {
  name: 'color/transforms',
  type: 'value',
  transitive: true,
  filter: isColorTransform,
  // @ts-expect-error for backwards compatibility
  matcher: isColorTransform,
  transformer: transformColor,
  transform: transformColor
};
