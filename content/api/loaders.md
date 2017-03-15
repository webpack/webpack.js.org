---
title: 加载器 API(Loader API)
sort: 4
contributors:
    - TheLarkInn
---

加载器（Loader）可以让你在 `require()` 或者 `load` 文件的时候先对它们进行预处理。这在其他构建工具中类似 “tasks”，为前端构建流程提供了强大的武器。加载器可以转换不同语言的文件（比如从 CoffeeScript 到 JavaScript），或者把图片内联为 data URL，它甚至可以让你在 JavaScript 中直接 `require()` css 文件。

为了让 Webpack 在转换文件的时候使用加载器，你可以在[配置](/configuration)文件或者模块请求（比如在调用`require()`）时，指定一个特定的加载器。

?> When /concepts/loaders merges, we should link to the many usages of loaders found there (require vs configuration) from this page.

## 如何写一个 Loader

所谓 Loader 只是导出了一个函数的 JavaScript 模块。Compiler 会调用这个函数，然后把之前 Loader 产生的结果或者资源文件传入进去。这个函数中的 `this` 里会有一些 Compiler 添加的很有用的方法，比如可以让 Loader 的调用方式变成异步的，或者得到一些 query 参数。第一个 Loader 传入的参数只有一个：资源文件的内容。Complier 会接收上一个 Loader 产生的处理结果。这些处理结果应该是一些 `String` 或者 `Buffer`（被转换为一个 string），代表模块的 JavaScript 源码。另外可选的 SourceMap 信息（作为一个 JSON 对象）可能也会被传入。

如果是单个处理结果，可以在**同步模式**中直接返回。如果有多个处理结果，则需要调用 `this.callback()`。在**异步模式**中，需要调用 `this.async()`，如果异步模式被允许，那么它会返回 `this.callback()`，随后 Loader 必须返回 `undefined` 并且调用调用回调函数。

## 示例

### 同步 Loader

**sync-loader.js**

```javascript
module.exports = function(content) {
    return someSyncOperation(content);
};
```

### 异步 Loader

**async-loader.js**

```javascript
module.exports = function(content) {
    var callback = this.async();
    if(!callback) return someSyncOperation(content);
    someAsyncOperation(content, function(err, result) {
        if(err) return callback(err);
        callback(null, result);
    });
};
```

T> 我们建议，异步 Loader 最好能有一个同步模式的降级方案。这虽然不是 Webpack 的要求，但这可以让 Loader 同步运行时使用
 [enhanced-require](https://github.com/webpack/enhanced-resolve).

### "Raw" Loader

默认情况下，资源文件会被读取为 utf-8 字符串，并且以 String 的形式传入 Loader。把 raw 设置为 true 可以让 Loader 传入原始的 `Buffer`。每一个 Loader 都可以用 `String` 或者 `Buffer` 的形式传递它的处理结果。Complier 将会把它们在 Loader 之间相互转换。

**raw-loader.js**

```javascript
module.exports = function(content) {
	assert(content instanceof Buffer);
	return someSyncOperation(content);
	// 返回值也可以是一个 `Buffer`
	// 这里即使不是一个 raw Loader，也是被允许的
};
module.exports.raw = true;
```

### Pitching Loader

链式的 Loader **总是**从右到左地被调用，但是在一些情况下，Loader 不需要关心之前处理的结果或者资源，而是只关心**元数据**。在 Loader 被调用前（从右到左），Loader 中的 `pitch` 方法**从左到右**依次被调用。

如果 Loader 在 `pitch` 方法中返回了一个值，那么进程会直接跳过当前的 Loader，继续向左调用接下来更多的 Loader。`data`可以在 pitch 和普通调用间传递。

```javascript
module.exports = function(content) {
	return someSyncOperation(content, this.data.value);
};
module.exports.pitch = function(remainingRequest, precedingRequest, data) {
	if(someCondition()) {
		// 直接返回
		return "module.exports = require(" + JSON.stringify("-!" + remainingRequest) + ");";
	}
	data.value = 42;
};
```

## The loader context

Loader context 表示 Loader 给 `this` 中添加的一些可用的方法或者属性

下面的例子中，假定我们在 `/abc/file.js` 中这样请求加载别的模块：

```javascript
require("./loader1?xyz!loader2!./resource?rrr");
```

### `version`

**Loader API 的版本号。**目前是 `2`。这对于向后兼容性有一些用处。通过这个版本号你可以指定特定的逻辑，或者对一些不兼容的改版做降级处理。

### `context`

**模块所在的目录。**某些场景下这可能会有用处。

在我们的例子中：这个属性为 `/abc`，因为 `resource.js` 在这个目录中

### `request`

被解析出来的请求字符串。

在我们的例子中：`"/abc/loader1.js?xyz!/abc/node_modules/loader2/index.js!/abc/resource.js?rrr"`

### `query`

字符串。当前 Loader 的 query 参数

在我们的例子中：loader1：`"?xyz"`，loader2：`""`

### `data`

在 pitch 阶段和正常阶段之间共享的数据对象。

### `cacheable`

```typescript
cacheable(flag = true: boolean)
```

默认情况下，Loader 的处理结果是会被缓存的。调用这个方法然后传入 `false`，可以关闭 Loader 的缓存。

一个可缓存的 Loader 要求在输入和相关依赖没有变化时，绝对产生一个确定性的固定处理结果。这意味着 Loader 除了 `this.addDependency` 里指定的以外，不应该有其它任何外部依赖。目前大多数 Loader 都是确定性、可缓存的。

### `loaders`

```typescript
loaders = [{request: string, path: string, query: string, module: function}]
```

所有 Loader 组成的数组。它在 pitch 阶段的时候是可以写入的。

在我们的示例中：

```javascript
[
  { request: "/abc/loader1.js?xyz",
	path: "/abc/loader1.js",
	query: "?xyz",
	module: [Function]
  },
  { request: "/abc/node_modules/loader2/index.js",
	path: "/abc/node_modules/loader2/index.js",
	query: "",
	module: [Function]
  }
]
```

### `loaderIndex`

当前 Loader 在 Loader 数组中的索引数。

在我们的示例中：loader1：`0`，loader2：`1`

### `resource`

请求的资源部分，包括 query 参数。

在我们的示例中：`"/abc/resource.js?rrr"`

### `resourcePath`

资源文件的路径。

在我们的示例中：`"/abc/resource.js"`

### `resourceQuery`

资源的 query 参数。

在我们的示例中：`"?rrr"`

### `emitWarning`

```typescript
emitWarning(message: string)
```

触发一个警告。

### `emitError`

```typescript
emitError(message: string)
```

触发一个错误。

### `exec`

```typescript
exec(code: string, filename: string)
```

以模块的方式执行一些代码片段。

T> 不要使用 `require(this.resourcePath)`，而应该使用这个函数让 Loader 可以链式调用。

### `resolve`

```typescript
resolve(context: string, request: string, callback: function(err, result: string))
```

以解析 require 表达式的方式解析一个请求。

### `resolveSync`

```typescript
resolveSync(context: string, request: string) -> string
```

以解析 require 表达式的方式解析一个请求。（同步的方法）

### `addDependency`

```typescript
addDependency(file: string)
dependency(file: string) // shortcut
```

加入一个文件，这个文件将作为 Loader 的依赖（即它的变化会影响 Loader 的处理结果），使它们的任何变化可以被监听到。例如，[html-loader](https://github.com/webpack/html-loader) 就使用了这个技巧。当它发现 `src` 和 `src-set` 属性时，就会把这些属性上的 url 加入到被解析的 html 文件的依赖中。

### `addContextDependency`

```typescript
addContextDependency(directory: string)
```

把文件夹作为 Loader 的依赖加入。

### `clearDependencies`

```typescript
clearDependencies()
```

移除 Loader 所有的依赖。甚至自己和其它 Loader 的初始依赖。考虑使用 `pitch`。

Remove all dependencies of the loader result. Even initial dependencies and these of other loaders. Consider using `pitch`.

### `value`

向下一个 Loader 传值。如果你知道了作为模块执行后的结果，请在这里赋值（以单元素数组的形式）。

Pass values to the next loader. If you know what your result exports if executed as module, set this value here (as a only element array).

### `inputValue`

从上一个 Loader 那里传递过来的值。如果你会以模块的方式处理输入参数，建议预先读入这个变量。（为了性能因素）

### `options`

options 的值将会传递给 Complier

### `debug`

一个布尔值，当处于 debug 模式时为真。

### `minimize`

决定处理结果是否应该被压缩。

### `sourceMap`

决定是否应该产生 SourceMap。

### `target`

编译的目标。从配置选项中传递过来的。

示例：`"web"`，`"node"`

### `webpack`

如果是 Webpack 编译的，这个布尔值会被设置为真。

T> Loader 最初被设计为像 Babel 那样做转换工作。如果你编写了一个 Loader 可以同时兼容二者，那么可以使用这个属性表明是否存在可用的 loaderContext 和 Webpack 的特性。

### `emitFile`

```typescript
emitFile(name: string, content: Buffer|String, sourceMap: {...})
```

产生一个文件。这是 Webpack 独有的（原文：“This is webpack-specific”）。

### `fs`

用于访问 `compilation` 的 `inputFileSystem` 属性。

### `_compilation`

一种 hack 写法。用于访问 Webpack 的 Compilation 对象。

### `_compiler`

一种 hack 写法。用于访问 Webpack 的 Compiler 对象。

### `_module`

一种 hack 写法。用于访问 Webpack 的 Module 对象。

### 自定义 `loaderContext` 属性

把自定义属性加入到 `loaderContext` 中有两种方法：可以在 webpack [configuration](/configuration) 中的 `loader` 里赋值；另外也可以通过 [自定义插件（custom plugin）](/api/plugins)
，这是一个对于 `normal-module-loader` 事件的 hook，可以让你修改或者扩展 `loaderContext`。

***

> 原文：https://webpack.js.org/api/loaders/