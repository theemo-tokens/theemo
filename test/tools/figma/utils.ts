import FigmaReader from '../../../src/tools/figma/reader';
import TheemoPluginReferencer from '../../../src/tools/figma/referencers/theemo-plugin';
import moanaReferencesJson from '../../fixtures/hokulea/moana-references.json';
import moanaFigmaJson from '../../fixtures/hokulea/moana-theme.json';
import theemoPluginFigmaJson from '../../fixtures/theemo-plugin/figma.json';
import theemoPluginReferencesJson from '../../fixtures/theemo-plugin/references.json';

export function mockFigmaReaderReferences(
  reader: FigmaReader,
  references: Record<string, unknown>
): void {
  // eslint-disable-next-line dot-notation
  const referencer = reader['referencer'] as TheemoPluginReferencer;
  // eslint-disable-next-line dot-notation
  referencer['load'] = jest.fn().mockReturnValue(references);
}

export function mockFigmaReaderPayload(
  reader: FigmaReader,
  payload: Record<string, unknown>
): void {
  // eslint-disable-next-line no-param-reassign, dot-notation
  reader['load'] = jest.fn().mockReturnValue(payload);
}

export function mockFigmaReaderWithMoana(reader: FigmaReader): void {
  mockFigmaReaderReferences(reader, moanaReferencesJson);
  mockFigmaReaderPayload(reader, moanaFigmaJson);
}

export function mockFigmaReaderWithTheemo(reader: FigmaReader): void {
  mockFigmaReaderReferences(reader, theemoPluginReferencesJson);
  mockFigmaReaderPayload(reader, theemoPluginFigmaJson);
}
