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

  async execute() {
    const tokens = await this.read();
    const groups = this.analyze(tokens);
    this.write(groups);
  }

  private async read() {
    const reader = new Reader(this.config.reader);
    return reader.read();
  }

  private analyze(tokens: TokenCollection) {
    const lexer = new Lexer(this.config.lexer);
    return lexer.analyze(tokens);
  }

  private write(groups: Map<string, TokenCollection>) {
    const writer = new Writer(this.config.writer);

    for (const [groupName, tokens] of groups.entries()) {
      writer.write(groupName, tokens);
    }
  }
}
