---
title: Devtool
sort: 12
contributors:
  - sokra
  - skipjack
  - SpaceK33z
  - lricoy
  - madhavarshney
  - wizardofhogwarts
  - anikethsaha
  - snitin315
related:
  - title: Enabling Source Maps
    url: https://survivejs.com/webpack/developing-with-webpack/enabling-sourcemaps/
  - title: webpack's Devtool Source Map
    url: http://cheng.logdown.com/posts/2016/03/25/679045
---

This option controls if and how source maps are generated.

Use the [`SourceMapDevToolPlugin`](/plugins/source-map-dev-tool-plugin) for a more fine grained configuration. See the [`source-map-loader`](/loaders/source-map-loader) to deal with existing source maps.

## `devtool`

`string = 'eval'` `false`

Choose a style of [source mapping](http://blog.teamtreehouse.com/introduction-source-maps) to enhance the debugging process. These values can affect build and rebuild speed dramatically.

T> The webpack repository contains an [example showing the effect of all `devtool` variants](https://github.com/webpack/webpack/tree/master/examples/source-map). Those examples will likely help you to understand the differences.

T> Instead of using the `devtool` option you can also use `SourceMapDevToolPlugin`/`EvalSourceMapDevToolPlugin` directly as it has more options. Never use both the `devtool` option and plugin together. The `devtool` option adds the plugin internally so you would end up with the plugin applied twice.

| devtool                                    | performance                                        | production | quality        | comment                                                                               |
| ------------------------------------------ | -------------------------------------------------- | ---------- | -------------- | ------------------------------------------------------------------------------------- |
| (none)                                     | __build__: fastest<br /><br />__rebuild__: fastest | yes        | bundle         | Recommended choice for production builds with maximum performance.                    |
| __`eval`__                                 | __build__: fast<br /><br />__rebuild__: fastest    | no         | generated      | Recommended choice for development builds with maximum performance.                   |
| `eval-cheap-source-map`                    | __build__: ok<br /><br />__rebuild__: fast         | no         | transformed    | Tradeoff choice for development builds.                                               |
| `eval-cheap-module-source-map`             | __build__: slow<br /><br />__rebuild__: fast       | no         | original lines | Tradeoff choice for development builds.                                               |
| __`eval-source-map`__                      | __build__: slowest<br /><br />__rebuild__: ok      | no         | original       | Recommended choice for development builds with high quality SourceMaps.               |
| `cheap-source-map`                         | __build__: ok<br /><br />__rebuild__: slow         | no         | transformed    |
| `cheap-module-source-map`                  | __build__: slow<br /><br />__rebuild__: slow       | no         | original lines |
| __`source-map`__                           | __build__: slowest<br /><br />__rebuild__: slowest | yes        | original       | Recommended choice for production builds with high quality SourceMaps.                |
| `inline-cheap-source-map`                  | __build__: ok<br /><br />__rebuild__: slow         | no         | transformed    |
| `inline-cheap-module-source-map`           | __build__: slow<br /><br />__rebuild__: slow       | no         | original lines |
| `inline-source-map`                        | __build__: slowest<br /><br />__rebuild__: slowest | no         | original       | Possible choice when publishing a single file                                         |
| `eval-nosources-cheap-source-map`          | __build__: ok<br /><br />__rebuild__: fast         | no         | transformed    | source code not included                                                              |
| `eval-nosources-cheap-module-source-map`   | __build__: slow<br /><br />__rebuild__: fast       | no         | original lines | source code not included                                                              |
| `eval-nosources-source-map`                | __build__: slowest<br /><br />__rebuild__: ok      | no         | original       | source code not included                                                              |
| `inline-nosources-cheap-source-map`        | __build__: ok<br /><br />__rebuild__: slow         | no         | transformed    | source code not included                                                              |
| `inline-nosources-cheap-module-source-map` | __build__: slow<br /><br />__rebuild__: slow       | no         | original lines | source code not included                                                              |
| `inline-nosources-source-map`              | __build__: slowest<br /><br />__rebuild__: slowest | no         | original       | source code not included                                                              |
| `nosources-cheap-source-map`               | __build__: ok<br /><br />__rebuild__: slow         | no         | transformed    | source code not included                                                              |
| `nosources-cheap-module-source-map`        | __build__: slow<br /><br />__rebuild__: slow       | no         | original lines | source code not included                                                              |
| `nosources-source-map`                     | __build__: slowest<br /><br />__rebuild__: slowest | yes        | original       | source code not included                                                              |
| `hidden-nosources-cheap-source-map`        | __build__: ok<br /><br />__rebuild__: slow         | no         | transformed    | no reference, source code not included                                                |
| `hidden-nosources-cheap-module-source-map` | __build__: slow<br /><br />__rebuild__: slow       | no         | original lines | no reference, source code not included                                                |
| `hidden-nosources-source-map`              | __build__: slowest<br /><br />__rebuild__: slowest | yes        | original       | no reference, source code not included                                                |
| `hidden-cheap-source-map`                  | __build__: ok<br /><br />__rebuild__: slow         | no         | transformed    | no reference                                                                          |
| `hidden-cheap-module-source-map`           | __build__: slow<br /><br />__rebuild__: slow       | no         | original lines | no reference                                                                          |
| `hidden-source-map`                        | __build__: slowest<br /><br />__rebuild__: slowest | yes        | original       | no reference. Possible choice when using SourceMap only for error reporting purposes. |

shortcut                  | explanation
------------------------- | -----------
performance: build        | How is the performance of the initial build affected by the devtool setting?
performance: rebuild      | How is the performance of the incremental build affected by the devtool setting? Slow devtools might reduce development feedback loop in watch mode. The scale is different compared to the build performance, as one would expect rebuilds to be faster than builds.
production                | Does it make sense to use this devtool for production builds? It's usually `no` when the devtool has a negative effect on user experience.
quality: bundled          | You will see all generated code of a chunk in a single blob of code. This is the raw output file without any devtooling support
quality: generated        | You will see the generated code, but each module is shown as separate code file in browser devtools.
quality: transformed      | You will see generated code after the preprocessing by loaders but before additional webpack transformations. Only source lines will be mapped and column information will be discarded resp. not generated. This prevents setting breakpoints in the middle of lines and doesn't work together with minimizer.
quality: original lines   | You will see the original code that you wrote, assuming all loaders support SourceMapping. Only source lines will be mapped and column information will be discarded resp. not generated. This prevents setting breakpoints in the middle of lines and doesn't work together with minimizer.
quality: original         | You will see the original code that you wrote, assuming all loaders support SourceMapping.
`eval-*` addition         | generate SourceMap per module and attach it via eval. Recommended for development, because of improved rebuild performance. Note that there is a windows defender issue, which causes huge slowdown due to virus scanning.
`inline-*` addition       | inline the SourceMap to the original file instead of creating a separate file.
`hidden-*` addition       | no reference to the SourceMap added. When SourceMap is not deployed, but should still be generated, e. g. for error reporting purposes.
`nosources-*` addition    | source code is not included in SourceMap. This can be useful when the original files should be referenced (further config options needed).

T> We expect a certain pattern when validate devtool name, pay attention and dont mix up the sequence of devtool string. The pattern is: `[inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map`.

Some of these values are suited for development and some for production. For development you typically want fast Source Maps at the cost of bundle size, but for production you want separate Source Maps that are accurate and support minimizing.

W> There are some issues with Source Maps in Chrome. [We need your help!](https://github.com/webpack/webpack/issues/3165).

T> See [`output.sourceMapFilename`](/configuration/output/#outputsourcemapfilename) to customize the filenames of generated Source Maps.

### Qualities

`bundled code` - You see all generated code as a big blob of code. You don't see modules separated from each other.

`generated code` - You see each module separated from each other, annotated with module names. You see the code generated by webpack. Example: Instead of `import {test} from "module"; test();` you see something like `var module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42); module__WEBPACK_IMPORTED_MODULE_1__.a();`.

`transformed code` - You see each module separated from each other, annotated with module names. You see the code before webpack transforms it, but after Loaders transpile it. Example: Instead of `import {test} from "module"; class A extends test {}` you see something like `import {test} from "module"; var A = function(_test) { ... }(test);`

`original source` - You see each module separated from each other, annotated with module names. You see the code before transpilation, as you authored it. This depends on Loader support.

`without source content` - Contents for the sources are not included in the Source Maps. Browsers usually try to load the source from the webserver or filesystem. You have to make sure to set [`output.devtoolModuleFilenameTemplate`](/configuration/output/#outputdevtoolmodulefilenametemplate) correctly to match source urls.

`(lines only)` - Source Maps are simplified to a single mapping per line. This usually means a single mapping per statement (assuming you author it this way). This prevents you from debugging execution on statement level and from settings breakpoints on columns of a line. Combining with minimizing is not possible as minimizers usually only emit a single line.

### Development

The following options are ideal for development:

`eval` - Each module is executed with `eval()` and `//@ sourceURL`. This is pretty fast. The main disadvantage is that it doesn't display line numbers correctly since it gets mapped to transpiled code instead of the original code (No Source Maps from Loaders).

`eval-source-map` - Each module is executed with `eval()` and a SourceMap is added as a DataUrl to the `eval()`. Initially it is slow, but it provides fast rebuild speed and yields real files. Line numbers are correctly mapped since it gets mapped to the original code. It yields the best quality SourceMaps for development.

`eval-cheap-source-map` - Similar to `eval-source-map`, each module is executed with `eval()`. It is "cheap" because it doesn't have column mappings, it only maps line numbers. It ignores SourceMaps from Loaders and only display transpiled code similar to the `eval` devtool.

`eval-cheap-module-source-map` - Similar to `eval-cheap-source-map`, however, in this case Source Maps from Loaders are processed for better results. However Loader Source Maps are simplified to a single mapping per line.

### Special cases

The following options are not ideal for development nor production. They are needed for some special cases, i. e. for some 3rd party tools.

`inline-source-map` - A SourceMap is added as a DataUrl to the bundle.

`cheap-source-map` - A SourceMap without column-mappings ignoring loader Source Maps.

`inline-cheap-source-map` - Similar to `cheap-source-map` but SourceMap is added as a DataUrl to the bundle.

`cheap-module-source-map` - A SourceMap without column-mappings that simplifies loader Source Maps to a single mapping per line.

`inline-cheap-module-source-map` - Similar to `cheap-module-source-map` but SourceMap is added as a DataUrl to the bundle.

### Production

These options are typically used in production:

`(none)` (Omit the `devtool` option) - No SourceMap is emitted. This is a good option to start with.

`source-map` - A full SourceMap is emitted as a separate file. It adds a reference comment to the bundle so development tools know where to find it.

W> You should configure your server to disallow access to the Source Map file for normal users!

`hidden-source-map` - Same as `source-map`, but doesn't add a reference comment to the bundle. Useful if you only want SourceMaps to map error stack traces from error reports, but don't want to expose your SourceMap for the browser development tools.

W> You should not deploy the Source Map file to the webserver. Instead only use it for error report tooling.

`nosources-source-map` - A SourceMap is created without the `sourcesContent` in it. It can be used to map stack traces on the client without exposing all of the source code. You can deploy the Source Map file to the webserver.

W> It still exposes filenames and structure for decompiling, but it doesn't expose the original code.

T> If the default webpack `minimizer` has been overridden (such as to customise the `terser-webpack-plugin` options), make sure to configure its replacement with `sourceMap: true` to enable SourceMap support.
