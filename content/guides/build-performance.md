---
title: Build Performance
sort: 17
contributors:
  - sokra
---

This is a collections for useful tips for build performance.

# General

## webpack version

Use the latest webpack version. We always do performance improvements.

## Loaders

Apply loaders only to the minimal number of modules.

Instead of

``` js
{
  test: /\.js$/,
  loader: "babel-loader"
}
```

use the `include` field to apply the loader only to a subset of modules:

``` js
{
  test: /\.js$/,
  include: path.resolve(__dirname, "src"),
  loader: "babel-loader"
}
```

## Bootstrap

Each additional loader/plugin has a bootup time. Try to use a few different tools are possible.

## Node.js version

Use the latest Node.js version for best performance.

## Resolving

* Minimize number of items in `resolve.modules`, `resolve.extensions`, `resolve.mainFiles`, `resolve.descriptionFiles` as they increase the number of filesystem calls
* Set `resolve.symlinks: false` if you don't use symlinks/`npm link`/`yarn link`
* Set `resolve.cacheWithContext: false` if you use custom resolving plugins, that are not context specific.

## Npm/Yarn version

Use the latest Npm/Yarn version. They create more efficient module trees compared to older Npm versions. They increases the performance of resolving.

## Dlls

Use the DllPlugin to move less often changed into a separate compilation. This improves build time of the application compilation, but increases complexitity of the build process.

## Smaller = Faster

Decrease the total size of the compilation. This increase build performance. Try to keep chunks small.

* Use less/smaller libraries
* Use the CommonsChunksPlugin in Multi-Page Applications
* Use the CommonsChunksPlugin in async mode in Multi-Page Applications
* Remove unused code.
* Only compile the part of the code you are currenly developing on.

## Worker pool

Use the `thread-loader` to offload expensive loaders to a worker pool.

Don't use too many workers as there is a boot overhead for the Node.js runtime and the loader.

Minimize the module transfers between worker and main process. IPC is expensive.

## Persistent cache

Enable persistent cache with the `cache-loader`.

Clear cache directory on `"postinstall"` in `package.json`.

## Custom plugins/loaders

Profile them to not intruduce a performance problem here.

# Development

## Incremental Builds

Use webpacks watching. Don't use other tools to watch your files and invoke webpack. webpacks watching keeps track of timestamps and passes this information to the compilation for cache invalidation.

In some setups watching falls back to polling mode. With many watched files this can cause a lot CPU load. In these cases increase the polling interval with `watchOptions.poll`.

## Compile in memory

Use one of these tools:

* webpack-dev-server
* webpack-hot-middleware
* webpack-dev-middleware

They compile and serve assets in memory and avoid writing to disk.

## Devtool

Be aware of the performance differences of the different `devtool` settings.

* `"eval"` has the best performance, but doesn't assist you for transpilied code.
* The `cheap-source-map` variants are more performant, if you can live with the slightly worse mapping quality.
* Use a `eval-source-map` variant for incremental builds.

=> In most cases `eval-cheap-module-source-map` is the best option.

## No production-only tooling

In most cases it doesn't make sense to use these tools in development:

* `UglifyJsPlugin`
* `ExtractTextPlugin`
* `[hash]`/`[chunkhash]`
* `AggressiveSplittingPlugin`
* `AggressiveMergingPlugin`
* `ModuleConcatenationPlugin`

## Minimal entry chunk

webpack only emits updated chunks to the filesystem. For some configuration options (HMR, `[name]`/`[chunkhash]` in `output.chunkFilename`, `[hash]`) the entry chunk is invalidated is addition to the changed chunks.

Make sure the entry chunk is cheap to emit by keeping it small.

This adds a chunk which only contains the runtime and is parent of all other chunks.

``` js
new CommonsChunkPlugin({
  name: "manifest",
  minChunks: Infinity
})
```

# Production

## Don't sacrifice quality

Keep in mind that optimization quality is in most cases more important than build performance

## Multiple compilations

When using multiple compilations the following tools can help:

* [`parallel-webpack`](https://github.com/trivago/parallel-webpack): It allows to do compilation in a worker pool.
* `cache-loader`: The cache can be shared between multiple compilations.

## SourceMaps

SourceMaps are really expensive. Do you really need them?

# Specific Tools

## Babel

* Minimize the number of preset/plugins

## Typescript

* Use fork-ts-checker-webpack-plugin to do typechecking in a separate process
  * and configure loaders to skip typechecking
* Use ts-loader in `happyPackMode: true` / `transpileOnly: true`

## Sass

`node-sass` has a bug which blocks threads from the Node.js threadpool. When using it with the `thread-loader` set `workerParallelJobs: 2`.

