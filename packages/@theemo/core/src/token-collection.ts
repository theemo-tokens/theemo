import merge from 'lodash.merge';

import type { Token } from './token.js';

export class TokenCollection<T = Token> extends Set<T> {
  find(callback: (token: T) => boolean): T | undefined {
    return [...this].find((token) => callback(token));
  }

  filter(callback: (token: T) => boolean): TokenCollection<T> {
    return new TokenCollection([...this].filter((token) => callback(token)));
  }

  map<U>(callback: (token: T) => U): TokenCollection<U> {
    return new TokenCollection([...this].map((token) => callback(token)));
  }

  some(callback: (token: T) => boolean): boolean {
    return [...this].some((token) => callback(token));
  }

  every(callback: (token: T) => boolean): boolean {
    return [...this].every((token) => callback(token));
  }

  merge(tokens: TokenCollection<T>): TokenCollection<T> {
    const allTokens = new TokenCollection<T>();

    for (const token of tokens.values()) {
      // merge
      const foundToken = this.find((t) => (t as Token).name === (token as Token).name);

      if (foundToken) {
        allTokens.add(merge(foundToken, token));
      }

      // append
      else {
        allTokens.add(token);
      }
    }

    return allTokens;
  }
}
