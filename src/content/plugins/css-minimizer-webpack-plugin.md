---
title: CssMinimizerWebpackPlugin
source: https://raw.githubusercontent.com/webpack-contrib/css-minimizer-webpack-plugin/master/README.md
edit: https://github.com/webpack-contrib/css-minimizer-webpack-plugin/edit/master/README.md
repo: https://github.com/webpack-contrib/css-minimizer-webpack-plugin
---


[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![cover][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]



这个插件使用 [cssnano](https://cssnano.co/) 优化和压缩 CSS。

就像 [optimize-css-assets-webpack-plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin) 一样，但在 source maps 和 assets 中使用查询字符串会更加准确，支持缓存和并发模式下运行。

## 起步 {#getting-started}

首先，你需要安装 `css-minimizer-webpack-plugin`：

```console
$ npm install css-minimizer-webpack-plugin --save-dev
```

接着在 `webpack` 配置中加入该插件。示例：

**webpack.config.js**

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  module: {
    loaders: [
      {
        test: /.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
      // `...`,
      new CssMinimizerPlugin(),
    ],
  },
};
```

这将仅在生产环境开启 CSS 优化。
如果还想在开发环境下启用 CSS 优化，请将 `optimization.minimize` 设置为 `true`。

然后通过你喜欢的方式运行 `webpack`。

## 选项 {#options}

### `test` {#test}

类型：`String|RegExp|Array<String|RegExp>` - 默认值：`/\.css(\?.*)?$/i`

用来匹配文件。

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        test: /\.foo\.css$/i,
      }),
    ],
  },
};
```

### `include` {#include}

类型：`String|RegExp|Array<String|RegExp>`
默认值：`undefined`

要包含的文件。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        include: /\/includes/,
      }),
    ],
  },
};
```

### `exclude` {#exclude}

类型：`String|RegExp|Array<String|RegExp>`
默认值：`undefined`

要排除的文件。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        exclude: /\/excludes/,
      }),
    ],
  },
};
```

### `cache` {#cache}

> ⚠ 在 webpack 5 中已被忽略！请使用 https://webpack.docschina.org/configuration/other-options/#cache。

类型：`Boolean|String`
默认值：`true`

启用文件缓存。
缓存目录的默认路径：`node_modules/.cache/css-minimizer-webpack-plugin`。

> ℹ️ 如果使用自己的 `minify` 函数，为缓存正确无效请先阅读 `minify` 部分。

#### `Boolean` {#boolean}

启用/禁用文件缓存。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        cache: true,
      }),
    ],
  },
};
```

#### `String` {#string}

启用文件缓存并设置缓存目录的路径。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        cache: 'path/to/cache',
      }),
    ],
  },
};
```

### `cacheKeys` {#cachekeys}

> ⚠ 在 webpack 5 中已被忽略！请使用 https://webpack.docschina.org/configuration/other-options/#cache。

类型：`Function<(defaultCacheKeys, file) -> Object>`
默认值：`defaultCacheKeys => defaultCacheKeys`

允许覆盖默认的缓存键。

默认缓存键：

```js
({
  cssMinimizer: require('cssnano/package.json').version, // cssnano version
  'css-minimizer-webpack-plugin': require('../package.json').version, // plugin version
  'css-minimizer-webpack-plugin-options': this.options, // plugin options
  path: compiler.outputPath ? `${compiler.outputPath}/${file}` : file, // asset path
  hash: crypto.createHash('md4').update(input).digest('hex'), // source file hash
});
```

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
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
默认值：`true`

使用多进程并发执行，提升构建速度。
运行时默认的并发数：`os.cpus().length - 1`。

> ℹ️ 并行化可以显著提升构建速度，所以**强烈建议**使用。

#### `Boolean` {#boolean}

启用/禁用多进程并发执行。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        parallel: true,
      }),
    ],
  },
};
```

#### `Number` {#number}

启用多进程并发执行且设置并发数。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        parallel: 4,
      }),
    ],
  },
};
```

### `sourceMap` {#sourcemap}

类型：`Boolean|Object`
默认值：`false`（关于 `devtool`  和 `SourceMapDevToolPlugin` 插件的详细信息请参见下文）

启用（配置）source map 支持。使用 [PostCss SourceMap 选项](https://github.com/postcss/postcss-loader#sourcemap)。
启用时的默认配置：`{ inline: false }`。

**仅适用于 [`devtool`](/configuration/devtool/) 选项中的 `source-map`，`inline-source-map`，`hidden-source-map` 和 `nosources-source-map`。**

为什么？因为 CSS 仅支持这些 source map 类型。

该插件遵循 [`devtool`](/configuration/devtool/) 并使用 `SourceMapDevToolPlugin` 插件。 
使用受支持的 `devtool` 值可以生成 source map。
使用了开启 `columns` 选项的 `SourceMapDevToolPlugin` 可以生成 source map。

使用 source map 在模块中映射错误信息（这会减慢编译速度）。
如果要使用自定义的 `minify` 函数，为了能准确处理 source maps，请先阅读 `minify` 部分。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        sourceMap: true,
      }),
    ],
  },
};
```

### `minify` {#minify}

类型：`Function`
默认值：`undefined`

允许覆盖默认的 minify 函数。
默认情况下，插件使用 [cssnano](https://github.com/cssnano/cssnano) 包。
对于使用和测试未发布或版本衍生版本很有用。

> ⚠️ **启用 `parallel` 选项时，始终在 `minify` 函数中使用 `require`**。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        sourceMap: true,
        minify: (data, inputMap, minimizerOptions) => {
          const postcss = require('postcss');

          const plugin = postcss.plugin(
            'custom-plugin',
            () => (css, result) => {
              // 自定义代码
            }
          );

          const [[filename, input]] = Object.entries(data);

          const postcssOptions = {
            from: filename,
            to: filename,
            map: {
              prev: inputMap,
            },
          };

          return postcss([plugin])
            .process(input, postcssOptions)
            .then((result) => {
              return {
                css: result.css,
                map: result.map,
                warnings: result.warnings(),
              };
            });
        },
      }),
    ],
  },
};
```

### `minimizerOptions` {#minimizeroptions}

类型：`Object`
默认值：`{ preset: 'default' }`

Cssnano 优化 [选项](https://cssnano.co/docs/optimisations).

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
  },
};
```

### `warningsFilter` {#warningsfilter}

类型：`Function<(warning, file, source) -> Boolean>`
默认值：`() => true`

允许过滤 css-minimizer warnings（默认使用 [cssnano](https://github.com/cssnano/cssnano)）。
返回 `true` 将保留 warning，否则返回假值（`false`/`null`/`undefined`）。

> ⚠️ 如果没有使用 source maps，`source` 参数将包含 `undefined`。

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        warningsFilter: (warning, file, source) => {
          if (/Dropping unreachable code/i.test(warning)) {
            return true;
          }

          if (/file\.css/i.test(file)) {
            return true;
          }

          if (/source\.css/i.test(source)) {
            return true;
          }

          return false;
        },
      }),
    ],
  },
};
```

## 示例 {#examples}

### 使用 sourcemaps {#use-sourcemaps}

不要忘记为所有 loader 启用 `sourceMap` 选项。

```js
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  module: {
    loaders: [
      {
        test: /.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        sourceMap: true,
      }),
    ],
  },
};
```

### 移除所有注释 {#remove-all-comments}

移除所有注释（包括以 `/*!` 开头的注释）。

```js
module.exports = {
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
  },
};
```

### 使用自定义 minifier [csso](https://github.com/css/csso) {#using-custom-minifier-cssohttpsgithubcomcsscsso}

默认情况下，插件使用 [cssnano](https://github.com/cssnano/cssnano) 包。
可以使用其他提供压缩功能的依赖包。

> ⚠️ **启用 `parallel` 选项时，始终在 `minify` 函数中使用 `require`**。

**webpack.config.js**

```js
module.exports = {
  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        sourceMap: true,
        minify: async (data, inputMap) => {
          const csso = require('csso');
          const sourcemap = require('source-map');

          const [[filename, input]] = Object.entries(data);
          const minifiedCss = csso.minify(input, {
            filename: filename,
            sourceMap: true,
          });

          if (inputMap) {
            minifiedCss.map.applySourceMap(
              new sourcemap.SourceMapConsumer(inputMap),
              filename
            );
          }

          return {
            css: minifiedCss.css,
            map: minifiedCss.map.toJSON(),
          };
        },
      }),
    ],
  },
};
```

### 使用自定义 minifier [clean-css](https://github.com/jakubpawlowicz/clean-css) {#using-custom-minifier-clean-csshttpsgithubcomjakubpawlowiczclean-css}

默认情况下，插件使用 [cssnano](https://github.com/cssnano/cssnano) 包。
可以使用其他提供压缩功能的依赖包。

> ⚠️ **启用 `parallel` 选项时，始终在 `minify` 函数中使用 `require`**。

**webpack.config.js**

```js
module.exports = {
  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        sourceMap: true,
        minify: async (data, inputMap) => {
          // eslint-disable-next-line global-require
          const CleanCSS = require('clean-css');

          const [[filename, input]] = Object.entries(data);
          const minifiedCss = await new CleanCSS({ sourceMap: true }).minify({
            [filename]: https://github.com/webpack-contrib/css-minimizer-webpack-plugin/blob/master/%7B
              styles: input,
              sourceMap: inputMap,
            },
          });

          return {
            css: minifiedCss.styles,
            map: minifiedCss.sourceMap.toJSON(),
            warnings: minifiedCss.warnings,
          };
        },
      }),
    ],
  },
};
```

## 贡献 {#contributing}

如果你还没有阅读，请花一点时间阅读我们的贡献指南。

[CONTRIBUTING](https://github.com/webpack-contrib/css-minimizer-webpack-plugin/blob/master/.github/CONTRIBUTING.md)

## License {#license}

[MIT](https://github.com/webpack-contrib/css-minimizer-webpack-plugin/blob/master/LICENSE)

[npm]: https://img.shields.io/npm/v/css-minimizer-webpack-plugin.svg
[npm-url]: https://npmjs.com/package/css-minimizer-webpack-plugin
[node]: https://img.shields.io/node/v/css-minimizer-webpack-plugin.svg
[node-url]: https://nodejs.org/
[deps]: https://david-dm.org/webpack-contrib/css-minimizer-webpack-plugin.svg
[deps-url]: https://david-dm.org/webpack-contrib/css-minimizer-webpack-plugin
[tests]: https://github.com/webpack-contrib/css-minimizer-webpack-plugin/workflows/css-minimizer-webpack-plugin/badge.svg
[tests-url]: https://github.com/webpack-contrib/css-minimizer-webpack-plugin/actions
[cover]: https://codecov.io/gh/webpack-contrib/css-minimizer-webpack-plugin/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/css-minimizer-webpack-plugin
[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=css-minimizer-webpack-plugin
[size-url]: https://packagephobia.now.sh/result?p=css-minimizer-webpack-plugin
