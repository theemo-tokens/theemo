import crypto from 'node:crypto';
import fs from 'node:fs';

import { THEEMO_CONFIG_ID } from '@theemo/theme';

import type { PluginOptions } from './config';
import type { ResolvedTheemoPackage } from './theme';
import type { TheemoRuntimeConfig } from '@theemo/theme';
import type { ResolvedId } from 'rollup';
import type { HtmlTagDescriptor, IndexHtmlTransformResult } from 'vite';

export function findRoot(): string {
  return process.cwd();
}

export function makeResolver(resolve: (source: string) => Promise<ResolvedId | null>) {
  return async (source: string): Promise<string | null> => {
    const result = await resolve(source);

    // eslint-disable-next-line unicorn/no-null
    return result ? result.id : null;
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

async function createConfig(
  options: PluginOptions & { fingerprint?: boolean },
  packages: ResolvedTheemoPackage[]
): Promise<TheemoRuntimeConfig> {
  const themes = packages.map((pkg) => pkg.theemo);

  return {
    options,
    themes: await Promise.all(
      themes.map(async (t) => {
        let filename = t.name;

        if (options.fingerprint === true && t.filePath) {
          const hash = await fingerprintFile(t.filePath);

          filename += `-${hash}`;
        }

        return {
          name: t.name,
          features: t.features,
          filename
        };
      })
    )
  };
}

export async function transformIndexHtml(
  html: string,
  options: PluginOptions & { fingerprint?: boolean },
  themePackages: ResolvedTheemoPackage[]
): Promise<IndexHtmlTransformResult> {
  const tags: HtmlTagDescriptor[] = [];

  // runtime config
  const config = await createConfig(options, themePackages);

  tags.push({
    injectTo: 'head',
    tag: 'meta',
    attrs: {
      name: THEEMO_CONFIG_ID,
      content: encodeURI(JSON.stringify(config))
    }
  });

  // themes
  const defaultThemePkg = themePackages.find((pkg) => pkg.theemo.name === options.defaultTheme);

  if (defaultThemePkg) {
    let filename = defaultThemePkg.theemo.name;

    if (options.fingerprint === true && defaultThemePkg.theemo.filePath) {
      const hash = await fingerprintFile(defaultThemePkg.theemo.filePath);

      filename += `-${hash}`;
    }

    tags.push({
      injectTo: 'head',
      tag: 'link',
      attrs: {
        href: `/${options.outDir}/${filename}.css`,
        type: 'text/css',
        rel: 'stylesheet',
        title: options.defaultTheme,

        'data-theemo': options.defaultTheme
      }
    });
  }

  return {
    html,
    tags
  };
}
