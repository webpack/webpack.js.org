---
title: Other Options
sort: 16
contributors:
  - sokra
  - skipjack
  - terinjokes
  - byzyk
  - EugeneHlushko
related:
  - title: Using Records
    url: https://survivejs.com/webpack/optimizing/separating-manifest/#using-records
---


These are the remaining configuration options supported by webpack.

W> Help Wanted: This page is still a work in progress. If you are familiar with any of the options for which the description or examples are incomplete, please create an issue and submit a PR at the [docs repo](https://github.com/webpack/webpack.js.org)!


## `amd`

`object`

Set the value of `require.amd` or `define.amd`:

```js
module.exports = {
  //...
  amd: {
    jQuery: true
  }
};
```

Certain popular modules written for AMD, most notably jQuery versions 1.7.0 to 1.9.1, will only register as an AMD module if the loader indicates it has taken [special allowances](https://github.com/amdjs/amdjs-api/wiki/jQuery-and-AMD) for multiple versions being included on a page.

The allowances were the ability to restrict registrations to a specific version or to support different sandboxes with different defined modules.

This option allows you to set the key your module looks for to a truthy value.
As it happens, the AMD support in webpack ignores the defined name anyways.


## `bail`

`boolean`

Fail out on the first error instead of tolerating it. By default webpack will log these errors in red in the terminal, as well as the browser console when using HMR, but continue bundling. To enable it:

```js
module.exports = {
  //...
  bail: true
};
```

This will force webpack to exit its bundling process.


## `cache`

`boolean` `object`

Cache the generated webpack modules and chunks to improve build speed. `cache` is set to `type: 'memory'` in [`development` mode](/concepts/mode/#mode-development) and disabled in [`production` mode](/concepts/mode/#mode-production). `cache: true` is an alias to `cache: { type: 'memory' }`. To disable caching pass `false`:

__webpack.config.js__

```javascript
module.exports = {
  //...
  cache: false
};
```


### `cache.type`

`string: 'memory' | 'filesystem'`

Sets the `cache` type to either in memory or on the file system. The `memory` option is very straightforward, it tells webpack to store cache in memory and doesn't allow additional configuration:

__webpack.config.js__

```js
module.exports = {
  //...
  cache: {
    type: 'memory'
  }
};
```

While setting `cache.type` to `filesystem` opens up more options for configuration.

### `cache.cacheDirectory`

`string`

Base directory for the cache. Defaults to `node_modules/.cache/webpack`.

`cache.cacheDirectory` option is only available when [`cache.type`](#cache-type) is set to `filesystem`.

__webpack.config.js__

```javascript
const path = require('path');

module.exports = {
  //...
  cache: {
    type: 'filesystem',
    cacheDirectory: path.resolve(__dirname, '.temp_cache')
  }
};
```

W> The final location of the cache is a combination of `cache.cacheDirectory` + `cache.name`.

### `cache.hashAlgorithm`

`string`

Algorithm used the hash generation. See [Node.js crypto](https://nodejs.org/api/crypto.html) for more details. Defaults to `md4`.

`cache.hashAlgorithm` option is only available when [`cache.type`](#cache-type) is set to `filesystem`.

__webpack.config.js__

```javascript
module.exports = {
  //...
  cache: {
    type: 'filesystem',
    hashAlgorithm: 'md4'
  }
};
```

### `cache.loglevel`

`string: 'debug' | 'info' | 'verbose' | 'warning'`

`cache.loglevel` tells webpack how much of `cache` log info to display.

- `'debug'`: all access and errors with stack trace
- `'info'`: all access
- `'verbose'`: all write access
- `'warning'`: only failed serialization and deserialization

`cache.loglevel` option is only available when [`cache.type`](#cache-type) is set to `filesystem`.

__webpack.config.js__

```javascript
module.exports = {
  //...
  cache: {
    type: 'filesystem',
    loglevel: 'debug'
  }
};
```

T> Caching usually doesn't emit errors. All failures are warnings and fall back to not caching this item. The build will keep working. It makes sense to enable warnings if you want to investigate why caching isn't working or doesn't increase performance. It also makes sense when developing webpack plugins that affect caching. When reporting bugs for the filesystem cache, make sure to get the stack trace of warnings with the `loglevel: 'debug'` option.

### `cache.name`

`string`

Name for the cache. Different names will lead to different coexisting caches. Defaults to `${config.name}-${config.mode}`. Using `cache.name` makes sense when you have multiple configurations which should have independent caches.

`cache.name` option is only available when [`cache.type`](#cache-type) is set to `filesystem`.

__webpack.config.js__

```javascript
module.exports = {
  //...
  cache: {
    type: 'filesystem',
    name: 'AppBuildCache'
  }
};
```

### `cache.store`

`string: 'background' | 'idle' | 'instant' | 'pack'`

`cache.store` tells webpack when to store data on the file system. Defaults to `'idle'`.

- `'background'`: Store data in background while compiling, but doesn't block the compilation
- `'idle'`: Store data when compiler is idle in one file per cached item
- `'instant'`: Store data when instantly. Blocks compilation until data is stored
- `'pack'`: Store data when compiler is idle in a single file for all cached items

`cache.store` option is only available when [`cache.type`](#cache-type) is set to `filesystem`.

__webpack.config.js__

```javascript
module.exports = {
  //...
  cache: {
    type: 'filesystem',
    store: 'background'
  }
};
```

### `cache.version`

`string: ''`

Version of the cache data. Different versions won't allow to reuse the cache and override existing content. Update the version when config changed in a way which doesn't allow to reuse cache. This will invalidate the cache. Defaults to `''`.

`cache.version` option is only available when [`cache.type`](#cache-type) is set to `filesystem`.

__webpack.config.js__

```javascript
module.exports = {
  //...
  cache: {
    type: 'filesystem',
    version: 'your_version'
  }
};
```

W> Don't share the cache between calls with different options.


## `loader`

`object`

Expose custom values into the loader context.

?> Add an example...


## `parallelism`

`number`

Limit the number of parallel processed modules. Can be used to fine tune performance or to get more reliable profiling results.


## `profile`

`boolean`

Capture a "profile" of the application, including statistics and hints, which can then be dissected using the [Analyze](https://webpack.github.io/analyse/) tool.

T> Use the [StatsPlugin](https://www.npmjs.com/package/stats-webpack-plugin) for more control over the generated profile.

T> Combine with `parallelism: 1` for better results.


## `recordsPath`

Use this option to generate a JSON file containing webpack "records" -- pieces of data used to store module identifiers across multiple builds. You can use this file to track how modules change between builds. To generate one, simply specify a location:

```js
module.exports = {
  //...
  recordsPath: path.join(__dirname, 'records.json')
};
```

Records are particularly useful if you have a complex setup that leverages [Code Splitting](/guides/code-splitting). The data can be used to ensure the split bundles are achieving the [caching](/guides/caching) behavior you need.

T> Note that although this file is generated by the compiler, you may still want to track it in source control to keep a history of how it has changed over time.

W> Setting `recordsPath` will essentially set `recordsInputPath` and `recordsOutputPath` to the same location. This is usually all that's necessary unless you decide to change the name of the file containing the records. See below for an example.


## `recordsInputPath`

Specify the file from which to read the last set of records. This can be used to rename a records file. See the example below.


## `recordsOutputPath`

Specify where the records should be written. The following example shows how you might use this option in combination with `recordsInputPath` to rename a records file:

```js
module.exports = {
  //...
  recordsInputPath: path.join(__dirname, 'records.json'),
  recordsOutputPath: path.join(__dirname, 'newRecords.json')
};
```
