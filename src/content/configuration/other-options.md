---
title: 其它选项
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
  - title: 使用 Records
    url: https://survivejs.com/webpack/optimizing/separating-manifest/#using-records
---


这里是 webpack 支持的其它选项。

W> 寻求帮助：这个页面还在更新中，如果你发现本页面内有描述不准确或者不完整，请在 [webpack 的文档仓库](https://github.com/webpack/webpack.js.org)中创建 issue 或者 pull request


## `amd` {#amd}

`object` `boolean: false`

设置 `require.amd` 或 `define.amd` 的值。设置 `amd` 为 `false` 会禁用 webpack 的 AMD 支持。

__webpack.config.js__

```javascript
module.exports = {
  //...
  amd: {
    jQuery: true
  }
};
```

某些流行的模块是按照 AMD 规范编写的，最引人瞩目的 jQuery 版本在 1.7.0 到 1.9.1，如果 loader 提示它对页面包含的多个版本采取了[特殊许可](https://github.com/amdjs/amdjs-api/wiki/jQuery-and-AMD)时，才会注册为 AMD 模块。

许可权限是具有「限制指定版本注册」或「支持有不同定义模块的不同沙盒」的能力。

此选项允许将模块查找的键(key)设置为真值(truthy value)。
发生这种情况时，webpack 中的 AMD 支持将忽略定义的名称。



## `bail` {#bail}

`boolean = false`

在第一个错误出现时抛出失败结果，而不是容忍它。默认情况下，当使用 HMR 时，webpack 会将在终端以及浏览器控制台中，以红色文字记录这些错误，但仍然继续进行打包。要启用它：

__webpack.config.js__

```javascript
module.exports = {
  //...
  bail: true
};
```

这将迫使 webpack 退出其打包过程。


## `cache` {#cache}

`boolean` `object`

缓存生成的 webpack 模块和 chunk，来改善构建速度。`cache` 会在[`开发` 模式](/configuration/mode/#mode-development)被设置成 `type: 'memory'` 而且在 [`生产` 模式](/configuration/mode/#mode-production) 中被禁用。 `cache: true` 与 `cache: { type: 'memory' }` 配置作用一致。 传入  `false` 会禁用缓存:

__webpack.config.js__

```javascript
module.exports = {
  //...
  cache: false
};
```


### `cache.type` {#cachetype}

`string: 'memory' | 'filesystem'`

将 `cache` 类型设置成内存或者文件系统。`memory` 选项很简单，它会告诉 webpack 将内容存放在内存中并且不允许额外的配置：

__webpack.config.js__

```javascript
module.exports = {
  //...
  cache: {
    type: 'memory'
  }
};
```

当将 `cache.type` 设置成 `filesystem` 会开放更多的选荐可配置。

### `cache.cacheDirectory` {#cachecachedirectory}

`string`

缓存的。默认为 `node_modules/.cache/webpack`。

`cache.cacheDirectory` 选项仅当 [`cache.type`](#cachetype) 被设置成 `filesystem` 才可用。

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

W> 最终的缓存目标是 `cache.cacheDirectory` + `cache.name` 的混合.

### `cache.cacheLocation` {#cachecachelocation}

`string`

缓存的路径。默认值为 `path.resolve(cache.cacheDirectory, cache.name)`.

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

### `cache.buildDependencies` {#cachebuilddependencies}

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

### `cache.managedPaths` {#cachemanagedpaths}

`[string] = ['./node_modules']`

W> Moved to [snapshot.managedPaths](#managedpaths)

`cache.managedPaths` is an array of package-manager only managed paths. webpack will avoid hashing and timestamping them, assume the version is unique and will use it as a snapshot (for both memory and filesystem cache).

### `cache.hashAlgorithm` {#cachehashalgorithm}

`string`

用于哈希生成的算法。详情请参阅 [Node.js crypto](https://nodejs.org/api/crypto.html)。默认值为 `md4`.

`cache.hashAlgorithm` 选项仅当 [`cache.type`](#cachetype) 设置成 `filesystem` 才可配置。

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

### `cache.name` {#cachename}

`string`

缓存的名称。不同的名字会导致不同的的共存的缓存。默认值为 `${config.name}-${config.mode}`。使用 `cache.name` 当你有多份配置的时候，是比较合理的因为会有配置会有独立的缓存。

`cache.name` 选项仅当 [`cache.type`](#cachetype) 被设置成 `filesystem` 的时候可进行配置。

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

### `cache.store` {#cachestore}

`string = 'pack': 'pack'`

`cache.store` 告诉 webpack 什么时候将数据存放在文件系统中。

- `'pack'`: 当编译器闲置时候，将缓存数据都存放在一个文件中

`cache.store` 选项仅当 [`cache.type`](#cachetype) 设置成 `filesystem` 才可配置。

W> `pack` 是 webpack 5.0.x 起唯一支持的类型

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

### `cache.version` {#cacheversion}

`string = ''`

缓存数据的版本。不同版本不会允许重用缓存和重载当前的内容。当配置以一种无法重用缓存的方式改变时，要更新缓存的版本。这会让缓存失效。

`cache.version` 选项仅当 [`cache.type`](#cachetype) 设置成 `filesystem` 才可配置。

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

W> 在具有不同选项的调用之间不要共享缓存。

### `cache.idleTimeout` {#cacheidletimeout}

`number = 10000`

单位毫秒。 `cache.idleTimeout` 表示缓存存储发生后的时间段。

__webpack.config.js__

```javascript
module.exports = {
  //..
  cache: {
    idleTimeout: 10000
  }
};
```

W> `cache.idleTimeout` 仅当 [`cache.store`](#cachestore) 设置成 `'pack'` 才可配置。

### `cache.idleTimeoutForInitialStore` {#cacheidletimeoutforinitialstore}

`number = 0`

单位毫秒。 `cache.idleTimeoutForInitialStore` 是在初始缓存存储发生后的时间段。

__webpack.config.js__

```javascript
module.exports = {
  //..
  cache: {
    idleTimeoutForInitialStore: 0
  }
};
```

W> `cache.idleTimeoutForInitialStore` 仅当 [`cache.store`](#cachestore) 设置成 `'pack'` 才可配置。

## `ignoreWarnings` {#ignorewarnings}

`RegExp` `function (WebpackError, Compilation) => boolean` `{module?: RegExp, file?: RegExp, message?: RegExp}`

告诉 webpack 忽略掉特定的警告。类型可以是 `RegExp`，可以是自定义 `function`。如果类型为函数，可基于原始 warning 来选择性展示警告，其参数分别为 `WebpackError` 和 `Compilation`，且返回值为 `boolean`。还可以包含以下属性的 `object`：

- `file`： 类型为 `RegExp`，用于选择出现警告的源文件。
- `message`： 类型为 `RegExp`，用于选择警告的内容。
- `module`： 类型为 `RegExp`，用于选择警告来源的模块。

`ignoreWarnings` 可以是上述任意类型组成的 `array`。

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

## `loader` {#loader}

`object`

在 [loader 上下文](/api/loaders/#the-loader-context)中暴露自定义值。

例如，你可以在 loader 上下文中定义一个新变量：

__webpack.config.js__

```javascript
module.exports = {
  // ...
  loader: {
    answer: 42
  }
};
```

然后使用 `this.answer` 在 loader 中获取该值：

__custom-loader.js__

```javascript
module.exports = function (source) {
  // ...
  console.log(this.answer); // will log `42` here
  return source;
};
```

T> 你可以覆盖 loader 上下文中的属性，因为 webpack 会将所有定义在 `loader` 中的属性负责到 loader 上下文中。

## `parallelism` {#parallelism}

`number = 100`

限制并行处理的模块数量。可以用于调优性能或获取更可靠的性能分析结果。



## `profile` {#profile}

`boolean`

捕获一个应用程序"配置文件"，包括统计和提示，然后可以使用 [Analyze](https://webpack.github.io/analyse/) 分析工具进行详细分析。

T> 使用 [StatsPlugin](https://www.npmjs.com/package/stats-webpack-plugin) 可以更好地控制生成的配置文件。

T> 与 `parallelism: 1` 混用以达到更好的结果。


## `recordsPath` {#recordspath}

`string`

<<<<<<< HEAD
开启这个选项可以生成一个 JSON 文件，其中含有 webpack 的 "records" 记录 - 即「用于存储跨多次构建(across multiple builds)的模块标识符」的数据片段。可以使用此文件来跟踪在每次构建之间的模块变化。只要简单的设置一下路径,就可以生成这个 JSON 文件：
=======
Use this option to generate a JSON file containing webpack "records" – pieces of data used to store module identifiers across multiple builds. You can use this file to track how modules change between builds. To generate one, simply specify a location:
>>>>>>> 5c00973b146f353548380643e6555bfb847079bd

__webpack.config.js__

```javascript
const path = require('path');

module.exports = {
  //...
  recordsPath: path.join(__dirname, 'records.json')
};
```

如果你使用了[代码分离(code splittnig)](/guides/code-splitting)这样的复杂配置，records 会特别有用。这些数据用于确保拆分 bundle，以便实现你需要的[缓存(caching)](/guides/caching)行为。

T> 注意，虽然这个文件是由编译器(compiler)生成的，但你可能仍然希望在源代码管理中追踪它，以便随时记录它的变化情况。

W> 设置 `recordsPath` 本质上会把 `recordsInputPath` 和 `recordsOutputPath` 都设置成相同的路径。通常来讲这也是符合逻辑的，除非你决定改变记录文件的名称。可以查看下面的实例：


## `recordsInputPath` {#recordsinputpath}

`string`

指定读取最后一条记录的文件的名称。这可以用来重命名一个记录文件，可以查看下面的实例：


## `recordsOutputPath` {#recordsoutputpath}

`string`

指定记录要写入的位置。以下示例描述了如何用这个选项和 `recordsInptuPaht` 来重命名一个记录文件：

__webpack.config.js__

```javascript
const path = require('path');

module.exports = {
  //...
  recordsInputPath: path.join(__dirname, 'records.json'),
  recordsOutputPath: path.join(__dirname, 'newRecords.json')
};
```


## `name` {#name}

`string`

配置的名称。当加载不同的配置时会被使用。

__webpack.config.js__

```javascript
module.exports = {
  //...
  name: 'admin-app'
};
```

## infrastructureLogging {#infrastructurelogging}

用于基础设施水平的日志选项。

`object = {}`

### level {#level}

`string`

开启基础设施日志输出。与 [`stats.logging`](/configuration/stats/#statslogging) 选项类似但仅仅是对于基础设施而言。 没有默认值提供。

可能的取值：

- `'none'` - 禁用日志
- `'error'` - 仅仅显示错误
- `'warn'` - 仅仅显示错误与告警
- `'info'` - 显示错误、告警与信息
- `'log'` - 显示错误、告警，信息，日志信息，组别，清楚。 收缩的组别会在收缩的状态中被显示。
- `'verbose'` - 输出所有日志除了调试与追踪。收缩的组别会在扩展的状态中被显示。

__webpack.config.js__

```javascript
module.exports = {
  //...
  infrastructureLogging: {
    level: 'info'
  }
};
```

### debug {#debug}

`string` `RegExp` `function(name) => boolean` `[string, RegExp, function(name) => boolean]`

开启特定日志比如插件(plugins)和加载器(loaders)的调试信息。 与 [`stats.loggingDebug`](/configuration/stats/#statsloggingdebug) 选项类似但仅仅对于基础设施而言。没有默认配置提供。

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
