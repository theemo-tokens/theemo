# Ember

Theemo integration for Ember (with wite) to manage themes.

## Installation

```sh
pnpm add -D @theemo/ember @theemo/vite
```

## Configuration

Add `@theemo/vite` to load all themes

```ts [vite.config.ts]
import { classicEmberSupport, ember, extensions } from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';
import { defineConfig } from 'vite';
import { theemo } from '@theemo/vite';

export default defineConfig({
  plugins: [
    classicEmberSupport(),
    ember(),
    babel({
      babelHelpers: 'runtime',
      extensions
    }),
    theemo({
      defaultTheme: '<your-default-theme-name>'
    })
  ]
});
```

## Usage

You can manage themes with the `TheemoService`.

```glimmer-ts [components/theme-manager.gts]
import Component from '@glimmer/component';
import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { service } from '@ember/service';

import type { TheemoService } from '@theemo/ember';

export default class ThemeManager extends Component {
  @service declare theemo: TheemoService;

  <template>
    <h1>Themes</h1>

    <div id="themes">
      {{#each this.theemo.themes as |theme|}}
        <button type="button" {{on "click" (fn this.theemo.switchTheme theme.name)}}>
          {{theme.name}}
        </button>
      {{/each}}
    </div>
  </template>
}
```

## References

- [Example on Playground](https://github.com/theemo-tokens/theemo/tree/main/playground/ember)
- [API](/api/@theemo/ember/)
