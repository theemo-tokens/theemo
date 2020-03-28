import Token from './token';

export default class TokenCollection<T = Token> extends Set<T> {
  find(callback: (token: T) => boolean) {
    return [...this].find(callback);
  }

  filter(callback: (token: T) => boolean) {
    return new TokenCollection([...this].filter(callback));
  }

  map<U>(callback: (token: T) => U): TokenCollection<U> {
    return new TokenCollection([...this].map(callback));
  }
}
