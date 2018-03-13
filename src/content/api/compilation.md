---
title: Compilation
group: Plugins
sort: 3
---

Compilation 实例继承于 compiler。例如，compiler.compilation 是对所有 require 图(graph)中对象的字面上的编译。这个对象可以访问所有的模块和它们的依赖（大部分是循环依赖）。在编译阶段，模块被加载，封闭，优化，分块，哈希和重建等等。这将是任何编译操作中，重要的生命周期。

``` js
compiler.plugin("compilation", function(compilation) {
  // 主要的编译实例
  // 随后所有的方法都从 compilation.plugin 上得来
});
```


## `normal-module-loader`

普通模块 loader，真正（一个接一个地）加载模块图(graph)中所有的模块的函数。

``` js
compilation.plugin('normal-module-loader', function(loaderContext, module) {
  // 这里是所有模块被一个接一个地加载的位置，
  // 此时还没有创建依赖
});
```


## `seal`

编译的封存已经开始。

``` js
compilation.plugin('seal', function() {
  // 你已经不能再接收到任何模块
  // 没有参数
});
```


## `optimize`

优化编译(compilation)。

``` js
compilation.plugin('optimize', function() {
  // webpack 已经进入优化阶段
  // 没有参数
});
```


## `optimize-tree(chunks, modules)` 异步

树的异步优化。

``` js
compilation.plugin('optimize-tree', function(chunks, modules) {

});
```

### `optimize-modules(modules: Module[])`

优化模块。

``` js
compilation.plugin('optimize-modules', function(modules) {
  // 树优化期间处理模块数组
});
```


## `after-optimize-modules(modules: Module[])`

优化模块已经结束。


## `optimize-chunks(chunks: Chunk[])`

优化 chunk。

```javascript
// optimize-chunks，可能会在每个编译中执行多次

compilation.plugin('optimize-chunks', function(chunks) {
    // 除非你在配置中指定了多个入口，
    // 否则此处一般只有一个 chunk
    chunks.forEach(function (chunk) {
        // chunk 具有对其模块的循环引用
        chunk.modules.forEach(function (module){
            // module.loaders, module.rawRequest, module.dependencies 等。
        });
    });
});
```

## `after-optimize-chunks(chunks: Chunk[])`

优化 chunk 已经结束。


## `revive-modules(modules: Module[], records)`

从 records 中恢复模块信息。


## `optimize-module-order(modules: Module[])`

按照重要性排序模块。第一个是最重要的模块。它会得到最小的 id。


## `optimize-module-ids(modules: Module[])`

优化模块 id。


## `after-optimize-module-ids(modules: Module[])`

优化模块 id 已经结束。


## `record-modules(modules: Module[], records)`

将模块信息存储到 records。


## `revive-chunks(chunks: Chunk[], records)`

从 records 中恢复 chunk 信息。


## `optimize-chunk-order(chunks: Chunk[])`

按重要性排序 chunk。第一个是最重要的 chunk。它会得到最小的 id。


## `optimize-chunk-ids(chunks: Chunk[])`

优化 chunk id。


## `after-optimize-chunk-ids(chunks: Chunk[])`

优化 chunk id 已经结束。


## `record-chunks(chunks: Chunk[], records)`

将 chunk 信息存储到 records。


## `before-hash`

在编译被哈希之前。


## `after-hash`

在编译被哈希之后。


## `before-chunk-assets`

在创建 chunk 资源(asset) 之前。


## `additional-chunk-assets(chunks: Chunk[])`

为 chunk 创建附加的资源(asset)。


## `record(compilation, records)`

将编译信息存储到 records 中。


## `additional-assets` 异步

为编译创建附加的资源(asset)。

这是一个下载图像的示例。

``` js
compiler.plugin('compilation', function(compilation) {
  compilation.plugin('additional-assets', function(callback) {
    download('https://img.shields.io/npm/v/webpack.svg', function(resp) {
      if(resp.status === 200) {
        compilation.assets['webpack-version.svg'] = toAsset(resp);
        callback();
      } else {
        callback(new Error('[webpack-example-plugin] Unable to download the image'));
      }
    })
  });
});
```


## `optimize-chunk-assets(chunks: Chunk[])` 异步

优化 chunk 资源(asset)。

资源(asset)会被存储在 `this.assets`，但是它们并不都是 chunk 资源。 每个 `chunk` 都有一个 `files` 属性，指向这个 chunk 创建的所有文件。附加的资源(asset)被存储在 `this.additionalChunkAssets` 中。

这是一个为每个 chunk 添加 banner 的示例。

``` js
compilation.plugin("optimize-chunk-assets", function(chunks, callback) {
  chunks.forEach(function(chunk) {
    chunk.files.forEach(function(file) {
      compilation.assets[file] = new ConcatSource("\/**Sweet Banner**\/", "\n", compilation.assets[file]);
    });
  });
  callback();
});
```

## `after-optimize-chunk-assets(chunks: Chunk[])`

chunk 资源已经被优化。这里是一个来自 [@boopathi](https://github.com/boopathi) 的示例插件，详细的输出每个 chunk 里有什么。

``` js
var PrintChunksPlugin = function() {};

PrintChunksPlugin.prototype.apply = function(compiler) {
  compiler.plugin('compilation', function(compilation, params) {
    compilation.plugin('after-optimize-chunk-assets', function(chunks) {
      console.log(chunks.map(function(c) {
        return {
          id: c.id,
          name: c.name,
          includes: c.modules.map(function(m) {
            return m.request;
          })
        };
      }));
    });
  });
};
```


## `optimize-assets(assets: Object{name: Source})` 异步

优化所有资源。

资源被存放在 `this.assets`。


## `after-optimize-assets(assets: Object{name: Source})`

资源优化已经结束。


## `build-module(module)`

在一个模块构建开始之前。

``` js
compilation.plugin('build-module', function(module){
  console.log('About to build: ', module);
});
```


## `succeed-module(module)`

成功构建一个模块。

``` js
compilation.plugin('succeed-module', function(module){
  console.log('Successfully built: ', module);
});
```


## `failed-module(module)`

一个模块构建失败。

``` js
compilation.plugin('failed-module', function(module){
  console.log('Failed to build: ', module);
});
```


## `module-asset(module, filename)`

一个模块中的一个资源被加到编译中。


## `chunk-asset(chunk, filename)`

一个 chunk 中的一个资源被加到编译中。

***

> 原文：https://webpack.js.org/api/compilation/
