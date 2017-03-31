---
title: exports-loader
source: https://raw.githubusercontent.com/webpack-contrib/exports-loader/master/README.md
edit: https://github.com/webpack-contrib/exports-loader/edit/master/README.md
---
## Install

```bash
npm i exports-loader --save
```

## Usage

``` javascript
require("exports-loader?file,parse=helpers.parse!./file.js");
// adds below code to the file's source:
//  exports["file"] = file;
//  exports["parse"] = helpers.parse;

require("exports-loader?file!./file.js");
// adds below code to the file's source:
//  module.exports = file;
```

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

## Maintainers

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


[npm]: https://img.shields.io/npm/v/exports-loader.svg
[npm-url]: https://npmjs.com/package/exports-loader

[deps]: https://david-dm.org/webpack-contrib/exports-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/exports-loader

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack
