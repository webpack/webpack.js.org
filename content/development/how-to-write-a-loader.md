---
title: How to write a loader?
sort: 3
---

loader是导出`function`的节点模块。

当资源应该由此loader转换时，调用此函数。

在简单的情况下，当只有一个loader应用于资源时，调用loader有一个参数：作为字符串的资源文件的内容。

这个loader能够在这个函数的上下文中`this`中可以访问 [[loader API | loaders]]。

一个同步loader可以通过`return`来返回这个值。在其他情况下，loader可以通过`this.callback(err, values...)`函数返回任意数量的值。错误会被传到`this.callback`函数或者在同步loader中抛出。

The loader is expected to give back one or two values. The first value is a resulting JavaScript code as string or buffer. The second optional value is a SourceMap as JavaScript object.

这个loader应该返回一个或者两个值。第一个值是JavaScript代码产生的字符串或者缓冲区。第二个可选的值是JavaScript对象的SourceMap。

In the complex case, when multiple loaders are chained, only the last loader gets the resource file and only the first loader is expected to give back one or two values (JavaScript and SourceMap). Values that any other loader give back are passed to the previous loader.

在复杂的情况下，当多个loaders被链接的时候，只有最后一个loader能够获取资源文件并且只有第一个loader预期返回一个或者两个值（JavaScript和SourceMap）。其它任何loader返回的值会传到之前的loader中。

## 例子

``` javascript
// 定义loader
module.exports = function(source) {
  return source;
};
```

``` javascript
// 通过SourceMap支持定义loader
module.exports = function(source, map) {
  this.callback(null, source, map);
};
```

## 指南

（按照优先级排序，第一个具有最高的优先级）

* Loaders应该只做一个任务
* Loaders能够被链接。为每一步创建loaders，而不是让一个loader马上做所有事情。

这也意味着不必须的话它们不应该转换成JavaScript。

例子：通过应用查询参数来将模板文件渲染成HTML。

我可以写一个能够将源文件编译成模板的loader，执行并且返回一个模板，这个模板能够导出一个包含HTML代码的字符串。这样是不好的。

Instead I should write loaders for every task in this use case and apply them all (pipeline):

相反，我应该为这个用例中的每一个任务写入loaders并且应用它们（管道）：

* jade-loader：将模板转换成一个导出一个函数的模块
* apply-loader：采取一个导出模块函数并且通过应用查询参数来返回原结果。
* html-loader：采取HTML并且通过导出字符串来导出模块。

### 产生标准化模块

Loader生成的模块应遵循与常规模块相同的设计原则。

例子：这是一个不好的设计：（非标准化的，全局状态，...）

```javascript
require("any-template-language-loader!./xyz.atl");

var html = anyTemplateLanguage.render("xyz");
```

### 如果可能的话把它标志成可缓存的.

大多数loaders是可以缓存的，因此它们应该把自身标志成可缓存的。

只要在load中调用`cacheable`。

```javascript
// 利用cacheable定义loader
module.exports = function(source) {
  this.cacheable();
  return source;
};
```

### 不要在运行和模块间保存状态

loader应该和其它编译后的模块相互独立。（期望这些能够被loader处理）

loader应该和相同模块的之前汇编相互独立。

### 标志依赖

如果loader使用外部资源（比如读文件系统），它们**必须**说明。这个信息被用来废弃可缓存的loader并且在观察模式下重新编译。

``` javascript
// 在loader中添加header
var path = require("path");
module.exports = function(source) {
  this.cacheable();
  var callback = this.async();
  var headerPath = path.resolve("header.js");
  this.addDependency(headerPath);
  fs.readFile(headerPath, "utf-8", function(err, header) {
    if(err) return callback(err);
    callback(null, header + "\n" + source);
  });
};
```

### 解析依赖关系

在很多语言中存在某些机制来规定依赖，比如在css里面使用`@import`以及`url(...)`。这些依赖可以通过模块系统来解析。

存在两个选项：

* 将它们转化成 `require`s。
* 使用`this.resolve`函数来解析路径。

例子1 css-loader：css-loader将依赖转换成 `require`s，通过使用引入其它样式表（也是通过css-loader来处理）来代替`@import`以及通过`require`其它的引用文件来代替`url(...)`。

例子2 less-loader：less-loader不能够将`@import`S转换成 `require`s，因为所有的less文件需要一起编译来跟踪变量和mixins。因此less-loader通过一个定制的路径解析逻辑来拓展less编译器。这个定制的逻辑使用`this.resolve`通过模块系统的配置（别名使用，定制的模块目录，等等）来解析文件。

如果语言只支持相对路径（比如在css中：`url(file)`总是表示`./file`），利用`~`约定来规定模块的引用。

``` text
url(file) -> require("./file")
url(~module) -> require("module")
```

### 提取共用代码

不生成过多在每个loader中么个模块都会处理的共用代码。在loader中创建一个（运行期）文件并且创建对共用代码的`require`。

## 不要嵌入绝对路径

不要将绝对路径放入模块代码中。当项目根路径被移动的时，它们会破坏散列函数。在loader-utils中有[`stringifyRequest`](https://github.com/webpack/loader-utils#stringifyrequest)这个方法能够将绝对路径转成相对路径。

**例子**：

``` js
var loaderUtils = require("loader-utils");

return "var runtime = require(" +
  loaderUtils.stringifyRequest(this, "!" + require.resolve("module/runtime")) +
  ");";
```

### 使用`peerDependencies` 来包装library

用开发者能够在`package.json`里面规定具体的版本。依赖关系应该相对开放从而允许在不需要发布新的loader版本的时候更新library。

``` javascript
"peerDependencies": {
  "library": "^1.3.5"
}
```

### 将可编程对象当作`query`选项

在某些情况下，你的loader需要可编程对象，其函数不能作为`query`字符串进行字符串化。例如，less-loader提供了指定[LESS-plugins](https://github.com/webpack/less-loader#less-plugins)的可能性。在这些情况下，允许loader拓展webpack的`options`对象来检索特定选项。然而，为了避免名称冲突，重要的是该选项在loader的驼峰npm-name下的命名空间。

**例子：**

```javascript
// webpack.config.js
module.exports = {
  ...
  lessLoader: {
    lessPlugins: [
      new LessPluginCleanCSS({advanced: true})
    ]
  }
};
```

loader还应该允许通过`query`来指定config-key（比如`lessLoader`）。 See [讨论](https://github.com/webpack/less-loader/pull/40) and [案例实现](https://github.com/webpack/less-loader/blob/39f742b4624fceae6d9cf266e9554d07a32a9c14/index.js#L49-51).