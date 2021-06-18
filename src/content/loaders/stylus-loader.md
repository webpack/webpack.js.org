---
title: stylus-loader
source: https://raw.githubusercontent.com/webpack-contrib/stylus-loader/master/README.md
edit: https://github.com/webpack-contrib/stylus-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/stylus-loader
translators:
  - Usualminds
---


[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![cover][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]



一个 webpack 的 Stylus loader。将 Stylus 文件编译为 CSS。

## 快速开始 {#getting-started}

首先，你需要安装 `stylus` 和 `stylus-loader`：

```console
$ npm install stylus stylus-loader --save-dev
```

然后将该 loader 添加到 `webpack` 配置中。例如：

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.styl$/,
        loader: "stylus-loader", // 将 Stylus 文件编译为 CSS
      },
    ],
  },
};
```

接着按照你习惯的方式运行 `webpack`。

## 可选项 {#options}

|                   Name                    |         Type         |      Default       | Description                                              |
| :---------------------------------------: | :------------------: | :----------------: | :------------------------------------------------------- |
|   **[`stylusOptions`](#stylusoptions)**   | `{Object\|Function}` |        `{}`        | Stylus 的可选项。                                      |
|       **[`sourceMap`](#sourcemap)**       |     `{Boolean}`      | `compiler.devtool` | 启用/禁用生成 SourceMap。              |
| **[`webpackImporter`](#webpackimporter)** |     `{Boolean}`      |       `true`       | 启用/禁用默认的 webpack importer。           |
|  **[`additionalData`](#additionaldata)**  | `{String\|Function}` |    `undefined`     | 在入口文件起始或末尾添加 `Stylus` 代码。 |
|  **[`implementation`](#implementation)**  | `{String\|Function}` |      `stylus`      | 配置 Stylus 使用的实现库。                      |

### `stylusOptions` {#stylusoptions}

类型：`Object|Function`
默认值：`{}`

通过 `stylusOptions` 属性，你可以给 `stylus-loader` 配置 [loader options](/configuration/module/#ruleoptions--rulequery) 中任意特定的选项值。
所有可用选项可以查看 [Stylus 文档](https://stylus-lang.com/docs/js.html)。
这些配置项需要将破折号（dash-case）转换为驼峰值（camelCase）后进行设置。

#### `Object` {#object}

使用对象（Object）的形式传递 options 给 Stylus。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "stylus-loader",
            options: {
              stylusOptions: {
                /**
                 * 指定要使用的 Stylus 插件。将插件作为
                 * 字符串进行传递，而不是从 Webpack 配置中导入。
                 *
                 * @type {(string|Function)[]}
                 * @default []
                 */
                use: ["nib"],

                /**
                 * 指定 path 的查找路径。
                 *
                 * @type {string[]}
                 * @default []
                 */
                include: [path.join(__dirname, "src/styl/config")],

                /**
                 * 导入指定的 Stylus 文件或者路径
                 *
                 * @type {string[]}
                 * @default []
                 */
                import: ["nib", path.join(__dirname, "src/styl/mixins")],

                /**
                 * 定义 Stylus 变量或者函数。
                 *
                 * @type {Array|Object}
                 * @default {}
                 */
                // 定义数组语法的推荐格式：[key, value, raw]
                define: [
                  ["$development", process.env.NODE_ENV === "development"],
                  ["rawVar", 42, true],
                ],
                // Object 语法已经弃用（不可指定 "raw' 选项）
                // define: {
                //   $development: process.env.NODE_ENV === 'development',
                //   rawVar: 42,
                // },

                /**
                 * 是否包含通过 @import 导入的常规 CSS。
                 *
                 * @type {boolean}
                 * @default false
                 */
                includeCSS: false,

                /**
                 * 解析导入文件中的相对 url()。
                 *
                 * @see https://stylus-lang.com/docs/js.html#stylusresolveroptions
                 *
                 * @type {boolean|Object}
                 * @default { nocheck: true }
                 */
                resolveURL: true,
                // resolveURL: { nocheck: true },

                /**
                 * 生成 CSS 后 注入注释并指定其所在 Stylus 文件行。
                 *
                 * @see https://stylus-lang.com/docs/executable.html
                 *
                 * @type {boolean}
                 * @default false
                 */
                lineNumbers: true,

                /**
                 * 将 @import 和 @charset 移至文件顶部。
                 *
                 * @see https://stylus-lang.com/docs/executable.html
                 *
                 * @type {boolean}
                 * @default false
                 */
                hoistAtrules: true,

                /**
                 * 压缩输出的 CSS。
                 * 生产环境默认值为 `true`
                 *
                 * @see https://stylus-lang.com/docs/executable.html
                 *
                 * @type {boolean}
                 * @default false
                 */
                compress: true,
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

允许根据 loader 的 context 来设置 options，再传递给  Stylus。

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.styl/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "stylus-loader",
            options: {
              stylusOptions: (loaderContext) => {
                // 更多可用的属性参见 https://webpack.js.org/api/loaders/
                const { resourcePath, rootContext } = loaderContext;
                const relativePath = path.relative(rootContext, resourcePath);

                if (relativePath === "styles/foo.styl") {
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

### `sourceMap` {#sourcemap}

类型：`Boolean`

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.styl$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "stylus-loader",
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

在某些情况下，这样做可以提高性能。
但是请慎用，因为可能会使得 aliases 和以 `~` 开头的 `@import` 规则失效。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.styl/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "stylus-loader",
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

### `additionalData` {#additionaldata}

类型：`String|Function`
默认值：`undefined`

在实际入口文件的起始位置添加 `Stylus` 代码。
这种情况下，`stylus-loader` 只会**追加**并不会覆盖文件内容。

当你的 Stylus 变量依赖环境变量时这个属性将非常有用：

> ℹ 由于你注入了代码，因此它将破坏入口文件的源映射关系。通常有比这更简单的解决方案，例如多个 Stylus 入口文件。

#### `String`

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.styl/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "stylus-loader",
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
        test: /\.styl/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "stylus-loader",
            options: {
              additionalData: (content, loaderContext) => {
                // 更多可用的属性参见 https://webpack.js.org/api/loaders/
                const { resourcePath, rootContext } = loaderContext;
                const relativePath = path.relative(rootContext, resourcePath);

                if (relativePath === "styles/foo.styl") {
                  return "value = 100px" + content;
                }

                return "value 200px" + content;
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
        test: /\.styl/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "stylus-loader",
            options: {
              additionalData: async (content, loaderContext) => {
                // 更多可用的属性参见 https://webpack.js.org/api/loaders/
                const { resourcePath, rootContext } = loaderContext;
                const relativePath = path.relative(rootContext, resourcePath);

                if (relativePath === "styles/foo.styl") {
                  return "value = 100px" + content;
                }

                return "value 200px" + content;
              },
            },
          },
        ],
      },
    ],
  },
};
```

### `implementation` {#implementation}

类型：`Function | String`

特殊的 `implementation` 选项决定使用 Stylus 的哪个实现。将会覆盖本地安装的 `stylus` 的 `peerDependency` 版本。

#### Function {#function}

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.styl/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "stylus-loader",
            options: {
              implementation: require("stylus"),
            },
          },
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
        test: /\.styl/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "stylus-loader",
            options: {
              implementation: require.resolve("stylus"),
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

将 `stylus-loader`、[`css-loader`](/loaders/css-loader/) 和 [`style-loader`](/loaders/style-loader/) 串联起来使用可立即将所有样式更新到 DOM。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          {
            loader: "style-loader", // 从 JS 中创建样式节点
          },
          {
            loader: "css-loader", // 将 CSS 转为 CommonJS
          },
          {
            loader: "stylus-loader", // 将 Stylus 编译为 CSS
          },
        ],
      },
    ],
  },
};
```

### Source maps {#source-maps}

为了生成 CSS 的 source map, 你需要在 loader 的可选项中设置 `sourceMap` 属性。如果没设置的话 loader 将会继承你 webpack 中为生成 source map 设置的属性值 `devtool`。

**webpack.config.js**

```javascript
module.exports = {
  devtool: "source-map", // 任何类似于 "source-map" 的 devtool 值都可以
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "stylus-loader",
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

### stylus 中使用 nib {#using-nib-with-stylus}

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          {
            loader: "style-loader", // 从 JS 中创建样式节点
          },
          {
            loader: "css-loader", // 将 CSS 转为 CommonJS
          },
          {
            loader: "stylus-loader", // 将 Stylus 编译为 CSS
            options: {
              stylusOptions: {
                use: [require("nib")()],
                import: ["nib"],
              },
            },
          },
        ],
      },
    ],
  },
};
```

### 导入 JSON 文件 {#import-json-files}

Stylus 在 `json` 函数中无效。
因此 webpack 解析器不适用于 `.json` 文件。
可使用 [`stylus resolver`](#stylus-resolver)。

**index.styl**

```styl
// 假设文件位置在这里 `node_modules/vars/vars.json`
json('vars.json')

@media queries-small
  body
    display nope

```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "stylus-loader",
            options: {
              stylusOptions: {
                // 指定文件查找路径。
                paths: ["node_modules/vars"],
              },
            },
          },
        ],
      },
    ],
  },
};
```

### 生产环境 {#in-production}

在生产环境中推荐使用 [MiniCssExtractPlugin](/plugins/mini-css-extract-plugin/) 来提取样式表到专门的文件中，这样你的样式就不需要依赖 JavaScript。

### webpack 解析器 {#webpack-resolver}

`webpack` 提供了一种 [解析文件的高级机制](/configuration/resolve/)。
`stylus-loader` 将所有的查询结果传递给了 webpack 解析器。
因此你可以从 `node_modules` 中导入 Stylus 模块。

```styl
@import 'bootstrap-styl/bootstrap/index.styl';
```

`~` 用法已被废弃，可以从代码中删除（**我们建议这么做**），但是我们会因为一些历史原因一直支持这种写法。
为什么你可以移除它呢？loader 首先会尝试以相对路径解析 `@import`，如果它不能被解析，loader 将会尝试在 [`node_modules`](/configuration/resolve/#resolvemodules) 中解析 `@import`。
只要在包名前加上 `~`，告诉 webpack 在 [`modules`](/configuration/resolve/#resolvemodules) 中进行查找。

```styl
@import "~bootstrap-styl/bootstrap/index.styl";
```

重要的是只在它的前面加上 `~`，因为 `~/` 会被解析到根目录。
`webpack` 需要区分 `bootstrap` 和 `~bootstrap`，因为 CSS 和 Stylus 文件没有特殊的语法可以导入相对路径的文件。
`@import "file"` 和 `@import "./file";` 写法是等价的。

### Stylus resolver {#stylus-resolver}

如果指定 `paths` 选项，将从指定的 `paths` 中搜索模块。
这是 Stylus 的默认行为。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.styl/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "stylus-loader",
            options: {
              stylusOptions: {
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

### 提取样式 {#extracting-style-sheets}

通过 webpack 打包 CSS 有很多好处，比如给引用图片和字体文件路径添加 hash, 在开发环境可以[模块热更新](/concepts/hot-module-replacement/)。另一方面，在生产环境，根据 JS 来控制应用样式表不是一个好的方式，可能会导致延迟渲染，甚至可能会出现[闪烁现象](https://en.wikipedia.org/wiki/Flash_of_unstyled_content)。因此，在你最终的生产环境中将它们拆分成单独的文件来存放通常是比较好的选择。

有两种从 bundle 中提取样式表的方式：

- [`extract-loader`](https://github.com/peerigon/extract-loader) （简单，但得专门指定 `css-loader` 的 output）
- [MiniCssExtractPlugin](/plugins/mini-css-extract-plugin/) （较复杂，但适用于所有的场景）

## 贡献 {#contributing}

如果你还没有看过我们的贡献者指南请先花点时间看一下。

[CONTRIBUTING](https://github.com/webpack-contrib/stylus-loader/blob/master/.github/CONTRIBUTING.md)

## 许可 {#license}

[MIT](https://github.com/webpack-contrib/stylus-loader/blob/master/LICENSE)

[npm]: https://img.shields.io/npm/v/stylus-loader.svg
[npm-url]: https://npmjs.com/package/stylus-loader
[node]: https://img.shields.io/node/v/stylus-loader.svg
[node-url]: https://nodejs.org
[deps]: https://david-dm.org/webpack-contrib/stylus-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/stylus-loader
[tests]: https://github.com/webpack-contrib/stylus-loader/workflows/stylus-loader/badge.svg
[tests-url]: https://github.com/webpack-contrib/stylus-loader/actions
[cover]: https://codecov.io/gh/webpack-contrib/stylus-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/stylus-loader
[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=stylus-loader
[size-url]: https://packagephobia.now.sh/result?p=stylus-loader
