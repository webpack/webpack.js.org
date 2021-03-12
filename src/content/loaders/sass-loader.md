---
title: sass-loader
source: https://raw.githubusercontent.com/webpack-contrib/sass-loader/master/README.md
edit: https://github.com/webpack-contrib/sass-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/sass-loader
---


[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]



加载 Sass/SCSS 文件并将他们编译为 CSS。

## 快速开始 {#getting-started}

首先，你需要安装 `sass-loader`：

```console
npm install sass-loader sass webpack --save-dev
```

`sass-loader` 需要预先安装 [Dart Sass](https://github.com/sass/dart-sass) 或 [Node Sass](https://github.com/sass/node-sass)（可以在这两个链接中找到更多的资料）。这可以控制所有依赖的版本， 并自由的选择使用的 Sass 实现。

这样可以控制所有依赖项的版本，并选择要使用的 Sass 实现。

> ℹ️ 我们推荐使用 [Dart Sass](https://github.com/sass/dart-sass)。

> ⚠ [Node Sass](https://github.com/sass/node-sass) 不能与 [Yarn PnP](https://classic.yarnpkg.com/en/docs/pnp/) 特性一起正常工作，并且不支持 [@use rule](https://sass-lang.com/documentation/at-rules/use)。

将 `sass-loader` 、[css-loader](/loaders/css-loader/) 与 [style-loader](/loaders/style-loader/) 进行链式调用，可以将样式以 style 标签的形式插入 DOM 中，或者使用 [mini-css-extract-plugin](/plugins/mini-css-extract-plugin/) 将样式输出到独立的文件中。

然后将本 loader 添加到你的 Webpack 配置中。例如：

**app.js**

```js
import "./style.scss";
```

**style.scss**

```scss
$body-color: red;

body {
  color: $body-color;
}
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 将 JS 字符串生成为 style 节点
          "style-loader",
          // 将 CSS 转化成 CommonJS 模块
          "css-loader",
          // 将 Sass 编译成 CSS
          "sass-loader",
        ],
      },
    ],
  },
};
```

最后通过你喜欢的方式运行 `webpack`。

### 解析 `import` 的规则 {#resolving-import-at-rules}

Webpack 提供一种 [解析文件的高级机制](/concepts/module-resolution/)。

`sass-loader` 使用 Sass 提供的 custom importer 特性，将所有 query 传递给 Webpack 解析引擎。
因此你可以从 `node_modules` 中引入 Sass modules。

```scss
@import "bootstrap";
```
<<<<<<< HEAD
`~` 用法已被废弃，可以从代码中删除（**我们建议这么做**），但是我们会因为一些历史原因一直支持这种写法。
为什么你可以移除它呢？loader 首先会尝试以相对路径解析 `@import`，如果它不能被解析，loader 将会尝试在 [`node_modules`](/configuration/resolve/#resolvemodules) 中解析 `@import`。
只要在包名前加上 `~`，告诉 Webpack 在 [`modules`](/configuration/resolve/#resolvemodules) 中进行查找。
=======

Using `~` is deprecated and can be removed from your code (**we recommend it**), but we still support it for historical reasons.
Why you can remove it? The loader will first try to resolve `@import` as relative, if it cannot be resolved, the loader will try to resolve `@import` inside [`node_modules`](/configuration/resolve/#resolvemodules).
Just prepend them with a `~` which tells webpack to look up the [`modules`](/configuration/resolve/#resolvemodules).
>>>>>>> 413256598c80cdd628d826fa233231c09f961170

```scss
@import "~bootstrap";
```

重要的是，只在前面加上 `~`，因为`~/` 将会解析到用户的主目录（home directory）。
因为 CSS 和 Sass 文件没有用于导入相关文件的特殊语法，所以 Webpack 需要区分 `bootstrap` 和 `~bootstrap`。
 `@import "style.scss"` 和 `@import "./style.scss";` 两种写法是相同的。

### `url(...)` 的问题 {#problems-with-url}

由于 Saass 的实现没有提供 [url 重写](https://github.com/sass/libsass/issues/532)的功能，所以相关的资源都必须是相对于输出文件（ouput）而言的。

- 如果生成的 CSS 传递给了 `css-loader`，则所有的 url 规则都必须是相对于入口文件的（例如：`main.scss`）。
- 如果仅仅生成了 CSS 文件，没有将其传递给 `css-loader`，那么所有的 url 都是相对于网站的根目录的。

第一种情况可能会带来一些困扰。通常情况下我们希望相对路径引用的解析是相对于声明它的 `.sass`/`.scss` 文件（如同在 `.css` 文件中一样）。

幸运的是，有两种方法可以解决这个问题：

- 将 [resolve-url-loader](https://github.com/bholloway/resolve-url-loader) 设置于 loader 链中的 `sass-loader` 之前，就可以重写 url。
- Library 作者一般都会提供变量，用来设置资源路径。比如 [bootstrap-sass](https://github.com/twbs/bootstrap-sass) 可以通过 `$icon-font-path` 进行设置。

## 配置选项 {#options}

|                   名称                    |         类型         |       默认值       | Description                                    |
| :---------------------------------------: | :------------------: | :----------------: | :--------------------------------------------- |
|  **[`implementation`](#implementation)**  |      `{Object}`      |       `sass`       | 设置使用的 Sass 的实现。                       |
|     **[`sassOptions`](#sassoptions)**     | `{Object\|Function}` | Sass 实现的默认值  | Sass 自身选项。                                |
|       **[`sourceMap`](#sourcemap)**       |     `{Boolean}`      | `compiler.devtool` | 启用 / 禁用 source maps 的生成。               |
|  **[`additionalData`](#additionaldata)**  | `{String\|Function}` |    `undefined`     | 在实际的输入文件之前添加 `Sass` /`SCSS` 代码。 |
| **[`webpackImporter`](#webpackimporter)** |     `{Boolean}`      |       `true`       | 启用 / 禁用默认的 Webpack importer。           |

### `implementation` {#implementation}

类型： `Object`
默认值： `sass`

特殊的 `implementation` 选项确定要使用的 Sass 实现。

默认情况下，loader 将会根据你的依赖解析需要使用的实现。
只需将必需的实现添加到 `package.json`（`sass` 或 `node-sass` 包）中并安装依赖项即可。

示例，此时 `sass-loader` 将会使用 `sass` （`dart-sass`）实现：

**package.json**

```json
{
  "devDependencies": {
    "sass-loader": "^7.2.0",
    "sass": "^1.22.10"
  }
}
```

示例，此时 `sass-loader` 将会使用 `node-sass` 实现：

**package.json**

```json
{
  "devDependencies": {
    "sass-loader": "^7.2.0",
    "node-sass": "^5.0.0"
  }
}
```

需注意同时安装 `node-sass` 和 `sass` 的情况！默认情况下，`sass-loader` 会选择 `sass`。
为了避免这种情况，你可以使用 `implementation` 选项。

`implementation` 选项可以以模块的形式接受 `sass`（`Dart Sass`）或 `node-sass`。

例如，为了使用 Dart Sass，你应该传递：

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              // `dart-sass` 是首选
              implementation: require("sass"),
            },
          },
        ],
      },
    ],
  },
};
```

需要注意的是，当使用 `sass`（`Dart Sass`）时，由于异步回调的开销，通常情况下**同步编译的速度是异步编译速度的两倍**。
为了避免这种开销，你可以使用 [fibers](https://www.npmjs.com/package/fibers) 包从同步代码中调用异步导入程序。

如果可能，我们会自动注入 [`fibers`](https://github.com/laverdet/node-fibers) 软件包（设置 `sassOptions.fiber`）（当然需要你安装 [`fibers`](https://github.com/laverdet/node-fibers) 包）。

**package.json**

```json
{
  "devDependencies": {
    "sass-loader": "^7.2.0",
    "sass": "^1.22.10",
    "fibers": "^4.0.1"
  }
}
```

你可以通过向 `sassOptions.fiber` 传递 `false` 参数关闭自动注入的 [`fibers`](https://github.com/laverdet/node-fibers) 包。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
              sassOptions: {
                fiber: false,
              },
            },
          },
        ],
      },
    ],
  },
};
```

你还可以通过一下代码传递 `fiber`：

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
              sassOptions: {
                fiber: require("fibers"),
              },
            },
          },
        ],
      },
    ],
  },
};
```

### `sassOptions` {#sassoptions}

类型：`Object|Function`
默认值：Sass 实现的默认值

[Dart Sass](http://sass-lang.com/dart-sass) 或者 [Node Sass](https://github.com/sass/node-sass) 实现的选项。

> ℹ️ `indentedSyntax` 选项值为 `true`，是对 `sass` 的扩展。

> ℹ️ 像 `data` 和 `file` 这样的选项是不可用的，且会被忽略。

> ℹ 我们推荐不要设置 `outFile`，`sourceMapContents`，`sourceMapEmbed`，`sourceMapRoot` 这些选项，因为当 `sourceMap` 是 `true` 时，`sass-loader` 会自动设置这些选项。

> ℹ️ 可以使用 `this.webpackLoaderContext` 属性访问自定义 importer 中的 [loader 上下文](/api/loaders/#the-loader-context)。

`sass` （`dart-sass`）和 `node-sass` 之间的选项略有不同。

在使用他们之前，请查阅有关文档：

- [Dart Sass 文档](https://github.com/sass/dart-sass#javascript-api) 提供了所有可用的 `sass` 选项。
- [Node Sass 文档](https://github.com/sass/node-sass/#options) 提供了所有可用的 `node-sass` 选项。

#### `Object` {#object}

使用对象设置 Sass 实现的启动选项。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                indentWidth: 4,
                includePaths: ["absolute/path/a", "absolute/path/b"],
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

允许通过 loader 上下文为 Sass 实现设置不同的选项。

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: (loaderContext) => {
                // 有关可用属性的更多信息 https://webpack.js.org/api/loaders/
                const { resourcePath, rootContext } = loaderContext;
                const relativePath = path.relative(rootContext, resourcePath);

                if (relativePath === "styles/foo.scss") {
                  return {
                    includePaths: ["absolute/path/c", "absolute/path/d"],
                  };
                }

                return {
                  includePaths: ["absolute/path/a", "absolute/path/b"],
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
默认值：取决于 `compiler.devtool` 的值

开启/关闭生成 source map。

默认情况下 source maps 的生成取决于 [`devtool`](/configuration/devtool/) 选项。
除 `eval` 和 `false` 之外的所有值都将开启 source map 的生成。

> ℹ 如果为 `true` 将会忽略来自 `sassOptions` 的 `sourceMap`，`sourceMapRoot`，`sourceMapEmbed`，`sourceMapContents` 和 `omitSourceMapUrl` 选项。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
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

> ℹ 在极少数情况下，`node-sass` 会输出无效的 source maps（这是 `node-sass` 的 bug）。

> > 为了避免这种情况，你可以尝试将 `node-sass` 更新到最新版本，或者可以尝试将 `sassOptions` 中的 `outputStyle` 选项设置为 `compressed`。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              sassOptions: {
                outputStyle: "compressed",
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

类型：`String|Function`
默认值：`undefined`

在实际的文件之前要添加的 `Sass` / `SCSS` 代码。
在这种情况下，`sass-loader` 将不会覆盖 `data` 选项，而只是将它**拼接**在入口文件内容之前。

当某些 Sass 变量取决于环境时，这非常有用：

#### `String` {#string}

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              additionalData: "$env: " + process.env.NODE_ENV + ";",
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
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              additionalData: (content, loaderContext) => {
                // 有关可用属性的更多信息 https://webpack.js.org/api/loaders/
                const { resourcePath, rootContext } = loaderContext;
                const relativePath = path.relative(rootContext, resourcePath);

                if (relativePath === "styles/foo.scss") {
                  return "$value: 100px;" + content;
                }

                return "$value: 200px;" + content;
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
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              additionalData: async (content, loaderContext) => {
                // More information about available properties https://webpack.js.org/api/loaders/
                const { resourcePath, rootContext } = loaderContext;
                const relativePath = path.relative(rootContext, resourcePath);

                if (relativePath === "styles/foo.scss") {
                  return "$value: 100px;" + content;
                }

                return "$value: 200px;" + content;
              },
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

开启 / 关闭默认的 Webpack importer。

在某些情况下，可以提高性能。但是请谨慎使用，因为 aliases 和以 `〜` 开头的 `@import` 规则将不起作用。
你可以传递自己的 `importer` 来解决这个问题（参阅 [`importer docs`](https://github.com/sass/node-sass#importer--v200---experimental)）。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
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

## 示例 {#examples}

### 提取样式表 {#extracts-css-into-separate-files}

对于生产版本，我们建议从 bundle 中提取 CSS，以便之后可以使 CSS/JS 资源并行加载。

从 bundle 中提取样式表，有 2 种实用的方式：

- [mini-css-extract-plugin](/plugins/mini-css-extract-plugin/)
- [extract-loader](https://github.com/peerigon/extract-loader) (简单，专门针对 css-loader 的输出)

**webpack.config.js**

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 在开发过程中回退到 style-loader
          process.env.NODE_ENV !== "production"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // 与 webpackOptions.output 中的选项相似
      // 所有的选项都是可选的
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
};
```

### Source maps {#source-maps}

开启/关闭 source map 的生成。

为了开启 CSS source maps，需要将 `sourceMap` 选项作为参数，传递给 `sass-loader` 和 `css-loader`。

**webpack.config.js**

```javascript
module.exports = {
  devtool: "source-map", // 任何类似于 "source-map" 的选项都是支持的
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
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

如果你要在 Chrome 中编辑原始的 Sass 文件，建议阅读 [这篇不错的博客](https://medium.com/@toolmantim/getting-started-with-css-sourcemaps-and-in-browser-sass-editing-b4daab987fb0)。具体示例参考 [test/sourceMap](https://github.com/webpack-contrib/sass-loader/tree/master/test)。

## 贡献 {#contributing}

如果你还没有阅读过我们的贡献指南，请花一点时间阅读它。

[CONTRIBUTING](https://github.com/webpack-contrib/sass-loader/blob/master/.github/CONTRIBUTING.md)

## License {#license}

[MIT](https://github.com/webpack-contrib/sass-loader/blob/master/LICENSE)

[npm]: https://img.shields.io/npm/v/sass-loader.svg
[npm-url]: https://npmjs.com/package/sass-loader
[node]: https://img.shields.io/node/v/sass-loader.svg
[node-url]: https://nodejs.org/
[deps]: https://david-dm.org/webpack-contrib/sass-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/sass-loader
[tests]: https://github.com/webpack-contrib/sass-loader/workflows/sass-loader/badge.svg
[tests-url]: https://github.com/webpack-contrib/sass-loader/actions
[cover]: https://codecov.io/gh/webpack-contrib/sass-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/sass-loader
[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=sass-loader
[size-url]: https://packagephobia.now.sh/result?p=sass-loader
