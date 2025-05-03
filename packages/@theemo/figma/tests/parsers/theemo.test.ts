import { describe, expect, test } from 'vitest';

import { DEFAULT_PARSER_CONFIG } from '../../src/index.js';
import { TheemoPlugin } from '../../src/plugins/theemo.js';
import theemoPlaygroundFigma from '../samples/theemo-playground/figma.json';

import type { FigmaParserConfig } from '../../src/index.js';
import type { Constraints } from '@theemo/tokens';
import type { GetFileResult } from 'figma-api/lib/api-types.js';

function getTokens(dev: boolean | Partial<FigmaParserConfig> = false) {
  const theemo = new TheemoPlugin();

  let config = {
    ...DEFAULT_PARSER_CONFIG,
    getConstraints(mode: string): Constraints | undefined {
      if (mode === 'light' || mode === 'dark') {
        return {
          features: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'color-scheme': mode
          }
        };
      }

      return undefined;
    },
    considerMode(mode: string) {
      return mode === 'light' || mode === 'dark';
    },
    ...(typeof dev === 'object' ? dev : {})
  };

  if (dev) {
    config = {
      ...config,
      isTokenByVariable() {
        return true;
      }
    };
  }

  theemo.setup(config);

  return theemo.parse(theemoPlaygroundFigma as unknown as GetFileResult);
}

describe('Theemo Plugin', () => {
  test('variables as tokens', () => {
    const publicTokens = getTokens();

    const expectedTokens = [
      'intent.action.background',
      'intent.action.border',
      'intent.action.text',
      'intent.alternative.background',
      'intent.alternative.border',
      'intent.alternative.text',
      's0',
      'padding0'
    ];

    expect([
      ...publicTokens.filter((t) => expectedTokens.includes(t.name)).map((t) => t.name)
    ]).toStrictEqual(expectedTokens);

    const allTokens = getTokens(true);

    const paletteTokens = ['brand.100', 'brand.500', 'adjacent.500', 'adjacent.700'];

    expect([
      ...allTokens.filter((t) => paletteTokens.includes(t.name)).map((t) => t.name)
    ]).toStrictEqual(paletteTokens);
  });

  describe('token types', () => {
    test('color', () => {
      const tokens = getTokens();
      const intentActionBackground = tokens.find((t) => t.name === 'intent.action.background');

      expect(intentActionBackground?.type).toBe('color');
    });

    test('color with reference', () => {
      const tokens = getTokens();
      const intentActionBorder = tokens.find((t) => t.name === 'intent.action.border');

      expect(intentActionBorder?.type).toBe('color');
    });

    test('color with reference (skipTypeForReference)', () => {
      const tokens = getTokens({ skipTypeForReferences: true });
      const intentActionBorder = tokens.find((t) => t.name === 'intent.action.border');

      expect(intentActionBorder?.type).toBe(undefined);
    });

    test('number token', () => {
      const tokens = getTokens();
      const s0 = tokens.find((t) => t.name === 's0');

      expect(s0?.type).toBe('number');
    });

    test('number reference', () => {
      const tokens = getTokens();
      const padding0 = tokens.find((t) => t.name === 'padding0');

      expect(padding0?.type).toBe('number');
    });

    test('number reference (skipTypeForReference)', () => {
      const tokens = getTokens({ skipTypeForReferences: true });
      const padding0 = tokens.find((t) => t.name === 'padding0');

      expect(padding0?.type).toBe(undefined);
    });
  });

  describe('token values', () => {
    test('color', () => {
      const tokens = getTokens(true);
      const intentActionBackground = tokens.find((t) => t.name === 'brand.500');

      expect(intentActionBackground?.value).toBe('#2a50d5');
    });

    test('color with reference', () => {
      const tokens = getTokens();
      const heroBorder = tokens.find((t) => t.name === 'hero.border');

      expect(heroBorder?.value).toBe('{hero.background}');
    });

    test('number 0', () => {
      const tokens = getTokens();
      const strokeOffset = tokens.find((t) => t.name === 'control.focus.stroke-offset');

      expect(strokeOffset?.value).toBe(0);
    });

    test('number token', () => {
      const tokens = getTokens();
      const s0 = tokens.find((t) => t.name === 's0');

      expect(s0?.value).toBe(16);
    });

    test('number reference', () => {
      const tokens = getTokens();
      const padding0 = tokens.find((t) => t.name === 'padding0');

      expect(padding0?.value).toBe('{s0}');
    });
  });

  describe('constraint values', () => {
    test('color value', () => {
      const tokens = getTokens();
      const intentActionBackground = tokens.find((t) => t.name === 'intent.action.background');

      expect(intentActionBackground?.value).toStrictEqual([
        // eslint-disable-next-line @typescript-eslint/naming-convention
        { value: '#2a50d5', features: { 'color-scheme': 'light' } },
        // eslint-disable-next-line @typescript-eslint/naming-convention
        { value: '#2a50d5', features: { 'color-scheme': 'dark' } }
      ]);
    });

    test('color reference', () => {
      const tokens = getTokens();
      const intentActionBorder = tokens.find((t) => t.name === 'intent.action.border');

      expect(intentActionBorder?.value).toStrictEqual([
        // eslint-disable-next-line @typescript-eslint/naming-convention
        { value: '{intent.action.background}', features: { 'color-scheme': 'light' } },
        // eslint-disable-next-line @typescript-eslint/naming-convention
        { value: '{intent.action.background}', features: { 'color-scheme': 'dark' } }
      ]);
    });
  });

  test('computed values', () => {
    const tokens = getTokens(true);

    const brand400 = tokens.find((t) => t.name === 'brand.400');

    expect(brand400?.value).toStrictEqual({
      value: '{brand.500}',
      transforms: {
        lightness: -10
      }
    });
  });
});
