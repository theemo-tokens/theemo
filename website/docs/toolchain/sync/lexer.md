---
id: lexer
title: Lexer
---

This step runs a lexical analysis based on your input to make tokens
understandable. The lexer will return a **token collection** that will be the
input to the writer. These steps are processed:

1. Normalize token
2. Classify token
3. Filter token

The output of one step is the input to the next step. If you classify a token,
you can use these information to filter them afterwards.

The normalization step has a _default_ behavior, which is why it is commented
out in the sample configuration:

```js
{
  lexer: {
    // /**
    //  * Default normalization strips white space from your token and reference name
    //  */
    // normalizeToken(token: Token): Token {
    //   const normalized = { ...token };

    //   normalized.name = normalized.name.replace(/\s/g, '');
    //   if (normalized.reference) {
    //     normalized.reference = normalized.reference.replace(/\s/g, '');
    //   }

    //   return normalized;
    // },

    /**
     * Describe your tokens:
     *
     * - What's the type?
     * - What's the color scheme?
     */
    classifyToken(token) {
      const t = {...token};
      t.type = t.name.startsWith('.') ? 'basic' : 'purpose';

      const contextIndex = t.name.indexOf('.$');
      if (contextIndex !== -1) {
        t.colorScheme = t.name.slice(contextIndex + 2);
        t.name = t.name.slice(0, contextIndex);
      }

      return t;
    },

    /**
     * Here we filter tokens to only keep the purpose tokens
     */
    filterToken(token) {
      return token.type === 'purpose';
    },

    /**
     * And finally we group them by color scheme
     * You will receive a token and return the group for it
     */
    groupForToken(token) {
      return token.colorScheme ? token.colorScheme : 'base';
    }
  }
}
```

Reference: [LexerConfig](api/theemo.lexerconfig)
