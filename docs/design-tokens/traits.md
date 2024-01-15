# Traits

Understanding tokens is happening by observing them in their natural habitat,
draw connections and interactions and constitute a schema from that, which then
explains their rules.

Traits are inherent to tokens given their technical nature in which they are used.

Tokens are somewhat of chameleons as they do change their value, it's fair to attest them _behavior_. A stimulus to that change may be a user or a product - both _principals_ - to express their preference. An _agent_ transports the stimulus from the principal to the product.

## Behaviors

Behaviors come in two modalities: _adaptive_ and *mode*

The **adaptive** modality is a user's instruction to the product to respect their preference being set in the operating system (OS). A product behaves passive and passes through the preference from the OS.\
Changing the preference in the OS might happen by a manual toggle, automatically triggered via schedule, or through signals from sensors.

Technically adaptive values are “listened to” in CSS with media queries, such as `@media (prefers-color-scheme: dark)`

A **mode** on the other hand is a conscious opt-in and it may even override the user preference from the operating system. Jef Raskin (2008, p. 55) explains this at the example of shift and caps-lock key giving the biological explanation. Our nervous system operates that a constant stimulus yields a signal, that over time decreases its ability to capture our attention. This decreases until our cognitive system receives no more signals, even though the muscles which are actively producing a force still emit them.

We can transfer this behavior to digital products. In products only offering choices for light and dark color schemes but no system. During day, you set your operating system to light color scheme and made the same choice for the product you are using. Later at night when your operating system switched to a dark color scheme and when returning to that product, you be surprised it still shows light color mode? That is the “muscle” is still “yielding” light color scheme “signals” but your cognitive system dropped the attention to receive them and in turn act surprised to the color-scheme-not-synced-with-your-os behavior.

Technically values are implemented with custom selectors, such as `[data-color-scheme="dark"]`.

With CSS we can respect both customization preferences from our users (although we produce redundancy in our code):

```css
/* Adaptive: respect OS setting */
@media (prefers-color-scheme: light) {
  :root {
    /* our tokens */
  }
}

/* Mode: Provide override */
[data-color-scheme="light"] {
  /* our tokens... again -_- */
}
```

[Bramus Van Damme](https://www.bram.us) (2022) talks about [Dark Mode Toggles](https://www.bram.us/2022/05/25/dark-mode-toggles-should-be-a-browser-feature) and the technical problems in more detail and lists currently debated solutions. While [I like the idea](https://twitter.com/unistyler/status/1530955145059651586) and suggest the [features](./features.md), [I disagree with this being a browser setting](https://twitter.com/unistyler/status/1531267295191891968) - these preferences are better stored at each product to provide the same experiences across device, different applications/browsers and prevent browser lock-in.

## Principals and Agents

Who is responsible for triggering the behavior above? A situation described as the ["Principal–agent problem"](https://en.wikipedia.org/wiki/Principal%E2%80%93agent%20problem). Users and products are mandated principals to represent interest (eg. dark color scheme) through our agent (eg. operating system) that passes our interests forward.

A user enjoys a delightful experience when (1) their agent is expressing our interest and (2) we understand who is the principal for a particular decision. Contrary to that are situations that cause an interest conflict, e.g. the situation described above: The principal (user) told their agent (operating system) to change to dark color scheme. The product eliminated the operating system as agent and wasn't aware of the users interest.

!#[Product, Tech Platform and Operating System as agents of a Design System](./assets/agents.png){.fig-75}

Here is the cascade of agents. For makers we must understand with which agents our product is interacting with, which agents we give priority and which sensible defaults the product is providing as principal.

### Principal: User

A user's interests represented by agents shall have the highest of priority to deliver a pleasant user experience. Users will use a multitude of agents to express their wishes.

### Principal: Product

Products are ambivalent in which they act as principal to express the product's interest and at the same establish communication to the agents their users' use.

A products principal role is provide defaults and to allow or deny these connections and customization options for their users.

!#[Product as agent may or may not keep the connnections to lower level principals](./assets/agents-cut-connection.png){.fig-75}

On the other hand a product may offer options beyond the signals from connected agents (e.g. color correction). It's defined via their feature set and changed as part of their roadmap.

### Principal: Vendors (Passive)

Vendors that are part of the technical stack who define the whole environment in which the product is executed are passive principals, as they provide (sensible) defaults for the agents they built. An operating system vendor defines the default color scheme, a browser vendor has a default font-size, etc. Every time no specific option of a feature is chosen, it will fallback to defaults from these vendors.

### Agent: Operating System

The lowest level is the operating system. If no agent on a higher level handles decision making, this falls down to the OS.   Depending on the OS itself, users have more or less choices to to instruct their preferences. As the OS is lowest common multiplier amongst all products, users can broadcast their interest with the highest reach.

Operating system vendors provide their defaults which can be overridden by users.

| --- | --- |
| **Agent** | Operating System |
| **Principals** | User, OS Vendors |

### Agent: Tech Platform

Tech platform is an umbrella term including various runtimes/context in which applications are executed. For web apps this is the browser, for native apps its their native shells. Furthermore this also addresses programming frameworks that provide defaults such as bootstrap, or proprietary environments.

They _may_ provide defaults (eg. font-size for a browser) and _may_ provide options for users to overwrite them.

Mentioned above are environments controlled by product creator's. In contrast to that, uncontrolled environments exist, too. When an application is opened within an in-app browsing context or app shell. In that case, the operating system no longer can be considered as the low-level agent, instead [the host app may turn into the low-level agent](https://www.sarasoueidan.com/blog/prefers-color-scheme-browser-vs-os/), as Sara Soueidan (2021) figured out.

| --- | --- |
| **Agent** | Tech Platform |
| **Principals** | User, Platform Vendors |

### Agent: Product

At the highest level, the decision to make is to (a) dead-lock a feature by not supporting it (b) pass through to other agents (c) act as principal to define a decision and ignore other agents. Products also have the freedom to offer their own custom preferences, not aggregateable from other agents (ie. a personalized flavor).

| --- | --- |
| **Agent** | Product |
| **Principals** | User, Product |

## Computational Tokens

Another observation of tokens is their powerful computation capability. Whereas _behaviors_ switches between values, computing takes an input, optionally parameters, a formula and calculates a new value.

Sizing tokens change their value based on viewport width is a more go-to example, the result is then further processed as input for a [modular scale](https://www.modularscale.com) (Kellum & Brown) helping with [fluid responsive design](https://utopia.fyi) (Gilyead & Mudford).

Generating harmonic color palettes that provide good contrast levels are on the complex side of computational tokens. Seen in [ColorBox](https://colorbox.io) by Lyft, [Leonardo](https://leonardocolor.io) by Adobe or [Prism](https://primer.style/prism) by Github.

## Characteristics vs. Traits

Can a theme have a bad or good character?

Traits in biology are genealogically, passed down as genetic heritage from our ancestors, mutating over generations. In technology, traits are the rules and constraints of the used platform (mutating over time).

Character is sensed by its qualities. For a person, these qualities are kindness, integrity, helpfulness, etc. which are attributed to a good character, negative qualities are attributed to a bad character.\
Supported features are the qualities of a design system theme. The more features are available, the more accessible your product will be, the more people enjoy using your product, the more humble your theme is.

Traits form a strict environment, characters evolve through development. Users will recognize that evolution and praise it. You may start with a bad character (low feature set) and develop into a good character (richt feature set). Github for example started with light and dark color schemes and added support for more and more features, such as color contrast and even beyond the rules of the environment and supports protanopia, deuteranopia and tritanopia - well done, good job.

## References

- Gilyead, J. & Mudford, T. (n.d.). _Utopia - Fluid Responsive Design_. <https://utopia.fyi/>
- Kellum, S. & Brown, T. (n.d.). _Modularscale_. <https://www.modularscale.com/>
- Raskin, J. (2008). _The Humane Interface: New Directions for Designing Interactive Systems_ (10th printing). Crawfordsville, Indiana: Addison-Wesley.
- Soueidan, S. (2021, October 3). _The CSS prefers-color-scheme user query and order of preference_. <https://www.sarasoueidan.com/blog/prefers-color-scheme-browser-vs-os/>
- Van Damme, B. (2022, May 25). _Dark Mode Toggles Should be a Browser Feature_. <https://www.bram.us/2022/05/25/dark-mode-toggles-should-be-a-browser-feature>
- Principal–agent problem. _Wikipedia_, Wikimedia Foundation, 20th October 2022, <https://en.wikipedia.org/w/index.php?title=Principal%E2%80%93agent_problem&oldid=1117274101>
