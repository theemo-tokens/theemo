import { TokenCollection } from '@theemo/core';

import { getLexerConfig } from './config.js';

import type { LexerConfig } from './config.js';
import type { Token } from '@theemo/core';

export class Lexer {
  private config: LexerConfig;
  private rawTokens: TokenCollection = new TokenCollection();
  private normalizedTokens: TokenCollection = new TokenCollection();
  private classifiedTokens: TokenCollection = new TokenCollection();

  constructor(config: LexerConfig) {
    this.config = getLexerConfig(config);
  }

  analyze(tokens: TokenCollection): TokenCollection {
    this.rawTokens = tokens;

    // normalization
    this.normalizedTokens = tokens.map(this.normalizeToken.bind(this));

    // classification
    this.classifiedTokens = this.normalizedTokens.map(this.classifyToken.bind(this));

    // filter
    const filteredTokens = this.classifiedTokens.filter(this.filterToken.bind(this));

    return filteredTokens;
  }

  private normalizeToken(token: Token): Token {
    return (
      this.config.normalizeToken?.(token, {
        raw: this.rawTokens
      }) ?? token
    );
  }

  private classifyToken(token: Token): Token {
    return (
      this.config.classifyToken?.(token, {
        raw: this.rawTokens,
        normalized: this.normalizedTokens
      }) ?? token
    );
  }

  private filterToken(token: Token): boolean {
    return (
      this.config.filterToken?.(token, {
        raw: this.rawTokens,
        normalized: this.normalizedTokens,
        classified: this.classifiedTokens
      }) ?? true
    );
  }
}
