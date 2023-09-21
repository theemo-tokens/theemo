import StyleDictionaryWriter from './writer';

import type { StyleDictionaryWriterConfig } from './config';
import type { WriterTool } from '@theemo/sync';

export function styleDictionaryWriter(config: StyleDictionaryWriterConfig): WriterTool {
  return new StyleDictionaryWriter(config);
}
