import { Api as FigmaClient } from 'figma-api';

import { TokenTier } from '../../token.js';
import { DEFAULT_CONFIG } from './config.js';
import FigmaParser from './parser.js';
import ReferencerFactory from './referencers/referencer-factory.js';

import type Token from '../../token.js';
import type TokenCollection from '../../token-collection.js';
import type { FigmaReaderConfig } from './config.js';
import type Referencer from './referencers/referencer.js';
import type { FigmaToken } from './token.js';
import type { GetFileResult } from 'figma-api/lib/api-types.js';

export default class FigmaReader {
  private config: Required<FigmaReaderConfig>;
  private referencer: Referencer;
  private transformed: Map<string, Token> = new Map();
  private file?: GetFileResult;

  constructor(config: FigmaReaderConfig) {
    this.config = {
      ...DEFAULT_CONFIG,
      ...config
    } as unknown as Required<FigmaReaderConfig>;
    this.referencer = ReferencerFactory.create(this.config.referencer);
  }

  async read(): Promise<TokenCollection> {
    this.file = await this.load();

    // create referencer
    await this.referencer.setup();

    const parser = new FigmaParser(this.file, this.referencer, this.config);
    const tokens = parser.parse();

    const resolved = tokens
      .map((token) => this.classifyToken(token))
      .map((token) => this.resolveReference(token, tokens));
    const transformed = resolved.map((token) => this.transformToken(token));

    return transformed;
  }

  private async load() {
    // read figma
    const figmaClient = new FigmaClient({
      personalAccessToken: this.config.figmaSecret
    });

    return figmaClient.getFile(this.config.figmaFile);
  }

  private classifyToken(token: FigmaToken): FigmaToken {
    token.type = this.getTypeFromToken(token);

    return token;
  }

  private resolveReference(
    token: FigmaToken,
    tokens: TokenCollection<FigmaToken>
  ): FigmaToken {
    if (token.figmaReference) {
      const referenceToken = tokens.find(
        (t) => t.figmaName === token.figmaReference
      );

      token.reference = referenceToken ? referenceToken.name : undefined;
      token.referenceToken = referenceToken;
    }

    return token;
  }

  private transformToken(token: FigmaToken) {
    if (this.transformed.has(token.name)) {
      return this.transformed.get(token.name) as Token;
    }

    const transformed: Token = {
      name: token.name,
      description: token.description,
      tier: TokenTier.Unknown,
      type: token.type,
      colorScheme: token.colorScheme,
      ...this.referencer.getProperties(token),
      ...this.getPropertiesForToken(token)
    };

    this.transformed.set(token.name, transformed);

    return transformed;
  }

  private getPropertiesForToken(token: FigmaToken): Record<string, unknown> {
    return (
      this.config.getPropertiesForToken?.(token, this.file as GetFileResult) ??
      {}
    );
  }

  private getTypeFromToken(token: FigmaToken): string | undefined {
    return this.config.getTypeFromToken(token);
  }
}
