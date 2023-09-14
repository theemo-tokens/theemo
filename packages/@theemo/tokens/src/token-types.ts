export type ReferenceValue = string;

export type UnknownValue = unknown;

//
//
// Primitive Values
//
//

/**
 * {@link https://tr.designtokens.org/format/#color | DTCG Spec}
 */
export type ColorValue = string;

/**
 * {@link https://tr.designtokens.org/format/#dimension | DTCG Spec}
 */
export type DimensionValue = string;

/**
 * {@link https://tr.designtokens.org/format/#font-family | DTCG Spec}
 */
export type FontFamilyValue = string | string[];

/**
 * Represents a font weight.
 *
 * The value must either be a number value in the range `[1, 1000]`
 *
 * {@link https://learn.microsoft.com/en-us/typography/opentype/spec/dvaraxistag_wght | Open Type Spec}
 */
type FontWeightNumericValue = number;

export type FontWeightAlias =
  // 100
  | 'thin'
  | 'hairline'
  // 200
  | 'extra-light'
  | 'ultra-light'
  // 300
  | 'light'
  // 400
  | 'normal'
  | 'regular'
  | 'book'
  // 500
  | 'medium'
  // 600
  | 'semi-bold'
  | 'demi-bold'
  // 700
  | 'bold'
  // 800
  | 'extra-bold'
  | 'ultra-bold'
  // 900
  | 'black'
  | 'heavy'
  // 950
  | 'extra-black'
  | 'ultra-black';

/**
 * {@link https://tr.designtokens.org/format/#font-weight | DTCG Spec}
 */
export type FontWeightValue = FontWeightAlias | FontWeightNumericValue;

/**
 * {@link https://tr.designtokens.org/format/#duration | DTCG Spec}
 */
export type DurationValue = string;

/**
 * {@link https://tr.designtokens.org/format/#cubic-bezier | DTCG Spec}
 */
export type CubicBezierValue = [number, number, number, number];

/**
 * {@link https://tr.designtokens.org/format/#number | DTCG Spec}
 */
export type NumberValue = number;

//
//
// Composite Values
//
//

/**
 * {@link https://tr.designtokens.org/format/#string-value | DTCG Spec}
 * {@link https://drafts.csswg.org/css-backgrounds/#typedef-line-style | CSS Spec}
 */
type StrokeStyleSingle =
  | 'solid'
  | 'dashed'
  | 'dotted'
  | 'double'
  | 'groove'
  | 'ridge'
  | 'outset'
  | 'inset';

type StrokeStyleComplex = {
  dashArray: ReferencedValue<DimensionValue>[];

  /**
   * {@link https://www.w3.org/TR/SVG11/painting.html#StrokeLinecapProperty | SVG Spec}
   */
  lineCap: 'round' | 'butt' | 'square';
};

/**
 * {@link https://tr.designtokens.org/format/#stroke-style | DTCG Spec}
 */
export type StrokeStyleValue = StrokeStyleSingle | StrokeStyleComplex;

/**
 * {@link https://tr.designtokens.org/format/#border | DTCG Spec}
 */
export type StrokeValue = {
  color: ReferencedValue<ColorValue>;
  width: ReferencedValue<DimensionValue>;
  style: ReferencedValue<StrokeStyleValue>;
};

/**
 * {@link https://tr.designtokens.org/format/#transition | DTCG Spec}
 */
export type TransitionValue = {
  duration: ReferencedValue<DurationValue>;
  delay: ReferencedValue<DurationValue>;
  timingFunction: ReferencedValue<CubicBezierValue>;
};

export type ShadowValueSingular = {
  color: ReferencedValue<ColorValue>;
  offsetX: ReferencedValue<DimensionValue>;
  offsetY: ReferencedValue<DimensionValue>;
  blur: ReferencedValue<DimensionValue>;
  spread: ReferencedValue<DimensionValue>;
};

/**
 * {@link https://tr.designtokens.org/format/#shadow | DTCG Spec}
 */
export type ShadowValue = ShadowValueSingular | ShadowValueSingular[];

/**
 * The number must be within [0, 1]
 *
 * {@link https://tr.designtokens.org/format/#gradient | DTCG Spec}
 */
type GradientPosition = ReferencedValue<NumberValue>;

export type GradientValue = {
  color: ReferencedValue<ColorValue>;
  position: GradientPosition;
}[];

// typography

export type TextTransformValue =
  | 'none'
  | 'capitalize'
  | 'uppercase'
  | 'lowercase'
  | 'full-width'
  | 'full-size-kana';

/**
 * Typography
 *
 * {@link https://tr.designtokens.org/format/#typography | DTCG Spec}
 */
export type TypographyValue = {
  fontFamily: ReferencedValue<FontFamilyValue>;
  fontSize: ReferencedValue<DimensionValue>;
  fontWeight: ReferencedValue<FontWeightValue>;
  letterSpacing: ReferencedValue<DimensionValue>;
  lineHeight: ReferencedValue<NumberValue>;
  textTransform: TextTransformValue;
};

//
//
// Transforms
//
//

export type ColorTransform = Partial<Record<'hue' | 'saturation' | 'lightness' | 'alpha', number>>;

//
//
// Registries
//
//

export interface TokenTransformRegistry {
  color: ColorTransform;
}

export interface TokenTypeRegistry {
  unknown: UnknownValue;
  color: ColorValue;
  dimension: DimensionValue;
  fontFamily: FontFamilyValue;
  fontWeight: FontWeightValue;
  duration: DurationValue;
  cubicBezier: CubicBezierValue;
  number: NumberValue;
  shadow: ShadowValue;
  strokeStyle: StrokeStyleValue;
  stroke: StrokeValue;
  transition: TransitionValue;
  gradient: GradientValue;
  typography: TypographyValue;
}

// type collections
export type TokenType = keyof TokenTypeRegistry;
export type TypeValues = TokenTypeRegistry[keyof TokenTypeRegistry];

// utilities
export type ValueFor<T extends TokenType> = T extends TokenType ? TokenTypeRegistry[T] : never;
export type ReferencedValue<T extends TypeValues> = ReferenceValue | T;
export type TransformFor<T extends TokenType> = T extends keyof TokenTransformRegistry
  ? TokenTransformRegistry[T]
  : never;

// extended values
export type ComputedValue<T extends TokenType> = {
  value: ValueFor<T>;
  transforms?: TransformFor<T>;
};

export type Scope = string;
export type Features = Record<string, string>;

/**
 * Tokens can be constraint by either features, scope or both
 */
export type Constraints =
  | { features: Features }
  | { scope: Scope }
  | {
      features: Features;
      scope: Scope;
    };
export type ConstrainedValue<T extends TokenType> = ComputedValue<T> & Constraints;

type NonConstrainedTokenValueSingular<T extends TokenType> =
  | ValueFor<T>
  | ComputedValue<T>
  | ReferencedValue<UnknownValue>;

export type NonConstrainedTokenValue<T extends TokenType> =
  | NonConstrainedTokenValueSingular<T>
  | NonConstrainedTokenValueSingular<T>[];

type TokenValueSingular<T extends TokenType> =
  | ValueFor<T>
  | ComputedValue<T>
  | ConstrainedValue<T>
  | ReferencedValue<UnknownValue>;

export type TokenValue<T extends TokenType> = TokenValueSingular<T> | TokenValueSingular<T>[];
