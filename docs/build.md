# Build

Theemo will give CSS output a special treatment. Given your theme supports
multiple color schemes Theemo is able to prepare it for usage with CSS media
query support.

The idea is Theemo will enhance the output within a single CSS file. You will
include that _one_ file and it will behave the way you intend it. Refer to
the following configuration options.

## Configuration

- *root: boolean*
  - `false` - You have to manually activate the theme with a CSS class (usually
    at the body)
  - `true` - Will globally activate your theme by using the `:root` selector.
- *colorScheme: object* - Everything to configure the color scheme
  - *default: string* - Sets the default color scheme
  - *activation: auto | manual* - Determines the way the color scheme is
    choosen.
    - `auto` - will add the `@media (prefers-color-scheme: none)` to pick the one
      you set in `default`
    - `manual` - you have to manually add a css class to active the color-scheme.
  - *override: boolean* - When `activation` is `auto` you may
    want to override the auto-selected choice. Set this one to true and CSS
    classes will be generated to manually specify the color scheme.

## Examples

Here are some sample configurations and how to use the generated output.

Given for the example:

- There is a `light` and `dark` color scheme
- The theme is named `ocean`

### Auto-Theme with light auto Color Scheme

```json
{
  root: true,
  colorScheme: {
    default: 'light',
    activation: 'auto',
    manual: false
  }
}
```

```css
/* No color scheme related tokens */
:root, .ocean {
  --bar: baz;
}

@media (prefers-color-scheme: no-preference), (prefers-color-scheme: light) {
  :root, .ocean {
    --foo: lightblue;
  }
}

@media (prefers-color-scheme: dark) {
  :root, .ocean {
    --foo: darkblue;
  }
}
```

Usage:

```html
<head>
  <link rel="stylesheet" href="path/to/ocean.css" type="text/css">
</head>
<body>
</body>
```

### Auto-ocean with light auto Color Scheme and Manual Activation

```json
{
  root: true,
  colorScheme: {
    default: 'light',
    activation: 'auto',
    manual: true
  }
}
```

```css
/* No color scheme related tokens */
:root, .ocean {
  --bar: baz;
}

@media (prefers-color-scheme: no-preference), (prefers-color-scheme: light) {
  :root, .ocean {
    --foo: lightblue;
  }
}

.ocean-light {
  --foo: lightblue;
}

@media (prefers-color-scheme: dark) {
  :root, .ocean {
    --foo: darkblue;
  }
}

.ocean-dark {
  --foo: darkblue;
}
```

Usage:

```html
<head>
  <link rel="stylesheet" href="path/to/ocean.css" type="text/css">
</head>
<body>
  <div>Here is the light</div>
  <div class="ocean-dark">Lights out</div>
</body>
```

### Manual-ocean with light auto Color Scheme

```json
{
  root: false,
  colorScheme: {
    default: 'light',
    activation: 'auto',
    manual: false
  }
}
```

```css
/* No color scheme related tokens */
.ocean {
  --bar: baz;
}

@media (prefers-color-scheme: no-preference), (prefers-color-scheme: light) {
  .ocean {
    --foo: lightblue;
  }
}

@media (prefers-color-scheme: dark) {
  .ocean {
    --foo: darkblue;
  }
}
```

Usage 1:

```html
<head>
  <link rel="stylesheet" href="path/to/ocean.css" type="text/css">
</head>
<body class="ocean">
  Activation for the whole document
</body>
```

Usage 2:

```html
<head>
  <link rel="stylesheet" href="path/to/ocean.css" type="text/css">
</head>
<body>
  Here is no theme active

  <div class="ocean">Swim in the water</div>
</body>
```
