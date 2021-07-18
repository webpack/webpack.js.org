---
title: StylelintWebpackPlugin
group: webpack contrib
source: https://raw.githubusercontent.com/webpack-contrib/stylelint-webpack-plugin/master/README.md
edit: https://github.com/webpack-contrib/stylelint-webpack-plugin/edit/master/README.md
repo: https://github.com/webpack-contrib/stylelint-webpack-plugin
translators:
  - fine-bot
---


[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]



该插件使用 [`stylelint`](https://stylelint.io/) 帮助你在样式代码中避免错误并强制规范。

## Getting Started {#getting-started}

首先，你需要安装 `stylelint-webpack-plugin`：

```bash
npm install stylelint-webpack-plugin --save-dev
```

**注意**：如果你还没有安装 `stylelint >= 13`，请先用 npm 进行安装：

```bash
npm install stylelint --save-dev
```

然后添加该插件到你的 webpack 配置中。例如：

```js
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  // ...
  plugins: [new StylelintPlugin(options)],
  // ...
};
```

## 选项 {#options}

有关可用选项的完整列表请参阅 [styleint 的选项](http://stylelint.io/user-guide/node-api/#options)，这些选项直接传递给 `stylelint`。

### `configFile` {#configfile}

- 类型：`String`
- 默认值：`undefined`

指定 `stylelint` 配置文件的位置。

**注意：** 默认情况下由 [`stylelint` 处理](http://stylelint.io/user-guide/configuration/)。

### `context` {#context}

- 类型：`String`
- 默认值：`compiler.context`

指定文件根目录的字符串。

### `exclude` {#exclude}

- 类型：`String|Array[String]`
- 默认值：`['node_modules', compiler.options.output.path]`

指定要忽略的文件或目录。必须相对于 `options.context`。

### `extensions` {#extensions}

- 类型：`String|Array[String]`
- 默认值：`['css', 'scss', 'sass']`

指定要检查的扩展名。

### `files` {#files}

- 类型：`String|Array[String]`
- 默认值：`'**/*.(s(c|a)ss|css)'`

可指定为目录，文件名或 globs。目录会递归地寻找与 `options.extensions` 相匹配的文件。文件名和 glob 模式将忽略 `options.extensions`。

### `fix` {#fix}

- 类型：`Boolean`
- 默认值：`false`

如果值为 `true`，`stylelint` 将修复尽可能多的 error。修复真实的源文件。报告所有未修复的 errors。请参阅 [自动修复错误](https://stylelint.io/user-guide/cli#autofixing-errors) 文档。

### `formatter` {#formatter}

- 类型：`String|Function`
- 默认值：`'string'`

指定要用于格式化结果的 formatter。请参阅 [formatter 选项](https://stylelint.io/user-guide/node-api#formatter)。

### `lintDirtyModulesOnly` {#lintdirtymodulesonly}

- 类型：`Boolean`
- 默认值：`false`

仅检查有变化的文件，启动时跳过检查。

### `stylelintPath` {#stylelintpath}

- 类型：`String`
- 默认值：`stylelint`

将要用来做检查的 `stylelint` 实例的路径。

### `threads` {#threads}

- 类型：`Boolean | Number`
- 默认值：`false`

设置为 `true` 时，会根据 cpu 的数量自动决定池子的大小。设置为大于 1 的数字时，可以确定池子的大小。设置为 `false`、1 或更小时，会禁用池子，并只在主线程运行。

### Errors 和 Warning {#errors-and-warning}

**默认情况下，插件将根据 stylelint 错误/警告数量自动调整错误报告。**
你仍然可以使用 `emitError` **或** `emitWarning` 选项来强制改变这种默认行为。

#### `emitError` {#emiterror}

- 类型：`Boolean`
- 默认值：`false`

如遇到错误将会被直接输出，如需禁用，请设置为 `false`。

#### `emitWarning` {#emitwarning}

- 类型：`Boolean`
- 默认值：`false`

如遇到警告将会被直接输出，如需禁用，请设置为 `false`。

#### `failOnError` {#failonerror}

- 类型：`Boolean`
- 默认值：`false`

如果有任何错误，都将导致模块构建失败，如需禁用，请设置为 `false`。

#### `failOnWarning` {#failonwarning}

- 类型：`Boolean`
- 默认值：`false`

如果设置为 `true`，出现任何 warnings 都将会导致模块构建失败。

#### `quiet` {#quiet}

- 类型：`Boolean`
- 默认值：`false`

如果设置为 `true`，则仅处理和报告 errors，并忽略 warnings。

#### `outputReport` {#outputreport}

- 类型：`Boolean|Object`
- 默认值：`false`

将输出的错误写入文件，例如，用于上报的 `json` 文件。
其 `filePath` 会相对于 webpack 配置中的：`output.path`.
你可以为输出文件设置不同的 `formatter`，如果未设置，则将使用默认 `formatter`。

```js
{
  'path/to/file';
  'json';
}
```

## Changelog {#changelog}

[Changelog](https://github.com/webpack-contrib/stylelint-webpack-plugin/blob/master/CHANGELOG.md)

## License {#license}

[MIT](https://github.com/webpack-contrib/stylelint-webpack-plugin/blob/master/LICENSE)

[npm]: https://img.shields.io/npm/v/stylelint-webpack-plugin.svg
[npm-url]: https://npmjs.com/package/stylelint-webpack-plugin
[node]: https://img.shields.io/node/v/stylelint-webpack-plugin.svg
[node-url]: https://nodejs.org
[deps]: https://david-dm.org/webpack-contrib/stylelint-webpack-plugin.svg
[deps-url]: https://david-dm.org/webpack-contrib/stylelint-webpack-plugin
[tests]: https://github.com/webpack-contrib/stylelint-webpack-plugin/workflows/stylelint-webpack-plugin/badge.svg
[tests-url]: https://github.com/webpack-contrib/stylelint-webpack-plugin/actions
[cover]: https://codecov.io/gh/webpack-contrib/stylelint-webpack-plugin/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/stylelint-webpack-plugin
[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=stylelint-webpack-plugin
[size-url]: https://packagephobia.now.sh/result?p=stylelint-webpack-plugin
