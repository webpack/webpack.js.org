---
title: Compilation
sort: 3
---

Compilation 实例继承于 compiler。例如，compiler.compilation 是对所有 require 图(graph)中对象的字面上的编译。这个对象可以访问所有的模块和它们的依赖（大部分是循环依赖）。在编译阶段，模块被加载，封闭，优化，分块，哈希和重建等等。这将是编译中任何操作主要的生命周期。

```javascript
compiler.plugin("compilation", function(compilation) {
    //主要的编译实例
    //随后所有的方法都从 compilation.plugin 上得来
});
```

## `normal-module-loader`

普通模块 loader，真实地一个一个加载模块图(graph)中所有的模块的函数。

```javascript
compilation.plugin('normal-module-loader', function(loaderContext, module) {
    //这里是所以模块被加载的地方
    //一个接一个，此时还没有依赖被创建
});
```

## `seal`

编译的封闭已经开始。

```javascript
compilation.plugin('seal', function() {
    //你已经不能再接收到任何模块
    //没有参数
});
```

## `optimize`

优化编译。

```javascript
compilation.plugin('optimize', function() {
    //webpack 已经进入优化阶段
    //没有参数
});
```

## `optimize-tree(chunks, modules)` 异步

树的异步优化。

```javascript
compilation.plugin('optimize-tree', function(chunks, modules) {

});
```

#### `optimize-modules(modules: Module[])`
模块的优化。
```javascript
compilation.plugin('optimize-modules', function(modules) {
    //树优化期间处理模块数组
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
        // chunk 含有模块的循环引用
        chunk.modules.forEach(function (module){
            // module.loaders, module.rawRequest, module.dependencies 等。
        });
    });
});
```

## `after-optimize-chunks(chunks: Chunk[])`

块的优化已经结束。

## `revive-modules(modules: Module[], records)`

从记录中重建模块信息。

## `optimize-module-order(modules: Module[])`

按模块重要性重新排序，第一个模块是最重要的模块，将得到最小的 id。

## `optimize-module-ids(modules: Module[])`

优化模块的 id。

## `after-optimize-module-ids(modules: Module[])`

模块 id 优化已经结束。

## `record-modules(modules: Module[], records)`

存储模块信息到记录。

## `revive-chunks(chunks: Chunk[], records)`

从记录中重建 chunk 的信息。

## `optimize-chunk-order(chunks: Chunk[])`

按块重要性重新排序，第一个 chunk 是最重要的模块，将得到最小的 id。

## `optimize-chunk-ids(chunks: Chunk[])`

优化 chunk 的 id。

## `after-optimize-chunk-ids(chunks: Chunk[])`

chunk id 优化已经结束。

## `record-chunks(chunks: Chunk[], records)`

存储块信息到记录。

## `before-hash`

编译开始哈希前。

## `after-hash`

编译哈希后。

## `before-chunk-assets`

创建 chunk 生成资源前。

## `additional-chunk-assets(chunks: Chunk[])`

为 chunk 创建附加的生成资源。

## `record(compilation, records)`

存储编译信息到记录。

## `additional-assets` async

Create additional assets for the compilation

Here's an example that downloads an image.

```javascript
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

```javascript
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

```javascript
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

```javascript
compilation.plugin('build-module', function(module){
    console.log('build module');
    console.log(module);
});
```

## `succeed-module(module)`

一个模块已经被成功构建。
```javascript
compilation.plugin('succeed-module', function(module){
    console.log('succeed module');
    console.log(module);
});
```

## `failed-module(module)`

一个模块构建失败。
```javascript
compilation.plugin('failed-module', function(module){
    console.log('failed module');
    console.log(module);
});
```

## `module-asset(module, filename)`

一个模块中的一个生成资源被加到编译中。

## `chunk-asset(chunk, filename)`

一个 chunk 中的一个生成资源被加到编译中。

***

> 原文：https://webpack.js.org/api/plugins/compilation/
