---
title: 命令行接口(Command Line Interface)
sort: 2
contributors:
  - ev1stensberg
  - simon04
related:
  - title: Analyzing Build Statistics
    url: https://survivejs.com/webpack/optimizing-build/analyzing-build-statistics/
  - title: Three simple ways to inspect a webpack bundle
    url: https://medium.com/@joeclever/three-simple-ways-to-inspect-a-webpack-bundle-7f6a8fe7195d#.7d2i06mjx
  - title: Optimising your application bundle size with webpack
    url: https://hackernoon.com/optimising-your-application-bundle-size-with-webpack-e85b00bab579#.5w5ko08pq
  - title: Analyzing & optimizing your webpack bundle
    url: https://medium.com/@ahmedelgabri/analyzing-optimizing-your-webpack-bundle-8590818af4df#.hce4vdjs9
  - title: Analysing and minimising the size of client side bundle with webpack and source-map-explorer
    url: https://medium.com/@nimgrg/analysing-and-minimising-the-size-of-client-side-bundle-with-webpack-and-source-map-explorer-41096559beca#.c3t2srr8x
---

为了更合适且方便地使用配置，可以在 `webpack.config.js` 中对 webpack 进行配置。CLI 中传入的任何参数会在配置文件中映射为对应的参数。

如果你还没有安装 webpack，请查看[安装指南](/guides/installation)。

T> webpack 的新 CLI 正在开发中。正在添加新功能，例如 `--init` 参数。[查看详情！](https://github.com/webpack/webpack-cli)


## 使用配置文件的用法

```sh
webpack [--config webpack.config.js]
```

配置文件中的相关选项，请参阅[配置](/configuration)。


## 不使用配置文件的用法

```sh
webpack <entry> [<entry>] <output>
```

**`<entry>`**

一个文件名或一组被命名的文件名，作为构建项目的入口起点。您可以传递多个入口（每个入口在启动时加载）。如果传递一个形式为 `<name> = <request>` 的键值对，则可以创建一个额外的入口起点。它将被映射到配置选项(configuration option)的 `entry` 属性。

**`<output>`**

要保存的 bundled 文件的路径和文件名。它将映射到配置选项 `output.path` 和 `output.filename`。

**示例**

假设你的项目结构像下面这样：

```bash
.
├── dist
├── index.html
└── src
    ├── index.js
    ├── index2.js
    └── others.js
```

```bash
webpack src/index.js dist/bundle.js
```

打包源码，入口为 `index.js`，并且输出文件的路径为 `dist`，文件名为 `bundle.js`

```bash
	| Asset     | Size    | Chunks      | Chunk Names |
	|-----------|---------|-------------|-------------|
	| bundle.js | 1.54 kB | 0 [emitted] | index       |
	[0] ./src/index.js 51 bytes {0} [built]
	[1] ./src/others.js 29 bytes {0} [built]
```

```bash
webpack index=./src/index.js entry2=./src/index2.js dist/bundle.js
```

以多个入口的方式打包文件

```bash
	| Asset     | Size    | Chunks        | Chunk Names   |
	|-----------|---------|---------------|---------------|
	| bundle.js | 1.55 kB | 0,1 [emitted] | index, entry2 |
	[0] ./src/index.js 51 bytes {0} [built]
	[0] ./src/index2.js 54 bytes {1} [built]
	[1] ./src/others.js 29 bytes {0} {1} [built]
```


### 常用配置

**列出命令行所有可用的配置选项**

```bash
webpack --help
webpack -h
```

**使用配置文件进行构建**

指定其它的[配置](/configuration)文件。配置文件默认为 `webpack.config.js`，如果你想使用其它配置文件，可以加入这个参数。

```bash
webpack --config example.config.js
```

**以 JSON 格式输出 webpack 的运行结果**

```bash
webpack --json
webpack --json > stats.json
```

在其他每个情况下，webpack 会打印一组统计信息，用于显示 bundle, chunk 和用时等详细信息。使用此选项，输出可以是 JSON 对象。此输出文件(response)可被 webpack 的[分析工具](https://webpack.github.com/analyse)，或 chrisbateman 的 [webpack 可视化工具](https://chrisbateman.github.io/webpack-visualizer/)，或 th0r 的 [webpack bundle 分析工具](https://github.com/th0r/webpack-bundle-analyzer)接收后进行分析。分析工具将接收 JSON 并以图形形式提供构建的所有细节。

### 环境选项

当 webpack 配置对象[导出为一个函数](/configuration/configuration-types#exporting-a-function)时，可以向起传入一个"环境对象(environment)"。

```bash
webpack --env.production    # 设置 env.production == true
webpack --env.platform=web  # 设置 env.platform == "web"
```

`--env` 参数具有多种语法 accepts various syntaxes:

Invocation                               | Resulting environment
---------------------------------------- | ---------------------------
`webpack --env prod`                     | `"prod"`
`webpack --env.prod`                     | `{ prod: true }`
`webpack --env.prod=1`                   | `{ prod: 1 }`
`webpack --env.prod=foo`                 | `{ prod: "foo" }`
`webpack --env.prod --env.min`           | `{ prod: true, min: true }`
`webpack --env.prod --env min`           | `[{ prod: true }, "min"]`
`webpack --env.prod=foo --env.prod=bar`  | `{prod: [ "foo", "bar" ]}`

T> See the [environment variables](/guides/environment-variables) guide for more information on its usage.

### 输出配置

通过以下这些配置，你可以调整构建流程的某些[输出](/configuration/output)参数。

参数 | 说明 | 输入类型 | 默认值
------------------------- | ------------------------------------------- | ---------- | ------------------
`--output-chunk-filename` | 输出的附带 chunk 的文件名   | string     | 含有 [id] 的文件名，而不是 [name] 或者 [id] 作为前缀
`--output-filename`       | 打包文件的文件名           | string     | [name].js
`--output-jsonp-function` | 加载 chunk 时使用的 JSONP 函数名 | string | webpackJsonp
`--output-library`        | 以库的形式导出入口文件 | string |
`--output-library-target` | 以库的形式导出入口文件时，输出的类型 | string | var
`--output-path`           | 输出的路径（在公共路径的基础上）      | string     | 当前目录
`--output-pathinfo`       | 加入一些依赖信息的注解 | boolean | false
`--output-public-path`    | The 输出文件时使用的公共路径              | string     | /
`--output-source-map-filename` | 生成的 SourceMap 的文件名  | string     | [name].map or [outputFilename].map


#### 示例用法

```bash
webpack index=./src/index.js index2=./src/index2.js --output-path='./dist' --output-filename='[name][hash].bundle.js'

| Asset                                | Size    | Chunks      | Chunk Names   |
|--------------------------------------|---------|-------------|---------------|
| index2740fdca26e9348bedbec.bundle.js |  2.6 kB | 0 [emitted] | index2        |
| index740fdca26e9348bedbec.bundle.js  | 2.59 kB | 1 [emitted] | index         |
	[0] ./src/others.js 29 bytes {0} {1} [built]
	[1] ./src/index.js 51 bytes {1} [built]
	[2] ./src/index2.js 54 bytes {0} [built]
```

```bash
webpack.js index=./src/index.js index2=./src/index2.js --output-path='./dist' --output-filename='[name][hash].bundle.js' --devtool source-map --output-source-map-filename='[name]123.map'

| Asset                                | Size    | Chunks      | Chunk Names   |
|--------------------------------------|---------|-------------|---------------|
| index2740fdca26e9348bedbec.bundle.js | 2.76 kB | 0 [emitted] | index2        |
|  index740fdca26e9348bedbec.bundle.js | 2.74 kB | 1 [emitted] | index         |
|                        index2123.map | 2.95 kB | 0 [emitted] | index2        |
|                         index123.map | 2.95 kB | 1 [emitted] | index         |
	[0] ./src/others.js 29 bytes {0} {1} [built]
	[1] ./src/index.js 51 bytes {1} [built]
	[2] ./src/index2.js 54 bytes {0} [built]
```


### Debug 配置

以下这些配置可以帮助你在 Webpack 编译过程中更好地 debug。

参数 | 说明 | 输入类型 | 默认值
------------ | ------------------------------------------------ | ---------- | -------------
`--debug`    | 把 loader 设置为 debug 模式 | boolean    | false
`--devtool`  | 为打包好的资源定义 [source map 的类型] | string | -
`--progress` | 打印出编译进度的百分比值 | boolean    | false


### 模块配置

这些配置可以用于绑定 Webpack 允许的[模块](/configuration/module/)。

参数 | 说明 | 用法
-------------------- | ---------------------------------- | ----------------
`--module-bind`      | 为 loader 绑定一个扩展 | `--module-bind js=babel-loader`
`--module-bind-post` | 为 post loader 绑定一个扩展 |
`--module-bind-pre`  | 为 pre loader 绑定一个扩展 |


### Watch 配置

这些配置可以用于[观察](/configuration/watch/)依赖文件的变化，一旦有变化，则可以重新执行构建流程。

参数 | 说明
------------------------- | ----------------------
`--watch`, `-w`           | 观察文件系统的变化
`--save`, `-s`            | 在保存的时候重新编译，无论文件是否变化
`--watch-aggregate-timeout` | 指定一个毫秒数，在这个时间内，文件若发送了多次变化，会被合并
`--watch-poll`            | 轮询观察文件变化的时间间隔（同时会打开轮询机制）
`--watch-stdin`, `--stdin` | 当 stdin 关闭时，退出进程


### 性能优化配置

在生产环境的构建时，这些配置可以用于调整的一些性能相关的配置。

参数 | 说明 | 使用的插件
--------------------------- | -------------------------------------------------------|----------------------
`--optimize-max-chunks`     | 限制 chunk 的数量 | [LimitChunkCountPlugin](/plugins/limit-chunk-count-plugin)
`--optimize-min-chunk-size` | 限制 chunk 的最小体积               | [MinChunkSizePlugin](/plugins/min-chunk-size-plugin)
`--optimize-minimize`       | 压缩混淆 javascript，并且把 loader 设置为 minimizing | [UglifyJsPlugin](/plugins/uglifyjs-webpack-plugin/) & [LoaderOptionsPlugin](/plugins/loader-options-plugin/)


### Resolve 配置

这些配置可以用于设置  webpack [resolver](/configuration/resolve/) 时使用的别名(alias)和扩展名(extension)。

参数   | 说明                      | 示例
---------------------- | ------------------------------------------------------- | -------------
--resolve-alias        | 指定模块的别名 | --resolve-alias jquery-plugin=jquery.plugin
--resolve-extensions   | 指定需要被处理的文件的扩展名 | --resolve-extensions .es6 .js .ts
--resolve-loader-alias | Minimize javascript and switches loaders to minimizing  |


### 统计数据配置

以下选项用于配置 Webpack 在控制台输出的[统计数据](/configuration/stats/)，以及这些数据的样式。

参数 | 说明 | Type
-------------------------------- | ------------------------------------------------------------------ | -------
`--color`, `--colors` | E开启/关闭控制台的颜色 [默认值：(supports-color)] | boolean
`--display`                      | 选择[显示预设](/configuration/stats)(verbose - 繁琐, detailed - 细节, normal - 正常, minimal - 最小, errors-only - 仅错误, none - 无; 从 webpack 3.0.0 开始) | string
`--display-cached` | 在输出中显示缓存的模块 | boolean
`--display-cached-assets` | 在输出中显示缓存的 assets | boolean
`--display-chunks` | 在输出中显示 chunks | boolean
`--display-depth` | 显示从入口起点到每个模块的距离 | boolean
`--display-entrypoints`   | 在输出中显示入口文件 | boolean
`--display-error-details` | 显示详细的错误信息 | boolean
`--display-exclude`       | 在输出中显示被排除的文件 | boolean
`--display-max-modules`          | 设置输出中可见模块的最大数量 | number
`--display-modules` | 在输出中显示所有模块，包括被排除的模块 | boolean
`--display-optimization-bailout` | 作用域提升回退触发器(Scope hoisting fallback trigger)（从 webpack 3.0.0 开始） | boolean
`--display-origins` | 在输出中显示最初的 chunk | boolean
`--display-provided-exports`     | 显示有关从模块导出的信息 | boolean
`--display-reasons` | 显示模块包含在输出中的原因 | boolean
`--display-used-exports` | 显示模块中被使用的接口（Tree Shaking） | boolean
`--hide-modules` | 隐藏关于模块的信息 | boolean
`--sort-assets-by` | 对 assets 列表以某种属性排序 | string
`--sort-chunks-by`               | 对 chunks 列表以某种属性排序 | string
`--sort-modules-by`              | 对模块列表以某种属性排序 | string
`--verbose`                      | 显示更多信息 | boolean


### 高级配置

参数 | 说明 | 用法
----------------- | ---------------------------------------- | -----
`--bail` | 一旦发生错误，立即终止 |
`--cache` | 开启缓存 [watch 时会默认打开] | `--cache=false`
`--define` | 定义 bundle 中的任意自由变量，查看 [shimming](/guides/shimming) | `--define process.env.NODE_ENV='development'`
`--hot`           | 开启[模块热替换](/concepts/hot-module-replacement) | `--hot=true`
`--labeled-modules` | 开启模块标签 [使用 LabeledModulesPlugin] |
`--plugin`        | 加载某个[插件](/configuration/plugins/) |
`--prefetch`      | 预加载某个文件 | `--prefetch=./files.js`
`--provide`       | 在所有模块中将这些模块提供为自由变量，查看 [shimming](/guides/shimming) | `--provide jQuery=jquery`
`--records-input-path` | 记录文件的路径（读取） |
`--records-output-path` | 记录文件的路径（写入） |
`--records-path`  | 记录文件的路径 |
`--target`        | [目标](/configuration/target/)的执行环境 | `--target='node'`

### 简写

简写 | 含义
---------|----------------------------
-d       | `--debug --devtool cheap-module-eval-source-map --output-pathinfo`
-p       | `--optimize-minimize --define process.env.NODE_ENV="production"`, see [building for production](/guides/production)


### Profiling

`--profile` 选项捕获编译时每个步骤的时间信息，并且将这些信息包含在输出中。

```bash
webpack --profile

⋮
[0] ./src/index.js 90 bytes {0} [built]
    factory:22ms building:16ms = 38ms
```

For each module, the following details are included in the output as applicable:

* `factory`: time to collect module metadata (e.g. resolving the filename)
* `building`: time to build the module (e.g. loaders and parsing)
* `dependencies`: time to identify and connect the module’s dependencies

Paired with `--progress`, `--profile` gives you an in depth idea of which step in the compilation is taking how long. This can help you optimise your build in a more informed manner.

```bash
webpack --progress --profile

30ms building modules
1ms sealing
1ms optimizing
0ms basic module optimization
1ms module optimization
1ms advanced module optimization
0ms basic chunk optimization
0ms chunk optimization
1ms advanced chunk optimization
0ms module and chunk tree optimization
1ms module reviving
0ms module order optimization
1ms module id optimization
1ms chunk reviving
0ms chunk order optimization
1ms chunk id optimization
10ms hashing
0ms module assets processing
13ms chunk assets processing
1ms additional chunk assets processing
0ms recording
0ms additional asset processing
26ms chunk asset optimization
1ms asset optimization
6ms emitting
⋮
```

***

> 原文：https://webpack.js.org/api/cli/
