import type { File } from './-figma-types.js';
import type { FigmaParserConfigWithDefaults } from './config.js';
import type { FigmaToken } from './token.js';
import type { Token, TokenCollection } from '@theemo/tokens';

export interface Plugin {
  setup?(config: FigmaParserConfigWithDefaults): Promise<void> | void;
  getPluginData?(): string;
  getProperties?(token: FigmaToken): Partial<Token>;

  parse?(file: File, fileId: string): TokenCollection<FigmaToken>;
  resolve?(token: FigmaToken, tokens: TokenCollection<FigmaToken>): FigmaToken;
}
