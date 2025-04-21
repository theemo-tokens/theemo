# Theemo Theme

A Theemo theme is an NPM package, that contains a couple of metadata that
identifies as such, which is vital for bundlers and frameworks to recognize
them.

## Specification

A Theemo theme needs minimal information in `package.json`:

1. Add `theemo-theme` to `keywords`.
2. Add `theemo` field with information about your theme

### `theemo` Field

The `theemo` field contains information about:

- `name` of your theme (which may be the same as the package name, better be
  explicit)
- `colorSchemes` that are available
- `file` which file contains your theme

## Example

Here is a minimal package example, with `sync` and `build:*` scripts present

```json
{
  "name": "package-name",
  "keywords": [
    "theemo-theme"
  ],
  "theemo": {
    "name": "theemo",
    "colorSchemes": [
      "light",
      "dark"
    ],
    "file": "dist/theemo.css"
  },
  "scripts": {
    "sync": "theemo sync",
    "build:css": "style-dictionary build",
    "build:theme": "theemo build"
  },
  "devDependencies": {
    "@theemo/cli": "workspace:*",
    "@theemo/figma": "workspace:*",
    "@theemo/build": "workspace:*",
    "@theemo/sync": "workspace:*",
    "@theemo/style-dictionary": "workspace:*",
    "@theemo/tokens": "workspace:*",
    "style-dictionary": "^4.3.3"
  }
}
```
