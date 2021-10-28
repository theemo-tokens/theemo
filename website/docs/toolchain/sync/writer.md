---
id: writer
title: Writer
---

The writer takes your token collection and writes them to the disk. The
logic depends on your used [token manager tool](glossary.md#token-manager-tool).
Initial Config:

```js
{
  writer: {
    tool: 'style-dictionary';
  }
}
```

Depending on your used tool, there are more specific configuration options

## Style Dictionary

Style Dictionary needs to know where to put your files, the file for each token,
the path (canonical name) for the token, the value and optionally custom data
with it.

Imagine this is our lexical token:

```js
{
  name: 'color.intent.action.text',
  description: 'Text color for an action',
  value: 'blue'
}
```

```js
{
  writer: {
    tool: 'style-dictionary',

    /**
     * For each token, this function will return the filename for the token.
     */
    fileForToken(token) {
      return token.name.replace('.', '/');
    },

    /**
     * The property path for a token is the part after the first `/`
     * with the category as prefix and a color scheme as suffix.
     */
    pathForToken(token) {
      const slashIndex = token.name.indexOf('/')
      let name = token.name.slice(slashIndex + 1);

      if (token.category) {
        name = `${token.category}.${name}`;
      }

      const path = name.split('.');

      if (token.colorScheme) {
        path.push(`.$${token.colorScheme}`);
      }

      return path;
    }
  }
}
```

Reference: [WriterConfig](api/theemo.writerconfig)
