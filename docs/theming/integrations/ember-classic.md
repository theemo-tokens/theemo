# Ember

Loads theemo themes into the ember pipeline. Watching themes for changes and
triggers page refreshs.

## Installation

```bash
ember install ember-theemo
```

## Usage

If you use [theming](../../theming.md) for your theme creating,
`ember-theemo` will pick up any installed themes found by the `theemo-theme`
keyword.

Furthermore there are some configurations to control your default behavior and a
little API to help you switch between themes and color schemes.

### Configuration

In your `ember-cli-build.js` use the `theemo` property to control the build.

```js
module.exports = function(defaults) {
  let app = new EmberAddon(defaults, {
    // ...

    theemo: {
      defaultTheme: 'ocean'
    }

    // ...
  });

  return app.toTree();
};
```

Available options:

- `defaultTheme: string` - the theme loaded by default

### API

Use the `theemo` service to control themes:

**Important: Consider this API subject to change!**

```ts
interface TheemoService {
  @tracked activeTheme?: string;
  @tracked activeColorScheme?: string;

  /**
   * Available thems
   */
  themes: string[];

  /**
   * List of available color schemes for the active theme
   */
  colorSchemes: string[];

  /**
   * Returns a list of color schemes for a given theme
   *
   * @param name name of the theme
   */
  getColorSchemes(name: string): string[];

  /**
   * Set the active theme
   *
   * Theemo will load the theme if not already
   * available in the document.
   *
   * @param name the name of the theme
   */
  setTheme(name: string): Promise<void>;

  /**
   * Set the active color scheme
   *
   * If "none" is used, it means it will be "system"
   *
   * @param name color scheme to use or "none" to
   *   reset to "system"
   */
  setColorScheme(name: string | undefined);
}
```
