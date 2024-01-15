# Best Practices

Theemo is built for _theeming_ in mind (hence the name) was developed
with some workflows in mind, it is best to use them like that.

## As a Free User

Setup:

- One file per theme
- One file for design system and product components

### Theme File

- Define design tokens
- Define contexts
- Create references
- Use [context switchting](./contexts#switching-contexts) to select a published
  context for your theme
- Publish styles (Figma will prompt you)
- Create theme in [Themer](https://www.figma.com/community/plugin/731176732337510831/Themer) (or update existing one)

### Component File

- Update imported styles (Figma will prompt you)
- Open Themer
- Select theme and apply it to the page

Workflow for switching the context in your component library:

1. Theme document:

- Open Theemo plugin
- Switch context
- Publish styles (Figma will prompt you)

2. Component document:

- Update imported styles (Figma will prompt you)

## As a Pro User

Setup:

- One file per theme
- One or more files for your design system components
- Multiple files for your product related work

### Theme File

- Define design tokens
- Define contexts
- Create references
- Use [context switchting](./contexts#switching-contexts) to select a published
  context for your theme
- Publish styles (Figma will prompt you)

### Component File

- Use [swap
  library](https://help.figma.com/hc/en-us/articles/4404856784663-Swap-style-and-component-libraries)
  to change your theme
- Publish components branded with your theme

### Product File(s)

- Import branded components

## Multi-Themed Components

Imagine this setup:

- 2x Themes (red and blue)
- 1x Component Library
- 2+ consuming projects

Ideally, when working on each of these products, you import the component
library + the related theme for that particular project. Unfortunately Figma
doesn't allow this, but they offer a workaround for you.

<figure>
  <iframe width="560" height="315" src="https://www.youtube.com/embed/9Kq33r_gq0E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  <figcaption>Multi-themed Figma components</figcaption>
</figure>
