---
title: multi-loader
source: https://raw.githubusercontent.com/webpack-contrib/multi-loader/master/README.md
edit: https://github.com/webpack-contrib/multi-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/multi-loader
---
This loader requires a module multiple times, each time loaded with a different loader. Like in a multi entry point the exports of the last item are exported.

## 安装

```bash
npm i multi-loader --save
```

## 用法

``` javascript
var multi = require("multi-loader");
{
  module: {
    loaders: [
      {
        test: /\.css$/,
        // Add CSS to the DOM
        // and
        // Return the raw content
        loader: multi(
          "style-loader!css-loader!autoprefixer-loader",
          "raw-loader"
        )
      }
    ]
  }
}
```

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


[npm]: https://img.shields.io/npm/v/multi-loader.svg
[npm-url]: https://npmjs.com/package/multi-loader

[deps]: https://david-dm.org/webpack-contrib/multi-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/multi-loader

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack

***

> 原文：https://webpack.js.org/loaders/multi-loader/
