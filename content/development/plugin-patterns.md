---
title: 有用的插件模式(Useful Plugin Patterns)
sort: 2
---

插件给在 webpack 构建系统中做自定义带来了无限的机会。它允许你创建自定义的资源类型，执行独特的构建变更，甚至通过使用中间件来增强 webpack 的运行时。以下就是一些在编写插件时会用到的有用特性。

## 探索资源，块，模块，以及依赖

在一次编译（compilation）被封闭（sealed）后，编译中所有的结构应该是可以被遍历的。

```javascript
function MyPlugin() {}

MyPlugin.prototype.apply = function(compiler) {
  compiler.plugin('emit', function(compilation, callback) {

    // 探索每个块（构建后的输出）:
    compilation.chunks.forEach(function(chunk) {
      // 探索块中的每个模块（构建时的输入）：
      chunk.modules.forEach(function(module) {
        // 探索模块中包含的的每个源文件路径：
        module.fileDependencies.forEach(function(filepath) {
          // 现在我们已经知道了很多的源文件结构了……
        });
      });

      // 探索块生成的每个资源文件名
      chunk.files.forEach(function(filename) {
        // 得到块生成的每个文件资源的源码
        var source = compilation.assets[filename].source();
      });
    });

    callback();
  });
};

module.exports = MyPlugin;
```

- `compilation.modules`: 一个存放编译中涉及的模块（构建时的输入）的数组。每个模块处理了你源码库中的一个原始文件的构建。

- `module.fileDependencies`: 一个存放模块中包含的源文件路径的数组。它包含了 JavaScript 源文件自身（例如：`index.js`），和所有被请求（required）的依赖资源文件（样式表，图像等等）。想要知道哪些源文件属于这个模块时，检查这些依赖是有帮助的。

- `compilation.chunks`: 一个存放编译中涉及的块（构建后的输出）的数组。每个块处理了一个最终输出资源的组合。

- `chunk.modules`: 一个存放块中包含的模块的数组。为了扩展，你也许需要查阅每个模块的依赖来得知哪些源文件注入到了块中。

- `chunk.files`: 一个存放了块生成的输出文件的文件名的数组。你也许需要从 `compilation.assets` 中访问这些资源内容。

### 监控跟踪图（watch graph）

当运行 webpack 中间件时，每次编译包含了一个 `fileDependencies` 数组（哪些文件被跟踪了）和一个 `fileTimestamps` 哈希来映射被跟踪的文件路径和相应的时间戳。这可以用来检测在编译中哪些文件已经发生变化了，非常有用。

```javascript
function MyPlugin() {
  this.startTime = Date.now();
  this.prevTimestamps = {};
}

MyPlugin.prototype.apply = function(compiler) {
  compiler.plugin('emit', function(compilation, callback) {

    var changedFiles = Object.keys(compilation.fileTimestamps).filter(function(watchfile) {
      return (this.prevTimestamps[watchfile] || this.startTime) < (compilation.fileTimestamps[watchfile] || Infinity);
    }.bind(this));

    this.prevTimestamps = compilation.fileTimestamps;
    callback();
  }.bind(this));
};

module.exports = MyPlugin;
```

你也可以补充新的文件路径到跟踪图(graph)里，来接收在编译中这些文件变化时的回调触发。简单地 push 有效的文件路径到 `compilation.fileDependencies` 数组就可以把它们加入跟踪。

注意：`fileDependencies` 数组在每次编译中会被重新建立，所以你的插件必须在每次编译时向当时所属的数组 push 来保证它们能被跟踪到。

## 变化的块

和跟踪图类似，通过追踪哈希来监控一次编译中的块（或者模块，就这里而言）的变化同样简单。

```javascript
function MyPlugin() {
  this.chunkVersions = {};
}

MyPlugin.prototype.apply = function(compiler) {
  compiler.plugin('emit', function(compilation, callback) {

    var changedChunks = compilation.chunks.filter(function(chunk) {
      var oldVersion = this.chunkVersions[chunk.name];
      this.chunkVersions[chunk.name] = chunk.hash;
      return chunk.hash !== oldVersion;
    }.bind(this));

    callback();
  }.bind(this));
};

module.exports = MyPlugin;
```

***

> 原文：https://webpack.js.org/development/plugin-patterns/
