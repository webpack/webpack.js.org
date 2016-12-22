---
title: 为什么使用 webpack？
contributors:
  - pksjce
  - bebraw
  - dear-lizhihua
sort: 2
---

webpack is usually compared to tools like Make, Grunt, Gulp, Browserify or Brunch. However, some of these tools (Make, Grunt, and Gulp, which are task runners) have a much different purpose than webpack, which is a module bundler. Comparing them directly could lead to sorts of confusion, so let’s first draw a distinction between these types of tools.

## What Are Task Runners?

Task runners literally make it easier to handle tasks, such as linting, building, or developing your project. Compared to *bundlers* like Browserify, Brunch, or webpack, they have a higher level focus. Bundlers, on the other hand, have a much more specific goal.


## What Are Bundlers?

Roughly put bundlers take assets, such as JavaScript files in, and then transform them into format that's suitable for the browser of the end user to consume. This process of bundling happens to be one of the most important problems in web development and solving it well can remove a large part of pain from the process.

Bundlers can work in tandem with task runners. You can still benefit from their higher level tooling while leaving the problem of bundling to more specialized tools. [grunt-webpack](https://www.npmjs.com/package/grunt-webpack) and [gulp-webpack](https://www.npmjs.com/package/gulp-webpack) are good examples of integrations.

T> Often webpack users use npm `scripts` as their task runner. This is a good starting point. Cross-platform support can become a problem, but there are several workarounds for that.

T> Even though webpack core focuses on bundling, you can find a variety of extensions that allow you to use it in a task runner kind of way.

## Comparison

webpack however is not the only module bundler out there. If you are choosing between using webpack or any of the bundler's below, here is a feature by feature comparison on how webpack fares against the current competition.

| 特性 | webpack/webpack | jrburke/requirejs | substack/node-browserify | jspm/jspm-cli | rollup/rollup | brunch/brunch |
|---------|-----------------|-------------------|--------------------------|---------------|---------------|---------------|
| 按需加载附加模块 | **yes** | **yes** | no | [System.import](https://github.com/systemjs/systemjs/blob/master/docs/system-api.md#systemimportmodulename--normalizedparentname---promisemodule) | no | no |
| AMD `define` | **yes** | **yes** | [deamdify](https://github.com/jaredhanson/deamdify) | yes | no | yes |
| AMD `require` | **yes** | **yes** | no | yes | no | yes |
| AMD `require` 按需加载 | **yes** | 手动配置 | no | yes | no | no |
| CommonJS `exports` | **yes** | 只包含在 `define` 中 | **yes** | yes | [commonjs-plugin](https://github.com/rollup/rollup-plugin-commonjs) | yes |
| CommonJS `require` | **yes** | 只包含在 `define` 中 | **yes** | yes | [commonjs-plugin](https://github.com/rollup/rollup-plugin-commonjs) | yes |
| CommonJS `require.resolve` | **yes** | no | no | no | no |
| require 中拼接 `require("./fi" + "le")` | **yes** | no♦ | no | no | no |
| 调试支持 | **SourceUrl, SourceMaps** | 不需要 | SourceMaps | **SourceUrl, SourceMaps** | **SourceUrl, SourceMaps** | SourceMaps |
| 依赖 | 19MB / 127 个程序包 | 11MB / 118 个程序包 | **1.2MB / 1 个程序包** | 26MB / 131 个程序包 | ?MB / 3 个程序包
| ES2015 `import`/`export` | **yes**(vr. 2) | no | no | **yes** | **yes** | yes, 通过 [es6 模块转换器](https://github.com/gcollazo/es6-module-transpiler-brunch)
| Expressions in require (guided) `require("./templates/" + template)` | **yes (all files matching included)** | no♦ | no | no | no | no |
| Expressions in require (free) `require(moduleName)` | 手动配置 | no♦ | no | no | no |
| 生成单独包 | **yes** | yes♦ | yes | yes | yes | yes |
| 间接的 require `var r = require; r("./file")` | **yes** | no♦ | no | no | no |
| 分别加载每个文件 | no | yes | no | yes | no | no |
| Mangle path names | **yes** | no | 部分 | yes | 不需要（路径名称不在包中） | no |
| 压缩 | uglify | uglify, closure compiler | [uglifyify](https://github.com/hughsk/uglifyify) | yes | [uglify-plugin](https://github.com/TrySound/rollup-plugin-uglify) | [UglifyJS-brunch](https://github.com/brunch/uglify-js-brunch)
| 用 common bundle 构建多页 | 手动配置 | **yes** | 手动配置 | 使用包算法 | no | no|
| 多个 bundle | **yes** | 手动配置 | 手动配置 | yes | no | yes |
| Node.js 内置 libs `require("path")` | **yes** | no | **yes** | **yes** | [node-resolve-plugin](https://github.com/rollup/rollup-plugin-node-resolve)
| Node.js 其他 | process, __dir/filename, global | - | process, __dir/filename, global | process, __dir/filename, global for cjs | global ([commonjs-plugin](https://github.com/rollup/rollup-plugin-commonjs)) |
| 插件 | **yes** | yes | **yes** | yes | yes | yes |
| 预处理 | **loaders, [transforms](https://github.com/webpack/transform-loader)** | loaders | transforms | plugin translate | plugin transforms | compilers, optimizers |
| 浏览器替换 | `web_modules`, `.web.js`, package.json field, alias config option | alias option | package.json field, alias option | package.json, alias option | no |
| Requirable files | 文件系统 | **web** | 文件系统 | 通过插件 | 文件系统或通过插件 | 文件系统 |
| 运行时开销 | **243B + 20B 每个模块 + 4B 每个依赖** | 14.7kB + 0B 每个模块 + (3B + X) 每个依赖 | 415B + 25B 每个模块 + (6B + 2X) 每个依赖 | 5.5kB for self-executing bundles, 38kB for full loader and polyfill, 0 plain modules, 293B CJS, 139B ES2015 System.register before gzip | **none for ES2015 modules**（可能有其他格式）
| 观察模式 | yes | 不需要 | yes | 开发不需要 | no | yes |

♦ 在生产模式（在开发模式中相反）

X是路径字符串的长度
