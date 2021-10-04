---
id: writer
title: Writer
---

The writer takes your grouped token collection and writes them to the disk. The
logic depends on your used [token manager tool](glossary.md#token-manager-tool),
with it there are three main instructions for configuration:

- The formats in which colors shall be written
- The file name for a token
- The property path for a token. The path is an array and will be used to create
  a POJO object

For easier understanding of the following snippt, the token has the following
name: `foo.bar/baz.bam`

```js
{
  writer: {
    tool: 'style-dictionary',

    /**
     * The file in this case is the part before the first `/` in the token name.
     */
    fileForToken(token) {
      const slashIndex = token.name.indexOf('/')
      return token.name.slice(0, slashIndex).replace(/\./g, '/');
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
