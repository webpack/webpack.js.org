---
title: cache-loader
source: https://raw.githubusercontent.com/webpack-contrib/cache-loader/master/README.md
edit: https://github.com/webpack-contrib/cache-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/cache-loader
---
缓存加载器，用于缓存后面加载器的结果，写入本地默认磁盘或数据库。

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
|**`cacheContext`**|`{String}`|`undefined`|允许重写默认缓存上下文，然后生成相应路径。默认情况下，使用绝对路径|
|**`cacheKey`**|`{Function(options, request) -> {String}}`|`undefined`|允许重写默认缓存密钥生成器|
|**`cacheDirectory`**|`{String}`|`path.resolve('.cache-loader')`|提供应存储（用于默认读/写实现）缓存项的缓存目录|
|**`cacheIdentifier`**|`{String}`|`cache-loader:{version} {process.env.NODE_ENV}`|提供用于生成哈希值的无效标识符。可以为（用于默认读/写实现的）加载器添加额外依赖项。|
|**`write`**|`{Function(cacheKey, data, callback) -> {void}}`|`undefined`|允许重写默认写入缓存数据 (e.g. Redis, memcached)|
|**`read`**|`{Function(cacheKey, callback) -> {void}}`|`undefined`|允许重写默认读取缓存数据|
|**`readOnly`**|`{Boolean}`|`false`|允许重写默认值并将缓存设为只读（对于某些只从缓存中读取，不希望更新缓存的环境很有用）|

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
// Or different database client - memcached, mongodb, ...
const redis = require('redis');
const crypto = require('crypto');

// ...
// connect to client
// ...

const BUILD_CACHE_TIMEOUT = 24 * 3600; // 1 day

function digest(str) {
  return crypto.createHash('md5').update(str).digest('hex');
}

// Generate own cache key
function cacheKey(options, request) {
  return `build:cache:${digest(request)}`;
}


// Read data from database and parse them
function read(key, callback) {
  client.get(key, (err, result) => {
    if (err) {
      return callback(err);
    }

    if (!result) {
      return callback(new Error(`Key ${key} not found`));
    }

    try {
      let data = JSON.parse(result);
      callback(null, data);
    } catch (e) {
      callback(e);
    }
  });
}


// Write data to database under cacheKey
function write(key, data, callback) {
  client.set(key, JSON.stringify(data), 'EX', BUILD_CACHE_TIMEOUT, callback);
}

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheKey,
              read,
              write,
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
