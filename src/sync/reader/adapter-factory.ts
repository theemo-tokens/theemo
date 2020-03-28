import ReaderAdapter from './adapter';
import FigmaReader from './figma';
import ReaderConfig, { ReaderSource } from './config';

export default class ReaderAdapterFactory {
  static create(config: ReaderConfig): ReaderAdapter {
    switch (config.source) {
      case ReaderSource.Figma:
        return new FigmaReader(config);

      default:
        throw new Error(`No reader found. Cannot find "${config.source}"`);
    }
  }
}
