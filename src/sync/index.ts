import TokenCollection from '../token-collection';
import SyncConfig from './config';
import Lexer from './lexer';
import Reader from './reader';
import Writer from './writer';

export default class SyncCommand {
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
