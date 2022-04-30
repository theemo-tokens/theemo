import { Command } from 'commander';
import dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
import { argv } from 'node:process';
import { fileURLToPath } from 'node:url';
import TheemoConfig from './config.js';
import Theemo from './theemo.js';
import { requireFile } from './utils.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(fs.readFileSync(`${__dirname}/../package.json`, { encoding: 'utf-8' }));
const program = new Command();


function loadConfig(): TheemoConfig {
  return requireFile('theemo.js') as TheemoConfig;
}

export async function cli() {
  program.version(pkg.version).name(pkg.name).usage('command');

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

  program.parse(argv);
}

cli();
