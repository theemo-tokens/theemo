---
id: build
title: Build
---

The build action triggers the build step of your used token manager (e.g.
style-dictionary or theo). Configure your tool as usual and theemo will put
extras on top, so it can enable the e2e flow. This page describes the extras of
theemo for each token manager tool.

## Style Dictionary

Configure your build step as
[explained](https://amzn.github.io/style-dictionary/#/config) in `config.js`.
Theemo adds custom
[transforms](https://amzn.github.io/style-dictionary/#/transforms) and in doing
so takes over the build step as suggested (so you don't have to). The _custom
transform_ theemo adds is let you define transforms in your `config.js` -
without the need to hook them in via API.
To use custom transforms, add `transforms` object as a root key to your
`config.js`. Inside the transforms, add objects for `name`, `attribute` or
`value`. Each object has to follow the
[`transform`](https://amzn.github.io/style-dictionary/#/api?id=registertransform)
object.

Here is an example:

```js
module.exports = {
  source: [...],
  platforms: {...},
  transforms: {
    name: {
      matcher(property) {
        return property.name.includes('.$');
      },
      transformer(property) {
        property.path.pop();

        const index = property.name.indexOf('.$')
        return property.name.slice(0, index);
      }
    }
  }
}
```
