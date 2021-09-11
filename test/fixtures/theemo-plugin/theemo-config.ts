import { TheemoConfig } from '../../../src';
import { TokenType } from '../../../src/token';
import {
  ColorAlphaFormat,
  ColorFormat,
  FigmaReaderConfig,
  FigmaReferencerType
} from '../../../src/tools/figma/config';
import { Tools } from '../../../src/tools/tool';

function pathForToken(token) {
  return token.name.split('/');
}

function isTransient(token, tokens) {
  const hasColorSchemes = tokens.some(
    t => t.colorScheme && t.name === token.name
  );
  const isReference = !token.colorScheme && hasColorSchemes;

  return token.type === 'purpose' && isReference;
}

export const READER_CONFIG_PROD: FigmaReaderConfig = {
  tool: Tools.Figma,
  figmaFile: process.env.FIGMA_FILE,
  figmaSecret: process.env.FIGMA_SECRET,

  // referencer
  referencer: {
    type: FigmaReferencerType.FigmaPlugin,
    plugin: 'theemo',
    pluginConfig: {
      jsonbinFile: process.env.JSONBIN_FILE,
      jsonbinSecret: process.env.JSONBIN_SECRET,
      formats: {
        color: ColorFormat.Hex,
        colorAlpha: ColorAlphaFormat.Rgb
      }
    }
  }
};

export const READER_CONFIG_DEV: FigmaReaderConfig = {
  ...READER_CONFIG_PROD,
  isTokenByStyle: style => {
    return style.name.includes('.') || style.name.includes('/');
  },

  getNameFromStyle: style => {
    if (style.name.startsWith('.')) {
      return style.name.slice(1).toLowerCase();
    }

    return style.name.toLowerCase();
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
          t.type = token.name.startsWith('.')
            ? TokenType.Basic
            : TokenType.Purpose;

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
            const reference = tokens.find(t => t.name === token.reference);

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
