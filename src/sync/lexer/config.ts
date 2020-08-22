import Token from '../../token';
import TokenCollection from '../../token-collection';

/**
 * The lexer config is used for you to configure the tokens to what they mean
 * for you and to further process them
 */
export default interface LexerConfig {
  /**
   * This is to normalize tokens and remove some glibberish off of it. Comes
   * with a default, if you don't provide one (see in the example)
   *
   * @example
   *
   * This is the default normalize method:
   *
   * ```js
   * normalizeToken(token: Token): Token {
   *  const normalized = { ...token };
   *
   *  normalized.name = normalized.name.replace(/\s/g, '');
   *  if (normalized.reference) {
   *    normalized.reference = normalized.reference.replace(/\s/g, '');
   *  }
   *
   *  return normalized;
   * }
   * ```
   */
  normalizeToken?: (token: Token, tokens: { raw: TokenCollection }) => Token;

  /**
   * Describe your tokens:
   *
   * - What's the type?
   * - What's the color scheme?
   */
  classifyToken?: (
    token: Token,
    tokens: { raw: TokenCollection; normalized: TokenCollection }
  ) => Token;

  /**
   * Filter callback to only keep the tokens you need.
   *
   * @example
   *
   * You may want to keep only purpose tokens, use this:
   *
   * ```js
   * filterToken(token) {
   *   return token.type === 'purpose';
   * }
   * ```
   */
  filterToken?: (
    token: Token,
    tokens: {
      raw: TokenCollection;
      normalized: TokenCollection;
      classified: TokenCollection;
    }
  ) => boolean;

  /**
   * Return the group for a token (e.g. if you want to group them by color scheme)
   *
   * @example
   *
   * Group tokens by color scheme:
   *
   * ```js
   * groupForToken(token) {
   *   return token.colorScheme ? token.colorScheme : 'base';
   * }
   * ```
   */
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
