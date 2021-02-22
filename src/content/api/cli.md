---
title: 命令行接口（CLI）
sort: 1
contributors:
  - anshumanv
  - snitin315
  - evenstensberg
  - simon04
  - tbroadley
  - chenxsan
  - rencire
  - madhavarshney
  - EugeneHlushko
  - byzyk
  - wizardofhogwarts
  - EslamHiko
  - smelukov
  - anikethsaha
  - jamesgeorge007
related:
  - title: 分析构建的统计数据
    url: https://survivejs.com/webpack/optimizing-build/analyzing-build-statistics/
  - title: 检查 webpack 包的三种简单方法
    url: https://medium.com/@joeclever/three-simple-ways-to-inspect-a-webpack-bundle-7f6a8fe7195d#.7d2i06mjx
  - title: 使用 webpack 优化应用程序包
    url: https://hackernoon.com/optimising-your-application-bundle-size-with-webpack-e85b00bab579#.5w5ko08pq
  - title: 分析和优化你的 webpack 包
    url: https://medium.com/@ahmedelgabri/analyzing-optimizing-your-webpack-bundle-8590818af4df#.hce4vdjs9
  - title: 使用 webpack 和 source-map-explorer 分析并减小 client-side 包
    url: https://medium.com/@nimgrg/analysing-and-minimising-the-size-of-client-side-bundle-with-webpack-and-source-map-explorer-41096559beca#.c3t2srr8x
---

为了更合适且方便地使用配置，可以在 `webpack.config.js` 中对 webpack 进行配置。CLI 中传入的任何参数会在配置文件中映射为对应的参数。

如果你还没有安装过 webpack 和 CLI，请先阅读 [安装指南](/guides/installation)。

## 命令 {#commands}

webpack-cli 提供了许多命令来使 webpack 的工作变得简单。默认情况下，webpack 提供了以下命令：

| 命令          | 使用                                      | 描述                                                                     |
| ------------ | ----------------------------------------- | ------------------------------------------------------------------------------- |
| `build`      | `build\|bundle\|b [entries...] [options]` | 运行 webpack（默认命令，可以被省略）。                                               |
| `configtest` | `configtest\|t [config-path]`             | 校验 webpack 配置。                                                               |
| `help`       | `help\|h [command] [option]`              | 展示所有命令和选项的帮助。                                                          |
| `info`       | `info\|i [options]`                       | 输出有关系统的信息。                                                                |
| `init`       | `init\|c [scaffold...] [options]`         | 初始化一个新的 webpack 配置。                                                       |
| `loader`     | `loader\|l [output-path]`                 | 生成一个 loader 仓库。                                                             |
| `plugin`     | `plugin\|p [output-path]`                 | 生成一个 plugin 仓库。                                                             |
| `serve`      | `serve\|s [options]`                      | 运行 `webpack-dev-server`.                                                       |
| `version`    | `version\|v [commands...]`                | 输出 `webpack`，`webpack-cli` 以及 `webpack-dev-server` 的版本信息。                |
| `watch`      | `watch\|w [entries...] [options]`         | 运行 webpack 并监听文件变化。                                                       |

## Flags {#flags}

webpack-cli 提供了许多 flag 来使 webpack 的工作变得简单。默认情况下，webpack 提供了以下 flag：

注意：这些是 webpack v4 的 flag，从 v5 开始 CLI 开始支持 [核心 flags](/api/cli/#core-flags)。

| Flag / 别名        | 类型            | 描述                                                                                                    |
| ------------------- | --------------- | -------------------------------------------------------------------------------------------------------------- |
| `--entry`           | string[]        | 应用程序的入口文件，例如 `./src/main.js`                                 |
| `--config, -c`      | string[]        | 提供 webpack 配置文件的路径，例如 `./webpack.config.js`                  |
| `--config-name`     | string[]        | 要使用的配置名                                                         |
| `--name`            | string        | 配置名称，在加载多个配置时使用                                            |
| `--color`           | boolean         | 启用控制台颜色                                                         |
| `--merge, -m`       | boolean         | 使用 webpack-merge 合并两个配置文件，例如 `-c ./webpack.config.js -c ./webpack.test.config.js` |
| `--env`             | string[]        | 当它是一个函数时，传递给配置的环境变量                                     |
| `--progress`        | boolean, string | 在构建过程中打印编译进度                                                 |
| `--help`            | boolean         | 输出所有支持的 flag 和命令                                              |
| `--output-path, -o` | string          | webpack 生成文件的输出位置，例如 `./dist`                                |
| `--target, -t`      | string[]          | 设置要构建的 target                                                    |
| `--watch, -w`       | boolean         | 监听文件变化                                                           |
| `--watch-options-stdin` | boolean     | stdin stream 结束时，停止监听                                                                  |
| `--hot, -h`         | boolean         | 启用 HMR                                                              |
| `--devtool, -d`     | string          | 控制是否生成 source map，以及如何生成                                     |
| `--prefetch`        | string          | 预先发生请求                                                            |
| `--json, -j`        | boolean, string | 将结果打印成 JSON 格式或存储在文件中                                       |
| `--mode`            | string          | 定义 webpack 所需的 mode                                                |
| `--version, -v`     | boolean         | 获取当前 cli 版本                                                       |
| `--stats`           | boolean, string | 它告诉 webpack 如何处理 stats                                            |
| `--analyze`         | boolean         | 它调用 `webpack-bundle-analyzer` 插件来获取 bundle 信息                   |

### Negated Flags {#negated-flags}

| Flag       | 描述                                                   |
| ---------- | ------------------------------------------------------------- |
| --no-color | 禁用控制台颜色                                                   |
| --no-hot   | 如果你通过配置启用了 HMR，则禁用它                                 |
| --no-stats | 禁用任何由 webpack emit 出来的 stats                             |
| --no-watch | 禁用文件变更的监听                                               |
| --no-devtool | 禁止生成 source maps                                         |

### 核心 Flags {#core-flags}

从 CLI v4 和 webpack v5 开始，CLI 将采用从 webpack 的 core 中导入整个配置的模式，允许 CLI 调整几乎所有配置项。

**链接中是 webpack v5 和 CLI v4 支持的所有核心 flag 列表 - [详戳](https://github.com/webpack/webpack-cli/blob/master/OPTIONS.md)**

例如，如果你想在项目中启用性能提示，你需在配置中使用[此](/configuration/performance/#performancehints)选项，而如果使用核心 flag，你可以这样做：

```bash
npx webpack --performance-hints warning
```

## 用法 {#usage}

### 使用配置文件 {#with-configuration-file}

```bash
npx webpack [--config webpack.config.js]
```

配置文件中的相关选项，请参阅[配置](/configuration)。

### 不使用配置文件 {#without-configuration-file}

```bash
npx webpack --entry <entry> -o <output-path>
```

**example**

```bash
npx webpack --entry ./first.js --entry ./second.js --output-path /build
```

**`<entry>`**

构建项目时入口可以配置一个文件名或一组被命名过的文件名。你可以传递多个入口（每个入口在启动时加载）。
如下是通过 CLI 指定 entry 的多种方式：

```bash
npx webpack ./first-entry.js
```

```bash
npx webpack --entry ./first-entry.js
```

```bash
npx webpack ./first-entry.js ./other-entry.js
```

```bash
npx webpack --entry ./first-entry.js ./other-entry.js
```

T> 使用 `webpack [command] [entries...] [option]` 语法，主要是因为某些选项支持接受多个值。因此，你可以用 `webpack --target node ./entry.js` 表示 `target: ['node', './file.js']`。

**`<output>`**

用于存储构建后的文件路径。它将映射到配置选项 `output.path`。

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
npx webpack ./src/index.js -o dist
```

这将对源码进行打包，其入口为 `index.js`，且 bundle 文件的输出路径为 `dist`。

```bash
asset main.js 142 bytes [compared for emit] [minimized] (name: main)
./src/index.js 30 bytes [built] [code generated]
./src/others.js 1 bytes [built] [code generated]
webpack 5.1.0 compiled successfully in 187 ms
```

```bash
npx webpack ./src/index.js ./src/others2.js -o dist/
```

以多个入口的方式打包文件

```bash
asset main.js 142 bytes [compared for emit] [minimized] (name: main)
./src/index.js 30 bytes [built] [code generated]
./src/others2.js 1 bytes [built] [code generated]
./src/others.js 1 bytes [built] [code generated]
webpack 5.1.0 compiled successfully in 198 ms
```

## 默认配置 {#default-configurations}

CLI 会在你的项目路径中寻找默认配置，以下是 CLI 采集到的配置文件。

此处按顺序递增进行优先级查询：

> 示例 —— 配置文件的查找顺序 .webpack/webpackfile > .webpack/webpack.config.js > webpack.config.js

```txt
'webpack.config',
'.webpack/webpack.config',
'.webpack/webpackfile',
```

## 通用配置 {#common-options}

W> 注意，命令行接口（Command Line Interface）参数的优先级，高于配置文件参数。例如，如果将 [`--mode="production"`](/configuration/mode/#usage) 传入 webpack CLI，而配置文件使用的是 `development`，最终会使用 `production`。

### help {#help}

**列出命令行可用的基础命令和 flag**

通过 `webpack help [command] [option]` 以及 `webpack [command] --help` 均可获得帮助信息：

```bash
npx webpack --help

# or

npx webpack help
```

**列出所有 cli 支持的命令和 flag**

```bash
npx webpack --help=verbose
```

**查看特定命令或选项的帮助**：

```bash
npx webpack help --mode
```

### version {#version}

**显示已安装的 package 以及子 package 的版本**。

如需检查你正在使用的 `webpack` 和 `webpack-cli` 的版本，只需运行如下命令：

```bash
npx webpack --version

# or

npx webpack version
```

运行结果如下：

```bash
webpack 5.11.1
webpack-cli 4.3.1
```

若已安装 `webpack-dev-server`，其版本信息会一并输出：

```bash
webpack 5.11.1
webpack-cli 4.3.1
webpack-dev-server 3.11.1
```

如需检查 `webpack-cli` 子包的版本（如 `@webpack-cli/init`），只需运行如下命令：

```bash
npx webpack init --version
```

运行结果如下：

```bash
@webpack-cli/init 1.0.3
webpack-cli 4.2.0
webpack 5.4.0
```

### config {#config}

**使用配置文件进行构建**

配置文件默认为 `webpack.config.js`，还可以指定其它的[配置](/configuration)文件。

```bash
npx webpack --config example.config.js
```

### config-name {#config-name}

如果你的配置文件导出了多个配置，你可以使用 `--config-name` 来指定要运行的配置。

如果你的 `webpack.config.js` 如下：

```js
module.exports = [
  {
    output: {
      filename: './dist-first.js',
    },
    name: 'first',
    entry: './src/first.js',
    mode: 'development',
  },
  {
    output: {
      filename: './dist-second.js',
    },
    name: 'second',
    entry: './src/second.js',
    mode: 'development',
  },
  {
    output: {
      filename: './dist-third.js',
    },
    name: 'third',
    entry: './src/third.js',
    mode: 'none',
    stats: 'verbose',
  },
];
```

并且只想运行第二个配置项：

```bash
npx webpack --config-name second
```

你也可以传递多个值来实现：

```bash
npx webpack --config-name first --config-name second
```

### merge {#merge}

你可以通过 `--merge` 选项来合并两个或多个不同的 webpack 配置：

```bash
npx webpack --config ./first.js --config ./second.js --merge
```

### json {#json}

**以 JSON 格式输出 webpack 的运行结果**

```bash
npx webpack --json
```

**如果你想把 stats 数据存储为 JSON 而非输出，你可以使用：**

```bash
npx webpack --json stats.json
```

在其他情况下，webpack 会打印出 bundle、chunk 以及 timing 细节的 stats 信息。使用此选项，会输出 JSON 对象。这个输出结果可以被 webpack 的 [analyse 工具](https://webpack.github.io/analyse/)，或者 chrisbateman 的 [webpack-visualizer](https://chrisbateman.github.io/webpack-visualizer/)，再或者 th0r 的 [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) 所识别。analyse 工具会接收 JSON，并以图形的形式展示所有构建的细节。

T> 请查阅 [stats 数据 api](/api/stats)，了解更多关于生成的 stats 数据。

## Environment 选项 {#environment-options}

当 webpack 配置[导出为函数时](/configuration/configuration-types/#exporting-a-function)，会接收到一个 "environment" 的参数。

```bash
npx webpack --env production    # env.production = true
```

`--env` 参数可以接收多个值：

| Invocation                                                       | Resulting environment                          |
| ---------------------------------------------------------------- | ---------------------------------------------- |
| `npx webpack --env prod`                                         | `{ prod: true }`                               |
| `npx webpack --env prod --env min`                               | `{ prod: true, min: true }`                    |
| `npx webpack --env platform=app --env production`                | `{ platform: "app", production: true }`        |
| `npx webpack --env app.platform="staging" --env app.name="test"` | `{ app: { platform: "staging", name: "test" }` |

T> 请查阅 [environment 变量指南](/guides/environment-variables/)了解更多信息及用法。

### NODE_ENV {#node-env}

你可以使用 `--node-env` 选项来设置 `process.env.NODE_ENV`:

```bash
npx webpack --node-env production   # process.env.NODE_ENV = 'production'
```

T> 如果你不明确的设置 mode，`mode` 选项的值会被 `--node-env` 覆盖。例如 `--node-env production` 时，会把 `process.env.NODE_ENV` 和 `mode` 均设置为 `'production'`。

## 配置选项 {#configuration-options}

| 参数       | 说明                                                    | 输入类型 | 默认值                                             |
| --------------- | -------------------------------------------------------------- | ---------- | --------------------------------------------------- |
| `--config`      | 配置文件的路径                                 | string[]     | [默认配置](/api/cli/#default-configurations) |
| `--config-name` | 要使用的配置名                               | string[]     |
| `--env`         | 当配置文件为函数时，environment 将作为参数传递给配置  | string[]        |

## 分析 Bundle {#analyzing-bundle}

你可以使用 `webpack-bundle-analyzer` 插件来分析你 webpack 输出的 bundle。你还可以通过 CLI 的 `--analyze` flag 调用它

```bash
npx webpack --analyze
```

W> 请确保你的项目中安装了 `webpack-bundle-analyzer`，否则 CLI 会提示你安装它。

## Progress {#progress}

如需查看 webpack 的编译进度，你可以使用 `--progress` flag。

```bash
npx webpack --progress
```

如需收集编译过程中每一步的 profile 数据，你可以将 `profile` 作为值传递给 `--progress` flag。

```bash
npx webpack --progress=profile
```

## 将 CLI 参数传递给 Node.js {#pass-cli-arguments-to-nodejs}

将参数直接传递给 Node.js 进程，你可以使用 `NODE_OPTIONS` 选项。

例如，将 Node.js 进程的内存限制增加到 4 GB。

```bash
NODE_OPTIONS="--max-old-space-size=4096" webpack
```

此外，你也可以将多个选项传递给 Node.js 进程。

```bash
NODE_OPTIONS="--max-old-space-size=4096 -r /path/to/preload/file.js" webpack
```

## 退出代码及其含义 {#exit-codes-and-their-meanings}

| 退出代码 | 描述                                        |
| --------- | -------------------------------------------------- |
<<<<<<< HEAD
| `0`       | 成功                                            |
| `1`       | webpack Error                                |
| `2`       | 配置/选项问题，或者内部错误 |
=======
| `0`       | Success                                            |
| `1`       | Errors from webpack                                |
| `2`       | Configuration/options problem or an internal error |

## Environment Variables

| Environment Variable | Description                                  |
| -------------------- | -------------------------------------------- |
| `WEBPACK_SERVE`      | `true` if `serve\|s` is being used.          |
| `WEBPACK_BUILD`      | `true` if `build\|bundle\|b` is being used.  |
| `WEBPACK_WATCH`      | `true` if `--watch\|watch\|w` is being used. |

You can use the above environment variables inside your webpack configuration:

```javascript
module.exports = (env, argv) => {
  return {
    mode: env.WEBPACK_SERVE ? 'development' : 'production',
  };
};
```

W> You can not access these environment variables inside bundled code.
>>>>>>> 02213e4bfb40c7571a086a66ddd5c3f0dca1def8
