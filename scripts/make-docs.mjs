import { createReadStream, writeFile } from 'node:fs';
import { readdir } from 'node:fs/promises';

import { createInterface } from 'node:readline/promises';

import { join, parse } from 'node:path';

import util from 'node:util';
import { exec } from 'node:child_process';

// This script uses api-extractor and api-documenter and adds frontmatter
// Taken from:
// https://github.com/faastjs/faast.js/blob/master/build/make-docs.js

const execAsync = util.promisify(exec);

async function main() {
  const { stdout, stderr } = await execAsync('api-extractor run --local && api-documenter markdown -i packages/theemo/dist -o website/docs/api');
  console.log(stdout);
  console.error(stderr);
  // await new Promise((resolve, reject) =>
  //   exec(
  //     'api-extractor run --local && api-documenter markdown -i dist -o website/docs/api',
  //     (err, stdout, stderr) => {
  //       console.log(stdout);
  //       console.error(stderr);
  //       if (err) {
  //         reject(err);
  //       } else {
  //         resolve();
  //       }
  //     }
  //   )
  // );

  const dir = './website/docs/api';
  const docFiles = await readdir(dir);
  for (const docFile of docFiles) {
    try {
      const { name: id, ext } = parse(docFile);
      if (ext !== '.md') {
        continue;
      }

      const docPath = join(dir, docFile);
      const input = createReadStream(docPath);
      const output = [];
      const lines = createInterface({
        input,
        crlfDelay: Number.POSITIVE_INFINITY
      });

      let title = '';
      lines.on('line', line => {
        let skip = false;
        if (!title) {
          const titleLine = line.match(/## (.*)/);
          if (titleLine) {
            title = titleLine[1];
          }
        }
        const homeLink = line.match(/\[Home]\(.\/index\.md\) &gt; (.*)/);
        if (homeLink) {
          // Skip the breadcrumb for the toplevel index file.
          if (id !== 'theemo') {
            output.push(homeLink[1]);
          }
          skip = true;
        }
        if (!skip) {
          output.push(line.replace('<!-- -->', ''));
        }
      });

      await new Promise(resolve => lines.once('close', resolve));
      input.close();

      title = title.replace(/(package|class|interface|type|enum)/g, '').trim();

      const header = [
        '---',
        `id: ${id}`,
        `title: ${title === 'theemo' ? 'Overview' : title}`,
        `hide_title: true`,
        '---'
      ];

      await writeFile(docPath, [...header, ...output].join('\n'));
    } catch (error) {
      console.error(`Could not process ${docFile}: ${error}`);
    }
  }
}

main();
