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
import Theemo from './theemo';

// cli

dotenv.config();

async function main() {
  program
    .version(package_.version)
    .name(package_.name)
    .usage('command');

  const theemo = new Theemo();

  program
    .command('sync')
    .description('sync from your source into your token manager tool')
    .action(async () => {
      await theemo.sync();
    });

  program
    .command('build')
    .description('runs the build of your token manager tool')
    .action(() => {
      theemo.build();
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

export { default as TheemoConfig } from './config';
export { default as Token, BaseToken, TokenType } from './token';

// config
export { default as SyncConfig } from './sync/config';
export { default as ReaderConfig } from './sync/reader/config';
export { default as LexerConfig } from './sync/lexer/config';
export { default as WriterConfig } from './sync/writer/config';
export { default as GenerateConfig } from './generate/config';

// tools
export { Tools, ReaderTool, WriterTool, BuilderTool } from './tools/tool';
export {
  FigmaReaderConfig,
  FigmaReferencerConfig,
  FigmaReferencerType,
  FigmaReferencerPluginConfig
} from './tools/figma/config';
export {
  StyleDictionaryConfig,
  StyleDictionaryWriterConfig
} from './tools/style-dictionary/config';
