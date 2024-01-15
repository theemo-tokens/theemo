# Awful Design Tokens

A **NOT TODO** list for design tokens.

## Stop Light and Dark Themes

Light and dark are options of the color scheme feature. This feature is
addressing a subset of tokens within a theme. There is no reason that selected
subset, when the rest of the tokens stay as is. These permutations are
handled _on_ the tokens itself.

Do instead:

- [Understand features](./features.md)
- Support features in themes

## Stop Using Primary and Secondary Tokens

... at least when they are not defined. Most design system copy paste these
terms over without defining them - on to a [primary/secondary
controversy](https://gos.si/blog/the-primary-secondary-naming-controversy-in-design-systems).
Undefined tokens cry for abuse "oh they have something to do with the brand,
no?" and soon they are used in situations for which they shouldn't. It will
become visible too late, when a theme is changed and your new primary color
shows up in unexpected areas.

Do instead:

- [Model your domain](./modeling.md)
- [Write token specifications](./token-specification.md)
- Give your tokens meaning and purpose

## Stop Finding a Schema to Name all Design Tokens

[Naming things is a hidden
skill](https://gos.si/blog/the-hidden-skill-and-art-of-naming-things) that is
visibly practitioned within the design system community. Taming our inner monks
to find the most elegant yet unambigous and short name is an art to reach for.
There are plenty articles out there giving advice how to name your design
tokens. But almost all lack the problem, that they are doing this as an too
early step. Trying to find a scheme in which _all_ design tokens are forcefully
pressured into... which in turn makes them bleed like the feet of cinderella's
step sisters.

Naming design tokens naturally follows your established communication model.

Do instead:

- [Model your domain](./modeling.md)
- [Develop communicative scales](./scales.md)
- [Name design tokens](./naming.md)

## Stop Putting Focus on the Type

(Another problem - a naive approach - is to look into the technical aspects of design tokens, such as fonts, colors, dimensions, etc. and group them based on their characteristics, which isn't helpful for applying tokens.)
