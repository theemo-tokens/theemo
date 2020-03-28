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
    // read figma
    const figmaClient = new FigmaClient({
      personalAccessToken: this.config.figmaSecret
    });

    const file = await figmaClient.getFile(this.config.figmaFile);

    // create referencer
    await this.referencer.setup();

    const parser = new FigmaParser(file, this.referencer, this.config);
    return parser.parse();
  }
}
