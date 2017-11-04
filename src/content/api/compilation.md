---
title: Compilation
group: Plugins
sort: 3
---

Compilation 实例继承于 compiler。例如，compiler.compilation 是对所有 require 图(graph)中对象的字面上的编译。这个对象可以访问所有的模块和它们的依赖（大部分是循环依赖）。在编译阶段，模块被加载，封闭，优化，分块，哈希和重建等等。这将是编译中任何操作主要的生命周期。

``` js
compiler.plugin("compilation", function(compilation) {
    // 主要的编译实例
    // 随后所有的方法都从 compilation.plugin 上得来
});
```


## `normal-module-loader`

普通模块 loader，真实地一个一个加载模块图(graph)中所有的模块的函数。

``` js
compilation.plugin('normal-module-loader', function(loaderContext, module) {
  // 这里是所以模块被加载的地方
  // 一个接一个，此时还没有依赖被创建
});
```


## `seal`

编译的封闭已经开始。

``` js
compilation.plugin('seal', function() {
  // 你已经不能再接收到任何模块
  // 没有参数
});
```


## `optimize`

优化编译。

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

模块的优化。

``` js
compilation.plugin('optimize-modules', function(modules) {
  // 树优化期间处理模块数组
});
```


## `after-optimize-modules(modules: Module[])`

模块优化已经结束。


## `optimize-chunks(chunks: Chunk[])`

块的优化。

```javascript
//这里一般只有一个块，除非你在配置中指定了多个入口

compilation.plugin('optimize-chunks', function(chunks) {
    // 这里一般只有一个块，
    // 除非你在配置中指定了多个入口
    chunks.forEach(function (chunk) {
        // Chunks have circular references to their modules
        chunk.modules.forEach(function (module){
            // module.loaders, module.rawRequest, module.dependencies, etc.
        });
    });
});
```

## `after-optimize-chunks(chunks: Chunk[])`

Optimizing the chunks has finished.


## `revive-modules(modules: Module[], records)`

Restore module info from records.


## `optimize-module-order(modules: Module[])`

Sort the modules in order of importance. The first is the most important module. It will get the smallest id.


## `optimize-module-ids(modules: Module[])`

Optimize the module ids.


## `after-optimize-module-ids(modules: Module[])`

Optimizing the module ids has finished.


## `record-modules(modules: Module[], records)`

Store module info to the records.


## `revive-chunks(chunks: Chunk[], records)`

Restore chunk info from records.


## `optimize-chunk-order(chunks: Chunk[])`

Sort the chunks in order of importance. The first is the most important chunk. It will get the smallest id.


## `optimize-chunk-ids(chunks: Chunk[])`

Optimize the chunk ids.


## `after-optimize-chunk-ids(chunks: Chunk[])`

Optimizing the chunk ids has finished.


## `record-chunks(chunks: Chunk[], records)`

Store chunk info to the records.


## `before-hash`

Before the compilation is hashed.


## `after-hash`

After the compilation is hashed.


## `before-chunk-assets`

Before creating the chunk assets.


## `additional-chunk-assets(chunks: Chunk[])`

Create additional assets for the chunks.


## `record(compilation, records)`

Store info about the compilation to the records


## `additional-assets` async

Create additional assets for the compilation

Here's an example that downloads an image.

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


## `optimize-chunk-assets(chunks: Chunk[])` async

优化 chunk 的生成资源。

生成资源被存储在 `this.assets`，但是它们并不都是块的生成资源。一个 `Chunk` 有一个 `files` 属性指出这个块创建的所有文件。附加的生成资源被存储在 `this.additionalChunkAssets` 中。

这是一个为每个 chunk 添加 banner 的例子。

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

块生成资源已经被优化。这里是一个来自 [@boopathi](https://github.com/boopathi) 的示例插件，详细的输出每个块里有什么。

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


## `optimize-assets(assets: Object{name: Source})` async

优化所有生成资源。

生成资源被存放在 `this.assets`。


## `after-optimize-assets(assets: Object{name: Source})`

生成资源优化已经结束。


## `build-module(module)`

一个模块构建开始前。

``` js
compilation.plugin('build-module', function(module){
  console.log('About to build: ', module);
});
```


## `succeed-module(module)`

一个模块已经被成功构建。

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

一个模块中的一个生成资源被加到编译中。


## `chunk-asset(chunk, filename)`

一个 chunk 中的一个生成资源被加到编译中。

***

> 原文：https://webpack.js.org/api/plugins/compilation/
