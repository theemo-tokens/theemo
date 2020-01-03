![Artwork](assets/artwork.png)

# Figma Plugin: Style References

Figma plugin to reference styles.

The plugin will allow you to have an origin style mapped to a reference style,
which will kept in sync with the origin style.

## Manual

This plugin will do two things:

1. Will let you manage references on a selected node
2. Will update all references on their origin style

### 1. Manage References

Select a node for which you want to manage references, eg. a rectangle. Open the
"Style References" plugin and a dialog will appear that let you do it. Currently
these styles are supported:

- Fill Style
- Stroke Style
- Effect Style

For each of those there is a section in the dialog where you can manage the
origin style to the reference.

- **Origin** That's the _original_ style.
- **Reference** That's the style to which the origin is copied over when
  references are updated.

### 2. Updating References

When you have not selected a node for which you want to manage references, then
the plugin will update all those managed references in the current document.

Here is how the update is working:

- Copy the original style to the one that is named reference style
- Set the reference style to the given node

### Things to Know

- There is no auto-update of origins to references (limitation of the current
  figma API).

- When setting the origin style the suggestions only show local styles, that is
  also due to limitations of the current figma API, given security reasons for
  shared team libraries. That's fair - figma keeps us safe, give them credit for
  that :)

  It still is possible to use library styles, then you can't use the style
  references manage dialog, instead manually assign those style and THEN use the
  style references dialog in order to persist it.

- Once you have one node "under management", you may want to change the local
  style but once you update references, those new ones will be overridden. Open
  the style references dialog which will provide you options for migrating
  styles, to either keep the old one or use the new one.

- Once you link origin to reference the node itself will show the reference as
  its local style, which might give you wonders, yet is expected and the correct behavior.

## Development

To develop this on your own. Install depencencies first:

```bash
$ yarn
```

Second, start the watch server:

```bash
$ yarn start
```
