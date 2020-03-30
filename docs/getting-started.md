---
id: getting-started
title: Getting Started
---

Theemo is designed to work in an isolated package containing only theme related
assets. That is you can exchange the theme package and the rest of your
application stays intact.

## 1. Installation

In your theme package, install theemo:

```bash
yarn add -D theemo
```

The name of your package is taken as theme name. If this is different, then add
this to your `package.json`:

```json
{
  "name": "@foo/my-theme",
  "theemo": {
    "name": "ocean"
  },
  "devDependencies": {
    "style-dictionary": "^2.8.3",
    "theemo": "^0.0.3"
  }
}
```

## 2. Configuration

There are two things to configure:

1. Theemo
2. Your Token Manager Tool (if you haven't already - refer to respective docs)

Theemo is configured in `theemo.js`. To understand what you need to configure,
you first need to understand [how theemo works](how-theemo-works.md). Each
action has its own configuration part and is explained in detail on each
section. Please refer to:

- [Sync](sync.md)
- [Build](build.md)
- [Generate](generate.md)

## 3. Execute

Theemo comes with a [CLI](usage.md) and let's you execute commands for each action. Imagine
your project uses all actions, it's enough to have one command for it in your
_theme package_. Here is a good practice (a `package.json`):

```json
{
  "name": "your-theme",
  // ...
  "scripts": {
    "sync": "yarn theemo sync",
    "build": "yarn theemo build",
    "generate": "yarn theemo generate",
    "magic": "yarn sync && yarn build && yarn generate"
  }
}
```

You now have the flexibility to run each command on its own, e.g. `yarn sync` to
solely run the synchronization step. The best thing is to run _one_ command.
Inside your project run this:

```bash
yarn magic
```

and _magically_ everything comes together. Theemo will update your
`package.json` and adjust values:

```json
{
  "name": "@foo/my-theme",
  "theemo": {
    "name": "ocean",
    "colorSchemes": [
      "light",
      "dark"
    ],
    "file": "dist/ocean.css"
  },
  "devDependencies": {
    "style-dictionary": "^2.8.3",
    "theemo": "^0.0.3"
  }
}
```

And you should find a `dist/ocean.css` file ready to be consumed.

## 4. Consume

Your theme is ready to go. Add the theme package as a dependency to your app and
start. Things you want to do then:

- Integrate the output of your build into the workflow of your app (CSS Modules,
  Sass, Android or iOS).
- If you run the theemo generator, load up your CSS file and use it with vanilla
  css/html mechanics.
- Develop tooling for your framework/library of choice. Parse the `package.json`
  to get the information of your theme name, which file and what contexts are.
