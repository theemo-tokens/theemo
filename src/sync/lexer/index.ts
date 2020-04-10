import LexerConfig, { getLexerConfig } from './config';
import TokenCollection from '../../token-collection';
import Token from '../../token';

export default class Lexer {
  private config: LexerConfig;
  private rawTokens: TokenCollection = new TokenCollection();
  private normalizedTokens: TokenCollection = new TokenCollection();
  private classifiedTokens: TokenCollection = new TokenCollection();

  constructor(config: LexerConfig) {
    this.config = getLexerConfig(config);
  }

  analyze(tokens: TokenCollection): Map<string, TokenCollection> {
    this.rawTokens = tokens.map(this.normalizeToken.bind(this));

    // classification
    const classifiedTokens = this.classifyTokens(tokens);

    // grouping
    return this.findGroups(classifiedTokens);
  }

  private classifyTokens(tokens: TokenCollection): TokenCollection {
    this.normalizedTokens = tokens.map(this.normalizeToken.bind(this));
    this.classifiedTokens = this.normalizedTokens.map(
      this.classifyToken.bind(this)
    );

    return this.classifiedTokens
      .filter(this.filterToken.bind(this))
      .map(this.resolveValueFromReference.bind(this));
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

  private resolveValueFromReference(token: Token): Token {
    const referenceToken = { ...token };
    if (referenceToken.reference) {
      const reference = this.findReference(token);

      if (reference) {
        referenceToken.value = reference.value;
        referenceToken.color = reference.color;
      }
    }

    return referenceToken;
  }

  private findReference(token: Token): Token | undefined {
    let reference = this.rawTokens.find(t => t.name === token.reference);
    if (reference?.reference) {
      reference = this.findReference(reference);
    }

    return reference;
  }

  private findGroups(tokens: TokenCollection) {
    const groups: Map<string, TokenCollection> = new Map();

    for (const token of tokens) {
      const group = this.findGroup(token);
      if (!groups.has(group)) {
        groups.set(group, new TokenCollection());
      }
      groups.get(group)?.add(token);
    }

    return groups;
  }

  private findGroup(token: Token): string {
    return this.config.groupForToken?.(token) ?? '';
  }
}
