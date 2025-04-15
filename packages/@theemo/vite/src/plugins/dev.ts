import { findRoot, makeResolver, transformIndexHtml } from '../handler';
import {
  findRootPackage,
  findThemePackages,
  getThemeFileContents,
  getThemeFilePath,
  getThemeName,
  readFile
} from '../theme';

import type { Options } from '..';
import type { TheemoPackage } from '../types';
import type { Plugin, ViteDevServer } from 'vite';

const servedFiles = new Map<string, string>();
const physicalFiles = new Map<string, string>();

export default function devPlugin(options: Options): Plugin {
  const root = findRoot();
  const rootPackage = findRootPackage(root);
  let devServer: ViteDevServer | undefined = undefined;
  let themePackages: TheemoPackage[] = [];

  return {
    name: '@theemo/vite:dev',
    apply: 'serve',
    async buildStart() {
      themePackages = await findThemePackages(
        rootPackage,
        makeResolver((source: string) => this.resolve(source))
      );

      for (const pkg of themePackages) {
        const source = (await getThemeFileContents(
          pkg,
          makeResolver((id: string) => this.resolve(id))
        )) as string;

        const servedAt = `/theemo/${getThemeName(pkg)}.css`;

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
        if (servedFiles.has(req.originalUrl as string)) {
          res.writeHead(200, {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'text/css'
          });
          res.write(servedFiles.get(req.originalUrl as string));
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
