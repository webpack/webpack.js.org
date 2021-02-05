---
title: Build Performance
sort: 9
contributors:
  - sokra
  - tbroadley
  - byzyk
  - madhavarshney
  - wizardofhogwarts
  - anikethsaha
---

This guide contains some useful tips for improving build/compilation performance.

---

## General

The following best practices should help, whether you're running build scripts in [development](/guides/development) or [production](/guides/production).

### Stay Up to Date

Use the latest webpack version. We are always making performance improvements. The latest recommended version of webpack is:

[![latest webpack version](https://img.shields.io/github/package-json/v/webpack/webpack.svg?label=webpack&style=flat-square&maxAge=3600)](https://github.com/webpack/webpack/releases)

Staying up-to-date with **Node.js** can also help with performance. On top of this, keeping your package manager (e.g. `npm` or `yarn`) up-to-date can also help. Newer versions create more efficient module trees and increase resolving speed.

### Loaders

Apply loaders to the minimal number of modules necessary. Instead of:

```js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ],
  },
};
```

Use the `include` field to only apply the loader modules that actually need to be transformed by it:

```js
const path = require('path');

module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
      },
    ],
  },
};
```

### Bootstrap

Each additional loader/plugin has a bootup time. Try to use as few tools as possible.

### Resolving

The following steps can increase resolving speed:

- Minimize the number of items in `resolve.modules`, `resolve.extensions`, `resolve.mainFiles`, `resolve.descriptionFiles`, as they increase the number of filesystem calls.
- Set `resolve.symlinks: false` if you don't use symlinks (e.g. `npm link` or `yarn link`).
- Set `resolve.cacheWithContext: false` if you use custom resolving plugins, that are not context specific.

### Dlls

Use the `DllPlugin` to move code that is changed less often into a separate compilation. This will improve the application's compilation speed, although it does increase complexity of the build process.

### Smaller = Faster

Decrease the total size of the compilation to increase build performance. Try to keep chunks small.

- Use fewer/smaller libraries.
- Use the `SplitChunksPlugin` in Multi-Page Applications.
- Use the `SplitChunksPlugin` in `async` mode in Multi-Page Applications.
- Remove unused code.
- Only compile the part of the code you are currently developing on.

### Worker Pool

The `thread-loader` can be used to offload expensive loaders to a worker pool.

W> Don't use too many workers, as there is a boot overhead for the Node.js runtime and the loader. Minimize the module transfers between worker and main process. IPC is expensive.

### Persistent cache

Use [`cache`](/configuration/other-options/#cache) option in webpack configuration. Clear cache directory on `"postinstall"` in `package.json`.

T> We support yarn PnP version 3 [`yarn 2 berry`](https://yarnpkg.com/features/pnp) for persistent caching.

### Custom plugins/loaders

Profile them to not introduce a performance problem here.

### Progress plugin

It is possible to shorten build times by removing `ProgressPlugin` from webpack's configuration. Keep in mind, `ProgressPlugin` might not provide as much value for fast builds as well, so make sure you are leveraging the benefits of using it.

---

## Development

The following steps are especially useful in _development_.

### Incremental Builds

Use webpack's watch mode. Don't use other tools to watch your files and invoke webpack. The built-in watch mode will keep track of timestamps and passes this information to the compilation for cache invalidation.

In some setups, watching falls back to polling mode. With many watched files, this can cause a lot of CPU load. In these cases, you can increase the polling interval with `watchOptions.poll`.

### Compile in Memory

The following utilities improve performance by compiling and serving assets in memory rather than writing to disk:

- `webpack-dev-server`
- `webpack-hot-middleware`
- `webpack-dev-middleware`

### stats.toJson speed

webpack 4 outputs a large amount of data with its `stats.toJson()` by default. Avoid retrieving portions of the `stats` object unless necessary in the incremental step. `webpack-dev-server` after v3.1.3 contained a substantial performance fix to minimize the amount of data retrieved from the `stats` object per incremental build step.

### Devtool

Be aware of the performance differences between the different `devtool` settings.

- `"eval"` has the best performance, but doesn't assist you for transpiled code.
- The `cheap-source-map` variants are more performant if you can live with the slightly worse mapping quality.
- Use a `eval-source-map` variant for incremental builds.

T> In most cases, `eval-cheap-module-source-map` is the best option.

### Avoid Production Specific Tooling

Certain utilities, plugins, and loaders only make sense when building for production. For example, it usually doesn't make sense to minify and mangle your code with the `TerserPlugin` while in development. These tools should typically be excluded in development:

- `TerserPlugin`
- `[fullhash]`/`[chunkhash]`/`[contenthash]`
- `AggressiveSplittingPlugin`
- `AggressiveMergingPlugin`
- `ModuleConcatenationPlugin`

### Minimal Entry Chunk

webpack only emits updated chunks to the filesystem. For some configuration options, (HMR, `[name]`/`[chunkhash]`/`[contenthash]` in `output.chunkFilename`, `[fullhash]`) the entry chunk is invalidated in addition to the changed chunks.

Make sure the entry chunk is cheap to emit by keeping it small. The following configuration creates an additional chunk for the runtime code, so it's cheap to generate:

```js
module.exports = {
  // ...
  optimization: {
    runtimeChunk: true,
  },
};
```

### Avoid Extra Optimization Steps

webpack does extra algorithmic work to optimize the output for size and load performance. These optimizations are performant for smaller codebases, but can be costly in larger ones:

```js
module.exports = {
  // ...
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
};
```

### Output Without Path Info

webpack has the ability to generate path info in the output bundle. However, this puts garbage collection pressure on projects that bundle thousands of modules. Turn this off in the `options.output.pathinfo` setting:

```js
module.exports = {
  // ...
  output: {
    pathinfo: false,
  },
};
```

### Node.js Versions 8.9.10-9.11.1

There was a [performance regression](https://github.com/nodejs/node/issues/19769) in Node.js versions 8.9.10 - 9.11.1 in the ES2015 `Map` and `Set` implementations. webpack uses those data structures liberally, so this regression affects compile times.

Earlier and later Node.js versions are not affected.

### TypeScript Loader

To improve the build time when using `ts-loader`, use the `transpileOnly` loader option. On its own, this option turns off type checking. To gain type checking again, use the [`ForkTsCheckerWebpackPlugin`](https://www.npmjs.com/package/fork-ts-checker-webpack-plugin). This speeds up TypeScript type checking and ESLint linting by moving each to a separate process.

```js
module.exports = {
  // ...
  test: /\.tsx?$/,
  use: [
    {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
      },
    },
  ],
};
```

T> There is a [full example](https://github.com/TypeStrong/ts-loader/tree/master/examples/fork-ts-checker-webpack-plugin) on the `ts-loader` GitHub repository.

---

## Production

The following steps are especially useful in _production_.

W> **Don't sacrifice the quality of your application for small performance gains!** Keep in mind that optimization quality is, in most cases, more important than build performance.

### Multiple Compilations

When using multiple compilations, the following tools can help:

- [`parallel-webpack`](https://github.com/trivago/parallel-webpack): It allows for compilation in a worker pool.
- `cache-loader`: The cache can be shared between multiple compilations.

### Source Maps

Source maps are really expensive. Do you really need them?

---

## Specific Tooling Issues

The following tools have certain problems that can degrade build performance:

### Babel

- Minimize the number of preset/plugins

### TypeScript

- Use the `fork-ts-checker-webpack-plugin` for typechecking in a separate process.
- Configure loaders to skip typechecking.
- Use the `ts-loader` in `happyPackMode: true` / `transpileOnly: true`.

### Sass

- `node-sass` has a bug which blocks threads from the Node.js thread pool. When using it with the `thread-loader` set `workerParallelJobs: 2`.
