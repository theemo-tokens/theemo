import { isColor, isComputedValue, transformColorValue } from '@theemo/tokens';

import type { ComputedValue, Token } from '@theemo/tokens';
import type { PlatformConfig } from 'style-dictionary';
import type { Transform, TransformedToken } from 'style-dictionary/types';

const isColorTransform = (token: TransformedToken): boolean => {
  return isComputedValue(token.value) && isColor(token as Token);
};

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

function transform(token: TransformedToken, config: PlatformConfig) {
  const value = token.value as ComputedValue<'color'>;

  if (config.options?.useCSSColorTransform) {
    return applyCSSColorTransform(value);
  }

  return transformColorValue(value);
}

/**
 * Apply color transformations on color tokens
 *
 * @see [Extending Style Dictionary](https://theemo.io/sync/style-dictionary/extensions)
 */
export const theemoColorValueTransform: Transform = {
  name: 'theemo/transform',
  type: 'value',
  transitive: true,
  filter: isColorTransform,
  // @ts-expect-error for backwards compatibility
  matcher: isColorTransform,
  transformer: transform,
  transform
};
