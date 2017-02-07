---
title: 管理依赖
sort: 6
contributors:
  - ndelangen
  - chrisVillanueva
---

> es6 modules

> commonjs

> amd

## 带表达式的require 

如果你的请求含有[表达式](https://zh.wikipedia.org/wiki/%E8%A1%A8%E7%A4%BA%E5%BC%8F)，会创建一个[上下文(语境)](https://zh.wikipedia.org/wiki/%E8%AA%9E%E5%A2%83)，这样在编译的时候，并不知道精确匹配的模块。

示例:
```javascript
require("./template/" + name + ".ejs");
```

webpack解析 `require()` 的调用，提取出来如下这些信息：

```
Directory: ./template
Regular expression: /^.*\.ejs$/
```

**上下文(语境)模块**

在解析的过程中，会生成一个上下文模块。这个模块包含一些[引用](https://zh.wikipedia.org/wiki/%E5%8F%83%E7%85%A7)，指向相应文件夹中所有能被require请求到，匹配正则表达式的模块。上下文模块包含一个把请求翻译成对应模块id的[字典](https://zh.wikipedia.org/wiki/%E5%85%B3%E8%81%94%E6%95%B0%E7%BB%84)。

示例:
```javascript
{
    "./table.ejs": 42,
    "./table-row.ejs": 43,
    "./directory/folder.ejs": 44
}
```
上下文模块还包含一些运行时逻辑来访问这个字典。

总之，动态require是允许的，但是会导致所有可能的模块都被打包。

## require的context方法

你还可以使用 `require.context()` 方法来创建自己的上下文（模块）。
你可以给这个方法传3个参数：要搜索的文件夹目录，是否还应该搜索它的子目录，一个匹配文件的正则表达式。

webpack会在构建的时候解析代码中的 `require.context()` 。

语法如下：

```javascript
require.context(directory, useSubdirectories = false, regExp = /^\.\//)
```

示例:

```javascript
require.context("./test", false, /\.test\.js$/);
// （你创建了）一个test文件夹下面（不包含子目录），能被require请求到，所有文件名以 `.test.js` 结尾的文件形成的上下文（模块）。
```

```javascript
require.context("../", true, /\.stories\.js$/);
// （你创建了）一个父级文件夹下面（包含子目录），所有文件名以 `.stories.js` 结尾的文件形成的上下文（模块）。
```

### 上下文模块 API
一个上下文模块导出一个（require）方法，这个方法可以接收一个参数：请求的对象。
A context module exports a (require) function that takes one argument: the request.

导出的方法有3个属性： `resolve`, `keys`, `id`。

- `resolve` 是一个函数，它返回所请求的对象被解析后得到的模块id。
- `keys` 也是一个函数，它返回一个数组，由所有可能被上下文模块处理的请求的对象（译者注：参考下面第二段代码中的key）组成。

  比如，在你想引入一个文件夹下面的所有文件，或者引入能匹配正则表达式的文件，你可以这样：

  ```javascript
  function importAll (r) {
    r.keys().forEach(r);
  }
  importAll(require.context('../components/', true, /\.js$/));
  ```

  ```javascript
  var cache = {};
  function importAll (r) {
    r.keys().forEach(key => cache[key] = r(key));
  }
  importAll(require.context('../components/', true, /\.js$/));
  // 在构建时，所有被require的模块都会被存到（上面代码中的）cache里面。
  ```
- `id` 是上下文模块里面所包含的模块id. 它可能在你使用 `module.hot.accept` 的时候被用到。

***

> 原文：https://webpack.js.org/guides/dependency-management/