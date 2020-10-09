---
title: MiniCssExtractPlugin
source: https://raw.githubusercontent.com/webpack-contrib/mini-css-extract-plugin/master/README.md
edit: https://github.com/webpack-contrib/mini-css-extract-plugin/edit/master/README.md
repo: https://github.com/webpack-contrib/mini-css-extract-plugin
---


[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]



本插件会将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载。

本插件基于 webpack v4 的新特性（模块类型）构建，并且需要 webpack 4 才能正常工作。

与 extract-text-webpack-plugin 相比：

- 异步加载
- 没有重复的编译（性能）
- 更容易使用
- 特别针对 CSS 开发

## 快速开始 {#getting-started}

首先，你需要安装 `mini-css-extract-plugin`：

```bash
npm install --save-dev mini-css-extract-plugin
```

建议 `mini-css-extract-plugin` 与 [`css-loader`](/loaders/css-loader/) 一起使用。

之后将 loader 与 plugin 添加到你的 `webpack` 配置文件中。 例如：

**style.css**

```css
body {
  background: green;
}
```

**component.js**

```js
import './style.css';
```

**webpack.config.js**

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
};
```

## 选项 {#options}

### Plugin Options {#plugin-options}

|                 选项名                  |         类型         |       默认值       | 描述                                              |
| :-----------------------------------: | :------------------: | :-----------------: | :------------------------------------------------------- |
|      **[`filename`](#filename)**      | `{String\|Function}` |    `[name].css`     | 此选项决定了输出的每个 CSS 文件的名称  |
| **[`chunkFilename`](#chunkfilename)** | `{String\|Function}` | `based on filename` | 此选项决定了非入口的 chunk 文件名称 |
|   **[`ignoreOrder`](#ignoreorder)**   |     `{Boolean}`      |       `false`       | 移除 Order 警告                                    |

#### `filename` {#filename}

类型：`String|Function`
默认值：`[name].css`

此选项决定了输出的每个 CSS 文件的名称。

机制类似于 [`output.filename`](/configuration/output/#outputfilename)。

#### `chunkFilename` {#chunkfilename}

类型：`String|Function`
默认值：`based on filename`

此选项决定了非入口的 chunk 文件名称

机制类似于 [`output.chunkFilename`](/configuration/output/#outputchunkfilename)

#### `ignoreOrder` {#ignoreorder}

类型：`Boolean`
默认值：`false`

移除 Order 警告

### Loader 选项 {#loader-options}

|              名称               |         类型         |              默认值               | 描述                                                                       |
| :-----------------------------: | :------------------: | :--------------------------------: | :-------------------------------------------------------------------------------- |
| **[`publicPath`](#publicpath)** | `{String\|Function}` | `webpackOptions.output.publicPath` | 为图片、文件等外部资源指定一个自定义的公共路径。 |
|   **[`esModule`](#esmodule)**   |     `{Boolean}`      |               `true`               | 使用 ES modules 语法                                                             |
|    **[`modules`](#modules)**    |      `{Object}`      |            `undefined`             | 配置 CSS 模块                                                         |

#### `publicPath` {#publicpath}

类型：`String|Function`
默认值：`webpackOptions.output` 选项中的 `publicPath`

为 CSS 内的图片、文件等外部资源指定一个自定义的公共路径。
机制类似于 [`output.publicPath`](/configuration/output/#outputpublicpath)。

##### `String` {#string}

**webpack.config.js**

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      // 类似于 webpackOptions.output 中的选项
      // 所有选项都是可选的
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/public/path/to/',
            },
          },
          'css-loader',
        ],
      },
    ],
  },
};
```

##### `Function` {#function}

**webpack.config.js**

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      // 类似于 webpackOptions.output 中的选项
      // 所有选项都是可选的
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                return path.relative(path.dirname(resourcePath), context) + '/';
              },
            },
          },
          'css-loader',
        ],
      },
    ],
  },
};
```

### `esModule` {#esmodule}

类型：`Boolean`
默认值：`true`

默认情况下  `mini-css-extract-plugin` 将会生成使用 ES 模块语法的 JS 模块。
在某些情况下，使用 ES 模块是有益的，比如：[module concatenation](/plugins/module-concatenation-plugin/) 和 [tree shaking](/guides/tree-shaking/)。

你可以使用以下方式启用 CommonJS 语法：

**webpack.config.js**

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          },
          'css-loader',
        ],
      },
    ],
  },
};
```

#### `modules` {#modules}

类型：`Object`
默认值：`undefined`

用于配置 CSS Modules。

##### `namedExport` {#namedexport}

类型：`Boolean`
类型：`false`

启用/禁用 ES 模块命名导出。

> ⚠ 命名会被修改为 `camelCase` 的形式。

> ⚠ 不允许在 css 的 class name 中使用 JavaScript 关键字。

> ⚠ 应启用 `css-loader` 和 `MiniCssExtractPlugin.loader` 中的 `esModule` 以及 `modules.namedExport` 选项。

**styles.css**

```css
.foo-baz {
  color: red;
}
.bar {
  color: blue;
}
```

**index.js**

```js
import { fooBaz, bar } from './styles.css';

console.log(fooBaz, bar);
```

你可以按照如下配置启用 ES 模块命名导出。

**webpack.config.js**

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
              modules: {
                namedExport: true,
              },
            },
          },
          {
            loader: 'css-loader',
            options: {
              esModule: true,
              modules: {
                namedExport: true,
                localIdentName: 'foo__[name]__[local]',
              },
            },
          },
        ],
      },
    ],
  },
};
```

## 示例 {#examples}

### 最简单的例子 {#minimal-example}

**webpack.config.js**

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      // 类似于 webpackOptions.output 中的选项
      // 所有选项都是可选的
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // 忽略有关顺序冲突的警告
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 你可以在这里指定特定的 publicPath
              // 默认情况下使用 webpackOptions.output 中的 publicPath
              publicPath: '../',
            },
          },
          'css-loader',
        ],
      },
    ],
  },
};
```

### `publicPath` 选项为函数 {#the-publicpath-option-as-function}

**webpack.config.js**

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      // 类似于 webpackOptions.output 中的选项
      // 所有选项都是可选的
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                // publicPath 是资源相对于上下文的相对路径
                // 例如：对于 ./css/admin/main.css publicPath 将会是 ../../
                // 而对于 ./css/main.css publicPath 将会是 ../
                return path.relative(path.dirname(resourcePath), context) + '/';
              },
            },
          },
          'css-loader',
        ],
      },
    ],
  },
};
```

### 高级配置示例 {#advanced-configuration-example}

本插件仅仅应该在 `production` 模式下使用，并且 loader 链中不应含有 `style-loader`，尤其是你需要在 `development` 构建中使用 HMR。

这是一个在 `development` 构建中使用 HMR 并且在 `production` 构建中将样式文件提取到独立文件中的示例。

（为了更加清楚的表达，省略了 Loader 的选项，以适应需要。）

You should not use `HotModuleReplacementPlugin` plugin if you are using a `webpack-dev-server`.
`webpack-dev-server` enables / disables HMR using `hot` option.

**webpack.config.js**

```js
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';

const plugins = [
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: devMode ? '[name].css' : '[name].[hash].css',
    chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
  }),
];
if (devMode) {
  // only enable hot in development
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = {
  plugins,
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
};
```

### 模块热更新 (HMR) {#hot-module-reloading-hmr}

注意：在 webpack 5 中 HMR 已自动支持。无需配置。你可以跳过以下内容：

`mini-css-extract-plugin` 支持在开发中热重载实际的 CSS 文件。
我们提供了一些选项来启动标准 stylesheets 和本地范围内 CSS 和 CSS modules 的 HMR 支持。
以下是 mini-css 用于启动 HMR CSS modules 的示例配置。

如果你使用的是 `webpack-dev-server`，那么你无需使用 `HotModuleReplacementPlugin` 插件。
`webpack-dev-server` 使用 `hot` 选项来控制启用/禁用 HMR。

**webpack.config.js**

```js
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const plugins = [
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: devMode ? '[name].css' : '[name].[hash].css',
    chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
  }),
];
if (devMode) {
  // only enable hot in development
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = {
  plugins,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          'css-loader',
        ],
      },
    ],
  },
};
```

### 生产模式压缩 {#minimizing-for-production}

为了压缩输出文件，请使用类似于 [optimize-css-assets-webpack-plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin) 这样的插件。
设置 `optimization.minimizer` 选项会覆盖 webpack 默认提供的优化器，所以你还需要提供一个 JS 的优化器：

**webpack.config.js**

```js
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
};
```

### 使用预加载或内联 CSS {#using-preloaded-or-inlined-css}

运行时代码通过 `<link>` 或者`<style>` 标签检测已经添加的 CSS。
当在服务端注入 CSS 代码 以及做 SSR 时将会很有用。
`<link>` 标签的 `href` 属性必须与将要被加载的 CSS chunk 的 URL 相匹配。
`data-href` 属性也可以被用在 `<link>` 和 `<style>` 标签中
使用内联 CSS 时，必须使用 `data-href` 属性。

### 提取所有的 CSS 到一个文件中 {#extracting-all-css-in-a-single-file}

用过使用 `optimization.splitChunks.cacheGroups` 选项，所有的 CSS 可以被提取到一个 CSS 文件中。

**webpack.config.js**

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
};
```

### 基于入口提取 CSS {#extracting-css-based-on-entry}

你可以基于 webpack 的入口名称提取 CSS。
当你使用路由动态加载但是想要通过入口加载对应的 CSS 文件时这将会非常有用。
这样也避免了 ExtractTextPlugin 造成的 CSS 重复复制问题。

```js
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function recursiveIssuer(m) {
  if (m.issuer) {
    return recursiveIssuer(m.issuer);
  } else if (m.name) {
    return m.name;
  } else {
    return false;
  }
}

module.exports = {
  entry: {
    foo: path.resolve(__dirname, 'src/foo'),
    bar: path.resolve(__dirname, 'src/bar'),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        fooStyles: {
          name: 'foo',
          test: (m, c, entry = 'foo') =>
            m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
          chunks: 'all',
          enforce: true,
        },
        barStyles: {
          name: 'bar',
          test: (m, c, entry = 'bar') =>
            m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
};
```

### 文件名选项设置为函数 {#filename-option-as-function}

使用 `filename` 选项，你可以使用 chunk 数据来定制文件名。
这点在处理多个入口，并且希望对给定的 入口/chunk 文件进行更多处理时，非常有用。
下面示例中，我们使用 `filename` 将生成的 css 输出到不同的目录中。

**webpack.config.js**

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: ({ chunk }) => `${chunk.name.replace('/js/', '/css/')}.css`,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
};
```

### 长期缓存 {#long-term-caching}

使用 `filename: "[contenthash].css"` 启动长期缓存。根据需要添加 `[name]`。

**webpack.config.js**

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
};
```

### 移除 Order 警告 {#remove-order-warnings}

对于通过使用 scoping 或命名约定来解决 css order 的项目，可以通过将插件的 ignoreOrder 选项设置为 true 来禁用 css order 警告。

**webpack.config.js**

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      ignoreOrder: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
};
```

### 媒体查询插件 {#media-query-plugin}

如果您想从 CSS 文件中提取媒体查询（因为移动用户不需要加载电脑或平板专用的 CSS ），应使用以下插件之一：

- [Media Query Plugin](https://github.com/SassNinja/media-query-plugin)
- [Media Query Splitting Plugin](https://github.com/mike-diamond/media-query-splitting-plugin)

## 贡献 {#contributing}

如果你还没有阅读过我们的贡献指南，请花一点时间阅读它。

[CONTRIBUTING](https://github.com/webpack-contrib/mini-css-extract-plugin/blob/master/.github/CONTRIBUTING.md)

## License {#license}

[MIT](https://github.com/webpack-contrib/mini-css-extract-plugin/blob/master/LICENSE)

[npm]: https://img.shields.io/npm/v/mini-css-extract-plugin.svg
[npm-url]: https://npmjs.com/package/mini-css-extract-plugin
[node]: https://img.shields.io/node/v/mini-css-extract-plugin.svg
[node-url]: https://nodejs.org/
[deps]: https://david-dm.org/webpack-contrib/mini-css-extract-plugin.svg
[deps-url]: https://david-dm.org/webpack-contrib/mini-css-extract-plugin
[tests]: https://github.com/webpack-contrib/mini-css-extract-plugin/workflows/mini-css-extract-plugin/badge.svg
[tests-url]: https://github.com/webpack-contrib/mini-css-extract-plugin/actions
[cover]: https://codecov.io/gh/webpack-contrib/mini-css-extract-plugin/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/mini-css-extract-plugin
[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=mini-css-extract-plugin
[size-url]: https://packagephobia.now.sh/result?p=mini-css-extract-plugin
