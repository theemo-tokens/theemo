---
id: build
title: Build
---

Building is the second step in the process. Run the build of your token
translation tool directly.
Although Theemo isn't running that command directly, it makes sense to include
it as part of your `scripts` in your `package.json` as explained on [getting started](./getting-started.md#3-execute).

## Style Dictionary

This is a manual to [configure style dictionary for dark mode using the
multi-file method](https://dbanks.design/blog/dark-mode-with-style-dictionary).

In [writer](./sync/writer.md) we already prepared for this by creating multiple
files for tokens of different contexts. As a reminder, this is the generated
file structure:

```sh
- tokens/
  - intent/
    - action/
      - active.json
      - base.json
      - disabled.json
      - hover.json
    - alternatve/
      - active.json
      - base.json
      - disabled.json
      - hover.json
  - brand.json
  - hero.json
  - layout.dark.json
  - layout.light.json
  - layout.transient.json
  - sizing.json
  - text.dark.json
  - text.light.json
  - text.transient.json
  - typography.json
```

As described in the linked article above we will generate three
[config](https://amzn.github.io/style-dictionary/#/config) files, one for each
context.

### Base Configuration

Let's start with the `config.base.js`. The base config is sourcing tokens from
anything non-dark and non-light token files. Also it takes in the transient
tokens for reference purposes.

```js
// config.base.js
const modes = ['light', 'dark'];

module.exports = {
  include: ['tokens/**/*.transient.json'],
  source: [
    // this is saying find any files in the tokens folder
    // that does not have .dark or .light, but ends in .json
    `tokens/**/!(*.${modes.join(`|*.`)}).json`
  ],
  platforms: {
    web: {
      transforms: [
        'name/cti/kebab',
        'time/seconds',
        'content/icon',
        'size/rem',
        'color/css'
      ],
      buildPath: 'build/',
      files: [
        {
          format: 'css/variables',
          destination: 'base.css',
          options: {
            outputReferences: true,
            showFileHeader: false
          },
          filter(token) {
            return !token.colorScheme;
          }
        }
      ]
    }
  },
  modes
};
```

Thanks to the [writer](./sync/writer.md) all metadata theemo knows about tokens
have been written into style dictionary already and don't need extra transforms
(such as `attribute/cti`) that would extract that information from token name.

Adding this to the `scripts` section in `package.json`:

```json
{
  "scripts:" {
    "build:base": "style-dictionary build --config config.base.js"
  }
}
```

Will enable executing the build:

```sh
❯ yarn build:base
yarn run v1.22.17
$ style-dictionary build --config config.base.js

web
✔︎ build/base.css
✨  Done in 0.59s.
```

### Context Configurations

Next is the configuration for the contexts (`light` and `dark`). Taking
advantage of the base configuration, including it and only configure deviating
properties shall do the job. Here is the config for `dark` mode:

```js
// config.dark.js
const base = require('./config.base');

const config = {
  ...base,
  include: [`tokens/**/!(*.${base.modes.join(`|*.`)}).json`],
  source: [`tokens/**/*.dark.json`]
};
config.platforms.web.files = [
  {
    format: 'css/variables',
    destination: 'dark.css',
    options: {
      outputReferences: true,
      showFileHeader: false
    },
    filter(token) {
      return token.colorScheme === 'dark';
    }
  }
];

module.exports = config;
```

Adding the command to `scripts` in `package.json`:

```json
{
  "scripts:" {
    "build:dark": "style-dictionary build --config config.dark.js"
  }
}
```

and executing it:

```sh
❯ yarn build:dark
yarn run v1.22.17
$ style-dictionary build --config config.dark.js

web
✔︎ build/dark.css
✨  Done in 0.63s.
```

This will output a `build/dark.css` file. Repeat the same for `light` context to
output a `build/light.css` file, too.

### Full Build

Let's put everything together to run the full build. Pack every command into
`package.json` to be able to trigger them individually as well as all together:

```json
{
  "scripts:" {
    "build": "npm-run-all build:*",
    "build:base": "style-dictionary build --config config.base.js",
    "build:dark": "style-dictionary build --config config.dark.js",
    "build:light": "style-dictionary build --config config.light.js"
  }
}
```

Executing the build:

```sh
❯ yarn build
yarn run v1.22.17
$ npm-run-all build:*
$ style-dictionary build --config config.base.js

web
✔︎ build/base.css
$ style-dictionary build --config config.light.js

web
✔︎ build/light.css
$ style-dictionary build --config config.dark.js

web
✔︎ build/dark.css
✨  Done in 1.84s.
```

This will give us three files. But three files? One should be enough, right?
That's exactly the job of [generate](./generate.md) to combine them together.
