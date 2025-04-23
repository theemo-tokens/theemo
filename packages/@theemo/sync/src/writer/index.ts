import type { WriterConfig } from './config.js';
import type { TokenCollection } from '@theemo/tokens';

export class Writer {
  private config: WriterConfig;

  constructor(config: WriterConfig) {
    this.config = config;
  }

  write(tokens: TokenCollection): void {
    const targets = Array.isArray(this.config.targets)
      ? this.config.targets
      : [this.config.targets];

    for (const tool of targets) {
      tool.write(tokens);
    }
  }
}
