---
title: eslint-loader
source: https://raw.githubusercontent.com/webpack-contrib/eslint-loader/master/README.md
edit: https://github.com/webpack-contrib/eslint-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/eslint-loader
---


[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]



> 用于 Webpack 的 ESlint loader

## 安装

```bash
npm install eslint-loader --save-dev
```

**注意**：如果还未安装 `eslint`，请先从 npm 进行安装：

```bash
npm install eslint --save-dev
```

## 用法

在你的 webpack 设置中添加下列配置：

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          // eslint options (if necessary)
        },
      },
    ],
  },
  // ...
};
```

当使用转译 loaders（如 `babel-loader`）时，请确保它们的顺序正确（从下到上）。否则，文件将会在 `babel-loader` 转译后被读取：

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
  // ...
};
```

安全起见，你可以使用 `enforce: 'pre'` 片段来处理源文件，确保其没有被其他 loader（例如 `babel-loader`）修改：

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  // ...
};
```

## 选项

你可以通过标准 webpack [loader 选项](/configuration/module/#useentry)传递[ eslint 选项](http://eslint.org/docs/developer-guide/nodejs-api#cliengine)。

**注意**：你提供的配置选项将被传递给`CLIEngine`。这是与在 `package.json` 或 `.eslintrc` 中指定的选项不同的一组选项。查阅 [eslint 文档](http://eslint.org/docs/developer-guide/nodejs-api#cliengine)以获取更多相关信息。

### `cache`

- Type: `Boolean|String`
- Default: `false`

此选项启用后，会将 lint 后的结果缓存至文件中。这对于在完整构建时减少 lint 所花费的时间上非常有用。

这可以是一个 `boolean` 值，也可以是缓存目录路径（如：`'./.eslint-loader-cache'`）。

如果使用 `cache: true` 的话，缓存将被写入 `./node_modules/.cache/eslint-loader` 目录，这是推荐的用法。

```js
module.exports = {
  entry: '...',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          cache: true,
        },
      },
    ],
  },
};
```

### `eslintPath`

- Type: `String`
- Default: `eslint`

用于 linting 的 `eslint` 实例路径。如果 `eslintPath` 是官方 eslint 的文件夹，或已经指定了 `formatter` 选项，此时你无需安装 `eslint`。

```js
module.exports = {
  entry: '...',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          eslintPath: path.join(__dirname, 'reusable-eslint'),
        },
      },
    ],
  },
};
```

### `fix`

- Type: `Boolean`
- Default: `false`

此选项将会启用 [ESLint 自动修复功能](http://eslint.org/docs/user-guide/command-line-interface#fix).

**请注意: 该选项会更改源文件。**

```js
module.exports = {
  entry: '...',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
      },
    ],
  },
};
```

### `formatter`

- Type: `String|Function`
- Default: `stylish`

该选项接受一个具有一个参数的函数：eslint 信息（对象）数组。该函数必须以字符串形式返回输出。你可以使用官方的 [eslint 格式化程序](https://eslint.org/docs/user-guide/formatters/)。

```js
module.exports = {
  entry: '...',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          // several examples !

          // default value
          formatter: 'stylish',

          // community formatter
          formatter: require('eslint-friendly-formatter'),

          // custom formatter
          formatter: function (results) {
            // `results` format is available here
            // http://eslint.org/docs/developer-guide/nodejs-api.html#executeonfiles()

            // you should return a string
            // DO NOT USE console.*() directly !
            return 'OUTPUT';
          },
        },
      },
    ],
  },
};
```

### 错误与警告

**默认情况下，加载程序将根据 eslint 错误/警告计数自动调整错误报告。** 你仍然可以通过使用 `emitError` **或** `emitWarning` 选项来强制启用这种行为

#### `emitError`

- Type: `Boolean`
- Default: `false`

如果此选项设置为 `true`，将始终返回错误。

```js
module.exports = {
  entry: '...',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitError: true,
        },
      },
    ],
  },
};
```

#### `emitWarning`

- Type: `Boolean`
- Default: `false`

如果此选项设置为 `true`，将会始终返回警告。**如果你正在使用热模块替换，你可能希望在开发中启用此功能，否则在出现 eslint 错误时将会跳过此更新。**

```js
module.exports = {
  entry: '...',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        },
      },
    ],
  },
};
```

#### `failOnError`

- Type: `Boolean`
- Default: `false`

如果此选项被设定为 `true`，在出现任何错误时都会导致模块构建失败。

```js
module.exports = {
  entry: '...',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          failOnError: true,
        },
      },
    ],
  },
};
```

#### `failOnWarning`

- Type: `Boolean`
- Default: `false`

如果此选项被设定为 `true`，在出现任何警告时都会导致模块构建失败。

```js
module.exports = {
  entry: '...',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          failOnWarning: true,
        },
      },
    ],
  },
};
```

#### `quiet`

- Type: `Boolean`
- Default: `false`

如果此选项被设定为 `true`，警告会被忽略，且只会处理和报告错误。

```js
module.exports = {
  entry: '...',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          quiet: true,
        },
      },
    ],
  },
};
```

#### `outputReport`

- Type: `Boolean|Object`
- Default: `false`

将错误的输出写入文件，例如用于在 Jenkins CI 上进行报告的 checkstyle xml 文件。

`filePath` 是一个绝对路径，或相对于 webpack 配置 `output.path` 的相对路径。你可以为输出文件传递不同的 `formatter`，如果没有传入，默认/配置后的 formatter 将会被启用。

```js
module.exports = {
  entry: '...',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          outputReport: {
            filePath: 'checkstyle.xml',
            formatter: 'checkstyle',
          },
        },
      },
    ],
  },
};
```

## 陷阱

### NoEmitOnErrorsPlugin

当模式未被配置，或运行在生产环境下时，会在 webpack4 中自动启用 `NoEmitOnErrorsPlugin`。因此，无论 `eslint-loader` 中使用了什么错误配置，即使 ESLint 抛出警告也会导致构建失败，除非启用了 `emitWarning`。

### 定义 `configFile` 或使用 `eslint -c path/.eslintrc`

请记住，当你定义 `configFile` 时，`eslint` 不会在需要 lint 的文件目录中自动查找 `.eslintrc`。更多信息请参阅 eslint 官方文档中的此章节[_使用配置文件_](http://eslint.org/docs/user-guide/configuring#using-configuration-files)，以及此 issue [#129](https://github.com/webpack-contrib/eslint-loader/issues/129)。

## Changelog

[Changelog](https://github.com/webpack-contrib/eslint-loader/blob/master/CHANGELOG.md)

## License

[MIT](https://github.com/webpack-contrib/eslint-loader/blob/master/LICENSE)

[npm]: https://img.shields.io/npm/v/eslint-loader.svg
[npm-url]: https://npmjs.com/package/eslint-loader
[node]: https://img.shields.io/node/v/eslint-loader.svg
[node-url]: https://nodejs.org/
[deps]: https://david-dm.org/webpack-contrib/eslint-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/eslint-loader
[tests]: https://github.com/webpack-contrib/eslint-loader/workflows/eslint-loader/badge.svg
[tests-url]: https://github.com/webpack-contrib/eslint-loader/actions
[cover]: https://codecov.io/gh/webpack-contrib/eslint-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/eslint-loader
[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=eslint-loader
[size-url]: https://packagephobia.now.sh/result?p=eslint-loader
