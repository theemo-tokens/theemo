# Naming

Naming design tokens can sometimes be considered its own discipline. Naming is surprisingly straight forward, and if it isn't then it solves the wrong problem.

A lot has been written about naming design tokens, and Lukas Oppermann (2022) has collated this in his [practical guide to name design tokens](https://uxdesign.cc/naming-design-tokens-9454818ed7cb). Applying this brings people to both sides of the spectrum on one hand a chill mode and the other side a sweaty stressful mode.

## How to NOT to Name Design Tokens

When naming design tokens becomes a problem, then because this solves all other problems but naming design tokens. Here is a list of common mistakes:

- Find a schema or formula for _all tokens_
- Solve your communication
- Figure out bounded contexts (or groups or namespaces)
- Align with technical aspects (types or tiers)
- Led by tooling

This leads to hilariously complex formulae, leading to the impression you need a PhD to understand them. Samples can be found in [Naming tokens in design systems (Curtis, 2020)](https://medium.com/eightshapes-llc/naming-tokens-in-design-systems-9e86c7444676), [category/type/item (CTI) (Style Dictionary)](https://amzn.github.io/style-dictionary/#/tokens?id=category-type-item), [anatomy of a design token and organization (Gonzalez, 2021)](https://uxdesign.cc/design-tokens-cheatsheet-927fc1404099), [naming the pyramid (Fluin, 2022)](https://stefaniefluin.medium.com/the-pyramid-design-token-structure-the-best-way-to-format-organize-and-name-your-design-tokens-ca81b9d8836d), [naming conventions for design tokens (Kavčič, 2022)](https://designstrategy.guide/design-management/design-tokens-101/), and [another set of established conventions by myself (Gossmann, 2020)](https://gos.si/blog/full-featured-themes-in-figma/) - to name a few.

Instead of solving all these issues with a naming schema for design tokens, address the challenges individually beforehand.

## How to Name Design Tokens

Naming your design tokens is chill, when:

- you have established bounded contexts
- communication between contexts is clear
- a good story telling for using design tokens (optional)
- Scales are worked out and used appropriately to your system needs and and aligned with communication
- Token specifications define formulas for replicability and interoperability

With all of them ready, there is one more important fact to understand:

> Design Tokens are isolated by their bounded context and so is their naming

With all the facts worked out, that most of the time already declares the tokens name - that's the entire magic.

## What Makes a Good Name?

Kavčič (2022) recommends a workshop for your team to find a good name to properly communicates, setting the base for storytelling to explain your design tokens. Along with that she lists a guideline including `short`, `meaningful`, `easy-to understand`, `modular` and `consistent`. Take note that `short` and `meaningful` can mean mutually exclusive and `easy-to understand` requires people to share the same context and is assumptive to a large extend. Here is another approach, incorporating the ideas from the list above:

- **A good name is the manual for how to use the token**\
this sounds nice in theory, in practice this is not always achievable. It works for a couple of tokens, but certainly not for all.

- **A description to back up the name**\
the name is not always enough to convey the message, a description text can bring the ancillary information, but is not always present.

- **Don't rely on common words**\
the industry has a [magnet to use words such as primary or secondary (Gossmann, 2022)](https://gos.si/blog/the-primary-secondary-naming-controversy-in-design-systems/), yet rarely defines them and gives room for abuse, be explicit in using such words or deny usage.

- **Pick unknown words**\
in addition to the undefined words above and the requirement for people to share a context about common word usage (eg. t-shirt sizes and its default; for me the default is small, I'm 162.5cm in body height).\
Do the opposite, pick words, that are uncommon but part of the vocabulary of the system. That _will_ require people to look them up and learn them, instead of relying on unshared, undefined context. Works best with pattern scales.

## References

- Curtis, N. (2020). _Naming Tokens in Design Systems_. <https://medium.com/eightshapes-llc/naming-tokens-in-design-systems-9e86c7444676>
- Fluin, S. (2022, August 16). _The Pyramid Design Token Structure: The Best Way to Format, Organize, and Name Your Design Tokens_. <https://stefaniefluin.medium.com/the-pyramid-design-token-structure-the-best-way-to-format-organize-and-name-your-design-tokens-ca81b9d8836d>
- Gonzalez, O. (2021, February 18). _Design tokens cheatsheet_. <https://uxdesign.cc/design-tokens-cheatsheet-927fc1404099>
- Gossmann, T. (2020, February 2). _Full Featured Themes in Figma_. <https://gos.si/blog/full-featured-themes-in-figma/>
- Gossmann, T. (2022, April 21). _The Primary/Secondary Controversy in Design Systems_. <https://gos.si/blog/the-primary-secondary-controversy/>
- Kavčič, R. (2022, September 14). _Design Tokens 101_. Design Strategy Guide. <https://designstrategy.guide/design-management/design-tokens-101/>
- Oppermann, L. (2022, January 27). _Naming Design Tokens - The Practical Guide_. UX Collective. <https://uxdesign.cc/naming-design-tokens-9454818ed7cb>
- Style Dictionary (n.d.). _Design Tokens_. <https://amzn.github.io/style-dictionary/#/tokens?id=category-type-item>
