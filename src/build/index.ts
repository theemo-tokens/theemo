import Tool from '../tools/tool';
import BuildConfig, { SchemeConfig } from './config';
import fs from 'fs';
import path from 'path';
import { requireFile } from '../utils';

export default class BuildCommand {
  private tool: Tool;
  private config: BuildConfig;
  private name: string;

  constructor(tool: Tool, config: BuildConfig) {
    this.tool = tool;
    this.config = config;

    this.name = this.getThemeName();
  }

  private getThemeName() {
    const data = requireFile('package.json');
    return data.theemo?.name ?? data.name;
  }

  execute() {
    this.tool.build();

    this.postProcess();
  }

  private postProcess() {
    if (!this.config.enabled) {
      return;
    }

    const contents = [this.prepareBaseBlock(), ...this.prepareColorSchemes()];

    if (!fs.existsSync(this.config.output)) {
      fs.mkdirSync(this.config.output);
    }

    const outFile = path.join(this.config.output, `${this.name}.css`);
    fs.writeFileSync(outFile, contents.join('\n'));

    // update package.json with color schemes
    if (this.config.colorSchemes) {
      const packageJson = requireFile('package.json');
      if (!packageJson.theemo) {
        packageJson.theemo = {
          name: packageJson.name
        };
      }
      packageJson.theemo.colorSchemes = Object.keys(this.config.colorSchemes);

      const data = JSON.stringify(packageJson, null, '  ');
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

    const selector = `${this.config.activation === 'auto' ? ':root, ' : ''}.${
      this.name
    }`;

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
    if (config.activation === 'auto') {
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
    if (config.manual) {
      contents.push(`.${this.name}-${name} ${block}`);
    }

    return contents.join('\n\n');
  }

  private getBlockFromFile(file: string) {
    const contents = fs.readFileSync(file, 'utf-8');
    return contents.replace(':root ', '');
  }
}
