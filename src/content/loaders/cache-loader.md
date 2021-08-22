---
title: cache-loader
source: https://raw.githubusercontent.com/webpack-contrib/cache-loader/master/README.md
edit: https://github.com/webpack-contrib/cache-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/cache-loader
translators:
  - mercurywang
  - QC-L
---


[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]



`cache-loader` 允许缓存以下 loaders 到（默认）磁盘或数据库。

## 起步 $#getting-started$

在开始前，需要安装 `cache-loader`:

```console
npm install --save-dev cache-loader
```

在一些性能开销较大的 loader 之前添加 cache-loader，以便将结果缓存到磁盘里。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.ext$/,
        use: ['cache-loader', ...loaders],
        include: path.resolve('src'),
      },
    ],
  },
};
```

> ⚠️  请注意，保存和读取这些缓存文件会有一些时间开销，所以请只对性能开销较大的 loader 使用此 loader。

## 选项 $#options$

|         名称          |                       类型                       |                        默认值                        | 描述                                                                                                                                                            |
| :-------------------: | :----------------------------------------------: | :-----------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  **`cacheContext`**   |                    `{String}`                    |                       `undefined`                       | 允许覆写默认的缓存上下文以便生成相对缓存路径。默认情况下生成的是绝对路径 |
|    **`cacheKey`**     |    `{Function(options, request) -> {String}}`    |                       `undefined`                       | 允许覆写默认的缓缓存键生成器 |
| **`cacheDirectory`**  |                    `{String}`                    | `findCacheDir({ name: 'cache-loader' }) or os.tmpdir()` | 提供一个可存储缓存项（供默认读/写执行使用）的缓存目录 |
| **`cacheIdentifier`** |                    `{String}`                    |     `cache-loader:{version} {process.env.NODE_ENV}`     | 提供一个用于生成哈希值的无效标识符。可以用于 loaders 的额外依赖（供默认读/写执行使用）|
|     **`compare`**     |      `{Function(stats, dep) -> {Boolean}}`       |                       `undefined`                       | 允许覆写用于比较缓存依赖和当前读取依赖的默认函数，返回值为 `true` 时使用缓存资源 |
|    **`precision`**    |                    `{Number}`                    |                           `0`                           | 在将 `stats` 和 `dep` 参数传入比较函数之前，浮动于 `mtime` 的毫秒数 |
|      **`read`**       |    `{Function(cacheKey, callback) -> {void}}`    |                       `undefined`                       | 允许覆写默认从文件中读取的缓存数据 |
|    **`readOnly`**     |                   `{Boolean}`                    |                         `false`                         | 允许覆写默认值并将缓存设置为只读（比如某些环境中不需要缓存更新，只需要读取）|
|      **`write`**      | `{Function(cacheKey, data, callback) -> {void}}` |                       `undefined`                       | 允许覆写默认向文件写入缓存数据（比如 Redis, memcached）|

## 示例 $#examples$

### 基本用法 $#basic$

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['cache-loader', 'babel-loader'],
        include: path.resolve('src')
      }
    ]
  }
};
```

### 数据库集成 $#database-integration$

**webpack.config.js**

```js
// 或其他数据库终端 - memcached，mongodb...
const redis = require('redis');
const crypto = require('crypto');

// ...
// 连接终端
// ...

const BUILD_CACHE_TIMEOUT = 24 * 3600; // 1 天

function digest(str) {
  return crypto
    .createHash('md5')
    .update(str)
    .digest('hex');
}

// 生成自己的缓存键
function cacheKey(options, request) {
  return `build:cache:${digest(request)}`;
}

// 从数据库读取数据并进行转换
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

// 根据缓存键向数据库写入数据
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
            },
          },
          'babel-loader',
        ],
        include: path.resolve('src'),
      },
    ],
  },
};
```

## 贡献 $#contributing$

如果您尚未了解，建议您阅读以下贡献指引。

[贡献](https://github.com/webpack-contrib/cache-loader/blob/master/.github/CONTRIBUTING.md)

## 许可 $#license$

[MIT](https://github.com/webpack-contrib/cache-loader/blob/master/LICENSE)

[npm]: https://img.shields.io/npm/v/cache-loader.svg
[npm-url]: https://npmjs.com/package/cache-loader
[node]: https://img.shields.io/node/v/cache-loader.svg
[node-url]: https://nodejs.org/
[deps]: https://david-dm.org/webpack-contrib/cache-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/cache-loader
[tests]: https://dev.azure.com/webpack-contrib/cache-loader/_apis/build/status/webpack-contrib.cache-loader?branchName=master
[tests-url]: https://dev.azure.com/webpack-contrib/cache-loader/_build/latest?definitionId=4&branchName=master
[cover]: https://codecov.io/gh/webpack-contrib/cache-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/cache-loader
[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=cache-loader
[size-url]: https://packagephobia.now.sh/result?p=cache-loader
