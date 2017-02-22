---
title: 管理依赖
sort: 60
contributors:
  - ndelangen
  - chrisVillanueva
---

> es6 modules

> commonjs

> amd

## 带表达式的 require 语句

如果你的 require 请求含有表达式(expressions)，会有一个上下文(context)被创建，因此在编译的时候并不知道**具体**的模块是哪一个。

示例:
```javascript
require("./template/" + name + ".ejs");
```

webpack 解析 `require()` 的调用，提取出来如下这些信息：

```
Directory: ./template
Regular expression: /^.*\.ejs$/
```

**上下文模块**

一个被生成的上下文模块包含**所有这个目录下的模块**的引用，这些模块都能匹配请求生成的正则表达式，都能被 require 请求到。上下文模块还包含一个把请求转换成对应模块 id 的映射表(map)。

示例:
```javascript
{
    "./table.ejs": 42,
    "./table-row.ejs": 43,
    "./directory/folder.ejs": 44
}
```
上下文模块还包含一些运行时逻辑来访问这个映射表。

总之，动态 require 是允许的，但是会导致所有可能的模块都被打包。

## require.context

你还可以使用 `require.context()` 方法来创建自己的（模块）上下文。你可以给这个方法传 3 个参数：要搜索的文件夹目录，是否还应该搜索它的子目录， 以及一个匹配文件的正则表达式。

webpack 会在构建的时候解析代码中的 `require.context()` 。

语法如下：

```javascript
require.context(directory, useSubdirectories = false, regExp = /^\.\//)
```

示例:

```javascript
require.context("./test", false, /\.test\.js$/);
// （创建了）一个包含了 test 文件夹（不包含子目录）下面的、所有文件名以 `.test.js` 结尾的、能被 require 请求到的文件的上下文。
```

```javascript
require.context("../", true, /\.stories\.js$/);
// （创建了）一个包含了父级文件夹（包含子目录）下面，所有文件名以 `.stories.js` 结尾的文件的上下文。
```

### 上下文模块 API
一个上下文模块导出一个（require）函数，这个函数可以接收一个参数：request 函数。

导出的方法有 3 个属性： `resolve`, `keys`, `id`。

- `resolve` 是一个函数，它返回请求被解析后得到的模块 id。
- `keys` 也是一个函数，它返回一个数组，由所有可能被上下文模块处理的请求（译者注：参考下面第二段代码中的key）组成。

  比如，如果想引入一个文件夹下面的所有文件，或者引入能匹配正则表达式的文件，你可以这样：

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
  // 在构建时，所有被 require 的模块都会被存到（上面代码中的）cache 里面。
  ```
- `id` 是上下文模块里面所包含的模块 id. 它可能在你使用 `module.hot.accept` 的时候被用到。

***

> 原文：https://webpack.js.org/guides/dependency-management/
