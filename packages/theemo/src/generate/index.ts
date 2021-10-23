import fs from 'fs';
import path from 'path';

import { requireFile } from '../utils';
import GenerateConfig, { SchemeConfig } from './config';

interface Package {
  name: string;
  keywords: string[];
  theemo?: {
    name: string;
    colorSchemes?: string[];
    file?: string;
  };
}

export default class GenerateCommand {
  private config: GenerateConfig;
  private name: string;

  constructor(config: GenerateConfig) {
    this.config = config;

    this.name = this.getThemeName();
  }

  private getThemeName() {
    const data = requireFile('package.json') as Package;
    return data.theemo?.name ?? data.name;
  }

  execute() {
    const contents = [this.prepareBaseBlock(), ...this.prepareColorSchemes()];

    const output = this.config.output ?? 'dist';

    if (!fs.existsSync(output)) {
      fs.mkdirSync(output);
    }

    const outFile = path.join(output, `${this.name}.css`);
    fs.writeFileSync(outFile, contents.join('\n'));

    // update package.json with color schemes
    if (this.config.colorSchemes) {
      const packageJson = requireFile('package.json') as Package;
      if (!packageJson.theemo) {
        packageJson.theemo = {
          name: packageJson.name
        };
      }
      packageJson.theemo.colorSchemes = Object.keys(this.config.colorSchemes);
      packageJson.theemo.file = outFile;

      if (!packageJson.keywords) {
        packageJson.keywords = [];
      }

      if (!packageJson.keywords.includes('theemo-theme')) {
        packageJson.keywords.push('theemo-theme');
      }

      const data = JSON.stringify(packageJson, undefined, '  ');
      const packageFile = path.join(process.cwd(), 'package.json');
      fs.writeFileSync(packageFile, data);
    }
  }

  private prepareBaseBlock() {
    const basePath = path.join(
      this.config.input,
      this.config.base ?? 'base.css'
    );

    const baseBlock = this.getBlockFromFile(basePath);

    const selector = `${this.config.auto ? ':root, ' : ''}.${this.name}`;

    return `${selector} ${baseBlock}`;
  }

  private prepareColorSchemes() {
    if (!this.config.colorSchemes) {
      return '';
    }

    const contents = [];

    for (const [scheme, config] of Object.entries(this.config.colorSchemes)) {
      contents.push(
        `/* Color Scheme: ${scheme} */\n${this.prepareColorScheme(
          scheme,
          config as SchemeConfig
        )}`
      );
    }

    return contents;
  }

  private prepareColorScheme(name: string, config: SchemeConfig) {
    const filePath = path.join(this.config.input, config.file ?? `${name}.css`);
    const block = this.getBlockFromFile(filePath);
    const contents = [];

    // queries
    if (config.auto) {
      const queries = [];

      if (name === 'light' || name === 'dark') {
        queries.push(`(prefers-color-scheme: ${name})`);
      }

      if (name === this.config.defaultColorScheme) {
        queries.push('(prefers-color-scheme: none)');
      }

      if (queries.length > 0) {
        contents.push(`@media ${queries.join(', ')} {\n:root ${block}}`);
      }
    }

    // manual activiate
    if (config.manual || !config.auto) {
      contents.push(`.${this.name}-${name} ${block}`);
    }

    return contents.join('\n\n');
  }

  private getBlockFromFile(file: string) {
    const contents = fs.readFileSync(file, 'utf-8');
    return contents.replace(':root ', '');
  }
}
