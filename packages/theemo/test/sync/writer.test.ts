import fs from 'fs';
import jp from 'jsonpath';
import mockFs from 'mock-fs';

import Lexer from '../../src/sync/lexer';
import Writer from '../../src/sync/writer';
import FigmaReader from '../../src/tools/figma/reader';
import { makeHokuleaConfig } from '../fixtures/hokulea/theemo-config';
import {
  EXPECTED_FILES as MOANA_EXPECTED_FILES_DEV,
  SAMPLES as MOANA_SAMPLES_DEV
} from '../fixtures/hokulea/writer/moana-result-dev';
import {
  EXPECTED_FILES as MOANA_EXPECTED_FILES_PROD,
  SAMPLES as MOANA_SAMPLES_PROD
} from '../fixtures/hokulea/writer/moana-result-prod';
import { makeTheemoPluginConfig } from '../fixtures/theemo-plugin/theemo-config';
import {
  EXPECTED_FILES as THEEMO_EXPECTED_FILES_DEV,
  SAMPLES as THEEMO_SAMPLES_DEV
} from '../fixtures/theemo-plugin/writer/theemo-result-dev';
import {
  EXPECTED_FILES as THEEMO_EXPECTED_FILES_PROD,
  SAMPLES as THEEMO_SAMPLES_PROD
} from '../fixtures/theemo-plugin/writer/theemo-result-prod';
import {
  mockFigmaReaderWithMoana,
  mockFigmaReaderWithTheemo
} from '../tools/figma/utils';

async function write({ config, mockReader }) {
  const reader = new FigmaReader(config.sync.reader);

  mockReader(reader);

  const raw = await reader.read();
  const lexer = new Lexer(config.sync.lexer);
  const tokens = lexer.analyze(raw);
  const writer = new Writer(config.sync.writer);

  writer.write(tokens);
}

function testExistingFiles(files) {
  for (const file of files) {
    expect(
      fs.existsSync(`tokens/${file}`),
      `File "tokens/${file}" exists`
    ).toBeTruthy();
  }
}

function testSamples(samples) {
  for (const sample of samples) {
    const tokens = JSON.parse(
      fs.readFileSync(`tokens/${sample.file}`, { encoding: 'utf-8' })
    );

    const props = jp.query(tokens, `$.${sample.path}`);

    expect(props[0], `props for ${sample.path}`).toEqual(
      expect.objectContaining(sample.properties)
    );
  }
}

describe('Sync > Writer', () => {
  beforeEach(() => {
    mockFs();
  });

  afterEach(mockFs.restore);

  describe('Source: Theemo (prod)', () => {
    const config = makeTheemoPluginConfig();

    test('expected files and properties exist', async () => {
      await write({ config, mockReader: mockFigmaReaderWithTheemo });

      testExistingFiles(THEEMO_EXPECTED_FILES_PROD);
      testSamples(THEEMO_SAMPLES_PROD);
    });
  });

  describe('Source: Theemo (dev)', () => {
    const config = makeTheemoPluginConfig({ dev: true });

    test('expected files and properties exist', async () => {
      await write({ config, mockReader: mockFigmaReaderWithTheemo });

      testExistingFiles(THEEMO_EXPECTED_FILES_DEV);
      testSamples(THEEMO_SAMPLES_DEV);
    });
  });

  describe('Source: Moana (prod)', () => {
    const config = makeHokuleaConfig();

    test('expected files and properties exist', async () => {
      await write({ config, mockReader: mockFigmaReaderWithMoana });

      testExistingFiles(MOANA_EXPECTED_FILES_PROD);
      testSamples(MOANA_SAMPLES_PROD);
    });
  });

  describe('Source: Moana (dev)', () => {
    const config = makeHokuleaConfig({ dev: true });

    test('expected files and properties exist', async () => {
      await write({ config, mockReader: mockFigmaReaderWithMoana });

      testExistingFiles(MOANA_EXPECTED_FILES_DEV);
      testSamples(MOANA_SAMPLES_DEV);
    });
  });
});
