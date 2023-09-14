import { Lexer } from './lexer/index.js';
import { Reader } from './reader/index.js';
import { Writer } from './writer/index.js';

import type { SyncConfig } from './config.js';
import type { TokenCollection } from '@theemo/tokens';

export class SyncCommand {
  private config: SyncConfig;

  constructor(config: SyncConfig) {
    this.config = config;
  }

  async execute(): Promise<void> {
    const raw = await this.read();
    const tokens = this.analyze(raw);

    this.write(tokens);
  }

  private async read() {
    const reader = new Reader(this.config.reader);

    return reader.read();
  }

  private analyze(tokens: TokenCollection) {
    const lexer = new Lexer(this.config.lexer);

    return lexer.analyze(tokens);
  }

  private write(tokens: TokenCollection) {
    const writer = new Writer(this.config.writer);

    writer.write(tokens);
  }
}
