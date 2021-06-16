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



> 一个为 webpack 提供的 Stylelint 插件

## 安装 {#install}

```bash
npm install stylelint-webpack-plugin --save-dev
```

**注意**：如果你还没有安装 `stylelint`，请先用 npm 进行安装：

```bash
npm install stylelint --save-dev
```

## 用法 {#usage}

在你的 webpack 配置中：

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

<<<<<<< HEAD
### `files` {#files}

- 类型：`String|Array[String]`
- 默认值：`'**/*.(s(c|a)ss|css)'`

指定查找文件的全局模式。必须相对于 `options.context`。
=======
### `exclude`

- Type: `String|Array[String]`
- Default: `'node_modules'`

Specify the files and/or directories to exclude. Must be relative to `options.context`.

### `extensions`

- Type: `String|Array[String]`
- Default: `['css', 'scss', 'sass']`

Specify extensions that should be checked.

### `files`

- Type: `String|Array[String]`
- Default: `null`

Specify directories, files, or globs. Must be relative to `options.context`. Directories are traveresed recursively looking for files matching `options.extensions`. File and glob patterns ignore `options.extensions`.
>>>>>>> 36213856d02a28037a420823ef06aac0b045a3ee

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

<<<<<<< HEAD
### Errors 和 Warning {#errors-and-warning}
=======
### `threads`

- Type: `Boolean | Number`
- Default: `false`

Set to true for an auto-selected pool size based on number of cpus. Set to a number greater than 1 to set an explicit pool size. Set to false, 1, or less to disable and only run in main process.

### Errors and Warning
>>>>>>> 36213856d02a28037a420823ef06aac0b045a3ee

**默认情况下，插件将根据 stylelint 错误/警告数量自动调整错误报告。**
你仍然可以使用 `emitError` **或** `emitWarning` 选项来强制改变这种默认行为。

#### `emitError` {#emiterror}

- 类型：`Boolean`
- 默认值：`false`

<<<<<<< HEAD
如果设置为 `true`，将总是返回 errors。
=======
The errors found will always be emitted, to disable set to `false`.
>>>>>>> 36213856d02a28037a420823ef06aac0b045a3ee

#### `emitWarning` {#emitwarning}

- 类型：`Boolean`
- 默认值：`false`

<<<<<<< HEAD
如果设置为 `true`，将总是返回 warnings。
=======
The warnings found will always be emitted, to disable set to `false`.
>>>>>>> 36213856d02a28037a420823ef06aac0b045a3ee

#### `failOnError` {#failonerror}

- 类型：`Boolean`
- 默认值：`false`

<<<<<<< HEAD
如果设置为 `true`，出现任何 errors 都将会导致模块构建失败。
=======
Will cause the module build to fail if there are any errors, to disable set to `false`.
>>>>>>> 36213856d02a28037a420823ef06aac0b045a3ee

#### `failOnWarning` {#failonwarning}

- 类型：`Boolean`
- 默认值：`false`

如果设置为 `true`，出现任何 warnings 都将会导致模块构建失败。

#### `quiet` {#quiet}

- 类型：`Boolean`
- 默认值：`false`

如果设置为 `true`，则仅处理和报告 errors，并忽略 warnings。

<<<<<<< HEAD
## Changelog {#changelog}
=======
#### `outputReport`

- Type: `Boolean|Object`
- Default: `false`

Write the output of the errors to a file, for example a `json` file for use for reporting.
The `filePath` is relative to the webpack config: `output.path`.
You can pass in a different formatter for the output file, if none is passed in the default/configured formatter will be used.

```js
{
  filePath: 'path/to/file';
  formatter: 'json';
}
```

## Changelog
>>>>>>> 36213856d02a28037a420823ef06aac0b045a3ee

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
