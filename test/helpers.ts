import Reader from '../src/sync/reader';
import FigmaReader from '../src/sync/reader/figma';
import TheemoPluginReferencer from '../src/tools/figma/referencers/theemo-plugin';
import referencesJson from './fixtures/hokulea-moana-references.json';
import figmaJson from './fixtures/hokulea-moana-theme.json';

export function mockFigmaReader(reader: FigmaReader) {
  const referencer = (reader['referencer'] as TheemoPluginReferencer);
  referencer['load'] = jest.fn().mockReturnValue(referencesJson);
  reader['load'] = jest.fn().mockReturnValue(figmaJson);
}