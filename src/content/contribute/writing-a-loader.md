---
title: 编写一个 loader
sort: 2
contributors:
  - asulaiman
---

loader 是导出为 `function` 的 node 模块。

当资源应该由此 loader 转换时，调用此函数。

在简单的情况下，当只有一个 loader 应用于资源时，调用 loader 有一个参数：作为字符串的资源文件的内容。

在 loader 中，可以通过 `this` 上下文访问 [[loader API | loaders]]。

一个同步 loader 可以通过 `return` 来返回这个值。在其他情况下，loader 可以通过 `this.callback(err, values...)` 函数返回任意数量的值。错误会被传到 `this.callback` 函数或者在同步 loader 中抛出。

这个 loader 的 callback 应该回传一个或者两个值。第一个值的结果是 string 或 buffer 类型的 JavaScript 代码。第二个可选的值是 JavaScript 对象的 SourceMap。

在复杂的情况下，当多个 loaders 被串联调用时，只有最后一个 loader 能够获取资源文件并且只有第一个 loader 预期返回一个或者两个值（JavaScript 和 SourceMap）。其它任何 loader 返回的值会传到之前的 loader 中。

In other words, chained loaders are executed in reverse order -- either right to left or bottom to top depending on the format of your array. Lets say you have two loaders that go by the name of `foo-loader` and `bar-loader`. You would like to execute `foo-loader` and then pass the result of the transformation from `foo-loader` finally to `bar-loader`.

You would add the following in your config file (assuming that both loaders are already defined):

``` javascript
module: {
  rules: [
    {
      test: /\.js/,
      use: [
        'bar-loader',
        'foo-loader'
      ]
    }
  ]
}
```

Note that webpack currently only searches in your node modules folder for loaders. If these loaders are defined outside your node modules folder you would need to use the `resolveLoader` property to get webpack to include your loaders. For example lets say you have your custom loaders included in a folder called `loaders`. You would have to add the following to your config file:

``` javascript
resolveLoader: {
  modules: [
    'node_modules',
    path.resolve(__dirname, 'loaders')
  ]
}
```


## 示例

``` javascript
// 定义 loader
module.exports = function(source) {
  return source;
};
```

``` javascript
// 支持 SourceMap 的 loader
module.exports = function(source, map) {
  this.callback(null, source, map);
};
```

## 指南

（按照优先级排序，第一个具有最高的优先级）

* loaders 应该只做一个任务
* loaders 能够被串联调用。为每一步创建 loaders，而不是在一个 loader 中做所有事情。

这也意味着不必须的话它们不应该转换成 JavaScript。

例子：通过应用查询参数来将模板文件渲染成 HTML。

我可以写一个能够将源文件编译成模板的 loader，执行并且返回一个模块，这个模板能够导出一个包含 HTML 代码的字符串。这样不好。

相反，我应该为这个用例中的每一个任务写入 loaders 并且应用它们（管道）：

* jade-loader：将模板转化为模块，这个模块导出一个函数。
* apply-loader：采取一个导出模块函数并且通过应用查询参数来返回原结果。
* html-loader：采取 HTML 并且通过导出字符串来导出模块。

### 生成标准模块

Loader 生成的模块应遵循与常规模块相同的设计原则。

例子：这是一个不好的设计：（非标准化的，全局状态，...）

```javascript
require("any-template-language-loader!./xyz.atl");

var html = anyTemplateLanguage.render("xyz");
```

### 不要在运行和模块间保存状态

loader 应该和其它编译后的模块相互独立。（除非这个 loader 自身能够处理这些问题）

loader 应该和相同模块的之前汇编相互独立。

### 使用 [loader-utils](https://github.com/webpack/loader-utils)

为了使其他开发人员体验一致，您应该使用 loader-utils 来获取 loader 选项：

```javascript
const loaderUtils = require("loader-utils");

module.exports = function(source) {
    const options = loaderUtils.getOptions(this);
};
```

还有其他通用函数，如 `interpolateName`。

### 标志依赖

如果 loader 使用外部资源（比如读文件系统），它们**必须**说明。在观察模式下，这个信息被用来使缓存的 loader 失效，然后重新编译。

``` javascript
// 在 loader 中添加 header
var path = require("path");
module.exports = function(source) {
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

在很多语言中存在某些机制来规定依赖，比如在 css 里面使用 `@import` 以及 `url(...)`。这些依赖可以通过模块系统来解析。

存在两个选项：

* 将它们转化成 `require`。
* 使用 `this.resolve` 函数来解析路径。

示例1 `css-loader`：`css-loader` 将 `@import` 替换为 `require`（也是通过 `css-loader` 来处理）, `url(...)` 替换为 `@import`，这样就把所有的依赖转化为了 `require` 的形式。

示例2 `less-loader`：`less-loader` 不能够将 `@import` 转换成 `require`，因为所有的 less 文件需要一起编译来跟踪变量和 mixins。因此 `less-loader` 通过一个定制的路径解析逻辑来拓展 less 编译器。这个定制的逻辑使用 `this.resolve` 通过模块系统的配置（别名使用，自定义模块目录，等等）来解析文件。

如果语言只支持相对路径（比如在 css 中：`url(file)` 总是表示 `./file`），利用 `~` 约定来规定模块的引用。

``` text
url(file) -> require("./file")
url(~module) -> require("module")
```

### 提取共用代码

不要有过多在每个 loader 都会用到的共用代码。在 loader 中创建一个（运行期）文件并且创建对共用代码的 `require`。

## 不要嵌入绝对路径

不要在模块中使用绝对路径。因为当项目根路径改变时，它们的hash也会改变。在 loader-utils 中有 [`stringifyRequest`](https://github.com/webpack/loader-utils#stringifyrequest) 这个方法能够将绝对路径转成相对路径。

**示例**：

``` js
var loaderUtils = require("loader-utils");

return "var runtime = require(" +
  loaderUtils.stringifyRequest(this, "!" + require.resolve("module/runtime")) +
  ");";
```

### 使用 `peerDependencies` 来包裹 library

例如，[sass-loader 指定 node-sass 作为对等依赖(peer dependency)](https://github.com/webpack-contrib/sass-loader/blob/master/package.json)：

``` javascript
"peerDependencies": {
  "node-sass": "^4.0.0"
}
```

使用对等依赖(peer dependency)允许应用程序开发人员在 `package.json` 中指定需要的确切版本。

***

> 原文：https://webpack.js.org/development/how-to-write-a-loader/
