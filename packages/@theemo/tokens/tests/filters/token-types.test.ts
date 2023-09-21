import { describe, expect, test } from 'vitest';

import {
  isColor,
  isCubicBezier,
  isDuration,
  isFontFamily,
  isFontWeight,
  isGradient,
  isShadow,
  isStroke,
  isStrokeStyle,
  isTransition,
  isTypography
} from '../../src';
import { isNumber } from '../../src/filters/is-number';

describe('filter token types', () => {
  test('isColor', () => {
    expect(isColor({ name: 'test', type: 'color' })).toBeTruthy();
    expect(isColor({ name: 'test', type: 'number' })).toBeFalsy();
  });

  test('isCubicBezier', () => {
    expect(isCubicBezier({ name: 'test', type: 'cubicBezier' })).toBeTruthy();
    expect(isCubicBezier({ name: 'test', type: 'number' })).toBeFalsy();
  });

  test('isDuration', () => {
    expect(isDuration({ name: 'test', type: 'duration' })).toBeTruthy();
    expect(isDuration({ name: 'test', type: 'number' })).toBeFalsy();
  });

  test('isFontFamily', () => {
    expect(isFontFamily({ name: 'test', type: 'fontFamily' })).toBeTruthy();
    expect(isFontFamily({ name: 'test', type: 'number' })).toBeFalsy();
  });

  test('isFontWeight', () => {
    expect(isFontWeight({ name: 'test', type: 'fontWeight' })).toBeTruthy();
    expect(isFontWeight({ name: 'test', type: 'number' })).toBeFalsy();
  });

  test('isGradient', () => {
    expect(isGradient({ name: 'test', type: 'gradient' })).toBeTruthy();
    expect(isGradient({ name: 'test', type: 'number' })).toBeFalsy();
  });

  test('isNumber', () => {
    expect(isNumber({ name: 'test', type: 'number' })).toBeTruthy();
    expect(isNumber({ name: 'test', type: 'color' })).toBeFalsy();
  });

  test('isShadow', () => {
    expect(isShadow({ name: 'test', type: 'shadow' })).toBeTruthy();
    expect(isShadow({ name: 'test', type: 'number' })).toBeFalsy();
  });

  test('isStrokeStyle', () => {
    expect(isStrokeStyle({ name: 'test', type: 'strokeStyle' })).toBeTruthy();
    expect(isStrokeStyle({ name: 'test', type: 'number' })).toBeFalsy();
  });

  test('isStroke', () => {
    expect(isStroke({ name: 'test', type: 'stroke' })).toBeTruthy();
    expect(isStroke({ name: 'test', type: 'number' })).toBeFalsy();
  });

  test('isTransition', () => {
    expect(isTransition({ name: 'test', type: 'transition' })).toBeTruthy();
    expect(isTransition({ name: 'test', type: 'number' })).toBeFalsy();
  });

  test('isTypography', () => {
    expect(isTypography({ name: 'test', type: 'typography' })).toBeTruthy();
    expect(isTypography({ name: 'test', type: 'number' })).toBeFalsy();
  });
});
