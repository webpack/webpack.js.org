Discussion
----------

The following is a collection of thoughts, ideas and plans we've gone through
in the last year or so. I wanted to try to get this "down on paper" to make it
easier to discuss...


## Markdown Processing

Whether we go with pure `webpack`, or `gatsby` it seems `remark` is the way to
go and I believe __@wooorm__ (creator of `remark`) would help us out with that.
This issue from `webpack-defaults` contains some discussion and alternatives
though the decision was pretty clear it seems:

https://github.com/webpack-contrib/webpack-defaults/issues/73

We do have a bunch of custom `markdown` processing, however for a bunch of it
`remark` plugins already exist:

- `remark-collapse`
- `remark-autolink-headings`
- `remark-mermaid` (#469)
- `remark-highlight.js` (though we do have a custom prism theme)

And here's what isn't covered yet (though probably could be with new plugins
and help from __@wooorm__):

- Mobile table customizations
- Code with links and collapsible sections
- Custom blockquotes (i.e. `T>`, `W>`, and `?>`)


## Markdown Formatting

Both `remark-lint` and `prettier` were discussed in `webpack-defaults` issue.
Either are fine with me, but I think we should get something in place soon. It
is a pain to have to nitpick things like two line breaks before headers. On top
of that we should probably format everything at 80 characters for improved
readability. Both `remark` and `prettier` are capable of rewriting the file
with standardized formatting so we just need to pick one.


## External Content Population

Jeremy and I discussed this a while back and I agree with his suggestion re
using a steady prefix for all external documents that we can easily
`.gitignore`, e.g. an underscore `_`. I've done this before on other projects
and it has worked really well. This approach removes the need for many of the
`.gitignore` entries as well as the need for a `generated` folder. I think
it'll also make the i18n folks happier as they can simply remove the `_` from
their `.gitignore` and we don't have to maintain a separate `translation`
branch.

I could be missing something here, but -- if not -- I think we should go this
direction. I did this on the `rebuild` branch but haven't started pulling in
external files yet (or updated the `npm run fetch` script).


## `/src` Directory

I'm a fan of having the most simplistic structure possible.

__/assets__

Unless there's any that are used in multiple places, I think we can just move
each to the `/components/***` directory where they're used. Depending on build
process, we could also create `/src/content/images` for any images used within
the actual content of the site.

__/styles__

On the `rebuild` branch I created a simple `Markdown` component that isolates
all the markdown styling to a single location and makes it much easier to use.
With that done, all that's left in `src/styles` is the base styling which
should probably just go in `Site` component's directory. We would have to put
the `/partials` somewhere and start inlining `/icons` as discussed.

__/utilities__

The `markdown.js` file will be obsolete once we've ported to `remark`. Ideally,
the `highlight.js` utility will also be replaced by a simpler `remark-***`
plugin. If `test-local-storage.js` is all that's left, maybe we just scrap this
folder and move that utility to the one place it's used (`NotificationBar`).


## Build Process

I __was__ able to get the `StaticSiteGeneratorPlugin` working and it __did__
significantly improve build speed. That said, it still has it's quirks and
there's a few things we'd still need to resolve if we went this direction
(marked by `TODO`s). The biggest of these is getting the dynamic `import()` to
work with the plugin. Essentially, I was planning on:

- Generating a bunch of HTML pages for initial load and SEO.
- Generating `.js` chunks containing code for lazy loading in SPA mode.

This is similar to Gatsby and other PWA generators in the sense that the site
would be built fully (meaning an actual html file for every page), but then
turn into an SPA as soon as you loaded a single page.

...


## Versioning & Releases

I'm a huge fan of `standard-version` and have been following the
[conventionalcommits][1] spec very closely, even when merging MRs. We haven't
really started versioning this repo or generating changelogs but we should be
able to do so fairly easily if we keep following the convention and use the
`standard-version` utility.

I think the flow should look something like this:

- Any pushes to `master` are still continually deployed.
- If a new minor or major comes along in the core repo...
  - Make sure content reflects the changes in the new version.
  - Run `standard-version --release-as [webpack release version]`.

Then the git tags can be used to archive the last of every major version and
allow a version changing interface (e.g. a dropdown) to look at the content
from major to major. We can also customize the changelog generation to include
info on `docs(...)` commits (by default it only does `fix`, `feat` and
`BREAKING CHANGE`).


[1]: http://conventionalcommits.org/
