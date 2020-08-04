import Reader from '../src/sync/reader';
import FigmaReader from '../src/sync/reader/figma';
import TheemoPluginReferencer from '../src/sync/reader/figma/referencers/plugin/theemo';
import referencesJson from './fixtures/hokulea-moana-references.json';
import figmaJson from './fixtures/hokulea-moana-references.json';

export function mockReader(reader: Reader) {
  const figmaReader = (reader['adapter'] as FigmaReader);
  const referencer = (figmaReader['referencer'] as TheemoPluginReferencer);
  referencer['load'] = jest.fn().mockReturnValue(referencesJson);
  figmaReader['load'] = jest.fn().mockReturnValue(figmaJson);
}