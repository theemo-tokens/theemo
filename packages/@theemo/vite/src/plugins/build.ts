import { findRoot, fingerprintFile, makeResolver, transformIndexHtml } from '../handler';
import { findRootPackage, findThemePackages, getThemeFileContents } from '../theme';

import type { PluginOptions } from '../config';
import type { ResolvedTheemoPackage } from '../theme';
import type { Plugin } from 'vite';

export function buildPlugin(options: PluginOptions): Plugin {
  let themePackages: ResolvedTheemoPackage[] = [];

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

        let filename = pkg.theemo.name;

        if (pkg.theemo.filePath) {
          const hash = await fingerprintFile(pkg.theemo.filePath);

          filename += `-${hash}`;
        }

        this.emitFile({
          type: 'asset',
          fileName: `${options.outDir}/${filename}.css`,
          source
        });
      }
    },

    transformIndexHtml(html: string) {
      return transformIndexHtml(html, { ...options, fingerprint: true }, themePackages);
    }
  };
}
