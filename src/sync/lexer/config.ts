import Token from '../../token';
import TokenCollection from '../../token-collection';

export default interface LexerConfig {
  normalizeToken?: (token: Token, tokens: { raw: TokenCollection }) => Token;
  classifyToken?: (
    token: Token,
    tokens: { raw: TokenCollection; normalized: TokenCollection }
  ) => Token;
  filterToken?: (
    token: Token,
    tokens: {
      raw: TokenCollection;
      normalized: TokenCollection;
      classified: TokenCollection;
    }
  ) => boolean;
  groupForToken?: (token: Token) => string;
}

const DEFAULT_LEXER_CONFIG = {
  normalizeToken(token: Token): Token {
    const normalized = { ...token };

    normalized.name = normalized.name.replace(/\s/g, '');
    if (normalized.reference) {
      normalized.reference = normalized.reference.replace(/\s/g, '');
    }

    return normalized;
  }
};

export function getLexerConfig(config: LexerConfig): LexerConfig {
  return {
    ...DEFAULT_LEXER_CONFIG,
    ...config
  };
}
