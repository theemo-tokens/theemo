import { describe, expect, test } from 'vitest';

import { DEFAULT_PARSER_CONFIG } from '../../src/index.js';
import FigmaParser from '../../src/plugins/figma-parser.js';
import theemoPlaygroundFigma from '../samples/theemo-playground/figma.json';

import type { GetFileResult } from 'figma-api/lib/api-types.js';

function getTokens(dev = false) {
  const theemo = new FigmaParser();

  let config = {
    ...DEFAULT_PARSER_CONFIG
  };

  if (dev) {
    config = {
      ...config,
      isTokenByStyle() {
        return true;
      }
    };
  }

  theemo.setup(config);

  return theemo.parse(theemoPlaygroundFigma as unknown as GetFileResult);
}

describe('Figma Parser', () => {
  test('styles as tokens', () => {
    const publicTokens = getTokens();
    const expectedTokens = ['grey'];

    expect([
      ...publicTokens.filter((t) => expectedTokens.includes(t.name)).map((t) => t.name)
    ]).toStrictEqual(expectedTokens);

    const allTokens = getTokens(true);
    const paletteTokens = [
      'palette.brand.100',
      'palette.brand.500',
      'palette.adjacent.500',
      'palette.adjacent.700'
    ];

    expect([
      ...allTokens.filter((t) => paletteTokens.includes(t.name)).map((t) => t.name)
    ]).toStrictEqual(paletteTokens);
  });

  describe('token types', () => {
    test('color', () => {
      const tokens = getTokens();
      const grey = tokens.find((t) => t.name === 'grey');

      expect(grey?.type).toBe('color');
    });

    test('typography', () => {
      const tokens = getTokens();
      const prose = tokens.find((t) => t.name === 'prose');

      expect(prose?.type).toBe('typography');
    });

    test('shadow', () => {
      const tokens = getTokens(true);
      const containerShadow = tokens.find((t) => t.name === 'shadow.decent');

      expect(containerShadow?.type).toBe('shadow');
    });

    test.skip('shadow with reference', () => {
      const tokens = getTokens();
      const containerShadow = tokens.find((t) => t.name === 'shape.container');

      // it is not mandatory to have this as 'shadow', because 'undefined' would
      // be valid, too
      expect(containerShadow?.type).toBe('shadow');
    });
  });

  describe('token values', () => {
    test('color', () => {
      const tokens = getTokens();
      const grey = tokens.find((t) => t.name === 'grey');

      expect(grey?.value).toBe('#d9d9d9');
    });

    test('typography', () => {
      const tokens = getTokens();
      const prose = tokens.find((t) => t.name === 'prose');

      expect(prose?.value).toStrictEqual({
        fontFamily: 'Inter',
        fontSize: '16px',
        fontWeight: 400,
        letterSpacing: '0',
        lineHeight: 1.21,
        textTransform: 'none'
      });
    });

    test('shadow', () => {
      const tokens = getTokens(true);
      const decent = tokens.find((t) => t.name === 'shadow.decent');

      expect(decent?.value).toStrictEqual({
        color: 'rgba(0, 0, 0, 0.25)',
        offsetX: '0',
        offsetY: '4px',
        blur: '4px',
        spread: '0'
      });
    });

    test('shadows', () => {
      const tokens = getTokens(true);
      const decent = tokens.find((t) => t.name === 'shadow.moar');

      expect(decent?.value).toStrictEqual([
        {
          color: 'rgba(0, 0, 0, 0.25)',
          offsetX: '0',
          offsetY: '6px',
          blur: '6px',
          spread: '0'
        },
        {
          color: 'rgba(0, 0, 0, 0.25)',
          offsetX: '0',
          offsetY: '3px',
          blur: '3px',
          spread: '0'
        }
      ]);
    });
  });
});
