import type ReaderConfig from '../sync/reader/config.js';
import type WriterConfig from '../sync/writer/config.js';

export default interface Config {
  reader?: ReaderConfig;
  writer?: WriterConfig;
}
