# Token Specification

Design tokens become scalable when they are replicable. A token specification is a formula for achieving design tokens scalability and tools interoperability.

A token specification (or scheme or formula) lives within a bounded context turns parameters into tokens. The formula assists to mutate the set of tokens, either in adding or removing tokens. The formula ensures [a scalable system through replication](https://www.youtube.com/watch?v=bmeo_13QtrU) (2019) as [Linda Dong](https://twitter.com/lindadong) explains. Furthermore it serves as dictionary to translate tokens from one tool to another.

There is a couple of reasons formalizing your design tokens.

- Support for design tokens varies from tool to tool. Tokens (Styles) in Figma are "typed" (e.g. colors or text) and you cannot use them wrong (that is by-design). However, design tokens as CSS custom properties for example are typeless and invalid usage is _possible_ (such as a size design token for a color property). There is no technical constraint in using the wrong design token.
- Naming is related to the nature of tools. A color style in Figma doesn't need to contain the name `color`, as this is by design. Whereas for CSS having `color` as part of the name helps to prevent invalid usage. How should the names translate from Figma to CSS? How to achieve the same experience for designers and developers alike?
- Tool specific handling: In Figma, styles beginning with a `.` are not publishable (= internal tokens of a theme). Should they be exported to a token translation tool? Yes? No? It depends? In case of _dev_ sync they might be exported; for a _production_ sync likely not.
- Your design tokens come with rules for how to combine them, ie. foreground and background colors. If these rules are not defined, chances are when changing values, the tokens no longer fit together and create disharmony in your design. In order to prevent that, define these rules in written form as part of a token specification.
- A token specification helps to identify design token inconsistencies and bring them into harmony. Do you use a certain segment of the name to indicate a stronger visual prominence over another token? Do you use `primary`/`secondary` for one set and `accentuate` for another set? Why not align them to use a common pattern?

## Appliance

A token specification consists of:

- Purpose for this token specification
- Formula with parameters returning a Token URI
  - Parameter explanation
  - Token URI explanation
- Usage Examples

A Token URI is valid within a given system and can be:

- a token name
- a storage location
- another important identifier for your system

[Models](./modeling.md) and [scales](./scales.md) focus on the _domain_ of the system. Token specification requires to also include the technical side of tokens. Parameters are of domain and technical nature:

- Domain: Actions, Indicators, Surfaces, ...
- Technical: Color, Dimension, Border, ...

Following are three examples from [Theemo theme](https://theemo.io). The examples are the upper part and explained below the ruler.

---

### Example: Instructions

Instructions are for any form of action a user will do in order to change something in the system. Visually speaking buttons, links, menus, menu-items, etc. Those instructions follow a certain intent the user is about to do. Instructions are interactive and apply these interactive states:

!#[Token Model using OOUX](./assets/specification-intents.png){.fig-25}

**Intents**

- _Action_ (default) - normal action
- _Alternative_ - when there are more/alternative options
- _Highlight_ - when a certain action should be highlighted to stand out against others
- _Danger_ - something of caution

**Importance**

This defines how intents of the same kind are visually more important than another one.

- _Supreme_ (default) - Eye-catcher - very much accentuated; visually a "fill" style
- _Subtle_ - Of lesser importance; visually an "outline" style
- _Plain_ - Of least importance; visually a "text" style

#### Formula

```txt
Figma: intent/$intent/$importance/$state/$property
CSS: --intent-$intent-$importance-$state-$property-color
Style Dictionary: intent/$intent/$importance.json
```

Parameters:

- `$intent` - see above
- `$importance` - see above
- `$state` - refer to the model
- `$property` - is either `text`, `border` and `background`

Return:

- Token URI:
  - Name in Figma and CSS
  - Storage Location for Style Dictionary

---

#### Explanation

The most straightforward case of a token specification for a chosen bounded context. Domain and technical parameters are found in the formula.

- The domain related ones align on [_purpose_ scales](./scales.md#usage) (`$intent`) for fast selection and [_pattern_ scales](./scales.md#usage) (`$importance`) offer choices for customization.
- Technical parameters (`$state` and `$property`) relate to mechanics of used technologies.

This formula allows to add and remove intents as this become a necessity. The schema allows discovery of token names for designers and developers. Engineers maintaining the token pipeline are given the business rules to translate tokens from one tool to another.

---

### Example: Color Palette

Color palettes are internal to a theme. They offer token designers choices for colors and their combinations.

#### Formula

```txt
Figma: .palette/$color-$level
CSS: --palette-$color-$level-color (dev mode only)
Style Dictionary: palette/$color.json (dev mode only)
```

Parameters:

- `$level` is a value from `100` to `900`
- `$color` is a brand related identifier

Return:

- Token URI:
  - Name in Figma and CSS
  - Storage Location for Style Dictionary

Rules:

- Tokens are available within a Figma file/theme
- `.palette` indicates an internal namespace
- Tokens are never exposed to consumers in Figma (since they are internal)
- Tokens are not exported to CSS in production sync
- Tokens are exported to CSS in dev sync
- Color levels >= 700 can be combined with a bright (white) foreground color as it ensures a contrast ratio of 4.5:1. Everything <700 is to be combined with a dark foreground color.
- Colors levels >= 600 combined with a dark foreground color meet the contrast ratio of 3:1 and can be used for large texts
- When colors are used in that form, they comply with [WCAG 2.1 Success Criterion: 1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum)
- The thresholds (600 and 700) might even differ between colors, which must be noted on each scale.

!#[Colorbox Example](./assets/specification-colorbox.png){.fig-25}

---

#### Explanation

The color palette example is more opinionated than the instructions. The same idea about parameters and return types, but the rules the color palette comes with makes them opinionated. These must be communicated to token designers to apply and use them appropriately.
