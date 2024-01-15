# Usage Scenarios

You can do a variety of things with Theemo. It's your choice whether you want to
use all or only one. Here are _some_ ideas how you might want to use Theemo.

## Figma Only

[Theemo Figma plugin](./design/figma.md) allows style references for token aliases. References can
run transforms for automated color palettes.

More importantly, you can continue to use Figma as is and change colors in the
style panel, while keep Theemo plugin running for auto-updates.

## Export Figma Variables

Exporting variables in Figma through their REST API is only available on the
enterprise plan. Theemo provides you with an alternative way of doing that. Have
a look at [exporting variables in Figma](./design/figma/variables-export.md) and
[syncing variables](./sync/figma/reader.md#variables).

## Figma to Style Dictionary Export

Theemo CLI helps to export Design Tokens from Figma into Style Dictionary. If
this is what you are looking for, head over to [Sync](./sync.md).

## Theme Generation (Extended Style Dictionary)

Once you have everything in style dictionary already, you can use Theemo to
[generate a theme](./theming.md) for you, which combines a couple of style dictionary created
CSS files under your defined selectors or media queries to serve different
contexts.
This is specially tailored for light and dark color schemes and takes care of
applying the right CSS rules for you.

## Tooling Authors

Are you authoring plugins for Figma, or some other tool - but you don't want to
craft the entire tooling pipeline? Luckily Theemo is taking care of running the
pipeline and thanks to its plugin architecture, you can write integrations to
your tools.

- [How to write your own Reader](./sync/reader.md#write-your-own-reader-plugin)
- [How to write your own Writer](./sync/writer.md#write-your-own-writer-plugin)
- [Read from your Figma Plugin](./sync/figma/plugins.md)
