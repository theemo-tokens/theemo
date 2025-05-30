import { TokenCollection } from '@theemo/tokens';

import type { ReaderConfig } from './config.js';

export class Reader {
  private config: ReaderConfig;

  constructor(config: ReaderConfig) {
    this.config = config;
  }

  async read(): Promise<TokenCollection> {
    let allTokens = new TokenCollection();
    const sources = Array.isArray(this.config.sources)
      ? this.config.sources
      : [this.config.sources];

    for (const tool of sources) {
      const tokens = await tool.read();

      allTokens = allTokens.merge(tokens);
    }

    return allTokens;
  }
}
