---
title: 调试工具
contributors:
  - sokra
  - skipjack
---

?> Description...

## `devtool`

`string`

Choose a style of [source mapping](http://blog.teamtreehouse.com/introduction-source-maps) to enhance the debugging process. Be aware that the following options can affect build and rebuild speed dramatically...

`eval` - Each module is executed with `eval` and `//@ sourceURL`

`source-map` - A full SourceMap is emitted

`hidden-source-map` - Same as `source-map`, but doesn't add a reference comment to the bundle

`inline-source-map` - A SourceMap is added as DataUrl to the bundle

`eval-source-map` - Each module is executed with `eval` and a SourceMap is added as DataUrl to the `eval`

`cheap-source-map` - A SourceMap without column-mappings ignoring loaded source maps

`cheap-module-source-map` - A SourceMap without column-mappings that simplifies loaded source maps to a single mapping per line

 devtool                      | build | rebuild | production | quality
------------------------------|-------|---------|------------|--------------------------
 eval                         | +++   | +++     | no         | generated code
 cheap-eval-source-map        | +     | ++      | no         | transformed code (lines only)
 cheap-source-map             | +     | o       | yes        | transformed code (lines only)
 cheap-module-eval-source-map | o     | ++      | no         | original source (lines only)
 cheap-module-source-map      | o     | -       | yes        | original source (lines only)
 eval-source-map              | --    | +       | no         | original source
 source-map                   | --    | --      | yes        | original source


T> See [`output.sourceMapFilename`](/configuration/output#output-sourcemapfilename) to customize the filenames of generated source maps.

?> This section is pretty much just copied over from existing docs... imo more background is needed on the different types of source mapping, maybe via links to external sites that discuss the different types of source maps in more detail.
