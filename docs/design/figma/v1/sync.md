# Sync

Tokens are stored within the theemo plugin which run in a sandboxed environment.
In order to use your tokens and valuable references from somewhere else, they
need to be synced from one place to another

## Export

You can export your references to [jsonbin.io](https://jsonbin.io) and by that
make it available for third-party consumers, e.g. if you want to update your
design tokens in your code. Here is how:

Enter credentials in settngs:

1. Create an account and copy the API Key
2. Create a private bin and copy the bin ID or URL

   The bin can't be empty (jsonbin requires content) - enter `[{}]`, which
   let's allow you to create the bin (see [figure 1](#figure-jsonbin-create)).

   !#jsonbin-create[Creating a new json bin with "empty" content (using their new dashboard)](./jsonbin-create.png)

On the tools tab the `Export Settings` button becomes available. Clicking the
button will export your references.

## Import

You can import your earlier exported references from
[jsonbin.io](https://jsonbin.io). That is really helpful when you duplicated
your document - figma will not copy over your stored references. Here is how to
import references:

1. Duplicate a document
2. Open the old document, open the plugin, go to settings and copy the Bin ID or
   URL
3. Go the new new document (the plugin should still be opened), paste the ID or URL
   into the input for import and click the button next to it.
4. A notification will appear telling you how much references were imported.
5. You can work with your new document the same way as the old one now - win!
