---
title: 为什么选择 webpack？
contributors:
  - pksjce
  - bebraw
  - chrisVillanueva
sort: 2
---

webpack 通常会被拿来和其他工具（例如 Make, Grunt, Gulp, Browserify 或者 Brunch）对比。然而，这其中一些工具（Make, Grunt 和 Gulp 是任务执行器(task runner)）与 webpack 相比，它们在用途上有很多不同，webpack 是一个模块打包器(module bundler)。直接对比它们可能会带来各种困惑，所以让我们先列出这些不同类型工具之间的差异。

## 什么是任务执行器？

简单从字面理解，任务执行器就是用来处理任务，例如项目的检查、构建、发布。对比*打包器*（如 Browserify, Brunch 或者 webpack），任务执行器关注在偏重于上层的问题上面。换句话说，打包器有着更多细节上的目标。


## 什么是打包器？

大概说，打包器接收资源（例如 JavaScript 文件），然后转换为适合客户端浏览器可用的资源。这个打包过程恰好是 web 开发中最重要的问题，并且解决此问题可以消除开发过程中的大部分痛点。

打包器能够和任务执行器串联在一起工作。你可以将高层次的问题交给任务执行器工具，而留下打包部分给更专业的打包器工具。[grunt-webpack](https://www.npmjs.com/package/grunt-webpack) 和 [gulp-webpack](https://www.npmjs.com/package/gulp-webpack) 都是非常好的集成示例。

T> 通常 webpack 用户使用 npm `scripts` 作为它们的任务执行器启动入口，这是比较推荐的做法。跨平台支持可能会成为一个问题，但是这里有几个可行措施。

T> 尽管 webpack 核心关注于打包，你可以找到各种扩展(extension)，还是可以让你用任务管理器的方式去使用 webpack。

## 对比

然而 webpack 不仅仅作为模块打包器存在。如果你要在使用 webpack 或下面任意的打包器之间进行选择，这里列出了 webpack 特性，以及和其他竞品之间的功能对比。

| 特性 | webpack/webpack | jrburke/requirejs | substack/node-browserify | jspm/jspm-cli | rollup/rollup | brunch/brunch |
|---------|-----------------|-------------------|--------------------------|---------------|---------------|---------------|
| 附加模块按需加载 | **yes** | **yes** | no | [System.import](https://github.com/systemjs/systemjs/blob/master/docs/system-api.md#systemimportmodulename--normalizedparentname---promisemodule) | no | no |
| AMD `define` | **yes** | **yes** | [deamdify](https://github.com/jaredhanson/deamdify) | yes | [rollup-plugin-amd](https://github.com/brunch/uglify-js-brunch) | yes |
| AMD `require` | **yes** | **yes** | no | yes | no | yes |
| AMD `require` 按需加载 | **yes** | 手动配置 | no | yes | no | no |
| CommonJS `exports` | **yes** | 只包含在 `define` 中 | **yes** | yes | [commonjs-plugin](https://github.com/rollup/rollup-plugin-commonjs) | yes |
| CommonJS `require` | **yes** | 只包含在 `define` 中 | **yes** | yes | [commonjs-plugin](https://github.com/rollup/rollup-plugin-commonjs) | yes |
| CommonJS `require.resolve` | **yes** | no | no | no | no | |
| require 中拼接 `require("./fi" + "le")` | **yes** | no♦ | no | no | no | |
| 调试支持 | **SourceUrl, SourceMaps** | 不需要 | SourceMaps | **SourceUrl, SourceMaps** | **SourceUrl, SourceMaps** | SourceMaps |
| 依赖 | 19MB / 127 个程序包 | 11MB / 118 个程序包 | **1.2MB / 1 个程序包** | 26MB / 131 个程序包 | ?MB / 3 个程序包 | |
| ES2015 `import`/`export` | **yes** (webpack 2) | no | no | **yes** | **yes** | yes, 通过 [es6 模块转换器](https://github.com/gcollazo/es6-module-transpiler-brunch)
| require (guided) 中的表达式 `require("./templates/" + template)` | **yes (all files matching included)** | no♦ | no | no | no | no |
| require (free) 中的表达式 `require(moduleName)` | 手动配置 | no♦ | no | no | no | |
| 生成单独包 | **yes** | yes♦ | yes | yes | yes | yes |
| 间接的 require `var r = require; r("./file")` | **yes** | no♦ | no | no | no | |
| 分别加载每个文件 | no | yes | no | yes | no | no |
| 损坏的路径名 | **yes** | no | 部分 | yes | 不需要（路径名称不在包中） | no |
| 压缩 | uglify | uglify, closure compiler | [uglifyify](https://github.com/hughsk/uglifyify) | yes | [uglify-plugin](https://github.com/TrySound/rollup-plugin-uglify) | [UglifyJS-brunch](https://github.com/brunch/uglify-js-brunch)
| 用 common bundle 构建多页 | 手动配置 | **yes** | 手动配置 | 使用包算法 | no | no|
| 多个 bundle | **yes** | 手动配置 | 手动配置 | yes | no | yes |
| Node.js 内置 libs `require("path")` | **yes** | no | **yes** | **yes** | [node-resolve-plugin](https://github.com/rollup/rollup-plugin-node-resolve) | |
| Node.js 其他 | process, __dir/filename, global | - | process, __dir/filename, global | process, __dir/filename, global for cjs | global ([commonjs-plugin](https://github.com/rollup/rollup-plugin-commonjs)) | |
| 插件 | **yes** | yes | **yes** | yes | yes | yes |
| 预处理 | **loaders, [transforms](https://github.com/webpack/transform-loader)** | loaders | transforms | plugin translate | plugin transforms | compilers, optimizers |
| 浏览器替换 | `web_modules`, `.web.js`, package.json field, alias config option | alias option | package.json field, alias option | package.json, alias option | no | |
| 可 require 文件 | 文件系统 | **web** | 文件系统 | 通过插件 | 文件系统或通过插件 | 文件系统 |
| 执行时开销 | **243B + 20B 每个模块 + 4B 每个依赖** | 14.7kB + 0B 每个模块 + (3B + X) 每个依赖 | 415B + 25B 每个模块 + (6B + 2X) 每个依赖 | 5.5kB for 自执行 bundle, 38kB 全部 loader 和 polyfill, 0 普通模块, 293B CJS, 139B ES2015 System.register before gzip | **none for ES2015 modules**（可能有其他格式） | |
| 观察模式 | yes | 不需要 | yes | 开发不需要 | no | yes |

♦ 在生产模式（在开发模式中相反）

X是路径字符串的长度

***

> 原文：https://webpack.js.org/get-started/why-webpack/