import { TokenTier } from '@theemo/core';
import { ColorAlphaFormat, ColorFormat, theemoPlugin } from '@theemo/figma';

import type { Token, TokenCollection } from '@theemo/core';
import type { FigmaReaderConfig } from '@theemo/figma';
import type { StyleDictionaryWriterConfig } from '@theemo/style-dictionary';
import type { LexerConfig } from '@theemo/sync';

function pathForToken(token: Token) {
  return token.name.split('/');
}

function isTransient(token: Token, tokens: TokenCollection) {
  const hasColorSchemes = tokens.some((t) => t.colorScheme !== undefined && t.name === token.name);
  const isReference = !token.colorScheme && hasColorSchemes;

  return token.type === 'purpose' && isReference;
}

export const THEEMO_FIGMA_READER_CONFIG_DEV: FigmaReaderConfig = {
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

export const THEEMO_FIGMA_READER_CONFIG_PROD: FigmaReaderConfig = {
  ...THEEMO_FIGMA_READER_CONFIG_DEV,

  isTokenByStyle: (style) => {
    return !style.name.startsWith('.') && (style.name.includes('.') || style.name.includes('/'));
  }
};

export const THEEMO_LEXER_CONFIG: LexerConfig = {
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
      normalized.colorScheme = normalized.name.slice(tokenContextIndex + 2);
      normalized.name = normalized.name.slice(0, tokenContextIndex);
    }

    if (normalized.reference !== undefined) {
      const referenceContextIndex = normalized.reference.indexOf('.$');

      if (referenceContextIndex !== -1) {
        normalized.reference = normalized.reference.slice(0, referenceContextIndex);
      }
    }

    return normalized;
  },

  classifyToken(token, tokens) {
    const t = { ...token };

    t.tier = token.name.startsWith('.') ? TokenTier.Basic : TokenTier.Purpose;

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
};

export const THEEMO_WRITER_CONFIG: StyleDictionaryWriterConfig = {
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
};
