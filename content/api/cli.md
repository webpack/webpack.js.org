---
title: 命令行接口(CLI)
sort: 2
contributors:
    - ev1stensberg
---

Webpack 提供了命令行接口（CLI），以便对构建过程进行配置和交互。这对于制定早期原型、profiling、编写 npm scripts 或者一些个人自定义需求很有用。

为了更合适且方便地使用配置，可以在 `webpack.config.js` 中对 Webpack 进行配置。CLI 中允许传入的任何参数在这个配置文件中也会有对应的参数。

## 安装

参考[这页](/get-started/install-webpack)

?> 新的 Wbpack CLI 正在开发中。例如 `--init` 参数这样的新特性正在加入中。[查看详情！](https://github.com/webpack/webpack-cli)

### 普通用法

```bash
webpack <entry> [<entry>] <output>
```

| 参数 | 对应的配置         | 说明                                                                                                                                                             |
|-----------|-------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| entry     | entry                         | 文件名或者文件名的集合，作为项目构建的入口。如果使用 `=` 传入了多个键值对，则可以存在多个入口。 |
| output    | output.path + output.filename | 生成打包文件的路径及文件名。 |

#### 示例

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
	打包代码，入口为 `index.js`，输出文件夹路径为 `dist`，文件名为 `bundle.js`

	| Asset     | Size    | Chunks      | Chunk Names |
	|-----------|---------|-------------|-------------|
	| bundle.js | 1.54 kB | 0 [emitted] | index       |
	[0] ./src/index.js 51 bytes {0} [built]
	[1] ./src/others.js 29 bytes {0} [built]
```

```bash
webpack index=./src/index.js entry2=./src/index2.js dist/bundle.js
	以多个入口的方式打包文件

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
webpack --help , webpack -h
```

**使用配置文件进行构建**

指定其它的配置文件。配置文件默认为 `webpack.config.js`，如果你想使用其它配置文件，可以加入这个参数。

```bash
webpack --config example.config.js
```

**传入 Webpack 配置文件中使用的环境变量**

```bash
webpack --env=DEVELOPMENT
```
**以 JSON 格式输出 Webpack 的运行结果**

其它情况下，Webpack 会输出一系列的数据，包含着关于 bundle、chunk 和性能的详细信息。使用这个参数后，输出会变为一个 JSON 对象。这个对象可以用在[分析工具](https://webpack.github.com/analyse)中。分析工具会根据这个 JSON 对象在图表中绘制出构建过程的所有详细信息。

?> (TODO: Link to webpack analyse article)

```bash
webpack --json , webpack -j, webpack -j > stats.json
```

### 输出配置

通过以下这些配置，你可以调整构建流程的某些输出参数。

| 参数                          | 说明                                                             | 输入类型     | 默认值                                                 |
|------------------------------|-----------------------------------------------------------------|------------|-------------------------------------------------------|
| --output-chunk-filename      | 输出的附带 chunk 的文件名                       | string     | 含有 [id] 的文件名，而不是 [name] 或者 [id] 作为前缀 |
| --output-filename            | 打包文件的文件名                               | string     | [name].js                                             |
| --output-jsonp-function      | 加载 Chunk 时使用的 JSONP 函数名           | string     | webpackJsonp                                          |
| --output-library             | 以库的形式导出入口文件                | string     |                                                       |
| --output-library-target      | 以库的形式导出入口文件时，输出的类型  | string     | var                                                   |
| --output-path                | 输出的路径（在公共路径的基础上）                        | string     | 当前目录                                     |
| --output-pathinfo            | 加入一些依赖信息的注解         | boolean    | false                                                 |
| --output-public-path         | 输出文件时使用的公共路径                                  | string     | /                                                     |
| --output-source-map-filename | 生成的 SourceMap 的文件名                           | string     | [name].map or [outputFilename].map                    |

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

| 参数  | 说明                                      | 输入类型 | 默认值 |
|------------|--------------------------------------------------|------------|---------------|
| --debug    | 把 loader 设置为 debug 模式                     | boolean    | false         |
| --devtool  | 为打包好的资源定义 SourceMap 的类型 | string     | -             |
| --progress | 打印出编译进度的百分比值         | boolean    | false         |

### 模块配置

这些配置可以用于绑定 Webpack 允许的模块。

| 参数                | 说明                      | 使用方法                      |
|--------------------|---------------------------|-----------------------------|
| --module-bind      | 为 loader 绑定一个扩展      | --module-bind /\.js$/=babel |
| --module-bind-post | 为 post loader 绑定一个扩展 |                             |
| --module-bind-pre  | 为 pre loader 绑定一个扩展  |                             |

### Watch 配置

这些配置可以用于观察依赖文件的变化，一旦有变化，则可以重新执行构建流程。

| 参数                       | 说明                                                   |
|---------------------------|--------------------------------------------------------|
| --watch, -w               | 观察文件系统的变化                                        |
| --save, -s                | 在保存的时候重新编译，无论文件是否变化                       |
| --watch-aggregate-timeout | 指定一个毫秒数，在这个时间内，文件若发送了多次变化，会被合并     |
| --watch-poll              | 轮询观察文件变化的时间间隔（同时会打开轮询机制）               |
| --watch-stdin, --stdin    | 当 stdin 关闭时，退出进程                                 |

### 性能优化配置

在生产环境的构建时，这些配置可以用于调整的一些性能相关的配置。

| 参数                       | 说明                                              | 使用的插件                            |
|---------------------------|--------------------------------------------------|--------------------------------------|
| --optimize-max-chunks     | 限制 chunk 的数量                                  | LimitChunkCountPlugin                |
| --optimize-min-chunk-size | 限制 chunk 的最小体积                               | MinChunkSizePlugin                   |
| --optimize-minimize       | 压缩混淆 javascript，并且把 loader 设置为 minimizing | UglifyJsPlugin & LoaderOptionsPlugin |

### Resolve 配置

这些配置可以用于设置 Webpack 解析时使用的别名（alias）和扩展名（extension）。

| 参数                    | 说明                                                    | 示例                                         |
|------------------------|---------------------------------------------------------|---------------------------------------------|
| --resolve-alias        | 指定模块的别名                                            | --resolve-alias jquery-plugin=jquery.plugin |
| --resolve-extensions   | 指定需要被处理的文件的扩展名                                 | --resolve-extensions .es6 .js .ts           |
| --resolve-loader-alias | Minimize javascript and switches loaders to minimizing  |                                             |

### 统计数据配置

以下选项用于配置 Webpack 在控制台输出的统计数据，以及这些数据的样式。

| 参数                     | 说明                                            | 类型    |
|-------------------------|------------------------------------------------|---------|
| --color, --colors       | 开启/关闭控制台的颜色 [默认值: (supports-color)]    | boolean |
| --display-cached        | 在输出中显示缓存的模块                             | boolean |
| --display-cached-assets | 在输出中显示缓存的 assets                         | boolean |
| --display-chunks        | 在输出中显示 chunks                              | boolean |
| --display-entrypoints   | 在输出中显示入口文件                               | boolean |
| --display-error-details | 显示详细的错误信息                                 | boolean |
| --display-exclude       | 在输出中显示被排除的文件                            | boolean |
| --display-modules       | 在输出中显示所有模块，包括被排除的模块                | boolean |
| --display-origins       | 在输出中显示最初的 chunk                           | boolean |
| --display-reasons       | 在输出中显示引入模块的原因                          | boolean |
| --display-used-exports  | 显示模块中被使用的接口（Tree Shaking）              | boolean |
| --hide-modules          | 隐藏关于模块的信息                                 | boolean |
| --sort-assets-by        | 对 assets 列表以某种属性排序S                      | string  |
| --sort-chunks-by        | 对 chunks 列表以某种属性排序                       | string  |
| --sort-modules-by       | 对模块列表以某种属性排序                            | string  |
| --verbose, -v           | 显示更多信息                                      | boolean |

### 高级配置

| 参数                   | 说明                                          | 使用方法                                      |
|-----------------------|-----------------------------------------------|---------------------------------------------|
| --bail                | 一旦发生错误，立即终止                            |                                             |
| --cache               | 开启缓存 [watch 时会默认打开]                    | --cache=false                               |
| --define              | 定义打包文件中的全局变量                          | --define process.env.NODE_ENV='development' |
| --hot                 | 开启模块热替换 [使用 HotModuleReplacementPlugin] | --hot=true                                  |
| --labeled-modules     | 开启模块标签 [使用 LabeledModulesPlugin]         |                                             |
| --plugin              | 加载某个插件                                    |                                             |
| --prefetch            | 预加载某个文件                                  | --prefetch=./files.js                       |
| --provide             | 以全局变量的形式提供某个模块                       | --provide jQuery=jquery                     |
| --records-input-path  | 写记录的路径                                    |                                             |
| --records-output-path | 读记录的路径                                    |                                             |
| --records-path        | 记录的路径                                      |                                             |
| --target              | 目标的执行环境                                  | --target='node'                              |

### 缩写

| 缩写      | 含义                                                                                      |
|----------|-------------------------------------------------------------------------------------------|
| -d       | --debug --devtool eval-cheap-module-source-map --output-pathinfo                          |
| -p       | --optimize-minimize --define,process.env.NODE_ENV="production" --optimize-occurence-order |

### Profiling

这个选项会记录编译的性能数据，并且输出。它会告诉你编译过程中哪些步骤耗时最长，这对于优化构建的性能很有帮助。

```bash
webpack --profile

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
```

***

> 原文：https://webpack.js.org/api/cli/