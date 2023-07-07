import { vi } from 'vitest';

import {
  HOKULEA_INPUT_READER_FIGMA_REFERENCES,
  HOKULEA_INPUT_READER_FIGMA_THEME,
  THEEMO_INPUT_READER_FIGMA_REFERENCES,
  THEEMO_INPUT_READER_FIGMA_THEME
} from '@theemo/fixtures';

import FigmaReader from '../src/reader.js';

// import moanaReferencesJson from './fixtures/hokulea/input/moana-references.json';
// import moanaFigmaJson from './fixtures/hokulea/input/moana-theme.json';
// import theemoPluginFigmaJson from './fixtures/theemo-plugin/input/figma.json';
// import theemoPluginReferencesJson from './fixtures/theemo-plugin/input/references.json';
import type { FigmaReaderConfig } from '../src/config.js';
import type { TheemoPlugin } from '../src/plugins/theemo.js';

export function mockTheemoPlugin(
  theemoPlugin: TheemoPlugin,
  references: Record<string, unknown>
): void {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line dot-notation
  theemoPlugin['load'] = vi.fn().mockReturnValue(references);
}

export function mockFigmaReader(reader: FigmaReader, payload: Record<string, unknown>): void {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line no-param-reassign, dot-notation
  reader['load'] = vi.fn().mockReturnValue(payload);
}

export function createReaderMockWithMoana(config: FigmaReaderConfig): FigmaReader {
  mockTheemoPlugin(
    config.plugins[0] as unknown as TheemoPlugin,
    HOKULEA_INPUT_READER_FIGMA_REFERENCES
  );

  const reader = new FigmaReader(config);

  mockFigmaReader(reader, HOKULEA_INPUT_READER_FIGMA_THEME);

  return reader;
}

export function createReaderMockWithTheemo(config: FigmaReaderConfig): FigmaReader {
  mockTheemoPlugin(
    config.plugins[0] as unknown as TheemoPlugin,
    THEEMO_INPUT_READER_FIGMA_REFERENCES
  );

  const reader = new FigmaReader(config);

  mockFigmaReader(reader, THEEMO_INPUT_READER_FIGMA_THEME);

  return reader;
}
