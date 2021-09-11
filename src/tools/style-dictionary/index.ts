import TokenCollection from '../../token-collection';
import ToolConfig from '../config';
import { BuilderTool, WriterTool } from '../tool';
import StyleDictionaryBuilder from './builder';
import { StyleDictionaryConfig } from './config';
import StyleDictionaryWriter from './writer';

export default class StyleDictionary implements WriterTool, BuilderTool {
  private config: StyleDictionaryConfig;

  constructor(config: ToolConfig) {
    this.config = config as StyleDictionaryConfig;
  }

  build() {
    const builder = new StyleDictionaryBuilder();
    builder.build();
  }

  write(tokens: TokenCollection) {
    const writer = new StyleDictionaryWriter(this.config.writer);
    writer.write(tokens);
  }
}
