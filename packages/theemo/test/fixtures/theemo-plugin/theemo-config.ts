import { TokenTier } from '../../../src/token';
import {
  ColorAlphaFormat,
  ColorFormat,
  FigmaReferencerType
} from '../../../src/tools/figma/config';
import { Tools } from '../../../src/tools/tool';

import type { TheemoConfig } from '../../../src';
import type { FigmaReaderConfig } from '../../../src/tools/figma/config';

function pathForToken(token) {
  return token.name.split('/');
}

function isTransient(token, tokens) {
  const hasColorSchemes = tokens.some(
    (t) => t.colorScheme && t.name === token.name
  );
  const isReference = !token.colorScheme && hasColorSchemes;

  return token.type === 'purpose' && isReference;
}

export const READER_CONFIG_DEV: FigmaReaderConfig = {
  tool: Tools.Figma,
  figmaFile: process.env.FIGMA_FILE as string,
  figmaSecret: process.env.FIGMA_SECRET as string,

  // referencer
  referencer: {
    type: FigmaReferencerType.FigmaPlugin,
    plugin: 'theemo',
    pluginConfig: {
      jsonbinFile: process.env.JSONBIN_FILE as string,
      jsonbinSecret: process.env.JSONBIN_SECRET as string,
      formats: {
        color: ColorFormat.Hex,
        colorAlpha: ColorAlphaFormat.Rgb
      }
    }
  },

  isTokenByStyle: (style) => {
    return style.name.includes('.') || style.name.includes('/');
  },

  getNameFromStyle: (style) => {
    if (style.name.startsWith('.')) {
      return style.name.slice(1).toLowerCase();
    }

    return style.name.toLowerCase();
  }
};

export const READER_CONFIG_PROD: FigmaReaderConfig = {
  ...READER_CONFIG_DEV,

  isTokenByStyle: (style) => {
    return (
      !style.name.startsWith('.') &&
      (style.name.includes('.') || style.name.includes('/'))
    );
  }
};

export function makeTheemoPluginConfig({ dev = false } = {}): TheemoConfig {
  return {
    sync: {
      reader: dev ? READER_CONFIG_DEV : READER_CONFIG_PROD,

      // lexer
      lexer: {
        normalizeToken(token) {
          const normalized = { ...token };

          // normalize names
          normalized.name = normalized.name.replace(/\s/g, '');

          if (normalized.reference) {
            normalized.reference = normalized.reference.replace(/\s/g, '');
          }

          // normalize contexts
          const tokenContextIndex = normalized.name.indexOf('.$');

          if (tokenContextIndex !== -1) {
            normalized.colorScheme = normalized.name.slice(
              tokenContextIndex + 2
            );
            normalized.name = normalized.name.slice(0, tokenContextIndex);
          }

          if (normalized.reference !== undefined) {
            const referenceContextIndex = normalized.reference.indexOf('.$');

            if (referenceContextIndex !== -1) {
              normalized.reference = normalized.reference.slice(
                0,
                referenceContextIndex
              );
            }
          }

          return normalized;
        },

        classifyToken(token, tokens) {
          const t = { ...token };

          t.tier = token.name.startsWith('.')
            ? TokenTier.Basic
            : TokenTier.Purpose;

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          t.transient = isTransient(t, tokens.normalized);

          return t;
        },

        filterToken(token) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return !token.transient;
        }
      },

      // writer
      writer: {
        tool: Tools.StyleDictionary,

        fileForToken(token) {
          // const parts = token.name.split('.');
          // let fileName = `${parts.shift()}/${parts.join('.')}`;

          const slashIndex = token.name.indexOf('/');
          let fileName = token.name.slice(0, slashIndex).replace(/\./g, '/');

          if (token.colorScheme) {
            fileName += `.${token.colorScheme}`;
          }

          return fileName;
        },

        pathForToken(token) {
          return pathForToken(token);
        },

        valueForToken(token, tokens) {
          if (token.reference) {
            const reference = tokens.find((t) => t.name === token.reference);

            if (reference && !reference.colorScheme) {
              return `{${pathForToken(reference).join('.')}.value}`;
            }
          }

          return token.value;
        }
      }
    },

    generate: {
      input: 'build',
      output: 'dist',
      auto: true,
      defaultColorScheme: 'light',
      colorSchemes: {
        light: {
          auto: true,
          manual: true
        },
        dark: {
          auto: true,
          manual: true
        }
      }
    }
  };
}
