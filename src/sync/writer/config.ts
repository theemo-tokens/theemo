import { StyleDictionaryWriterConfig } from '../../tools/style-dictionary/config';
import { Tools } from '../../tools/tool';

type WriterConfig = StyleDictionaryWriterConfig & {
  tool: Tools;
};

export default WriterConfig;
