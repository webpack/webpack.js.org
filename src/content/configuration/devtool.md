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
related:
  - title: 启用 Source Maps
    url: https://survivejs.com/webpack/developing-with-webpack/enabling-sourcemaps/
  - title: webpack 的 Devtool Source Map
    url: http://cheng.logdown.com/posts/2016/03/25/679045
---

此选项控制是否生成，以及如何生成 source map。

使用 [`SourceMapDevToolPlugin`](/plugins/source-map-dev-tool-plugin) 进行更细粒度的配置。查看 [`source-map-loader`](/loaders/source-map-loader) 来处理已有的 source map。


## `devtool`

`string` `false`

选择一种 [source map](http://blog.teamtreehouse.com/introduction-source-maps) 格式来增强调试过程。不同的值会明显影响到构建(build)和重新构建(rebuild)的速度。

T> webpack 仓库中包含一个 [显示所有 `devtool` 变体效果的示例](https://github.com/webpack/webpack/tree/master/examples/source-map)。这些例子或许会有助于你理解这些差异之处。

T> 你可以直接使用 `SourceMapDevToolPlugin`/`EvalSourceMapDevToolPlugin` 来替代使用 `devtool` 选项，因为它有更多的选项。切勿同时使用 `devtool` 选项和 `SourceMapDevToolPlugin`/`EvalSourceMapDevToolPlugin` 插件。`devtool` 选项在内部添加过这些插件，所以你最终将应用两次插件。

devtool                                  | 构建速度 | 重新构建速度 | 生产环境 | 品质(quality)
---------------------------------------- | ------- | ------- | ---------- | -----------------------------
(none)                                   | 非常快速 | 非常快速  | yes        | 打包后的代码
eval                                     | 非常快速 | 非常快速  | no         | 生成后的代码
eval-cheap-source-map                    | 比较快   | 快速     | no         | 转换过的代码（仅限行）
eval-cheap-module-source-map             | 中等     | 快速     | no         | 原始源代码（仅限行）
eval-source-map                          | 慢      | 比较快   | no         | 原始源代码
eval-nosources-source-map                |         |         |            |
eval-nosources-cheap-source-map          |         |         |            |
eval-nosources-cheap-module-source-map   |         |         |            |
cheap-source-map                         | 比较快   | 中等     | yes        | 转换过的代码（仅限行）
cheap-module-source-map                  | 中等     | 比较慢   | yes        | 原始源代码（仅限行）
inline-cheap-source-map                  | 比较快   | 中等     | no         | 转换过的代码（仅限行）
inline-cheap-module-source-map           | 中等     | 比较慢   | no         | 原始源代码（仅限行）
inline-source-map                        | 慢      | 慢       | no         | 原始源代码
inline-nosources-source-map              |         |         |            |
inline-nosources-cheap-source-map        |         |         |            |
inline-nosources-cheap-module-source-map |         |         |            |
source-map                               | 慢      | 慢       | yes        | 原始源代码
hidden-source-map                        | 慢      | 慢       | yes        | 原始源代码
hidden-nosources-source-map              |         |         |            |
hidden-nosources-cheap-source-map        |         |         |            |
hidden-nosources-cheap-module-source-map |         |         |            |
hidden-cheap-source-map                  |         |         |            |
hidden-cheap-module-source-map           |         |         |            |
nosources-source-map                     | 慢      | 慢       | yes        | 无源代码内容
nosources-cheap-source-map               |         |         |            |
nosources-cheap-module-source-map        |         |         |            |

T> 验证 devtool 名称时， 我们期望使用某种模式， 注意不要混淆 devtool 字符串的顺序， 模式是： `[inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map`.

其中一些值适用于开发环境，一些适用于生产环境。对于开发环境，通常希望更快速的 source map，需要添加到 bundle 中以增加体积为代价，但是对于生产环境，则希望更精准的 source map，需要从 bundle 中分离并独立存在。

W> Chrome 中的 source map 有一些问题。[我们需要你的帮助！](https://github.com/webpack/webpack/issues/3165)。

T> 查看 [`output.sourceMapFilename`](/configuration/output#output-sourcemapfilename) 自定义生成的 source map 的文件名。


### 品质说明(quality)

`打包后的代码` - 将所有生成的代码视为一大块代码。你看不到相互分离的模块。

`生成后的代码` - 每个模块相互分离，并用模块名称进行注释。可以看到 webpack 生成的代码。示例：你会看到类似 `var module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42); module__WEBPACK_IMPORTED_MODULE_1__.a();`，而不是 `import {test} from "module"; test();`。

`转换过的代码` - 每个模块相互分离，并用模块名称进行注释。可以看到 webpack 转换前、loader 转译后的代码。示例：你会看到类似 `import {test} from "module"; var A = function(_test) { ... }(test);`，而不是 `import {test} from "module"; class A extends test {}`。

`原始源代码` - 每个模块相互分离，并用模块名称进行注释。你会看到转译之前的代码，正如编写它时。这取决于 loader 支持。

`无源代码内容` - source map 中不包含源代码内容。浏览器通常会尝试从 web 服务器或文件系统加载源代码。你必须确保正确设置 [`output.devtoolModuleFilenameTemplate`](/configuration/output/#output-devtoolmodulefilenametemplate)，以匹配源代码的 url。

`（仅限行）` - source map 被简化为每行一个映射。这通常意味着每个语句只有一个映射（假设你使用这种方式）。这会妨碍你在语句级别上调试执行，也会妨碍你在每行的一些列上设置断点。与压缩后的代码组合后，映射关系是不可能实现的，因为压缩工具通常只会输出一行。


### 对于开发环境

以下选项非常适合开发环境：

`eval` - 每个模块都使用 `eval()` 执行，并且都有 `//@ sourceURL`。此选项会非常快地构建。主要缺点是，由于会映射到转换后的代码，而不是映射到原始代码（没有从 loader 中获取 source map），所以不能正确的显示行数。

`eval-source-map` - 每个模块使用 `eval()` 执行，并且 source map 转换为 DataUrl 后添加到 `eval()` 中。初始化 source map 时比较慢，但是会在重新构建时提供比较快的速度，并且生成实际的文件。行数能够正确映射，因为会映射到原始代码中。它会生成用于开发环境的最佳品质的 source map。

`eval-cheap-source-map` - 类似 `eval-source-map`，每个模块使用 `eval()` 执行。这是 "cheap(低开销)" 的 source map，因为它没有生成列映射(column mapping)，只是映射行数。它会忽略源自 loader 的 source map，并且仅显示转译后的代码，就像 `eval` devtool。

`eval-cheap-module-source-map` - 类似 `eval-cheap-source-map`，并且，在这种情况下，源自 loader 的 source map 会得到更好的处理结果。然而，loader source map 会被简化为每行一个映射(mapping)。

### 特定场景

以下选项对于开发环境和生产环境并不理想。他们是一些特定场景下需要的，例如，针对一些第三方工具。

`inline-source-map` - source map 转换为 DataUrl 后添加到 bundle 中。

`cheap-source-map` - 没有列映射(column mapping)的 source map，忽略 loader source map。

`inline-cheap-source-map` - 类似 `cheap-source-map`，但是 source map 转换为 DataUrl 后添加到 bundle 中。

`cheap-module-source-map` - 没有列映射(column mapping)的 source map，将 loader source map 简化为每行一个映射(mapping)。

`inline-cheap-module-source-map` - 类似 `cheap-module-source-map`，但是 source mapp 转换为 DataUrl 添加到 bundle 中。


### 对于生产环境

这些选项通常用于生产环境中：

`(none)`（省略 `devtool` 选项） - 不生成 source map。这是一个不错的选择。

`source-map` - 整个 source map 作为一个单独的文件生成。它为 bundle 添加了一个引用注释，以便开发工具知道在哪里可以找到它。

W> 你应该将你的服务器配置为，不允许普通用户访问 source map 文件！

`hidden-source-map` - 与 `source-map` 相同，但不会为 bundle 添加引用注释。如果你只想 source map 映射那些源自错误报告的错误堆栈跟踪信息，但不想为浏览器开发工具暴露你的 source map，这个选项会很有用。

W> 你不应将 source map 文件部署到 web 服务器。而是只将其用于错误报告工具。

`nosources-source-map` - 创建的 source map 不包含 `sourcesContent(源代码内容)`。它可以用来映射客户端上的堆栈跟踪，而无须暴露所有的源代码。你可以将 source map 文件部署到 web 服务器。

W> 这仍然会暴露反编译后的文件名和结构，但它不会暴露原始代码。

T> 如果默认的 webpack `minimizer` 被覆盖 (例如自定义 `terser-webpack-plugin` 选项)， 请确保将其替换配置为  `sourceMap: true` 以启用 SourceMap 支持。
