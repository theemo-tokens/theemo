# Put Your Tokens on a Scale

Ever worked with a set of design tokens that are super inconsistent and hardly distinguishable? Perhaps a wrong scale? This article explains the available scales, their problems and what to use them for.

[Scales of measures (or level of measurement)](https://en.wikipedia.org/wiki/Level%20of%20measurement) have been developed for scientific investigations; at first in the field of psychology. Different scales allow mathematical transformations to run an analysis on the measured results.

Design Tokens will be placed along those scales - does it happen consciously or unconsciously? Readers of this article will belong to the former group and avoid creating confusion for design token consumers.

## Scales

Available scales are the following table (Bös, Hänsel & Schott, 2004, p. 20f) and explained in the following subsections:

| Nominal | Ordinal | Interval | Ratio |
|---------|---------|----------|-------|
| Discrete | Discrete | Continuous | Continuous |
| Qualitative | Qualitative | Quantitative | Quantitative |
| Categorial | Orderly categorial | Orderly categorial | Orderly categorial |
| | Sorting | Sorting | Sorting |
| | | Equal distance between steps | Equal distance between steps |
| | | | Natural null point |
| =, ≠ | =, ≠ <br> <, > | =, ≠ <br> <, > <br> +, - | =, ≠ <br> <, > <br> +, - <br> ×, / |

The majority of tokens are [_choices_ or _decisions_](https://lukasoppermann.medium.com/design-tokens-what-are-they-how-will-they-help-you-b73f80f602ab) (Oppermann, 2019). This concept maps to the available scales and will be applied for the examples.

### Nominal

A nominal scale helps to categorize design tokens into mutually exclusive, discrete groups.

(1) Objects within a given namespace (determined by the bounded context) form groups that can take further details.

- `shapes.shadow.*`
  - `shapes` - namespace, given by bounded context
  - `shadow` - nominal object
  - `*` - details

(2) Decisions within an object. An object (as from the example above), can hold choices and decisions.

```txt
- shapes.shadow.action
- shapes.shadow.container
- shapes.shadow.popup
- shapes.shadow.window
```

The `action`, `container`, `popup` and `window` are _decisions_ for a particular _purpose_ that exists within the system.

### Ordinal

An ordinal scale allows categorization and ranking, but you cannot say anything about the distance between those ranks. Ranked (or sorted) design tokens often represent _patterns_:

- Importance: `supreme`, `subtle`, `plain`
- Sizing: `extra-small`, `small`, `medium`, `large`, `extra-large`

In contrast to nominal scales, they are _choices_ - meaning a token consumer must understand the arbitrary spectrum on which they are sorted, and based on that decide which token to use. This puts a mental burden on token consumers until those patterns are educated properly.

For example, picking a font-size given the aforementioned scale, which one should I pick for prose text? Is it `medium` or `small`? There is no reference baked into the scale which contains the necessary cue.

Additionally it puts a linguistic burden on token consumers in understanding these tokens align on a ranked scale. Steps are constructed with a semantic differential (Singer, 2002, p. 136), which can cause ambiguity in their naming and become problematic for token consumers. An exercise to demonstrate this, please pick the token which contains the lowest number:

```txt
- sizing.normal
- sizing.more-than-normal
- sizing.thiniest
- sizing.smaller
- sizing.tinier-than-thiniest
```

Keeping this in mind the semantic differential has a high versatile practicability and Lukas Oppermann (2019), suggest they are "[helpful for small scales with around five items](https://uxdesign.cc/naming-design-tokens-9454818ed7cb)", for example to encode _patterns_ of your system.

As ordinal tokens are based on a semantic differential their scalability is limited to stay within linguistic cluster, expanding the scale is finite.

### Interval

An ordinal scale allows categorization and ranking, and infers equal distance between neighboring steps, but there is no true zero point. Temperatures in Celsius and Fahrenheit are using an interval scale.

Numeric design tokens are aligned on an interval scale and allow sorting. Similar to ordinal tokens they are considered _choices_. Examples can be found in color palettes:

```txt
- palette-blue-100
- palette-blue-200
- palette-blue-...
- palette-blue-700
- palette-blue-800
- palette-blue-900
```

and sizing:

```txt
- sizing-3
- sizing-2
- sizing-1
- sizing0
- sizing+1
- sizing+2
- sizing+3
```

Interval scales can be based on real-world scenarios, take Celsius temperature scale, which is based on aggregate states of water:

- 0°C: Water freezes
- 100°C: Water boils

which allows reasonable interpretations in between: ~37°C is human temperature and some people consider this their comfortable showering temperature. It helps for cooking either to stay within the temperature range up to 100°C.

Scales for design tokens can be adequately meaningful. Take the sizing example from above, what size to pick for prose text? The reference to a real-world scenario is at best opaque with ordinal scale. An irritation the interval scale is able to mitigate: `sizing0` relates to the user's preferred font-size (= `1em` at `:root`). As the scale goes into negative and positive it can be interpreted as "two steps smaller (or bigger) than user preference". The steps ain't need to be linear, a logarithmic [modular scale](https://www.modularscale.com/) works too.

Thanks to tools like [ColorBox](https://colorbox.io) by Lyft, [Leonardo](https://leonardocolor.io) by Adobe or [Prism](https://primer.style/prism) by Github color palettes reference to color contrast and itself become meaningful: "Use a color 700 as background and combine it with a light text color to ensure AA contrast ratio".

Interval scales can expand infinitely. New steps can be added to expand the outer edges of the spectrum and intermediate steps can be injected.

Use interval scales for tokens with infinite scalability. Relating scales to a referential system increases their meaning and can be more suitable than ordinal scales (see sizing example).

### Ratio

A ratio scale is similar to an interval scale but has a _true natural zero_ as reference. `0K` is the natural zero for the Kelvin temperature scale (in contrast to Celsius or Fahrenheit).

In design systems, a natural zero would be for example a `0px` value. A Design tokens' value _may_ expressed as a real pixel value but this is not the idea to design scales towards natural zeros and classifies ratio scales as inappropriate use for design tokens, which is why they are pretty much non-existent.

Better approach is to use a meaningful interval scale.

## Usage

Uncovering the jungle of scales allows for conscious use. All scales have their right of existence and hint to be a fit for a certain use-case or purpose, their usage is mutually _inclusive_.

Next is a usage **example**, showcasing `shadows` within the `shapes` context being implemented in either scale and then discusses for which target group which scale suits best.

!#[Scales from Generic to Specific](./assets/scale.png){.fig-75}

The generic options in a level-based scale towards the left and the more specific options with purpose driven scale towards the right. This extracts into the usage summary for design tokens:

| Levels | Patterns | Purposes |
| ------ | -------- | -------- |
| - Interval Scale<br>- Choices<br>- Highest range of options<br>- Infinitely scalable | - Ordinal Scale<br> - Choices<br>- Limited range of options<br>- Finitely scalable | - Nominal Scale<br> - Decision |

The scales are on a spectrum from **generic** (levels) to **specific** (purpose) and correlate with the targeted audience. Material UI is used by a broad audience and they chose to [use elevation levels](https://m3.material.io/styles/elevation/overview) and design their scale to be more generic.\
A design system for a considerably low amount of consumers is better advised to aim for specific purpose oriented scale.

A scale is valid within a bounded context. For sizing the interval scale is better to relate the tokens with a referential system, and for shadows a nominal scale will do the job (ie. even MUI differs between their bounded contexts). Important is to relate this with your communication model and ability to reason about the chosen approach.

Are these tokens for a different consumer cohort? The levels for token designers, and the purposes for token consumers? This is a valid approach and in theory allows all scales to be used and references between them:

- A purpose references a pattern -or-
- A purpose references a level.
- A pattern references a level.

In the end, it is important how you reason about it and how it incorporates your system or personal needs.

Different scales for token designers and consumers can be useful, even only internal to a [theme](./theming.md).

## References

- Bös, K., Hänsel, F., & Schott, N. (2004). _Empirische Untersuchungen in der Sportwissenschaft_ (2nd ed.). Czwarlina.
- Oppermann, L. (2019). _Design tokens — What are they & how will they help you?_ <https://lukasoppermann.medium.com/design-tokens-what-are-they-how-will-they-help-you-b73f80f602ab>
- Oppermann, L. (2022, January 27). _Naming Design Tokens - The Practical Guide_. UX Collective. <https://uxdesign.cc/naming-design-tokens-9454818ed7cb>
- Singer, R. (2002). Entwicklung von (Test-)Skalen. In R. Singer  & K. Willimczik (Eds.), _Sozialwissenschaftliche Forschungsmethoden in der Sportwissenschaft_ (Vol. 2/3, pp. 123–141). Hamburg: Czwarlina.
