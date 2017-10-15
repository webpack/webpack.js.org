---
title: transform-loader
source: https://raw.githubusercontent.com/webpack-contrib/transform-loader/master/README.md
edit: https://github.com/webpack-contrib/transform-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/transform-loader
---
Use <a href="https://github.com/substack/node-browserify/wiki/list-of-transforms">browserify transforms</a> as webpack-loader.

## 安装

```bash
npm i transform-loader --save
```

## <a href="https://webpack.js.org/concepts/loaders">用法</a>

通过查询参数(query parameter)来传递模块名。

``` javascript
var x = require("!transform-loader?brfs!./file.js");
var x = require("!transform-loader/cacheable?brfs!./file.js"); // 可缓存版本
```

如果你传递了一个数字，将得到 `this.options.transforms[number]` 中的函数。

## webpack 2 配置示例

``` javascript
module.exports = {
  module: {
    rules: [
      {
        loader: "transform-loader?brfs",
        enforce: "post",
        options: {
          transforms: [
            function (/*file*/) {
              return through((buffer) => {
                return this.queue(
                  buffer.split('')
                    .map((chunk) => String.fromCharCode(127-chunk.charCodeAt(0))))
                    .join('')
              }, () => this.queue(null))
            }
          ]
        }
      },

      {
        test: /\.coffee$/,
        loader: "transform-loader/cacheable?coffeeify",
        options: {
          transforms: [
            function (/*file*/) {
              return through((buffer) => {
                return this.queue(
                  buffer.split('')
                    .map((chunk) => String.fromCharCode(127-chunk.charCodeAt(0))))
                    .join('')
              }, () => this.queue(null))
            }
          ]
        }
      },

      {
        test: /\.weirdjs$/,
        loader: "transform-loader?0",
        options: {
          transforms: [
            function (/*file*/) {
              return through((buffer) => {
                return this.queue(
                  buffer.split('')
                    .map((chunk) => String.fromCharCode(127-chunk.charCodeAt(0))))
                    .join('')
              }, () => this.queue(null))
            }
          ]
        }
      }
    ]
  }
};
```

## webpack 1 配置示例

``` javascript
module.exports = {
  module: {
    postLoaders: [
      {
        loader: "transform-loader?brfs"
      }
    ]
    loaders: [
      {
        test: /\.coffee$/,
        loader: "transform-loader/cacheable?coffeeify"
      },
      {
        test: /\.weirdjs$/,
        loader: "transform-loader?0"
      }
    ]
  },
  transforms: [
    function(file) {
      return through(function(buf) {
        this.queue(buf.split("").map(function(s) {
          return String.fromCharCode(127-s.charCodeAt(0));
        }).join(""));
      }, function() { this.queue(null); });
    }
  ]
};
```

## 典型 brfs 示例

假如你有下面这样的 Node 源码：

```js
var test = require('fs').readFileSync('./test.txt', 'utf8');
```

在 `npm install transform-loader brfs --save` 之后，添加如下 loader 到你的配置中：

```js
module.exports = {
    context: __dirname,
    entry: "./index.js",
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "transform-loader?brfs"
            }
        ]
    }
}
```

loader 将应用到所有 JS 文件，这样在执行 watch 任务时将导致性能提醒。因此你也许需要使用带缓存的版本 `transform-loader/cacheable?brfs`。

## 维护人员

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/166921?v=3&s=150">
        </br>
        <a href="https://github.com/bebraw">Juho Vepsäläinen</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars2.githubusercontent.com/u/8420490?v=3&s=150">
        </br>
        <a href="https://github.com/d3viant0ne">Joshua Wiens</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/533616?v=3&s=150">
        </br>
        <a href="https://github.com/SpaceK33z">Kees Kluskens</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/3408176?v=3&s=150">
        </br>
        <a href="https://github.com/TheLarkInn">Sean Larkin</a>
      </td>
    </tr>
  <tbody>
</table>


[npm]: https://img.shields.io/npm/v/transform-loader.svg
[npm-url]: https://npmjs.com/package/transform-loader

[deps]: https://david-dm.org/webpack-contrib/transform-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/transform-loader

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack

***

> 原文：https://webpack.js.org/loaders/transform-loader/
