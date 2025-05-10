import merge from 'lodash.merge';

import type { Token } from './token';

/**
 * Collection of tokens.
 *
 * Well suited to manage tokens
 */
export class TokenCollection<T = Token> extends Set<T> {
  /**
   * Find a token
   *
   * @param callback your search function
   * @returns the first token matched by the provided callback
   */
  find(callback: (token: T) => boolean): T | undefined {
    return [...this].find((token) => callback(token));
  }

  /**
   * Filters the list of tokens
   *
   * @param callback your filter function
   * @returns a collection of tokens matched by your filter function
   */
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

  /**
   * Merges this collection with another token collection
   *
   * @param tokens the other token collection
   * @returns the merged token collection
   */
  merge(tokens: TokenCollection<T>): TokenCollection<T> {
    const allTokens = new TokenCollection<T>(this);

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
