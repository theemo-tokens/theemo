# References

References enable you to alias a token to another one.
Select a node for which you want to manage references, eg. a color swatch.
Open the Theemo plugin and which let's you do that. Currently these styles
are supported:

- Fill Style
- Stroke Style
- Effect Style
- Text Style

For each of those there is a section in the dialog where you can manage the
origin style to the reference.

- **Origin** That's the _original_ style.
- **Reference** That's the style to which the origin is copied over when
  references are updated.

!#references[Theemo plugin showing token `intent/action/base/background` referenced to `.palette/brand/500`.](./references.png)

[Figure 1](#figure-references) shows tokens in a color palette on the left and purpose tokens on the
right referenced to the color palette. In the theemo plugin you see the
`intent/action/base/background` is selected and referenced to
`.palette/brand/500`. This reference (and another one) are highlighted by the
arrows in the figure to demonstrate these references visually.

## Transforms

Transforms are a welcome addition on top of references. Available for paint
styles (Fill and Stroke). When styles are referenced from origin to reference
you can put transforms in between to manipulate HSL and opacity values which are
calculated during referencing.

!#references-with-transforms[Opacity is applied when referencing `intent/action/disabled/background` to `intent/action/base/background`.](./references-with-transforms.png)

[Figure 2](#figure-references-with-transforms) shows a clever usage of this. Where the `:disabled` state is a pale
version of the base state, with 35% less opacity.

Next page shows how to use transforms to maintain [automatic color palettes](./automatic-color-palette).
