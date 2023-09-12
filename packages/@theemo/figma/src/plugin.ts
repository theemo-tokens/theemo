import type { FigmaParserConfigWithDefaults } from './config.js';
import type { FigmaToken } from './token.js';
import type { Token, TokenCollection } from '@theemo/core';
import type { GetFileResult } from 'figma-api/lib/api-types.js';

export interface Plugin {
  setup?(config: FigmaParserConfigWithDefaults): Promise<void> | void;
  getPluginData?(): string;
  getProperties?(token: FigmaToken): Partial<Token>;

  parse?(file: GetFileResult, fileId: string): TokenCollection<FigmaToken>;
  resolve?(token: FigmaToken, tokens: TokenCollection<FigmaToken>): FigmaToken;
}
