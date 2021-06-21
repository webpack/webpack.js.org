---
title: StylelintWebpackPlugin
group: webpack contrib
source: https://raw.githubusercontent.com/webpack-contrib/stylelint-webpack-plugin/master/README.md
edit: https://github.com/webpack-contrib/stylelint-webpack-plugin/edit/master/README.md
repo: https://github.com/webpack-contrib/stylelint-webpack-plugin
---


[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]



> A Stylelint plugin for webpack

## Install

```bash
npm install stylelint-webpack-plugin --save-dev
```

**Note**: You also need to install `stylelint` from npm, if you haven't already:

```bash
npm install stylelint --save-dev
```

## Usage

In your webpack configuration:

```js
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  // ...
  plugins: [new StylelintPlugin(options)],
  // ...
};
```

## Options

See [stylelint's options](http://stylelint.io/user-guide/node-api/#options) for the complete list of options available. These options are passed through to the `stylelint` directly.

### `configFile`

- Type: `String`
- Default: `undefined`

Specify the config file location to be used by `stylelint`.

**Note:** By default this is [handled by `stylelint`](http://stylelint.io/user-guide/configuration/).

### `context`

- Type: `String`
- Default: `compiler.context`

A string indicating the root of your files.

### `exclude`

- Type: `String|Array[String]`
- Default: `['node_modules', compiler.options.output.path]`

Specify the files and/or directories to exclude. Must be relative to `options.context`.

### `extensions`

- Type: `String|Array[String]`
- Default: `['css', 'scss', 'sass']`

Specify extensions that should be checked.

### `files`

- Type: `String|Array[String]`
- Default: `null`

Specify directories, files, or globs. Must be relative to `options.context`. Directories are traveresed recursively looking for files matching `options.extensions`. File and glob patterns ignore `options.extensions`.

### `fix`

- Type: `Boolean`
- Default: `false`

If `true`, `stylelint` will fix as many errors as possible. The fixes are made to the actual source files. All unfixed errors will be reported. See [Autofixing errors](https://stylelint.io/user-guide/cli#autofixing-errors) docs.

### `formatter`

- Type: `String|Function`
- Default: `'string'`

Specify the formatter that you would like to use to format your results. See [formatter option](https://stylelint.io/user-guide/node-api#formatter).

### `lintDirtyModulesOnly`

- Type: `Boolean`
- Default: `false`

Lint only changed files, skip lint on start.

### `stylelintPath`

- Type: `String`
- Default: `stylelint`

Path to `stylelint` instance that will be used for linting.

### `threads`

- Type: `Boolean | Number`
- Default: `false`

Set to true for an auto-selected pool size based on number of cpus. Set to a number greater than 1 to set an explicit pool size. Set to false, 1, or less to disable and only run in main process.

### Errors and Warning

**By default the plugin will auto adjust error reporting depending on stylelint errors/warnings counts.**
You can still force this behavior by using `emitError` **or** `emitWarning` options:

#### `emitError`

- Type: `Boolean`
- Default: `false`

The errors found will always be emitted, to disable set to `false`.

#### `emitWarning`

- Type: `Boolean`
- Default: `false`

The warnings found will always be emitted, to disable set to `false`.

#### `failOnError`

- Type: `Boolean`
- Default: `false`

Will cause the module build to fail if there are any errors, to disable set to `false`.

#### `failOnWarning`

- Type: `Boolean`
- Default: `false`

Will cause the module build to fail if there are any warnings, if set to `true`.

#### `quiet`

- Type: `Boolean`
- Default: `false`

Will process and report errors only and ignore warnings, if set to `true`.

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

[Changelog](https://github.com/webpack-contrib/stylelint-webpack-plugin/blob/master/CHANGELOG.md)

## License

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
