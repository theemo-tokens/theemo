import path from 'node:path';
import { argv } from 'node:process';
import { fileURLToPath } from 'node:url';

import { Command } from 'commander';
import { cosmiconfig } from 'cosmiconfig';
import dotenv from 'dotenv';
import { readPackageUp } from 'read-pkg-up';

import Theemo from './theemo.js';

import type { TheemoConfig } from './config.js';

dotenv.config();

async function loadPackage() {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const foundPkg = await readPackageUp({ cwd: __dirname });

  if (foundPkg) {
    return foundPkg.packageJson;
  }

  return undefined;
}

async function loadConfig(program: Command): Promise<TheemoConfig | undefined> {
  const explorer = cosmiconfig('theemo', {
    searchPlaces: [
      '.config/theemo.js',
      '.config/theemo.cjs',
      '.config/theemo.mjs',
      'theemo.config.js',
      'theemo.config.cjs',
      'theemo.config.mjs'
    ]
  });
  const result = await explorer.search();

  if (result === null) {
    return program.error(
      'Cannot find config for theemo. Please provide a config for theemo to function properly'
    );
  }

  return result.config as TheemoConfig;
}

export async function cli() {
  // setup program
  const program = new Command();
  const pkg = await loadPackage();

  if (pkg) {
    program.version(pkg.version).name(pkg.name);
  }

  program.usage('command');

  program
    .command('sync')
    .description('sync from your source into your token manager tool')
    .action(async () => {
      // config
      const config = await loadConfig(program);

      if (config) {
        const theemo = new Theemo(config);

        await theemo.sync();
      }
    });

  // program
  //   .command('generate')
  //   .description('generates an adaptive CSS theme file')
  //   .action(() => {
  //     theemo.generate();
  //   });

  program.parse(argv);
}

cli();
