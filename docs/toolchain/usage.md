---
id: usage
title: Usage
---

You can invoke theemo via CLI or API.

## CLI

Three commands for each action:

```text
Usage: theemo [options] [command]

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  sync            sync from your source into your token manager tool
  generate        generates an adaptive CSS theme file
  help [command]  display help for command
```

## API

Here is how to execute all tasks in order. Config is being picked up from
`cwd()`.

```ts
import Theemo from 'theemo';

const theemo = new Theemo();

theemo.sync();
theemo.generate();
```

Consult [API reference](../api/theemo) for [`sync()`](../api/theemo.theemo.sync)
and [`generate()`](../api/theemo.theemo.generate)
