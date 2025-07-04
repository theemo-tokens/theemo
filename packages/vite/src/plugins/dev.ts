import { findRoot, makeResolver, transformIndexHtml } from '../handler';
import {
  findRootPackage,
  findThemePackages,
  getThemeFileContents,
  getThemeFilePath,
  readFile
} from '../theme';

import type { PluginOptions } from '../config';
import type { ResolvedTheemoPackage } from '../theme';
import type { LoggingFunction } from 'rollup';
import type { Plugin, ViteDevServer } from 'vite';

const servedFiles = new Map<string, string>();
const physicalFiles = new Map<string, string>();

export default function devPlugin(options: PluginOptions): Plugin {
  const root = findRoot();
  const rootPackage = findRootPackage(root);
  let devServer: ViteDevServer | undefined = undefined;
  let themePackages: ResolvedTheemoPackage[] = [];

  return {
    name: '@theemo/vite:dev',
    apply: 'serve',
    async buildStart() {
      themePackages = await findThemePackages(
        rootPackage,
        makeResolver((source: string) => this.resolve(source)),
        this.warn.bind(this) as LoggingFunction
      );

      for (const pkg of themePackages) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const source = (await getThemeFileContents(
          pkg,
          makeResolver((id: string) => this.resolve(id))
        ))!;

        const servedAt = `/${options.outDir}/${pkg.theemo.name}.css`;

        servedFiles.set(servedAt, source);

        if (devServer) {
          const filePath = getThemeFilePath(pkg);
          const result = await this.resolve(filePath);

          if (result) {
            physicalFiles.set(result.id, servedAt);
            devServer.watcher.add(result.id);
          }
        }
      }
    },

    transformIndexHtml(html: string) {
      return transformIndexHtml(html, options, themePackages);
    },

    configureServer(server) {
      devServer = server;
      server.middlewares.use((req, res, next) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if (servedFiles.has(req.originalUrl!)) {
          res.writeHead(200, {
            'Content-Type': 'text/css'
          });
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          res.write(servedFiles.get(req.originalUrl!));
          res.end();
        } else {
          next();
        }
      });

      server.watcher.on('change', (path) => {
        if (physicalFiles.has(path)) {
          const servedAt = physicalFiles.get(path);

          if (servedAt && servedFiles.has(servedAt)) {
            const contents = readFile(path);

            servedFiles.set(servedAt, contents);
          }
        }

        server.ws.send({ type: 'full-reload' });
      });
    }
  };
}
