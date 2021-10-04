/**
 * The yordle powered theme automator
 *
 * @packageDocumentation
 */

import { program } from 'commander';
import dotenv from 'dotenv';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import package_ from '../package.json';
import TheemoConfig from './config';
import Theemo from './theemo';
import { requireFile } from './utils';

// cli

dotenv.config();

function loadConfig(): TheemoConfig {
  return requireFile('theemo.js') as TheemoConfig;
}

async function main() {
  program.version(package_.version).name(package_.name).usage('command');

  const config = loadConfig();
  const theemo = new Theemo(config);

  program
    .command('sync')
    .description('sync from your source into your token manager tool')
    .action(async () => {
      await theemo.sync();
    });

  program
    .command('generate')
    .description('generates an adaptive CSS theme file')
    .action(() => {
      theemo.generate();
    });

  program.parse(process.argv);
}

main();

// api docs

export default Theemo;

export type { TheemoConfig };
export type { default as Token, BaseToken, TokenTier } from './token';

// config
export type { default as SyncConfig } from './sync/config';
export type { default as ReaderConfig } from './sync/reader/config';
export type { default as LexerConfig } from './sync/lexer/config';
export type { default as WriterConfig } from './sync/writer/config';
export type { default as GenerateConfig } from './generate/config';

// tools
export type { Tools, ReaderTool, WriterTool } from './tools/tool';
export type { default as Figma } from './tools/figma';
export type { default as StyleDictionary } from './tools/style-dictionary';
export type {
  FigmaReaderConfig,
  FigmaReferencerConfig,
  FigmaReferencerType,
  FigmaReferencerPluginConfig
} from './tools/figma/config';
export type { FigmaTheemoPluginConfig } from './tools/figma/referencers/theemo-plugin';
export type {
  StyleDictionaryConfig,
  StyleDictionaryWriterConfig
} from './tools/style-dictionary/config';
