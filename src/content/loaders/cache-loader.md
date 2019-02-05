---
title: cache-loader
source: https://raw.githubusercontent.com/webpack-contrib/cache-loader/master/README.md
edit: https://github.com/webpack-contrib/cache-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/cache-loader
---


[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]



The `cache-loader` allow to Caches the result of following loaders on disk (default) or in the database.

## Getting Started

To begin, you'll need to install `cache-loader`:

```console
npm install --save-dev cache-loader
```

Add this loader in front of other (expensive) loaders to cache the result on disk.

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

> ⚠️ Note that there is an overhead for saving the reading and saving the cache file, so only use this loader to cache expensive loaders.

## Options

|         Name          |                       Type                       |                     Default                     | Description                                                                                                                                                            |
| :-------------------: | :----------------------------------------------: | :---------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  **`cacheContext`**   |                    `{String}`                    |                   `undefined`                   | Allows you to override the default cache context in order to generate the cache relatively to a path. By default it will use absolute paths                            |
|    **`cacheKey`**     |    `{Function(options, request) -> {String}}`    |                   `undefined`                   | Allows you to override default cache key generator                                                                                                                     |
| **`cacheDirectory`**  |                    `{String}`                    |         `path.resolve('.cache-loader')`         | Provide a cache directory where cache items should be stored (used for default read/write implementation)                                                              |
| **`cacheIdentifier`** |                    `{String}`                    | `cache-loader:{version} {process.env.NODE_ENV}` | Provide an invalidation identifier which is used to generate the hashes. You can use it for extra dependencies of loaders (used for default read/write implementation) |
|      **`write`**      | `{Function(cacheKey, data, callback) -> {void}}` |                   `undefined`                   | Allows you to override default write cache data to file (e.g. Redis, memcached)                                                                                        |
|      **`read`**       |    `{Function(cacheKey, callback) -> {void}}`    |                   `undefined`                   | Allows you to override default read cache data from file                                                                                                               |
|    **`readOnly`**     |                    `{Boolean}`                   |                   `false`                       | Allows you to override default value and make the cache read only (useful for some environments where you don't want the cache to be updated, only read from it)       |

## Examples

### Basic

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['cache-loader', 'babel-loader'],
        include: path.resolve('src'),
      },
    ],
  },
};
```

### Database Integration

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
  return crypto
    .createHash('md5')
    .update(str)
    .digest('hex');
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

## Contributing

Please take a moment to read our contributing guidelines if you haven't yet done so.

[CONTRIBUTING](https://raw.githubusercontent.com/webpack-contrib/cache-loader/master/.github/CONTRIBUTING.md)

## License

[MIT](https://raw.githubusercontent.com/webpack-contrib/cache-loader/master/LICENSE)

[npm]: https://img.shields.io/npm/v/cache-loader.svg
[npm-url]: https://npmjs.com/package/cache-loader
[node]: https://img.shields.io/node/v/cache-loader.svg
[node-url]: https://nodejs.org
[deps]: https://david-dm.org/webpack-contrib/cache-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/cache-loader
[tests]: https://img.shields.io/circleci/project/github/webpack-contrib/cache-loader.svg
[tests-url]: https://circleci.com/gh/webpack-contrib/cache-loader
[cover]: https://codecov.io/gh/webpack-contrib/cache-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/cache-loader
[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=cache-loader
[size-url]: https://packagephobia.now.sh/result?p=cache-loader
