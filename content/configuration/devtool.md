---
title: Devtool
sort: 10
contributors:
  - sokra
  - skipjack
  - SpaceK33z
  - dear-lizhihua
---

This option controls if and how Source Maps are generated.

## `devtool`

`string` `false`

选择一种 [源映射(source mapping)](http://blog.teamtreehouse.com/introduction-source-maps) 来增强调试过程。注意，以下选项能够可能会显著地影响构建(build)和重构建(rebuild)的速度……

 devtool                      | build | rebuild | production | quality
------------------------------|-------|---------|------------|--------------------------
 eval                         | +++   | +++     | no         | 生成代码
 cheap-eval-source-map        | +     | ++      | no         | 转换后代码（仅限行）
 cheap-source-map             | +     | o       | yes        | 转换后代码（仅限行）
 cheap-module-eval-source-map | o     | ++      | no         | 原始源码（仅限行）
 cheap-module-source-map      | o     | -       | yes        | 原始源码（仅限行）
 eval-source-map              | --    | +       | no         | 原始源码
 source-map                   | --    | --      | yes        | 原始源码
  nosources-source-map         | --    | --      | yes        | 无源码内容

Some of these values are suited for development and some for production. For development you typically want very fast Source Maps at the cost of bundle size, but for production you want separate Source Maps that are accurate.

W> There are some issues with Source Maps in Chrome. [We need your help!](https://github.com/webpack/webpack/issues/3165).

### For development

`eval` - Each module is executed with `eval()` and `//@ sourceURL`. This is very fast. The main disadvantage is that it doesn't display line numbers correctly since it gets mapped to transpiled code instead of the original code.

`inline-source-map` - A SourceMap is added as DataUrl to the bundle.

`eval-source-map` - Each module is executed with `eval()` and a SourceMap is added as DataUrl to the `eval()`. Initially it is slow, but it provides fast rebuild speed and yields real files. Line numbers are correctly mapped since it gets mapped to the original code.

`cheap-module-eval-source-map` - Like `eval-source-map`, each module is executed with `eval()` and a SourceMap is added as DataUrl to the `eval()`. It is "cheap" because it doesn't have column mappings, it only maps line numbers.

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
- [webpack devtool source map](http://cheng.logdown.com/posts/2016/03/25/679045
)

***

> 原文：https://webpack.js.org/configuration/devtool/