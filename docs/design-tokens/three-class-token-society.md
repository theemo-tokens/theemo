# The Three Class Token Society

Design tokens are often grouped based on their phenomenal reference sequence. From basic, over semantic to component tokens. This article compares this organization with a model based architecture and figures out the advantages and disadvantages.

Tokens are grouped into three tiers:

1. Basic or core or foundation
2. Semantic or purpose
3. Component

[Lukas Oppermann (2022)](https://uxdesign.cc/naming-design-tokens-9454818ed7cb) collated and [Jacob Miller (2023)](https://twitter.com/pwnies/status/1641162071449673728) ran a poll on Twitter about the various token level names . The levels are based on the fact that design tokens propagate through the system ([Nathan Curtis, 2017](https://medium.com/eightshapes-llc/tokens-in-design-systems-25dd82d58421)) and brings visibility to the references as explained by [Romina Kavčič (2022)](https://designstrategy.guide/design-management/design-tokens-101/), [Ishan Manandhar (2020)](https://uxdesign.cc/design-tokens-how-to-use-them-effectively-d495ff05cbbf) and Brad Frost ([2018](https://bradfrost.com/blog/post/creating-themeable-design-systems/), [2022](https://www.youtube.com/watch?v=JbxKTBvSLeY)). Each author additionally explains the use-case or purpose for each group in their respective systems and with that concepts or patterns on how to use each group or their target area (eg. global vs local tokens). When before mentioned authors visualize the levels, they use a top to bottom rsp. bottom to direction. [Stefanie Fluin (2022)](https://stefaniefluin.medium.com/the-pyramid-design-token-structure-the-best-way-to-format-organize-and-name-your-design-tokens-ca81b9d8836d) speaks about a pyramid and [Oscar Gonzalez (2021)](https://uxdesign.cc/design-tokens-cheatsheet-927fc1404099) puts it into a visualization:

!#["Design Token Types" (Gonzalez, 2021)](./assets/token-society-pyramid.webp){.fig-75}

The question must be asked: Do we have a design token society with lower, middle and upper class?\
Are the majority of the token citizens tier 1 tokens, with less citizens in tier 2 and even less in tier 3? Was the pyramid as a visual representation chosen because of that?\
Does the question even make sense? Well, no. Not at all! It is the yellow elephant in the room - but is it the only one?

## Disadvantages

There are a couple of reasons, where the idea of a three class token society will fall short for organizing design token.

(1) None of these articles explicitly mentions or allows exceptions of tokens, that would not fit into any of these tiers. They (miss)educate the illusion, that _all_ tokens have to follow this sequence. (2) They don't offer an alternative location to home design tokens around a particular topic, not being part of any tiers. (3) No difference is made between tokens for designers and consumers - are color palette tokens for consumers? (4) Readers might implicitly understand, tier 1 tokens are for token designers and tier 2 and tier 3 tokens are for token consumers? This is very assumptive, no explicit statements are made and eliminates predictability and stability guarantees. (5) Coupling an organization structure to a "technical" aspect only ever allows growth within the permutations of the aspect itself, meaning the organization has to scale with the given tiers (6) Design tokens that are outliers to the system are _valid_ but it feels awkward to have them, as they feel displaced.

Organizing tokens is to give these groups meaning and purpose in terms of the system rather than the technical aspect they are sorted by. What happens when tokens, token organization or token naming are coupled with their technical aspects? Switching perspective from token designers to token consumers makes this visible:

Let's assume this, you are renovating the furniture in your house and look for help: Do you search for people from the middle or lower society? Do you search by the material, that tools (hammer, saw, etc.) are made of? Or do you search for carpenters?\
Same goes for tokens. Are you using tokens by their tier? by their technical type? or by their purpose for what they are made for? The latter is defined in the strategic design.

## Advantages

Is it all bad with token tiers? No, they bring a lot of advantages but the linked literature misses out on providing the relevant perspective.

Tiers are a wonderful way to explain token references and that includes token designers and consumers and even external stakeholders (PM, EM - shall they be interested in your tickets about designing tokens).

Tiers are relevant for token designers and irrelevant to token consumers. Tiers as much as types are _attributes_ to tokens and enrich their information. They _classify_ tokens and assist token designers taking informed decisions and are mentioned by the authors above about granularity or reach for these tokens.

## Usage Considerations

Tiers and the attempt to pressure tokens into them (which felt awkward) lead to discover token _visibility_: Internal to a theme or public for token consumers. Tiers and visibility are independent and helps with [theming](./theming.md).

Naming and tiers are independent. The name communicates usage to token consumers and for them the tier is irrelevant. Yet in literature tiers and names and/or scales are often mentioned together (Fluin, 2022; Gonzales, 2021) to indicate cohesion but disregarding their independence.

## References

- Curtis, N. (2017, October 10). _Defining Design Systems_. <https://medium.com/eightshapes-llc/defining-design-systems-6dd4b03e0ff6>
- Fluin, S. (2022, August 16). _The Pyramid Design Token Structure: The Best Way to Format, Organize, and Name Your Design Tokens_. <https://stefaniefluin.medium.com/the-pyramid-design-token-structure-the-best-way-to-format-organize-and-name-your-design-tokens-ca81b9d8836d>
- Frost, B. (2018, April 2). _Creating Themeable Design Systems_. <https://bradfrost.com/blog/post/creating-themeable-design-systems/>
- Frost, B. (2022). Creating Themeable Design Systems. In _SmashingConf_. <https://www.youtube.com/watch?v=JbxKTBvSLeY>
- Gonzalez, O. (2021, February 18). _Design tokens cheatsheet_. <https://uxdesign.cc/design-tokens-cheatsheet-927fc1404099>
- Kavčič, R. (2022, September 14). _Design Tokens 101_. Design Strategy Guide. <https://designstrategy.guide/design-management/design-tokens-101/>
- Miller, J. [@pwnies] (2023). _Everyone's favorite game_. [Tweet]. Twitter. <https://twitter.com/pwnies/status/1641162071449673728>
- Oppermann, L. (2022, January 27). _Naming Design Tokens - The Practical Guide_. UX Collective. <https://uxdesign.cc/naming-design-tokens-9454818ed7cb>
- Manandhar, I. (2020, March 2). _Design Tokens: How to use them effectively_. <https://uxdesign.cc/design-tokens-how-to-use-them-effectively-d495ff05cbbf>
