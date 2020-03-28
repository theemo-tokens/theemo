import FigmaReaderConfig from './figma/config';

// Reader Config
type ReaderConfig = FigmaReaderConfig & {
  source: ReaderSource;
};

export default ReaderConfig;

export enum ReaderSource {
  Figma = 'figma'
}
