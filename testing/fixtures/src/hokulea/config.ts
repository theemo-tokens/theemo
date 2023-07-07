import { type Token, type TokenCollection, TokenTier } from '@theemo/core';
import { ColorAlphaFormat, ColorFormat, theemoPlugin } from '@theemo/figma';

import type { FigmaReaderConfig } from '@theemo/figma';
import type { StyleDictionaryWriterConfig } from '@theemo/style-dictionary';
import type { LexerConfig } from '@theemo/sync';

function pathForToken(token: Token) {
  const path = token.name.replace(/\//g, '.').split('.');

  return path;
}

function isTransient(token: Token, tokens: TokenCollection) {
  const hasColorSchemes = tokens.some((t) => t.colorScheme !== undefined && t.name === token.name);
  const isReference = !token.colorScheme && hasColorSchemes;

  return token.tier === 'purpose' && isReference;
}

function isRatioScalingToken(name: string) {
  return name.match(/[+/-]?\d+$/);
}

function normalizeName(name: string) {
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

export const HOKULEA_FIGMA_READER_CONFIG_PROD: FigmaReaderConfig = {
  files: ['file-id'],
  secret: 'figma-api-key',

  plugins: [
    theemoPlugin({
      jsonbinFile: 'jsonbin-id',
      jsonbinSecret: 'jsonbin-access-key',
      formats: {
        color: ColorFormat.Hex,
        colorAlpha: ColorAlphaFormat.Rgb
      }
    })
  ],

  // parser
  isTokenByStyle(style) {
    return !style.name.startsWith('.') && (style.name.includes('.') || style.name.includes('/'));
  },

  getNameFromStyle(style) {
    if (style.styleType === 'FILL') {
      let name = normalizeName(style.name);

      // color palette names
      if (isRatioScalingToken(name)) {
        name = name.replace('..', '.').replace('.-', '-').replace('.+', '').replace('.0', '0');
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
  },

  getTypeFromToken(token) {
    if (token.style) {
      return 'color';
    }

    return;
  },

  getPropertiesForToken(token) {
    if (token.figmaName) {
      return {
        figmaName: token.figmaName
      };
    }

    return;
  }
};

export const HOKULEA_FIGMA_READER_CONFIG_DEV: FigmaReaderConfig = {
  ...HOKULEA_FIGMA_READER_CONFIG_PROD,
  isTokenByStyle(style) {
    return style.name.includes('.') || style.name.includes('/');
  }
};

export const HOKULEA_LEXER_CONFIG: LexerConfig = {
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
      normalized.colorScheme = normalized.name.slice(tokenContextIndex + 2);
      normalized.name = normalized.name.slice(0, tokenContextIndex);
    }

    // if (normalized.reference !== undefined) {
    //   const referenceContextIndex = normalized.reference.indexOf('.$');

    //   if (referenceContextIndex !== -1) {
    //     normalized.reference = normalized.reference.slice(0, referenceContextIndex);
    //   }
    // }

    return normalized;
  },

  classifyToken(token, tokens) {
    const t = { ...token };

    t.tier = token.name.startsWith('.') ? TokenTier.Basic : TokenTier.Purpose;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    t.transient = isTransient(t, tokens.normalized);

    return t;
  }
};

export const HOKULEA_WRITER_CONFIG: StyleDictionaryWriterConfig = {
  fileForToken(token) {
    let fileName = '';

    // 1) GET LOCATIOM

    // special cases
    const flatFileMap = {
      /* eslint-disable @typescript-eslint/naming-convention */
      'color.layout': 'color/layout',
      'color.palette': 'color/palette',
      'color.structure': 'color/structure',
      'color.text': 'color/text',
      /* eslint-enable @typescript-eslint/naming-convention */
      structure: 'structure',
      scale: 'scale'
    };

    const prefixFileMap = ['color.intent', 'color.indicator', 'color.emphasize'];

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
        (t) => t.name === token.reference && t.colorScheme === undefined
      );

      if (reference && token.transforms === undefined) {
        return `{${pathForToken(reference).join('.')}.value}`;
      }
    }

    return token.value;
  }
};
