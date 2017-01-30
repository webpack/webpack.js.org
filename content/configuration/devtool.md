---
title: 开发工具(Devtool)
sort: 10
contributors:
  - sokra
  - skipjack
  - SpaceK33z
---

此选项控制是否生成，以及如何生成 Source Map。

## `devtool`

`string` `false`

选择一种 [source map](http://blog.teamtreehouse.com/introduction-source-maps) 来增强调试过程。注意，以下选项能够可能会很明显地影响构建(build)和重构建(rebuild)的速度。

 devtool                      | 构建 | 重构建 | 生产环境 | 特性
------------------------------|-------|---------|------------|--------------------------
 eval                         | +++   | +++     | no         | 生成后的代码
 cheap-eval-source-map        | +     | ++      | no         | 转换过的代码（仅限行）
 cheap-source-map             | +     | o       | yes        | 转换过的代码（仅限行）
 cheap-module-eval-source-map | o     | ++      | no         | 原始源码（仅限行）
 cheap-module-source-map      | o     | -       | yes        | 原始源码（仅限行）
 eval-source-map              | --    | +       | no         | 原始源码
 source-map                   | --    | --      | yes        | 原始源码
 nosources-source-map         | --    | --      | yes        | 无源码内容

其中一些值适用于开发环境，一些适用于生产环境。对于开发环境，通常希望更快速的 Source Map，需要添加到 bundle 中以增加体积为代价，但是对于生产环境，则希望更精准的 Source Map，需要从 bundle 中分离并独立存在。

W> Chrome 中的 Source Map 有一些问题。[我们需要你的帮助！](https://github.com/webpack/webpack/issues/3165)。

### 对于开发环境

`eval` - 每个模块都使用 `eval()` 执行，并且都有 `//@ sourceURL`。此选项会相当快地构建。主要缺点是，由于会映射到转换后的代码，而不是映射到原始代码，所以不能正确的显示显示行数。

`inline-source-map` - SourceMap 转换为 DataUrl 后添加到 bundle 中。

`eval-source-map` - 每个模块使用 `eval()` 执行，并且 SourceMap 转换为 DataUrl 后添加到 `eval()` 中。初始化 SourceMap 时比较慢，但是会在重构建时提供很快的速度，并且生成实际的文件。行数能够正确映射，因为会映射到原始代码中。

`cheap-module-eval-source-map` - 就像 `eval-source-map`，每个模块使用 `eval()` 执行，并且 SourceMap 转换为 DataUrl 后添加到 `eval()` 中。"低开销"是因为它没有生成列映射(column map)，只是映射行数。

### 对于生产环境

`source-map` - 生成完整的 SourceMap，输出为独立文件。由于在 bundle 中添加了引用注释，所以开发工具知道在哪里去找到 SourceMap。

`hidden-source-map` - 和 `source-map` 相同，但是没有在 bundle 中添加引用注释。如果你只想要 SourceMap 映射错误报告中的错误堆栈跟踪信息，但不希望将 SourceMap 暴露给浏览器开发工具。

`cheap-source-map` - 不带列映射(column-map)的 SourceMap，忽略加载的 Source Map。

`cheap-module-source-map` - 不带列映射(column-map)的 SourceMap，将加载的 Source Map 简化为每行单独映射。

`nosources-source-map` - 创建一个没有 `sourcesContent` 的 SourceMap。它可以用来映射客户端（译者注：指浏览器）上的堆栈跟踪，而不会暴露所有的源码。

T> 查看 [`output.sourceMapFilename`](/configuration/output#output-sourcemapfilename) 自定义生成的 Source Map 的文件名。

?> This page needs more information to make it easier for users to choose a good option.

# 参考

- [Enabling Sourcemaps（启用 Sourcemap）](http://survivejs.com/webpack/developing-with-webpack/enabling-sourcemaps/)
- [webpack devtool source map（webpack 开发工具中 source map 的一些验证和结论）](http://cheng.logdown.com/posts/2016/03/25/679045)

***

> 原文：https://webpack.js.org/configuration/devtool/