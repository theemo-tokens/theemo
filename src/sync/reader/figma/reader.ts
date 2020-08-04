import { Api as FigmaClient } from 'figma-api';
import ReaderAdapter from '../adapter';
import FigmaParser from './parser';
import Referencer from './referencers/referencer';
import ReferencerFactory from './referencers/referencer-factory';
import FigmaReaderConfig from './config';

export default class FigmaReader implements ReaderAdapter {
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
    return parser.parse();
  }

  private async load() {
    // read figma
    const figmaClient = new FigmaClient({
      personalAccessToken: this.config.figmaSecret
    });

    return figmaClient.getFile(this.config.figmaFile);
  }
}
