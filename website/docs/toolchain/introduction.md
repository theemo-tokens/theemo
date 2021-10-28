---
id: introduction
title: Introduction
---

Theemo will **integrate** into your existing **toolchain** by **connecting**
multiple parts together. It will perform the following steps:

```mermaid
flowchart LR
    subgraph Sync [ ]
        RunSync[Sync] --> DescSync[Generates tokens for your<br>token translation tool]
    end

    subgraph Build [ ]
        RunBuild[Build] --> DescBuild[Run build with your<br>token translation tool]
    end

    subgraph Generate [ ]
        RunGenerate[Generate] --> DescGenerate[Generates a ready-to-use<br>CSS theme file]
    end

    Sync --> Build --> Generate

    classDef text stroke-width:0,fill:transparent
    class DescSync,DescBuild,DescGenerate text
```

You can use one or all of the provided features, whatever fits for your situation.

Theemo provides all the infrastructure yet it never
understands your tokens at all. That is given the high diversity of design
tokens, they come in many forms and your `theemo.js` config acts as DSL to make
them understandable _to you_.

-> [Let's get you started](getting-started.md)
