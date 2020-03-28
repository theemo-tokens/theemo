import ReaderAdapter from './adapter';
import ReaderAdapterFactory from './adapter-factory';
import ReaderConfig from './config';

export default class Reader {
  private config: ReaderConfig;
  private adapter: ReaderAdapter;

  constructor(config: ReaderConfig) {
    this.config = config;
    this.adapter = ReaderAdapterFactory.create(this.config);
  }

  async read() {
    return this.adapter.read();
  }
}
