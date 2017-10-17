---
title: coffee-loader
source: https://raw.githubusercontent.com/webpack-contrib/coffee-loader/master/README.md
edit: https://github.com/webpack-contrib/coffee-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/coffee-loader
---
Loads <a href="http://coffeescript.org/">CoffeeScript</a> like JavaScript

## 安装

```bash
npm install --save-dev coffee-loader
```

## 用法


```js
import coffee from 'coffee-loader!./file.coffee';
```

##


```js
import coffee from 'file.coffee';
```

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.coffee$/,
        use: [ 'coffee-loader' ]
      }
    ]
  }
}
```

## Options

|Name|Default|Description|
|:--:|:-----:|:----------|
|**`literate`**|`false`|Enable CoffeeScript in Markdown (Code Blocks) e.g `file.coffee.md`|
|**`sourceMap`**|`false`|Enable/Disable Sourcemaps|
|**`transpile`**|`false`|Provide Babel presets and plugins|

### [`Literate`](http://coffeescript.org/#literate)

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.coffee.md$/,
        use: [
          {
            loader: 'coffee-loader',
            options: { literate: true }
          }
        ]
      }
    ]
  }
}
```

### `Sourcemaps`

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.coffee$/,
        use: [
          {
            loader: 'coffee-loader',
            options: { sourceMap: true }
          }
        ]
      }
    ]
  }
}
```

### [`Transpile`](http://coffeescript.org/#transpilation)

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.coffee$/,
        use: [
          {
            loader: 'coffee-loader',
            options: {
              transpile: {
                presets: ['env']
              }
            }
          }
        ]
      }
    ]
  }
}
```

## Maintainer

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


[npm]: https://img.shields.io/npm/v/coffee-loader.svg
[npm-url]: https://npmjs.com/package/coffee-loader

[node]: https://img.shields.io/node/v/coffee-loader.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack/coffee-loader.svg
[deps-url]: https://david-dm.org/webpack/coffee-loader

[tests]: http://img.shields.io/travis/webpack/coffee-loader.svg
[tests-url]: https://travis-ci.org/webpack/coffee-loader

[cover]: https://coveralls.io/repos/github/webpack/coffee-loader/badge.svg
[cover-url]: https://coveralls.io/github/webpack/coffee-loader

[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack

***

> 原文：https://webpack.js.org/loaders/coffee-loader/
