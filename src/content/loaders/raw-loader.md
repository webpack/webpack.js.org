---
title: raw-loader
source: https://raw.githubusercontent.com/webpack-contrib/raw-loader/master/README.md
edit: https://github.com/webpack-contrib/raw-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/raw-loader
translators:
  - KimYangOfCat
---


[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]



**在 webpack 5 中已废弃**: 请考虑迁移至[`asset modules`](/guides/asset-modules/)中。

可以将文件作为字符串导入的 webpack loader。

## 起步 $#getting-started$

首先，你需要安装 `raw-loader`:

```console
$ npm install raw-loader --save-dev
```

然后将此 loader 添加至你的 `webpack` 配置中。例如:

**file.js**

```js
import txt from './file.txt';
```

**webpack.config.js**

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.txt$/i,
        use: 'raw-loader',
      },
    ],
  },
};
```

然后根据你习惯的方式启动 `webpack`。 

## 选项 $#options$

|           属性名            |    类型     | 默认值 | 备注             |
| :-------------------------: | :---------: | :----: | :--------------- |
| **[`esModule`](#esmodule)** | `{Boolean}` | `true` | 使用 ES 模块语法 |

### `esModule` $#esmodule$

类型: `Boolean`
默认值: `true`

默认情况下, `raw-loader` 会生成使用 ES 模块语法的 JS 模块。
在某些情况下，使用 ES 模块是有益的， 如[模块连接(module concatenation)](/plugins/module-concatenation-plugin/)和[树摇(tree shaking)](/guides/tree-shaking/)。

你可以使用以下命令启用 CommonJS 模块语法:

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.txt$/i,
        use: [
          {
            loader: 'raw-loader',
            options: {
              esModule: false,
            },
          },
        ],
      },
    ],
  },
};
```

## 示例 $#examples$

### 内联 $#inline$

```js
import txt from 'raw-loader!./file.txt';
```

注意，如果你已经在 `webpack.config.js` 中为 extension(s) 定义了 loader(s)，那么你应该使用:

```js
import css from '!!raw-loader!./file.txt'; // 在请求中添加`!!`将禁用配置中指定的所有 loaders
```

## 贡献 $#contributing$

如果你从未阅读过我们的贡献指南，请在上面花点时间。

[贡献指南](https://github.com/webpack-contrib/raw-loader/blob/master/.github/CONTRIBUTING.md)

## License $#license$

[MIT](https://github.com/webpack-contrib/raw-loader/blob/master/LICENSE)

[npm]: https://img.shields.io/npm/v/raw-loader.svg
[npm-url]: https://npmjs.com/package/raw-loader
[node]: https://img.shields.io/node/v/raw-loader.svg
[node-url]: https://nodejs.org/
[deps]: https://david-dm.org/webpack-contrib/raw-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/raw-loader
[tests]: https://github.com/webpack-contrib/raw-loader/workflows/raw-loader/badge.svg
[tests-url]: https://github.com/webpack-contrib/raw-loader/actions
[cover]: https://codecov.io/gh/webpack-contrib/raw-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/raw-loader
[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=raw-loader
[size-url]: https://packagephobia.now.sh/result?p=raw-loader
