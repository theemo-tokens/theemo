import type { FigmaToken } from './token.js';
import type { Token, TokenCollection } from '@theemo/core';
import type { Style } from 'figma-api';

export interface Plugin {
  setup(...args: unknown[]): Promise<void> | void;
  getPluginData?(): string;
  parseStyle?(token: FigmaToken, style: Style): void;
  resolve?(token: FigmaToken, tokens: TokenCollection<FigmaToken>): FigmaToken;
  getProperties(token: FigmaToken): Partial<Token>;
}
