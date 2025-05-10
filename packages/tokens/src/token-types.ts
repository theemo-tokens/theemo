/**
 * Represents a reference
 *
 * Value is surrounded by curly braces: `{antoher.token}`
 */
export type ReferenceValue = string;

/**
 * An untyped, unknown value
 */
export type UnknownValue = unknown;

/**
 * Value containing text
 */
export type ContentValue = string;

//
//
// Primitive Values
//
//

/**
 * Represents a color
 *
 * @see [DTCG Spec](https://tr.designtokens.org/format/#color)
 */
export type ColorValue = string;

/**
 * Represents a dimension
 *
 * @see [DTCG Spec](https://tr.designtokens.org/format/#dimension)
 */
export type DimensionValue = string;

/**
 * Represents a font family
 *
 * @see [DTCG Spec](https://tr.designtokens.org/format/#font-family)
 */
export type FontFamilyValue = string | string[];

/**
 * Represents a font weight.
 *
 * The value must either be a number value in the range `[1, 1000]`
 *
 * @see [Open Type Spec](https://learn.microsoft.com/en-us/typography/opentype/spec/dvaraxistag_wght)
 */
type FontWeightNumericValue = number;

/**
 * Represents font weights
 */
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
 * @see [DTCG Spec](https://tr.designtokens.org/format/#font-weight)
 */
export type FontWeightValue = FontWeightAlias | FontWeightNumericValue;

/**
 * Represents a duration
 *
 * @see [DTCG Spec](https://tr.designtokens.org/format/#duration)
 */
export type DurationValue = string;

/**
 * Represents a cubic bezier
 *
 * @see [DTCG Spec](https://tr.designtokens.org/format/#cubic-bezier)
 */
export type CubicBezierValue = [number, number, number, number];

/**
 * Represents a number
 *
 * @see [DTCG Spec](https://tr.designtokens.org/format/#number)
 */
export type NumberValue = number;

//
//
// Composite Values
//
//

/**
 * Stroke style as single string
 *
 * @see [DTCG Spec](https://tr.designtokens.org/format/#string-value)
 * @see [CSS Spec](https://drafts.csswg.org/css-backgrounds/#typedef-line-style)
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

/**
 * Stroke style consistents of multiple parameters
 */
type StrokeStyleComplex = {
  dashArray: ReferencedValue<DimensionValue>[];

  /**
   * Form for the end of the lines
   *
   * @see [SVG Spec](https://www.w3.org/TR/SVG11/painting.html#StrokeLinecapProperty)
   */
  lineCap: 'round' | 'butt' | 'square';
};

/**
 * Represents a stroke style
 *
 * @see [DTCG Spec](https://tr.designtokens.org/format/#stroke-style)
 */
export type StrokeStyleValue = StrokeStyleSingle | StrokeStyleComplex;

/**
 * Represents a stroke
 *
 * @see [DTCG Spec](https://tr.designtokens.org/format/#border)
 */
export type StrokeValue = {
  /** The color of the stroke */
  color: ReferencedValue<ColorValue>;

  /** The width of the line */
  width: ReferencedValue<DimensionValue>;

  /** The style of the stroke */
  style: ReferencedValue<StrokeStyleValue>;
};

/**
 * Represents a transition
 *
 * @see [DTCG Spec](https://tr.designtokens.org/format/#transition)
 */
export type TransitionValue = {
  /** Duration of the transition */
  duration: ReferencedValue<DurationValue>;

  /** Delay when the transition */
  delay: ReferencedValue<DurationValue>;

  /** The form of the transition */
  timingFunction: ReferencedValue<CubicBezierValue>;
};

/**
 * Represents one shadow
 */
export type ShadowValueSingular = {
  color: ReferencedValue<ColorValue>;
  offsetX: ReferencedValue<DimensionValue>;
  offsetY: ReferencedValue<DimensionValue>;
  blur: ReferencedValue<DimensionValue>;
  spread: ReferencedValue<DimensionValue>;
};

/**
 * Represents a shadow
 *
 * @see [DTCG Spec](https://tr.designtokens.org/format/#shadow)
 */
export type ShadowValue = ShadowValueSingular | ShadowValueSingular[];

/**
 * Represents a gradient position
 *
 * The number must be within [0, 1]
 *
 *
 */
type GradientPosition = ReferencedValue<NumberValue>;

/**
 * Represents a gradient
 *
 * @see [DTCG Spec](https://tr.designtokens.org/format/#gradient)
 */
export type GradientValue = {
  /** The color for the gradient */
  color: ReferencedValue<ColorValue>;
  /** The stop for the color */
  position: GradientPosition;
}[];

// typography

/**
 * Represents a text transform
 */
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
 * @see [DTCG Spec](https://tr.designtokens.org/format/#typography)
 */
export type TypographyValue = {
  /** Family for the font */
  fontFamily: ReferencedValue<FontFamilyValue>;

  /** Size for the font */
  fontSize: ReferencedValue<DimensionValue>;

  /** Weight for the font */
  fontWeight: ReferencedValue<FontWeightValue>;

  /** Spacing between the letters */
  letterSpacing: ReferencedValue<DimensionValue>;

  /** height of the line */
  lineHeight: ReferencedValue<NumberValue>;

  /** Transformations for the text */
  textTransform: TextTransformValue;
};

//
//
// Transforms
//
//

/**
 * Color transformations
 */
export type ColorTransform = Partial<Record<'hue' | 'saturation' | 'lightness' | 'alpha', number>>;

//
//
// Registries
//
//

/**
 * Registry for token transformations.
 *
 * @example
 *
 * Adding your own transformations
 *
 * ```ts
 * type DimensionTransform = /* ... *\/
 *
 * declare module '@theemo/tokens' {
 *   interface TokenTransformRegistry {
 *     dimension: DimensionTransform;
 *   }
 * }
 * ```
 */
export interface TokenTransformRegistry {
  color: ColorTransform;
}

/**
 * Registry of available token types
 *
 * @example
 *
 * Adding your own types
 *
 * ```ts
 * type BorderValue = /* ... *\/
 *
 * declare module '@theemo/tokens' {
 *   interface TokenTypeRegistry {
 *     border: BorderValue;
 *   }
 * }
 * ```
 */
export interface TokenTypeRegistry {
  unknown: UnknownValue;
  content: ContentValue;
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
export type StructuredValue<T extends TokenType> = {
  value: ValueFor<T>;
};

// computeds rsp. transforms
/**
 * Computed value
 *
 * @see [Computed Values](https://theemo.io/design-tokens/internals#formulae-for-computed-tokens)
 */
export type ComputedValue<T extends TokenType> = StructuredValue<T> & {
  transforms: TransformFor<T>;
};

// constraints

/** Scope constraint */
export type Scope = string;
/**
 * Feature constraint
 *
 * > Features provide a customization option for the user experience.
 */
export type Features = Record<string, string | string[]>;

/**
 * Value constrained by features
 */
export type FeatureConstraints = {
  features: Features;
};

/**
 * Value constraint by scopes
 */
export type ScopeConstraint = {
  scope: Scope;
};

/**
 * Tokens can be constraint by either features, scope or both
 */
// | { scope: Scope }
// | { features: Features }
// | {
//     features: Features;
//     scope: Scope;
//   };
// export type Constraints = {
//   features?: Features;
//   scope?: Scope;
// };
// export type Constraints =
//   | FeatureConstraints
//   | ScopeConstraint
//   | (FeatureConstraints & ScopeConstraint);
export type Constraints = Partial<FeatureConstraints & ScopeConstraint>;

/**
 * Value with constraints
 *
 * @see [Constrained Values](https://theemo.io/design-tokens/internals#constrained-values)
 */
export type ConstrainedValue<T extends TokenType> = StructuredValue<T> & Constraints;

type NonConstrainedTokenValueSingular<T extends TokenType> =
  | ValueFor<T>
  | ReferenceValue
  | ComputedValue<T>;

export type NonConstrainedTokenValue<T extends TokenType> =
  | NonConstrainedTokenValueSingular<T>
  | NonConstrainedTokenValueSingular<T>[];

type TokenValueSingular<T extends TokenType> =
  | ValueFor<T>
  | ReferenceValue
  | ComputedValue<T>
  | ConstrainedValue<T>;

/**
 * Token value for a given type
 */
export type TokenValue<T extends TokenType> = TokenValueSingular<T> | TokenValueSingular<T>[];
