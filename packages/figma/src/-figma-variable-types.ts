export interface RGB {
  /** red in [0, 1] */
  readonly r: number;
  /** green in [0, 1] */
  readonly g: number;
  /** blue in [0, 1] */
  readonly b: number;
}

export interface RGBA extends RGB {
  /** alpha in [0, 1] */
  readonly a: number;
}

export type VariableResolvedDataType = 'BOOLEAN' | 'COLOR' | 'FLOAT' | 'STRING';

export interface VariableAlias {
  type: 'VARIABLE_ALIAS';
  id: string;
}

export type VariableValue = boolean | string | number | RGB | RGBA | VariableAlias;

export type ColorVariableScope =
  | 'ALL_SCOPES'
  | 'ALL_FILLS'
  | 'FRAME_FILL'
  | 'SHAPE_FILL'
  | 'TEXT_FILL'
  | 'STROKE_COLOR'
  | 'EFFECT_COLOR';

export type FloatVariableScope =
  | 'ALL_SCOPES'
  | 'TEXT_CONTENT'
  | 'CORNER_RADIUS'
  | 'WIDTH_HEIGHT'
  | 'GAP'
  | 'STROKE_FLOAT'
  | 'OPACITY'
  | 'EFFECT_FLOAT';

export type VariableScope = FloatVariableScope | ColorVariableScope;

export interface VariableCodeSyntax {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  WEB: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ANDROID: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  IOS: string;
}

export interface Variable {
  /**  */
  readonly id: string;
  readonly name: string;
  readonly key: string;
  readonly variableCollectionId: string;
  readonly resolvedType: VariableResolvedDataType;
  readonly valuesByMode: {
    [modeId: string]: VariableValue;
  };
  readonly remote: boolean;
  readonly description: string;
  readonly hiddenFromPublishing: boolean;
  readonly scopes: VariableScope[];
  readonly codeSyntax: VariableCodeSyntax;
}

/**
 * A `FigmaVariable` is a `Variable` which has their `VariableCollection`
 * attached.
 *
 * @see [Figma Variable Documentation](https://www.figma.com/developers/api#variables-types)
 *
 * @remarks
 *
 * Figma itself treats variables and collections as two objects. As you might
 * need to have access to _both_ when in sync mode, a `FigmaVariable` does
 * exactly that.
 */
export interface FigmaVariable extends Variable {
  readonly collection: VariableCollection;
}

export interface VariableCollection {
  readonly id: string;
  readonly name: string;
  readonly modes: {
    modeId: string;
    name: string;
  }[];
  readonly defaultModeId: string;
  readonly remote: boolean;
  readonly hiddenFromPublishing: boolean;
  readonly variableIds: string[];
  readonly key: string;
}
