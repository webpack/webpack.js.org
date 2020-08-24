---
title: TerserWebpackPlugin
source: https://raw.githubusercontent.com/webpack-contrib/terser-webpack-plugin/master/README.md
edit: https://github.com/webpack-contrib/terser-webpack-plugin/edit/master/README.md
repo: https://github.com/webpack-contrib/terser-webpack-plugin
---


[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![cover][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]



该插件使用 [terser](https://github.com/terser-js/terser) 来压缩 JavaScript。

## 入门 {#getting-started}

首先，你需要安装 `terser-webpack-plugin`：

```console
$ npm install terser-webpack-plugin --save-dev
```

然后将插件添加到你的 `webpack` 配置文件中。例如：

**webpack.config.js**

```js
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};
```

接下来，按照你习惯的方式运行 `webpack`。

## 选项 {#options}

### `test` {#test}

类型： `String|RegExp|Array<String|RegExp>`
默认值：`/\.m?js(\?.*)?$/i`

用来匹配需要压缩的文件。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
      }),
    ],
  },
};
```

### `include` {#include}

类型： `String|RegExp|Array<String|RegExp>`
默认值： `undefined`

匹配参与压缩的文件。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\/includes/,
      }),
    ],
  },
};
```

### `exclude` {#exclude}

类型： `String|RegExp|Array<String|RegExp>`
默认值： `undefined`

匹配不需要压缩的文件。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        exclude: /\/excludes/,
      }),
    ],
  },
};
```

### `cache` {#cache}

> ⚠ 此配置在 Webpack 5 已弃用！请使用 https://webpack.js.org/configuration/other-options/#cache 代替。

类型： `Boolean|String`
默认值： `true`

启用文件缓存。
缓存目录的默认路径： `node_modules/.cache/terser-webpack-plugin`。

> ℹ️ 如果你使用自己的 `minify` 函数，请务必阅读 `minify` 部分以了解缓存失效策略。

#### `Boolean` {#boolean}

启用/禁用文件缓存。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
      }),
    ],
  },
};
```

#### `String` {#string}

启用文件缓存功能并设置缓存目录的路径。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: 'path/to/cache',
      }),
    ],
  },
};
```

### `cacheKeys` {#cachekeys}

> ⚠ 此配置在 Webpack 5 已弃用！请使用 https://webpack.js.org/configuration/other-options/#cache 代替。

类型： `Function<(defaultCacheKeys, file) -> Object>`
默认值： `defaultCacheKeys => defaultCacheKeys`

你可以指定自定义的缓存键，用来覆盖默认的缓存键。

默认缓存键：

```js
({
  terser: require('terser/package.json').version, // terser version
  'terser-webpack-plugin': require('../package.json').version, // plugin version
  'terser-webpack-plugin-options': this.options, // plugin options
  nodeVersion: process.version, // Node.js version
  name: file, // asset path
  contentHash: crypto.createHash('md4').update(input).digest('hex'), // source file hash
});
```

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        cacheKeys: (defaultCacheKeys, file) => {
          defaultCacheKeys.myCacheKey = 'myCacheKeyValue';

          return defaultCacheKeys;
        },
      }),
    ],
  },
};
```

### `parallel` {#parallel}

类型： `Boolean|Number`
默认值： `true`

使用多进程并发运行以提高构建速度。
并发运行的默认数量： `os.cpus().length - 1` 。

> 并发运行可以显著提高构建速度，因此**强烈建议添加此配置** 。

> 如果你使用 **Circle CI** 或任何其他不提供 CPU 实际可用数量的环境，则需要显式设置 CPU 数量，以避免 `Error: Call retries were exceeded`（请参阅 [#143](https://github.com/webpack-contrib/terser-webpack-plugin/issues/143)，[#202](https://github.com/webpack-contrib/terser-webpack-plugin/issues/202) ）。

#### `Boolean` {#boolean}

启用/禁用多进程并发运行功能。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },
};
```

#### `Number` {#number}

启用多进程并发运行并设置并发运行次数。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: 4,
      }),
    ],
  },
};
```

### `sourceMap` {#sourcemap}

类型： `Boolean`
默认值： `false` （有关 `devtool` 值和 `SourceMapDevToolPlugin` 插件的详细信息，请参见下文）

**仅适用于当 [`devtool`](/configuration/devtool/) 选项的值为：`source-map`、`inline-source-map`、`hidden-source-map` 以及 `nosources-source-map` 时。**

为什么？

- `eval` 将模块包装在 `eval("string")`，并且压缩程序 (minimizer) 不处理字符串。
- `cheap` 没有列信息，并且压缩程序 (minimizer) 最终仅生成单行代码，仅单个映射。

该插件遵循 [`devtool`](/configuration/devtool/) 选项并使用 `SourceMapDevToolPlugin` 插件。
使用受支持的 `devtool` 值可生成 source maps。
将 `SourceMapDevToolPlugin` 与 `columns` 选项一起使用也可以生成 source maps。

使用 source maps 能够将错误消息位置映射到其在模块中的对应位置（但生成 source maps 会降低编译速度）。
如果你使用了自己的 `minify` 函数，请阅读 `minify` 部分确保正确处理 source maps。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
      }),
    ],
  },
};
```

### `minify` {#minify}

类型： `Function`
默认值： `undefined`

允许你自定义压缩函数。
默认情况下，插件使用 [terser](https://github.com/terser-js/terser) 库。
对于使用和测试未发布的版本或 fork 的代码很帮助。

> ⚠️ **启用 `parallel` 选项时，在 `minify` 函数内部只能使用 `require`** 。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // Can be async
        minify: (file, sourceMap) => {
          const extractedComments = [];

          // Custom logic for extract comments

          const { map, code } = require('uglify-module') // Or require('./path/to/uglify-module')
            .minify(file, {
              /* Your options for minification */
            });

          return { map, code, extractedComments };
        },
      }),
    ],
  },
};
```

### `terserOptions` {#terseroptions}

类型： `Object`
默认值： [默认](https://github.com/terser-js/terser#minify-options)

Terser 压缩[配置](https://github.com/terser-js/terser#minify-options) 。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: undefined,
          parse: {},
          compress: {},
          mangle: true, // Note `mangle.properties` is `false` by default.
          module: false,
          output: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_classnames: undefined,
          keep_fnames: false,
          safari10: false,
        },
      }),
    ],
  },
};
```

### `extractComments` {#extractcomments}

类型： `Boolean|String|RegExp|Function<(node, comment) -> Boolean|Object>|Object`
默认值： `true`

是否将注释剥离到单独的文件中（请参阅[详细信息](https://github.com/webpack/webpack/commit/71933e979e51c533b432658d5e37917f9e71595a)）。
默认情况下，仅剥离 `/^\**!|@preserve|@license|@cc_on/i` 正则表达式匹配的注释，其余注释会删除。
如果原始文件名为 `foo.js` ，则注释将存储到 `foo.js.LICENSE.txt` 。
`terserOptions.output.comments` 选项指定是否保留注释，即可以在剥离其他注释时保留一些注释，甚至保留已剥离的注释。

#### `Boolean` {#boolean}

启用/禁用剥离注释功能。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: true,
      }),
    ],
  },
};
```

#### `String` {#string}

剥离 `all` 或 `some` （使用 `/^\**!|@preserve|@license|@cc_on/i` 正则表达式进行匹配）注释。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: 'all',
      }),
    ],
  },
};
```

#### `RegExp` {#regexp}

与指定表达式匹配的所有注释将会被剥离到单独的文件中。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: /@extract/i,
      }),
    ],
  },
};
```

#### `Function<(node, comment) -> Boolean>` {＃functionnode-comment --- boolean}

与指定表达式匹配的所有注释将会被剥离到单独的文件中。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: (astNode, comment) => {
          if (/@extract/i.test(comment.value)) {
            return true;
          }

          return false;
        },
      }),
    ],
  },
};
```

#### `Object` {#object}

允许自定义剥离注释的条件，指定剥离的文件名和标题。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: {
          condition: /^\**!|@preserve|@license|@cc_on/i,
          filename: (fileData) => {
            // The "fileData" argument contains object with "filename", "basename", "query" and "hash"
            return `${fileData.filename}.LICENSE.txt${fileData.query}`;
          },
          banner: (licenseFile) => {
            return `License information can be found in ${licenseFile}`;
          },
        },
      }),
    ],
  },
};
```

##### `condition` {#condition}

类型： `Boolean|String|RegExp|Function<(node, comment) -> Boolean|Object>`

自定义需要剥离的注释。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: {
          condition: 'some',
          filename: (fileData) => {
            // The "fileData" argument contains object with "filename", "basename", "query" and "hash"
            return `${fileData.filename}.LICENSE.txt${fileData.query}`;
          },
          banner: (licenseFile) => {
            return `License information can be found in ${licenseFile}`;
          },
        },
      }),
    ],
  },
};
```

##### `filename` {#filename}

类型： `String|Function<(string) -> String>`
默认值： `[file].LICENSE.txt [query]`

可用的占位符： `[file]` ， `[query]` 和 `[filebase]` （webpack 5 使用 `[base]` ）。

剥离出来的注释将被存储到的文件的文件名。
默认是将后缀 `.LICENSE.txt` 附加到原始文件名。

> ⚠️我们强烈建议使用 `txt` 扩展名。
使用 `js` / `cjs` / `mjs` 扩展名可能会与现有资源文件冲突，从而导致代码运行出错。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: {
          condition: /^\**!|@preserve|@license|@cc_on/i,
          filename: 'extracted-comments.js',
          banner: (licenseFile) => {
            return `License information can be found in ${licenseFile}`;
          },
        },
      }),
    ],
  },
};
```

##### `banner` {#banner}

类型： `Boolean|String|Function<(string) -> String>`
默认值： `/*! For license information please see ${commentsFile} */`

指向剥离文件的标语文本将被添加到原始文件的顶部。
可以为 `false` （无标题）， `String` 或一个函数：`Function<(string) -> String>` ，该函数将被使用存储剥离的注释的文件名来调用。
标语内容将被合并到注释中。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: {
          condition: true,
          filename: (fileData) => {
            // The "fileData" argument contains object with "filename", "basename", "query" and "hash"
            return `${fileData.filename}.LICENSE.txt${fileData.query}`;
          },
          banner: (commentsFile) => {
            return `My custom banner about license information ${commentsFile}`;
          },
        },
      }),
    ],
  },
};
```

## 示例 {#examples}

### 保留注释 {#preserve-comments}

剥离所有有效的注释（即 `/^\**!|@preserve|@license|@cc_on/i` ）并保留 `/@license/i` 注释。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: /@license/i,
          },
        },
        extractComments: true,
      }),
    ],
  },
};
```

### 删除注释 {#remove-comments}

如果要在构建时去除注释，请使用以下配置：

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
};
```

### 自定义压缩函数 {#custom-minify-function}

覆盖默认的 minify 函数 - 使用 `uglify-js` 进行压缩。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // Uncomment lines below for cache invalidation correctly
        // cache: true,
        // cacheKeys: (defaultCacheKeys) => {
        //   delete defaultCacheKeys.terser;
        //
        //   return Object.assign(
        //     {},
        //     defaultCacheKeys,
        //     { 'uglify-js': require('uglify-js/package.json').version },
        //   );
        // },
        minify: (file, sourceMap) => {
          // https://github.com/mishoo/UglifyJS2#minify-options
          const uglifyJsOptions = {
            /* your `uglify-js` package options */
          };

          if (sourceMap) {
            uglifyJsOptions.sourceMap = {
              content: sourceMap,
            };
          }

          return require('uglify-js').minify(file, uglifyJsOptions);
        },
      }),
    ],
  },
};
```

## 贡献 {#contributing}

请花一点时间阅读我们的贡献指南。

[CONTRIBUTING](https://github.com/webpack-contrib/terser-webpack-plugin/blob/master/.github/CONTRIBUTING.md)

## 许可证 {#license}

[MIT](https://github.com/webpack-contrib/terser-webpack-plugin/blob/master/LICENSE)

[npm]: https://img.shields.io/npm/v/terser-webpack-plugin.svg
[npm-url]: https://npmjs.com/package/terser-webpack-plugin
[node]: https://img.shields.io/node/v/terser-webpack-plugin.svg
[node-url]: https://nodejs.org/
[deps]: https://david-dm.org/webpack-contrib/terser-webpack-plugin.svg
[deps-url]: https://david-dm.org/webpack-contrib/terser-webpack-plugin
[tests]: https://github.com/webpack-contrib/terser-webpack-plugin/workflows/terser-webpack-plugin/badge.svg
[tests-url]: https://github.com/webpack-contrib/terser-webpack-plugin/actions
[cover]: https://codecov.io/gh/webpack-contrib/terser-webpack-plugin/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/terser-webpack-plugin
[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=terser-webpack-plugin
[size-url]: https://packagephobia.now.sh/result?p=terser-webpack-plugin
