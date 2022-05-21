---
id: sync
title: Sync
---

Tokens are stored within the theemo plugin which run in a sandboxed environment.
In order to use your tokens and valuable references from somewhere else, they
need to be synced from one place to another

## Export

You can export your references to [jsonbin.io](https://jsonbin.io) and by that
make it available for third-party consumers, e.g. if you want to update your
design tokens in your code. Here is how:

Enter credentials in settngs:

1. Create an account and copy the API Key
2. Create a bin and copy the bin URL

On the tools tab the `Export Settings` button becomes available. Clicking the
button will export your references.

## Import

You can import your earlier exported references from
[jsonbin.io](https://jsonbin.io). That is really helpful when you duplicated
your document - figma will not copy over your stored references. Here is how to
import references:

1. Duplicate a document
2. Open the old document, open the plugin, go to settings and copy the Bin URL
3. Go the new new document (the plugin should still be opened), paste the URL
   into the input for import and click the button next to it.
4. A notification will appear telling you how much references were imported.
5. You can work with your new document the same way as the old one now - win!
