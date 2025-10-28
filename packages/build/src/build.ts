import fs from 'node:fs';
import path from 'node:path';

import { transform } from 'lightningcss';
import { readPackageSync } from 'read-pkg';
import { writePackageSync } from 'write-package';

import { BrowserMechanic } from '@theemo/theme';

import { configWithDefaults } from './config';
import { isColorSchemeFeature, isMediaQueryFeature, isModalBuildFeature } from './features';

import type { BuildConfig, BuildConfigWithDefaults } from './config';
import type {
  ColorSchemeBuildFeature,
  MediaQueryBuildFeature,
  ModalBuildFeature
} from './features';
import type { Feature, TheemoPackage, Theme } from '@theemo/theme';

const MEDIA_QUERY: Record<BrowserMechanic, string> = {
  [BrowserMechanic.ColorScheme]: 'prefers-color-scheme',
  [BrowserMechanic.ColorContrast]: 'prefers-contrast',
  [BrowserMechanic.Motion]: 'prefers-reduced-motion'
};

function readFile(file: string) {
  const contents = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';

  return contents;
}

function combineFiles(config: BuildConfig) {
  const contents = [];

  for (const file of config.files ?? []) {
    contents.push(readFile(file).trim());
  }

  return contents;
}

function buildColorSchemeFeature(feature: ColorSchemeBuildFeature) {
  return `
:root {
  color-scheme: ${(feature.options as string[]).join(' ')};
}

[data-theemo-color-scheme="light"] {
  color-scheme: light;
}

[data-theemo-color-scheme="dark"] {
  color-scheme: dark;
}
  `.trim();
}

function buildFeature(feature: ModalBuildFeature) {
  const contents = [];

  for (const [option, file] of Object.entries(feature.options)) {
    const fileContents = readFile(file);

    const selectors = option === feature.defaultOption ? [':root'] : [];

    selectors.push(`[data-theemo-${feature.name}="${option}"]`);

    const css = fileContents.replace(':root', selectors.join(', ')).trim();

    contents.push(css);
  }

  return contents;
}

function buildMediaQueryBrowserFeature(feature: MediaQueryBuildFeature) {
  const contents = [];

  const mediaQuery = MEDIA_QUERY[feature.browserFeature as BrowserMechanic];

  for (const [option, file] of Object.entries(feature.options)) {
    const fileContents = readFile(file);

    const css = `@media (${mediaQuery}: ${option}) {
    ${fileContents}
}`;

    contents.push(css);
  }

  return contents;
}

function buildFeatures(config: BuildConfigWithDefaults) {
  const contents = [];

  for (const feature of config.features) {
    if (isColorSchemeFeature(feature)) {
      contents.push(buildColorSchemeFeature(feature));
    } else if (isModalBuildFeature(feature)) {
      contents.push(...buildFeature(feature));
    }

    if (isMediaQueryFeature(feature)) {
      contents.push(...buildMediaQueryBrowserFeature(feature));
    }
  }

  return contents;
}

function getThemeName() {
  const data = readPackageSync();

  return (data.theemo as Theme | undefined)?.name ?? data.name;
}

function wrapInLayer(contents: string[], layerName: string) {
  // eslint-disable-next-line prettier/prettier
  return [
    `@layer ${layerName} {`, 
    ...contents.map((line) => `  ${line}`), 
    '}'
  ];
}

function buildFiles(config: BuildConfigWithDefaults) {
  const name = getThemeName();
  let contents = [...combineFiles(config), ...buildFeatures(config)];

  if (!fs.existsSync(config.outDir)) {
    fs.mkdirSync(config.outDir);
  }

  if (config.layerName) {
    contents = wrapInLayer(contents, config.layerName);
  }

  const outFile = path.join(config.outDir, `${name}.css`);
  const css = contents.join('\n\n');

  fs.writeFileSync(outFile, css);

  if (config.lightningcss !== false) {
    const options = typeof config.lightningcss === 'object' ? config.lightningcss : {};

    const { code } = transform({
      code: Buffer.from(css),
      filename: outFile,
      ...options
    });

    fs.writeFileSync(outFile, code);
  }
}

function updatePackage(config: BuildConfigWithDefaults) {
  const packageJson = readPackageSync({ normalize: false }) as TheemoPackage;
  const theemo = packageJson.theemo;

  theemo.file = path.join(config.outDir, `${theemo.name}.css`);
  theemo.features = config.features.map(
    (f) =>
      ({
        ...f,
        options: Array.isArray(f.options) ? f.options : Object.keys(f.options)
      }) as Feature
  );

  if (!Array.isArray(packageJson.keywords)) {
    packageJson.keywords = [];
  }

  if (!packageJson.keywords.includes('theemo-theme')) {
    packageJson.keywords.push('theemo-theme');
  }

  writePackageSync(packageJson);
}

/**
 * Build a theme, which can be managed by theemo
 *
 * @param config The configuration for the theme and its behavior
 */
export function build(config: BuildConfig): void {
  const defaultConfig = configWithDefaults(config);

  buildFiles(defaultConfig);

  updatePackage(defaultConfig);
}
