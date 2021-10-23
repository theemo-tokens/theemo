import StyleDictionary from 'style-dictionary';

declare module 'style-dictionary' {
  type TransformGroupNamess = 'web' | 'js' | 'scss' | 'css' | 'less' | 'html' | 'android' | 'ios' | 'ios-swift-separate' | 'assets';
  interface FileConfig {
    destination: string;
    format: string;
    filter?: (object: object) => boolean;
    options?: {
      showFileHeader: boolean;
    }
  }

  interface Platform {

  }

  interface Config {
    include?: string[];
    source: string[];
    platforms: {
      [key: string]: {
        transformGroup: string;
        transforms?: string;
        buildPath: string;
        prefix?: string;
        files: FileConfig[]
      }
    }
  }

  type TransformTypes = 'name' | 'attributes' | 'value';
  
  interface Transform {
    type: TransformTypes;
    name: string;
    matcher?: (prop: object) => boolean;
    transformer: (prop: object) => string;
  }

  interface TransformGroup {
    name: string;
    transforms: string[];
  }

  type TransformGroups = Record<TransformGroupNamess, string[]>;

  export default class StyleDictionary {
    static transformGroup: TransformGroups;

    static extend(config: Config): StyleDictionary;
    static registerTransform(transform: Transform): StyleDictionary;
    static registerTransformGroup(transformGroup: TransformGroup): StyleDictionary;

    buildAllPlatforms(): StyleDictionary;
    buildPlatform(name: string): StyleDictionary;
    cleanAllPlatforms(): StyleDictionary;
    cleanPlatform(name: string): StyleDictionary;
    
  }
}