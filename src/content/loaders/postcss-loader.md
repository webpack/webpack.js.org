---
title: postcss-loader
source: https://raw.githubusercontent.com/webpack-contrib/postcss-loader/master/README.md
edit: https://github.com/webpack-contrib/postcss-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/postcss-loader
translators:
  - wangjq4214
  - QC-L
  - jacob-lcs
---

</div>

[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]
[![size][size]][size-url]

Webpack chat: [![chat][chat]][chat-url]

PostCSS chat: [![chat-postcss][chat-postcss]][chat-postcss-url]



使用 [`PostCSS`](https://github.com/postcss/postcss) 处理 CSS 的 loader。

## 快速开始 {#getting-started}

如果要使用最新版本的话，你需要使用 webpack v5。如果使用 webpack v4 的话，你需要安装 postcss-loader v4。

为了使用本 loader，你需要安装 `postcss-loader` 和 `postcss`：

```console
npm install --save-dev postcss-loader postcss
```

然后添加本 loader 的相关配置到你的 `webpack` 的配置文件。例如：

**file.js**

```js
import css from 'file.css';
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // 其他选项
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
    ],
  },
};
```

或者使用 PostCSS 本身的 [配置文件](#config)：

**postcss.config.js**

```js
module.exports = {
  plugins: [
    [
      'postcss-preset-env',
      {
        // 其他选项
      },
    ],
  ],
};
```

Loader 将会**自动**搜索配置文件。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
};
```

最后，通过你喜欢的方式运行 `webpack`。

## 选项 {#options}

|                名称                 |         类型         |          默认值           | 描述                                      |
| :---------------------------------: | :------------------: | :-----------------------: | :---------------------------------------- |
|        [`execute`](#execute)        |     `{Boolean}`      |        `undefined`        | 在 `CSS-in-JS` 中启动 PostCSS Parser 支持 |
| [`postcssOptions`](#postcssoptions) | `{Object\|Function}` | `Postcss.process的默认值` | 设置 `PostCSS` 选项与插件                 |
|      [`sourceMap`](#sourcemap)      |     `{Boolean}`      |    `compiler.devtool`     | 开启 / 关闭 source map 的生成             |
| [`implementation`](#implementation) | `{Function\|String}` |               `postcss`               | 为 PostCSS 设置对应实现并使用          |

### `execute`

类型：`Boolean`
默认值：`undefined`

如果你在 JS 文件中编写样式，请使用 [`postcss-js`](https://github.com/postcss/postcss-js) parser，并且添加 `execute` 选项。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.style.js$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                parser: 'postcss-js',
              },
              execute: true,
            },
          },
        ],
      },
    ],
  },
};
```

### `postcssOptions` {#postcss-options}

类型：`Object|Function`
默认值：`undefined`

允许设置 [`PostCSS 选项`](http://api.postcss.org/global.html#processoptions) 和插件。

支持所有的 `PostCSS` 选项。
这是配置文件中特殊的 `配置` 选项。它如何工作、如何配置再接下来的部分将会有详细的描述。

因为可能会导致 source map 中错误的文件路径，我们不推荐使用指定的 `from`、`to` 和 `map` 选项。
如果你需要 source map，请使用 [`sourcemap`](#sourcemap) 选项。

#### `Object`

设置 `plugins`：

**webpack.config.js** (**recommended**)

```js
const myOtherPostcssPlugin = require('postcss-my-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.sss$/i,
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
              'postcss-import',
              ['postcss-short', { prefix: 'x' }],
              require.resolve('my-postcss-plugin'),
              myOtherPostcssPlugin({ myOption: true }),
              // 废弃的，将会在下一个主要版本中移除
              { 'postcss-nested': { preserveEmpty: true } },
            ],
          },
        },
      },
    ],
  },
};
```

**webpack.config.js** （**废弃的**，将会在下一个主要版本中移除）

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.sss$/i,
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: {
              'postcss-import': {},
              'postcss-short': { prefix: 'x' },
            },
          },
        },
      },
    ],
  },
};
```

设置 `syntax`：

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.sss$/i,
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            // 可以是 `String`
            syntax: 'sugarss',
            // 可以是 `Object`
            syntax: require('sugarss'),
          },
        },
      },
    ],
  },
};
```

设置 `parser`：

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.sss$/i,
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            // 可以是 `String`
            parser: 'sugarss',
            // 可以是 `Object`
            parser: require('sugarss'),
            // 可以是 `Function`
            parser: require('sugarss').parse,
          },
        },
      },
    ],
  },
};
```

设置 `stringifier`：

**webpack.config.js**

```js
const Midas = require('midas');
const midas = new Midas();

module.exports = {
  module: {
    rules: [
      {
        test: /\.sss$/i,
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            // 可以是 `String`
            stringifier: 'sugarss',
            // 可以是 `Object`
            stringifier: require('sugarss'),
            // 可以是 `Function`
            stringifier: midas.stringifier,
          },
        },
      },
    ],
  },
};
```

#### `Function`

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(css|sss)$/i,
        loader: 'postcss-loader',
        options: {
          postcssOptions: (loaderContext) => {
            if (/\.sss$/.test(loaderContext.resourcePath)) {
              return {
                parser: 'sugarss',
                plugins: [
                  ['postcss-short', { prefix: 'x' }],
                  'postcss-preset-env',
                ],
              };
            }

            return {
              plugins: [
                ['postcss-short', { prefix: 'x' }],
                'postcss-preset-env',
              ],
            };
          },
        },
      },
    ],
  },
};
```

#### `config` {#config}

类型：`Boolean|String`
默认值：`undefined`

允许使用配置文件设置选项。
在配置文件中指定的选项将会和 loader option 进行合并，并且 loader option 将会覆盖配置文件中的选项。

##### 配置文件 {#config-files}

Loader 将会从下面几个地方搜索目录树来寻找配置文件：

- `package.json` 中的 `postcss` 属性
- JSON 或者 YAML 格式的 `.postcssrc` 文件
- `.postcss.json`、`.postcss.yaml`、`.postcss.yml`、`.postcss.js` 或者 `.postcss.cjs` 文件
- `postcss.config.js` 或者 `postcss.config.cjs` 导出一个对象的 CommonJS 模块（**推荐**）

##### 配置文件示例 {#examples-of-config-files}

使用 `Object`：

**postcss.config.js**（**推荐**）

```js
module.exports = {
  // 你可以指定下面提到的所有选项 https://postcss.org/api/#processoptions
  // parser: 'sugarss',
  plugins: [
    // PostCSS 插件
    ['postcss-short', { prefix: 'x' }],
    'postcss-preset-env',
  ],
};
```

使用 `Function`：

**postcss.config.js**（**推荐**）

```js
module.exports = (api) => {
  // `api.file` - 文件路径
  // `api.mode` - webpack 的 `mode` 属性值，请查阅 https://webpack.js.org/configuration/mode/
  // `api.webpackLoaderContext` - 在复杂情况下使用的 loader 上下文
  // `api.env` - `api.mode` 的别名，与 `postcss-cli` 兼容
  // `api.options` - `postcssOptions` 的选项

  if (/\.sss$/.test(api.file)) {
    return {
      //你可以指定下面提到的所有选项 https://postcss.org/api/#processoptions here
      parser: 'sugarss',
      plugins: [
        // PostCSS 插件
        ['postcss-short', { prefix: 'x' }],
        'postcss-preset-env',
      ],
    };
  }

  return {
    // 你可以指定下面提到的所有选项 https://postcss.org/api/#processoptions
    plugins: [
      // PostCSS 插件
      ['postcss-short', { prefix: 'x' }],
      'postcss-preset-env',
    ],
  };
};
```

**postcss.config.js**（**废弃的**，将会在下一个主要版本中移除）

```js
module.exports = {
  // 你可以指定下面提到的所有选项 https://postcss.org/api/#processoptions
  // parser: 'sugarss',
  plugins: {
    // PostCSS 插件
    'postcss-short': { prefix: 'x' },
    'postcss-preset-env': {},
  },
};
```

##### 配置级联 {#config-cascade}

你可以在不同的目录中使用不同的 `postcss.config.js` 文件。
配置文件的寻找从 `path.dirname(file)` 开始根据文件树向上寻找，直至找到一个配置文件。

```
|– components
| |– component
| | |– index.js
| | |– index.png
| | |– style.css (1)
| | |– postcss.config.js (1)
| |– component
| | |– index.js
| | |– image.png
| | |– style.css (2)
|
|– postcss.config.js (1 && 2 (recommended))
|– webpack.config.js
|
|– package.json
```

在设置 `postcss.config.js` 之后，将 `postcss-loader` 添加到 `webpack.config.js` 中。
你可以单独使用它，或者与 `css-loader` 结合使用（推荐）。

在 `css-loader` 和 `style-loader` **之前**使用它，但是在其他预处理器（例如：`sass|less|stylus-loader`）**之后**使用 （因为 [webpack loader 从右到左 / 从底到顶执行](/concepts/loaders/#configuration)）。

**webpack.config.js** （**推荐**）

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
};
```

#### Boolean {#boolean}

开启 / 关闭自动加载配置。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            config: false,
          },
        },
      },
    ],
  },
};
```

#### String {#string}

允许指定配置文件路径。

**webpack.config.js**

```js
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            config: path.resolve(__dirname, 'custom.config.js'),
          },
        },
      },
    ],
  },
};
```

### `sourceMap` {#source-map}

类型：`Boolean`
默认值：依赖于 `compiler.devtool` 的值

默认情况下 source map 的生成依赖于 [`devtool`](/configuration/devtool/)选项。
除 `eval` 和 `false` 外，其他的值都将打开 source map 生成。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
};
```

替代设置：

**webpack.config.js**

```js
module.exports = {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
};
```

### `implementation` {#implementation}

类型：`Function | String`
默认值：`postcss`

特殊的 `implementation` 选项决定使用 PostCSS 哪个实现。重载本地安装的 `postcss` 的 `peerDependency` 版本。

**此选项只对底层工具的作者有效，以便于 PostCSS 7 到 PostCSS 8 的过渡。**

#### Function {#function}

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: { implementation: require('postcss') },
          },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
};
```

#### String {#string}

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: { implementation: require.resolve('postcss') },
          },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
};
```

## 例子 {#examples}

### SugarSS {#sugarss}

你需要安装 `sugarss`：

```console
npm install --save-dev sugarss
```

使用 [`SugarSS`](https://github.com/postcss/sugarss) 句法分析器。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.sss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                parser: 'sugarss',
              },
            },
          },
        ],
      },
    ],
  },
};
```

### Autoprefixer {#autoprefixer}

你需要安装 `autoprefixer`：

```console
npm install --save-dev autoprefixer
```

使用 [`autoprefixer`](https://github.com/postcss/autoprefixer) 添加厂商前缀。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                    {
                      // 选项
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
    ],
  },
};
```

> :warning: [`postcss-preset-env`](https://github.com/csstools/postcss-preset-env) 包含 [`autoprefixer`](https://github.com/postcss/autoprefixer)，因此如果你已经使用了 preset 就无需单独添加它了。更多 [信息](https://github.com/csstools/postcss-preset-env#autoprefixer)

### PostCSS Preset Env {#postcss-preset-env}

你需要安装 `postcss-preset-env`：

```console
npm install --save-dev postcss-preset-env
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // 选项
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
    ],
  },
};
```

### CSS Modules {#css-modules}

什么是 `CSS Modules`？请 [阅读](https://github.com/webpack-contrib/css-loader#modules)。

在 `postcss-loader` 中没有额外的设置。
为了使他们正常工作，请添加 `css-loader` 的 `importLoaders` 选项。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
};
```

### CSS-in-JS and [`postcss-js`](https://github.com/postcss/postcss-js) {#css-in-js-and-postcss-js}

你需要安装 `postcss-js`：

```console
npm install --save-dev postcss-js
```

如果你想处理写在 JavaScript 中的样式，那么你需要使用 [`postcss-js`](https://github.com/postcss/postcss-js) parser。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.style.js$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                parser: 'postcss-js',
              },
              execute: true,
            },
          },
          'babel-loader',
        ],
      },
    ],
  },
};
```

接下来你就可以像下面这样书写样式了

```js
import colors from './styles/colors';

export default {
  '.menu': {
    color: colors.main,
    height: 25,
    '&_link': {
      color: 'white',
    },
  },
};
```

> :warning: 如果你正在使用 Babel且为了程序正常工作，你需要进行下面的步骤：

> 1. 添加 [`babel-plugin-add-module-exports`](https://github.com/59naga/babel-plugin-add-module-exports) 到你的配置中。
> 2. 你需要在每一个样式模块中有一个**默认**导出。

### 提取 CSS {#extract-cssextractplugin}

使用 [`mini-css-extract-plugin`](/plugins/mini-css-extract-plugin/)。

**webpack.config.js**

```js
const isProductionMode = process.env.NODE_ENV === 'production';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: isProductionMode ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          isProductionMode ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isProductionMode ? '[name].[contenthash].css' : '[name].css',
    }),
  ],
};
```

### 触发资源打包 {#emit-assets}

要将资源从 PostCSS 插件写到 webpack，需要向 `result.messages` 中添加一条消息。

一条符合规范的消息应该包含下面的字段：

- `type` = `asset` - 消息类型（必需字段，并且应该为 `asset`）
- `file` - 文件名称（必需）
- `content` - 文件内容（必需）
- `sourceMap` - sourceMap
- `info` - 资源信息

**webpack.config.js**

```js
const customPlugin = () => (css, result) => {
  result.messages.push({
    type: 'asset',
    file: 'sprite.svg',
    content: '<svg>...</svg>',
  });
};

const postcssPlugin = postcss.plugin('postcss-assets', customPlugin);

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [postcssPlugin()],
              },
            },
          },
        ],
      },
    ],
  },
};
```

### 添加 dependencies、contextDependencies、buildDependencies、missingDependencies {#add-dependencies-contextdependencies-builddependencies-missingdependencies}

当需要在文件变化时进行重新编译时，webpack 为了理解这样的操作需要添加必要的依赖。

由两种方式添加依赖：

1. （推荐）。插件在 `result.messages` 中触发消息。

消息应该包含下面两个字段：

- `type` = `dependency` - 消息类型（必需字段，并且应该为 `dependency`、`context-dependency`、`build-dependency` 或 `missing-dependency`）
- `file` - 文件的绝对路径（必需）

**webpack.config.js**

```js
const path = require('path');

const customPlugin = () => (css, result) => {
  result.messages.push({
    type: 'dependency',
    file: path.resolve(__dirname, 'path', 'to', 'file'),
  });
};

const postcssPlugin = postcss.plugin('postcss-assets', customPlugin);

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [postcssPlugin()],
              },
            },
          },
        ],
      },
    ],
  },
};
```

2. 在插件中传递 `loaderContext`。

**webpack.config.js**

```js
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, 'path/to/postcss.config.js'),
              },
            },
          },
        ],
      },
    ],
  },
};
```

**postcss.config.js**

```js
module.exports = (api) => ({
  plugins: [
    require('path/to/customPlugin')({
      loaderContext: api.webpackLoaderContext,
    }),
  ],
});
```

**customPlugin.js**

```js
const path = require('path');

const customPlugin = (loaderContext) => (css, result) => {
  loaderContext.webpack.addDependency(
    path.resolve(__dirname, 'path', 'to', 'file')
  );
};

module.exports = postcss.plugin('postcss-assets', customPlugin);
```

## 贡献 {#contributing}

如果你还没有读过我们的贡献指南，请花一点时间阅读它。

[CONTRIBUTING](https://github.com/webpack-contrib/postcss-loader/blob/master/.github/CONTRIBUTING.md)

## License {#license}

[MIT](https://github.com/webpack-contrib/postcss-loader/blob/master/LICENSE)

[npm]: https://img.shields.io/npm/v/postcss-loader.svg
[npm-url]: https://npmjs.com/package/postcss-loader
[node]: https://img.shields.io/node/v/postcss-loader.svg
[node-url]: https://nodejs.org
[deps]: https://david-dm.org/webpack-contrib/postcss-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/postcss-loader
[tests]: https://github.com/webpack-contrib/postcss-loader/workflows/postcss-loader/badge.svg
[tests-url]: https://github.com/webpack-contrib/postcss-loader/actions
[cover]: https://codecov.io/gh/webpack-contrib/postcss-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/postcss-loader
[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack
[chat-postcss]: https://badges.gitter.im/postcss/postcss.svg
[chat-postcss-url]: https://gitter.im/postcss/postcss
[size]: https://packagephobia.now.sh/badge?p=postcss-loader
[size-url]: https://packagephobia.now.sh/result?p=postcss-loader
