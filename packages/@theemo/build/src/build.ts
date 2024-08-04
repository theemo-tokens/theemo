import fs from 'node:fs';
import path from 'node:path';

import { readPackageSync } from 'read-pkg';
import { writePackageSync } from 'write-package';

import type { GenerateConfig, SchemeConfig } from './config';
import type { PackageJson } from 'read-pkg';

type Package = PackageJson & {
  theemo?: {
    name: string;
    colorSchemes?: string[];
    file?: string;
  };
};

function getBlockFromFile(file: string) {
  const contents = fs.existsSync(file) ? fs.readFileSync(file, 'utf-8') : '';

  return contents.replace(':root ', '');
}

function prepareColorScheme(
  schemeName: string,
  themeName: string,
  config: GenerateConfig,
  schemaConfig: SchemeConfig
) {
  const filePath = path.join(config.input, schemaConfig.file ?? `${schemeName}.css`);
  const block = getBlockFromFile(filePath);
  const contents = [];

  // queries
  if (schemaConfig.auto) {
    const queries = [];

    if (schemeName === 'light' || schemeName === 'dark') {
      queries.push(`(prefers-color-scheme: ${schemeName})`);
    }

    if (schemeName === config.defaultColorScheme) {
      queries.push('(prefers-color-scheme: none)');
    }

    if (queries.length > 0) {
      contents.push(`@media ${queries.join(', ')} {\n:root ${block}}`);
    }
  }

  // manual activiate
  if (schemaConfig.manual || !schemaConfig.auto) {
    const selector = schemaConfig.selector ?? `.${themeName}-${schemeName}`;

    contents.push(`${selector} ${block}`);
  }

  return contents.join('\n\n');
}

function prepareBaseBlock(config: GenerateConfig, name: string) {
  const basePath = path.join(config.input, config.base ?? 'base.css');

  const baseBlock = getBlockFromFile(basePath);

  const selector = `${config.auto ? ':root, ' : ''}.${name}`;

  return `${selector} ${baseBlock}`;
}

function prepareColorSchemes(config: GenerateConfig, name: string) {
  if (!config.colorSchemes) {
    return '';
  }

  const contents = [];

  for (const [scheme, schemaConfig] of Object.entries(config.colorSchemes)) {
    contents.push(
      `/* Color Scheme: ${scheme} */\n${prepareColorScheme(scheme, name, config, schemaConfig)}`
    );
  }

  return contents;
}

function getThemeName() {
  const data = readPackageSync() as Package;

  return (data.theemo?.name ?? data.name) as string;
}

/**
 * Build a theme, which can be managed by theemo
 *
 * @param config The configuration for the theme and its behavior
 */
export function build(config: GenerateConfig) {
  const name = getThemeName();
  const contents = [prepareBaseBlock(config, name), ...prepareColorSchemes(config, name)];

  const output = config.output ?? 'dist';

  if (!fs.existsSync(output)) {
    fs.mkdirSync(output);
  }

  const outFile = path.join(output, `${name}.css`);

  fs.writeFileSync(outFile, contents.join('\n'));

  // update package.json
  const packageJson = readPackageSync({ normalize: false }) as Package;

  if (!packageJson.theemo) {
    packageJson.theemo = {
      name: packageJson.name as string
    };
  }

  if (config.colorSchemes) {
    packageJson.theemo.colorSchemes = Object.keys(config.colorSchemes);
  }

  packageJson.theemo.file = outFile;

  if (!Array.isArray(packageJson.keywords)) {
    packageJson.keywords = [];
  }

  if (!packageJson.keywords.includes('theemo-theme')) {
    packageJson.keywords.push('theemo-theme');
  }

  writePackageSync(packageJson);
}
