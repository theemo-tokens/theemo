import { findRoot, fingerprintFile, makeResolver, transformIndexHtml } from '../handler';
import { findRootPackage, findThemePackages, getThemeFileContents, getThemeName } from '../theme';

import type { Options } from '..';
import type { TheemoPackage } from '../types';
import type { Plugin } from 'vite';

export function buildPlugin(options: Options): Plugin {
  let themePackages: TheemoPackage[] = [];

  return {
    name: '@theemo/vite:build',
    apply: 'build',
    async buildStart() {
      const root = findRoot();
      const rootPackage = findRootPackage(root);

      themePackages = await findThemePackages(
        rootPackage,
        makeResolver((source: string) => this.resolve(source))
      );

      for (const pkg of themePackages) {
        const source = await getThemeFileContents(
          pkg,
          makeResolver((id: string) => this.resolve(id))
        );

        let filename = getThemeName(pkg);

        if (pkg.theemo?.filePath) {
          const hash = await fingerprintFile(pkg.theemo.filePath);

          filename += `-${hash}`;
        }

        this.emitFile({
          type: 'asset',
          fileName: `theemo/${filename}.css`,
          source
        });
      }
    },

    transformIndexHtml(html: string) {
      return transformIndexHtml(html, { ...options, fingerprint: true }, themePackages);
    }
  };
}
