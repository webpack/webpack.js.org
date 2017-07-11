---
title: 开发辅助调试工具(Devtool)
sort: 10
contributors:
  - sokra
  - skipjack
  - SpaceK33z
  - lricoy
related:
  - title: 启用 Sourcemaps
    url: http://survivejs.com/webpack/developing-with-webpack/enabling-sourcemaps/
  - title: Webpack's Devtool Source Map
    url: http://cheng.logdown.com/posts/2016/03/25/679045
---

此选项控制是否生成，以及如何生成 source map。

使用 [`SourceMapDevToolPlugin`](/plugins/source-map-dev-tool-plugin) 进行更细节的配置。请查看 [`source-map-loader`](/loaders/source-map-loader) 来处理现有的 source map。


## `devtool`

`string` `false`

选择一种 [source map](http://blog.teamtreehouse.com/introduction-source-maps) 来增强调试过程。注意，以下选项能够可能会很明显地影响构建(build)和重构建(rebuild)的速度。

T> webpack 仓库包含一个[展示所有不同 `devtool` 的效果的示例](https://github.com/webpack/webpack/tree/master/examples/source-map)。这些例子可能会有助于您了解差异。

devtool                      | 构建 | 重构建 | 生产环境 | 特性
-----------------------------|-------|---------|------------|--------------------------
eval                         | +++   | +++     | no         | 生成后的代码
cheap-eval-source-map        | +     | ++      | no         | 转换过的代码（仅限行）
cheap-source-map             | +     | o       | yes        | 转换过的代码（仅限行）
cheap-module-eval-source-map | o     | ++      | no         | 原始源码（仅限行）
cheap-module-source-map      | o     | -       | yes        | 原始源码（仅限行）
eval-source-map              | --    | +       | no         | 原始源码
source-map                   | --    | --      | yes        | 原始源码
inline-source-map             | --    | --      | no         | 原始源码
hidden-source-map             | --    | --      | yes        | 原始源码
nosources-source-map          | --    | --      | yes        | 无源码内容

T> `+` 表示较快，`-` 表示较慢，`o` 表示时间相同

其中一些值适用于开发环境，一些适用于生产环境。对于开发环境，通常希望更快速的 Source Map，需要添加到 bundle 中以增加体积为代价，但是对于生产环境，则希望更精准的 Source Map，需要从 bundle 中分离并独立存在。

W> Chrome 中的 Source Map 有一些问题。[我们需要你的帮助！](https://github.com/webpack/webpack/issues/3165)。

T> 请查看 [`output.sourceMapFilename`](/configuration/output#output-sourcemapfilename) 来自定义生成的 Source Maps 的文件名。


### 对于开发环境

以下选项是开发的理想选择：

`eval` - 每个模块都使用 `eval()` 执行，并且都有 `//@ sourceURL`。此选项会相当快地构建。主要缺点是，由于会映射到转换后的代码，而不是映射到原始代码，所以不能正确的显示显示行数。

`inline-source-map` - SourceMap 转换为 DataUrl 后添加到 bundle 中。

`eval-source-map` - 每个模块使用 `eval()` 执行，并且 SourceMap 转换为 DataUrl 后添加到 `eval()` 中。初始化 SourceMap 时比较慢，但是会在重构建时提供很快的速度，并且生成实际的文件。行数能够正确映射，因为会映射到原始代码中。

和 `eval-source-map` 类似，每个模块都使用 `eval()` 执行。然而，使用此选项，Source Map 将传递给 `eval()` 作为 Data URL 调用。它是“低性能开销”的，因为它没有映射到列，只映射到行数。

`cheap-module-eval-source-map` - 和 `cheap-eval-source-map` 类似，然而，在这种情况下，loader 能够处理映射以获得更好的结果。


### 生产环境

这些选项通常用于生产环境中：

`source-map` - 生成完整的 SourceMap，输出为独立文件。由于在 bundle 中添加了引用注释，所以开发工具知道在哪里去找到 SourceMap。

`hidden-source-map` - 和 `source-map` 相同，但是没有在 bundle 中添加引用注释。如果你只想要 SourceMap 映射错误报告中的错误堆栈跟踪信息，但不希望将 SourceMap 暴露给浏览器开发工具。

`cheap-source-map` - 不带列映射(column-map)的 SourceMap，忽略加载的 Source Map。

`cheap-module-source-map` - 不带列映射(column-map)的 SourceMap，将加载的 Source Map 简化为每行单独映射。

`nosources-source-map` - 创建一个没有 `sourcesContent` 的 SourceMap。它可以用来映射客户端（译者注：指浏览器）上的堆栈跟踪，而不会暴露所有的源码。

***

> 原文：https://webpack.js.org/configuration/devtool/
