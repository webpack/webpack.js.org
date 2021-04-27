---
title: mocha-loader
source: https://raw.githubusercontent.com/webpack-contrib/mocha-loader/master/README.md
edit: https://github.com/webpack-contrib/mocha-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/mocha-loader
translators:
  - applegz
  - jacob-lcs
---


[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]



允许 [Mocha](https://mochajs.org/) 通过 webpack 加载并运行。

## 快速开始 {#getting-started}

首先，你需要先安装 `mocha-loader` 与 `mocha`：

```console
npm install --save-dev mocha-loader mocha
```

然后将该 loader 添加到 `webpack` 的配置中去，例如：

**file.js**

```js
import test from './test.js';
```

**webpack.config.js**

```js
module.exports = {
  entry: './entry.js',
  output: {
    path: __dirname,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /test\.js$/,
        use: 'mocha-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
```

接着使用你习惯的方式运行 `webpack`。

另一种使用方法（无需配置）：

```js
import test from 'mocha-loader!./test.js';
```

无 loader 选项。

## 示例 {#examples}

### 基础 {#basic}

**file.js**

```js
module.exports = true;
```

**test.js**

```js
describe('Test', () => {
  it('should succeed', (done) => {
    setTimeout(done, 1000);
  });

  it('should fail', () => {
    setTimeout(() => {
      throw new Error('Failed');
    }, 1000);
  });

  it('should randomly fail', () => {
    if (require('./module')) {
      throw new Error('Randomly failed');
    }
  });
});
```

## 贡献 {#contributing}

如果你还没有看过我们的贡献者指南请先花点时间看一下。

[CONTRIBUTING](https://github.com/webpack-contrib/mocha-loader/blob/master/.github/CONTRIBUTING.md)

## License {#license}

[MIT](https://github.com/webpack-contrib/mocha-loader/blob/master/LICENSE)

[npm]: https://img.shields.io/npm/v/mocha-loader.svg
[npm-url]: https://npmjs.com/package/mocha-loader
[node]: https://img.shields.io/node/v/mocha-loader.svg
[node-url]: https://nodejs.org/
[deps]: https://david-dm.org/webpack-contrib/mocha-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/mocha-loader
[tests]: https://github.com/webpack-contrib/mocha-loader/workflows/mocha-loader/badge.svg
[tests-url]: https://github.com/webpack-contrib/mocha-loader/actions
[cover]: https://codecov.io/gh/webpack-contrib/mocha-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/mocha-loader
[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=mocha-loader
[size-url]: https://packagephobia.now.sh/result?p=mocha-loader
