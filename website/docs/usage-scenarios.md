---
id: usage-scenarios
title: Usage Scenarios
---

You can do a variety of things with Theemo. It's your choice whether you want to
use all or only one. Here are _some_ ideas how you might want to use Theemo.

## Figma Only

[Theemo Figma plugin](./design/figma.md) allows style references for token aliases. References can
run transforms for automated color palettes.

More importantly, you can continue to use Figma as is and change colors in the
style panel, while keep Theemo plugin running for auto-updates.

## Figma to Style Dictionary Export

Theemo CLI helps to export Design Tokens from Figma into Style Dictionary. If
this is what you are looking for, head over to [Theemo CLI](./cli.md).

## Theme Generation (Extended Style Dictionary)

Once you have everything in style dictionary already, you can use Theemo to
[generate a theme](./cli/generate.md) for you, which combines a couple of style dictionary created
CSS files under your defined selectors or media queries to serve different
contexts.
This is specially tailored for light and dark color schemes and takes care of
applying the right CSS rules for you.
