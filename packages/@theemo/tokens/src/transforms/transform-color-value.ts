import { colord } from 'colord';

import type { ColorTransform, ComputedValue } from '../token-types';

export function applyColorTransforms(value: string, transforms: ColorTransform): string {
  let color = colord(value);

  if (transforms.alpha) {
    color = color.alpha(color.alpha() + transforms.alpha / 100);
  }

  if (transforms.hue) {
    color = color.rotate(transforms.hue / 100);
  }

  if (transforms.saturation) {
    color = color.saturate(transforms.saturation / 100);
  }

  if (transforms.lightness) {
    color = color.lighten(transforms.lightness / 100);
  }

  if (color.alpha() !== 1) {
    return color.toRgbString();
  }

  return color.toHex();
}

export function transformColorValue(value: ComputedValue<'color'>) {
  return applyColorTransforms(value.value, value.transforms);
}
