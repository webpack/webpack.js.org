---
title: Devtool
sort: 10
contributors:
  - sokra
  - skipjack
  - SpaceK33z
  - lricoy
---

This option controls if and how Source Maps are generated.

## `devtool`

`string` `false`

Choose a style of [source mapping](http://blog.teamtreehouse.com/introduction-source-maps) to enhance the debugging process. These values can affect build and rebuild speed dramatically.

 devtool                      | build | rebuild | production | quality
------------------------------|-------|---------|------------|--------------------------
 eval                         | +++   | +++     | no         | generated code
 cheap-eval-source-map        | +     | ++      | no         | transformed code (lines only)
 cheap-source-map             | +     | o       | yes        | transformed code (lines only)
 cheap-module-eval-source-map | o     | ++      | no         | original source (lines only)
 cheap-module-source-map      | o     | -       | yes        | original source (lines only)
 eval-source-map              | --    | +       | no         | original source
 source-map                   | --    | --      | yes        | original source
 nosources-source-map         | --    | --      | yes        | without source content

T> `+` means faster, `-` slower and `o` about the same time

Some of these values are suited for development and some for production. For development you typically want fast Source Maps at the cost of bundle size, but for production you want separate Source Maps that are accurate.

W> There are some issues with Source Maps in Chrome. [We need your help!](https://github.com/webpack/webpack/issues/3165).

### For development

`eval` - Each module is executed with `eval()` and `//@ sourceURL`. This is pretty fast. The main disadvantage is that it doesn't display line numbers correctly since it gets mapped to transpiled code instead of the original code.

`inline-source-map` - A SourceMap is added as a DataUrl to the bundle.

`eval-source-map` - Each module is executed with `eval()` and a SourceMap is added as a DataUrl to the `eval()`. Initially it is slow, but it provides fast rebuild speed and yields real files. Line numbers are correctly mapped since it gets mapped to the original code.

`cheap-module-eval-source-map` - Like `eval-source-map`, each module is executed with `eval()` and a SourceMap is added as a DataUrl to the `eval()`. It is "cheap" because it doesn't have column mappings, it only maps line numbers.

### For production

`source-map` - A full SourceMap is emitted as a separate file. It adds a reference comment to the bundle so development tools know where to find it.

`hidden-source-map` - Same as `source-map`, but doesn't add a reference comment to the bundle. Useful if you only want SourceMaps to map error stack traces from error reports, but don't want to expose your SourceMap for the browser development tools.

`cheap-source-map` - A SourceMap without column-mappings ignoring loaded Source Maps.

`cheap-module-source-map` - A SourceMap without column-mappings that simplifies loaded Source Maps to a single mapping per line.

`nosources-source-map` - A SourceMap is created without the `sourcesContent` in it. It can be used to map stack traces on the client without exposing all of the source code.

T> See [`output.sourceMapFilename`](/configuration/output#output-sourcemapfilename) to customize the filenames of generated Source Maps.

?> This page needs more information to make it easier for users to choose a good option.

# References

- [Enabling Sourcemaps](http://survivejs.com/webpack/developing-with-webpack/enabling-sourcemaps/)
- [webpack devtool source map](http://cheng.logdown.com/posts/2016/03/25/679045)
