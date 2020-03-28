import Token from '../../token';

export default interface LexerConfig {
  normalizeToken?: (token: Token) => Token;
  classifyToken?: (token: Token) => Token;
  filterToken?: (token: Token) => boolean;
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
