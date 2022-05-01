import { Command } from 'commander';
import dotenv from 'dotenv';
import path from 'node:path';
import { argv } from 'node:process';
import { fileURLToPath } from 'node:url';

import Theemo from './theemo.js';
import { readJson, readModule } from './utils.js';

import type TheemoConfig from './config.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkg = readJson(`${__dirname}/../package.json`);
const program = new Command();

async function loadConfig(): Promise<TheemoConfig> {
  const module = await readModule('theemo.js');

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return module.default as TheemoConfig;
}

export async function cli() {
  program.version(pkg.version).name(pkg.name).usage('command');

  const config = await loadConfig();
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

  program.parse(argv);
}

cli();
