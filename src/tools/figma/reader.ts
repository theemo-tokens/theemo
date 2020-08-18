import { Api as FigmaClient } from 'figma-api';
import FigmaParser from './parser';
import Referencer from './referencers/referencer';
import ReferencerFactory from './referencers/referencer-factory';
import { FigmaReaderConfig } from './config';
import TokenCollection from '../../token-collection';
import { FigmaToken } from './token';

export default class FigmaReader {
  private config: FigmaReaderConfig;
  private referencer: Referencer;

  constructor(config: FigmaReaderConfig) {
    this.config = config;
    this.referencer = ReferencerFactory.create(this.config.referencer);
  }

  async read() {
    const file = await this.load();

    // create referencer
    await this.referencer.setup();

    const parser = new FigmaParser(file, this.referencer, this.config);
    const tokens = parser.parse();

    return this.compileTokens(tokens);
  }

  private compileTokens(tokens: TokenCollection<FigmaToken>) {
    const compiled = new TokenCollection();
    for (const token of tokens) {
      if (token.reference) {
        token.referenceToken = tokens.find(t => t.name === token.reference);
      }
      compiled.add(this.referencer.compileToken(token));
    }

    return compiled;
  }

  private async load() {
    // read figma
    const figmaClient = new FigmaClient({
      personalAccessToken: this.config.figmaSecret
    });

    return figmaClient.getFile(this.config.figmaFile);
  }
}
