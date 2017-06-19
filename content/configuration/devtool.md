---
title: Devtool
sort: 10
contributors:
  - sokra
  - skipjack
  - SpaceK33z
  - lricoy
related:
  - title: Enabling Sourcemaps
    url: http://survivejs.com/webpack/developing-with-webpack/enabling-sourcemaps/
  - title: Webpack's Devtool Source Map
    url: http://cheng.logdown.com/posts/2016/03/25/679045
---

This option controls if and how source maps are generated.

Use the [`SourceMapDevToolPlugin`](/plugins/source-map-dev-tool-plugin) for a more fine grained configuration. See the [`source-map-loader`](/loaders/source-map-loader) to deal with existing source maps.


## `devtool`

`string` `false`

Choose a style of [source mapping](http://blog.teamtreehouse.com/introduction-source-maps) to enhance the debugging process. These values can affect build and rebuild speed dramatically.

T> The webpack repository contains an [example showing the effect of all `devtool` variants](https://github.com/webpack/webpack/tree/master/examples/source-map). Those examples will likely help you to understand the differences.

devtool                       | build | rebuild | production | quality
----------------------------- | ----- | ------- | ---------- | -----------------------------
eval                          | +++   | +++     | no         | generated code
cheap-eval-source-map         | +     | ++      | no         | transformed code (lines only)
cheap-source-map              | +     | o       | yes        | transformed code (lines only)
cheap-module-eval-source-map  | o     | ++      | no         | original source (lines only)
cheap-module-source-map       | o     | -       | yes        | original source (lines only)
eval-source-map               | --    | +       | no         | original source
source-map                    | --    | --      | yes        | original source
inline-source-map             | --    | --      | no         | original source
hidden-source-map             | --    | --      | yes        | original source
nosources-source-map          | --    | --      | yes        | without source content

T> `+` means faster, `-` slower and `o` about the same time

Some of these values are suited for development and some for production. For development you typically want fast Source Maps at the cost of bundle size, but for production you want separate Source Maps that are accurate.

W> There are some issues with Source Maps in Chrome. [We need your help!](https://github.com/webpack/webpack/issues/3165).

T> See [`output.sourceMapFilename`](/configuration/output#output-sourcemapfilename) to customize the filenames of generated Source Maps.


### Development

The following options are ideal for development:

`eval` - Each module is executed with `eval()` and `//@ sourceURL`. This is pretty fast. The main disadvantage is that it doesn't display line numbers correctly since it gets mapped to transpiled code instead of the original code.

`inline-source-map` - A SourceMap is added as a DataUrl to the bundle.

`eval-source-map` - Each module is executed with `eval()` and a SourceMap is added as a DataUrl to the `eval()`. Initially it is slow, but it provides fast rebuild speed and yields real files. Line numbers are correctly mapped since it gets mapped to the original code.

`cheap-eval-source-map` - Similar to `eval-source-map`, each module is executed with `eval()`. However, with this option the Source Map is passed as a Data URL to the `eval()` call. It is "cheap" because it doesn't have column mappings, it only maps line numbers.

`cheap-module-eval-source-map` - Similar to `cheap-eval-source-map`, however in this case this case loaders are able to process the mapping for better results.


### Production

These options are typically used in production:

`source-map` - A full SourceMap is emitted as a separate file. It adds a reference comment to the bundle so development tools know where to find it.

`hidden-source-map` - Same as `source-map`, but doesn't add a reference comment to the bundle. Useful if you only want SourceMaps to map error stack traces from error reports, but don't want to expose your SourceMap for the browser development tools.

`cheap-source-map` - A SourceMap without column-mappings ignoring loaded Source Maps.

`cheap-module-source-map` - A SourceMap without column-mappings that simplifies loaded Source Maps to a single mapping per line.

`nosources-source-map` - A SourceMap is created without the `sourcesContent` in it. It can be used to map stack traces on the client without exposing all of the source code.
