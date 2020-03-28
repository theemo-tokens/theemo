/**
 * Theemo - the yordle powered theme automator
 *
 * @packageDocumentation
 */

import { program } from 'commander';
import dotenv from 'dotenv';
import package_ from '../package.json';
import Theemo from './theemo';

export default Theemo;

dotenv.config();

async function main() {
  program.version(package_.version);

  const theemo = new Theemo();

  program
    .command('sync')
    .description('sync from your source into your token tool')
    .action(async () => {
      await theemo.sync();
    });

  program
    .command('build')
    .description('runs the build of your token tool with post-processing')
    .action(() => {
      theemo.build();
    });

  program.parse(process.argv);
}

main();
