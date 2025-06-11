import { Lexer } from './lexer/index.js';
import { Reader } from './reader/index.js';
import { Writer } from './writer/index.js';

import type { SyncConfig } from './config.js';
import type { TokenCollection } from '@theemo/tokens';

async function read(config: SyncConfig) {
  const reader = new Reader(config.reader);

  return reader.read();
}

function analyze(config: SyncConfig, tokens: TokenCollection) {
  const lexer = new Lexer(config.lexer ?? {});

  return lexer.analyze(tokens);
}

function write(config: SyncConfig, tokens: TokenCollection) {
  const writer = new Writer(config.writer);

  writer.write(tokens);
}

export async function sync(config: SyncConfig): Promise<void> {
  const raw = await read(config);
  const tokens = analyze(config, raw);

  write(config, tokens);
}
