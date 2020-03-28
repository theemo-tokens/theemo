import TheemoConfig from '../../config';
import TokenCollection from '../../token-collection';
import Tool from '../tool';
import StyleDictionaryBuilder from './builder';
import StyleDictionaryWriter from './writer';

export default class StyleDictionary implements Tool {
  private config: TheemoConfig;

  constructor(config: TheemoConfig) {
    this.config = config;
  }

  build() {
    const builder = new StyleDictionaryBuilder();
    builder.build();
  }

  write(groupName: string, tokens: TokenCollection) {
    const writer = new StyleDictionaryWriter(this.config.sync.writer);
    writer.write(groupName, tokens);
  }
}
