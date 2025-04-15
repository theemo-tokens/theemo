import crypto from 'node:crypto';
import fs from 'node:fs';

import { getThemeName } from './theme';

import type { Options } from '.';
import type {
  TheemoConfig,
  TheemoDescriptor,
  TheemoOptions,
  TheemoPackage,
  ThemeFeatures
} from './types';
import type { ResolvedId } from 'rollup';

export function findRoot(): string {
  // if (meta.framework === 'webpack') {
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   // @ts-ignore
  //   return meta.webpack.compiler.context;
  // }

  return process.cwd();
}

export function makeResolver(resolve: (source: string) => Promise<ResolvedId | null>) {
  return async (source: string) => {
    const result = await resolve(source);

    return result ? result.id : null;
  };
}

function createConfig(options: TheemoOptions, packages: TheemoPackage[]): TheemoConfig {
  const themes: Record<string, ThemeFeatures> = {};

  for (const pkg of packages) {
    const theemo: TheemoDescriptor = pkg.theemo || {};
    const name = getThemeName(pkg);
    const features: ThemeFeatures = {
      colorSchemes: theemo.colorSchemes || []
    };

    themes[name] = features;
  }

  return {
    options,
    themes
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
  options: Options & { fingerprint?: boolean },
  themePackages: TheemoPackage[]
) {
  const head = [];

  // runtime config
  const config = createConfig(options, themePackages);

  head.push(
    [
      '<script id="theemo-config" type="application/json">',
      JSON.stringify(config),
      '</script>'
    ].join('\n')
  );

  // themes
  const defaultThemePkg = themePackages.find((pkg) => pkg.theemo?.name === options.defaultTheme);

  if (defaultThemePkg) {
    let filename = getThemeName(defaultThemePkg);

    if (options.fingerprint === true && defaultThemePkg.theemo?.filePath) {
      const hash = await fingerprintFile(defaultThemePkg.theemo.filePath);

      filename += `-${hash}`;
    }

    head.push(`
      <link 
        href="/theemo/${filename}.css"
        type="text/css"
        rel="stylesheet"
        title="${options.defaultTheme}"
        data-theemo="${options.defaultTheme}"
      >`);
  }

  return html.replace('{{theemo}}', head.join('\n'));
}
