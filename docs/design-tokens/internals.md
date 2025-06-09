# Internals

Tokens not only have a name and a value, they carry on a lot more data, which when given proper meaning is a knowledgeable resource.

The [Design Tokens W3C Community Group](https://www.designtokens.org) is working on [Design Token Format Module](https://design-tokens.github.io/community-group/format/), a specification that contains a schema to catalog design tokens with their respective data. At the time of writing, the spec is available as draft and they requesting feedback from the community for improvements - head over to their [Github repository](https://github.com/design-tokens/community-group) to provide a helping hand.
They have done a fantastic job in formulating a grammar for token related fields (prefixed with a `$` sigil, e.g. `$value`) and allowing custom fields (everything not prefixed with a `$` - some exceptions such as groups). The defined token related fields convey the details of tokens, e.g. typed values.

This series uncovered more details describing a token. More data helps for informed decision on filtering, sorting or mapping tokens, when translating them from one tool/format into another. Following is an explanation of additional properties, and when needed can be added as custom fields in your tokens. They may or may not be included in the specification - depending whether the need arises.

## Tiers / Levels

Tiers were discussed in [the Three Class Token Society](./three-class-token-society.md). As mentioned, a tier is not always given for a token, so it is an optional attribute.

When given, is a good attribute for filtering and sorting tokens when translating them from one tool into another.

## Visibility

Explained in [Theming](./theming.md) tokens are internal or external to a theme. In programming this is called visibility. Depending on the programming language and their history this must be either defined or when omitted has a default visibility given.

For design tokens, it must be a given attribute - whether explicit or implicit depends on the tool.

In Figma for example, every style (and component) beginning with a `.` is internal by default (matching the mechanics of hidden files in Unix systems) and thus not publishable. Yet, this doesn't mean when accessing Figma through the REST API, these rules don't apply.

Similar to tiers, visibility is a key attribute when filtering tokens for translating them from one tool to another.

Tools synching tokens from Figma to another token storage may export all or only public tokens. These tools are both neither correct nor wrong but both at the same time. Given, that internal tokens shall be exported in a `DEV=true` sync and excluded in a production sync, then these tools are potentially missing the functionality to provide filter options and/or environments (dev, staging, production).

## Formulae for Computed Tokens

For computational tokens (mentioned in [Traits](./traits.md)) for dimension and color tokens, this takes an input value, optionally parameters, a formula and computes an output.

### Sizing with a Modular Scale

Beginner math to produce [modular scales](https://www.modularscale.com) (Kellum & Brown) with this formula:

```txt
scale(n) = base * ratio ^ n
```

The formula has three parameters: `base` (static), `ratio` (static) and `n` (dynamic). A potential format to store formula would be:

```json
{
  "formula": {
    "name": "modular-scale",
    "parameters": {
      "base": "...",
      "ratio": "...",
      "n": 1
    }
  }
}
```

These are the information a token translator or token tool would need in order to compute the value (not going into further optimization to extract the formula with its static parameters).

A more complex scaling formula with upper and lower delimiters is [Utopia](https://utopia.fyi) (Gilyead & Mudford).

In CSS it already is possible to have your entire sizing system based only on a handful parameters - it would be even better, if this is also present in design editors and can be exported from one tool to another.

### Color

Generating harmonic color palettes that provide good contrast levels belong to the complex side of computational tokens. Seen in [ColorBox (Lyft)](https://colorbox.io) [explained by Kevyn Arnott (2018)](https://design.lyft.com/re-approaching-color-9e604ba22c88), [Leonardo (Adobe)](https://leonardocolor.io) [explained by Nate Baldwin (2020)](https://uxdesign.cc/creating-contrast-based-themes-with-leonardo-32b6219a090f) or [Prism (Github)](https://primer.style/prism) [explained by Cole Bemis (2022)](https://github.blog/2022-06-14-accelerating-github-theme-creation-with-color-tooling/).

Technically there is no difference to the formula used for modular scales, a function with input parameters that returns a value for the token. What makes it complex is the formula itself, the color theory and mathematical background to compute each scale and with that requires more knowledge to know and understand the input parameters in order to fine tune the results.

Having harmonic and automatic color palettes in your design editor, that would adjust the palette when the main color is changed is still to far in the future but this would provide the technological base for it.

## Constrained Values

Values that are constrained and valid for a given set of features are explained
in [Theming](./theming.md).

TODO: describe it here

## Dynamic vs. Static Values

A dynamic value such as:

```css
:root {
  font-size: calc(0.5vw + 1em * var(--sizing-factor));
}
```

is _undefined_, as the actual value will change depending on the viewport of a user. The trick for designers is to work with an assumptive "ideal" value, eg. `16px`. Somewhere in the entire token translation toolchain this ideal value will be replaced to the `calc()` from the snippet above. In order to keep the toolchain intact, this needs to be noted on the token.

## The Heartbeat of Token Translation Toolchain

The extended attributes to tokens described in this article give more detailed information about a token. They are relevant when pushing tokens through the token translation toolchain in order to encode business needs.

The showcased attributes have been proven to be relevant for a couple of cases and _may_ be candidates for to be included into the specification. Important to understand is, the Design Token Format Module allows custom fields and you may find them useful for your system but also find specific attributes relevant for your needs.

## References

- Arnott, K. (2018, September 21). _Re-approaching Color_. <https://design.lyft.com/re-approaching-color-9e604ba22c88>
- Baldwin, N. (2020, February 28). _Creating contrast-based themes with Leonardo_. UX Collective. <https://uxdesign.cc/creating-contrast-based-themes-with-leonardo-32b6219a090f>
- Bemis, C. (2022, June 14). _Accelerating GitHub theme creation with color tooling_. The GitHub Blog. <https://github.blog/2022-06-14-accelerating-github-theme-creation-with-color-tooling/>
- Gilyead, J. & Mudford, T. (n.d.). _Utopia - Fluid Responsive Design_. <https://utopia.fyi/>
- Kellum, S. & Brown, T. (n.d.). _Modularscale_. <https://www.modularscale.com/>
