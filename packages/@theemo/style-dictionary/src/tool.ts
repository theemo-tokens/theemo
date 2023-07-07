import StyleDictionaryWriter from './writer.js';

import type { StyleDictionaryWriterConfig } from './config.js';
import type { WriterTool } from '@theemo/sync';

export function styleDictionaryWriter(config: StyleDictionaryWriterConfig): WriterTool {
  return new StyleDictionaryWriter(config);
}
