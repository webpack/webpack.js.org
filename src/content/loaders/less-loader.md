---
title: less-loader
source: https://raw.githubusercontent.com/webpack-contrib/less-loader/master/README.md
edit: https://github.com/webpack-contrib/less-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/less-loader
---


[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![cover][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]



webpack 将 Less 编译为 CSS 的 loader。

## 快速开始 {#getting-started}

首先，你需要先安装 `less` 和 `less-loader`：

```console
$ npm install less less-loader --save-dev
```

然后将该 loader 添加到 `webpack` 的配置中去，例如：

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/i,
        loader: [
          // compiles Less to CSS
          "style-loader",
          "css-loader",
          "less-loader",
        ],
      },
    ],
  },
};
```

接着使用你习惯的方式运行 `webpack`。

## 可选项 {#options}

|                  名称                   |         类型         |         默认值          | 描述                                      |
| :-------------------------------------: | :------------------: | :----------------------: | :----------------------------------------------- |
|    **[`lessOptions`](#lessoptions)**    | `{Object\|Function}` | `{ relativeUrls: true }` | Less 的可选项。                                |
|     **[`additionalData`](#additionaldata)**     | `{String\|Function}` |       `undefined`        | 在入口文件起始或末尾添加 Less 代码。  |
|      **[`sourceMap`](#sourcemap)**      |     `{Boolean}`      |    `compiler.devtool`    | 是否生成 source map。       |
| **[`webpackImporter`](#webpackimporter)** |     `{Boolean}`      |          `true`          | 是否启用默认的 webpack importer。         |
| **[`implementation`](#implementation)** |      `{Object}`      |          `less`          | 配置 Less 使用的实现库                |

### `lessOptions` {#lessoptions}

类型: `Object|Function`
默认值: `{ relativeUrls: true }`

通过 `lessOptions` 属性，你可以设置 [loader options](/configuration/module/#ruleoptions--rulequery) 中的任意特定的选项值给 `less-loader`。所有可用的选项值请参看 [Less 命令行可选参数文档](http://lesscss.org/usage/#command-line-usage-options)。由于我们是通过编程的方式将这些选项传递给 Less，因此您需要将破折号（dash-case）转换为驼峰值（camelCase）后传递它们。

#### `Object` {#object}

使用对象（Object）的形式传递 options 给 Less。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                strictMath: true,
              },
            },
          },
        ],
      },
    ],
  },
};
```

#### `Function` {#function}

允许根据 loader 的 context 来设置 options，再传递给 Less。

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: (loaderContext) => {
                // 更多可用的属性见 https://webpack.js.org/api/loaders/
                const { resourcePath, rootContext } = loaderContext;
                const relativePath = path.relative(rootContext, resourcePath);

                if (relativePath === "styles/foo.less") {
                  return {
                    paths: ["absolute/path/c", "absolute/path/d"],
                  };
                }

                return {
                  paths: ["absolute/path/a", "absolute/path/b"],
                };
              },
            },
          },
        ],
      },
    ],
  },
};
```

### `additionalData` {#additionaldata}

类型: `String|Function`
默认值: `undefined`

在实际入口文件的起始位置添加 `Less` 代码。
这种情况下，`less-loader` 只会**追加**并不会覆盖文件内容。

当你的 Less 变量依赖环境变量时这个属性将非常有用：

> ℹ 由于你注入了代码，因此它将破坏入口文件的源映射关系。通常有比这更简单的解决方案，例如多个 Less 入口文件。

#### `String` {#string}

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              additionalData: `@env: ${process.env.NODE_ENV};`,
            },
          },
        ],
      },
    ],
  },
};
```

#### `Function` {#function}

##### Sync

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              additionalData: (content, loaderContext) => {
                // 更多可用的属性见 https://webpack.js.org/api/loaders/
                const { resourcePath, rootContext } = loaderContext;
                const relativePath = path.relative(rootContext, resourcePath);

                if (relativePath === "styles/foo.less") {
                  return "@value: 100px;" + content;
                }

                return "@value: 200px;" + content;
              },
            },
          },
        ],
      },
    ],
  },
};
```

##### Async

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              additionalData: async (content, loaderContext) => {
                // More information about available properties https://webpack.js.org/api/loaders/
                const { resourcePath, rootContext } = loaderContext;
                const relativePath = path.relative(rootContext, resourcePath);

                if (relativePath === "styles/foo.less") {
                  return "@value: 100px;" + content;
                }

                return "@value: 200px;" + content;
              },
            },
          },
        ],
      },
    ],
  },
};
```

### `sourceMap` {#sourcemap}

类型: `Boolean`
默认值: 取决于 `compiler.devtool` 的值

默认生成的 source map 取决于 `compiler.devtool` 的值。除了值等于 `eval` 和 `false` 外，其他值都能生成 source map

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
};
```

### `webpackImporter` {#webpackimporter}

类型：`Boolean`
默认值：`true`

启用/禁用 webpack 默认的 importer。

在某些情况下，这样做可以提高性能，但是请慎用，因为可能会使得 aliases 和以 `~` 开头的 `@import` 规则失效。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              webpackImporter: false,
            },
          },
        ],
      },
    ],
  },
};
```

### `implementation` {#implementation}

类型：`Object`

> ⚠ less-loader 已兼容 Less 3 和 Less 4。

特殊的 `implementation` 选项决定使用 Less 的哪个实现。重载本地安装的 `less` 的 `peerDependency` 版本。

**此选项只对下游的工具作者有效，以便于 Less 3 到 Less 4 的过渡。**

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              implementation: require("less"),
            },
          },
        ],
      },
    ],
  },
};
```

## 示例 {#examples}

### 常规用法 {#normal-usage}

将 `less-loader`、[`css-loader`](/loaders/css-loader/) 和 [`style-loader`](/loaders/style-loader/) 串联起来使用可立即将所有样式应用于 DOM。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          {
            loader: "style-loader", // 从 JS 中创建样式节点
          },
          {
            loader: "css-loader", // 转化 CSS 为 CommonJS
          },
          {
            loader: "less-loader", // 编译 Less 为 CSS
          },
        ],
      },
    ],
  },
};
```

不幸的是，Less 并没有将所有选项 1 对 1 映射为 camelCase（驼峰值）。如有疑问，请[检查执行文件](https://github.com/less/less.js/blob/3.x/bin/lessc)并搜索破折号选项。

### Source maps {#source-maps}

为了生成 CSS 的 source map, 你需要在 loader 的可选项中设置 `sourceMap` 属性。如果没设置的话 loader 将会继承你 webpack 中为生成 source map 设置的属性值 `devtool`。

**webpack.config.js**

```js
module.exports = {
  devtool: "source-map", // 任何类似于 "source-map" 的  devtool 值都可以
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
};
```

如果你想在 Chrome 中修改原始的 Less 文件，可以参考[这篇不错的博客](https://medium.com/@toolmantim/getting-started-with-css-sourcemaps-and-in-browser-sass-editing-b4daab987fb0)。这篇博客虽然写的 Sass，但也适合于 Less。

### 生产环境 {#in-production}

在生产环境中推荐使用 [MiniCssExtractPlugin](/plugins/mini-css-extract-plugin/) 来提取样式表到专门的文件中，这样你的样式就不需要依赖 JavaScript。

### 导入 {#imports}

首先我们会尝试使用内置 `less` 解析逻辑，然后再使用 `webpack` 解析逻辑（alias 和 `~`）。

#### webpack 解析器 {#webpack-resolver}

`webpack` 提供了一种 [解析文件的高级机制](/configuration/resolve/)。如果 `less` 不能解析 `@import` 的话，`less-loader` 作为 Less 的插件将所有的查询结果传递给 webpack 解析器。因此你可以从 `node_modules` 中导入 Less 模块。

```css
@import "bootstrap/less/bootstrap";
```

`~` 用法已被废弃，可以从代码中删除（**我们建议这么做**），但是我们会因为一些历史原因一直支持这种写法。
为什么你可以移除它呢？loader 首先会尝试以相对路径解析 `@import`，如果它不能被解析，loader 将会尝试在 [`node_modules`](/configuration/resolve/#resolvemodules) 中解析 `@import`。
只要在包名前加上 `~`，告诉 webpack 在 [`modules`](/configuration/resolve/#resolvemodules) 中进行查找。

```css
@import "~bootstrap/less/bootstrap";
```

可以通过 [`resolve.byDependency`](/configuration/resolve/#resolvebydependency) 修改默认解析器配置：

**webpack.config.js**

```js
module.exports = {
  devtool: "source-map", // "source-map" 类的 devtool 都是可以的
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
  resolve: {
    byDependency: {
      // 更多的配置项可以在这里找到 https://webpack.js.org/configuration/resolve/
      less: {
        mainFiles: ["custom"],
      },
    },
  },
};
```

在其前面加上 `〜` 很关键，因为 `〜/` 会解析到根目录。webpack 需要区分 `bootstrap` 和 `〜bootstrap`，因为 CSS 和 Less 文件没有用于导入相对路径文件的特殊语法。写 `@import“ file”` 等同于 `@import“ ./file”;`

#### Less Resolver {#less-resolver}

如果指定 `paths` 选项，将从指定的 `paths` 中搜索模块，这是 `less` 的默认行为。`paths` 应该是具有绝对路径的数组：

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                paths: [path.resolve(__dirname, "node_modules")],
              },
            },
          },
        ],
      },
    ],
  },
};
```

### 插件 {#plugins}

想要使用 [插件](http://lesscss.org/usage/#plugins)，只需要简单设置下 `plugins` 选项即可，
具体配置如下：

**webpack.config.js**

```js
const CleanCSSPlugin = require('less-plugin-clean-css');

module.exports = {
  ...
    {
      loader: 'less-loader',
      options: {
        lessOptions: {
          plugins: [
            new CleanCSSPlugin({ advanced: true }),
          ],
        },
      },
    },
  ...
};
```

<<<<<<< HEAD
> ℹ️ 使用 `less.webpackLoaderContext` 属性可以访问自定义插件中的 [loader context](/api/loaders/#the-loader-context)。
=======
> ℹ️ Access to the [loader context](/api/loaders/#the-loader-context) inside the custom plugin can be done using the `pluginManager.webpackLoaderContext` property.
>>>>>>> 54a4042429922f9d8d02445e3120bf4d9649c6db

```js
module.exports = {
  install: function (less, pluginManager, functions) {
    functions.add("pi", function () {
      // Loader context is available in `pluginManager.webpackLoaderContext`

      return Math.PI;
    });
  },
};
```

### 提取样式 {#extracting-style-sheets}

通过 webpack 打包 CSS 有很多好处，比如给引用图片和字体文件路径添加 hash, 在开发环境可以 [模块热替换](/concepts/hot-module-replacement/)。另一方面，在生产环境，根据 JS 来控制应用样式表不是一个好的方式，可能会导致延迟渲染，甚至可能会出现[闪烁现象](https://en.wikipedia.org/wiki/Flash_of_unstyled_content)。因此，在你最终的生产环境中将它们拆分成单独的文件来存放通常是比较好的选择。

有两种从 bundle 中提取样式表的方式：

- [`extract-loader`](https://github.com/peerigon/extract-loader) （简单，但得专门指定 `css-loader` 的 output）
- [MiniCssExtractPlugin](/plugins/mini-css-extract-plugin/) （较复杂，但适用于所有的场景）

### CSS modules 陷阱 {#css-modules-gotcha}

Less 和 [CSS modules](https://github.com/css-modules/css-modules) 有一个已知的问题，关于 `url（...）` 语句中的相对文件路径，[看下这个问题的解释](https://github.com/webpack-contrib/less-loader/issues/109#issuecomment-253797335)。

## 贡献 {#contributing}

如果你还没有看过我们的贡献者指南请先花点时间看一下。

[CONTRIBUTING](https://github.com/webpack-contrib/less-loader/blob/master/.github/CONTRIBUTING.md)

## 许可 {#license}

[MIT](https://github.com/webpack-contrib/less-loader/blob/master/LICENSE)

[npm]: https://img.shields.io/npm/v/less-loader.svg
[npm-url]: https://npmjs.com/package/less-loader
[node]: https://img.shields.io/node/v/less-loader.svg
[node-url]: https://nodejs.org/
[deps]: https://david-dm.org/webpack-contrib/less-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/less-loader
[tests]: https://github.com/webpack-contrib/less-loader/workflows/less-loader/badge.svg
[tests-url]: https://github.com/webpack-contrib/less-loader/actions
[cover]: https://codecov.io/gh/webpack-contrib/less-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/less-loader
[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=less-loader
[size-url]: https://packagephobia.now.sh/result?p=less-loader
