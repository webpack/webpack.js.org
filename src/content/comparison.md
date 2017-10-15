---
title: 对比
sort: 1
contributors:
  - pksjce
  - bebraw
  - chrisVillanueva
  - tashian
  - simon04
related:
  - title: JSPM vs. webpack
    url: https://ilikekillnerds.com/2015/07/jspm-vs-webpack/
  - title: webpack vs. Browserify vs. SystemJS
    url: https://engineering.velocityapp.com/webpack-vs-browersify-vs-systemjs-for-spas-95b349a41fa0
---

webpack 不仅仅作为模块打包器存在。如果你要在使用 webpack 或下面任意的打包器之间进行选择，这里列出了 webpack 特性，以及和其他竞品之间的功能对比。

| 特性 | webpack/webpack | jrburke/requirejs | substack/node-browserify | jspm/jspm-cli | rollup/rollup | brunch/brunch |
|---------|-----------------|-------------------|--------------------------|---------------|---------------|---------------|
| 附加模块按需加载 | **yes** | **yes** | no | [System.import](https://github.com/systemjs/systemjs/blob/master/docs/system-api.md#systemimportmodulename--normalizedparentname---promisemodule) | no | no |
| AMD `define` | **yes** | **yes** | [deamdify](https://github.com/jaredhanson/deamdify) | yes | [rollup-plugin-amd](https://github.com/piuccio/rollup-plugin-amd) | yes |
| AMD `require` | **yes** | **yes** | no | yes | no | yes |
| AMD `require` 按需加载 | **yes** | 手动配置 | no | yes | no | no |
| CommonJS `exports` | **yes** | 只包含在 `define` 中 | **yes** | yes | [commonjs-plugin](https://github.com/rollup/rollup-plugin-commonjs) | yes |
| CommonJS `require` | **yes** | 只包含在 `define` 中 | **yes** | yes | [commonjs-plugin](https://github.com/rollup/rollup-plugin-commonjs) | yes |
| CommonJS `require.resolve` | **yes** | no | no | no | no | |
| require 中拼接 `require("./fi" + "le")` | **yes** | no♦ | no | no | no | |
| 调试支持 | **SourceUrl, SourceMaps** | 不需要 | SourceMaps | **SourceUrl, SourceMaps** | **SourceUrl, SourceMaps** | SourceMaps |
| 依赖 | 19MB / 127 个程序包 | 11MB / 118 个程序包 | **1.2MB / 1 个程序包** | 26MB / 131 个程序包 | ?MB / 3 个程序包 | |
| ES2015 `import`/`export` | **yes** (webpack 2) | no | no | **yes** | **yes** | yes, 通过 [es6 模块转换器](https://github.com/gcollazo/es6-module-transpiler-brunch)
| require (guided) 中的表达式 `require("./templates/" + template)` | **yes (包括所有匹配的文件)** | no♦ | no | no | no | no |
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
| 执行时(runtime)开销 | **243B + 20B 每个模块 + 4B 每个依赖** | 14.7kB + 0B 每个模块 + (3B + X) 每个依赖 | 415B + 25B 每个模块 + (6B + 2X) 每个依赖 | 5.5kB for 自执行 bundle, 38kB 全部 loader 和 polyfill, 0 普通模块, 293B CJS, 139B ES2015 System.register before gzip | **none for ES2015 modules**（可能有其他格式） | |
| 开发文件监听(watch)模式 | yes | 不需要 | [watchify](https://github.com/substack/watchify) | 开发不需要 | [rollup-watch](https://github.com/rollup/rollup-watch) | yes |


♦ 在生产模式（在开发模式中相反）

X是路径字符串的长度


## 打包 vs. 加载

注意_加载_和_打包_模块之间的一些关键区别很重要。可以在 [JSPM](https://github.com/jspm/jspm-cli) 引擎下找到像 [SystemJS](https://github.com/systemjs/systemjs) 的工具，用于在浏览器通过运行时(runtime)来加载和转译模块。这和 webpack 有着显著不同，在加载到浏览器之前，模块就已经被转译（通过 "loaders"）并打包在一起。

每种方法都有其优势和劣势。运行时(runtime)加载和转译模块，为大型网站增加了大量开销，并且应用程序会由许多模块组成。因此，SystemJS 对于需要少量模块的小型项目更有意义。但是，随着 [HTTP/2](https://http2.github.io/) 改善文件从服务器到客户端的传输速度，这可能会发生一些变化。请注意，HTTP/2 不会修改_转译_模块的任何内容，在客户端下载完成后，还是需要很长时间去进行转译。

***

> 原文：https://webpack.js.org/guides/comparison/
