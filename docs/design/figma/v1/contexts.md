# Contexts

Theemo supports you to **define your contexts** and **switch between them**.

Contexts are constraint by:

- Environment:
  - Platform (web, native)
  - OS (android, ios, mac, windows)
- User preferences:
  - Color scheme (light, dark)
  - Color contrast (more, less)

and potentially more in your situation. Also you may use different terminology
than used here. _Token consumer_ shall use one token (as defined in a token
specification) whereas _token designers_ must be specific to define which value to
use under any given context. The actual value of that token shall adapt to the
environment and adhere to user preferences.

## Managing Contexts

To start this off, let's define some contexts at first by opening the context
tab in the theemo plugin and add the context you need (as shown in
[figure 1](#figure-plugin-contexts)). In that case, there is `light` and
`dark` context.

<!-- f-50 -->

!#plugin-contexts[Managing context in the theemo plugin](./plugin-contexts.png)

Second is to check settings tab of the theemo plugin if the setup works for you.
Contextual tokens are identified by a delimiter, which is set through a prefix
to be included in the token name denoting its contextual nature (see
[figure 2](#figure-plugin-settings)).

<!-- f-50 -->

!#plugin-settings[Settings of the theemo plugin](./plugin-settings.png)

Anything after the delimiter indicates the context which this token is being
used for (the ones you defined earler in [figure 1](#figure-plugin-contexts)).

Finally, the scheme for a contextual tokens is this:

```txt
<token-name><context-prefix><context-name>
```

## Using Contexts

According to the scheme above, we are only defining tokens for each context, the
plugin will be responsible for the _consumer token_.
[Figure 3](#figure-contexts-with-arrows) shows some
contextual tokens, let's focus on the color swatches for background, contrast
layout tokens as well as normal and emphasize text tokens (on light
and dark background respectively).

Tokens defined are:

- `layout/background.$light`
- `layout/background.$dark`

Let's decipher them:

- token name: `layout/background`
- delimiter: `.$`
- context name: `light` and `dark`

<!-- f-50 -->

!#contexts-with-arrows[Using contextual tokens](./contexts-with-arrows.png)

The arrows in [figure 3](#figure-contexts-with-arrows) show how contextual
tokens are [referenced](./references) to the color palette, whereas the
playground is using the _consumer tokens_, e.g. `layout/background`.

## Switching Contexts

Now, that contextual tokens are set, it's about switching between contexts. Keep
the context tab of theemo plugin open and select the context you want to become
active. All _consumer tokens_ will be set to the selected context, the video in
[figure 4](#figure-context-switching) gives a hands-on demo.

!#context-switching[Switching contexts](./context-switching.mp4)

With context switching unlocked, it's great to have a playground near your
contextual tokens. This allows quick inspection if colors provide enough
contrast.
