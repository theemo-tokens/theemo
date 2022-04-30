import ReaderConfig from '../sync/reader/config.js';
import WriterConfig from '../sync/writer/config.js';

export default interface Config {
  reader?: ReaderConfig;
  writer?: WriterConfig;
}
