---
title: UglifyjsWebpackPlugin
source: https://raw.githubusercontent.com/webpack-contrib/uglifyjs-webpack-plugin/master/README.md
edit: https://github.com/webpack-contrib/uglifyjs-webpack-plugin/edit/master/README.md
repo: https://github.com/webpack-contrib/uglifyjs-webpack-plugin
translators:
  - jefferyE
---


[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![cover][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]



此插件使用 [uglify-js](https://github.com/mishoo/UglifyJS2) 压缩你的 JavaScript。

## Requirements {#requirements}

此模块要求的最小版本为 Node v6.9.0 和 Webpack v4.0.0 版本。

## Getting Started {#getting-started}

首先，你需要安装 `uglifyjs-webpack-plugin`：

```console
$ npm install uglifyjs-webpack-plugin --save-dev
```

然后把插件添加到你的 `webpack` 配置中。例如：

**webpack.config.js**

```js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
};
```

紧接着通过你的首选方式运行 `webpack`。

## Options {#options}

### `test` {#test}

类型：`String|RegExp|Array<String|RegExp>`
默认值：`/\.js(\?.*)?$/i`

测试匹配的文件。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        test: /\.js(\?.*)?$/i,
      }),
    ],
  },
};
```

### `include` {#include}

类型：`String|RegExp|Array<String|RegExp>`
默认值：`undefined`

要被处理的文件。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        include: /\/includes/,
      }),
    ],
  },
};
```

### `exclude` {#exclude}

类型：`String|RegExp|Array<String|RegExp>`
默认值：`undefined`

不被处理的文件。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        exclude: /\/excludes/,
      }),
    ],
  },
};
```

### `chunkFilter` {#chunkfilter}

类型：`Function<(chunk) -> boolean>`
默认值：`() => true`

判断哪些 chunk 可以被压缩（默认所有的 chunk 都会被压缩）。
返回值为 `true` 则会被压缩，`false` 则不会被压缩。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        chunkFilter: (chunk) => {
          // `vendor` 块不压缩
          if (chunk.name === 'vendor') {
            return false;
          }

          return true;
        },
      }),
    ],
  },
};
```

### `cache` {#cache}

类型：`Boolean|String`
默认值：`false`

启用文件缓存。
默认的缓存目录路径：`node_modules/.cache/uglifyjs-webpack-plugin`。

> ℹ️ 如果你使用自定义的 `minify` 函数，请正确阅读 `minify` 部分以了解缓存失效。

#### `Boolean` {#boolean}

启用/禁用文件缓存。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
      }),
    ],
  },
};
```

#### `String` {#string}

启用文件缓存并设置缓存目录路径。

**webpack.config.js**

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: 'path/to/cache',
      }),
    ],
  },
};
```

### `cacheKeys` {#cachekeys}

类型：`Function<(defaultCacheKeys, file) -> Object>`
默认值：`defaultCacheKeys => defaultCacheKeys`

允许重写默认的缓存 key。

默认的缓存 key：

```js
({
  'uglify-js': require('uglify-js/package.json').version, // uglify 版本
  'uglifyjs-webpack-plugin': require('../package.json').version, // plugin 版本
  'uglifyjs-webpack-plugin-options': this.options, // plugin 选项
  path: compiler.outputPath ? `${compiler.outputPath}/${file}` : file, // 输出资源路径
  hash: crypto
    .createHash('md4')
    .update(input)
    .digest('hex'), // 资源文件hash
});
```

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
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

类型：`Boolean|Number`
默认值：`false`

使用多进程并行运行以提高构建速度。
默认并发运行次数：`os.cups().length - 1`。

> ℹ️ 并行化可以显著地加快构建速度，因此**强烈推荐**使用并行化。

#### `Boolean` {#boolean}

启用/禁用多进程并行运行。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
      }),
    ],
  },
};
```

#### `Number` {#number}

启用多进程并行运行并设置并发运行的次数。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: 4,
      }),
    ],
  },
};
```

### `sourceMap` {#sourcemap}

类型：`Boolean`
默认值：`false`

使用源映射将错误信息位置映射到模块（这将会减慢编译速度）。
如果你使用自定义的 `minify` 函数，请正确阅读 `minify` 部分以确保正确处理源映射。

> ⚠️ **`cheap-source-map` 选项不适用于此插件**。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
      }),
    ],
  },
};
```

### `minify` {#minify}

类型：`Function`
默认值：`undefined`

允许你覆盖默认的 minify 函数。
默认情况下，插件使用 [uglify-js](https://github.com/mishoo/UglifyJS2) 软件包。
对于使用和测试未发布的版本或分支很有用。

> ⚠️ **开启 `parallel` 选项时，始终在 `minify` 函数内部使用 `require`**。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        minify(file, sourceMap) {
          const extractedComments = [];

          // 自定义提取注释的逻辑

          const { error, map, code, warnings } = require('uglify-module') // 或者 require('./path/to/uglify-module')
            .minify(file, {
              /* 你的压缩选项 */
            });

          return { error, map, code, warnings, extractedComments };
        },
      }),
    ],
  },
};
```

### `uglifyOptions` {#uglifyoptions}

类型：`Object`
默认值：[默认值](https://github.com/mishoo/UglifyJS2#minify-options)

UglifyJS 压缩[选项](https://github.com/mishoo/UglifyJS2#minify-options)。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          warnings: false,
          parse: {},
          compress: {},
          mangle: true, // 注意 `mangle.properties` 的默认值是 `false`。
          output: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_fnames: false,
        },
      }),
    ],
  },
};
```

### `extractComments` {#extractcomments}

类型：`Boolean|String|RegExp|Function<(node, comment) -> Boolean|Object>`
默认值：`false`

是否提取注释到单独的文件中，（请参阅[详细信息](https://github.com/webpack/webpack/commit/71933e979e51c533b432658d5e37917f9e71595a)）。
默认情况下，只提取注释中使用 `/^\**!|@preserve|@license|@cc_on/i` 正则条件匹配同时删除剩余注释。
如果原始文件名字为 `foo.js`，则注释文件将会被储存到 `foo.js.LICENSE` 中。
`uglifyOptions.output.comments` 选项指定是否保留注释，也就是说，当提取其他的注释时，可以保留一些注释（如：注解），甚至是保留已经被提取的注释。

#### `Boolean` {#boolean}

启用/禁用提取注释。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        extractComments: true,
      }),
    ],
  },
};
```

#### `String` {#string}

提取`所有`或`一些`（使用 `/^\**!|@preserve|@license|@cc_on/i` 正则匹配） 注释。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        extractComments: 'all',
      }),
    ],
  },
};
```

#### `RegExp` {#regexp}

所有的与给定表达式相匹配注释将被提取到单独的文件中。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        extractComments: /@extract/i,
      }),
    ],
  },
};
```

#### `Function<(node, comment) -> Boolean>` {#functionnode-comment---boolean}

所有的与给定表达式相匹配注释将被提取到单独的文件中。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        extractComments: function(astNode, comment) {
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

允许自定义条件提取注释，指定提取的文件名和banner。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        extractComments: {
          condition: /^\**!|@preserve|@license|@cc_on/i,
          filename(file) {
            return `${file}.LICENSE`;
          },
          banner(licenseFile) {
            return `License information can be found in ${licenseFile}`;
          },
        },
      }),
    ],
  },
};
```

##### `condition` {#condition}

类型：`Boolean|String|RegExp|Function<(node, comment) -> Boolean|Object>`

设置需要提取的注释。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        extractComments: {
          condition: 'some',
          filename(file) {
            return `${file}.LICENSE`;
          },
          banner(licenseFile) {
            return `License information can be found in ${licenseFile}`;
          },
        },
      }),
    ],
  },
};
```

##### `filename` {#filename}

类型：`Regex|Function<(string) -> String>`
默认值：`${file}.LICENSE`

提取的注释被储存时的文件名。
默认是将后缀 `.LICENSE` 添加到原始文件名后面。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        extractComments: {
          condition: /^\**!|@preserve|@license|@cc_on/i,
          filename: 'extracted-comments.js',
          banner(licenseFile) {
            return `License information can be found in ${licenseFile}`;
          },
        },
      }),
    ],
  },
};
```

##### `banner` {#banner}

类型：`Boolean|String|Function<(string) -> String>`
默认值：`/*! For license information please see ${commentsFile} */`

指向提取文件的 banner 文本，将会被添加到源文件的顶部。
可能是 `false`，一个 `String`，或者一个 `Function<(string) -> String>`，该函数将使用储存提取注释的文件名来调用。
将会被包装到注释中。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        extractComments: {
          condition: true,
          filename(file) {
            return `${file}.LICENSE`;
          },
          banner(commentsFile) {
            return `My custom banner about license information ${commentsFile}`;
          },
        },
      }),
    ],
  },
};
```

### `warningsFilter` {#warningsfilter}

类型：`Function<(warning, source) -> Boolean>`
默认值：`() => true`

允许过滤 [uglify-js](https://github.com/mishoo/UglifyJS2) 警告。
返回值为 `true` 则会保持警告，`false` 则不保留警告。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        warningsFilter: (warning, source) => {
          if (/Dropping unreachable code/i.test(warning)) {
            return true;
          }

          if (/filename\.js/i.test(source)) {
            return true;
          }

          return false;
        },
      }),
    ],
  },
};
```

## Examples {#examples}

### Cache And Parallel {#cache-and-parallel}

开启缓存并启用多进程并行运行。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
      }),
    ],
  },
};
```

### Preserve Comments {#preserve-comments}

提取所有合法注释（即使用 `/^\**!|@preserve|@license|@cc_on/i` 正则匹配），同时保留 `/@license/i` 注释。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
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

### Remove Comments {#remove-comments}

如果你构建时不想出现注释，可以按照以下配置将 **uglifyOptions.output.comments** 设置为 **false**：

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
};
```

### Custom Minify Function {#custom-minify-function}

覆盖默认的 minify 函数 —— 使用 [terser](https://github.com/fabiosantoscode/terser) 进行压缩。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        // Uncomment lines below for cache invalidation correctly
        // cache: true,
        // cacheKeys(defaultCacheKeys) {
        //   delete defaultCacheKeys['uglify-js'];
        //
        //   return Object.assign(
        //     {},
        //     defaultCacheKeys,
        //     { 'uglify-js': require('uglify-js/package.json').version },
        //   );
        // },
        minify(file, sourceMap) {
          // https://github.com/mishoo/UglifyJS2#minify-options
          const uglifyJsOptions = {
            /* `uglify-js` package 的相关配置 */
          };

          if (sourceMap) {
            uglifyJsOptions.sourceMap = {
              content: sourceMap,
            };
          }

          return require('terser').minify(file, uglifyJsOptions);
        },
      }),
    ],
  },
};
```

## Contributing {#contributing}

如果你至今还没有阅读，请花一点时间阅读我们的贡献指南。

[贡献](https://github.com/webpack-contrib/uglifyjs-webpack-plugin/blob/master/.github/CONTRIBUTING.md)

## License {#license}

[MIT](https://github.com/webpack-contrib/uglifyjs-webpack-plugin/blob/master/LICENSE)

[npm]: https://img.shields.io/npm/v/uglifyjs-webpack-plugin.svg
[npm-url]: https://npmjs.com/package/uglifyjs-webpack-plugin
[node]: https://img.shields.io/node/v/uglifyjs-webpack-plugin.svg
[node-url]: https://nodejs.org/
[deps]: https://david-dm.org/webpack-contrib/uglifyjs-webpack-plugin.svg
[deps-url]: https://david-dm.org/webpack-contrib/uglifyjs-webpack-plugin
[tests]: https://dev.azure.com/webpack-contrib/uglifyjs-webpack-plugin/_apis/build/status/webpack-contrib.uglifyjs-webpack-plugin?branchName=master
[tests-url]: https://dev.azure.com/webpack-contrib/uglifyjs-webpack-plugin/_build/latest?definitionId=8&branchName=master
[cover]: https://codecov.io/gh/webpack-contrib/uglifyjs-webpack-plugin/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/uglifyjs-webpack-plugin
[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=uglifyjs-webpack-plugin
[size-url]: https://packagephobia.now.sh/result?p=uglifyjs-webpack-plugin
