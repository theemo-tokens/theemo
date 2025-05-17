# Parsers

## W3C Parser

The W3C parser is able to read the [W3C token
format](https://tr.designtokens.org/format/) and is recommended for Style
Dictionary v3.

It is part of `registerTheemo()` or use it manually:

```js [config.js] twoslash
import StyleDictionary from 'style-dictionary';
import { w3cTokenJsonParser } from '@theemo/style-dictionary';

StyleDictionary.registerParser(w3cTokenJsonParser);
```

::: info

- [API Docs](../../../api/@theemo/style-dictionary/variables/w3cTokenJsonParser.md)

:::
