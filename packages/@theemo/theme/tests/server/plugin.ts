import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// eslint-disable-next-line n/no-extraneous-import
import type { Plugin } from 'vite';

function loadPackage(pkgName: string) {
  const filePath = resolve(`./node_modules/${pkgName}/package.json`);
  const contents = readFileSync(filePath, { encoding: 'utf-8' });

  return contents;
}

export function fixturesPlugin(): Plugin {
  return {
    name: 'fixtures',
    configureServer(server) {
      server.middlewares.use('/get-package', (req, res, next) => {
        const name = req.url?.slice(1);

        if (name) {
          res.writeHead(200, {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'application/json'
          });
          res.write(loadPackage(name));
          res.end();
        } else {
          next();
        }
      });
    }
  };
}
