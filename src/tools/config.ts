import ReaderConfig from '../sync/reader/config';
import WriterConfig from '../sync/writer/config';

export default interface ToolConfig {
  reader?: ReaderConfig;
  writer?: WriterConfig;
}
