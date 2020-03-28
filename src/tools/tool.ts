import TokenCollection from '../token-collection';

export enum Tools {
  Unknown = 'unknown',
  StyleDictionary = 'style-dictionary'
}

export default interface Tool {
  build(): void;

  write(groupName: string, tokens: TokenCollection): void;
}
