---
title: val-loader
source: https://raw.githubusercontent.com/webpack-contrib/val-loader/master/README.md
edit: https://github.com/webpack-contrib/val-loader/edit/master/README.md
---
## Install

```bash
npm i val-loader --save
```

## Usage

``` javascript
var a = require("val-loader!./file.js");
// => excute file.js while compiling and 
//    take the result as javascript code for including
```

Don't forget to polyfill `require` if you want to use it in node.
See `webpack` documentation.

The excution of file.js has polyfill already applied.

Provide data for another loader:

``` javascript
require("css-loader!val-loader!./generateCss.js");
```

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


[npm]: https://img.shields.io/npm/v/val-loader.svg
[npm-url]: https://npmjs.com/package/val-loader

[deps]: https://david-dm.org/webpack-contrib/val-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/val-loader

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack
