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
  - niravasher
  - Neob91
  - chenxsan
  - u01jmg3
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

### `cache.cacheLocation`

`string`

Locations for the cache. Defaults to `path.resolve(cache.cacheDirectory, cache.name)`.

__webpack.config.js__

```javascript
const path = require('path');

module.exports = {
  //...
  cache: {
    type: 'filesystem',
    cacheLocation: path.resolve(__dirname, '.test_cache')
  }
};
```

### `cache.buildDependencies`

`object`

`cache.buildDependencies` is an object of arrays of additional code dependencies for the build. webpack will use a hash of each of these items and all dependencies to invalidate the filesystem cache.

Defaults to `webpack/lib` to get all dependencies of webpack.

T> It's recommended to set `cache.buildDependencies.config: [__filename]` in your webpack configuration to get the latest configuration and all dependencies.

```javascript
module.exports = {
  cache: {
    buildDependencies: {
      // This makes all dependencies of this file - build dependencies
      config: [__filename]
      // By default webpack and loaders are build dependencies
    }
  }
};
```

### `cache.managedPaths`

`[string] = ['./node_modules']`

W> Moved to [snapshot.managedPaths](#managedpaths)

`cache.managedPaths` is an array of package-manager only managed paths. webpack will avoid hashing and timestamping them, assume the version is unique and will use it as a snapshot (for both memory and filesystem cache).

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

W> `cache.idleTimeout` is only available when [`cache.store`](#cachestore) is set to `'pack'`

### `cache.idleTimeoutForInitialStore`

`number = 0`

Time in milliseconds. `cache.idleTimeoutForInitialStore` is the time period after which the initial cache storing should happen.

__webpack.config.js__

```javascript
module.exports = {
  //..
  cache: {
    idleTimeoutForInitialStore: 0
  }
};
```

W> `cache.idleTimeoutForInitialStore` is only available when [`cache.store`](#cachestore) is set to `'pack'`

## `ignoreWarnings`

`RegExp` `function (WebpackError, Compilation) => boolean` `{module?: RegExp, file?: RegExp, message?: RegExp}`

Tells webpack to ignore specific warnings. This can be done with a `RegExp`, a custom `function` to select warnings based on the raw warning instance which is getting `WebpackError` and `Compilation` as arguments and returns a `boolean`, an `object` with the following properties:

- `file` : A RegExp to select the origin file for the warning.
- `message` : A RegExp to select the warning message.
- `module` : A RegExp to select the origin module for the warning.

`ignoreWarnings` can be an `array` of any of the above.

```javascript
module.exports = {
  //...
  ignoreWarnings: [
    {
      module: /module2\.js\?[34]/ // A RegExp
    },
    {
      module: /[13]/,
      message: /homepage/
    },
    (warning) => true
  ]
};
```

## `loader`

`object`

Expose custom values into the [loader context](/api/loaders/#the-loader-context).

For example, you can define a new variable in the loader context:

__webpack.config.js__

```javascript
module.exports = {
  // ...
  loader: {
    answer: 42
  }
};
```

Then use `this.answer` to get its value in the loader:

__custom-loader.js__

```javascript
module.exports = function (source) {
  // ...
  console.log(this.answer); // will log `42` here
  return source;
};
```

T> You can override properties in the loader context as webpack copies all properties that are defined in the `loader` to the loader context.

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

Use this option to generate a JSON file containing webpack "records" – pieces of data used to store module identifiers across multiple builds. You can use this file to track how modules change between builds. To generate one, simply specify a location:

__webpack.config.js__

```javascript
const path = require('path');

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
const path = require('path');

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

## infrastructureLogging

Options for infrastructure level logging.

`object = {}`

### level

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

### debug

`string` `RegExp` `function(name) => boolean` `[string, RegExp, function(name) => boolean]`

Enable debug information of specified loggers such as plugins or loaders. Similar to [`stats.loggingDebug`](/configuration/stats/#statsloggingdebug) option but for infrastructure. No default value is given.

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

## `snapshot`

`object`

`snapshot` options decide how the file system snapshots are created and invalidated.

__webpack.config.js__

```javascript
const path = require('path');
module.exports = {
  // ...
  snapshot: {
    managedPaths: [path.resolve(__dirname, '../node_modules')],
    immutablePaths: [],
    buildDependencies: {
      hash: true,
      timestamp: true
    },
    module: {
      timestamp: true
    },
    resolve: {
      timestamp: true
    },
    resolveBuildDependencies: {
      hash: true,
      timestamp: true
    }
  }
};
```

### `managedPaths`

`[string]`

An array of paths that are managed by a package manager and can be trusted to not be modified otherwise.

### `immutablePaths`

`[string]`

An array of paths that are managed by a package manager and contain a version or a hash in their paths so that all files are immutable.

### `buildDependencies`

`object = { hash boolean = true, timestamp boolean = true }`

Snapshots for build dependencies when using the persistent cache.

- `hash`: Compare content hashes to determine invalidation (more expensive than `timestamp`, but changes less often).
- `timestamp`: Compare timestamps to determine invalidation.

Both `hash` and `timestamp` are optional.

- `{ hash: true }`: Good for CI caching with a fresh checkout which doesn't keep timestamps and uses hashes.
- `{ timestamp: true }`: Good for local development caching.
- `{ timestamp: true, hash: true }`: Good for both cases mentioned above. Timestamps are compared first, which is cheap because webpack doesn't need to read files to compute their hashes. Content hashes will be compared only when timestamps are the same, which leads to a small performance hit for the initial build.

### `module`

`object = {hash boolean = true, timestamp boolean = true}`

Snapshots for building modules.

- `hash`: Compare content hashes to determine invalidation (more expensive than `timestamp`, but changes less often).
- `timestamp`: Compare timestamps to determine invalidation.

### `resolve`

`object = {hash boolean = true, timestamp boolean = true}`

Snapshots for resolving of requests.

- `hash`: Compare content hashes to determine invalidation (more expensive than `timestamp`, but changes less often).
- `timestamp`: Compare timestamps to determine invalidation.

### `resolveBuildDependencies`

`object = {hash boolean = true, timestamp boolean = true}`

Snapshots for resolving of build dependencies when using the persistent cache.

- `hash`: Compare content hashes to determine invalidation (more expensive than `timestamp`, but changes less often).
- `timestamp`: Compare timestamps to determine invalidation.
