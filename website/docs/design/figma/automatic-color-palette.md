---
id: automatic-color-palette
title: Automatic Color Palette
---

import useBaseUrl from '@docusaurus/useBaseUrl';

An advanced use case for [transforms on references](./references#transforms) are
automatic color palettes. The implementation is simple and straight forward.
Let's say for one color the palette is ranging from `0` to `100` lightness
level. Use one of the lightness level as reference (e.g. the center value at
`50` lightness) and all the other values are the reference point +/- a lightness
offset to that color.

<figure class="f-90">
  <img src={useBaseUrl('/img/color-palette.png')} />
  <figcaption>Color palette configuration</figcaption>
</figure>

Figure 1 shows the mentioned configuration, the selected `.palette/brand/600`
token is referencing `.palette/brand/500` and adds `10` percent lightness as
transforming on top.

<figure>
  <video src={useBaseUrl('/img/automatic-color-palette.mp4')} controls />
  <figcaption>Automatic color palette</figcaption>
</figure>

When all references are set up, changing the centric color will let all the
other colors update automatically, too (as shown in figure 2).
