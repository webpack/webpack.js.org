---
title: cache-loader
source: https://raw.githubusercontent.com/webpack-contrib/cache-loader/master/README.md
edit: https://github.com/webpack-contrib/cache-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/cache-loader
---
Caches the result of following loaders on disk

## 安装

```bash
npm install --save-dev cache-loader
```

## 用法

在一些性能开销较大的 loader 之前添加此 loader，以将结果缓存到磁盘里。

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.ext$/,
        use: [
          'cache-loader',
          ...loaders
        ],
        include: path.resolve('src')
      }
    ]
  }
}
```

> ⚠️ 请注意，保存和读取这些缓存文件会有一些时间开销，所以请只对性能开销较大的 loader 使用此 loader。

## Options

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`cacheDirectory`**|`{String}`|`path.resolve('.cache-loader')`|Provide a cache directory where cache items should be stored|
|**`cacheIdentifier`**|`{String}`|`cache-loader:{version} {process.env.NODE_ENV}`|Provide an invalidation identifier which is used to generate the hashes. You can use it for extra dependencies of loaders.|

## 示例

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'cache-loader',
          'babel-loader'
        ],
        include: path.resolve('src')
      }
    ]
  }
}
```

##

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: path.resolve('.cache')
            }
          },
          'babel-loader'
        ],
        include: path.resolve('src')
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
        <a href="https://github.com/sokra">
          <img width="150" height="150" src="https://github.com/sokra.png?size=150">
          </br>
          Tobias Koppers
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/bebraw">
          <img width="150" height="150" src="https://github.com/bebraw.png?v=3&s=150">
          </br>
          Juho Vepsäläinen
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/d3viant0ne">
          <img width="150" height="150" src="https://github.com/d3viant0ne.png?v=3&s=150">
          </br>
          Joshua Wiens
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/sapegin">
          <img width="150" height="150" src="https://github.com/sapegin.png?v=3&s=150">
          </br>
          Artem Sapegin
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/michael-ciniawsky">
          <img width="150" height="150" src="https://github.com/michael-ciniawsky.png?v=3&s=150">
          </br>
          Michael Ciniawsky
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/evilebottnawi">
          <img width="150" height="150" src="https://github.com/evilebottnawi.png?v=3&s=150">
          </br>
          Alexander Krasnoyarov
        </a>
      </td>
    </tr>
  <tbody>
</table>


[npm]: https://img.shields.io/npm/v/cache-loader.svg
[npm-url]: https://npmjs.com/package/cache-loader

[node]: https://img.shields.io/node/v/cache-loader.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack-contrib/cache-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/cache-loader

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack

[test]: http://img.shields.io/travis/webpack-contrib/cache-loader.svg
[test-url]: https://travis-ci.org/webpack-contrib/cache-loader

[cover]: https://codecov.io/gh/webpack-contrib/cache-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/cache-loader

***

> 原文：https://webpack.js.org/loaders/cache-loader/
