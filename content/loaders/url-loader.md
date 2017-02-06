---
title: url-loader
source: https://raw.githubusercontent.com/webpack-contrib/url-loader/master/README.md
edit: https://github.com/webpack-contrib/url-loader/edit/master/README.md
---
## 安装

```bash
npm install --save-dev url-loader
```

## 用法

[文档：使用加载器](http://webpack.github.io/docs/using-loaders.html)

`url` 加载器的功能类似 `file` 加载器，但是在文件大小低于指定的限制时（单位 bytes）可以返回一个 Data Url。

大小限制可以通过传递查询参数来指定。（默认为无限制）

如果文件大小大于限制，将转为使用 [`file-loader`](https://github.com/webpack/file-loader)，所有的查询参数也会透传过去。

``` javascript
require("url-loader?limit=10000!./file.png");
// => 如果 "file.png" 大小小于 10kb 将返回 DataUrl

require("url-loader?mimetype=image/png!./file.png");
// => 指定文件的 mimetype（否则会用文件后缀推测）

require("url-loader?prefix=img/!./file.png");
// => file-loader 的参数也有效，如果被使用它们将被传递给 file-loader
```

## 贡献代码

不要犹豫发起 pull request。任何贡献都是赞赏的。在开发时你可以通过 `npm test` 进行用例测试。

## 维护者

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150 height="150"
        src="https://avatars.githubusercontent.com/sokra?v=3">
        <br />
        <a href="https://github.com/">Tobias Koppers</a>
      </td>
      <td align="center">
        <img width="150 height="150"
        src="https://avatars.githubusercontent.com/SpaceK33z?v=3">
        <br />
        <a href="https://github.com/">Kees Kluskens</a>
      </td>
    <tr>
  <tbody>
</table>


## LICENSE

#### [MIT](./LICENSE)

[npm]: https://img.shields.io/npm/v/url-loader.svg
[npm-url]: https://npmjs.com/package/url-loader

[node]: https://img.shields.io/node/v/url-loader.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack/url-loader.svg
[deps-url]: https://david-dm.org/webpack/url-loader

[tests]: http://img.shields.io/travis/webpack/url-loader.svg
[tests-url]: https://travis-ci.org/webpack/url-loader

[cover]: https://coveralls.io/repos/github/webpack/url-loader/badge.svg
[cover-url]: https://coveralls.io/github/webpack/url-loader

[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack

***

> 原文：https://webpack.js.org/loaders/url-loader/
