import { Api as FigmaClient, Style } from 'figma-api';

import TokenCollection from '../../token-collection';
import { FigmaReaderConfig } from './config';
import FigmaParser from './parser';
import Referencer from './referencers/referencer';
import ReferencerFactory from './referencers/referencer-factory';
import { FigmaToken } from './token';

export default class FigmaReader {
  private config: FigmaReaderConfig;
  private referencer: Referencer;

  constructor(config: FigmaReaderConfig) {
    this.config = config;
    this.referencer = ReferencerFactory.create(this.config.referencer);
  }

  async read(): Promise<TokenCollection> {
    const file = await this.load();

    // create referencer
    await this.referencer.setup();

    const parser = new FigmaParser(file, this.referencer, this.config);
    const tokens = parser.parse();

    const filtered = tokens.filter(token => this.filterToken(token));
    const resolved = filtered
      .map(token => this.classifyToken(token))
      .map(token => this.resolveReference(token, filtered));
    const transformed = resolved.map(token => this.transformToken(token));

    return transformed;
  }

  private async load() {
    // read figma
    const figmaClient = new FigmaClient({
      personalAccessToken: this.config.figmaSecret
    });

    return figmaClient.getFile(this.config.figmaFile);
  }

  private filterToken(token: FigmaToken): boolean {
    return token.style ? this.isTokenByStyle(token.style) : true;
  }

  private classifyToken(token: FigmaToken): FigmaToken {
    return {
      ...token,
      type: this.getTypeFromToken(token)
    };
  }

  private resolveReference(
    token: FigmaToken,
    tokens: TokenCollection<FigmaToken>
  ): FigmaToken {
    if (token.figmaReference) {
      const referenceToken = tokens.find(
        t => t.figmaName === token.figmaReference
      );
      return {
        ...token,
        reference: referenceToken ? referenceToken.name : undefined,
        referenceToken
      };
    }

    return { ...token };
  }

  private transformToken(token: FigmaToken) {
    return this.referencer.compileToken(token);
  }

  private getTypeFromToken(token: FigmaToken): string {
    return this.config.getTypeFromToken?.(token) ?? '';
  }

  private isTokenByStyle(style: Style) {
    return this.config.isTokenByStyle?.(style) ?? !style.name.startsWith('.');
  }
}
