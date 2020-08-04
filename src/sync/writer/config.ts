import Token from '../../token';

export default interface WriterConfig {
  formats: {
    color: ColorFormat;
    colorAlpha: ColorAlphaFormat;
  };

  fileForToken: (token: Token) => string;
  pathForToken: (token: Token) => string[];
  folderForGroup?: (group: string) => string;
}

export enum ColorFormat {
  Rgb = 'rgb',
  Hex = 'hex',
  Hsl = 'hsl'
}

export enum ColorAlphaFormat {
  Rgb = 'rgb',
  Hsl = 'hsl'
}
