---
id: faq
title: FAQ
---

**Q: Can I reference imported Styles?**

Partially...

...when using theemo plugin it can only show local styles as suggestions, that is
due to limitations of the current Figma plugin API, given security reasons for
shared team libraries. That's fair - Figma keeps us safe, give them credit for
that :)

It still is possible to use library styles, manually assign those style and THEN
use the theemo dialog in order to persist it.

**Q: Can I use Multi Themed Components in various Projects?**

Yes. Have a look at [best practices for multi theme
components](./best-practices#multi-themed-components).

**Q: My References and/or Transforms do not Update - What to do?**

1. There might be for some reasons two or more references to the same token (and
   they overwrite each other, non-visible to the eye, because it happens in the
   same process)
2. The node on which transforms/references are applied might have become
   "unstable" in terms of how Theemo saves the reference. Might be good to
   delete the node, recreate it and set the reference with transforms again
3. Probe yourself on a fresh document (under drafts, just for your own testing -
   discard it afterwards). Does it work on that new document? If so, then
   somewhat under (1) or (2) is much likely the reason for it.
4. Exporting references, duplicating the file and re-importing references
   (through jsbin might be helping).
5. It might be an actual bug. Please file an issue at <https://github.com/gossi/theemo/issues>
