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

### `publicPath` {#publicpath}

类型：`String|Function`
默认值：`webpackOptions.output` 选项中的 `publicPath`

自定义目标文件的公共路径。

#### `String` {#string}

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

#### `Function` {#function}

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
默认值：`false`

默认情况下  `mini-css-extract-plugin` 将会生成使用 CommonJS 模块语法的 JS 模块。
在某些情况下，使用 ES 模块是有益的，比如： [module concatenation](/plugins/module-concatenation-plugin/) 和 [tree shaking](/guides/tree-shaking/)。

你可以使用以下方式启用 ES 模块语法：

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
              esModule: true,
            },
          },
          'css-loader',
        ],
      },
    ],
  },
};
```

## 应用举例 {#examples}

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
              hmr: process.env.NODE_ENV === 'development',
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

**webpack.config.js**

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      // 类似于 webpackOptions.output 中的选项
      // 所有选项都是可选的
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
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

`mini-css-extract-plugin` 支持在开发中热重载实际的 CSS 文件。
我们提供了一些选项来启动标准 stylesheets 和本地范围内 CSS 和 CSS modules 的 HMR 支持。
以下是 mini-css 用于启动 HMR CSS modules 的示例配置。

当我们尝试 hmr css-modules 时，使用自定义的 chunk 名称进行代码分割是不容易的。
只有在 HMR 不能正常工作时，我们才需要打开 `reloadAll` 这个选项。
css-modules 的核心挑战在于进行代码分割时，不同于文件名每次都相同，chunk id 可以并且每次确实会有所不同。

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
              // 仅仅在 development 模式下开启 hmr
              hmr: process.env.NODE_ENV === 'development',
              // 如果 hmr 不工作, 请开启强制选项
              reloadAll: true,
            },
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

### 模块文件名选项 {#module-filename-option}

通过 `moduleFilename` 选项你能够基于 chunk 数据自定义文件名。当处理多个入口点并希望可以更好的控制给定的入口点 / chunk 的文件名时，这相当有用。在下面这个例子中，我们将会使用 `moduleFilename` 将生成的 css 文件输出到不同的目录中。

**webpack.config.js**

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      moduleFilename: ({ name }) => `${name.replace('/js/', '/css/')}.css`,
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

对于通过使用 scoping 或命名约定来解决 css order 的项目，可以通过将插件的 ignoreOrder 选项设置为 true 来禁用css order 警告。

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
