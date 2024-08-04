import path from 'node:path';
import process from 'node:process';

import { vol } from 'memfs';
// import { createFsFromVolume, fs } from 'memfs';
// import { parsePackage, readPackage } from 'read-pkg';
import { fileURLToPath } from 'url';
import { beforeEach, test, vi } from 'vitest';

// import { build } from '../src';
import { createDirectoryJSONFromFs } from './-utils';

// eslint-disable-next-line @typescript-eslint/naming-convention
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = path.dirname(__filename);

beforeEach(() => {
  // reset the state of in-memory fs
  vol.reset();
});

vi.mock('node:fs');
vi.mock('node:fs/promises');

// I failed on the testing story. When and how things need to be mocked I
// haven't mastered yet - and never have used memfs before.
// Some links:
// https://github.com/streamich/fs-monkey/issues/139
// https://gist.github.com/boneskull/dd11a4d73024909299e26c95c85edc70
test.skip('keyword is present', async () => {
  const project = path.join(__dirname, './scenarios/moana');

  process.chdir(project);

  // requires `fs` not to be mocked
  const json = await createDirectoryJSONFromFs(project);

  vol.fromJSON(json, '/prj');

  // build({
  //   auto: true,
  //   input: path.join(project, '/styles')
  // });

  // const pkgFile = fs.readFileSync('/prj/package.json');

  // const pkg = parsePackage(pkgFile.toString());

  // console.log(pkg);
});

// @todo test to check that no `_id` and `readme` fields are there
