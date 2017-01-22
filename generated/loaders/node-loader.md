---
title: node-loader
source: https://raw.githubusercontent.com/webpack/node-loader/master/README.md
edit: https://github.com/webpack/node-loader/edit/master/README.md
---
## Install

```bash
npm install --save-dev node-loader
```

## Usage

Executes [node add-ons](https://nodejs.org/dist/latest/docs/api/addons.html) in [enhanced-require](https://github.com/webpack/enhanced-require).

Use the loader either via your webpack config, CLI or inline.

### Via webpack config (recommended)

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.node$/,
        use: 'node-loader'
      }
    ]
  }
}
```

**In your application**
```js
import node from 'file.node';
```

### CLI

```bash
webpack --module-bind 'node=node-loader'
```

**In your application**
```js
import node from 'file.node';
```

### Inline

**In your application**
```js
import node from 'node-loader!./file.node';
```

## Maintainer

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150 height="150" src="https://github.com/sokra.png?s=150">
        <br>
        <a href="https://github.com/sokra">Tobias Koppers</a>
      </td>
    <tr>
  <tbody>
</table>


[npm]: https://img.shields.io/npm/v/node-loader.svg
[npm-url]: https://npmjs.com/package/node-loader

[node]: https://img.shields.io/node/v/node-loader.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack/node-loader.svg
[deps-url]: https://david-dm.org/webpack/node-loader

[tests]: http://img.shields.io/travis/webpack/node-loader.svg
[tests-url]: https://travis-ci.org/webpack/node-loader

[cover]: https://coveralls.io/repos/github/webpack/node-loader/badge.svg
[cover-url]: https://coveralls.io/github/webpack/node-loader

[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack

***

> 原文：https://webpack.js.org/loaders/node-loader/