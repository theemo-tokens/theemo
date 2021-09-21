import { TheemoConfig } from '../../../src';
import Token, { TokenTier } from '../../../src/token';
import {
  ColorAlphaFormat,
  ColorFormat,
  FigmaReaderConfig,
  FigmaReferencerType
} from '../../../src/tools/figma/config';
import { Tools } from '../../../src/tools/tool';

function pathForToken(token) {
  const path = token.name.replace(/\//g, '.').split('.');

  return path;
}

function isTransient(token: Token, tokens) {
  const hasColorSchemes = tokens.some(
    t => t.colorScheme && t.name === token.name
  );
  const isReference = !token.colorScheme && hasColorSchemes;

  return token.tier === 'purpose' && isReference;
}

function isRatioScalingToken(name) {
  return name.match(/[+/-]?\d+$/);
}

function normalizeName(name) {
  // lowercase all things
  let n = name.toLowerCase();

  // remove all clutter
  n = n.replace(/\s+/, '');

  // strip off private name `.` at the beginning
  n = n.replace(/^\./, '');

  // from folders to canonical name
  n = n.replace(/\//g, '.');

  // hand it back ;)
  return n;
}

export const READER_CONFIG_PROD: FigmaReaderConfig = {
  tool: Tools.Figma,
  figmaFile: 'abc',
  figmaSecret: 'def',

  // referencer
  referencer: {
    type: FigmaReferencerType.FigmaPlugin,
    plugin: 'theemo',
    pluginConfig: {
      jsonbinFile: 'abc',
      jsonbinSecret: 'def',
      formats: {
        color: ColorFormat.Hex,
        colorAlpha: ColorAlphaFormat.Rgb
      }
    }
  },

  // parser
  isTokenByStyle(style) {
    return (
      !style.name.startsWith('.') &&
      (style.name.includes('.') || style.name.includes('/'))
    );
  },

  getNameFromStyle(style) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (style.styleType === 'FILL') {
      let name = normalizeName(style.name);

      // color palette names
      if (isRatioScalingToken(name)) {
        name = name
          .replace('..', '.')
          .replace('.-', '-')
          .replace('.+', '')
          .replace('.0', '0');
      }

      name = `color.${name}`.replace('color.color.', 'color.');
      return name;
    }

    return style.name;
  },

  isTokenByText(node) {
    return node.name.includes('[token]');
  },

  getNameFromText(node) {
    return node.name.replace('[token]', '').trim();
  }
};

export const READER_CONFIG_DEV: FigmaReaderConfig = {
  ...READER_CONFIG_PROD,
  isTokenByStyle(style) {
    return style.name.includes('.') || style.name.includes('/');
  }
};

export function makeHokuleaConfig({ dev = false } = {}): TheemoConfig {
  return {
    sync: {
      reader: dev ? READER_CONFIG_DEV : READER_CONFIG_PROD,

      // lexer
      lexer: {
        normalizeToken(token) {
          const normalized = { ...token };

          // normalize names
          normalized.name = normalizeName(normalized.name);
          if (normalized.reference) {
            normalized.reference = normalizeName(normalized.reference);
          }

          // normalize contexts
          const tokenContextIndex = normalized.name.indexOf('.$');
          if (tokenContextIndex !== -1) {
            normalized.colorScheme = normalized.name.slice(
              tokenContextIndex + 2
            );
            normalized.name = normalized.name.slice(0, tokenContextIndex);
          }

          // IS THIS NEEDED?
          // if (normalized.reference !== undefined) {
          //   const referenceContextIndex = normalized.reference.indexOf('.$');
          //   if (referenceContextIndex !== -1) {
          //     normalized.reference = normalized.reference.slice(
          //       0,
          //       referenceContextIndex
          //     );
          //   }
          // }

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
        }
      },

      // writer
      writer: {
        tool: Tools.StyleDictionary,

        fileForToken(token) {
          let fileName = '';

          // 1) GET LOCATIOM

          // special cases
          const flatFileMap = {
            'color.layout': 'color/layout',
            'color.palette': 'color/palette',
            'color.structure': 'color/structure',
            'color.text': 'color/text',
            structure: 'structure',
            scale: 'scale'
          };

          const prefixFileMap = [
            'color.intent',
            'color.indicator',
            'color.emphasize'
          ];

          for (const [name, file] of Object.entries(flatFileMap)) {
            if (token.name.startsWith(name)) {
              fileName = file;
            }
          }

          if (!fileName) {
            for (const name of prefixFileMap) {
              if (token.name.startsWith(name)) {
                const sub = token.name.replace(`${name}.`, '');
                const file = sub.split('.').shift();
                fileName = `${name.replace('.', '/')}/${file}`;
              }
            }
          }

          if (!fileName) {
            fileName = token.name.replace('.', '/');
          }

          // 2) ADD MODIFIERS

          if (token.colorScheme) {
            fileName += `.${token.colorScheme}`;
          }

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          if (token.transient) {
            fileName += '.transient';
          }

          return fileName;
        },

        pathForToken(token) {
          return pathForToken(token);
        },

        valueForToken(token, tokens) {
          if (token.reference) {
            const reference = tokens.find(
              t => t.name === token.reference && t.colorScheme === undefined
            );

            if (reference && token.transforms === undefined) {
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
