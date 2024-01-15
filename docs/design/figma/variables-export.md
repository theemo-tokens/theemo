# Variables Export

Theemo Figma plugin exports variables as long as it is opened:

1. You keep the plugin open all time (maybe, because you are using [transforms](./transforms.md) or
   [style references](style-references.md)).
2. You open the plugin, keep it open for a couple of seconds, then you can close
   it again.

::: info
There is no visual feedback, whether the variables are exported or not. Seeing
the plugin window _is_ the visual feedback for this.
:::

## Accessing the Variables

Figma plugins do have the capability to export data through the REST API of
Figma and the Theemo plugin makes use of that.

Figma Endpoint: `GET /v1/files/:key`

The REST API endpoint to [read
files](https://www.figma.com/developers/api#get-files-endpoint) allows for
`plugin_data` parameters, which is a comma-separated list of plugin IDs, the
plugin ID for Theemo is: `791262205400516364`

Query this endpoint: `GET /v1/files/:key?plugin_data=791262205400516364`

will return Theemo data and encoded are variables and collections. The result may look similar
to this:

```json
{
  "document": {
    "id": "0:0",
    "name": "Document",
    "type": "DOCUMENT",
    "scrollBehavior": "SCROLLS",
    "pluginData": {
      "791262205400516364": {
        "version": 2,
        "variables": "{...}",
        "variableCollections": "{...}"
      }
    },
    "...": { ... }
  }
}
```

Both `variables` and `variableCollections` are JSON strings (you need to `JSON.parse()`) to access your
variables and collections.

### Use the `theemoPlugin()`

You can use `theemoPlugin()` as part of the [Figma reader](../../sync/figma/reader.md) to access them.
