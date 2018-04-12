---
title: loader API
sort: 4
contributors:
    - TheLarkInn
    - jhnns
    - tbroadley
---

所谓 loader 只是一个导出为函数的 JavaScript 模块。[loader runner](https://github.com/webpack/loader-runner) 会调用这个函数，然后把上一个 loader 产生的结果或者资源文件(resource file)传入进去。函数的 `this` 上下文将由 webpack 填充，并且 [loader runner](https://github.com/webpack/loader-runner) 具有一些有用方法，可以使 loader 改变为异步调用方式，或者获取 query 参数。

第一个 loader 的传入参数只有一个：资源文件(resource file)的内容。compiler 需要得到最后一个 loader 产生的处理结果。这个处理结果应该是 `String` 或者 `Buffer`（被转换为一个 string），代表了模块的 JavaScript 源码。另外还可以传递一个可选的 SourceMap 结果（格式为 JSON 对象）。

如果是单个处理结果，可以在**同步模式**中直接返回。如果有多个处理结果，则必须调用 `this.callback()`。在**异步模式**中，必须调用 `this.async()`，来指示 [loader runner](https://github.com/webpack/loader-runner) 等待异步结果，它会返回 `this.callback()` 回调函数，随后 loader 必须返回 `undefined` 并且调用该回调函数。


## 示例

以下部分提供了不同类型的 loader 的一些基本示例。注意，`map` 和 `meta` 参数是可选的，查看下面的 [`this.callback`](/api/loaders#this-callback)。

### 同步 loader

无论是 `return` 还是 `this.callback` 都可以同步地返回转换后的 `content` 内容：

__sync-loader.js__

``` js
module.exports = function(content, map, meta) {
  return someSyncOperation(content);
};
```

`this.callback` 方法则更灵活，因为它允许传递多个参数，而不仅仅是`content`。

__sync-loader-with-multiple-results.js__

``` js
module.exports = function(content, map, meta) {
  this.callback(null, someSyncOperation(content), map, meta);
  return; // 当调用 callback() 时总是返回 undefined
};
```

### 异步 loader

对于异步 loader，使用 [`this.async`](/api/loaders#this-async) 来获取 `callback` 函数：

__async-loader.js__

``` js
module.exports = function(content, map, meta) {
  var callback = this.async();
  someAsyncOperation(content, function(err, result) {
    if (err) return callback(err);
    callback(null, result, map, meta);
  });
};
```

__async-loader-with-multiple-results.js__

``` js
module.exports = function(content, map, meta) {
  var callback = this.async();
  someAsyncOperation(content, function(err, result, sourceMaps, meta) {
    if (err) return callback(err);
    callback(null, result, sourceMaps, meta);
  });
};
```

T> loader 最初被设计为可以在同步 loader pipeline（如 Node.js ，使用 [enhanced-require](https://github.com/webpack/enhanced-require)），与异步 pipeline（如 webpack ）中运行。然而在 Node.js 这样的单线程环境下进行耗时长的同步计算不是个好主意，我们建议尽可能地使你的 loader 异步化。但如果计算量很小，同步 loader 也是可以的。


### "Raw" loader

默认情况下，资源文件会被转化为 UTF-8 字符串，然后传给 loader。通过设置 `raw`，loader 可以接收原始的 `Buffer`。每一个 loader 都可以用 `String` 或者 `Buffer` 的形式传递它的处理结果。Complier 将会把它们在 loader 之间相互转换。

__raw-loader.js__

``` js
module.exports = function(content) {
	assert(content instanceof Buffer);
	return someSyncOperation(content);
	// 返回值也可以是一个 `Buffer`
	// 即使不是 raw loader 也没问题
};
module.exports.raw = true;
```


### 越过 loader(Pitching loader)

loader __总是__从右到左地被调用。有些情况下，loader 只关心 request 后面的__元数据(metadata)__，并且忽略前一个 loader 的结果。在实际（从右到左）执行 loader 之前，会先__从左到右__调用 loader 上的 `pitch` 方法。对于以下 [`use`](/configuration/module#rule-use) 配置：

``` js
use: [
  'a-loader',
  'b-loader',
  'c-loader'
]
```

将会发生这些步骤：

``` diff
|- a-loader `pitch`
  |- b-loader `pitch`
    |- c-loader `pitch`
      |- requested module is picked up as a dependency
    |- c-loader normal execution
  |- b-loader normal execution
|- a-loader normal execution
```

那么，为什么 loader 可以利用 "跳跃(pitching)" 阶段呢？

首先，传递给 `pitch` 方法的 `data`，在执行阶段也会暴露在 `this.data` 之下，并且可以用于在循环时，捕获和共享前面的信息。

``` js
module.exports = function(content) {
	return someSyncOperation(content, this.data.value);
};

module.exports.pitch = function(remainingRequest, precedingRequest, data) {
	data.value = 42;
};
```

其次，如果某个 loader 在 `pitch` 方法中给出一个结果，那么这个过程会回过身来，并跳过剩下的 loader。在我们上面的例子中，如果 `b-loader` 的 `pitch` 方法返回了一些东西：

``` js
module.exports = function(content) {
  return someSyncOperation(content);
};

module.exports.pitch = function(remainingRequest, precedingRequest, data) {
  if (someCondition()) {
    return "module.exports = require(" + JSON.stringify("-!" + remainingRequest) + ");";
  }
};
```

上面的步骤将被缩短为：

``` diff
|- a-loader `pitch`
  |- b-loader `pitch` returns a module
|- a-loader normal execution
```

查看 [bundle-loader](https://github.com/webpack-contrib/bundle-loader)，了解如何以更有意义的方式使用此过程。


## loader 上下文

loader context 表示在 loader 内使用 `this` 可以访问的一些方法或属性。

假设我们这样请求加载别的模块：
在 `/abc/file.js` 中：

``` js
require("./loader1?xyz!loader2!./resource?rrr");
```


### `this.version`

**loader API 的版本号。**目前是 `2`。这对于向后兼容性有一些用处。通过这个版本号，你可以为不同版本间的破坏性变更编写不同的逻辑，或做降级处理。


### `this.context`

**模块所在的目录。**可以用作解析其他模块路径的上下文。

在我们的例子中：这个属性为 `/abc`，因为 `resource.js` 在这个目录中


### `this.request`

被解析出来的 request 字符串。

在我们的例子中：`"/abc/loader1.js?xyz!/abc/node_modules/loader2/index.js!/abc/resource.js?rrr"`


### `this.query`

1. 如果这个 loader 配置了 [`options`](/configuration/module/#useentry) 对象的话，`this.query` 就指向这个 option 对象。
2. 如果 loader 中没有 `options`，而是以 query 字符串作为参数调用时，`this.query` 就是一个以 `?` 开头的字符串。

W> `options` 已取代 `query`，所以此属性废弃。使用 `loader-utils` 中的 [`getOptions` 方法](https://github.com/webpack/loader-utils#getoptions)来提取给定 loader 的 option。


### `this.callback`

一个可以同步或者异步调用的可以返回多个结果的函数。预期的参数是：

``` js
this.callback(
  err: Error | null,
  content: string | Buffer,
  sourceMap?: SourceMap,
  meta?: any
);
```

1. 第一个参数必须是 `Error` 或者 `null`
2. 第二个参数是一个 `string` 或者 [`Buffer`](https://nodejs.org/api/buffer.html)。
3. 可选的：第三个参数必须是一个可以被[这个模块](https://github.com/mozilla/source-map)解析的 source map。
4. 可选的：第四个选项，会被 webpack 忽略，可以是任何东西（例如一些元数据）。

T> 可以将抽象语法树(abstract syntax tree - AST)（例如 [`ESTree`](https://github.com/estree/estree)）作为第四个参数（`meta`），如果你想在多个 loader 之间共享通用的 AST，这样做有助于加速编译时间。

如果这个函数被调用的话，你应该返回 undefined 从而避免含糊的 loader 结果。


### `this.async`

告诉 [loader-runner](https://github.com/webpack/loader-runner) 这个 loader 将会异步地回调。返回 `this.callback`。


### `this.data`

在 pitch 阶段和正常阶段之间共享的 data 对象。


### `this.cacheable`

设置是否可缓存标志的函数：

``` typescript
cacheable(flag = true: boolean)
```

默认情况下，loader 的处理结果会被标记为可缓存。调用这个方法然后传入 `false`，可以关闭 loader 的缓存。

一个可缓存的 loader 在输入和相关依赖没有变化时，必须返回相同的结果。这意味着 loader 除了 `this.addDependency` 里指定的以外，不应该有其它任何外部依赖。


### `this.loaders`

所有 loader 组成的数组。它在 pitch 阶段的时候是可以写入的。

``` js
loaders = [{request: string, path: string, query: string, module: function}]
```

在我们的示例中：

``` js
[
  {
    request: "/abc/loader1.js?xyz",
    path: "/abc/loader1.js",
    query: "?xyz",
    module: [Function]
  },
  {
    request: "/abc/node_modules/loader2/index.js",
    path: "/abc/node_modules/loader2/index.js",
    query: "",
    module: [Function]
  }
]
```


### `this.loaderIndex`

当前 loader 在 loader 数组中的索引。

在我们的示例中：loader1 中得到：`0`，loader2 中得到：`1`


### `this.resource`

request 中的资源部分，包括 query 参数。

在我们的示例中：`"/abc/resource.js?rrr"`


### `this.resourcePath`

资源文件的路径。

在我们的示例中：`"/abc/resource.js"`


### `this.resourceQuery`

资源的 query 参数。

在我们的示例中：`"?rrr"`


### `this.target`

编译的目标。从配置选项中传递过来的。

示例：`"web"`, `"node"`


### `this.webpack`

如果是由 webpack 编译的，这个布尔值会被设置为真。

T> loader 最初被设计为可以同时当 Babel transform 用。如果你编写了一个 loader 可以同时兼容二者，那么可以使用这个属性了解是否存在可用的 loaderContext 和 webpack 特性。


### `this.sourceMap`

应该生成一个 source map。因为生成 source map 可能会非常耗时，你应该确认 source map 确实有必要请求。


### `this.emitWarning`

``` typescript
emitWarning(warning: Error)
```

发出一个警告。


### `this.emitError`

``` typescript
emitError(error: Error)
```

发出一个错误。


### `this.loadModule`

``` typescript
loadModule(request: string, callback: function(err, source, sourceMap, module))
```

解析给定的 request 到一个模块，应用所有配置的 loader ，并且在回调函数中传入生成的 source 、sourceMap 和 模块实例（通常是 [`NormalModule`](https://github.com/webpack/webpack/blob/master/lib/NormalModule.js) 的一个实例）。如果你需要获取其他模块的源代码来生成结果的话，你可以使用这个函数。


### `this.resolve`

``` typescript
resolve(context: string, request: string, callback: function(err, result: string))
```

像 require 表达式一样解析一个 request 。


### `this.addDependency`

``` typescript
addDependency(file: string)
dependency(file: string) // 简写
```

加入一个文件作为产生 loader 结果的依赖，使它们的任何变化可以被监听到。例如，[`html-loader`](https://github.com/webpack-contrib/html-loader) 就使用了这个技巧，当它发现 `src` 和 `src-set` 属性时，就会把这些属性上的 url 加入到被解析的 html 文件的依赖中。


### `this.addContextDependency`

``` typescript
addContextDependency(directory: string)
```

把文件夹作为 loader 结果的依赖加入。


### `this.clearDependencies`

``` typescript
clearDependencies()
```

移除 loader 结果的所有依赖。甚至自己和其它 loader 的初始依赖。考虑使用 `pitch`。


### `this.emitFile`

``` typescript
emitFile(name: string, content: Buffer|string, sourceMap: {...})
```

产生一个文件。这是 webpack 特有的。


### `this.fs`

用于访问 `compilation` 的 `inputFileSystem` 属性。


## 废弃的上下文属性

W> 强烈建议不要使用这些属性，因为我们打算移除它们。它们仍然列在此处用于文档目的。


### `this.exec`

``` typescript
exec(code: string, filename: string)
```

以模块的方式执行一些代码片段。如果需要，请查看[这里的评论](https://github.com/webpack/webpack.js.org/issues/1268#issuecomment-313513988)以获取替换方法。


### `this.resolveSync`

``` typescript
resolveSync(context: string, request: string) -> string
```

像 require 表达式一样解析一个 request。


### `this.value`

向下一个 loader 传值。如果你知道了作为模块执行后的结果，请在这里赋值（以单元素数组的形式）。


### `this.inputValue`

从上一个 loader 那里传递过来的值。如果你会以模块的方式处理输入参数，建议预先读入这个变量（为了性能因素）。


### `this.options`

options 的值将会传递给 Complier


### `this.debug`

一个布尔值，当处于 debug 模式时为 true。


### `this.minimize`

决定处理结果是否应该被压缩。


### `this._compilation`

一种 hack 写法。用于访问 webpack 的 Compilation 对象。


### `this._compiler`

一种 hack 写法。用于访问 webpack 的 Compiler 对象。


### `this._module`

一种 hack 写法。用于访问当前加载的 Module 对象。

***

> 原文：https://webpack.js.org/api/loaders/
