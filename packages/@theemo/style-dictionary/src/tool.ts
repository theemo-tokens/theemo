import StyleDictionaryWriter from './writer';

import type { StyleDictionaryWriterConfig } from './config';
import type { WriterTool } from '@theemo/sync';

/**
 * Writes tokens to style dictionary
 *
 * @param config the writer config
 * @returns Style Dictionary Writer
 */
export function styleDictionaryWriter(config: StyleDictionaryWriterConfig): WriterTool {
  return new StyleDictionaryWriter(config);
}
