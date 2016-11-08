---
title: Devtool
contributors:
  - sokra
  - skipjack
  - dear-lizhihua
---

?> Description...

## `devtool`

`string`

选择一种 [源映射(source mapping)](http://blog.teamtreehouse.com/introduction-source-maps) 来增强调试过程。注意，以下选项能够可能会显著地影响构建(build)和重构建(rebuild)的速度……

`eval` - 使用 `eval` 和 `//@ sourceURL` 执行每个模块

`source-map` - 生成完整的 SourceMap

`hidden-source-map` - 和 `source-map` 一样，但不会向 bundle 添加引用注释

`inline-source-map` - SourceMap 作为 DataUrl 添加到 bundle 中

`eval-source-map` - 使用 `eval` 执行每个模块，并且 SourceMap 作为 DataUrl 添加到 `eval`

`cheap-source-map` - 没有 column-mapping 的 SourceMap，忽略加载 source map

`cheap-module-source-map` - 没有 column-mapping 的 SourceMap，将加载 source map 简化为每行单独映射

 devtool                      | build | rebuild | production | quality
------------------------------|-------|---------|------------|--------------------------
 eval                         | +++   | +++     | no         | 生成代码
 cheap-eval-source-map        | +     | ++      | no         | 转换过的代码（仅限行）
 cheap-source-map             | +     | o       | yes        | 转换过的代码（仅限行）
 cheap-module-eval-source-map | o     | ++      | no         | 原始源（仅限行）
 cheap-module-source-map      | o     | -       | yes        | 原始源（仅限行）
 eval-source-map              | --    | +       | no         | 原始源
 source-map                   | --    | --      | yes        | 原始源


T> 参考 [`output.sourceMapFilename`](/configuration/output#output-sourcemapfilename) 来自定义生成 source map 的文件名。

?> This section is pretty much just copied over from existing docs... imo more background is needed on the different types of source mapping, maybe via links to external sites that discuss the different types of source maps in more detail.

***

> 原文：https://webpack.js.org/configuration/devtool/