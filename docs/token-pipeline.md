# Token Pipeline

Theemo's job is to cover the entire token pipeline from design into theme management of
your product and all the steps in between. Figure 1 shows the entire token pipeline.

!#[Token Pipeline](./token-pipeline.png)

Although Theemo has adapters to cover each step, you should choose it for the
steps you need. If you've already have a tool or solution for one, that's great!

Token Designer

: The place where you (visually) design your tokens, such as a
[design](./design.md) editor (for example, Figma or Penpot).

Token Storage

: Here is where your tokens are stored in the most plain form, such as a bunch
of JSON files. Your developers might even design over here (rumors say,
they prefer text files).

Theme

: Packaged up your tokens into a distributable theme. Much likely a NPM package.

Product Integration

: Obviously your theme is then used in the final product. To load the theme
assets, manage [theme switching](./design-tokens/theming.md) or toggling
[features](./design-tokens/features.md), this is where Theemo can provide
integrations.

## Sync

You are synching between your token designer choice and your token storage. This
sync might be uni- or bi-directional. Theemo has a powerful sync feature, with
integrations for Figma and Style Dictionary but thanks to its pluggable
architecture, can take multiple adapters to read from multiple sources and write
to multiple targets.

## Theme Management

Building themes into packages and load them into your products is what Theemo
does for [theming](./theming.md).
