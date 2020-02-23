---
title: Other Options
sort: 20
contributors:
  - sokra
  - skipjack
  - terinjokes
  - byzyk
  - liorgreenb
  - vansosnin
  - EugeneHlushko
  - skovy
  - rishabh3112
  - Neob91
related:
  - title: Using Records
    url: https://survivejs.com/webpack/optimizing/separating-manifest/#using-records
---


These are the remaining configuration options supported by webpack.

W> Help Wanted: This page is still a work in progress. If you are familiar with any of the options for which the description or examples are incomplete, please create an issue and submit a PR at the [docs repo](https://github.com/webpack/webpack.js.org)!


## `amd`

`object` `boolean: false`

Set the value of `require.amd` or `define.amd`. Setting `amd` to `false` will disable webpack's AMD support.

__webpack.config.js__

```javascript
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

`boolean = false`

Fail out on the first error instead of tolerating it. By default webpack will log these errors in red in the terminal, as well as the browser console when using HMR, but continue bundling. To enable it:

__webpack.config.js__

```javascript
module.exports = {
  //...
  bail: true
};
```

This will force webpack to exit its bundling process.


## `cache`

`boolean` `object`

Cache the generated webpack modules and chunks to improve build speed. `cache` is set to `type: 'memory'` in [`development` mode](/configuration/mode/#mode-development) and disabled in [`production` mode](/configuration/mode/#mode-production). `cache: true` is an alias to `cache: { type: 'memory' }`. To disable caching pass `false`:

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

```javascript
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

`cache.cacheDirectory` option is only available when [`cache.type`](#cachetype) is set to `filesystem`.

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

`cache.hashAlgorithm` option is only available when [`cache.type`](#cachetype) is set to `filesystem`.

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

### `cache.name`

`string`

Name for the cache. Different names will lead to different coexisting caches. Defaults to `${config.name}-${config.mode}`. Using `cache.name` makes sense when you have multiple configurations which should have independent caches.

`cache.name` option is only available when [`cache.type`](#cachetype) is set to `filesystem`.

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

`string = 'pack': 'pack'`

`cache.store` tells webpack when to store data on the file system.

- `'pack'`: Store data when compiler is idle in a single file for all cached items

`cache.store` option is only available when [`cache.type`](#cachetype) is set to `filesystem`.

W> `pack` is the only supported mode since webpack 5.0.x

__webpack.config.js__

```javascript
module.exports = {
  //...
  cache: {
    type: 'filesystem',
    store: 'pack'
  }
};
```

### `cache.version`

`string = ''`

Version of the cache data. Different versions won't allow to reuse the cache and override existing content. Update the version when configuration changed in a way which doesn't allow to reuse cache. This will invalidate the cache.

`cache.version` option is only available when [`cache.type`](#cachetype) is set to `filesystem`.

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

### `cache.idleTimeout`

`number = 10000`

Time in milliseconds. `cache.idleTimeout` denotes the time period after which the cache storing should happen.

__webpack.config.js__

```javascript
module.exports = {
  //..
  cache: {
    idleTimeout: 10000
  }
};
```

W> `cache.idleTimeout` is only available when [`cache.store`](#cachestore) is set to either `'pack'` or `'idle'`

### `cache.idleTimeoutForInitialStore`

`number = 0`

Time in milliseconds. `cache.idleTimeoutForInitialStore` is the time period after which the initial cache storing should happen.

__webpack.config.js__

```javascript
module.exports = {
  //..
  cache: {
    idleTimoutForInitialStore: 0
  }
};
```

W> `cache.idleTimeoutForInitialStore` is only available when [`cache.store`](#cachestore) is set to either `'pack'` or `'idle'`

## `loader`

`object`

Expose custom values into the loader context.

?> Add an example...


## `parallelism`

`number = 100`

Limit the number of parallel processed modules. Can be used to fine tune performance or to get more reliable profiling results.



## `profile`

`boolean`

Capture a "profile" of the application, including statistics and hints, which can then be dissected using the [Analyze](https://webpack.github.io/analyse/) tool.

T> Use the [StatsPlugin](https://www.npmjs.com/package/stats-webpack-plugin) for more control over the generated profile.

T> Combine with `parallelism: 1` for better results.


## `recordsPath`

`string`

Use this option to generate a JSON file containing webpack "records" -- pieces of data used to store module identifiers across multiple builds. You can use this file to track how modules change between builds. To generate one, simply specify a location:

__webpack.config.js__

```javascript
module.exports = {
  //...
  recordsPath: path.join(__dirname, 'records.json')
};
```

Records are particularly useful if you have a complex setup that leverages [Code Splitting](/guides/code-splitting). The data can be used to ensure the split bundles are achieving the [caching](/guides/caching) behavior you need.

T> Note that although this file is generated by the compiler, you may still want to track it in source control to keep a history of how it has changed over time.

W> Setting `recordsPath` will essentially set `recordsInputPath` and `recordsOutputPath` to the same location. This is usually all that's necessary unless you decide to change the name of the file containing the records. See below for an example.


## `recordsInputPath`

`string`

Specify the file from which to read the last set of records. This can be used to rename a records file. See the example below.


## `recordsOutputPath`

`string`

Specify where the records should be written. The following example shows how you might use this option in combination with `recordsInputPath` to rename a records file:

__webpack.config.js__

```javascript
module.exports = {
  //...
  recordsInputPath: path.join(__dirname, 'records.json'),
  recordsOutputPath: path.join(__dirname, 'newRecords.json')
};
```


## `name`

`string`

Name of the configuration. Used when loading multiple configurations.

__webpack.config.js__

```javascript
module.exports = {
  //...
  name: 'admin-app'
};
```

### infrastructureLogging

Options for infrastructure level logging.

`object = {}`

#### infrastructureLogging.level

`string`

Enable infrastructure logging output. Similar to [`stats.logging`](/configuration/stats/#statslogging) option but for infrastructure. No default value is given.

Possible values:

- `'none'` - disable logging
- `'error'` - errors only
- `'warn'` - errors and warnings only
- `'info'` - errors, warnings, and info messages
- `'log'` - errors, warnings, info messages, log messages, groups, clears. Collapsed groups are displayed in a collapsed state.
- `'verbose'` - log everything except debug and trace. Collapsed groups are displayed in expanded state.

__webpack.config.js__

```javascript
module.exports = {
  //...
  infrastructureLogging: {
    level: 'info'
  }
};
```

#### infrastructureLogging.debug

`string` `RegExp` `function(name) => boolean` `[string, RegExp, function(name) => boolean]`

Enable debug information of specified loggers such as plugins or loaders. Similar to [`stats.loggingDebug`](/configuration/stats/#stats) option but for infrastructure. No default value is given.

__webpack.config.js__

```javascript
module.exports = {
  //...
  infrastructureLogging: {
    level: 'info',
    debug: [
      'MyPlugin',
      /MyPlugin/,
      (name) => name.contains('MyPlugin')
    ]
  }
};
```
