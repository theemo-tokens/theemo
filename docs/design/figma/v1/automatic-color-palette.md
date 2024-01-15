# Automatic Color Palette

An advanced use case for [transforms on references](./references#transforms) are
automatic color palettes. The implementation is simple and straight forward.
Let's say one color the palette is ranging from `0` to `100` lightness
level. Use one of the lightness level as reference (e.g. the center value at
`50` lightness) and all the other values are the reference point +/- a lightness
offset to that color.

<!-- f-90 -->

!#color-palette[Color Palette Configuration](./color-palette.png)

[Figure 1](#color-palette) shows the mentioned configuration, the selected
`.palette/brand/600` token is referencing `.palette/brand/500` and adds `10`
percent lightness as transformation on top.

!#automatic-color-palette[Automatic color palette](./automatic-color-palette.mp4)

When all references are set up, changing the centric color will let all the
other colors update automatically, too (as shown in figure 2).
