---
id: references
title: References
---

import useBaseUrl from '@docusaurus/useBaseUrl';

References enables you to alias a token to another one.
Select a node for which you want to manage references, eg. a color swatch.
Open the "Theemo" plugin and a dialog will appear that let you do it.
Currently these styles are supported:

- Fill Style
- Stroke Style
- Effect Style
- Text Style

For each of those there is a section in the dialog where you can manage the
origin style to the reference.

- **Origin** That's the _original_ style.
- **Reference** That's the style to which the origin is copied over when
  references are updated.

<figure id="references">
  <img src={useBaseUrl('/img/references.png')} />
  <figcaption>
    Theemo plugin showing token <code>intent/action/base/background</code>
    referenced to <code>.palette/brand/500</code>.
  </figcaption>
</figure>

Figure 1 shows tokens in a color palette on the left and purpose tokens on the
right referenced to the color palette. In the theemo plugin you see the
`intent/action/base/background` is selected and referenced to
`.palette/brand/500`. This reference (and another one) are highlighted by the
arrows in the figure to demonstrate these references visually.

## Transforms

Transforms are a welcome addition on top of references. Avaiable for paint
styles (Fill and Stroke). When styles are referenced from origin to reference
you can put transforms in between to manipulate HSL and opacity values to their
during referencing.

<figure id="references-with-transforms">
  <img src={useBaseUrl('/img/references-with-transforms.png')} />
  <figcaption>
    Opacity is applied when referencing <code>intent/action/disabled/background</code> to
    <code>intent/action/base/background</code>.
  </figcaption>
</figure>

Figure 2 shows a clever usage of this. Where the `:disabled` state is a pale
version of the base state, with 35% less opacity.

Next page shows how to use transforms to maintain [automatic color palettes](./automatic-color-palette).
