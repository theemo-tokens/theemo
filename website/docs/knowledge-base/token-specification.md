---
id: token-specification
title: Token Specification
---

**A token specification is a formula for scalable design tokens**. Design tokens
become scalable when they are replicatable. Use the formula in the specification
to replicate design tokens.

## Description

A token specification consists of schema(s) for different sets of tokens,
including the (naming) rules, as that might slightly differ between used tools
or steps in between. The entire token specification describes the token
configuration for your project and is supposed to be the reference to configure
theemo.

## Usage

That is the schema(s) defines where a token lives. As such, not all tokens have
to be defined up front. It works for the initial tokens but also when a token is
needed on demand, the schema(s) are taken as reference to figure out where to
implement the token.

## What to Specify?

There are two perspectives how to look at token sets: Technical and Semantic.

- Technical (tokens by their types): colors, sizes, typography, ...
- Semantic (as needed and defined on your project): Actions, Indiciators, Structures, ...

Technical tokens are used in multiple semantics sets. Semantic sets may contain
a variety of multiple technical tokens. This allows to create a _matrix_ with
_Technical x Semantic_ to understand where your tokens will be used.

If you prefer to design semantic over technical tokens, then the schema should
define how this is applied.

Also, there is no need to specify _all_ of your design tokens. There is always
some cases, that aren't supported by a schema. Mostly tokens for schema
outliers, document those as you usually would do.

## Why Specify?

There is a couple of reasons for why you want to specify the formula for your
design tokens.

- Support for design tokens varies from tool to tool. Tokens (Styles) in Figma
  are already "bound" by type (e.g. colors or typography) and you cannot use
  the wrong type (that is by-design). However, design tokens in CSS for example
  are all in one pot, you can use an invalid token (such as a size design token
  for a color property). There is no technical limitation in using the wrong design token.
- Naming is related to the nature of tools. A color style in Figma doesn't need
  to contain the name `color`, as this is by design. Whereas for CSS having
  `color` as part of the name helps to prevent invalid usage. How should the
  names translate from Figma to CSS? How to achieve the same experience for
  designers and developers alike?
- Tool specific handling: In Figma, styles beginning with a `.` are not
  publishable. Usually, your internal tokens of a theme. Should they be exported
  to a token translation tool? Yes? No? It depends? If you use something like a
  _dev_ mode, then you probably want those exported but perhaps not for
  production builds.
- Your design tokens come with rules for how to combine them, ie. foreground and
  background colors. If these rules are not defined, chances are when changing
  values, the tokens no longer fit together and create disharmony in your
  design. In order to prevent that, write down such rules.
- A token specification helps to identify design token inconsistencies and bring
  them into harmony. Do you use a certain segment of the name to indicate a
  stronger visual prominence over another token? Do you use
  `primary`/`secondary` for one set and `accentuate` for another set? Why not
  align them instead to use a common pattern amongst the two?

## Example

Here is an example for the Theemo tokens itself. The tokens are defined in
Figma, then transported to Style Dictionary and generated for CSS. The example
in here describes four sets of technical tokens: color palette, colors for instructions, colors for
feedback and sizing tokens.

### Color Palette

The token spec should contain a schema for where to expect tokens.

```txt
Figma: .palette/$color-$level
Style Dictionary: palette/$color.json (dev mode only)
Code: --color-$color-$level (dev mode only)
```

Where as:

- The `.palette` indicates this is internal
- `$level` is a value from `100` to `900` ?

:::note
There can (and actually should) be more rules on how to combine these colors in
order to guarantee proper contrast.

Linda Dong (from Lyft) explained this in her talk [Designing A Comprehensive Color
System](https://www.youtube.com/watch?v=bmeo_13QtrU) and Kevyn Arnott wrote
about [Re-approaching
Color](https://design.lyft.com/re-approaching-color-9e604ba22c88) where he
shared the tool ColorBox on how to implement that.
:::

### Instruction Colors

Instructions are for any form of action a user will do in order to change
something in the system. Visually speaking buttons, links, menus, menu-items,
etc. Those instructions follow a certain intent the user is about to do.
Instructions are interactive, meaning they contain the interactive states:

<table>
  <tr>
   <td>normal</td>
   <td>hover</td>
   <td>active (pressed)</td>
   <td>disabled</td>
  </tr>
  <tr>
    <td>+ focus</td>
    <td>+ focus</td>
    <td>+ focus</td>
    <td></td>
  </tr>
</table>

#### Intents

- Action (default) - normal action
- Alternative - when there are more/alternative options
- Highlight - when a certain action should be highlighted to stand out against others
- Danger - something of caution

#### Hierarchy/Prominence/Importance

This defines how an intent of the same kind is visually more important than another one. Some ideas:

- Normal (default) - Eye-catcher - very much accentuated; visually a "fill" style
- Subtle - Of lesser importance; visually an "outline" style
- Plain - Of least importance; visually a "text" style

this is very much tbd on how to name that

#### Instructions Schema

The token spec should contain a schema for where to expect tokens.

```txt
Figma: intent/$intent/$importance/$state/$property
Style Dictionary: `intent/$intent/$importance.json`
CSS: --intent-$intent-$importance-$state-$property-color
```

- `$intent` is one of the above
- `$importance` is one of the above
- `$state` from the state table above (focus tbd)
- `$property` is either `text`, `border` and `background`

Some example tokens (in Figma):

- `intent/alternative/normal/background`
- `intent/danger/subtle/pressed/border`
- `intent/action/plain/normal/text`

:::note
This schema is flexible around certain intents. There may not be a subtle
variant of danger, so leave it out. But once you need it, the schema tells you
where to put the token.
:::

### Feedback Colors

Indicators are for any sort of feedback for user about instructions they
made or that have been made on behalf of them. Visual elements, are
badges, alerts, notifications, status texts, interactive colors (= think form
elements). In contrast to instructions, feedback is not interactive instead
stateless.

#### Indicators

- Informative (default) - any sort of feedback
- Success - Something went well
- Warning - Something was't successful, the result may still be ok, attention may needed (we let you know)
- Error - Something want wrong. Inspect the problem and take action upon that

#### Hierarchy/Prominence/Importance

- same as above (for instructions) -

#### Feedback Schema

The token spec should contain a schema for where to expect tokens.

```txt
Figma: indicator/$indicator/$importance/$property
Style Dictionary: indicator/$indicator.json
CSS: --indicator-$indicator-$importance-$property-color
```

- `$indicator` is one of the above
- `$importance` is one of the above
- `$property` is either text, border and background or only text

### Sizing

Sizing uses [modular scale](https://www.modularscale.com/) for computed tokens.
A [_token designer_](./glossary.md#token-designer) defines `base` and `ratio`,
but a [_token consumer_](./glossary.md#token-consumer) will use the computed
tokens. This is the formula used to generate the computed tokens:

$$
size(n) = base * ratio ^ n
$$

Whereas

- `base` value is: `calc(0.5vw + 1em * var(--sizing-factor))`

Input Tokens:

```txt
Figma (text node with `[token]` tag in the name):
- sizing-base
- sizing-ratio
Style Dictionary: sizing.json
CSS: --sizing-factor, --sizing-ratio
```

With:

- `sizing-base` default value is `1.3` (if omitted)
- `sizing-factor` default value is `0.8` (if omitted)

Computed Tokens:

```txt
Figma: -
Style Dictionary: sizing.computed.json
CSS: --s$scale, --ls$scale
```

Whereas:

- `$scale` is an number within the range `(-4;4)`.

These tokens will be computed:

<table>
  <tr>
    <td>Global</td>
    <td>Local</td>
  </tr>
  <tr>
    <td>
      <ul>
        <li><code>--s-4: size(-4)</code></li>
        <li><code>--s-3: size(-3)</code></li>
        <li><code>--s-2: size(-2)</code></li>
        <li><code>--s-1: size(-1)</code></li>
        <li><code>--s0: size(0)</code></li>
        <li><code>--s1: size(1)</code></li>
        <li><code>--s2: size(2)</code></li>
        <li><code>--s3: size(3)</code></li>
        <li><code>--s4: size(4)</code></li>
      </ul>
    </td>
    <td>
      <ul>
        <li><code>--ls-4: localSize(-4)</code></li>
        <li><code>--ls-3: localSize(-3)</code></li>
        <li><code>--ls-2: localSize(-2)</code></li>
        <li><code>--ls-1: localSize(-1)</code></li>
        <li><code>--ls0: localSize(0)</code></li>
        <li><code>--ls1: localSize(1)</code></li>
        <li><code>--ls2: localSize(2)</code></li>
        <li><code>--ls3: localSize(3)</code></li>
        <li><code>--ls4: localSize(4)</code></li>
      </ul>
    </td>
  </tr>
</table>

:::note
Global sizing tokens use `rem` as unit, whereas local sizing tokens use `em` as unit.
:::
