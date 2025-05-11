import crypto from 'node:crypto';
import fs from 'node:fs';

import { THEEMO_CONFIG_ID } from '@theemo/theme';

import type { PluginOptions } from './config';
import type { ResolvedTheemoPackage } from './theme';
import type { TheemoRuntimeConfig } from '@theemo/theme';
import type { ResolvedId } from 'rollup';

export function findRoot(): string {
  return process.cwd();
}

export function makeResolver(resolve: (source: string) => Promise<ResolvedId | null>) {
  return async (source: string): Promise<string | null> => {
    const result = await resolve(source);

    return result ? result.id : null;
  };
}

function createConfig(
  options: PluginOptions,
  packages: ResolvedTheemoPackage[]
): TheemoRuntimeConfig {
  const themes = packages.map((pkg) => pkg.theemo);

  return {
    options,
    themes: themes.map((t) => ({
      name: t.name,
      features: t.features
    }))
  };
}

export async function fingerprintFile(filename: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const cHash = crypto.createHash('MD5');
    const stream = fs.createReadStream(filename);

    stream.on('error', (err) => {
      reject(err);
    });
    stream.on('data', (chunk) => {
      cHash.update(chunk);
    });
    stream.on('end', () => {
      resolve(cHash.digest('hex'));
    });
  });
}

export async function transformIndexHtml(
  html: string,
  options: PluginOptions & { fingerprint?: boolean },
  themePackages: ResolvedTheemoPackage[]
): Promise<string> {
  const head = [];

  // runtime config
  const config = createConfig(options, themePackages);

  head.push(`<meta name="${THEEMO_CONFIG_ID}" content="${encodeURI(JSON.stringify(config))}">`);

  // themes
  const defaultThemePkg = themePackages.find((pkg) => pkg.theemo.name === options.defaultTheme);

  if (defaultThemePkg) {
    let filename = defaultThemePkg.theemo.name;

    if (options.fingerprint === true && defaultThemePkg.theemo.filePath) {
      const hash = await fingerprintFile(defaultThemePkg.theemo.filePath);

      filename += `-${hash}`;
    }

    head.push(`
      <link 
        href="/${options.outDir}/${filename}.css"
        type="text/css"
        rel="stylesheet"
        title="${options.defaultTheme}"
        data-theemo="${options.defaultTheme}"
      >`);
  }

  return html.replace('{{theemo}}', head.join('\n'));
}
