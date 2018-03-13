---
title: Devtool
sort: 10
contributors:
  - sokra
  - skipjack
  - SpaceK33z
  - lricoy
related:
  - title: 启用 source map
    url: http://survivejs.com/webpack/developing-with-webpack/enabling-sourcemaps/
  - title: 在 webpack 的 devtool 中配置 source map
    url: http://cheng.logdown.com/posts/2016/03/25/679045
---

此选项控制是否生成，以及如何生成 source map。

使用 [`SourceMapDevToolPlugin`](/plugins/source-map-dev-tool-plugin) 进行更细粒度的配置。查看 [`source-map-loader`](/loaders/source-map-loader) 来处理已有的 source map。


## `devtool`

`string` `false`

选择一种 [source map](http://blog.teamtreehouse.com/introduction-source-maps) 格式来增强调试过程。不同的值会明显影响到构建(build)和重构建(rebuild)的速度。

T> webpack 仓库中包含一个 [显示所有 `devtool` 变体效果的示例](https://github.com/webpack/webpack/tree/master/examples/source-map)。这些例子或许会有助于你理解这些差异之处。

T> 你可以直接使用 `SourceMapDevToolPlugin`/`EvalSourceMapDevToolPlugin` 来替代使用 `devtool` 选项，因为它有更多的选项。切勿同时使用 `devtool` 选项和 `SourceMapDevToolPlugin`/`EvalSourceMapDevToolPlugin` 插件。`devtool` 选项在内部添加过这些插件，所以你最终将应用两次插件。

devtool                        | 构建速度 | 重新构建速度 | 生产环境 | 品质等级(quality)
------------------------------ | ----- | ------- | ---------- | -----------------------------
(none)                         | +++   | +++     | yes        | 打包后的代码
eval                           | +++   | +++     | no         | 生成后的代码
cheap-eval-source-map          | +     | ++      | no         | 转换过的代码（仅限行）
cheap-module-eval-source-map   | o     | ++      | no         | 原始源代码（仅限行）
eval-source-map                | --    | +       | no         | 原始源代码
cheap-source-map               | +     | o       | no         | 转换过的代码（仅限行）
cheap-module-source-map        | o     | -       | no         | 原始源代码（仅限行）
inline-cheap-source-map        | +     | o       | no         | 转换过的代码（仅限行）
inline-cheap-module-source-map | o     | -       | no         | 原始源代码（仅限行）
source-map                     | --    | --      | yes        | 原始源代码
inline-source-map              | --    | --      | no         | 原始源代码
hidden-source-map              | --    | --      | yes        | 原始源代码
nosources-source-map           | --    | --      | yes        | 无源代码内容

T> `+++` 非常快速, `++` 快速, `+` 比较快, `o` 中等, `-` 比较慢, `--` 慢

其中一些值适用于开发环境，一些适用于生产环境。对于开发环境，通常希望更快速的 source map，需要添加到 bundle 中以增加体积为代价，但是对于生产环境，则希望更精准的 source map，需要从 bundle 中分离并独立存在。

W> Chrome 中的 source map 有一些问题。[我们需要你的帮助！](https://github.com/webpack/webpack/issues/3165)。

T> 查看 [`output.sourceMapFilename`](/configuration/output#output-sourcemapfilename) 自定义生成的 source map 的文件名。


### 品质等级说明(quality)

`打包后的代码` - 将所有生成的代码视为一大块代码。你看不到相互分离的模块。

`生成后的代码` - 每个模块相互分离，并用模块名称进行注释。可以看到 webpack 生成的代码。示例：你会看到类似 `var module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42); module__WEBPACK_IMPORTED_MODULE_1__.a();`，而不是 `import {test} from "module"; test();`。

`转换过的代码` - 每个模块相互分离，并用模块名称进行注释。可以看到 webpack 转换前、loader 转译后的代码。示例：你会看到类似 `import {test} from "module"; var A = function(_test) { ... }(test);`，而不是 `import {test} from "module"; class A extends test {}`。

`原始源代码` - 每个模块相互分离，并用模块名称进行注释。你会看到转译之前的代码，正如编写它时。这取决于 loader 支持。

`无源代码内容` - source map 中不包含源代码内容。浏览器通常会尝试从网络服务器或文件系统加载源代码。你必须确保正确设置 [`output.devtoolModuleFilenameTemplate`](/configuration/output/#output-devtoolmodulefilenametemplate)，以匹配源代码的 url。

`（仅限行）` - source map 被简化为每行一个映射。这通常意味着每个语句只有一个映射（假设你使用这种方式）。这会妨碍你在语句级别上调试执行，也会妨碍你在每行的一些列上设置断点。与压缩后的代码组合后，映射关系是不可能实现的，因为压缩工具通常只会输出一行。


### 对于开发环境

以下选项非常适合开发环境：

`eval` - Each module is executed with `eval()` and `//@ sourceURL`. This is pretty fast. The main disadvantage is that it doesn't display line numbers correctly since it gets mapped to transpiled code instead of the original code (No Source Maps from Loaders).

`eval-source-map` - Each module is executed with `eval()` and a SourceMap is added as a DataUrl to the `eval()`. Initially it is slow, but it provides fast rebuild speed and yields real files. Line numbers are correctly mapped since it gets mapped to the original code. It yields the best quality SourceMaps for development.

`cheap-eval-source-map` - Similar to `eval-source-map`, each module is executed with `eval()`. It is "cheap" because it doesn't have column mappings, it only maps line numbers. It ignores SourceMaps from Loaders and only display transpiled code similar to the `eval` devtool.

`cheap-module-eval-source-map` - Similar to `cheap-eval-source-map`, however, in this case Source Maps from Loaders are processed for better results. However Loader Source Maps are simplified to a single mapping per line.

### Special cases

The following options are not ideal for development nor production. They are needed for some special cases, i. e. for some 3rd party tools.

`inline-source-map` - A SourceMap is added as a DataUrl to the bundle.

`cheap-source-map` - A SourceMap without column-mappings ignoring loader Source Maps.

`inline-cheap-source-map` - Similar to `cheap-source-map` but SourceMap is added as a DataUrl to the bundle.

`cheap-module-source-map` - A SourceMap without column-mappings that simplifies loader Source Maps to a single mapping per line.

`inline-cheap-module-source-map` - Similar to `cheap-module-source-map` but SourceMap is added as a DataUrl to the bundle.


### 对于生产环境

这些选项通常用于生产环境中：

`(none)` (Omit the `devtool` option) - No SourceMap is emitted. This is a good option to start with.

`source-map` - A full SourceMap is emitted as a separate file. It adds a reference comment to the bundle so development tools know where to find it.

W> You should configure your server to disallow access to the Source Map file for normal users!

`hidden-source-map` - Same as `source-map`, but doesn't add a reference comment to the bundle. Useful if you only want SourceMaps to map error stack traces from error reports, but don't want to expose your SourceMap for the browser development tools.

W> You should not deploy the Source Map file to the webserver. Instead only use it for error report tooling.

`nosources-source-map` - A SourceMap is created without the `sourcesContent` in it. It can be used to map stack traces on the client without exposing all of the source code. You can deploy the Source Map file to the webserver.

W> It still exposes filenames and structure for decompiling, but it doesn't expose the original code.

T> When using the `uglifyjs-webpack-plugin` you must provide the `sourceMap: true` option to enable SourceMap support.

***

> 原文：https://webpack.js.org/configuration/devtool/
