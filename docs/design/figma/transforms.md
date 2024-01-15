# Transforms

Theemo can apply transform operations to color variables, currently to change
hue, saturation, lightness and opacity.

Well, actually due to plugin limitations, this can only be done on styles,
instead of variables. In order to do so Theemo maps your references from
variables to styles, applies the transforms on the styles and pushes back the
value to the variable. That is in variables you stop seeing the reference, which
becomes visible in Theemo. Here is a sample:

!#[Transforming Colors](./transforms.png){.fig-75}

Keep Theemo open to have your values auto-updated.

It's quite helpful in building [automatic color palettes](./v1/automatic-color-palette.md).
