import { Api as FigmaClient } from 'figma-api';

import { DEFAULT_CONFIG } from './config.js';
import FigmaParser from './parser.js';
import ReferencerFactory from './referencers/referencer-factory.js';

import type TokenCollection from '../../token-collection.js';
import type { FigmaReaderConfig } from './config.js';
import type Referencer from './referencers/referencer.js';
import type { FigmaToken } from './token.js';

export default class FigmaReader {
  private config: Required<FigmaReaderConfig>;
  private referencer: Referencer;

  constructor(config: FigmaReaderConfig) {
    this.config = {
      ...DEFAULT_CONFIG,
      ...config,
    } as unknown as Required<FigmaReaderConfig>;
    this.referencer = ReferencerFactory.create(this.config.referencer);
  }

  async read(): Promise<TokenCollection> {
    const file = await this.load();

    // create referencer
    await this.referencer.setup();

    const parser = new FigmaParser(file, this.referencer, this.config);
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
      personalAccessToken: this.config.figmaSecret,
    });

    return figmaClient.getFile(this.config.figmaFile);
  }

  private classifyToken(token: FigmaToken): FigmaToken {
    return {
      ...token,
      type: this.getTypeFromToken(token),
    };
  }

  private resolveReference(token: FigmaToken, tokens: TokenCollection<FigmaToken>): FigmaToken {
    if (token.figmaReference) {
      const referenceToken = tokens.find((t) => t.figmaName === token.figmaReference);

      return {
        ...token,
        reference: referenceToken ? referenceToken.name : undefined,
        referenceToken,
      };
    }

    return { ...token };
  }

  private transformToken(token: FigmaToken) {
    return this.referencer.compileToken(token);
  }

  private getTypeFromToken(token: FigmaToken): string | undefined {
    return this.config.getTypeFromToken(token);
  }
}
